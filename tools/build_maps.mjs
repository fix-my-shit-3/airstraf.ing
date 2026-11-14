#!/usr/bin/env node
/**
 * Conservative lexical deobfuscation and *reverse* source-map generation.
 * Reverse maps let the ORIGINAL JS's coordinates point at readable source text.
 */
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generatorModule from "@babel/generator";
import * as t from "@babel/types";
import { TraceMap, eachMapping } from "@jridgewell/trace-mapping";
import { GenMapping, addMapping, setSourceContent, toEncodedMap } from "@jridgewell/gen-mapping";

const traverse = traverseModule.default;
const generate = generatorModule.default;
const SRC = path.resolve("source");
const OUT = path.resolve("dist");
const MAX_JS_BYTES = 35 * 1024 * 1024;
const isShort = (s) => /^[a-zA-Z_$][a-zA-Z0-9_$]{0,2}$/.test(s);
const slash = (s) => s.split(path.sep).join("/");
const makeDir = (p) => fs.mkdirSync(path.dirname(p), { recursive: true });

function list(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? list(p) : entry.isFile() ? [p] : [];
  });
}

function memberName(node) {
  if (!t.isMemberExpression(node) && !t.isOptionalMemberExpression(node)) return null;
  if (!node.computed && t.isIdentifier(node.property)) return node.property.name;
  if (node.computed && t.isStringLiteral(node.property)) return node.property.value;
  return null;
}

function infer(binding) {
  const declaration = binding.path;
  if (declaration.isVariableDeclarator()) {
    const init = declaration.node.init;
    if (t.isNewExpression(init) && t.isIdentifier(init.callee)) {
      const names = {
        Map: "lookupMap", Set: "uniqueItems", WeakMap: "weakMap",
        WeakSet: "weakSet", WebSocket: "socket", URL: "url",
        URLSearchParams: "queryParams", Date: "date", RegExp: "pattern",
        AbortController: "abortController", Promise: "promise"
      };
      if (Object.hasOwn(names, init.callee.name)) return { name: names[init.callee.name], why: "constructor" };
    }
    if (t.isAwaitExpression(init) && t.isCallExpression(init.argument) &&
        t.isIdentifier(init.argument.callee, { name: "fetch" })) {
      return { name: "response", why: "await fetch()" };
    }
    if (t.isCallExpression(init) || t.isOptionalCallExpression(init)) {
      const method = memberName(init.callee);
      const names = {
        querySelector: "element", querySelectorAll: "elements",
        getElementById: "element", createElement: "element",
        getContext: "drawingContext", getBoundingClientRect: "bounds",
        getComputedStyle: "computedStyle", getReader: "reader",
        json: "parsedJson", text: "responseText",
        parse: "parsedValue", stringify: "serializedValue"
      };
      if (method && Object.hasOwn(names, method)) return { name: names[method], why: "call to ." + method + "()" };
    }
  }
  if (declaration.isIdentifier() && declaration.parentPath?.isCatchClause()) {
    return { name: "error", why: "catch binding" };
  }

  const properties = new Set();
  for (const ref of binding.referencePaths) {
    const parent = ref.parentPath;
    if ((parent?.isMemberExpression() || parent?.isOptionalMemberExpression()) &&
        parent.node.object === ref.node) {
      const prop = memberName(parent.node);
      if (prop) properties.add(prop);
    }
  }
  if (properties.has("preventDefault") || properties.has("stopPropagation")) {
    return { name: "event", why: "DOM event methods" };
  }
  if (properties.has("clientX") && properties.has("clientY")) {
    return { name: "pointerEvent", why: "pointer coordinates" };
  }
  if (properties.has("send") && properties.has("readyState")) {
    return { name: "socket", why: "socket interface" };
  }
  if (properties.has("ok") && properties.has("status") &&
      (properties.has("json") || properties.has("text"))) {
    return { name: "response", why: "Fetch Response interface" };
  }
  if (properties.has("addEventListener") && properties.has("removeEventListener")) {
    return { name: "eventTarget", why: "EventTarget interface" };
  }
  return null;
}

function deobfuscate(ast) {
  const seen = new WeakSet();
  const proposals = [];
  let usesDynamicScope = false;

  traverse(ast, {
    WithStatement() { usesDynamicScope = true; },
    CallExpression(p) {
      if (p.get("callee").isIdentifier({ name: "eval" })) usesDynamicScope = true;
    },
    NewExpression(p) {
      if (p.get("callee").isIdentifier({ name: "Function" })) usesDynamicScope = true;
    },
    enter(p) {
      if (!(p.isProgram() || p.isFunction() || p.isBlockStatement() || p.isCatchClause())) return;
      for (const binding of Object.values(p.scope.bindings)) {
        if (seen.has(binding)) continue;
        seen.add(binding);
        const oldName = binding.identifier?.name;
        if (!oldName || !isShort(oldName)) continue;
        if (binding.scope.path.isProgram() || binding.kind === "module") continue;
        if (binding.path.findParent((x) => x.isExportNamedDeclaration() ||
                                           x.isExportDefaultDeclaration())) continue;
        const guess = infer(binding);
        if (guess && typeof guess.name === "string" && guess.name !== oldName) {
          proposals.push({ binding, oldName, ...guess,
            line: binding.identifier?.loc?.start?.line ?? null });
        }
      }
    }
  });

  const renames = [];
  if (usesDynamicScope) return { renames, dynamicScope: true };
  for (const proposal of proposals) {
    const { binding, oldName, name, why, line } = proposal;
    // A scope.rename() updates references and handles shorthand object keys.
    if (binding.scope.getBinding(oldName) !== binding) continue;
    const newName = binding.scope.hasBinding(name) || binding.scope.hasGlobal(name)
      ? binding.scope.generateUidIdentifier(name).name
      : name;
    binding.scope.rename(oldName, newName);
    renames.push({ oldName, newName, line, rule: why });
  }
  return { renames, dynamicScope: false };
}

function buildOne(file) {
  const rel = slash(path.relative(SRC, file));
  const bytes = fs.statSync(file).size;
  if (bytes > MAX_JS_BYTES) return { file: rel, status: "skipped", reason: "JS exceeds safety limit", bytes };
  const original = fs.readFileSync(file, "utf8");
  let ast;
  try {
    ast = parse(original, {
      sourceType: "unambiguous", errorRecovery: true,
      allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true,
      plugins: ["jsx"]
    });
  } catch (err) {
    return { file: rel, status: "skipped", reason: "Parse failed: " + err.message, bytes };
  }
  const parserErrors = ast.errors?.slice(0, 4).map((x) => x.message) || [];
  function badIds() {
    const bad = [];
    traverse(ast, { Identifier(p) {
      if (typeof p.node.name !== "string" && bad.length < 8) {
        bad.push({ nameType: typeof p.node.name, name: String(p.node.name),
          source: original.slice(p.node.start, p.node.end).slice(0, 80),
          loc: p.node.loc?.start, parentType: p.parentPath?.node?.type });
      }
    } });
    return bad;
  }
  const badBefore = badIds();
  const analysis = deobfuscate(ast);
  const badAfter = badIds();
  if (badBefore.length || badAfter.length) {
    throw new Error("Bad AST identifiers " + JSON.stringify({ badBefore, badAfter, parserErrors }));
  }
  const generated = generate(ast, {
    comments: true, compact: false, minified: false,
    sourceMaps: true, sourceFileName: rel,
    jsescOption: { minimal: true }
  }, original);

  const readablePath = path.join(OUT, "readable", rel);
  const mapPath = path.join(OUT, "maps", rel + ".map");
  const originalWithMapPath = path.join(OUT, "instrumented", rel);
  makeDir(readablePath); makeDir(mapPath); makeDir(originalWithMapPath);
  const readable = generated.code + "\n";
  fs.writeFileSync(readablePath, readable);

  // Babel's map is readable -> minified. Invert its mappings to attach
  // reconstructed readable text to the actual original/minified script.
  const reverse = new GenMapping({ file: path.basename(rel) });
  const readableSource = slash(path.relative(path.dirname(mapPath), readablePath));
  let mappingCount = 0;
  eachMapping(new TraceMap(generated.map), (m) => {
    if (m.originalLine == null || m.originalColumn == null) return;
    addMapping(reverse, {
      generated: { line: m.originalLine, column: m.originalColumn },
      source: readableSource,
      original: { line: m.generatedLine, column: m.generatedColumn }
    });
    mappingCount++;
  });
  if (!mappingCount) return { file: rel, status: "skipped", reason: "No usable source mappings", bytes };
  setSourceContent(reverse, readableSource, readable);
  const reverseMap = toEncodedMap(reverse);
  fs.writeFileSync(mapPath, JSON.stringify(reverseMap));
  // Standalone local replacement: same executable JS, plus embedded map.
  const inline = Buffer.from(JSON.stringify(reverseMap)).toString("base64");
  fs.writeFileSync(originalWithMapPath,
    original + "\n//# sourceMappingURL=data:application/json;charset=utf-8;base64," + inline + "\n");

  return {
    file: rel, status: "mapped", bytes, mappings: mappingCount,
    identifiersRenamed: analysis.renames.length,
    dynamicScopeDetected: analysis.dynamicScope,
    renames: analysis.renames
  };
}

function main() {
  if (!fs.existsSync(SRC)) throw new Error("Run python3 tools/unpack_source.py first");
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const files = list(SRC).filter((p) => /\.(?:js|cjs|mjs)$/i.test(p)).sort();
  const records = files.map((file) => {
    try { return buildOne(file); }
    catch (err) { return {
      file: slash(path.relative(SRC, file)), status: "skipped",
      reason: "Generation failed: " + (err.stack || err.message)
    }; }
  });
  fs.writeFileSync(path.join(OUT, "report.json"),
    JSON.stringify({ inputJsFiles: files.length,
      successfullyMapped: records.filter((x) => x.status === "mapped").length,
      totalIdentifiersRenamed: records.reduce((n,x) => n + (x.identifiersRenamed || 0), 0),
      files: records.map(({ renames, ...r }) => r)
    }, null, 2) + "\n");
  fs.writeFileSync(path.join(OUT, "renames.json"),
    JSON.stringify(records.filter((r) => r.renames?.length)
      .map((r) => ({ file: r.file, renames: r.renames })), null, 2) + "\n");
  console.log("JS source files: " + files.length);
  for (const rec of records) {
    console.log("  " + rec.status + ": " + rec.file +
      (rec.status === "mapped" ? " (" + rec.identifiersRenamed + " renames)" : " — " + rec.reason));
  }
}
main();

#!/usr/bin/env node
// Build readable executable JavaScript with conservative lexical renames.
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generatorModule from "@babel/generator";
import * as t from "@babel/types";

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

/**
 * Second pass: only assign names whose type or callback role is explicitly
 * evidenced by syntax. Never infer hidden game semantics from spelling alone.
 */
function inferAdditional(binding) {
  const declaration = binding.path;
  if (declaration.isVariableDeclarator()) {
    const init = declaration.node.init;
    if (t.isNewExpression(init) && t.isIdentifier(init.callee)) {
      const constructors = Object.assign(Object.create(null), {
        Uint8Array: "uint8Values", Uint8ClampedArray: "clampedBytes",
        Uint16Array: "uint16Values", Uint32Array: "uint32Values",
        Int8Array: "int8Values", Int16Array: "int16Values",
        Int32Array: "int32Values", Float32Array: "float32Values",
        Float64Array: "float64Values", BigInt64Array: "bigint64Values",
        BigUint64Array: "biguint64Values", ArrayBuffer: "arrayBuffer",
        SharedArrayBuffer: "sharedBuffer", DataView: "dataView",
        TextEncoder: "textEncoder", TextDecoder: "textDecoder",
        FormData: "formData", Headers: "headers", Request: "request",
        Response: "response", Blob: "blob", Worker: "worker",
        Image: "image", Audio: "audio", EventSource: "eventSource",
        MutationObserver: "mutationObserver", ResizeObserver: "resizeObserver",
        IntersectionObserver: "intersectionObserver"
      });
      if (Object.hasOwn(constructors, init.callee.name)) {
        return { name: constructors[init.callee.name],
          why: "constructor: new " + init.callee.name + "(...)" };
      }
    }
    if (t.isCallExpression(init) && t.isMemberExpression(init.callee) &&
        t.isIdentifier(init.callee.object)) {
      const builtin = init.callee.object.name;
      const method = memberName(init.callee);
      const builtins = Object.assign(Object.create(null), {
        Object: { keys: "objectKeys", values: "objectValues", entries: "objectEntries" },
        Array: { from: "arrayValues", of: "arrayValues", isArray: "isArray" },
        Math: { random: "randomValue", floor: "flooredValue",
          ceil: "ceiledValue", round: "roundedValue" }
      });
      if (Object.hasOwn(builtins, builtin) &&
          Object.hasOwn(builtins[builtin], method)) {
        return { name: builtins[builtin][method],
          why: builtin + "." + method + "(...)" };
      }
    }
    // "for (const r of controller.clips)" gives the binding's collection role.
    const loop = declaration.parentPath?.parentPath;
    if (loop?.isForOfStatement() && loop.node.left === declaration.parentPath.node) {
      const collection = memberName(loop.node.right);
      const singular = Object.assign(Object.create(null), {
        clips: "clip", tracks: "track", layers: "layer", states: "state",
        transitions: "transition", params: "parameter", parameters: "parameter",
        children: "child", players: "player", bones: "bone",
        materials: "material", meshes: "mesh", nodes: "node",
        animations: "animation", events: "event", targets: "target",
        keys: "key", values: "value", entries: "entry",
        messages: "message", sockets: "socket", contacts: "contact",
        entities: "entity", components: "component", points: "point",
        items: "item", samples: "sample", frames: "frame",
        uniforms: "uniform", attributes: "attribute"
      });
      if (collection && Object.hasOwn(singular, collection)) {
        return { name: singular[collection],
          why: "for...of collection ." + collection };
      }
    }
    // For-loop indices are confirmed by indexed reads/writes, not guessed.
    if (t.isNumericLiteral(init, { value: 0 }) &&
        declaration.parentPath?.parentPath?.isForStatement() &&
        binding.referencePaths.some((ref) =>
          ref.parentPath?.isMemberExpression() &&
          ref.parentPath.node.computed && ref.parentPath.node.property === ref.node)) {
      return { name: "index", why: "numeric for-loop index used in computed member access" };
    }
  }

  // Only direct inline callbacks: no speculation about a function's callers.
  const fn = binding.scope.path;
  if (!(fn?.isArrowFunctionExpression() || fn?.isFunctionExpression())) return null;
  const argIndex = fn.node.params.indexOf(binding.identifier);
  if (argIndex < 0) return null;
  const call = fn.parentPath;
  if (!call?.isCallExpression()) return null;
  const callee = call.node.callee;
  const method = memberName(callee);
  const pos = call.node.arguments.indexOf(fn.node);
  if (pos === 1 && method === "addEventListener" && argIndex === 0) {
    return { name: "event", why: "addEventListener callback argument" };
  }
  if (pos !== 0) return null;
  if (t.isIdentifier(callee, { name: "requestAnimationFrame" }) && argIndex === 0) {
    return { name: "timestamp", why: "requestAnimationFrame callback timestamp" };
  }
  const iteratorMethods = new Set([
    "map", "filter", "forEach", "find", "findIndex",
    "some", "every", "flatMap", "findLast", "findLastIndex"
  ]);
  if (iteratorMethods.has(method)) {
    // If iterating a clearly named collection, preserve its element meaning.
    const source = t.isMemberExpression(callee) ? memberName(callee.object) : null;
    const singular = Object.assign(Object.create(null), {
      players: "player", clips: "clip", tracks: "track",
      states: "state", layers: "layer", params: "parameter",
      children: "child", components: "component",
      messages: "message", animations: "animation", events: "event",
      points: "point", nodes: "node", meshes: "mesh",
      entities: "entity", items: "item", bones: "bone"
    });
    if (argIndex === 0) return {
      name: (source && Object.hasOwn(singular, source)) ? singular[source] : "item",
      why: "direct ." + method + " callback: first array element" +
        (source ? " of ." + source : "")
    };
    if (argIndex === 1) return { name: "index",
      why: "direct ." + method + " callback: array index" };
  }
  if (method === "reduce" || method === "reduceRight") {
    if (argIndex === 0) return { name: "accumulator", why: "." + method + " accumulator" };
    if (argIndex === 1) return { name: "item", why: "." + method + " current element" };
    if (argIndex === 2) return { name: "index", why: "." + method + " index" };
  }
  if (method === "sort") {
    if (argIndex === 0) return { name: "leftItem", why: ".sort comparator first argument" };
    if (argIndex === 1) return { name: "rightItem", why: ".sort comparator second argument" };
  }
  if (method === "then" && argIndex === 0) {
    return { name: "result", why: ".then resolved value" };
  }
  if (method === "catch" && argIndex === 0) {
    return { name: "error", why: ".catch rejection reason" };
  }
  return null;
}

function deobfuscate(ast, extraBudget = 0) {
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
  // Run the evidence-based additional pass after the baseline pass to avoid
  // changing which existing identifiers the baseline pass selects.
  let additionalIdentifiersRenamed = 0;
  if (extraBudget > 0) {
    const visited = new WeakSet();
    const extraProposals = [];
    traverse(ast, {
      enter(p) {
        if (!(p.isProgram() || p.isFunction() || p.isBlockStatement() || p.isCatchClause())) return;
        for (const binding of Object.values(p.scope.bindings)) {
          if (visited.has(binding)) continue;
          visited.add(binding);
          const oldName = binding.identifier?.name;
          if (!oldName || !isShort(oldName)) continue;
          if (binding.scope.path.isProgram() || binding.kind === "module") continue;
          if (binding.path.findParent((x) => x.isExportNamedDeclaration() ||
                                               x.isExportDefaultDeclaration())) continue;
          const inference = inferAdditional(binding);
          if (inference && typeof inference.name === "string" && inference.name !== oldName) {
            extraProposals.push({ binding, oldName, ...inference,
              line: binding.identifier.loc?.start?.line ?? null });
          }
        }
      }
    });
    // Prefer concrete constructors/collection types over generic callback roles.
    const priority = (r) => r.why.startsWith("constructor:") ? 0 :
      r.why.startsWith("for...of") ? 1 :
      r.why.startsWith("Object.") || r.why.startsWith("Array.") ? 2 :
      r.why.startsWith("numeric for-loop") ? 3 : 4;
    extraProposals.sort((a, b) =>
      priority(a) - priority(b) || (a.line ?? 0) - (b.line ?? 0));
    for (const proposal of extraProposals) {
      if (additionalIdentifiersRenamed >= extraBudget) break;
      const { binding, oldName, name, why, line } = proposal;
      if (binding.scope.getBinding(oldName) !== binding) continue;
      const newName = binding.scope.hasBinding(name) || binding.scope.hasGlobal(name)
        ? binding.scope.generateUidIdentifier(name).name : name;
      binding.scope.rename(oldName, newName);
      renames.push({ oldName, newName, line, rule: why, pass: "additional" });
      additionalIdentifiersRenamed++;
    }
  }
  return { renames, dynamicScope: false, additionalIdentifiersRenamed };
}

function buildOne(file, extraBudget = 0) {
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
  const analysis = deobfuscate(ast, extraBudget);
  const badAfter = badIds();
  if (badBefore.length || badAfter.length) {
    throw new Error("Bad AST identifiers " + JSON.stringify({ badBefore, badAfter, parserErrors }));
  }
  const generated = generate(ast, {
    comments: true, compact: false, minified: false,
    sourceMaps: false, sourceFileName: rel,
    jsescOption: { minimal: true }
  }, original);

  const readablePath = path.join(OUT, "readable", rel);
  makeDir(readablePath);
  const readable = generated.code + "\n";
  fs.writeFileSync(readablePath, readable);

  return {
    file: rel, status: "mapped", bytes,
    identifiersRenamed: analysis.renames.length,
    additionalIdentifiersRenamed: analysis.additionalIdentifiersRenamed || 0,
    dynamicScopeDetected: analysis.dynamicScope,
    renames: analysis.renames
  };
}

function main() {
  if (!fs.existsSync(SRC)) throw new Error("Run python3 tools/unpack_source.py first");
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const files = list(SRC).filter((p) => /\.(?:js|cjs|mjs)$/i.test(p)).sort();
  // Keep the original 100 additional renames in place, before assigning
  // the new batch to main gameplay source first, then other JS modules.
  const priorAllocation = new Map([
    ["airstraf.ing/assets/c-4ZchrfCo.js", 4],
    ["airstraf.ing/assets/c-B0EPN0fS.js", 96]
  ]);
  const PRIOR_COUNT = 100;
  const NEW_BATCH_TARGET = 200;
  const fileRole = (file) => {
    const rel = slash(path.relative(SRC, file));
    return priorAllocation.has(rel) ? 0 :
      rel === "airstraf.ing/assets/main-0GITWSWA.js" ? 1 : 2;
  };
  const executionOrder = [...files].sort((a, b) =>
    fileRole(a) - fileRole(b) || a.localeCompare(b));
  let oldRenamed = 0;
  let newRemaining = NEW_BATCH_TARGET;
  const records = executionOrder.map((file) => {
    const rel = slash(path.relative(SRC, file));
    const oldQuota = priorAllocation.get(rel);
    try {
      const result = buildOne(file, Number.MAX_SAFE_INTEGER);
      const renamed = result.additionalIdentifiersRenamed || 0;
      let extraIndex = 0;
      for (const entry of result.renames || []) {
        if (entry.pass !== "additional") continue;
        if (oldQuota !== undefined && extraIndex < oldQuota) oldRenamed++;
        else { entry.pass = "automatic"; newRemaining--; }
        extraIndex++;
      }
      return result;
    } catch (err) {
      return { file: rel, status: "skipped",
        reason: "Generation failed: " + (err.stack || err.message) };
    }
  });
  records.sort((a,b)=>a.file.localeCompare(b.file));
  const newBatchRenamed = NEW_BATCH_TARGET - newRemaining;
  fs.writeFileSync(path.join(OUT, "report.json"),
    JSON.stringify({ inputJsFiles: files.length,
      successfullyMapped: records.filter((x) => x.status === "mapped").length,
      totalIdentifiersRenamed: records.reduce((n,x) => n + (x.identifiersRenamed || 0), 0),
      additionalIdentifiersRenamed: oldRenamed + newBatchRenamed,
      previouslyCompletedRenames: oldRenamed,
      newBatchIdentifiersRenamed: newBatchRenamed,
      files: records.map(({ renames, ...r }) => r)
    }, null, 2) + "\n");
  fs.writeFileSync(path.join(OUT, "renames.json"),
    JSON.stringify(records.filter((r) => r.renames?.length)
      .map((r) => ({ file: r.file, renames: r.renames })), null, 2) + "\n");
  console.log("JS source files: " + files.length);
  console.log("Previously completed additional renames: " + oldRenamed + "/" + PRIOR_COUNT);
  console.log("New evidence-backed renames: " + newBatchRenamed + "/" + NEW_BATCH_TARGET);
  for (const rec of records) {
    console.log("  " + rec.status + ": " + rec.file +
      (rec.status === "mapped" ? " (" + rec.identifiersRenamed + " renames)" : " — " + rec.reason));
  }
  if (oldRenamed !== PRIOR_COUNT || newRemaining > 0) throw new Error(
    "Incorrect rename totals: prior=" + oldRenamed + ", new=" + newBatchRenamed);
  if (records.some((r) => r.status !== "mapped")) throw new Error("A source file could not be mapped");
}
main();

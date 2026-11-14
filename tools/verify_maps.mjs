#!/usr/bin/env node
/**
 * Checks the generated DevTools maps and preserved lexical rename audit.
 * Does not claim that the rebuilt game has been runtime-regression-tested.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { TraceMap, eachMapping } from "@jridgewell/trace-mapping";
import { parse } from "@babel/parser";

const report = JSON.parse(fs.readFileSync("dist/report.json", "utf8"));
const groups = JSON.parse(fs.readFileSync("dist/renames.json", "utf8"));
const allRenames = groups.flatMap(({ file, renames }) =>
  renames.map((entry) => ({ file, ...entry })));
const previousBatch = allRenames.filter((x) => x.pass === "additional");
const secondBatch = allRenames.filter((x) => x.pass === "batch-200");
const base = allRenames.filter((x) => !x.pass);

assert.equal(report.inputJsFiles, 75, "Unexpected count of source JavaScript files");
assert.equal(report.successfullyMapped, report.inputJsFiles,
  "Some JavaScript files lack a source map");
assert.equal(base.length, 564, "Previously mapped baseline rename count changed");
assert.equal(previousBatch.length, 100, "Prior 100 renames were lost");
assert.equal(secondBatch.length, 200, "Expected 200 NEW evidence-backed renames");
assert.equal(allRenames.length, 864, "Total must equal 864 distinct lexical bindings");
assert.equal(report.totalIdentifiersRenamed, allRenames.length,
  "Rename report and audit do not agree");
assert.equal(report.previouslyCompletedRenames, 100,
  "Missing prior-pass count");
assert.equal(report.newBatchIdentifiersRenamed, 200,
  "Missing second-pass count");
assert.equal(report.additionalIdentifiersRenamed, 300,
  "Combined second-pass budget must equal 300");

// Comparison is safe only when the archived source hasn't changed.
try {
  const oldAudit = JSON.parse(execFileSync("git",
    ["show", "HEAD:dist/renames.json"], { encoding: "utf8" }));
  const oldList = oldAudit.flatMap(({ file, renames }) =>
    renames.filter((x) => x.pass === "additional").map((entry) => ({ file, ...entry })));
  const oldManifest = JSON.parse(execFileSync("git",
    ["show", "HEAD:archive-manifest.json"], { encoding: "utf8" }));
  const currentManifest = JSON.parse(fs.readFileSync("archive-manifest.json", "utf8"));
  if (oldManifest.archive_sha256 === currentManifest.archive_sha256) {
    assert.deepEqual(previousBatch, oldList,
      "The previous 100 renames must remain unchanged");
  } else {
    console.log("Archive changed; previous-run equivalence check skipped");
  }
} catch (error) {
  if (error.code === "ENOENT" || error.status === 128) {
    console.log("Previous audit unavailable; skipping baseline diff");
  } else {
    throw error;
  }
}

for (const entry of allRenames) {
  assert.equal(typeof entry.oldName, "string");
  assert.equal(typeof entry.newName, "string");
  assert.notEqual(entry.oldName, entry.newName);
  assert.ok(typeof entry.rule === "string" && entry.rule.length > 0);
  assert.ok(Number.isInteger(entry.line) && entry.line > 0);
}
for (const source of report.files) {
  assert.equal(source.status, "mapped", source.file + " did not map");
  const readableFile = path.join("dist/readable", source.file);
  const mapFile = path.join("dist/maps", source.file + ".map");
  const originalFile = path.join("source", source.file);
  const instrumentedFile = path.join("dist/instrumented", source.file);
  for (const required of [readableFile, mapFile, originalFile, instrumentedFile]) {
    assert.ok(fs.existsSync(required), "Missing output " + required);
  }
  const readable = fs.readFileSync(readableFile, "utf8");
  // Ensure pretty-printed output remains valid JavaScript.
  parse(readable, {
    sourceType: "unambiguous", allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true, plugins: ["jsx"]
  });
  const mapData = JSON.parse(fs.readFileSync(mapFile, "utf8"));
  assert.equal(mapData.version, 3, "Invalid sourcemap version for " + source.file);
  assert.equal(mapData.sourcesContent.length, 1, "Missing embedded readable source");
  assert.equal(mapData.sourcesContent[0], readable, "Embedded readable source mismatch");
  const trace = new TraceMap(mapData);
  let mappings = 0;
  eachMapping(trace, () => { mappings++; });
  assert.ok(mappings > 0, "No mappings in " + source.file);
  assert.equal(source.mappings, mappings,
    "Recorded and actual mapping counts differ for " + source.file);
  const original = fs.readFileSync(originalFile, "utf8");
  const instrumented = fs.readFileSync(instrumentedFile, "utf8");
  assert.ok(instrumented.startsWith(original),
    "Instrumented file modified executable code: " + source.file);
  assert.ok(instrumented.includes("sourceMappingURL=data:application/json"),
    "Missing inline DevTools map reference: " + source.file);
}
console.log("PASS: 564 baseline + 100 prior + 200 NEW = 864 lexical renames");
console.log("PASS: all 75 JavaScript bundles have readable code, instrumented originals, and valid source maps");

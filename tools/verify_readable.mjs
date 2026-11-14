#!/usr/bin/env node
/**
 * Checks the generated DevTools maps and preserved lexical rename audit.
 * Does not claim that the rebuilt game has been runtime-regression-tested.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parse } from "@babel/parser";

const report = JSON.parse(fs.readFileSync("dist/report.json", "utf8"));
const groups = JSON.parse(fs.readFileSync("dist/renames.json", "utf8"));
const allRenames = groups.flatMap(({ file, renames }) =>
  renames.map((entry) => ({ file, ...entry })));
const previousBatch = allRenames.filter((x) => x.pass === "additional");
const secondBatch = allRenames.filter((x) => x.pass === "automatic");
const base = allRenames.filter((x) => !x.pass);

assert.equal(report.inputJsFiles, 75, "Unexpected count of source JavaScript files");
assert.equal(report.successfullyMapped, report.inputJsFiles,
  "Some JavaScript files lack a source map");
assert.equal(base.length, 564, "Previously mapped baseline rename count changed");
assert.equal(previousBatch.length, 100, "Prior 100 renames were lost");
assert.ok(secondBatch.length >= 200, "Expected at least the prior 200 additional renames");
assert.ok(allRenames.length >= 864, "Previous rename count must be preserved");
assert.equal(report.totalIdentifiersRenamed, allRenames.length,
  "Rename report and audit do not agree");
assert.equal(report.previouslyCompletedRenames, 100,
  "Missing prior-pass count");
assert.equal(report.newBatchIdentifiersRenamed, secondBatch.length,
  "Missing second-pass count");
assert.equal(report.additionalIdentifiersRenamed, previousBatch.length + secondBatch.length,
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
  assert.ok(fs.existsSync(readableFile));
  const readable = fs.readFileSync(readableFile, "utf8");
  // Ensure pretty-printed output remains valid JavaScript.
  parse(readable, {
    sourceType: "unambiguous", allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true, plugins: ["jsx"]
  });

}
console.log(`PASS: ${allRenames.length} evidence-backed lexical renames`);
console.log("PASS: all 75 JavaScript bundles have valid readable code");

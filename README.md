# airstraf.ing — Firefox readable-code replacement

A Firefox extension that replaces matching JavaScript responses on **https://airstraf.ing/** with readable, conservatively renamed code. You play on the real website. There is no hosted game copy, sitemap or source-map attachment step.

## Install once

1. Open this repository's **Actions → Build Firefox replacements** and the latest successful run.
2. Download **airstraf-firefox-replacement** and unzip it.
3. In Firefox, open `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on** → select the extracted `manifest.json`.
4. Open the extension menu and wait for **75 Available files**, then open DevTools, disable the network cache and reload https://airstraf.ing/.
5. The Debugger shows the readable replacement code under the site's normal script URLs. The add-on background console reports replacements and skipped files.

Firefox removes temporary add-ons when it restarts; load the same manifest again. Permanent installation in normal Firefox requires Mozilla signing. This repository does not claim to provide a signed add-on.

## Automatic GitHub updates

At startup, every 15 minutes, and when you click **Download latest** in its toolbar menu, the extension checks `fix-my-shit-3/airstraf.ing` on GitHub. It resolves the latest main commit and downloads its replacement index and changed JavaScript files from that exact commit. Every file is checksum-verified before the new set becomes active. Failed updates keep the current set; the bundled files work when GitHub is unavailable. Reload the game to use newly downloaded files.

This updates the **replacement JavaScript**, not the extension's own background code. For changes to the add-on itself, download the newest artifact and reload the add-on. Only install this if you trust this repository: its future replacement code will execute on airstraf.ing.

Each live response must match the archived original's URL, byte length and SHA-256. Unknown or changed live files pass through unchanged. Matching ignores query parameters but requires the exact HTTPS origin and path. This prevents replacing a new site build with old code. The current archive contains 75 JavaScript files; it does not guarantee coverage of future bundles, inline scripts, blob URLs, service-worker cached responses or files absent from the archive. If the site uses a response SourceMap header or script integrity checks, those may interfere; browser testing is still required.

## Build and checks

```sh
python3 tools/unpack_source.py
npm ci
npm run build
npm run verify
npm run build:extension
npm run test:extension
```

GitHub Actions does this on relevant pushes to main and manual runs, publishes the extension artifact, and commits generated readable files and the downloadable replacement set. GitHub repository metadata confirms `has_pages: false`: no GitHub Pages site is active. No Pages deployment workflow is included.

- `source/`: unchanged extracted archive.
- `dist/readable/`: readable executable JavaScript.
- `dist/firefox/`: installable temporary add-on and replacement files.
- `dist/report.json`, `dist/renames.json`: coverage and naming evidence.

The automatic naming pass is no longer limited to a batch of 200. It applies all supported inference rules to eligible local bindings. Unknown names, public properties, protocols and dynamic-evaluation scopes are preserved. It cannot recover every original variable name or infer every meaning automatically. The initial generic pass records **3,216 renamed bindings across 75 files**. Additional render-specific passes now restore engine/controller names; see [Rendering deobfuscation and diagnostics](docs/RENDERING.md) for coverage, audits and remaining gaps.

Tests check replacement/fallback/update behavior, original and replacement hashes, syntax and lexical-normalized AST equivalence. These checks do not replace a live Firefox gameplay test.

## Toolbar menu and console check (v1.1.0)

Click the extension icon to see available replacement files, replaced/skipped URLs for the current tab, skip reasons, the loaded GitHub commit, last check/download times, download progress and update errors. **Download latest** checks GitHub and downloads updated replacement code. **Reload game without cache** applies the active set to a fresh game load (this interrupts the current game). Counts reset when that tab navigates.

For the new menu, download the newest Actions artifact, extract it, remove the old temporary add-on and load the new `manifest.json`. Automatic replacement updates cannot upgrade the add-on's own menu/background code.

After the page loads, run this in the **airstraf.ing page's Web Console**:

```js
console.table(globalThis.__AIRSTRAF_REPLACEMENTS__ ?? [])
```

Rows contain the file, readable-code SHA-256 and execution time. These markers run at the end of each replacement script; the list contains only scripts evaluated in that console's global context, not all 75 available files. Empty output means no new marker has run there yet (old package, skipped files, loading/error, or wrong frame/worker context). Popup counts indicate delivered responses; console markers indicate execution reached the end. These are debugging indicators, not tamper-proof attestation.

## Rendering diagnostics

The replacement files now include a readable render hook. After **Download latest → Reload game without cache**, inspect it with:

```js
globalThis.__AIRSTRAF_RENDER__?.getState()
```

Use `__AIRSTRAF_RENDER__.getOriginalMethods()` to inspect the deobfuscated render/frame functions, and `onFrame(callback)` for a removable observer. Full API, validation and incomplete coverage are documented in [docs/RENDERING.md](docs/RENDERING.md).

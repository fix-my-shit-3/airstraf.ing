# airstraf.ing — DevTools Source Mapping & Deobfuscation

Reverse-engineering workspace for making the archived **airstraf.ing** client JavaScript easier to investigate in browser developer tools.

## Objective

Extract the existing `airstraf.ing-source.zip`, preserve its original contents, analyze JavaScript identifiers with a parser, and produce a **readable source view plus source maps**. Renames should be evidence-based: do not rename an identifier if its role is unclear. Keep JavaScript behavior, public properties and network protocols intact.

This is a code-readability project, not a claim to have recovered the website's lost original source or original identifier names.

## Outputs

| Path | Meaning |
| --- | --- |
| `airstraf.ing-source.zip` | Original archive (never modified) |
| `source/` | Safely extracted archive |
| `archive-manifest.json` | Extracted filenames, sizes and SHA-256 checksums |
| `dist/readable/` | Reformatted JS and confidently inferred lexical renames |
| `dist/maps/` | Reverse source maps that map **original minified positions → readable source positions** |
| `dist/instrumented/` | Original JS plus an inline source-map comment (same runtime code) |
| `dist/renames.json` | Identifiers renamed, file/position, and the inference rule |
| `dist/report.json` | Per-file parsing, mapping and skipped-file information |

Only scoped **local bindings** are considered for renaming; property keys, imports, exported names, public protocol fields and uncertain identifiers stay as-is. Files using dynamic evaluation are formatted but left unrenamed.

## Automatic build

The GitHub Actions workflow `Extract and map source` runs automatically on pushes to `main` that change the source ZIP, scripts, mapping dependencies or workflow. It extracts the ZIP, builds readable JS and source maps, verifies all generated maps and the rename audit, **uploads a downloadable source-map artifact**, then commits the generated files to `main` (using the repository's `contents: write` permission). It can also be run manually from the Actions tab.

The second naming batch targets **200 additional evidence-backed lexical identifiers**, prioritizing the main gameplay bundle; the prior 100 additional renames remain locked by a regression check. Baseline: 564 renames, previous batch: 100, second batch target: 200, giving **864 total** for this source archive. The generated `dist/report.json` is the authoritative actual count.

Run locally with Node.js 20 or later and Python 3.11 or later:

```bash
python3 tools/unpack_source.py
npm install
npm run build:maps
npm run verify:maps
```

## Using a source map in DevTools

Source maps do not magically modify a site's currently served code. For a browser to display reconstructed readable sources, **the JavaScript actually loaded by the page must have a `sourceMappingURL` annotation or `SourceMap` response header**. The files in `dist/instrumented/` contain original JavaScript plus an inline map and can be used with an appropriate local replacement/development server. The `dist/maps/` files can be hosted or attached with a supported browser tooling workflow.

Map support and local replacement features differ by browser. The reconstructed source file gives useful names for navigation and breakpoints, but variables at runtime retain their original names unless the executable JavaScript itself is transformed and tested.

## Quality and safety

- Start with archive inventory, readable formatting and conservative renames.
- Verify each rename in the scope where it is declared; record the rule used.
- Test transformed code before claiming it is a drop-in replacement.
- Preserve unknown names rather than guessing.
- Do not publish private tokens, credentials, or proprietary source files without authorization.

The initial automated pass is heuristic; semantic deobfuscation of complex application/game logic requires review of specific modules.

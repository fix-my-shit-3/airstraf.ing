# Rendering deobfuscation and diagnostics

This update restores names in the archived **Three.js r186 WebGL engine**, the game renderer/controller, and their imports. It also supplies a readable diagnostics hook in `extension/render-hook.js`. The original script URLs and export/property interfaces remain compatible.

## What was recovered

| Pass | Naming operations | Evidence |
| --- | ---: | --- |
| Engine symbols, local bindings and consumer imports | 6,499 | Shipped namespace and normalized function matching against `three@0.186.0` |
| Additional method arguments and property values | 857 | r186 signatures and explicit property names |
| WebGLRenderer core state and helpers | 170 | Reviewed correspondence with r186 `WebGLRenderer.js` |
| Game rendering controller | 164 | Reviewed constructor, frame pipeline, callbacks and property use |

These **7,690 operations include refinements of previously named bindings** and must not be described as 7,690 newly recovered unique variables. The old 3,216-entry generic naming audit remains a record of the initial pass. The later audits show the additional changes and their evidence.

The core now names context creation/recovery, render targets, framebuffers, render lists/states, program cache, texture and geometry management, clipping, shadow rendering, XR, animation callbacks, projection, transmission passes, material preparation, uniform handling and the main frame/render functions. GameRenderer names identify frame inputs, predicted/interpolated poses, camera/viewmodel state and the postprocessing pipeline. Eighty-four opaque game property keys have readable descriptions beside their declarations. The property keys themselves are retained because other modules use them.

## Use the hook

Click **Download latest**, then **Reload game without cache** in the existing Firefox add-on. The hook is part of the replacement files and does not require a new add-on interface version.

In the airstraf.ing page's console:

```js
globalThis.__AIRSTRAF_RENDER__?.getState()
```

After the game renderer is constructed, the result exposes `renderer`, `gameRenderer`, `scene`, `camera`, the most recent render-pass scene/camera, backend label, frame and render-call counts, CPU call durations, and a snapshot of Three.js render statistics. A missing hook or null references means the relevant replacement has not loaded/constructed yet; inspect the extension's skipped files and reload without cache.

Read the actual deobfuscated executable methods (not the diagnostic wrappers):

```js
console.log(__AIRSTRAF_RENDER__.getOriginalMethods().render?.toString());
console.log(__AIRSTRAF_RENDER__.getOriginalMethods().frame?.toString());
```

Subscribe briefly to game frames, then remove the callback:

```js
const stopRenderObserver = __AIRSTRAF_RENDER__.onFrame(state => {
  // Inspect state here; avoid console logging every frame during gameplay.
});
stopRenderObserver();
```

Additional controls:

```js
__AIRSTRAF_RENDER__.setEnabled(false); // Bypass accounting and callbacks.
__AIRSTRAF_RENDER__.setEnabled(true);
__AIRSTRAF_RENDER__.resetCounters();
__AIRSTRAF_RENDER__.uninstall(); // Restore wrapped methods; reload to start afresh.
```

The hook registers only the identified WebGLRenderer and GameRenderer constructors. It preserves receiver, arguments, return values and thrown errors; subscriber errors are isolated. It does not change culling, materials, camera transforms or rendering decisions. Timings are **CPU durations**, not GPU timings. Hook instrumentation is deliberately separate from lexical renaming and gets its own tests.

## Coverage and remaining work

This is **not a claim of 100% semantic deobfuscation**. The exact matcher recognizes 2,449 of 2,935 function nodes in the engine (83.4%). These function nodes include nested functions; the percentage is not a percentage of recovered variables. The remaining 486 bodies did not match exactly; some have signature/property names restored by the subsequent passes. Shader strings are preserved. Unknown names are not replaced with invented meanings.

The game imports `gpu-backend-BJChSKts.js`, which is absent from the provided archive. Fetching it from the live site returned HTTP 403. The game-level frame hook can observe the controller's backend selection, but this update cannot claim to deobfuscate or instrument the missing native WebGPU implementation.

Continue from `dist/render-renames.json` → `unmatched`, checking each body against the pinned r186 source and its game call sites. Use the separate audit files for later passes before deciding a binding still needs naming. Obtain the missing backend from an authorized source before working on its internals.

## Validation

- Lexical-normalized AST equivalence of all 75 readable files against archived originals, retaining public properties/import/export interfaces.
- Parsing and byte/checksum checks for the packaged replacements.
- Tests of replacement/fallback/update behavior and execution markers.
- Hook tests for return values, errors, receiver/arguments, duplicate registration, callback isolation, unsubscribe, disabling, restoring prototype/own methods, and verified constructor targeting.

A live Firefox gameplay test has not been performed. Upstream matching tooling uses pinned `three@0.186.0` and `terser@5.44.1`; see `docs/THREE-LICENSE.txt` for the upstream license.

/* Main-world diagnostics. No culling, material, player or camera changes. */
(() => {
  const key = '__AIRSTRAF_RENDER__';
  if (globalThis[key]?.version === 1) return;
  const records = new Map();
  const listeners = new Set();
  let latestRenderer = null, latestGame = null, enabled = true;
  let renderCalls = 0, frames = 0, lastRenderMs = 0, lastFrameMs = 0;
  let scene = null, camera = null;
  const now = () => typeof performance === 'undefined' ? Date.now() : performance.now();
  function notify() {
    for (const listener of listeners) {
      try { listener(api.getState()); } catch (error) { console.warn('[airstraf render hook] Listener failed', error); }
    }
  }
  function wrap(object, method, kind) {
    if (typeof object?.[method] !== 'function') return;
    let entry = records.get(object);
    if (!entry) { entry = new Map(); records.set(object, entry); }
    if (entry.has(method)) return;
    const original = object[method];
    const descriptor = Object.getOwnPropertyDescriptor(object, method);
    function hookedRenderMethod(...args) {
      if (!enabled) return Reflect.apply(original, this, args);
      const started = now();
      if (kind === 'render') { latestRenderer = this; scene = args[0]; camera = args[1]; renderCalls++; }
      else { latestGame = this; frames++; }
      try { return Reflect.apply(original, this, args); }
      finally {
        if (kind === 'render') lastRenderMs = now() - started;
        else { lastFrameMs = now() - started; notify(); }
      }
    }
    entry.set(method, {original, descriptor, wrapper: hookedRenderMethod});
    object[method] = hookedRenderMethod;
  }
  const api = Object.freeze({
    version: 1,
    registerRenderer(renderer) { latestRenderer = renderer; wrap(renderer, 'render', 'render'); },
    registerGame(game) { latestGame = game; wrap(game, 'frame', 'frame'); },
    getState() {
      return {enabled, renderer: latestRenderer, gameRenderer: latestGame,
        scene: latestGame?.scene ?? scene, camera: latestGame?.camera ?? camera,
        lastRenderScene: scene, lastRenderCamera: camera,
        backend: latestGame?.gpu ? 'webgpu' : latestRenderer ? 'webgl' : null,
        frames, renderCalls, lastRenderMs, lastFrameMs,
        renderInfo: latestRenderer?.info?.render ? {...latestRenderer.info.render} : null};
    },
    getOriginalMethods() {
      return {
        render: records.get(latestRenderer)?.get('render')?.original ?? latestRenderer?.render ?? null,
        frame: records.get(latestGame)?.get('frame')?.original ?? latestGame?.frame ?? null
      };
    },
    onFrame(listener) {
      if (typeof listener !== 'function') throw new TypeError('Expected a callback');
      listeners.add(listener); return () => listeners.delete(listener);
    },
    setEnabled(value) { enabled = !!value; },
    resetCounters() { frames = renderCalls = lastRenderMs = lastFrameMs = 0; },
    uninstall() {
      for (const [object, methods] of records) for (const [method, entry] of methods) {
        if (object[method] !== entry.wrapper) continue;
        if (entry.descriptor) Object.defineProperty(object, method, entry.descriptor);
        else delete object[method];
      }
      records.clear(); listeners.clear(); enabled = false;
      latestRenderer = latestGame = scene = camera = null;
    }
  });
  Object.defineProperty(globalThis, key, {value: api, configurable: true});
})();

var s = {
    frames: 0,
    busyFrames: 0,
    tickMs: 0,
    updateMs: 0,
    layoutMs: 0,
    renderMs: 0,
    updates: 0,
    layouts: 0,
    layoutNodes: 0,
    renderNodes: 0,
    styleWrites: 0,
    graphics: 0,
    texts: 0,
    textNodeWrites: 0,
    textRebuilds: 0,
    measures: 0,
    shapedMeasures: 0,
    measureMs: 0,
    animators: 0,
    tweens: 0,
    maskPlans: 0,
    maskMirrors: 0,
    slicePaints: 0,
    sliceBakes: 0,
    sliceMs: 0,
    slicePixels: 0
  },
  e = {
    on: !1,
    causes: new Map(),
    measured: []
  };
function a(s) {
  e.causes.set(s, (e.causes.get(s) ?? 0) + 1);
}
var r = new Map();
function t(s, e) {
  const a = r.get(s);
  a ? (a.updates++, a.ms += e) : r.set(s, {
    updates: 1,
    ms: e
  });
}
"undefined" != typeof performance && performance.now();
export { s as i, e as n, a as r, t };

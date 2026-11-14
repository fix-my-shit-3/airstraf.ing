import { i as t } from "./c-qDanEe2E.js";
var s = {
    programs: 0,
    textures: 0,
    textureBytes: 0,
    stagedPrograms: 0,
    stagedTextures: 0,
    stagedBytes: 0
  },
  e = [],
  r = !1,
  a = 0,
  n = {
    ...s
  };
function o(t) {
  a = Math.max(0, a + (t ? 1 : -1));
}
function i(t, s) {
  r && !a && (e.length >= 24 && e.shift(), e.push({
    at: performance.now(),
    kind: t,
    what: s,
    by: ""
  }));
}
function c(t) {
  const e = t;
  if (e.__kourWatched) return;
  e.__kourWatched = !0;
  const r = (s, r) => {
    const a = e[s];
    "function" == typeof a && (e[s] = function () {
      return r(arguments), a.apply(t, arguments);
    });
  };
  r("linkProgram", () => {
    s.programs++, a && s.stagedPrograms++, i("program", "");
  });
  const n = (t, e) => {
    const r = "number" == typeof t ? t : 0,
      n = "number" == typeof e ? e : 0;
    s.textures++, s.textureBytes += r * n * 4, a && (s.stagedTextures++, s.stagedBytes += r * n * 4), i("texture", `${r}x${n}`);
  };
  r("texStorage2D", t => n(t[3], t[4])), r("texImage2D", t => {
    if (0 !== t[1]) return;
    if (t.length >= 9) return n(t[3], t[4]);
    const s = t[5];
    n(s?.width, s?.height);
  }), r("compressedTexImage2D", t => {
    0 === t[1] && n(t[3], t[4]);
  });
}
var u = () => r,
  h = new class t {
    loaded;
    $_71s;
    now;
    waiting = [];
    timer = null;
    seq = 0;
    costs = new Map();
    gap = 0;
    last = 0;
    budgetMs = 1;
    $_jsb = 0;
    constructor(t, s = 120, e = () => performance.now()) {
      this.loaded = t, this.$_71s = s, this.now = e;
    }
    get size() {
      return this.waiting.length;
    }
    turn(t = "other", s) {
      return this.loaded() ? new Promise(e => {
        this.waiting.push({
          resolve: e,
          kind: t,
          rank: s ?? null,
          seq: this.seq++,
          at: 0
        }), this.arm();
      }) : Promise.resolve();
    }
    measure(t, s) {
      if (!(s >= 0)) return;
      const e = this.costs.get(t);
      this.costs.set(t, void 0 === e ? s : e + .25 * (s - e));
    }
    cost(t) {
      return this.costs.get(t) ?? 4;
    }
    $_38r4() {
      const t = {};
      for (const [s, e] of this.costs) t[s] = Math.round(100 * e) / 100;
      return t;
    }
    static budget(t) {
      return t > 0 ? Math.min(6, Math.max(1, .3 * t)) : 1;
    }
    pump() {
      const s = this.now();
      if (this.last) {
        const t = s - this.last;
        t > 0 && t < 250 && (this.gap = this.gap ? this.gap + .1 * (t - this.gap) : t);
      }
      this.last = s, this.waiting.length && (this.budgetMs = t.budget(this.gap), this.release(this.waiting.length > 12 ? 2 : 1), this.$_4xd(), this.arm());
    }
    release(t) {
      const s = this.waiting;
      let e = !1;
      for (const n of s) n.rank ? (n.at = n.rank(), e = !0) : n.at = 1;
      e && s.sort((leftItem, rightItem) => leftItem.at - rightItem.at || leftItem.seq - rightItem.seq);
      let r = 0,
        a = 0;
      for (; s.length && a < 16;) {
        const e = this.cost(s[0].kind);
        if (a >= t && r + e > this.budgetMs) break;
        r += e, a++, s.shift().resolve();
      }
      this.$_jsb = r;
    }
    arm() {
      null === this.timer && this.waiting.length && (this.timer = setTimeout(() => {
        if (this.timer = null, this.loaded()) this.release(1);else for (const t of this.waiting.splice(0)) t.resolve();
        this.arm();
      }, this.$_71s));
    }
    $_4xd() {
      null !== this.timer && clearTimeout(this.timer), this.timer = null;
    }
  }(() => u()),
  f = (t = "other", s) => h.turn(t, s),
  l = () => h.pump(),
  m = (t, s) => h.measure(t, s),
  g = ["other", "net", "world", "anim", "particles", "shadows", "minimap", "render", "post", "ui", "portrait"],
  p = Object.fromEntries(g.map((item, index) => [item, index])),
  d = g.length,
  M = new Float64Array(d),
  w = new Float64Array(d),
  x = 0,
  b = 0,
  y = 0,
  k = 0,
  P = 0,
  T = new Float32Array(2048),
  v = 0,
  A = new Float32Array(2048),
  S = 0,
  F = 0,
  K = 0,
  j = 0,
  D = 0,
  q = 0,
  B = 0,
  I = 0,
  O = 0,
  R = null,
  $ = 0,
  z = 0,
  C = 0,
  H = 0,
  L = [],
  N = 0,
  U = 0,
  W = 0,
  _ = new Map(),
  E = new Map(),
  G = null;
function J(t) {
  R = t;
}
function Q() {
  return 0;
}
function V(t, s) {}
function X(t, s) {}
function Y(t, s = 1) {}
function Z() {
  r = !0, Object.assign(n, s), e.length = 0, G = new WeakSet(R?.info.programs ?? []);
}
function tt() {
  r = !1, e.length = 0, G = null;
}
function st(t) {}
function et() {}
function rt() {}
function at() {}
function nt(t, s, e) {
  return s ? Array.from(t.subarray(0, s)).sort((leftItem, rightItem) => leftItem - rightItem)[Math.min(s - 1, Math.floor(s * e))] : 0;
}
var ot = (t, s = 3) => {
  const e = 10 ** s;
  return Math.round(t * e) / e;
};
function it(a = !0) {
  const o = performance.now(),
    i = Math.max(1, x),
    c = {};
  g.forEach((item, index) => c[item] = ot(M[index] / i));
  const u = t.tickMs + t.updateMs,
    f = t.frames,
    l = u >= $ && f > z ? u - $ : u,
    m = R?.info,
    p = function () {
      const t = performance.now(),
        a = r ? s.stagedPrograms - n.stagedPrograms : 0,
        o = r ? s.stagedTextures - n.stagedTextures : 0,
        i = r ? s.stagedBytes - n.stagedBytes : 0;
      return {
        marked: r,
        programs: r ? s.programs - n.programs - a : 0,
        textures: r ? s.textures - n.textures - o : 0,
        textureKb: r ? Math.round((s.textureBytes - n.textureBytes - i) / 1024) : 0,
        stagedPrograms: a,
        stagedTextures: o,
        stagedKb: Math.round(i / 1024),
        recent: e.map(item => ({
          secondsAgo: Math.round((t - item.at) / 100) / 10,
          kind: item.kind,
          what: item.what,
          by: item.by
        }))
      };
    }(),
    d = [];
  if (G && m?.programs) for (const t of m.programs) if (!G.has(t)) {
    const {
      name: s,
      type: e
    } = t;
    d.push(s || e || "?");
  }
  const J = {};
  for (const [t, s] of _) J[t] = {
    count: s.count,
    ms: ot(s.ms, 2),
    max: ot(s.max, 2)
  };
  const Q = {};
  for (const [t, s] of E) Q[t] = s;
  for (; L.length && o - L[0].at > 3e4;) L.shift();
  const V = {
    windowMs: Math.round(o - S),
    frames: x,
    fps: ot(1e3 * (x + k) / Math.max(1, o - S), 1),
    hitches: k,
    hitchMs: Math.round(P),
    frameMs: ot(b / i),
    frameP50: ot(nt(T, v, .5)),
    frameP99: ot(nt(T, v, .99)),
    frameMax: ot(y),
    gapP50: ot(nt(A, v, .5)),
    gapP99: ot(nt(A, v, .99)),
    over4: F,
    over16: K,
    sections: c,
    calls: ot(j / i, 1),
    callsMax: q,
    triangles: Math.round(D / i),
    trianglesMax: B,
    programs: m?.programs?.length ?? 0,
    geometries: m?.memory.geometries ?? 0,
    textures: m?.memory.textures ?? 0,
    heapMb: ot((performance.memory?.usedJSHeapSize ?? 0) / 1048576, 1),
    allocKbPerFrame: ot(I / 1024 / i, 2),
    gcDrops: O,
    uiRuntimeMs: ot(l / i),
    longFrames: C,
    gapMax: ot(H, 1),
    gapTypical: ot(0, 2),
    longLog: L.map(item => ({
      secondsAgo: ot((o - item.at) / 1e3, 1),
      gapMs: ot(item.gapMs, 1),
      jsMs: ot(item.jsMs, 1),
      programs: item.programs,
      textures: item.textures,
      work: item.work
    })),
    latePrograms: p.programs,
    lateTextureUploads: p.textures,
    lateTextureKb: p.textureKb,
    stagedPrograms: p.stagedPrograms,
    stagedTextures: p.stagedTextures,
    stagedTextureKb: p.stagedKb,
    lateRecent: p.recent,
    lateProgramNames: d,
    work: J,
    workSpans: W,
    workSpanSteps: U,
    workSpanMs: ot(N, 1),
    created: Q,
    staging: {
      budgetMs: Math.round(100 * h.budgetMs) / 100,
      costs: h.$_38r4(),
      waiting: h.size
    }
  };
  return a && (M.fill(0), w.fill(0), x = b = y = F = K = k = P = 0, j = D = q = B = 0, I = O = 0, C = H = 0, _.clear(), W = U = N = 0, E.clear(), v = 0, S = o, $ = u, z = f), V;
}
var ct = [];
function ut() {
  return {
    seconds: ct.slice(),
    last: null
  };
}
function ht() {
  return R;
}
function ft(t) {}
"undefined" != typeof location && /[?&]perf\b/.test(location.search);
export { c as C, s as S, m as _, et as a, u as b, ut as c, it as d, tt as f, ft as g, V as h, Y as i, Z as l, Q as m, J as n, rt as o, X as p, st as r, at as s, p as t, ht as u, l as v, o as x, f as y };

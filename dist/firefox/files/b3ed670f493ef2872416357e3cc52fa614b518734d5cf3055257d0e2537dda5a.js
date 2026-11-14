import { t } from "./c-Cw4QBOSY.js";
import { Dt as LinearSRGBColorSpace, Rr as Vector2, c as WebGLRenderer, sn as Quaternion, zr as Vector3 } from "./three-Bi9Yyrpt.js";
import "./c-CmJ6BJHY.js";
import { _ as r, d as o, f as h, g as c, l as u } from "./c-DHGnaUyg.js";
var l = new Quaternion(.3214637041, -.4579333067, .1649940163, .812240839),
  f = null;
function m() {
  if (f) return f;
  const t = o(),
    s = new Vector3(0, 0, 1).applyQuaternion(l).negate();
  return u.uLightDir.value.set(-s.x, s.y, s.z), u.uLightColor.value.setRGB(1, 1, 1), r(1, [.8915094137, .9430024028, 1], [1, .9945321083, .9198113084], [.7264150977, .2974438667, .2364275604]), u.uFog.value.set(0, 0, 300, .01), u.uPointCount.value = 0, f = o(), c(t), f;
}
var p = [],
  v = 0;
function d(t, s) {
  if (!t) return s();
  const i = p[v] ? h(p[v]) : p[v] = o();
  v++, c(t);
  try {
    s();
  } finally {
    v--, c(i);
  }
}
var x = null,
  M = new Vector2(),
  w = {
    w: 0,
    h: 0,
    since: -1 / 0
  };
function y() {
  if (!x) {
    const element = document.createElement("canvas");
    t(element), (x = new WebGLRenderer({
      canvas: element,
      alpha: !0,
      antialias: !1
    })).outputColorSpace = LinearSRGBColorSpace, x.setClearColor(0, 0);
  }
  return x;
}
var j = class {
  canvas = document.createElement("canvas");
  ctx = null;
  host = null;
  constructor() {
    this.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:auto;touch-action:none";
  }
  measured = 0;
  $_1dr = -1 / 0;
  attach(t) {
    return this.host !== t && (this.host = t, this.$_1dr = -1 / 0, t ? t.append(this.canvas) : this.canvas.remove(), !0);
  }
  get visible() {
    const t = this.host;
    return !!t && t.isConnected && t.clientWidth > 0 && t.clientHeight > 0;
  }
  devicePixels(t = performance.now()) {
    const s = this.host;
    if (!s) return 0;
    if (t - this.$_1dr >= 250) {
      const i = "number" == typeof devicePixelRatio && devicePixelRatio > 0 ? devicePixelRatio : 1,
        bounds = s.getBoundingClientRect();
      this.measured = Math.max(bounds.width, bounds.height) * i, this.$_1dr = t;
    }
    return this.measured;
  }
  present(t, s, i) {
    const n = y();
    n.getSize(M);
    const e = function (t, s, i, n, e, a = 3e3) {
      let r = Math.max(t.x, s),
        o = Math.max(t.y, i);
      return n - e.since >= a && (e.since > -1 / 0 && e.w > 0 && (e.w < r || e.h < o) && (r = Math.max(e.w, s), o = Math.max(e.h, i)), e.w = 0, e.h = 0, e.since = n), e.w = Math.max(e.w, s), e.h = Math.max(e.h, i), {
        x: r,
        y: o
      };
    }(M, t, s, performance.now(), w);
    e.x === M.x && e.y === M.y || (n.setSize(e.x, e.y, !1), n.getSize(M)), n.setRenderTarget(null), n.setViewport(0, 0, t, s), i(n), this.canvas.width === t && this.canvas.height === s || (this.canvas.width = t, this.canvas.height = s, this.ctx = null), this.ctx ??= this.canvas.getContext("2d"), this.ctx && (this.ctx.globalCompositeOperation = "copy", this.ctx.drawImage(n.domElement, 0, M.y - s, t, s, 0, 0, t, s));
  }
};
export { d as i, y as n, m as r, j as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-CHK4kGoZ.js","readableSha256":"bddaa988f77649df2cf5f9797c826a6d556ef93e89f3cc962a8858a792e6efbd"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

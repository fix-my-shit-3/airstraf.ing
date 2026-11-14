import { Ai as n, ki as t } from "./c-DRieNrHJ.js";
import { n as r } from "./c-C4hbbDNp.js";
import { n as e } from "./c-C1mpvyXQ.js";
var o = function (n) {
    return n[n.Visible = 0] = "Visible", n[n.Soon = 1] = "Soon", n;
  }({}),
  i = 1024 * ("undefined" != typeof navigator && (navigator.deviceMemory ?? 8) <= 4 ? 48 : 96) * 1024,
  s = new Map(),
  a = new Set(),
  u = 0,
  f = 0,
  c = 0;
function l(n) {
  return new Promise(t => {
    const r = new Image();
    r.decoding = "async", r.onload = () => {
      const n = () => t(r);
      "function" == typeof r.decode ? r.decode().then(n, n) : n();
    }, r.onerror = () => t(null), r.src = n;
  });
}
function m() {
  for (; u < 8;) {
    let n = null;
    for (const r of s.values()) "queued" === r.state && (!n || r.priority < n.priority || r.priority === n.priority && r.seq < n.seq) && (n = r);
    if (!n) return;
    const t = n;
    t.state = "loading", u++, l(t.url).then(n => {
      u--, t.image = n, t.state = n ? "ready" : "error", n && s.get(t.url) === t && (t.bytes = (n.naturalWidth || n.width) * (n.naturalHeight || n.height) * 4, c += t.bytes), t.resolve(n), d(), m();
    });
  }
}
function d() {
  if (!(s.size <= 400 && c <= i)) for (const [n, t] of s) {
    if (s.size <= 400 && c <= i) break;
    "ready" !== t.state && "error" !== t.state || (s.delete(n), c -= t.bytes);
  }
}
function y(n) {
  s.delete(n.url), s.set(n.url, n);
}
async function p(n, t = () => !0) {
  const r = [...new Set(n)].filter(n => !s.has(n) && !a.has(n));
  await Promise.all(Array.from({
    length: 2
  }, async () => {
    for (let n = r.shift(); n; n = r.shift()) {
      for (; !t();) await new Promise(n => setTimeout(n, 1e3));
      if (!s.has(n) && !a.has(n)) {
        a.add(n);
        try {
          await (await fetch(n, {
            priority: "low"
          })).arrayBuffer();
        } catch {}
      }
    }
  }));
}
var w = "/assets/extracted/stream-slot",
  g = null,
  h = null;
function v() {
  return h ??= e(`${w}/index.json`).then(n => n.ok ? n.json() : null).then(n => g = n && 1 === n.version ? n : null).catch(() => null);
}
function M(n, t) {
  if (!(g && t > 0)) return null;
  const r = (n => n.replace(/^\/+/, "").replace(/ /g, "_20"))(n),
    e = g.files[r];
  if (!e) return null;
  const [o, i, s] = e;
  for (const a of g.sizes) {
    if (a > s) break;
    if (Math.min(a, Math.max(o, i)) >= t) return `${w}/${a}/${r}.webp`;
  }
  return null;
}
function b() {
  const r = n.state;
  return 220 * t(r.width, r.height) * r.dpr;
}
"undefined" != typeof document && v();
var $ = n => `/stream/${n.replace(/^\/+/, "").replace(/ /g, "_20")}.png`;
function j(n, t, e = o.Visible, i) {
  const a = n?.get("Image");
  if (!n || !a) return;
  const u = M(t, i ?? q(n)) ?? $(t);
  if (n.tag.imageLoad = u, function (n) {
    const t = s.get(n);
    return t && "ready" === t.state ? (y(t), t.image) : null;
  }(u)) return n.setColor([1, 1, 1, 1]), void n.$_6ks(u);
  const c = a.color;
  n.setColor([c[0], c[1], c[2], 0]), r(function (n, t = 0) {
    let r,
      e = s.get(n);
    if (e) return "queued" === e.state && t < e.priority && (e.priority = t), y(e), m(), e.promise;
    const promise = new Promise(n => r = n);
    return e = {
      url: n,
      priority: t,
      image: null,
      bytes: 0,
      state: "queued",
      promise: promise,
      resolve: r,
      seq: f++
    }, s.set(n, e), m(), promise;
  }(u, e).then(t => {
    t && n.tag.imageLoad === u && (n.setColor([1, 1, 1, 1]), n.$_6ks(u));
  }), n.host);
}
function q(n) {
  const t = n.host.deviceScale?.() ?? 0;
  if (!(t > 0)) return 0;
  let [r, e] = n.$_6ng;
  if (!(r > 0 && e > 0)) {
    const t = n.data.rt;
    if (!t || t.amin[0] !== t.amax[0] || t.amin[1] !== t.amax[1]) return 0;
    [r, e] = t.size;
  }
  let o = 1;
  for (let i = n; i; i = i.parent) {
    const n = i.data.rt?.scale,
      t = n ? Math.max(Math.abs(n[0]), Math.abs(n[1])) : 1;
    t > 0 && (o *= t);
  }
  return Math.max(r, e) * o * t;
}
export { b as a, p as c, v as i, j as n, M as o, $ as r, o as s, q as t };

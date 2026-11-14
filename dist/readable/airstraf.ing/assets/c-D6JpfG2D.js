import { Cr as t, Ct as n, Fn as r, Nn as e, O as o, Sr as a, Tt as s, Wn as i, kn as c } from "./three-Bi9Yyrpt.js";
import { a as u, n as f } from "./c-C1mpvyXQ.js";
var w = new WeakMap(),
  l = new WeakMap(),
  h = null;
async function m(n) {
  if ("undefined" == typeof document || "function" != typeof URL.createObjectURL) return (h ??= new t()).loadAsync(n);
  const r = new a(await async function (t) {
    const response = await fetch(t);
    if (!response.ok) throw new Error(`texture ${t}: ${response.status}`);
    const r = await response.blob(),
      e = URL.createObjectURL(r),
      element = document.createElement("img");
    try {
      await new Promise((n, r) => {
        element.onload = () => n(), element.onerror = () => r(new Error(`texture ${t}: no image`)), element.src = e;
      });
    } finally {
      element.onload = element.onerror = null, URL.revokeObjectURL(e);
    }
    l.set(element, t);
    const a = {
      blob: r,
      timer: null
    };
    return a.timer = setTimeout(() => w.delete(element), 6e4), w.set(element, a), element;
  }(n));
  return r.needsUpdate = !0, r;
}
function p(t) {
  if (!t || "object" != typeof t) return null;
  const n = w.get(t);
  return n ? (w.delete(t), null !== n.timer && clearTimeout(n.timer), n.blob) : null;
}
function d(t) {
  if (!t || "object" != typeof t) return;
  const n = l.get(t);
  if (n) return n;
  const r = t;
  return r.currentSrc || r.src || void 0;
}
var $ = 131,
  y = 133,
  M = 137,
  v = 145,
  E = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function b(t) {
  switch (t) {
    case 131:
    case 133:
      return 8;
    case 137:
    case 145:
      return 16;
    default:
      return 0;
  }
}
var x = null,
  T = null,
  g = {
    compressedSkins: !0,
    half: !1,
    quarter: !1
  },
  X = (t = g) => t.quarter ? 2 : t.half ? 1 : 0;
function K(t, n) {
  const r = Math.max(0, Math.floor(Number(n)));
  let e = 0;
  for (; e < r && t >> e > 64;) e++;
  return e;
}
function U(t) {
  return T = t, x = {
    s3tc: t.extensions.has("WEBGL_compressed_texture_s3tc"),
    bptc: t.extensions.has("EXT_texture_compression_bptc")
  };
}
function k() {
  return T;
}
function S(t) {
  x = t;
}
var _ = new Map();
function j(t) {
  const n = t.replace(/\/+$/, "");
  let r = _.get(n);
  return r || (r = f(`${n}/gpu-textures.json`).then(result => result.ok ? result.json() : null).then(result => result && 1 === result.version ? result.files : {}).catch(() => ({})), _.set(n, r)), r;
}
async function N(t) {
  if ("undefined" == typeof DecompressionStream) return u(t);
  const n = new Blob([t]).stream().pipeThrough(new DecompressionStream("deflate"));
  return new Uint8Array(await new Response(n).arrayBuffer());
}
var A = {
  [$]: i,
  [y]: e,
  [M]: r,
  [v]: c
};
async function D(t, r = !1) {
  const response = await fetch(t);
  if (!response.ok) throw new Error(`texture ${t}: ${response.status}`);
  const uint8Values = new Uint8Array(await response.arrayBuffer()),
    i = function (t) {
      const n = t instanceof Uint8Array ? t : new Uint8Array(t);
      if (!function (t) {
        if (t.length < 80) return !1;
        for (let n = 0; n < 12; n++) if (t[n] !== E[n]) return !1;
        return !0;
      }(n)) throw new Error("not a KTX2 file");
      const dataView = new DataView(n.buffer, n.byteOffset, n.byteLength),
        e = t => dataView.getUint32(t, !0),
        o = t => {
          if (0 !== dataView.getUint32(t + 4, !0)) throw new Error("KTX2: offset beyond 4 GB");
          return dataView.getUint32(t, !0);
        },
        a = e(12),
        s = e(20),
        i = e(24),
        c = e(28),
        u = e(32),
        f = e(36),
        w = Math.max(1, e(40)),
        l = e(44);
      if (c > 0 || u > 0 || 1 !== f) throw new Error("KTX2: not a 2D texture");
      const h = [];
      for (let $ = 0; $ < w; $++) {
        const t = 80 + 24 * $,
          r = {
            offset: o(t),
            length: o(t + 8),
            uncompressed: o(t + 16),
            width: Math.max(1, s >> $),
            height: Math.max(1, i >> $)
          };
        if (r.offset + r.length > n.length) throw new Error(`KTX2: level ${$} truncated`);
        h.push(r);
      }
      let m = "rd";
      const p = e(56),
        d = e(60);
      for (let $ = p; $ + 4 <= p + d;) {
        const t = e($),
          r = n.subarray($ + 4, $ + 4 + t),
          o = r.indexOf(0);
        if (o > 0 && "KTXorientation" === String.fromCharCode(...r.subarray(0, o))) {
          const t = r.subarray(o + 1),
            n = t.indexOf(0);
          m = String.fromCharCode(...t.subarray(0, n < 0 ? t.length : n));
        }
        $ += 4 + t + (4 - t % 4) % 4;
      }
      return {
        vkFormat: a,
        width: s,
        height: i,
        levels: h,
        supercompression: l,
        orientation: m
      };
    }(uint8Values);
  if (c = i.vkFormat, !x || !(145 === c ? x.bptc : x.s3tc && b(c) > 0)) throw new Error(`texture ${t}: vkFormat ${i.vkFormat}`);
  var c;
  const u = await async function (t, n, r) {
      const e = b(n.vkFormat);
      if (!e) throw new Error(`KTX2: vkFormat ${n.vkFormat}`);
      const o = [];
      for (const a of n.levels) {
        const s = t.subarray(a.offset, a.offset + a.length);
        let i;
        if (0 === n.supercompression) i = s;else {
          if (3 !== n.supercompression) throw new Error(`KTX2: supercompression ${n.supercompression}`);
          i = await r(s);
        }
        const c = Math.ceil(a.width / 4) * Math.ceil(a.height / 4) * e;
        if (i.length !== c || i.length !== a.uncompressed) throw new Error(`KTX2: level ${a.width}x${a.height} has ${i.length} bytes`);
        o.push(i);
      }
      return o;
    }(uint8Values, i, N),
    f = function (t, n) {
      const r = Math.max(0, Math.floor(Number(n)));
      let e = 0;
      for (; e < r && e + 1 < t.length && Math.max(t[e].width, t[e].height) > 64;) e++;
      return e ? t.slice(e) : t;
    }(i.levels.map((item, index) => ({
      data: u[index],
      width: item.width,
      height: item.height
    })), r),
    w = f,
    l = new o(w, f[0].width, f[0].height, A[i.vkFormat]);
  if (!i.orientation.startsWith("ru")) throw new Error(`texture ${t}: rows top-down`);
  return l.flipY = !1, l.generateMipmaps = !1, l.minFilter = w.length > 1 ? s : n, l.magFilter = n, l.name = t, l.needsUpdate = !0, l;
}
async function F(t, n) {
  const r = t.replace(/\/+$/, "");
  if (x?.s3tc) {
    const t = (await j(r))[n];
    if (t) try {
      return await D(`${r}/${t.ktx2}`, X());
    } catch (a) {
      console.warn("GPU texture failed, PNG instead", n, a);
    }
  }
  const e = await m(`${r}/${n}`),
    o = X();
  return o && (e.userData.halfSize = o), e;
}
var G = 1024;
function L(t, n, r = !1) {
  let e = 0;
  if ("first" !== n) {
    const n = t.findIndex(item => Math.max(item.width, item.height) <= 1024);
    e = n < 0 ? t.length - 1 : n;
  }
  for (let o = Math.max(0, Math.floor(Number(r))); o > 0 && !(e + 1 >= t.length) && !(Math.max(t[e].width, t[e].height) <= 64); o--) e++;
  return e;
}
function R(t) {
  return !0 === t.isCompressedTexture;
}
export { R as a, K as c, X as d, m as f, k as i, L as l, d as m, U as n, F as o, p, j as r, S as s, G as t, g as u };

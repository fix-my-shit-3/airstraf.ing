import { Ft as n, J as t, S as e, W as o, _ as r, _r as a, g as s, h as i, qn as c, sn as f, v as u, zr as l } from "./three-Bi9Yyrpt.js";
import { o as d } from "./c-D-fVO02v.js";
import "./c-HBMF4bPX.js";
var m = {
    flat: 1e-4,
    flatAbs: 1e-5,
    near: 1e-4,
    corner: 1e-6
  },
  p = "collision-edges.bin";
function w(n) {
  const t = n instanceof Uint8Array ? n : new Uint8Array(n);
  if (t.byteLength < 12) return null;
  const e = new DataView(t.buffer, t.byteOffset, 12);
  if (826622795 !== e.getUint32(0, !0)) return null;
  const o = e.getUint32(4, !0);
  return t.byteLength !== 12 + o ? null : {
    triangles: o,
    hash: e.getUint32(8, !0),
    flags: t.slice(12)
  };
}
var h = new WeakMap();
function b(n, t) {
  t && h.set(n, t);
}
function M(n) {
  return h.get(n) ?? null;
}
function y(n) {
  const t = n.geometry,
    e = t.index.array,
    o = t.attributes.position,
    r = o.count,
    a = e.length / 3,
    s = new Float64Array(3 * r),
    i = new Float32Array(3 * r);
  for (let m = 0; m < r; m++) i[3 * m] = o.getX(m), i[3 * m + 1] = o.getY(m), i[3 * m + 2] = o.getZ(m);
  for (let m = 0; m < i.length; m++) 0 === i[m] && (i[m] = 0), s[m] = i[m];
  const c = new Uint32Array(i.buffer),
    f = new Int32Array(r);
  let u = 0;
  {
    let n = 16;
    for (; n < 2 * r;) n *= 2;
    const t = n - 1,
      e = new Int32Array(n).fill(-1);
    for (let o = 0; o < r; o++) {
      const n = c[3 * o],
        r = c[3 * o + 1],
        a = c[3 * o + 2];
      let s = (Math.imul(n, 2654435761) ^ Math.imul(r, 2246822519) ^ Math.imul(a, 3266489917)) & t;
      for (;;) {
        const i = e[s];
        if (i < 0) {
          e[s] = o, f[o] = u++;
          break;
        }
        if (c[3 * i] === n && c[3 * i + 1] === r && c[3 * i + 2] === a) {
          f[o] = f[i];
          break;
        }
        s = s + 1 & t;
      }
    }
  }
  const l = new Float64Array(3 * a),
    d = new Uint8Array(a);
  for (let m = 0; m < a; m++) {
    const n = 3 * e[3 * m],
      t = 3 * e[3 * m + 1],
      o = 3 * e[3 * m + 2],
      r = s[o] - s[t],
      a = s[o + 1] - s[t + 1],
      i = s[o + 2] - s[t + 2],
      c = s[n] - s[t],
      f = s[n + 1] - s[t + 1],
      u = s[n + 2] - s[t + 2],
      p = a * u - i * f,
      w = i * c - r * u,
      h = r * f - a * c,
      b = Math.sqrt(p * p + w * w + h * h);
    b > 1e-12 ? (l[3 * m] = p / b, l[3 * m + 1] = w / b, l[3 * m + 2] = h / b) : d[m] = 1;
  }
  const p = 3 * a,
    w = new Int32Array(p).fill(-1),
    h = new Int32Array(p);
  {
    let n = 16;
    for (; n < 2 * p;) n *= 2;
    const t = n - 1,
      o = new Int32Array(n).fill(-1);
    for (let r = 0; r < p; r++) {
      const n = r / 3 | 0,
        a = r - 3 * n,
        s = f[e[3 * n + a]],
        i = f[e[3 * n + (a + 1) % 3]],
        c = s < i ? s : i,
        u = s < i ? i : s;
      let l = (Math.imul(c, 2654435761) ^ Math.imul(u, 2246822519)) & t;
      for (;;) {
        const n = o[l];
        if (n < 0) {
          o[l] = r, h[r] = r;
          break;
        }
        const a = n / 3 | 0,
          s = n - 3 * a,
          i = f[e[3 * a + s]],
          d = f[e[3 * a + (s + 1) % 3]];
        if (i === c && d === u || i === u && d === c) {
          h[r] = n, w[r] = w[n], w[n] = r;
          break;
        }
        l = l + 1 & t;
      }
    }
  }
  const b = [],
    M = m.near;
  let y = 0,
    v = 0,
    k = 0,
    x = 0,
    A = 0,
    g = 0,
    I = 0,
    S = 0,
    U = 0,
    $ = 0,
    z = 0,
    N = 0,
    F = 0,
    C = 0,
    j = -1;
  const K = n => {
      if (n !== j && !d[n] && Math.abs(l[3 * n] * S + l[3 * n + 1] * U + l[3 * n + 2] * $) > .99) for (let t = 0; t < 3; t++) {
        const o = 3 * e[3 * n + t],
          r = 3 * e[3 * n + (t + 1) % 3],
          a = 3 * e[3 * n + (t + 2) % 3],
          i = (s[o] - y) * x + (s[o + 1] - v) * A + (s[o + 2] - k) * g;
        let c = s[o] - y - x * i,
          f = s[o + 1] - v - A * i,
          u = s[o + 2] - k - g * i;
        if (!(c * c + f * f + u * u <= M * M)) continue;
        const l = (s[r] - y) * x + (s[r + 1] - v) * A + (s[r + 2] - k) * g;
        if (c = s[r] - y - x * l, f = s[r + 1] - v - A * l, u = s[r + 2] - k - g * l, !(c * c + f * f + u * u <= M * M)) continue;
        const d = s[a] - y,
          p = s[a + 1] - v,
          w = s[a + 2] - k,
          h = d * z + p * N + w * F;
        if (!(h * C < 0 && Math.abs(h) > M)) continue;
        const j = d * S + p * U + w * $;
        if (!(Math.abs(j) <= m.flat * Math.abs(h) + m.flatAbs)) continue;
        const K = Math.max(0, Math.min(i, l)),
          B = Math.min(I, Math.max(i, l));
        B > K && b.push(K, B);
      }
    },
    B = [],
    P = () => {
      if (!b.length) return !1;
      B.length = 0;
      for (let t = 0; t < b.length; t += 2) B.push(t);
      B.length > 1 && B.sort((n, t) => b[n] - b[t] || b[n + 1] - b[t + 1]);
      let n = 0;
      for (const t of B) {
        if (b[t] > n + M) return !1;
        if (b[t + 1] > n && (n = b[t + 1]), n >= I - M) return !0;
      }
      return n >= I - M;
    },
    L = n._roots.map(n => ({
      f32: new Float32Array(n),
      u32: new Uint32Array(n),
      u16: new Uint16Array(n)
    })),
    Z = new Int32Array(256);
  let _ = 0,
    O = 0,
    T = 0,
    D = 0,
    H = 0,
    J = 0;
  const W = () => {
      for (const {
        f32: n,
        u32: t,
        u16: e
      } of L) {
        let o = 0;
        for (Z[o++] = 0; o > 0;) {
          const r = Z[--o];
          if (D >= n[r] && _ <= n[r + 3] && H >= n[r + 1] && O <= n[r + 4] && J >= n[r + 2] && T <= n[r + 5]) if (65535 === e[2 * r + 15]) {
            const n = t[r + 6],
              o = e[2 * r + 14];
            for (let t = n; t < n + o; t++) K(t);
          } else Z[o++] = r + 8 * t[r + 6], Z[o++] = r + 8;
        }
      }
    },
    q = new Uint8Array(a);
  for (let m = 0; m < a; m++) {
    if (d[m]) {
      q[m] = 63;
      continue;
    }
    let n = 0;
    for (let t = 0; t < 3; t++) {
      const o = 3 * e[3 * m + t],
        r = 3 * e[3 * m + (t + 1) % 3],
        a = 3 * e[3 * m + (t + 2) % 3];
      y = s[o], v = s[o + 1], k = s[o + 2];
      const i = s[r] - y,
        c = s[r + 1] - v,
        f = s[r + 2] - k;
      if (I = Math.sqrt(i * i + c * c + f * f), !(I > M)) {
        n |= 1 << t;
        continue;
      }
      x = i / I, A = c / I, g = f / I, S = l[3 * m], U = l[3 * m + 1], $ = l[3 * m + 2], z = U * g - $ * A, N = $ * x - S * g, F = S * A - U * x, C = (s[a] - y) * z + (s[a + 1] - v) * N + (s[a + 2] - k) * F, j = m, b.length = 0;
      const u = 3 * m + t;
      for (let n = h[u]; n >= 0; n = w[n]) n !== u && K(n / 3 | 0);
      P() || (b.length = 0, _ = Math.min(y, s[r]) - M, O = Math.min(v, s[r + 1]) - M, T = Math.min(k, s[r + 2]) - M, D = Math.max(y, s[r]) + M, H = Math.max(v, s[r + 1]) + M, J = Math.max(k, s[r + 2]) + M, W(), P() || (n |= 1 << t));
    }
    q[m] = n;
  }
  const E = new Uint8Array(u).fill(1);
  for (let m = 0; m < a; m++) for (let n = 0; n < 3; n++) (q[m] & (1 << n | 1 << (n + 2) % 3) || d[m]) && (E[f[e[3 * m + n]]] = 0);
  for (let m = 0; m < a; m++) for (let n = 0; n < 3; n++) E[f[e[3 * m + n]]] || (q[m] |= 8 << n);
  return q;
}
function v(n, t) {
  const e = new Uint8Array(t.length / 3);
  for (let o = 0; o < e.length; o++) e[o] = n[t[3 * o] / 3];
  return e;
}
var k = {
    solid: 0,
    wood: 1,
    metal: 2,
    glass: 3,
    cardboard: 4
  },
  x = n => {
    const t = 127 & n;
    return 126 === t || 125 === t;
  },
  A = n => 125 == (127 & n),
  g = n => n >= 0 && n < 32 && 1 == (75123 >>> n & 1),
  I = ["solid", "wood", "metal", "glass", "cardboard"],
  S = /concrete|brick|stone|rock|dirt|aarde|sand|snow|ground|terrain|grid|probuilder|moon|unbreakable|bedrock|cobbl|asphalt|road|tile|marble|cement|wall|lava/,
  U = [[/glass|window|\bpane\b/, k.glass], [/cardboard|carton|paper|\bbox(?:es)?(?![a-z])/, k.cardboard], [/metal|steel|iron|\btin\b|sheet|corrugat|container|garage|vent|locker|chainlink|chain link|elevator|bars|truck|\bcar\b|\bbin\d*\b|barrel|grate|shutter|computer|monitor|\btv\b|screen/, k.metal], [/wood|plank|crate|pallet|cabinet|door|desk|shelf|table|chair|simpleofficeinteriors|fence|board|\blog\b|bench/, k.wood]];
function $(n, t) {
  if ("string" == typeof (e = t.surface) && I.includes(e)) return k[t.surface];
  var e;
  const o = [];
  for (const r of t.materials ?? []) {
    const t = r ? n.materials[r] : void 0;
    t && o.push(t.name);
  }
  return function (n, t = "") {
    const e = [...n, t].map(n => n.toLowerCase()).filter(Boolean);
    if (!e.length) return k.solid;
    if (e.some(n => S.test(n))) return k.solid;
    for (const o of e) for (const [n, t] of U) if (n.test(o)) return t;
    return k.solid;
  }(o, t.name);
}
var z = Math.cos(35 * Math.PI / 180),
  N = .001;
function F(n, t, e, o, r) {
  const a = n[t],
    s = n[t + 1],
    i = n[t + 2],
    c = n[t + 3] - a,
    f = n[t + 4] - s,
    u = n[t + 5] - i,
    l = n[t + 6] - a,
    d = n[t + 7] - s,
    m = n[t + 8] - i,
    p = e - a,
    w = o - s,
    h = r - i,
    b = c * p + f * w + u * h,
    M = l * p + d * w + m * h;
  let y = 0,
    v = 0;
  n: {
    if (b <= 0 && M <= 0) break n;
    const n = p - c,
      t = w - f,
      e = h - u,
      o = c * n + f * t + u * e,
      r = l * n + d * t + m * e;
    if (o >= 0 && r <= o) {
      y = 1;
      break n;
    }
    const a = b * r - o * M;
    if (a <= 0 && b >= 0 && o <= 0) {
      y = b / (b - o);
      break n;
    }
    const s = p - l,
      i = w - d,
      k = h - m,
      x = c * s + f * i + u * k,
      A = l * s + d * i + m * k;
    if (A >= 0 && x <= A) {
      v = 1;
      break n;
    }
    const g = x * M - b * A;
    if (g <= 0 && M >= 0 && A <= 0) {
      v = M / (M - A);
      break n;
    }
    const I = o * A - x * r;
    if (I <= 0 && r - o >= 0 && x - A >= 0) {
      v = (r - o) / (r - o + (x - A)), y = 1 - v;
      break n;
    }
    const S = 1 / (I + g + a);
    y = g * S, v = a * S;
  }
  const k = a + c * y + l * v - e,
    x = s + f * y + d * v - o,
    A = i + u * y + m * v - r;
  return k * k + x * x + A * A;
}
function C(n, t, e) {
  const o = (e[0] + e[3]) / 2,
    r = (e[1] + e[4]) / 2,
    a = (e[2] + e[5]) / 2,
    s = (e[3] - e[0]) / 2,
    i = (e[4] - e[1]) / 2,
    c = (e[5] - e[2]) / 2,
    f = [[n[t] - o, n[t + 1] - r, n[t + 2] - a], [n[t + 3] - o, n[t + 4] - r, n[t + 5] - a], [n[t + 6] - o, n[t + 7] - r, n[t + 8] - a]],
    u = [s, i, c];
  for (let m = 0; m < 3; m++) {
    const n = Math.min(f[0][m], f[1][m], f[2][m]),
      t = Math.max(f[0][m], f[1][m], f[2][m]);
    if (n > u[m] || t < -u[m]) return !1;
  }
  const l = [[f[1][0] - f[0][0], f[1][1] - f[0][1], f[1][2] - f[0][2]], [f[2][0] - f[1][0], f[2][1] - f[1][1], f[2][2] - f[1][2]], [f[0][0] - f[2][0], f[0][1] - f[2][1], f[0][2] - f[2][2]]],
    d = (n, t, e) => {
      const o = f[0][0] * n + f[0][1] * t + f[0][2] * e,
        r = f[1][0] * n + f[1][1] * t + f[1][2] * e,
        a = f[2][0] * n + f[2][1] * t + f[2][2] * e,
        u = s * Math.abs(n) + i * Math.abs(t) + c * Math.abs(e);
      return Math.min(o, r, a) > u || Math.max(o, r, a) < -u;
    };
  for (const [m, p, w] of l) {
    if (d(0, -w, p)) return !1;
    if (d(w, 0, -m)) return !1;
    if (d(-p, m, 0)) return !1;
  }
  return !d(l[0][1] * l[1][2] - l[0][2] * l[1][1], l[0][2] * l[1][0] - l[0][0] * l[1][2], l[0][0] * l[1][1] - l[0][1] * l[1][0]);
}
var j = [1, 2, 4],
  K = [8, 16, 32];
function B(n, t, e, o) {
  const r = Math.floor(t.length / 3),
    lookupMap = new Map(),
    s = new Int32Array(3 * r);
  for (let m = 0; m < 3 * r; m++) {
    const n = 3 * t[m],
      o = `${Math.round(e[n] / N)},${Math.round(e[n + 1] / N)},${Math.round(e[n + 2] / N)}`;
    let r = lookupMap.get(o);
    void 0 === r && lookupMap.set(o, r = lookupMap.size), s[m] = r;
  }
  const i = lookupMap.size + 1,
    c = new Uint8Array(lookupMap.size),
    uniqueItems = new Set(),
    u = (n, t) => n < t ? n * i + t : t * i + n,
    l = n => 1 === o[t[3 * n]];
  for (let m = 0; m < r; m++) if (!l(m)) for (let n = 0; n < 3; n++) c[s[3 * m + n]] = 1, uniqueItems.add(u(s[3 * m + n], s[3 * m + (n + 1) % 3]));
  let d = 0;
  for (let m = 0; m < r; m++) {
    if (!l(m)) continue;
    let t = n[m];
    for (let n = 0; n < 3; n++) uniqueItems.has(u(s[3 * m + n], s[3 * m + (n + 1) % 3])) && (t &= ~j[n]), c[s[3 * m + n]] && (t &= ~K[n]);
    t !== n[m] && (n[m] = t, d++);
  }
  return d;
}
var P = /\/edge-\d+$/,
  L = /^Barrier edge \d+$/,
  Z = n => 11 === n.layer && !n.mesh && P.test(n.id) && L.test(n.name),
  _ = n => 96 + n;
function O(n, t, e) {
  const o = Math.min(e, 32);
  for (let r = 0; r < o; r++) n.setSlotRemoved(_(r), !!(t & 1 << r));
}
var T = n => 128 + n,
  D = n => n >= 128 && n < 192;
function H(n, t, e) {
  if (!t) return;
  const o = Math.min(t.length, 64);
  for (let r = 0; r < o; r++) n.setSlotRemoved(T(r), e - t[r] <= 90);
}
function J(n) {
  const e = new u();
  e.setAttribute("position", new t(n.positions, 3)), n.normals.length === n.positions.length && e.setAttribute("normal", new t(n.normals, 3)), n.uv.length === n.positions.length / 3 * 2 && e.setAttribute("uv", new t(n.uv, 2));
  const o = n.indices;
  e.setIndex(Array.isArray(o) ? o : new r(o instanceof Uint16Array || o instanceof Uint32Array ? o : Uint32Array.from(o), 1));
  for (const [t, r, a] of n.groups) e.addGroup(t, r, a);
  return e.getAttribute("normal") || e.computeVertexNormals(), e;
}
function W(t) {
  const lookupMap = new Map(t.nodes.map(n => [n.id, n])),
    _lookupMap = new Map(),
    r = new n().makeScale(-1, 1, 1);
  function a(t) {
    const s = _lookupMap.get(t.id);
    if (s) return s;
    const i = t.parent ? lookupMap.get(t.parent) : void 0,
      c = i ? a(i) : {
        matrix: r,
        active: !0
      },
      u = new n().compose(new l(...t.position), new f(...t.rotation), new l(...t.scale)),
      d = {
        matrix: c.matrix.clone().multiply(u),
        active: c.active && t.active
      };
    return _lookupMap.set(t.id, d), d;
  }
  return t.nodes.map(n => ({
    node: n,
    ...a(n)
  }));
}
function q(n, t) {
  const lookupMap = new Map(n.nodes.map(n => [n.id, n.parent])),
    _lookupMap2 = new Map(),
    r = n => {
      if (!n) return !1;
      if (t.has(n)) return !0;
      const a = _lookupMap2.get(n);
      if (void 0 !== a) return a;
      const s = r(lookupMap.get(n) ?? null);
      return _lookupMap2.set(n, s), s;
    };
  return new Set(n.nodes.filter(n => r(n.id)).map(n => n.id));
}
var E = new l(),
  G = new l(),
  Q = new l(),
  R = new l();
function V(n) {
  const t = n.getAttribute("position"),
    e = n.getIndex(),
    o = e?.count ?? t.count;
  if (o < 3) return !1;
  const r = n => e ? e.getX(n) : n;
  R.set(0, 0, 0);
  for (let i = 0; i < o; i++) {
    const n = r(i);
    R.x += t.getX(n), R.y += t.getY(n), R.z += t.getZ(n);
  }
  R.multiplyScalar(1 / o);
  let a = 0,
    s = 0;
  for (let i = 0; i + 2 < o; i += 3) {
    E.fromBufferAttribute(t, r(i)).sub(R), G.fromBufferAttribute(t, r(i + 1)).sub(R), Q.fromBufferAttribute(t, r(i + 2)).sub(R);
    const n = E.dot(G.cross(Q));
    a += n, s += Math.abs(n);
  }
  return a < -1e-6 * s;
}
function X(n) {
  const t = n.getAttribute("position"),
    e = n.getIndex(),
    o = e?.count ?? t.count;
  if (o < 12) return !1;
  const lookupMap = new Map(),
    a = n => {
      const o = e ? e.getX(n) : n,
        a = `${Math.round(1e3 * t.getX(o))},${Math.round(1e3 * t.getY(o))},${Math.round(1e3 * t.getZ(o))}`;
      let s = lookupMap.get(a);
      return void 0 === s && lookupMap.set(a, s = lookupMap.size), s;
    },
    _lookupMap3 = new Map();
  for (let i = 0; i + 2 < o; i += 3) {
    const n = a(i),
      t = a(i + 1),
      e = a(i + 2);
    if (n !== t && t !== e && n !== e) for (const [o, r] of [[n, t], [t, e], [e, n]]) {
      const n = o < r ? `${o}:${r}` : `${r}:${o}`;
      _lookupMap3.set(n, (_lookupMap3.get(n) ?? 0) + 1);
    }
  }
  if (!_lookupMap3.size) return !1;
  for (const i of _lookupMap3.values()) if (i % 2) return !1;
  return !0;
}
function Y(n, o = new Set(), i = new Set(), c = new Map(), f) {
  const l = [],
    d = [],
    m = [],
    p = i.size ? q(n, i) : i,
    w = f ? null : n.deathSurfaces,
    h = [];
  for (const {
    node: t,
    matrix: r,
    active: u
  } of W(n)) if (u && 5 !== t.layer && 6 !== t.layer && !p.has(t.id) && (!f || f(t))) for (const i of t.colliders ?? []) {
    let f;
    if ("box" === i.type) f = new s(...i.size).translate(...i.center);else if ("sphere" === i.type) f = new a(i.radius, 12, 8).translate(...i.center);else if ("capsule" === i.type) f = new e(i.radius, Math.max(0, i.height - 2 * i.radius), 3, 10), 0 === i.direction ? f.rotateZ(Math.PI / 2) : 2 === i.direction && f.rotateX(Math.PI / 2), f.translate(...i.center);else {
      if (!i.mesh || !n.meshes[i.mesh]) continue;
      f = J(n.meshes[i.mesh]);
    }
    f.applyMatrix4(r);
    const u = f.getAttribute("position"),
      p = f.getIndex(),
      b = c.get(t.id),
      M = void 0 !== b ? 2 + b : o.has(t.id) ? 1 : 0,
      y = (void 0 !== b ? D(b) ? 125 : 127 : Z(t) ? 125 : g(t.layer ?? 0) ? $(n, t) : 126) | (V(f) ? 128 : 0),
      v = w && 128 & y && ("mesh" !== i.type || X(f)) ? 1 : 0;
    for (let n = 0; n < (p?.count ?? u.count); n++) {
      const t = p ? p.getX(n) : n;
      l.push(u.getX(t), u.getY(t), u.getZ(t)), d.push(M), m.push(y), w && h.push(v);
    }
    f.dispose();
  }
  let b = null;
  if (w) {
    const n = function (n, t, e = () => !1, o = () => !1) {
      const r = Math.floor(n.length / 9),
        a = new Uint8Array(r),
        s = new Float32Array(r),
        i = new Float32Array(3 * r),
        c = new Uint8Array(r),
        f = Math.cos(t.minSlope * Math.PI / 180),
        u = Math.cos(t.maxSlope * Math.PI / 180),
        l = new Int32Array(3 * r),
        lookupMap = new Map(),
        m = t => `${Math.round(n[t] / N)},${Math.round(n[t + 1] / N)},${Math.round(n[t + 2] / N)}`;
      for (let z = 0; z < r; z++) {
        const t = 9 * z,
          r = n[t + 3] - n[t],
          p = n[t + 4] - n[t + 1],
          w = n[t + 5] - n[t + 2],
          h = n[t + 6] - n[t],
          b = n[t + 7] - n[t + 1],
          M = n[t + 8] - n[t + 2];
        let y = p * M - w * b,
          v = w * h - r * M,
          k = r * b - p * h;
        const x = Math.hypot(y, v, k);
        if (!(x > 1e-10) || e(z)) {
          c[z] = 1;
          continue;
        }
        const A = o(z) ? -x : x;
        y /= A, v /= A, k /= A, s[z] = x / 2, i.set([y, v, k], 3 * z), a[z] = v > f ? 0 : v >= u ? 1 : 2;
        for (let n = 0; n < 3; n++) {
          const e = m(t + 3 * n);
          let o = lookupMap.get(e);
          void 0 === o && lookupMap.set(e, o = lookupMap.size), l[3 * z + n] = o;
        }
      }
      const _lookupMap4 = new Map(),
        w = lookupMap.size + 1,
        h = (n, t) => n < t ? n * w + t : t * w + n;
      for (let z = 0; z < r; z++) if (!c[z]) for (let n = 0; n < 3; n++) {
        const t = h(l[3 * z + n], l[3 * z + (n + 1) % 3]),
          e = _lookupMap4.get(t);
        e ? e.push(z) : _lookupMap4.set(t, [z]);
      }
      const b = new Int32Array(r);
      for (let z = 0; z < r; z++) b[z] = z;
      const M = n => {
        for (; b[n] !== n;) n = b[n] = b[b[n]];
        return n;
      };
      for (const N of _lookupMap4.values()) for (let n = 1; n < N.length; n++) {
        const t = N[0],
          e = N[n];
        if (a[t] !== a[e]) continue;
        if (i[3 * t] * i[3 * e] + i[3 * t + 1] * i[3 * e + 1] + i[3 * t + 2] * i[3 * e + 2] < z) continue;
        const o = M(t),
          r = M(e);
        o !== r && (b[r] = o);
      }
      const y = new Int32Array(r).fill(-1),
        v = [],
        k = [],
        _lookupMap5 = new Map();
      for (let z = 0; z < r; z++) {
        if (c[z]) continue;
        const n = M(z);
        let t = _lookupMap5.get(n);
        void 0 === t && (_lookupMap5.set(n, t = v.length), v.push({
          kind: a[z],
          area: 0,
          triangles: 0,
          safe: !1,
          reason: 0 === a[z] ? "floor" : "wall",
          at: [0, 0, 0]
        }), k.push(z)), y[z] = t, v[t].area += s[z], v[t].triangles++, s[z] > s[k[t]] && (k[t] = z);
      }
      v.forEach((t, e) => {
        const o = 9 * k[e];
        for (let r = 0; r < 3; r++) t.at[r] = (n[o + r] + n[o + 3 + r] + n[o + 6 + r]) / 3;
      });
      for (const z of v) 1 === z.kind && (t.ramps && z.area >= t.minArea ? (z.safe = !0, z.reason = "ramp") : z.reason = t.ramps ? "small" : "wall");
      const A = new Float32Array(v.length);
      for (const z of _lookupMap4.values()) for (const n of z) for (const t of z) {
        const e = y[n],
          o = y[t];
        e !== o && "ramp" === v[e].reason && (A[o] = Math.max(A[o], v[e].area));
      }
      if (v.forEach((n, t) => {
        !n.safe && A[t] > 0 && n.area <= .25 * A[t] && (n.safe = !0, n.reason = "trim");
      }), !t.walls) for (const z of v) z.safe || 0 === z.kind || (z.safe = !0, z.reason = "kept");
      const g = t => {
        const e = function (n, t, e) {
          let o = 9,
            r = -1;
          for (let a = 0; a < t.patch.length; a++) {
            if (t.patch[a] < 0) continue;
            const s = F(n, 9 * a, e[0], e[1], e[2]);
            s < o && (o = s, r = a);
          }
          return r;
        }(n, {
          patch: y
        }, t);
        return e < 0 ? -1 : y[e];
      };
      for (const z of t.safe) {
        const n = g(z);
        n < 0 || (v[n].safe = !0, v[n].reason = "picked");
      }
      const I = new Uint8Array(r);
      for (let z = 0; z < r; z++) y[z] >= 0 && !v[y[z]].safe && (I[z] = 1);
      const S = new Uint8Array(r);
      if (t.places.length) for (let z = 0; z < r; z++) if (I[z]) for (const e of t.places) if (6 === e.length ? C(n, 9 * z, e) : F(n, 9 * z, e[0], e[1], e[2]) <= e[3] * e[3]) {
        I[z] = 0, S[z] = 1;
        break;
      }
      for (const z of t.deadly) {
        const n = g(z);
        if (!(n < 0)) {
          v[n].safe = !1, v[n].reason = "picked";
          for (let t = 0; t < r; t++) y[t] === n && (I[t] = 1, S[t] = 0);
        }
      }
      let U = 0,
        $ = 0;
      for (let z = 0; z < r; z++) y[z] < 0 || (I[z] ? U += s[z] : $ += s[z]);
      return {
        deadly: I,
        placed: S,
        patch: y,
        patches: v,
        deadlyArea: U,
        safeArea: $
      };
    }(l, w, function (n, t) {
      return e => {
        const o = 3 * e;
        if (0 !== n[o]) return !0;
        const r = t ? 127 & t[o] : 0;
        return 125 === r || 126 === r;
      };
    }(d, m), function (n) {
      return t => !!n && 0 !== n[3 * t];
    }(h));
    b = new Uint8Array(l.length / 3);
    for (let t = 0; t < n.deadly.length; t++) if (n.deadly[t]) for (let n = 0; n < 3; n++) d[3 * t + n] = 1, b[3 * t + n] = 1;
  }
  const y = new u();
  y.setAttribute("position", new t(l, 3)), y.setAttribute("surface", new t(d, 1)), y.setAttribute("material", new r(Uint8Array.from(m), 1)), b && (y.setAttribute("death", new r(b, 1)), y.setAttribute("turned", new r(Uint8Array.from(h), 1)));
  const v = f ? null : function (n, t) {
    if (!t || n.getIndex()) return null;
    const e = n.getAttribute("position");
    return e && e.count === 3 * t.triangles && function (n) {
      const t = new Float32Array(1),
        e = new Uint32Array(t.buffer);
      let o = 2166136261;
      for (let r = 0; r < n.length; r++) t[0] = n[r], o = Math.imul(o ^ e[0], 16777619);
      return o >>> 0;
    }(e.array) === t.hash ? t.flags : null;
  }(y, M(n));
  return v && (y.userData.collisionEdges = v), y;
}
var nn = /^spawnPoint(?: \(\d+\))?$/i;
function tn(n) {
  return W(n).filter(t => t.active && (n.spawns?.length ? n.spawns.includes(t.node.id) : nn.test(t.node.name))).map(n => {
    const t = new l().setFromMatrixPosition(n.matrix),
      e = new l(0, 0, 1).transformDirection(n.matrix);
    return {
      x: t.x,
      y: t.y + .15,
      z: t.z,
      yaw: Math.atan2(-e.x, -e.z)
    };
  });
}
var en = [{
    id: "map0",
    buildIndex: 1,
    name: "Havana"
  }, {
    id: "map1",
    buildIndex: 2,
    name: "Snowstorm"
  }, {
    id: "map2",
    buildIndex: 3,
    name: "New Town"
  }, {
    id: "map3",
    buildIndex: 4,
    name: "Kour House"
  }, {
    id: "map4",
    buildIndex: 5,
    name: "Ghost Town"
  }, {
    id: "map5",
    buildIndex: 6,
    name: "Legion HQ"
  }, {
    id: "map6",
    buildIndex: 7,
    name: "Surf"
  }, {
    id: "map7",
    buildIndex: 8,
    name: "Kour2"
  }, {
    id: "map8",
    buildIndex: 9,
    name: "OldStorm"
  }, {
    id: "map11",
    buildIndex: 12,
    name: "Skyline"
  }, {
    id: "map14",
    buildIndex: 15,
    name: "ParKour"
  }, {
    id: "map15",
    buildIndex: 16,
    name: "UnderKour"
  }, {
    id: "map16",
    buildIndex: 17,
    name: "Kourage"
  }, {
    id: "map18",
    buildIndex: 19,
    name: "Crystal Kour"
  }, {
    id: "map19",
    buildIndex: 20,
    name: "ParKour 2"
  }, {
    id: "map21",
    buildIndex: 22,
    name: "Cargo Bay"
  }, {
    id: "map22",
    buildIndex: 23,
    name: "Lighthouse"
  }, {
    id: "map23",
    buildIndex: 24,
    name: "Oasis"
  }, {
    id: "map24",
    buildIndex: 25,
    name: "Jungle"
  }, {
    id: "map25",
    buildIndex: 26,
    name: "Canyon"
  }, {
    id: "map27",
    buildIndex: 28,
    name: "Surf_Shape"
  }, {
    id: "map28",
    buildIndex: 29,
    name: "Sumo Temple"
  }, {
    id: "map29",
    buildIndex: 30,
    name: "Combat Surf Kitsune"
  }],
  on = new Set(["map18", "map19"]),
  rn = new Set(["map18", "map19"]),
  an = "icon.webp",
  sn = n => on.has(n) ? `/assets/extracted/${n}/${rn.has(n) ? an : "thumbnail.png"}` : cn.has(n) || fn.has(n) ? `/assets/extracted/${n}/${an}` : (en.find(t => t.id === n)?.buildIndex ?? 0) >= 17 ? `/assets/extracted/${n}/thumbnail.png` : null,
  cn = new Set(["map16", "map21", "map22", "map23", "map24", "map25", "map27", "map28", "map29"]),
  fn = new Set(["map0", "map1", "map2", "map3", "map4", "map5", "map6", "map7", "map8", "map11", "map14", "map15"]),
  un = {
    map12: {
      name: "Blockyard",
      slot: 10
    },
    map13: {
      name: "KourCraft",
      slot: 11
    },
    map20: {
      name: "Rusty",
      slot: 17
    },
    map26: {
      name: "Windmill",
      slot: 23
    }
  };
function ln(n, t) {
  const e = [new l(1, 0, 0).transformDirection(t), new l(0, 1, 0).transformDirection(t), new l(0, 0, 1).transformDirection(t)],
    o = [new l().setFromMatrixColumn(t, 0).length(), new l().setFromMatrixColumn(t, 1).length(), new l().setFromMatrixColumn(t, 2).length()],
    r = new l().fromArray(n.center ?? [0, 0, 0]).applyMatrix4(t);
  if ("box" === n.type && n.size) return {
    kind: "box",
    center: r,
    axes: e,
    half: new l(Math.abs(n.size[0]) * o[0] / 2, Math.abs(n.size[1]) * o[1] / 2, Math.abs(n.size[2]) * o[2] / 2),
    radius: 0,
    direction: 1
  };
  if ("sphere" === n.type) return {
    kind: "sphere",
    center: r,
    axes: e,
    half: new l(),
    radius: (n.radius ?? .5) * Math.max(...o),
    direction: 1
  };
  if ("capsule" === n.type) {
    const t = n.direction ?? 1,
      a = [0, 1, 2].filter(n => n !== t).map(n => o[n]),
      s = (n.radius ?? .5) * Math.max(...a),
      i = Math.max((n.height ?? 1) * o[t], 2 * s),
      c = new l();
    return c.setComponent(t, i / 2 - s), {
      kind: "capsule",
      center: r,
      axes: e,
      half: c,
      radius: s,
      direction: t
    };
  }
  return null;
}
function dn(n, t) {
  const e = new l().subVectors(t, n.center),
    o = [e.dot(n.axes[0]), e.dot(n.axes[1]), e.dot(n.axes[2])];
  if ("box" === n.kind) {
    let t = 0;
    for (let e = 0; e < 3; e++) {
      const r = n.half.getComponent(e),
        a = Math.max(0, Math.abs(o[e]) - r);
      t += a * a;
    }
    return Math.sqrt(t);
  }
  if ("sphere" === n.kind) return Math.max(0, e.length() - n.radius);
  const r = n.half.getComponent(n.direction);
  return o[n.direction] = Math.max(0, Math.abs(o[n.direction]) - r), Math.max(0, Math.hypot(o[0], o[1], o[2]) - n.radius);
}
function mn(n, t, e) {
  if ("box" === t.kind) {
    const o = n.origin.clone().sub(t.center),
      r = new c(new l(o.dot(t.axes[0]), o.dot(t.axes[1]), o.dot(t.axes[2])), new l(n.direction.dot(t.axes[0]), n.direction.dot(t.axes[1]), n.direction.dot(t.axes[2]))),
      a = r.intersectBox(new i(t.half.clone().negate(), t.half.clone()), new l()),
      s = a ? a.distanceTo(r.origin) : null;
    return null !== s && s <= e ? s : null;
  }
  const o = new l();
  for (let r = 0; r <= e; r += .05) if (dn(t, n.at(r, o)) <= 0) return r;
  return null;
}
function pn(n, t, e, o, r = .7, a = 2.8) {
  for (const s of a >= 2.8 ? wn : hn(a)) if (dn(n, new l(t, e + s, o)) <= r) return !0;
  return !1;
}
var wn = [.7, 1.4, 2.1],
  hn = n => [.7, Math.max(.7, n / 2), Math.max(.7, n - .7)];
function bn(n, t, e, o, r, a) {
  const s = new l(0, 1, 0).transformDirection(r),
    i = q(n, new Set([o])),
    c = new l();
  let f = 0,
    u = 1 / 0,
    d = -1 / 0;
  for (const l of n.nodes) {
    const o = l.mesh ? n.meshes[l.mesh] : void 0,
      r = t.get(l.id)?.matrix;
    if (!o || !r || l.batch || !i.has(l.id)) continue;
    const a = o.positions;
    for (let n = 0; n + 2 < a.length; n += 3) {
      c.set(a[n], a[n + 1], a[n + 2]).applyMatrix4(r).sub(e);
      const t = c.dot(s);
      u = Math.min(u, t), d = Math.max(d, t), f = Math.max(f, c.addScaledVector(s, -t).length());
    }
  }
  if (u > d || f <= 0) {
    const n = a.half.getComponent(a.direction) + a.radius,
      t = a.axes[a.direction];
    return {
      base: a.center.clone().addScaledVector(t, -n),
      axis: t.clone(),
      radius: a.radius,
      height: 2 * n
    };
  }
  return {
    base: e.clone().addScaledVector(s, u),
    axis: s,
    radius: f,
    height: d - u
  };
}
function Mn(n, t, e) {
  const o = q(n, new Set([e])),
    r = [],
    a = new l();
  for (const s of n.nodes) {
    const e = s.mesh ? n.meshes[s.mesh] : void 0,
      i = t.get(s.id)?.matrix;
    if (!e || !i || s.batch || !o.has(s.id)) continue;
    const c = e.positions,
      f = e.indices;
    for (let n = 0; n + 2 < f.length; n += 3) for (let t = 0; t < 3; t++) {
      const e = 3 * f[n + t];
      a.set(c[e], c[e + 1], c[e + 2]).applyMatrix4(i), r.push(a.x, a.y, a.z);
    }
  }
  return Float32Array.from(r);
}
var yn = ["ZombieStation", "ZombieSpawn", "ZombieBarricade", "ZombieStart"];
function vn(n, t) {
  const lookupMap = new Map(W(n).map(n => [n.node.id, n])),
    o = [],
    r = [],
    uniqueItems = new Set();
  for (const g of t?.objects ?? []) {
    const t = g.node ? lookupMap.get(g.node) : void 0;
    if (!t) continue;
    const s = 22 === g.layer && "Untagged" === g.tag ? "BuyArea" : g.tag;
    "Lava" === g.tag && g.node && uniqueItems.add(g.node);
    const i = g.scripts?.HardpointArea;
    if (i) {
      const o = new l().setFromMatrixPosition(t.matrix),
        a = i.boxRotation ?? {
          x: 0,
          y: 0,
          z: 0
        },
        s = gn(a.x, a.y, a.z),
        c = n.nodes.find(n => n.parent === g.node && "waypoint" === n.name),
        f = c ? lookupMap.get(c.id) : void 0;
      r.push({
        name: g.name,
        node: g.node ?? "",
        center: o,
        half: new l(i.detectionBoxSize.x / 2, i.detectionBoxSize.y / 2, i.detectionBoxSize.z / 2),
        axes: [new l(1, 0, 0).transformDirection(s), new l(0, 1, 0).transformDirection(s), new l(0, 0, 1).transformDirection(s)],
        waypoint: f ? new l().setFromMatrixPosition(f.matrix) : null
      });
    }
    for (const n of g.colliders) {
      if (!n.trigger || !n.enabled) continue;
      const r = ln(n, t.matrix);
      if (!r) continue;
      const a = g.scripts?.JumpPad ?? g.scripts?.Checkpoint ?? ("Ladder" === g.tag ? {} : void 0),
        i = g.spawn ? lookupMap.get(g.spawn) : void 0;
      let c;
      if (i) {
        const n = new l().setFromMatrixPosition(i.matrix),
          t = new l(0, 0, 1).transformDirection(i.matrix);
        c = {
          x: n.x,
          y: n.y,
          z: n.z,
          yaw: Math.atan2(-t.x, -t.z)
        };
      }
      o.push({
        tag: s,
        name: g.name,
        index: o.filter(n => n.tag === s).length,
        volume: r,
        matrix: t.matrix,
        data: a,
        spawn: c
      });
    }
  }
  const s = n => o.filter(t => t.tag === n),
    i = t?.managers.MapInfo?.[0]?.data?.hardpointObjectiveGOs ?? [],
    c = n => {
      const t = i.findIndex(t => t?.node === n);
      return t < 0 ? i.length : t;
    };
  i.length && r.sort((n, t) => c(n.node) - c(t.node));
  for (let l = r.length - 1; l > 0; l--) r.some((n, t) => {
    return t < l && (e = n, o = r[l], Math.hypot(e.center.x - o.center.x, e.center.z - o.center.z) < .5 && Math.abs(e.center.y - o.center.y) < 2 && e.half.distanceTo(o.half) < .001);
    var e, o;
  }) && r.splice(l, 1);
  const f = (t?.managers.MapInfo?.[0]?.data?.spawnPoints ?? []).flatMap(n => {
      const t = n?.node ? lookupMap.get(n.node) : void 0;
      if (!t) return [];
      const o = new l().setFromMatrixPosition(t.matrix),
        r = new l(0, 0, 1).transformDirection(t.matrix);
      return [{
        x: o.x,
        y: o.y,
        z: o.z,
        yaw: Math.atan2(-r.x, -r.z)
      }];
    }),
    u = [],
    d = [];
  for (const l of t?.objects ?? []) {
    const n = l.node ? lookupMap.get(l.node) : void 0;
    if (!n || !l.active) continue;
    const t = l.colliders.find(n => !n.trigger),
      o = t ? ln(t, n.matrix) : null;
    o && ("Destructible" === l.tag ? u.push({
      name: l.name,
      node: l.node,
      volume: o
    }) : "Ball" === l.tag && "sphere" === o.kind && d.push({
      name: l.name,
      node: l.node,
      radius: o.radius,
      center: o.center
    }));
  }
  const m = [];
  for (const g of t?.objects ?? []) {
    const t = g.scripts?.ExplosiveBarrel,
      o = t && g.node ? lookupMap.get(g.node) : void 0,
      r = g.colliders.find(n => !n.trigger),
      a = o && r ? ln(r, o.matrix) : null;
    if (!o || !a || !g.active) continue;
    const s = t.gfx?.node ?? null,
      i = new l().setFromMatrixPosition(o.matrix);
    m.push({
      name: g.name,
      node: g.node,
      gfx: s,
      root: i,
      volume: a,
      cylinder: bn(n, lookupMap, i, s ?? g.node, o.matrix, a),
      hull: Mn(n, lookupMap, s ?? g.node)
    });
  }
  const p = (t?.managers.MapInfo ?? []).map(n => n.data?.GOsecrets ?? []).find(n => n.length) ?? [],
    w = [];
  p.forEach((n, o) => {
    const r = (t?.objects ?? []).find(t => t.node && t.node === n?.node),
      a = r?.node ? lookupMap.get(r.node) : void 0,
      s = r?.colliders.find(n => !n.trigger),
      i = a && s ? ln(s, a.matrix) : null;
    r && i && w.push({
      index: o,
      name: r.name,
      node: r.node,
      volume: i
    });
  });
  const h = [];
  for (const g of t?.objects ?? []) {
    const n = g.scripts?.CourseStart,
      t = n && g.node ? lookupMap.get(g.node) : void 0;
    if (!t || "string" != typeof n?.track) continue;
    const o = new l().setFromMatrixPosition(t.matrix),
      r = new l(0, 0, 1).transformDirection(t.matrix);
    h.push({
      track: n.track,
      x: o.x,
      y: o.y,
      z: o.z,
      yaw: Math.atan2(-r.x, -r.z)
    });
  }
  const b = [],
    M = [];
  for (const g of t?.objects ?? []) {
    const n = g.node ? lookupMap.get(g.node) : void 0;
    if (!n) continue;
    const t = g.scripts?.ZombieDoor;
    if (t) {
      const e = g.colliders.find(n => !n.trigger && "box" === n.type),
        o = e ? ln(e, n.matrix) : null;
      if (!o || b.length >= 62) continue;
      const r = Number(t.price);
      b.push({
        index: b.length,
        node: g.node,
        name: "string" == typeof t.name && t.name ? t.name : g.name,
        price: Number.isFinite(r) && r >= 0 ? Math.round(r) : 0,
        volume: o
      });
      continue;
    }
    const o = yn.find(n => g.scripts?.[n]);
    if (!o) continue;
    const r = new l().setFromMatrixPosition(n.matrix),
      a = new l(0, 0, 1).transformDirection(n.matrix);
    M.push({
      script: o,
      data: g.scripts?.[o] ?? {},
      x: r.x,
      y: r.y,
      z: r.z,
      yaw: Math.atan2(-a.x, -a.z)
    });
  }
  const y = [];
  for (const l of t?.objects ?? []) {
    const n = Number(l.scripts?.SumoRing?.ring);
    l.node && Number.isInteger(n) && n >= 0 && n < 32 && y.push({
      ring: n,
      node: l.node
    });
  }
  const v = t?.managers.MapInfo?.[0]?.data?.defaultCamera,
    k = v?.node ? lookupMap.get(v.node) : void 0,
    x = (t?.objects ?? []).find(n => n.node === v?.node),
    A = k ? {
      position: new l().setFromMatrixPosition(k.matrix),
      forward: new l(0, 0, 1).transformDirection(k.matrix),
      up: new l(0, 1, 0).transformDirection(k.matrix),
      speed: Number(x?.scripts?.RotateAllTime?.speed ?? 0)
    } : null;
  return {
    triggers: o,
    jumpPads: s("JumpPad"),
    ladders: s("Ladder"),
    checkpoints: s("Checkpoint"),
    finishes: s("ParkourFinish"),
    courseStarts: h,
    plantAreas: s("PlantArea"),
    buyAreas: s("BuyArea"),
    mapSpawns: f,
    extraSpawns: n.spawnPools ?? null,
    hardpoints: r,
    lavaNodes: uniqueItems,
    barrels: m,
    destructibles: u,
    balls: d,
    secrets: w,
    secretNodes: new Map([...w.map(n => [n.node, n.index]), ...b.map(n => {
      return [n.node, (t = n.index, 192 + t)];
      var t;
    }), ...y.map(n => [n.node, _(n.ring)]), ...m.slice(0, 64).flatMap((t, e) => [...q(n, new Set([t.node]))].map(n => [n, T(e)]))]),
    dynamicColliderNodes: new Set([...u.map(n => n.node), ...d.map(n => n.node), ...m.slice(64).map(n => n.node)]),
    barrelColliderNodes: new Set(m.map(n => n.node)),
    defaultCamera: A,
    doors: b,
    rings: y,
    zombieMarks: M,
    objects: t?.objects ?? []
  };
}
function kn(n) {
  const t = n.map((n, t) => {
      return {
        i: t,
        k: (e = n.name, Number(/_(\d+)$/.exec(e)?.[1] ?? 0))
      };
      var e;
    }).sort((n, t) => n.k - t.k || n.i - t.i),
    e = new Array(n.length).fill(0);
  return t.forEach((n, t) => e[n.i] = t + 1), e;
}
var xn = n => "string" == typeof n.data?.track ? n.data.track : "";
function An(n) {
  const t = new Array(n.length).fill(0),
    lookupMap = new Map();
  n.forEach((n, t) => {
    const o = xn(n);
    let r = lookupMap.get(o);
    r || lookupMap.set(o, r = []), r.push(t);
  });
  for (const o of lookupMap.values()) {
    const e = kn(o.map(t => n[t]));
    o.forEach((n, o) => t[n] = e[o]);
  }
  return t;
}
function gn(t, e, r) {
  const a = Math.PI / 180;
  return new n().makeRotationFromEuler(new o(t * a, -e * a, -r * a, "YXZ"));
}
var In = null;
function Sn(n) {
  In = n;
}
var Un = n => !In || In(n);
function $n(n) {
  const t = n;
  if (!t || "object" != typeof t || !Array.isArray(t.available)) return null;
  const uniqueItems = new Set(en.map(n => n.id)),
    o = t.available.filter(n => "string" == typeof n && uniqueItems.has(n)),
    r = {};
  if (t.missing && "object" == typeof t.missing) for (const [a, s] of Object.entries(t.missing)) uniqueItems.has(a) && (r[a] = "string" == typeof s ? s.slice(0, 200) : "missing");
  return {
    available: o,
    missing: r
  };
}
var zn = "Not available on this server",
  Nn = "Not available on this website",
  Fn = ["ffa", "tdm", "gungame"],
  Cn = [...Fn, "hardpoint", "ctf"],
  jn = {
    map0: {
      modes: Cn,
      random: Cn
    },
    map1: {
      modes: Cn,
      random: Cn
    },
    map2: {
      modes: Cn,
      random: Cn
    },
    map3: {
      modes: Cn,
      random: Cn
    },
    map4: {
      modes: Cn,
      random: Cn
    },
    map5: {
      modes: [...Cn, "zombies"],
      random: [...Cn, "zombies"]
    },
    map6: {
      modes: ["koursurf"],
      random: ["koursurf"]
    },
    map7: {
      modes: ["kourstrike", ...Fn],
      random: ["kourstrike", "ffa", "tdm"]
    },
    map8: {
      modes: ["kourstrike", ...Fn],
      random: ["kourstrike", "ffa", "tdm"]
    },
    map11: {
      modes: [...Cn, "zombies"],
      random: [...Cn, "zombies"]
    },
    map14: {
      modes: ["parkour"],
      random: ["parkour"]
    },
    map15: {
      modes: [...Cn, "zombies"],
      random: [...Cn, "zombies"]
    },
    map16: {
      modes: [...Cn, "kourstrike"],
      random: [...Cn, "kourstrike"]
    },
    map18: {
      modes: ["ffa", "tdm"],
      random: ["ffa", "tdm"]
    },
    map19: {
      modes: ["parkour"],
      random: ["parkour"]
    },
    map21: {
      modes: Cn,
      random: Cn
    },
    map22: {
      modes: Cn,
      random: Cn
    },
    map23: {
      modes: Cn,
      random: Cn
    },
    map24: {
      modes: Cn,
      random: Cn
    },
    map25: {
      modes: Cn,
      random: Cn
    },
    map27: {
      modes: ["koursurf"],
      random: ["koursurf"]
    },
    map28: {
      modes: ["sumo"],
      random: ["sumo"]
    },
    map29: {
      modes: ["combatsurf"],
      random: ["combatsurf"]
    }
  },
  Kn = () => en.map(n => ({
    id: n.id,
    name: n.name,
    buildIndex: n.buildIndex
  }));
function Bn(n) {
  return Kn().filter(t => jn[t.id]?.modes.includes(n));
}
function Pn(n) {
  return Kn().filter(t => jn[t.id]?.random.includes(n) && Un(t.id));
}
function Ln(n) {
  return Bn(n).filter(n => Un(n.id));
}
var Zn = (n, t) => !!jn[n]?.modes.includes(t);
function _n(n, t, e, o, r) {
  const a = r;
  return a ? t && (e === d.Red || e === d.Blue) && a.red.length > 0 && a.blue.length > 0 ? {
    points: e === d.Red ? a.red : a.blue,
    team: !0
  } : {
    points: [...o, ...a.ffa],
    team: !1
  } : {
    points: o,
    team: !1
  };
}
var On = (n, t) => t && "kourstrike" === n;
export { x as A, W as C, k as D, B as E, M as F, y as I, w as L, p as M, b as N, I as O, v as P, tn as S, O as T, vn as _, Pn as a, Y as b, zn as c, en as d, un as f, dn as g, sn as h, Bn as i, m as j, A as k, $n as l, xn as m, On as n, _n as o, pn as p, Zn as r, Nn as s, Ln as t, Sn as u, mn as v, H as w, J as x, An as y };

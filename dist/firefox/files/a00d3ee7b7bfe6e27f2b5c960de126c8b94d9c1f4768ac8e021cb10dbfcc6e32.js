import { $ as n, $n as e, B as t, Br as o, Ct as r, E as a, Ft as i, H as s, It as l, P as c, Pr as u, T as f, Y as h, _ as v, h as d, jt as m, kr as p, l as x, lr as k, pn as w, qt as g, sn as b, ur as y, v as S, zr as M } from "./three-Bi9Yyrpt.js";
import { f as $ } from "./c-Caw4SzGP.js";
import { c as C } from "./c-C_iq9rgQ.js";
import { h as T, m as _, x as P } from "./c-j2W5q53j.js";
var z = "kourBoxPos",
  F = new Set($.filter(item => "box" === item.mapping).map(item => item.skinName)),
  A = n => !!n && F.has(n),
  G = new Set($.filter(item => "frame" === item.mapping).map(item => item.skinName)),
  E = n => !!n && G.has(n);
function R(n, e) {
  const t = n.getAttribute("position");
  return (n, o) => o.fromBufferAttribute(t, n).applyMatrix4(e);
}
function L(n, e) {
  const t = n.getAttribute("position"),
    o = n.getAttribute("skinIndex"),
    r = n.getAttribute("skinWeight"),
    a = new M(),
    i = new M();
  return (n, s) => {
    a.fromBufferAttribute(t, n), s.set(0, 0, 0);
    let l = 0;
    for (let t = 0; t < 4; t++) {
      const c = r.getComponent(n, t),
        u = c > 0 ? e[o.getComponent(n, t)] : null;
      u && (s.addScaledVector(i.copy(a).applyMatrix4(u), c), l += c);
    }
    return l > 0 ? s.divideScalar(l) : s.copy(a);
  };
}
function W(n, e, t) {
  const o = n.index,
    r = n.getAttribute("position"),
    a = o ? o.count : r.count,
    i = n => o ? o.getX(n) : n,
    s = new S();
  for (const k of ["position", "normal", "skinIndex", "skinWeight"]) {
    const e = n.getAttribute(k);
    if (!e) continue;
    const t = new e.array.constructor(a * e.itemSize);
    for (let n = 0; n < a; n++) for (let o = 0; o < e.itemSize; o++) t[n * e.itemSize + o] = e.getComponent(i(n), o);
    s.setAttribute(k, new v(t, e.itemSize, e.normalized));
  }
  const float32Values = new Float32Array(2 * a),
    _float32Values = new Float32Array(3 * a),
    [u, f, h] = t.axes,
    d = [new M(), new M(), new M()],
    m = new M(),
    p = new M();
  for (let v = 0; v + 2 < a; v += 3) {
    for (let t = 0; t < 3; t++) e(i(v + t), d[t]);
    const n = m.subVectors(d[1], d[0]).cross(p.subVectors(d[2], d[0])),
      o = Math.abs(n.getComponent(h)),
      r = Math.abs(n.getComponent(f)),
      a = Math.abs(n.getComponent(u)),
      [s, x] = o >= r && o >= a ? [u, f] : r >= a ? [u, h] : [h, f];
    for (let e = 0; e < 3; e++) {
      float32Values[2 * (v + e)] = (d[e].getComponent(s) - t.min[s]) * t.scale, float32Values[2 * (v + e) + 1] = (d[e].getComponent(x) - t.min[x]) * t.scale;
      const n = 3 * (v + e);
      _float32Values[n] = (d[e].getComponent(f) - t.min[f]) * t.scale, _float32Values[n + 1] = (d[e].getComponent(u) - t.min[u]) * t.scale, _float32Values[n + 2] = (d[e].getComponent(h) - t.min[h]) * t.scale;
    }
  }
  s.setAttribute("uv", new v(float32Values, 2)), s.setAttribute(z, new v(_float32Values, 3)), s.setIndex(new v(a < 65536 ? new Uint16Array(a) : new Uint32Array(a), 1));
  const x = s.index.array;
  for (let v = 0; v < a; v++) x[v] = v;
  for (const v of n.groups) s.addGroup(v.start, v.count, v.materialIndex);
  return s;
}
function H(n, e, t) {
  const o = n.index,
    r = n.getAttribute("position"),
    a = o ? o.count : r.count,
    i = n => o ? o.getX(n) : n,
    s = new S();
  for (const [S, M] of Object.entries(n.attributes)) {
    if ("kourBoxPos" === S || "kourWire" === S) continue;
    const n = new M.array.constructor(a * M.itemSize);
    for (let e = 0; e < a; e++) for (let t = 0; t < M.itemSize; t++) n[e * M.itemSize + t] = M.getComponent(i(e), t);
    s.setAttribute(S, new v(n, M.itemSize, M.normalized));
  }
  const flooredValue = Math.floor(a / 3),
    float32Values = new Float32Array(3 * a),
    [u, f, h] = t.axes,
    _float32Values2 = new Float32Array(3 * a),
    _float32Values3 = new Float32Array(3 * flooredValue),
    p = new M(),
    x = new M(),
    k = new M();
  for (let v = 0; v < 3 * flooredValue; v++) e(i(v), p), _float32Values2[3 * v] = p.x, _float32Values2[3 * v + 1] = p.y, _float32Values2[3 * v + 2] = p.z, float32Values[3 * v] = (p.getComponent(f) - t.min[f]) * t.scale, float32Values[3 * v + 1] = (p.getComponent(u) - t.min[u]) * t.scale, float32Values[3 * v + 2] = (p.getComponent(h) - t.min[h]) * t.scale;
  const w = 2e4 * t.scale / 2,
    lookupMap = new Map(),
    int32Values = new Int32Array(3 * flooredValue);
  for (let v = 0; v < 3 * flooredValue; v++) {
    const n = `${Math.round(_float32Values2[3 * v] * w)},${Math.round(_float32Values2[3 * v + 1] * w)},${Math.round(_float32Values2[3 * v + 2] * w)}`;
    let e = lookupMap.get(n);
    void 0 === e && lookupMap.set(n, e = lookupMap.size), int32Values[v] = e;
  }
  const _lookupMap = new Map(),
    $ = (n, e) => n < e ? `${n}|${e}` : `${e}|${n}`;
  for (let v = 0; v < flooredValue; v++) {
    const n = 3 * v;
    x.set(_float32Values2[3 * n + 3] - _float32Values2[3 * n], _float32Values2[3 * n + 4] - _float32Values2[3 * n + 1], _float32Values2[3 * n + 5] - _float32Values2[3 * n + 2]), k.set(_float32Values2[3 * n + 6] - _float32Values2[3 * n], _float32Values2[3 * n + 7] - _float32Values2[3 * n + 1], _float32Values2[3 * n + 8] - _float32Values2[3 * n + 2]), x.cross(k).normalize(), _float32Values3[3 * v] = x.x, _float32Values3[3 * v + 1] = x.y, _float32Values3[3 * v + 2] = x.z;
    for (let e = 0; e < 3; e++) {
      const t = $(int32Values[n + (e + 1) % 3], int32Values[n + (e + 2) % 3]),
        o = _lookupMap.get(t);
      o ? o.push(v) : _lookupMap.set(t, [v]);
    }
  }
  const _float32Values4 = new Float32Array(3 * a);
  for (let v = 0; v < flooredValue; v++) {
    const n = 3 * v;
    for (let e = 0; e < 3; e++) {
      const t = _lookupMap.get($(int32Values[n + (e + 1) % 3], int32Values[n + (e + 2) % 3]));
      let o = !1;
      for (const n of t) n !== v && _float32Values3[3 * v] * _float32Values3[3 * n] + _float32Values3[3 * v + 1] * _float32Values3[3 * n + 1] + _float32Values3[3 * v + 2] * _float32Values3[3 * n + 2] >= .9995 && (o = !0);
      for (let r = 0; r < 3; r++) _float32Values4[3 * (n + r) + e] = o || r === e ? 1 : 0;
    }
  }
  s.setAttribute(z, new v(float32Values, 3)), s.setAttribute("kourWire", new v(_float32Values4, 3)), s.setIndex(new v(a < 65536 ? new Uint16Array(a) : new Uint32Array(a), 1));
  const T = s.index.array;
  for (let v = 0; v < a; v++) T[v] = v;
  for (const v of n.groups) s.addGroup(v.start, v.count, v.materialIndex);
  return n.boundingBox && (s.boundingBox = n.boundingBox.clone()), n.boundingSphere && (s.boundingSphere = n.boundingSphere.clone()), s;
}
function I(n, e = 2) {
  const t = new d(),
    o = new M();
  for (const r of n) {
    const n = r.geometry.getAttribute("position").count;
    for (let e = 0; e < n; e++) t.expandByPoint(r.at(e, o));
  }
  return function (n, e = 2) {
    const t = n.getSize(new M()).toArray().map(item => Math.max(item, 1e-9)),
      o = [0, 1, 2].sort((leftItem, rightItem) => t[rightItem] - t[leftItem] || leftItem - rightItem);
    return {
      min: n.min.toArray(),
      axes: o,
      scale: e / t[o[0]]
    };
  }(t, e);
}
var U = new WeakMap();
function N(n) {
  let t = U.get(n);
  return t || (t = n.clone(), t.wrapS = t.wrapT = e, t.magFilter = t.minFilter = g, t.generateMipmaps = !1, t.needsUpdate = !0, U.set(n, t)), t;
}
function O(n, e) {
  const t = new i(),
    o = new i(),
    r = new M(),
    a = new b(),
    s = new M();
  for (let i = e; i > 0; i = n.nodes[i].parent) {
    const e = n.nodes[i];
    o.compose(r.fromArray(e.t), a.fromArray(e.r), s.fromArray(e.s)), t.premultiply(o);
  }
  return t;
}
function K(n) {
  const e = n.behaviours.find(item => 0 === item.node && item.data && Array.isArray(item.data.weaponRenderers)),
    t = (e?.data?.weaponRenderers ?? []).map(item => item?.node).filter(item => "number" == typeof item),
    o = e?.data?.handsModel?.node;
  return n.renderers.flatMap((item, index) => t.includes(item.node) || "number" != typeof o || !((e, t) => {
    for (let o = e; o >= 0; o = n.nodes[o].parent) if (o === t) return !0;
    return !1;
  })(item.node, o) ? [index] : []);
}
var B = new WeakMap(),
  D = new WeakMap();
function q(n, e) {
  const t = n.data;
  return e.flatMap(item => {
    const o = n.meshes[item];
    if (!o) return [];
    const r = o,
      a = t.renderers[item];
    if (r.isSkinnedMesh) {
      const n = a.bones.map((bone, index) => bone >= 0 && r.skeleton.boneInverses[index] ? O(t, bone).multiply(r.skeleton.boneInverses[index]) : null);
      return [{
        i: item,
        geometry: o.geometry,
        at: L(o.geometry, n)
      }];
    }
    return [{
      i: item,
      geometry: o.geometry,
      at: R(o.geometry, O(t, a.node))
    }];
  });
}
function j(n, e) {
  const t = K(n.data).filter(item => n.meshes[item]);
  if (!t.length) return !1;
  const o = function (n, e) {
    let t = D.get(n.data);
    if (t && e.every(item => t.has(item) || !n.meshes[item])) return t;
    t || D.set(n.data, t = new Map());
    const o = q(n, e),
      r = I(o);
    for (const a of o) t.set(a.i, H(a.geometry, a.at, r));
    return t;
  }(n, t);
  for (const r of t) {
    const t = n.meshes[r],
      a = o.get(r);
    if (!a) continue;
    V.has(t) || V.set(t, {
      geometry: t.geometry,
      material: t.material
    });
    const i = V.get(t).material;
    t.geometry = a, t.material = Array.isArray(i) ? i.map(e) : e(i);
  }
  return !0;
}
var V = new WeakMap();
function X(n) {
  const e = V.get(n);
  e && (n.geometry = e.geometry, n.material = e.material, V.delete(n));
}
var Y = n => n.transparent;
function Q(n, e) {
  return Array.isArray(n) ? n.some(Y) ? n.map(item => Y(item) ? item : e) : e : Y(n) ? n : e;
}
function Z(n, e) {
  const t = K(n.data).filter(item => n.meshes[item]);
  if (!t.length) return !1;
  const o = function (n, e) {
    let t = B.get(n.data);
    if (t && e.every(item => t.has(item) || !n.meshes[item])) return t;
    t || B.set(n.data, t = new Map());
    const o = q(n, e),
      r = I(o);
    for (const a of o) t.set(a.i, W(a.geometry, a.at, r));
    return t;
  }(n, t);
  for (const r of t) {
    const t = n.meshes[r],
      a = o.get(r);
    a && (V.has(t) || V.set(t, {
      geometry: t.geometry,
      material: t.material
    }), t.geometry = a, t.material = Q(V.get(t).material, e));
  }
  return !0;
}
var J = new WeakMap();
function nn(n, e = n => n.geometry) {
  const t = [];
  for (const o of n) o.traverse(n => {
    n.isMesh && t.push(n);
  });
  if (!t.length) return new Map();
  if (t.filter(item => !J.has(e(item))).length) {
    const o = n[0];
    o.updateWorldMatrix(!0, !0);
    const r = o.matrixWorld.clone().invert(),
      a = t.map(item => ({
        mesh: item,
        geometry: e(item),
        at: R(e(item), r.clone().multiply(item.matrixWorld))
      })),
      i = I(a);
    for (const n of a) J.has(n.geometry) || J.set(n.geometry, H(n.geometry, n.at, i));
  }
  return new Map(t.map(item => [item, J.get(e(item))]));
}
var en = new WeakMap();
function tn(n) {
  const e = [];
  for (const t of n) t.traverse(n => {
    n.isMesh && e.push(n);
  });
  if (!e.length) return new Map();
  if (e.filter(item => !en.has(item.geometry)).length) {
    const t = n[0];
    t.updateWorldMatrix(!0, !0);
    const o = t.matrixWorld.clone().invert(),
      r = e.map(item => ({
        mesh: item,
        geometry: item.geometry,
        at: R(item.geometry, o.clone().multiply(item.matrixWorld))
      })),
      a = I(r);
    for (const n of r) en.has(n.geometry) || en.set(n.geometry, W(n.geometry, n.at, a));
  }
  return new Map(e.map(item => [item, en.get(item.geometry)]));
}
var on = {
    cells: 1.45,
    share: .22,
    band: .36,
    speed: 2.2,
    strength: 1
  },
  rn = {
    cells: 15,
    band: Math.PI,
    strength: 1
  },
  an = {
    color: [1, .9, .62],
    strength: .3,
    from: -.1,
    to: .35,
    base: .35
  },
  sn = "undefined" != typeof performance ? performance.now() : 0;
function ln(n, e, t) {
  const r = new o(0, n, e, t);
  return {
    get value() {
      const n = "undefined" != typeof performance ? performance.now() : 0;
      return r.x = (n - sn) / 1e3 % 1e3, r;
    },
    set value(n) {}
  };
}
var cn = ln(on.strength, on.cells, on.band),
  un = ln(rn.strength, rn.cells, rn.band),
  fn = an,
  hn = `\nuniform vec4 uGlitter;\nvarying vec3 vGlitterPos;\nvec3 kourGlitter(vec3 p, vec3 n, vec3 v) {\n  float t = uGlitter.x;\n  vec3 gp = p * uGlitter.z;\n  vec3 cell = floor(gp);\n  float h = fract(sin(dot(cell, vec3(12.9898, 78.233, 37.719))) * 43758.5453);\n  float phase = fract(h * 7.13 + t * (0.35 + 0.65 * h));\n  float twinkle = smoothstep(0.0, 0.05, phase) * (1.0 - smoothstep(0.05, 0.18, phase));\n  vec3 f = abs(fract(gp) - 0.5);\n  float star = max(0.0, 1.0 - (f.x + f.y + f.z) * 2.2);\n  float sparkle = twinkle * star * step(${(1 - on.share).toFixed(3)}, h);\n  float nv = clamp(dot(n, v), 0.0, 1.0);\n  float band = pow(max(sin(p.y * uGlitter.w - t * ${on.speed.toFixed(2)} + nv * 2.0), 0.0), 10.0);\n  float rim = pow(1.0 - nv, 3.0);\n  // the polish (GLITTER_POLISH): a studio's pale sky over a dark ground, reflected\n  vec3 rd = reflect(-v, n);\n  float sky = smoothstep(${fn.from.toFixed(3)}, ${fn.to.toFixed(3)}, rd.y);\n  float fres = ${fn.base.toFixed(3)} + ${(1 - fn.base).toFixed(3)} * pow(1.0 - nv, 2.0);\n  return uGlitter.y * (vec3(1.0, 0.82, 0.38) * (band * 0.32 + rim * 0.18)\n    + vec3(1.0, 0.96, 0.82) * sparkle * 1.8\n    + vec3(${fn.color.map(item => item.toFixed(3)).join(", ")}) * (sky * fres * ${fn.strength.toFixed(3)}));\n}`;
function vn(n, e) {
  const t = n;
  t.uniforms?.uColor && t.defines && e !== "USE_GLITTER" in t.defines && (e ? (t.defines.USE_GLITTER = "", t.uniforms.uGlitter = cn) : (delete t.defines.USE_GLITTER, delete t.uniforms.uGlitter), t.needsUpdate = !0);
}
var dn = {
    glitch: {
      kind: 1,
      strength: 1,
      glow: .22
    },
    chrome: {
      kind: 2,
      strength: 1,
      glow: 1,
      metallic: .7,
      smoothness: .86
    },
    neon: {
      kind: 3,
      strength: 1,
      glow: 1
    },
    gold: {
      kind: 0,
      strength: 1,
      glow: 0,
      metallic: .45,
      smoothness: .78
    },
    laser: {
      kind: 4,
      strength: 1,
      glow: 1
    },
    chroma: {
      kind: 5,
      strength: 1,
      glow: 1,
      metallic: 0,
      smoothness: .35
    },
    antique: {
      kind: 6,
      strength: 1,
      glow: 1
    },
    ghost: {
      kind: 7,
      strength: 1,
      glow: 1
    },
    reality: {
      kind: 8,
      strength: 1,
      glow: 1,
      metallic: .35,
      smoothness: .6
    },
    blaze: {
      kind: 9,
      strength: 1,
      glow: 1
    }
  },
  mn = {
    from: .22,
    to: .6,
    sway: 5,
    waves: 26,
    speed: [2.3, 3.1, 1.7],
    cells: 9,
    rise: .55,
    rest: .95,
    lift: .75,
    heat: .55,
    hot: [1, .72, .28],
    haloRest: .35,
    haloRise: .6,
    embers: .14,
    emberCells: 22,
    emberSize: .11,
    emberRate: .45,
    emberColor: [1, .5, .12]
  },
  pn = {
    color: [1, .07, .05],
    core: [1, .78, .7],
    period: 2.6,
    margin: .45,
    slant: .22,
    head: .045,
    tail: .36,
    line: 1.15,
    halo: 5,
    lineGain: 1.3,
    haloGain: .7
  },
  xn = {
    period: 5,
    span: .11,
    bodySpan: .012,
    floor: .42,
    alpha: .55,
    rim: .7,
    glow: .16
  };
function kn(n) {
  const e = e => {
    const t = ((n + e) % 1 + 1) % 1;
    return Math.min(1, Math.max(0, Math.abs(6 * t - 3) - 1));
  };
  return [e(0), e(2 / 3), e(1 / 3)];
}
var wn = {
  amplitude: .002,
  waves: 1.7,
  speed: 80,
  handleUv: .2,
  shardFrom: .55,
  flicker: .22,
  flickerRate: 14,
  fleck: .9,
  cut: .5
};
function gn(n, e, t, o) {
  const r = wn.amplitude * t,
    a = 2 * wn.waves * Math.PI / t,
    i = e * wn.speed,
    s = n.x * a,
    l = n.y * a,
    c = n.z * a;
  return o.x = r * Math.sin(1.3 * l + .7 * c + i), o.y = r * Math.sin(1.7 * c + .9 * s + 1.31 * i + 1.7), o.z = r * Math.sin(1.1 * s + 1.9 * l + .83 * i + 3.1), o;
}
function bn(n) {
  const e = n.getAttribute("position"),
    t = n.getAttribute("uv");
  if (!e || !t) return null;
  const o = new M(),
    r = new M();
  let a = 0,
    i = 0;
  for (let s = 0; s < e.count; s++) {
    const n = t.getX(s) > wn.handleUv || t.getY(s) > wn.handleUv ? r : o;
    n.x += e.getX(s), n.y += e.getY(s), n.z += e.getZ(s), n === r ? i++ : a++;
  }
  return a && i ? {
    handle: o.divideScalar(a),
    blade: r.divideScalar(i)
  } : null;
}
var yn = {
    color: [1, .05, .04],
    power: 2.6,
    lit: .3,
    shade: 1.05,
    breath: 1.6,
    breathDepth: .22,
    eyes: [185 / 256, .560546875, 194.5 / 256, .560546875],
    eye: 1.5 / 256,
    eyeHalo: 4.2 / 256
  },
  Sn = {
    from: .2,
    to: .7,
    breath: 1.25,
    depth: .15,
    halo: 1.2
  },
  Mn = {
    hand: [.3, -.45, -.7],
    color: new f(.62, .3, 1),
    intensity: 2.6,
    range: 6
  },
  $n = {
    breath: .9,
    strips: [.32, .47],
    ripple: [2.3, 2.9, 1.9],
    rippleSize: .035,
    wave: 1.05
  },
  Cn = {
    rest: .85,
    rise: .5,
    core: .22,
    haloTexels: 2.5,
    haloUv: .006,
    haloRest: .25,
    haloRise: .95
  },
  Tn = $n,
  _n = Cn,
  Pn = Sn,
  zn = new Map($.flatMap(item => item.fx ? [[item.skinName, item.fx]] : [])),
  Fn = n => n && zn.get(n) || null,
  An = {
    value: 0
  };
function Gn(n) {
  An.value = n / 1e3 % 3600;
}
var En = {
    still: !1
  },
  Rn = new Set(["glitch", "neon", "blaze"]),
  Ln = n => n && En.still && Rn.has(n) ? null : n;
function Wn(n, e, t = !1, r = !1) {
  const a = n;
  if (!(e = Ln(e)) || !a.uniforms?.uColor) return n;
  const i = dn[e];
  return "gold" === e ? (t ? function (n, e) {
    const t = n;
    t.uniforms?.uColor && t.defines && e !== "GLITTER_BOX" in t.defines && (t.defines.USE_GLITTER = "", t.defines.GLITTER_BOX = "", t.uniforms.uGlitter = un, t.needsUpdate = !0);
  }(a, !0) : vn(a, !0), a.uniforms.uMetallic.value = i.metallic, a.uniforms.uSmoothness.value = i.smoothness, a.userData.skinFx = e, a.needsUpdate = !0, n) : (a.defines.SKIN_FX = "", a.uniforms.uSkinFx = {
    value: new o(i.kind, i.strength, i.glow, 0)
  }, a.uniforms.uSkinTime = An, i.kind >= dn.laser.kind && i.kind <= dn.reality.kind && (a.defines.SKIN_SPACE = "", r && (a.defines.SKIN_FRAME = ""), a.uniforms.uSkinEyes = {
    value: new o(-1, -1, -1, -1)
  }, "chroma" === e && (a.uniforms.uSkinFx.value.w = r ? xn.span : xn.bodySpan)), "reality" === e && a.uniforms.uSkinEyes.value.set(0, 1, 0, 0), "antique" === e && (a.defines.SKIN_WOBBLE = "", a.uniforms.uSkinWobble = {
    value: new o(0, 0, wn.speed, wn.handleUv)
  }, a.uniforms.uAlphaTest && (a.uniforms.uAlphaTest.value = wn.cut)), void 0 !== i.metallic && (a.uniforms.uMetallic.value = i.metallic), void 0 !== i.smoothness && (a.uniforms.uSmoothness.value = i.smoothness), a.userData.skinFx = e, a.needsUpdate = !0, n);
}
function Hn(n, e) {
  "antique" === n.userData?.skinFx && (e.boundingSphere || e.computeBoundingSphere(), function (n, e, t = !0) {
    const o = n.uniforms?.uSkinWobble?.value;
    o && e > 0 && (o.x = t ? wn.amplitude * e : 0, o.y = 2 * wn.waves * Math.PI / e);
  }(n, e.boundingSphere?.radius ?? 0, null !== bn(e)));
}
function In(n) {
  n.traverse(n => {
    const e = n;
    if (!e.isMesh) return;
    const t = e.material;
    Array.isArray(t) || Hn(t, e.geometry);
  });
}
function Un(n, e, t) {
  const o = n;
  "reality" === o.userData?.skinFx && o.uniforms?.uSkinEyes && o.uniforms.uSkinEyes.value.set(e, Math.max(t, e + .001), 0, 0);
}
var Nn = new WeakMap();
function On(n, e, t) {
  const o = n;
  if (!o.uniforms?.uColor || n.transparent) return n;
  let r = Nn.get(n);
  r || Nn.set(n, r = new Map());
  let a = r.get(e);
  if (!a) {
    const i = t(o);
    i.name = `${n.name || "weapon"}:${e}`, Wn(i, e, !1, !0), "chroma" === e && (i.transparent = !0, i.depthWrite = !0, i.allowOverride = !1, i.uniforms.uColor.value.w = xn.alpha), r.set(e, a = i);
  }
  return a;
}
function Kn(n) {
  return (e, t) => {
    const o = e;
    if (!o.uniforms?.uColor || !o.defines) return;
    if (t === (o.userData.skinFx === n)) return;
    if (t) return o.userData.skinFxRest = [o.uniforms.uMetallic?.value, o.uniforms.uSmoothness?.value], void Wn(o, n);
    const r = o.userData.skinFxRest;
    r && (o.uniforms.uMetallic && (o.uniforms.uMetallic.value = r[0]), o.uniforms.uSmoothness && (o.uniforms.uSmoothness.value = r[1]), delete o.userData.skinFxRest), delete o.defines.SKIN_FX, delete o.defines.SKIN_SPACE, delete o.defines.SKIN_FRAME, delete o.defines.SKIN_WOBBLE, delete o.uniforms.uSkinFx, delete o.uniforms.uSkinTime, delete o.uniforms.uSkinEyes, delete o.uniforms.uSkinWobble, delete o.uniforms.uSkinWobbleAt, delete o.userData.skinFx, o.needsUpdate = !0;
  };
}
var Bn = Kn("ghost");
function Dn(n, e, t = !1) {
  Bn(n, e);
  const o = n.uniforms?.uSkinEyes?.value;
  e && o && (t ? o.set(-1, -1, -1, -1) : o.fromArray(yn.eyes));
}
var qn = n => Number.isInteger(n) ? n.toFixed(1) : String(n),
  jn = pn,
  Vn = xn,
  Xn = wn,
  Yn = yn,
  Qn = .42,
  Zn = .7,
  Jn = 5,
  ne = 1.35,
  ee = 1.25,
  te = 2.2,
  oe = .18,
  re = 2.6,
  ae = .075,
  ie = .25,
  se = .5,
  le = 1.4,
  ce = [1, .1, .07],
  ue = .3,
  fe = mn,
  he = n => `vec3(${n.map(qn).join(", ")})`,
  ve = `\n// x kind (1 glitch, 2 dark chrome, 3 neon, 4 laser, 5 chroma, 6 antique, 7 ghost, 8 reality,\n// 9 blaze), y strength, z glow, w chroma: turns of the colour per unit of the surface's place\nuniform vec4 uSkinFx;\nuniform float uSkinTime;\n#ifdef SKIN_SPACE\n// the surface's place (the weapon's frame: x height, y length 0..2, z width - else the mesh's\n// space) and the wire weights of its triangle (checker-skin.ts FRAME_WIRE; 1 without a frame)\nvarying vec3 vSkinPos;\nvarying vec3 vSkinWire;\n// GH0ST: the two eyes in the body texture (u, v, u, v; -1: none); the Reality Crate: xy = the\n// world heights its scan line climbs between\nuniform vec4 uSkinEyes;\n// how much of the model's edges lies on this pixel, the edges width pixels wide (0..1)\nfloat skinWire(float width) {\n  vec3 d = max(fwidth(vSkinWire), vec3(1e-6)) * width;\n  vec3 a = smoothstep(vec3(0.0), d, vSkinWire);\n  return 1.0 - min(a.x, min(a.y, a.z));\n}\n// the rainbow colour of hue h (skin-fx.ts rainbow)\nvec3 skinRainbow(float h) {\n  return clamp(abs(fract(h + vec3(0.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0) - 1.0, 0.0, 1.0);\n}\n// the laser wave at u along the weapon (skin-fx.ts laserWave)\nfloat skinLaserWave(float u) {\n  float front = fract(uSkinTime / ${qn(jn.period)}) * ${qn(1 + 2 * jn.margin)} - ${qn(jn.margin)};\n  float d = u - front;\n  float reach = d > 0.0 ? ${qn(jn.head)} : ${qn(jn.tail)};\n  return exp(-d * d / (reach * reach));\n}\n// the hue of a chroma surface (skin-fx.ts chromaHue)\nfloat skinChromaHue() {\n  return fract(uSkinTime / ${qn(Vn.period)} + vSkinPos.y * uSkinFx.w);\n}\n// the albedo of a chroma surface: the texture's light and dark in the turning colour\nvec3 skinChromaAlbedo(vec3 albedo) {\n  float lum = dot(albedo, vec3(0.299, 0.587, 0.114));\n  return skinRainbow(skinChromaHue()) * (${qn(Vn.floor)} + ${qn(1 - Vn.floor)} * lum);\n}\n#endif\n// the glitch's floor colour of the dark cells and the colour of the cell seams (skin-fx.ts)\n#define SKIN_GLITCH_FLOOR vec3(0.11, 0.02, 0.13)\n#define SKIN_GLITCH_SEAM vec3(1.0, 0.2, 0.92)\nfloat skinHash(vec2 p) {\n  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\n  p3 += dot(p3, p3.yzx + 33.33);\n  return fract((p3.x + p3.y) * p3.z);\n}\n// a value noise of the hash (skin-fx.ts blazeNoise): the flicker of Revolver Blaze\nfloat skinNoise(vec2 p) {\n  vec2 i = floor(p);\n  vec2 f = fract(p);\n  f = f * f * (3.0 - 2.0 * f);\n  return mix(\n    mix(skinHash(i), skinHash(i + vec2(1.0, 0.0)), f.x),\n    mix(skinHash(i + vec2(0.0, 1.0)), skinHash(i + vec2(1.0, 1.0)), f.x), f.y);\n}\n// how much a texel of Revolver Blaze burns (skin-fx.ts blazeMask)\nfloat skinBlazeMask(vec3 c) {\n  return smoothstep(${qn(fe.from)}, ${qn(fe.to)}, c.r - c.b);\n}\n// the glitch's bursts: x any glitch, y a hard one (skin-fx.ts glitchState)\nvec2 skinGlitch() {\n  float t = uSkinTime;\n  float on = step(0.8, skinHash(vec2(floor(t * 12.0), 1.7)));\n  float beat = floor(t / 2.4);\n  float hard = step(fract(t / 2.4), 0.08) * step(0.5, skinHash(vec2(beat, 9.1)));\n  return vec2(max(on, hard), hard) * uSkinFx.y;\n}\n// the albedo of a glitching skin: row tears, RGB split, data noise, inverted rows, scanlines\nvec4 skinGlitchAlbedo(sampler2D map, vec2 uv) {\n  vec2 g = skinGlitch();\n  float slot = floor(uSkinTime * 12.0);\n  float rowH = 4.0 + 16.0 * skinHash(vec2(slot, 4.2));\n  float row = floor(gl_FragCoord.y / rowH);\n  float tear = step(0.62 - 0.3 * g.y, skinHash(vec2(row, slot)));\n  float shift = (skinHash(vec2(row, slot + 0.5)) - 0.5) * (0.25 + 0.6 * g.y) * tear * g.x;\n  vec2 u = uv + vec2(shift, 0.0);\n  float split = (0.012 + 0.05 * g.x) * uSkinFx.y;\n  vec2 d = vec2(split, split * 0.35);\n  vec4 c = texture2D(map, u);\n  c.r = texture2D(map, u + d).r;\n  c.b = texture2D(map, u - d).b;\n  // readable in the dark (FB19ART, "error skin ak ist ingame teilweise unsichtbar": the near-black\n  // checker cells (5, 1, 4) vanished into dark surroundings and shadows): a deep violet floor and\n  // glowing magenta seams along the cell borders (one cell = one texel of the checker texture)\n  c.rgb = max(c.rgb, SKIN_GLITCH_FLOOR);\n  vec2 f = fract(u * vec2(textureSize(map, 0)));\n  vec2 e = min(f, 1.0 - f) / max(fwidth(u * vec2(textureSize(map, 0))), vec2(1e-4));\n  float seam = 1.0 - clamp(min(e.x, e.y) - 0.5, 0.0, 1.0);\n  c.rgb = mix(c.rgb, SKIN_GLITCH_SEAM, seam * 0.7);\n  vec2 block = floor(gl_FragCoord.xy / 9.0);\n  float n = skinHash(block + slot * 7.31);\n  if (n > 1.0 - 0.035 * g.x)\n    c.rgb = mix(vec3(0.0, 1.0, 1.0), vec3(1.0), step(0.5, skinHash(block + 3.1)));\n  if (g.y > 0.5 && skinHash(vec2(row, slot + 2.0)) > 0.88) c.rgb = 1.0 - c.rgb;\n  c.rgb *= 0.92 + 0.08 * sin(gl_FragCoord.y * 1.6 - uSkinTime * 30.0);\n  return c;\n}\n// the surface normal of dark chrome: a fine, slow ripple (the reflections shimmer calmly)\nvec3 skinChromeNormal(vec3 n, vec2 uv) {\n  float t = uSkinTime;\n  vec2 q = uv * 220.0;\n  vec3 j = vec3(\n    sin(q.x + t * ${qn(Tn.ripple[0])}),\n    sin(q.y * 1.3 + t * ${qn(Tn.ripple[1])}),\n    sin((q.x + q.y) * 0.7 + t * ${qn(Tn.ripple[2])}));\n  return normalize(n + j * ${qn(Tn.rippleSize)} * uSkinFx.y);\n}\n// the hue of a colour, 0..1 (skin-fx.ts chromeHue)\nfloat skinHue(vec3 c) {\n  vec4 k = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n  vec4 p = mix(vec4(c.bg, k.wz), vec4(c.gb, k.xy), step(c.b, c.g));\n  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n  float d = q.x - min(q.w, q.y);\n  return abs(q.z + (q.w - q.y) / (6.0 * d + 1e-10));\n}\n// how much a texel of dark chrome glows (skin-fx.ts chromeGlowMask)\nfloat skinChromeMask(vec3 c) {\n  return smoothstep(0.4, 0.8, max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b)));\n}\n// the wave through the colours (skin-fx.ts chromePulse): each element flares in turn\nfloat skinChromePulse(vec3 c, vec2 uv) {\n  float t = uSkinTime;\n  float s = 0.5 + 0.5 * sin(t * ${qn(Tn.wave)} - skinHue(c) * 6.2831853 - uv.x * 3.0 - uv.y * 2.0);\n  s *= s;\n  return s * s;\n}\n// the halo of the glowing elements on the metal around them: their colour at 4 taps of r and 4\n// diagonal taps of 2 r (half weight), faded out where r is below about a pixel (CHROME_GLOW)\nvec3 skinChromeHalo(vec2 uv) {\n  vec2 size = vec2(textureSize(uMap, 0));\n  float r = max(${qn(_n.haloTexels)} / max(size.x, size.y), ${qn(_n.haloUv)});\n  vec2 fw = fwidth(uv);\n  float fade = smoothstep(0.75, 2.5, r / max(max(fw.x, fw.y), 1e-6));\n  vec2 dx = vec2(r, 0.0), dy = vec2(0.0, r), dd = vec2(1.4142136 * r);\n  vec2 de = vec2(dd.x, -dd.y);\n  vec3 c;\n  vec4 a = vec4(0.0);\n  c = texture2D(uMap, uv + dx).rgb; a += vec4(c, 1.0) * skinChromeMask(c);\n  c = texture2D(uMap, uv - dx).rgb; a += vec4(c, 1.0) * skinChromeMask(c);\n  c = texture2D(uMap, uv + dy).rgb; a += vec4(c, 1.0) * skinChromeMask(c);\n  c = texture2D(uMap, uv - dy).rgb; a += vec4(c, 1.0) * skinChromeMask(c);\n  c = texture2D(uMap, uv + dd).rgb; a += vec4(c, 1.0) * skinChromeMask(c) * 0.5;\n  c = texture2D(uMap, uv - dd).rgb; a += vec4(c, 1.0) * skinChromeMask(c) * 0.5;\n  c = texture2D(uMap, uv + de).rgb; a += vec4(c, 1.0) * skinChromeMask(c) * 0.5;\n  c = texture2D(uMap, uv - de).rgb; a += vec4(c, 1.0) * skinChromeMask(c) * 0.5;\n  return a.rgb / 6.0 * fade;\n}\n// the lit colour of an animated skin\nvec3 skinFxColor(vec3 color, vec3 albedo, vec3 n, vec3 v, float nv, vec2 uv) {\n  float t = uSkinTime;\n  if (uSkinFx.x > 8.5) {\n    // blaze (skin-fx.ts BLAZE): the flames sway - the texture read a few texels beside the\n    // texel, in slow waves -, flicker with a rising noise and shine on their own\n    vec2 size = vec2(textureSize(uMap, 0));\n    vec2 q = uv * ${qn(fe.waves)};\n    vec2 sway = vec2(\n      sin(q.y + t * ${qn(fe.speed[0])}) + 0.5 * sin(q.y * 2.3 + q.x * 1.7 - t * ${qn(fe.speed[1])}),\n      0.6 * sin(q.x * 1.3 + t * ${qn(fe.speed[2])})) * (${qn(fe.sway)} / max(size.x, size.y));\n    vec3 f = texture2D(uMap, uv + sway).rgb;\n    float m = skinBlazeMask(f);\n    float flick = 0.65 * skinNoise(vec2(uv.x, uv.y - t * ${qn(fe.rise)}) * ${qn(fe.cells)})\n      + 0.35 * skinNoise(vec2(uv.x, uv.y - t * ${qn(1.9 * fe.rise)}) * ${qn(2.3 * fe.cells)} + vec2(7.1, 0.0));\n    vec3 fire = f * (${qn(fe.rest)} + ${qn(fe.lift)} * flick);\n    // (the yellow of a flame flares towards white at the flicker's peaks)\n    fire += ${he(fe.hot)} * (f.g * flick * flick * ${qn(fe.heat)});\n    vec3 c = mix(color, fire * uSkinFx.z, m * uSkinFx.y);\n    // a halo of the flames' colours on the dark metal around them (the taps of the chrome's)\n    float dark = 1.0 - max(m, skinBlazeMask(albedo));\n    c += skinChromeHalo(uv) * dark * (${qn(fe.haloRest)} + ${qn(fe.haloRise)} * flick) * uSkinFx.z;\n    // embers: a spark in some cells drifts up its cell and fades\n    vec2 g = uv * ${qn(fe.emberCells)};\n    vec2 cell = floor(g);\n    float seed = skinHash(cell + 11.3);\n    float life = fract(t * ${qn(fe.emberRate)} * (0.6 + 0.8 * seed) + seed * 9.7);\n    vec2 at = vec2(0.25 + 0.5 * skinHash(cell + 4.1), 0.2 + 0.6 * life);\n    float d = distance(fract(g), at);\n    float spark = step(${qn(1 - fe.embers)}, skinHash(cell + 23.9))\n      * smoothstep(0.0, 0.15, life) * (1.0 - smoothstep(0.5, 1.0, life))\n      * exp(-d * d / ${qn(fe.emberSize * fe.emberSize)});\n    return c + ${he(fe.emberColor)} * (spark * dark * uSkinFx.z);\n  }\n  #ifdef SKIN_SPACE\n  if (uSkinFx.x > 7.5) {\n    // reality (skin-fx.ts REALITY): the crate's seams in the turning colour, the red scan line\n    float lum = dot(albedo, vec3(0.299, 0.587, 0.114));\n    float seam = smoothstep(${qn(Qn)}, ${qn(Zn)}, lum);\n    float breath = ${qn(1 - oe)} + ${qn(oe)} * sin(t * ${qn(te)});\n    vec3 hue = skinRainbow(fract(t / ${qn(Jn)} + (uv.x + uv.y * 0.5) * ${qn(ne)}));\n    vec3 c = mix(color, hue * (${qn(ee)} * breath * uSkinFx.z), seam);\n    float h = (vWorldPos.y - uSkinEyes.x) / (uSkinEyes.y - uSkinEyes.x);\n    float front = fract(t / ${qn(re)}) * ${qn(1 + 2 * ie)} - ${qn(ie)};\n    float d = (h - front) / ${qn(ae)};\n    float scan = exp(-d * d) * uSkinFx.z;\n    c += ${he(ce)} * scan * (${qn(se)} + ${qn(le)} * seam);\n    c += skinRainbow(fract(nv * 1.5 + t * 0.1 + uv.x)) * pow(1.0 - nv, 3.0) * ${qn(ue)};\n    return c;\n  }\n  if (uSkinFx.x > 6.5) {\n    // ghost (skin-fx.ts GHOST): a red light on what is seen at a grazing angle, stronger on the\n    // side away from the sun, breathing; the two eyes of the body texture\n    float rim = pow(1.0 - nv, ${qn(Yn.power)});\n    float away = 1.0 - clamp(dot(n, normalize(uLightDir)), 0.0, 1.0);\n    float breath = ${qn(1 - Yn.breathDepth)} + ${qn(Yn.breathDepth)} * sin(t * ${qn(Yn.breath)});\n    vec3 c = color + ${he(Yn.color)} * rim * mix(${qn(Yn.lit)}, ${qn(Yn.shade)}, away) * breath * uSkinFx.z;\n    if (uSkinEyes.x >= 0.0) {\n      float d = min(distance(uv, uSkinEyes.xy), distance(uv, uSkinEyes.zw));\n      float core = 1.0 - smoothstep(${qn(.4 * Yn.eye)}, ${qn(Yn.eye)}, d);\n      float halo = exp(-d * d / ${qn(Yn.eyeHalo * Yn.eyeHalo)});\n      c += ${he(Yn.color)} * halo * (0.75 + 0.25 * breath) * uSkinFx.z;\n      c = mix(c, vec3(1.0, 0.42, 0.34), core);\n    }\n    return c;\n  }\n  if (uSkinFx.x > 5.5) {\n    // antique (skin-fx.ts ANTIQUE): the light shards flicker one by one, the fleck glows\n    float lum = dot(albedo, vec3(0.299, 0.587, 0.114));\n    float chroma = max(albedo.r, max(albedo.g, albedo.b)) - min(albedo.r, min(albedo.g, albedo.b));\n    vec2 cell = floor(uv * vec2(textureSize(uMap, 0)));\n    float beat = floor(t * ${qn(Xn.flickerRate)});\n    float n0 = skinHash(cell + beat * 3.17);\n    float n1 = skinHash(cell + (beat + 1.0) * 3.17);\n    float tw = mix(n0, n1, smoothstep(0.0, 1.0, fract(t * ${qn(Xn.flickerRate)})));\n    float shard = smoothstep(${qn(Xn.shardFrom)}, 0.95, lum) * (1.0 - smoothstep(0.25, 0.5, chroma));\n    vec3 c = color * (1.0 + shard * ${qn(Xn.flicker)} * (tw * 2.0 - 1.0));\n    c += albedo * smoothstep(0.35, 0.7, chroma) * ${qn(Xn.fleck)} * uSkinFx.z;\n    return c;\n  }\n  if (uSkinFx.x > 4.5) {\n    // chroma (skin-fx.ts CHROMA): the colour as its own light and at grazing angles\n    vec3 hue = skinRainbow(skinChromaHue());\n    return color + hue * (${qn(Vn.glow)} + ${qn(Vn.rim)} * pow(1.0 - nv, 2.0)) * uSkinFx.z;\n  }\n  if (uSkinFx.x > 3.5) {\n    // laser (skin-fx.ts LASER): the wave lights the model's edges - a hot line in a soft glow\n    float wave = skinLaserWave((vSkinPos.y + ${qn(jn.slant)} * vSkinPos.x) * ${qn(.5)}) * uSkinFx.z;\n    float line = skinWire(${qn(jn.line)});\n    float halo = skinWire(${qn(jn.halo)});\n    vec3 c = color + ${he(jn.color)} * (halo * halo * ${qn(jn.haloGain)} + line * ${qn(jn.lineGain)}) * wave;\n    return mix(c, ${he(jn.core)}, line * wave * 0.6);\n  }\n  #endif\n  if (uSkinFx.x < 1.5) {\n    vec2 g = skinGlitch();\n    color += albedo * uSkinFx.z * (0.6 + 0.8 * g.x);\n    float dim = g.y * step(0.5, skinHash(vec2(floor(t * 30.0), 6.6)));\n    return color * (1.0 - 0.45 * dim);\n  }\n  if (uSkinFx.x > 2.5) {\n    // neon (skin-fx.ts neonGlowMask / neonEmission): the light parts emit their colour, breathing\n    float m = smoothstep(${qn(Pn.from)}, ${qn(Pn.to)}, max(albedo.r, max(albedo.g, albedo.b)));\n    float breath = ${qn(1 - Pn.depth)} + ${qn(Pn.depth)} * sin(t * ${qn(Pn.breath)});\n    // and a halo of the glowing colours on the dark parts around them (the taps of the chrome's)\n    vec3 halo = skinChromeHalo(uv) * (1.0 - m) * ${qn(Pn.halo)};\n    return color + (albedo * m + halo) * uSkinFx.z * uSkinFx.y * breath;\n  }\n  // dark chrome: a black studio with two slowly drifting cold strip lights, the light parts of\n  // the texture polished silver (a soft studio gradient), a slow breath\n  vec3 rd = reflect(-v, n);\n  float s1 = smoothstep(0.72, 1.0, sin(rd.y * 4.5 + rd.x * 1.6 + t * ${qn(Tn.strips[0])}));\n  float s2 = smoothstep(0.84, 1.0, sin(rd.x * 3.6 - rd.z * 2.8 - t * ${qn(Tn.strips[1])}));\n  float lum = dot(albedo, vec3(0.299, 0.587, 0.114));\n  vec3 env = vec3(0.02, 0.02, 0.025) + vec3(0.62, 0.64, 0.7) * s1 + vec3(0.35, 0.33, 0.4) * s2\n    + vec3(0.22, 0.23, 0.26) * (0.5 + 0.5 * rd.y) * lum;\n  float fr = 0.35 + 0.65 * pow(1.0 - nv, 3.0);\n  float breath = 0.5 + 0.5 * sin(t * ${qn(Tn.breath)});\n  vec3 chrome = env * mix(vec3(0.8), albedo + 0.2, 0.5) * fr * (0.6 + 0.6 * lum);\n  vec3 lit = (color * 0.65 + chrome) * (0.9 + 0.1 * breath);\n  // the colours glow (skin-fx.ts chromeGlowMask / chromeGlowed): saturated texels shine on their\n  // own above the dark metal, flaring one element after the other (FB21SKINFX2: the wave\n  // through the colours, a hot core at the top, a halo of their colour on the metal around them)\n  float glow = skinChromeMask(albedo) * uSkinFx.z;\n  float pulse = skinChromePulse(albedo, uv);\n  vec3 c = lit * (1.0 - 0.4 * glow) + albedo * glow * (${qn(_n.rest)} + ${qn(_n.rise)} * pulse);\n  c = mix(c, c / max(max(c.r, max(c.g, c.b)), 1.0), glow);\n  c += (1.0 - c) * glow * pulse * ${qn(_n.core)};\n  vec3 halo = skinChromeHalo(uv);\n  c += halo * (1.0 - glow) * uSkinFx.z\n    * (${qn(_n.haloRest)} + ${qn(_n.haloRise)} * skinChromePulse(halo, uv));\n  return c * uSkinFx.y + color * (1.0 - uSkinFx.y);\n}\n`,
  de = {
    stars: 1.6,
    share: .16,
    nebula: .17,
    drift: .04,
    rise: .3,
    light: .22,
    tint: .16,
    rim: .22,
    glow: [.32, .6],
    swell: 1.4,
    halo: .35,
    strength: 1
  },
  me = new o(0, de.strength, de.stars, de.nebula),
  pe = "undefined" != typeof performance ? performance.now() : 0,
  xe = {
    get value() {
      const n = "undefined" != typeof performance ? performance.now() : 0;
      return me.x = (n - pe) / 1e3 % 1e3, me;
    },
    set value(n) {}
  },
  ke = n => n.toFixed(4),
  we = `\nuniform vec4 uGalaxy;\nfloat kourGalaxyHash(vec3 c) {\n  return fract(sin(dot(c, vec3(12.9898, 78.233, 37.719))) * 43758.5453);\n}\nfloat kourGalaxyNoise(vec3 p) {\n  vec3 i = floor(p);\n  vec3 f = fract(p);\n  f = f * f * (3.0 - 2.0 * f);\n  return mix(\n    mix(mix(kourGalaxyHash(i), kourGalaxyHash(i + vec3(1.0, 0.0, 0.0)), f.x),\n        mix(kourGalaxyHash(i + vec3(0.0, 1.0, 0.0)), kourGalaxyHash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),\n    mix(mix(kourGalaxyHash(i + vec3(0.0, 0.0, 1.0)), kourGalaxyHash(i + vec3(1.0, 0.0, 1.0)), f.x),\n        mix(kourGalaxyHash(i + vec3(0.0, 1.0, 1.0)), kourGalaxyHash(i + vec3(1.0)), f.x), f.y),\n    f.z);\n}\nvec3 kourGalaxy(vec3 color, vec3 albedo, vec3 p, vec3 n, vec3 v) {\n  float t = uGalaxy.x;\n  float nv = clamp(dot(n, v), 0.0, 1.0);\n  vec3 sp = p * uGalaxy.z + vec3(0.0, -t * ${ke(de.rise)}, 0.0);\n  vec3 cell = floor(sp);\n  float h = kourGalaxyHash(cell);\n  vec3 fc = abs(fract(sp) - 0.5);\n  float star = max(0.0, 1.0 - (fc.x + fc.y + fc.z) * 2.6);\n  float twinkle = 0.55 + 0.45 * sin(t * (1.1 + 2.3 * h) + h * 40.0);\n  float stars = star * star * twinkle * step(${ke(1 - de.share)}, h);\n  #ifdef GALAXY_PART\n  float swell = 0.5 + 0.5 * sin(t * ${ke(de.swell)} + dot(p, vec3(0.31, 0.47, 0.23)));\n  vec3 glow = albedo * mix(${ke(de.glow[0])}, ${ke(de.glow[1])}, swell)\n    + vec3(1.0, 0.86, 0.55) * pow(1.0 - nv, 2.5) * ${ke(de.halo)};\n  return color + uGalaxy.y * (glow + vec3(1.0, 0.95, 0.82) * stars * 1.4);\n  #else\n  vec3 q = p * uGalaxy.w + vec3(0.0, t * ${ke(de.drift)}, t * ${ke(.6 * de.drift)});\n  float neb = kourGalaxyNoise(q) * 0.65\n    + kourGalaxyNoise(q * 2.1 - vec3(t * ${ke(1.7 * de.drift)}, 0.0, 0.0)) * 0.35;\n  vec3 tint = mix(vec3(0.3, 0.38, 1.0), vec3(1.0, 0.35, 0.9), neb);\n  vec3 body = color * (1.0 + ${ke(de.light)} * (neb - 0.5))\n    + albedo * tint * ${ke(de.tint)} * neb\n    + vec3(0.9, 0.92, 1.0) * stars * 1.3\n    + vec3(0.62, 0.42, 1.0) * pow(1.0 - nv, 3.0) * ${ke(de.rim)};\n  return mix(color, body, uGalaxy.y);\n  #endif\n}`;
function ge(n, e, t = !1) {
  const o = n;
  if (!o.uniforms?.uColor || !o.defines) return;
  const r = "USE_GALAXY" in o.defines,
    a = "GALAXY_PART" in o.defines;
  (e !== r || e && t !== a) && (e ? (o.defines.USE_GALAXY = "", t ? o.defines.GALAXY_PART = "" : delete o.defines.GALAXY_PART, o.uniforms.uGalaxy = xe) : (delete o.defines.USE_GALAXY, delete o.defines.GALAXY_PART, delete o.uniforms.uGalaxy), o.needsUpdate = !0);
}
var be = {
    uPrevViewProjection: {
      value: new i()
    },
    uMotion: {
      value: new o(0, 0, 0, 0)
    }
  },
  ye = "\nuniform mat4 uPrevViewProjection;\nuniform mat4 uPrevModel;\nuniform float uMotionObject;\nvarying vec4 vClipNow;\nvarying vec4 vClipPrev;\n#ifdef USE_SKINNING\n/** the bone texture's second half: last frame's bones (motion-vectors.ts extend) */\nmat4 kourPrevBone(const in float i, int size) {\n  int j = int(i) * 4;\n  int x = j % size;\n  int y = j / size + size;\n  return mat4(\n    texelFetch(boneTexture, ivec2(x, y), 0),\n    texelFetch(boneTexture, ivec2(x + 1, y), 0),\n    texelFetch(boneTexture, ivec2(x + 2, y), 0),\n    texelFetch(boneTexture, ivec2(x + 3, y), 0));\n}\n#endif\n",
  Se = "\n  vec4 prevWorld = worldPos;\n  #ifdef USE_SKINNING\n  ivec2 boneSize = textureSize(boneTexture, 0);\n  if (boneSize.y == boneSize.x * 2) {\n    int bs = boneSize.x;\n    vec4 prevSkinned = kourPrevBone(skinIndex.x, bs) * skinVertex * skinWeight.x\n      + kourPrevBone(skinIndex.y, bs) * skinVertex * skinWeight.y\n      + kourPrevBone(skinIndex.z, bs) * skinVertex * skinWeight.z\n      + kourPrevBone(skinIndex.w, bs) * skinVertex * skinWeight.w;\n    prevWorld = modelMatrix * (bindMatrixInverse * prevSkinned);\n  }\n  #else\n  if (uMotionObject > 0.5) prevWorld = uPrevModel * vec4(transformed, 1.0);\n  #endif\n  vClipNow = gl_Position;\n  vClipPrev = uPrevViewProjection * prevWorld;\n",
  Me = !1,
  $e = 0,
  Ce = new WeakMap(),
  Te = new WeakMap(),
  _e = [],
  Pe = null;
function ze(n, e, t) {
  Pe = n, $e += t ? 2 : 1, _e.length = 0, be.uPrevViewProjection.value.copy(e);
}
function Fe(n) {
  Me = n, be.uMotion.value.x = n ? 1 : 0;
}
function Ae(n) {
  be.uPrevViewProjection.value.copy(n), Fe(!0);
}
var Ge = () => Me;
function Ee() {
  for (const n of _e) n.data.copyWithin(n.half, 0, n.half);
  _e.length = 0;
}
function Re() {
  Fe(!1), _e.length = 0, $e += 2;
}
function Le(n, e, t, o, r) {
  if (!Me || this.transparent) return;
  if (r.isSkinnedMesh) {
    const n = function (n) {
      const e = Te.get(n);
      if (e) return e;
      const t = n.boneTexture,
        o = n.boneMatrices;
      if (!t || !o) return null;
      const r = t.image.width,
        a = r * r * 4,
        float32Values = new Float32Array(2 * a);
      float32Values.set(o.subarray(0, a)), float32Values.copyWithin(a, 0, a);
      const s = new c(float32Values, r, 2 * r, w, h);
      if (s.needsUpdate = !0, n.boneMatrices = float32Values.subarray(0, a), n.boneTexture = s, t.dispose(), Pe) {
        P(!0);
        try {
          Pe.initTexture(s);
        } finally {
          P(!1);
        }
      }
      const l = {
        frame: -10,
        data: float32Values,
        half: a
      };
      return Te.set(n, l), l;
    }(r.skeleton);
    if (!n || n.frame === $e) return;
    return n.frame !== $e - 1 && n.data.copyWithin(n.half, 0, n.half), n.frame = $e, void _e.push(n);
  }
  const a = this.uniforms.uMotionObject;
  if (!a) return;
  const s = function (n) {
    let e = Ce.get(n);
    return e || (e = {
      frame: -10,
      prev: new i(),
      cur: new i(),
      moving: !1
    }, Ce.set(n, e)), e;
  }(r);
  s.frame !== $e && (s.prev.copy(s.frame === $e - 1 ? s.cur : r.matrixWorld), s.cur.copy(r.matrixWorld), s.moving = !s.prev.equals(s.cur), s.frame = $e), s.moving ? (this.uniforms.uPrevModel.value = s.prev, a.value = 1, this.uniformsNeedUpdate = !0) : 0 !== a.value && (a.value = 0, this.uniformsNeedUpdate = !0);
}
function We() {
  return $e;
}
var He = [["uShadowMatrix", "mat4", 0], ["uShadowMatrix1", "mat4", 0], ["uFog", "vec4", 0], ["uShadow", "vec4", 0], ["uShadow1", "vec4", 0], ["uShadowRange", "vec4", 0], ["uPointPos", "vec4", 8], ["uPointColor", "vec3", 8], ["uSH", "vec3", 9], ["uLightDir", "vec3", 0], ["uPointCount", "float", 0], ["uLightColor", "vec3", 0], ["uFogColor", "vec3", 0], ["uSkyTop", "vec3", 0], ["uSkyBottom", "vec3", 0]],
  Ie = "KourEnv",
  Ue = n => `kour_${n.slice(1)}`,
  Ne = [`layout(std140) uniform ${Ie} {`, ...He.map(([n, e, t]) => `  ${e} ${Ue(n)}${t ? `[${t}]` : ""};`), "};", ...He.map(([n]) => "uPointCount" === n ? `#define ${n} int(${Ue(n)})` : `#define ${n} ${Ue(n)}`)].join("\n"),
  Oe = He.map(([n, e, t]) => function (n, e, t) {
    return new RegExp(`^[ \\t]*uniform\\s+${"uPointCount" === n ? "int" : e}\\s+${n}\\s*${t ? "\\[[^\\]]+\\]" : ""}\\s*;[ \\t]*$`, "m");
  }(n, e, t)),
  Ke = null,
  Be = new WeakMap(),
  De = new WeakSet(),
  qe = class {
    read;
    constructor(n) {
      this.read = n;
    }
    get value() {
      return this.read();
    }
    clone() {
      return this;
    }
  };
function je(n) {
  let e = Be.get(n);
  if (!e) {
    const t = Ke;
    if (!t) throw new Error("envBlockGroup: ENV not registered");
    e = new p(), e.setName(Ie), e.setUsage(s);
    for (const [n,, o] of He) {
      const r = t[n],
        a = o ? Array.from({
          length: o
        }, (n, e) => new qe(() => r.value[e])) : new qe(() => r.value);
      e.add(a);
    }
    Be.set(n, e), De.add(e);
  }
  return e;
}
var Ve = null,
  Xe = null,
  Ye = "kour_gbuffer",
  Qe = 1024,
  Ze = `\nvec2 kourOctEncode(vec3 n) {\n  n /= abs(n.x) + abs(n.y) + abs(n.z);\n  vec2 p = n.xy;\n  if (n.z < 0.0) p = (1.0 - abs(n.yx)) * vec2(n.x >= 0.0 ? 1.0 : -1.0, n.y >= 0.0 ? 1.0 : -1.0);\n  return p;\n}\nvec3 kourOctDecode(vec2 p) {\n  vec3 n = vec3(p, 1.0 - abs(p.x) - abs(p.y));\n  float t = max(-n.z, 0.0);\n  n.x += n.x >= 0.0 ? -t : t;\n  n.y += n.y >= 0.0 ? -t : t;\n  return normalize(n);\n}\nbool kourGWritten(vec4 g) {\n  return g.x > ${1.5.toFixed(1)};\n}\nbool kourGCovered(vec4 g) {\n  return g.x < -1.0;\n}\n`,
  Je = {
    zero: [0, 0, 0, 0],
    one: [1, 1, 1, 1],
    half: [.5, .5, .5, .5],
    alpha: [0, 0, 0, 1]
  };
function nt(n, e, t, o, r) {
  switch (n) {
    case 200:
      return 0;
    case 201:
      return 1;
    case 202:
      return e[o];
    case 203:
      return 1 - e[o];
    case 204:
      return e[3];
    case 205:
      return 1 - e[3];
    case 206:
      return t[3];
    case 207:
      return 1 - t[3];
    case 208:
      return t[o];
    case 209:
      return 1 - t[o];
    case 210:
      return r ? 1 : Math.min(e[3], 1 - t[3]);
    default:
      return NaN;
  }
}
function et(n, e, t, o) {
  const r = 3 === o,
    a = nt(r ? n.srcA : n.src, e, t, o, r),
    i = nt(r ? n.dstA : n.dst, e, t, o, r);
  switch (r ? n.eqA : n.eq) {
    case 100:
      return e[o] * a + t[o] * i;
    case 101:
      return e[o] * a - t[o] * i;
    case 102:
      return t[o] * i - e[o] * a;
    default:
      return NaN;
  }
}
var tt = [[3.25, -.4, .013, -.02], [2.1, .9, -.3, .25], [.2, .5, .7, 1], [0, 0, 0, 0]];
function ot(n) {
  const e = function (n) {
    const e = n.blending;
    if (0 === e || 1 === e && !n.transparent) return null;
    const t = (n, e, t = n, o = e) => ({
        src: n,
        dst: e,
        srcA: t,
        dstA: o,
        eq: 100,
        eqA: 100
      }),
      {
        OneFactor: o,
        ZeroFactor: r
      } = x;
    return 5 === e ? {
      src: n.blendSrc,
      dst: n.blendDst,
      srcA: n.blendSrcAlpha ?? n.blendSrc,
      dstA: n.blendDstAlpha ?? n.blendDst,
      eq: n.blendEquation,
      eqA: n.blendEquationAlpha ?? n.blendEquation
    } : n.premultipliedAlpha ? 1 === e ? t(o, 205, o, 205) : 2 === e ? t(o, o) : 3 === e ? t(r, 203, r, o) : t(208, 205, r, o) : 1 === e ? t(204, 205, o, 205) : t(204, o, o, o);
  }(n);
  if (!e) return "none";
  for (const [t, o] of Object.entries(Je)) if (tt.every(item => [0, 1, 2, 3].every(_item => Math.abs(et(e, o, item, _item) - item[_item]) < 1e-6))) return t;
  return "zero";
}
var rt = /\bvoid\s+main\s*\(\s*(?:void\s*)?\)/,
  at = /^([ \t]*)out\s+((?:highp|mediump|lowp)\s+)?vec4\s+(\w+)\s*;/m;
function it(n) {
  return !0 === n.userData.gbufferCover;
}
var st = {
    normals: !1,
    motion: !1
  },
  lt = new Set();
function ct() {
  lt.delete(this);
}
function ut(n) {
  return !0 === n.userData.unityPort;
}
function ft() {
  return st;
}
function ht(n, e) {
  const t = n || e;
  if (t === st.normals && e === st.motion) return !1;
  st = {
    normals: t,
    motion: e
  };
  for (const o of lt) o.needsUpdate = !0;
  return !0;
}
var vt = [{
  normals: !1,
  motion: !1
}, {
  normals: !0,
  motion: !1
}, {
  normals: !0,
  motion: !0
}];
function dt(n, e) {
  const t = st;
  st = {
    normals: n.normals || n.motion,
    motion: n.motion
  };
  try {
    return e();
  } finally {
    st = t;
  }
}
function mt(e, t) {
  if (!0 === this.isRawShaderMaterial) return;
  const o = this.glslVersion === n,
    r = ut(this);
  let a = e.fragmentShader;
  if (r) {
    lt.has(this) || (lt.add(this), this.addEventListener("dispose", ct), this.onBeforeRender = pt);
    const n = [];
    if (st.normals && !this.transparent && n.push("#define KOUR_GBUFFER"), st.motion && !this.transparent && n.push("#define KOUR_MOTION"), n.length) {
      const t = n.join("\n") + "\n";
      a = t + a, e.vertexShader = t + e.vertexShader;
    }
    {
      const n = function (n) {
        let e = -1;
        for (const o of Oe) {
          const t = o.exec(n);
          if (!t) return null;
          (e < 0 || t.index < e) && (e = t.index);
        }
        let t = n;
        for (const o of Oe) t = t.replace(o, "");
        return t.slice(0, e) + Ne + "\n" + t.slice(e);
      }(a);
      n && (a = n, this.uniformsGroups = [je(t)]);
    }
  }
  const i = function (n, e, t, o = !1) {
    if (n.includes("kour_gbuffer;")) return n;
    if (!rt.test(n)) return null;
    let r = n,
      a = "gl_FragColor";
    if (t) {
      if (/layout\s*\(\s*location/.test(r)) return null;
      const n = at.exec(r);
      if (!n) return null;
      if (at.test(r.slice(n.index + n[0].length))) return null;
      r = r.replace(at, "$1layout(location = 0) out $2vec4 $3;"), a = n[3];
    }
    r = r.replace(rt, "void kour_main()");
    const i = o ? `\n  ${Ye} = vec4(${(-1024).toFixed(1)}, 0.0, 0.0, ${a}.a);` : "";
    return `layout(location = 1) out highp vec4 ${Ye};\n` + r + `\nvoid main() {\n  ${Ye} = ${s = e, `vec4(${("none" === s ? [0, 0, 0, 0] : Je[s]).map(item => item.toFixed(1)).join(", ")})`};\n  kour_main();${i}\n}\n`;
    var s;
  }(a, ot(this), o, it(this));
  i ? e.fragmentShader = i : r && (e.fragmentShader = a);
}
function pt(n, e, t, o, r) {
  (function (n, e) {
    const t = n.uniformsGroups;
    if (!t.length) return;
    e !== Ve && (Ve = e, Xe = je(e));
    const o = t[0];
    o === Xe || !De.has(o) && "KourEnv" !== o.name || (t[0] = Xe);
  })(this, n), Le.call(this, n, e, t, o, r);
}
function xt() {
  return `kour-gbuffer:${ot(this)}${it(this) ? ":cover" : ""}${ut(this) && !this.transparent ? ":" + (st.normals ? "n" : "") + (st.motion ? "m" : "") : ""}`;
}
var kt = !1,
  wt = n => Math.pow(Math.max(0, n), 2.2);
function gt(n, e, t) {
  return [.282095, .488603 * e, .488603 * t, .488603 * n, 1.092548 * n * e, 1.092548 * e * t, .315392 * (3 * t * t - 1), 1.092548 * n * t, .546274 * (n * n - e * e)];
}
function bt(n) {
  const arrayValues = Array.from({
    length: 9
  }, () => [0, 0, 0]);
  let t = 0;
  for (let a = 0; a < 24; a++) for (let o = 0; o < 48; o++) {
    const r = (a + .5) / 24 * Math.PI,
      i = (o + .5) / 48 * Math.PI * 2,
      s = Math.sin(r),
      l = s * Math.cos(i),
      c = Math.cos(r),
      u = s * Math.sin(i),
      f = s;
    t += f;
    const h = n(l, c, u),
      v = gt(l, c, u);
    for (let n = 0; n < 9; n++) {
      const t = v[n] * f;
      arrayValues[n][0] += h[0] * t, arrayValues[n][1] += h[1] * t, arrayValues[n][2] += h[2] * t;
    }
  }
  const o = 4 * Math.PI / t,
    r = [1, 2 / 3, 2 / 3, 2 / 3, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4];
  return arrayValues.forEach((item, index) => {
    const t = o * r[index];
    item[0] *= t, item[1] *= t, item[2] *= t;
  }), arrayValues;
}
var yt = (n, e, t) => [n[0] + (e[0] - n[0]) * t, n[1] + (e[1] - n[1]) * t, n[2] + (e[2] - n[2]) * t],
  St = {
    peak: 1,
    luma: [.299, .587, .114]
  },
  Mt = {
    uPointPos: {
      value: Array.from({
        length: 8
      }, () => new o())
    },
    uPointColor: {
      value: Array.from({
        length: 8
      }, () => new f(0, 0, 0))
    },
    uPointCount: {
      value: 0
    }
  },
  $t = "\nuniform vec4 uPointPos[8];\nuniform vec3 uPointColor[8];\nuniform int uPointCount;\n// Unity's point light falloff (_LightTexture0 over r² = d² / range²): about 1 / (1 + 25 r²),\n// reaching 0 at the range\nfloat kourPointAtten(float r2) {\n  return r2 >= 1.0 ? 0.0 : clamp((1.0 - r2) * 5.0, 0.0, 1.0) / (1.0 + 25.0 * r2);\n}\nvec3 pointLights(vec3 p, vec3 n, vec3 v, vec3 diffColor, vec3 specColor, float a) {\n  vec3 sum = vec3(0.0);\n  for (int i = 0; i < 8; i++) {\n    if (i >= uPointCount) break;\n    vec3 d = uPointPos[i].xyz - p;\n    float r2 = dot(d, d) * uPointPos[i].w;\n    if (r2 >= 1.0) continue;\n    vec3 l = normalize(d);\n    float nl = clamp(dot(n, l), 0.0, 1.0);\n    if (nl <= 0.0) continue;\n    vec3 h = normalize(v + l);\n    float nh = clamp(dot(n, h), 0.0, 1.0);\n    float lh = max(clamp(dot(l, h), 0.0, 1.0), 0.32);\n    float spec = a / ((nh * nh * (a * a - 1.0) + 1.00001) * lh * (a + 1.5));\n    sum += (diffColor + spec * specColor) * uPointColor[i] * (nl * kourPointAtten(r2));\n  }\n  return sum;\n}\n// the lights' Lambert term alone (ForwardAdd passes without specular, e.g. the spawn shield)\nvec3 pointLambert(vec3 p, vec3 n) {\n  vec3 sum = vec3(0.0);\n  for (int i = 0; i < 8; i++) {\n    if (i >= uPointCount) break;\n    vec3 d = uPointPos[i].xyz - p;\n    float r2 = dot(d, d) * uPointPos[i].w;\n    if (r2 >= 1.0) continue;\n    sum += uPointColor[i] * (max(dot(n, normalize(d)), 0.0) * kourPointAtten(r2));\n  }\n  return sum;\n}\n";
function Ct(n, e = () => null) {
  const t = [];
  for (const o of n) {
    if (!(2 === o.type && o.enabled && o.range > 0 && o.intensity > 0)) continue;
    const n = o.position ? new M(-o.position[0], o.position[1], o.position[2]) : o.node ? e(o.node) : null;
    n && t.push({
      position: n,
      color: new f(o.color[0], o.color[1], o.color[2]).multiplyScalar(o.intensity),
      range: o.range
    });
  }
  return t;
}
var Tt = [1, .86, .66],
  _t = class {
    lights = [];
    enabled = !0;
    event = {
      position: new M(),
      color: new f(),
      range: 1,
      start: -1 / 0,
      active: !1
    };
    flash(n, e = performance.now(), t = 1) {
      const o = this.event;
      o.position.copy(n), o.position.y += 4, o.color.setRGB(Tt[0], Tt[1], Tt[2]).multiplyScalar(9 * t), o.range = 110, o.start = e, o.active = !0;
    }
    $_79f() {
      this.event.active = !1;
    }
    order = [];
    distance = [];
    carried = Array.from({
      length: 2
    }, () => ({
      position: new M(),
      color: new f(),
      range: 1
    }));
    $_2bi = 0;
    carry(n, e, t, o, r, a) {
      if (this.$_2bi >= 2) return;
      const i = this.carried[this.$_2bi++];
      i.position.set(n, e, t), i.color.copy(o).multiplyScalar(r), i.range = a;
    }
    set(n) {
      this.lights = n, this.order.length = this.distance.length = n.length, n.length || (Mt.uPointCount.value = 0);
    }
    get count() {
      return this.lights.length;
    }
    update(n, e = performance.now()) {
      const t = Mt;
      let o = 0;
      const r = this.event;
      if (r.active) {
        const n = C(e - r.start);
        n > 0 || e < r.start ? (t.uPointPos.value[0].set(r.position.x, r.position.y, r.position.z, 1 / (r.range * r.range)), t.uPointColor.value[0].copy(r.color).multiplyScalar(n), o = 1) : r.active = !1;
      }
      for (let f = 0; f < this.$_2bi && o < 8; f++) {
        const n = this.carried[f];
        t.uPointPos.value[o].set(n.position.x, n.position.y, n.position.z, 1 / (n.range * n.range)), t.uPointColor.value[o].copy(n.color), o++;
      }
      this.$_2bi = 0;
      const a = this.lights.length;
      if (!this.enabled || !a) return void (t.uPointCount.value = o);
      for (let f = 0; f < a; f++) {
        const e = this.lights[f];
        this.order[f] = f, this.distance[f] = e.position.distanceTo(n);
      }
      const i = this.distance,
        s = this.order;
      for (let f = 1; f < a; f++) {
        const n = s[f];
        let e = f - 1;
        for (; e >= 0 && i[s[e]] > i[n];) s[e + 1] = s[e], e--;
        s[e + 1] = n;
      }
      const l = 8 - o,
        c = Math.min(a, l),
        u = a > l ? i[s[l]] : 1 / 0;
      for (let f = 0; f < c; f++) {
        const n = this.lights[s[f]],
          e = Math.max(4, .5 * n.range),
          r = u === 1 / 0 ? 1 : Math.min(1, Math.max(0, (u - i[s[f]]) / e)),
          a = o + f;
        t.uPointPos.value[a].set(n.position.x, n.position.y, n.position.z, 1 / (n.range * n.range)), t.uPointColor.value[a].copy(n.color).multiplyScalar(r);
      }
      t.uPointCount.value = o + c;
    }
  },
  Pt = .004,
  zt = 1080;
function Ft(n, e, t, o = 1e-4) {
  const float32Values = new Float32Array(3 * t),
    lookupMap = new Map(),
    i = n => Math.round(n / o);
  for (let l = 0; l < t; l++) {
    const e = `${i(n[3 * l])},${i(n[3 * l + 1])},${i(n[3 * l + 2])}`;
    let t = lookupMap.get(e);
    t || lookupMap.set(e, t = []), t.push(l);
  }
  const s = n => {
    const t = e[3 * n],
      o = e[3 * n + 1],
      r = e[3 * n + 2],
      a = Math.hypot(t, o, r) || 1;
    return [t / a, o / a, r / a];
  };
  for (const l of lookupMap.values()) {
    const n = [];
    for (const r of l) {
      const e = s(r);
      n.some(item => item[0] * e[0] + item[1] * e[1] + item[2] * e[2] > .9999) || n.push(e);
    }
    let e = 0,
      t = 0,
      o = 0;
    for (const r of n) e += r[0], t += r[1], o += r[2];
    const a = Math.hypot(e, t, o);
    for (const i of l) {
      let l;
      if (a < .001) l = s(i);else {
        const r = [e / a, t / a, o / a];
        let i = 1;
        for (const e of n) i = Math.min(i, r[0] * e[0] + r[1] * e[1] + r[2] * e[2]);
        const s = Math.min(2.5, 1 / Math.max(i, .4));
        l = [r[0] * s, r[1] * s, r[2] * s];
      }
      float32Values[3 * i] = l[0], float32Values[3 * i + 1] = l[1], float32Values[3 * i + 2] = l[2];
    }
  }
  return float32Values;
}
a.enabled = !1, function () {
  if (kt) return;
  kt = !0;
  const n = m.prototype;
  n.onBeforeCompile = mt, n.customProgramCacheKey = xt;
}();
var At = "",
  Gt = new t(1, 1, u);
Gt.minFilter = Gt.magFilter = r, Gt.compareFunction = 515, Gt.needsUpdate = !0;
var Et = {
  uLightDir: {
    value: new M(.3, .8, .5).normalize()
  },
  uLightColor: {
    value: new f(.5, .485, .45)
  },
  uSH: {
    value: Array.from({
      length: 9
    }, () => new M())
  },
  uFogColor: {
    value: new f(.5, .7, .9)
  },
  uFog: {
    value: new o(0, 100, 300, .01)
  },
  uSkyTop: {
    value: new f(.2, .5, .9)
  },
  uSkyBottom: {
    value: new f(.7, .9, 1)
  },
  uShadowMap: {
    value: Gt
  },
  uShadowMatrix: {
    value: new i()
  },
  uShadowMap1: {
    value: Gt
  },
  uShadowMatrix1: {
    value: new i()
  },
  uShadow1: {
    value: new o(0, 1, 0, 0)
  },
  uShadow: {
    value: new o(0, 1024, 0, 1)
  },
  uShadowRange: {
    value: new o(0, 1, 0, 0)
  },
  ...Mt
};
function Rt(n) {
  Et.uShadowMap.value = n ?? Gt, Et.uShadowMap1.value = Gt;
}
function Lt(n, e) {
  Et.uShadowMap.value = n, Et.uShadowMap1.value = e ?? Gt;
}
function Wt() {
  return {
    lightDir: Et.uLightDir.value.clone(),
    lightColor: Et.uLightColor.value.clone(),
    sh: Et.uSH.value.map(item => item.clone()),
    fogColor: Et.uFogColor.value.clone(),
    fog: Et.uFog.value.clone(),
    skyTop: Et.uSkyTop.value.clone(),
    skyBottom: Et.uSkyBottom.value.clone(),
    pointCount: Et.uPointCount.value
  };
}
function Ht(n) {
  n.lightDir.copy(Et.uLightDir.value), n.lightColor.copy(Et.uLightColor.value);
  const e = Et.uSH.value;
  for (let t = 0; t < e.length; t++) (n.sh[t] ??= e[t].clone()).copy(e[t]);
  return n.fogColor.copy(Et.uFogColor.value), n.fog.copy(Et.uFog.value), n.skyTop.copy(Et.uSkyTop.value), n.skyBottom.copy(Et.uSkyBottom.value), n.pointCount = Et.uPointCount.value, n;
}
function It(n) {
  Et.uLightDir.value.copy(n.lightDir), Et.uLightColor.value.copy(n.lightColor);
  for (let e = 0; e < n.sh.length; e++) Et.uSH.value[e].copy(n.sh[e]);
  Et.uFogColor.value.copy(n.fogColor), Et.uFog.value.copy(n.fog), Et.uSkyTop.value.copy(n.skyTop), Et.uSkyBottom.value.copy(n.skyBottom), Et.uPointCount.value = n.pointCount;
}
function Ut(n, e, t, o, r = 1) {
  var a;
  a = function (n, e, t, o, r = 1) {
    const a = n => [wt(n[0]), wt(n[1]), wt(n[2])],
      i = a(e),
      s = a(t),
      l = a(o);
    if (3 === n) return bt(() => [i[0], i[1], i[2]]);
    if (0 === n) {
      const n = [i[0] * r, i[1] * r, i[2] * r],
        e = [s[0] * r, s[1] * r, s[2] * r];
      return bt((t, o) => o >= 0 ? yt(e, n, o) : yt(e, l, Math.min(1, -o)));
    }
    return bt((n, e) => e >= 0 ? yt(s, i, e) : yt(s, l, Math.min(1, -e)));
  }(n, e, t, o, r), a.forEach((item, index) => Et.uSH.value[index].set(item[0], item[1], item[2]));
}
Ke = Et;
var Nt = `\n#include <common>\n#include <skinning_pars_vertex>\nvarying vec3 vWorldPos;\nvarying vec3 vNormalW;\nvarying vec2 vUv;\nvarying float vFogDepth;\n#ifdef USE_VCOLOR\nattribute vec4 color;\nvarying vec4 vColor;\n#endif\n#ifdef KOUR_MAT_TABLE\n// merged map batches (render/material-merge.ts, FB20PERFDRAW): the _MainTex_ST of up to\n// KOUR_MAT_TABLE materials, the vertex's material in kourMat\nattribute float kourMat;\nuniform vec4 kourMatST[KOUR_MAT_TABLE];\nflat varying int vKourMat;\n#define uMainST kourMatST[int(kourMat)]\n#else\nuniform vec4 uMainST;\n#endif\n#ifdef KOUR_MOTION\n${ye}\n#endif\n#if defined(USE_GLITTER) || defined(USE_GALAXY)\nvarying vec3 vGlitterPos;\n#endif\n#if defined(GLITTER_BOX) || defined(SKIN_FRAME)\nattribute vec3 kourBoxPos;\n#endif\n#ifdef SKIN_SPACE\n// the animated skins placed on the surface (render/skin-fx.ts, FB34): its place - the weapon's\n// frame on a frame geometry (checker-skin.ts frameGeometry), else the mesh's own space - and\n// the wire weights of its triangle\nvarying vec3 vSkinPos;\nvarying vec3 vSkinWire;\n#ifdef SKIN_FRAME\nattribute vec3 kourWire;\n#endif\n#endif\n#ifdef SKIN_WOBBLE\nuniform float uSkinTime;\n// x the amplitude, y the waves per unit of the mesh, z rad/s, w the handle's UV corner\nuniform vec4 uSkinWobble;\n#endif\n#ifdef KOUR_OUTLINE\n\nuniform vec2 uOutlineWidth; // x: width as a share of the image height, y: least width in metres\n\n#endif\nvoid main() {\n  #include <beginnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <begin_vertex>\n  #ifdef SKIN_WOBBLE\n  \n  // Karambit Antique (skin-fx.ts ANTIQUE, antiqueWobble): every blade vertex moves in a wobble\n  // by its own place (corners at one place move alike: no seam opens); the handle's palette\n  // texels stay\n  if (uv.x > uSkinWobble.w || uv.y > uSkinWobble.w) {\n    vec3 wq = position * uSkinWobble.y;\n    float wt = uSkinTime * uSkinWobble.z;\n    transformed += uSkinWobble.x * vec3(\n      sin(wq.y * 1.3 + wq.z * 0.7 + wt),\n      sin(wq.z * 1.7 + wq.x * 0.9 + wt * 1.31 + 1.7),\n      sin(wq.x * 1.1 + wq.y * 1.9 + wt * 0.83 + 3.1));\n  }\n\n  #endif\n  #include <skinning_vertex>\n  #ifdef KOUR_OUTLINE\n  \n  {\n    vec4 kourMv = modelViewMatrix * vec4(transformed, 1.0);\n    float kourW = projectionMatrix[2][3] * kourMv.z + projectionMatrix[3][3];\n    float kourWidth = max(uOutlineWidth.x * 2.0 * kourW / projectionMatrix[1][1], uOutlineWidth.y);\n    vec3 kourDir = normalize(objectNormal) * length(normal);\n    transformed += kourDir * (kourWidth / max(length(modelMatrix[0].xyz), 1e-6));\n  }\n\n  #endif\n  vec4 worldPos = modelMatrix * vec4(transformed, 1.0);\n  vWorldPos = worldPos.xyz;\n  vNormalW = normalize(inverse(transpose(mat3(modelMatrix))) * objectNormal);\n  #ifdef FLIP_NORMAL\n  vNormalW = -vNormalW;\n  #endif\n  vUv = uv * uMainST.xy + uMainST.zw;\n  #ifdef KOUR_MAT_TABLE\n  vKourMat = int(kourMat);\n  #endif\n  #if defined(USE_GLITTER) || defined(USE_GALAXY)\n  // (glitter.ts / galaxy.ts: the mesh's own space, before skinning - the sparkles stick to the\n  // figure; a box-skinned weapon: the frame of its box projection, one space for all its parts)\n  #ifdef GLITTER_BOX\n  vGlitterPos = kourBoxPos;\n  #else\n  vGlitterPos = position;\n  #endif\n  #endif\n  #ifdef USE_VCOLOR\n  vColor = color;\n  #endif\n  #ifdef SKIN_SPACE\n  #ifdef SKIN_FRAME\n  vSkinPos = kourBoxPos;\n  vSkinWire = kourWire;\n  #else\n  vSkinPos = position;\n  vSkinWire = vec3(1.0);\n  #endif\n  #endif\n  vec4 mvPosition = viewMatrix * worldPos;\n  vFogDepth = -mvPosition.z;\n  gl_Position = projectionMatrix * mvPosition;\n  #ifdef KOUR_MOTION\n  ${Se}\n  #endif\n}`;
function Ot(n) {
  const e = n.uniforms?.uCharLight;
  return e && (e.value = 1), n;
}
var Kt = `\n#define CHAR_LIGHT_PEAK ${St.peak.toFixed(4)}\n#define CHAR_LIGHT_LUMA vec3(${St.luma.join(", ")})\nuniform vec3 uLightDir;\nuniform vec3 uLightColor;\nuniform vec3 uSH[9];\nuniform vec3 uFogColor;\nuniform vec4 uFog;\nuniform vec3 uSkyTop;\nuniform vec3 uSkyBottom;\n#ifdef KOUR_MAT_TABLE\n// merged map batches (render/material-merge.ts, FB20PERFDRAW): five vec4 per material - colour;\n// metallic, smoothness, alpha test, glow; emission; grid; add colour - picked by the vertex's\n// material (the same float values the single uniforms hold)\nuniform vec4 kourMatTable[KOUR_MAT_TABLE * 5];\nflat varying int vKourMat;\n#define uColor kourMatTable[vKourMat * 5]\n#define uMetallic kourMatTable[vKourMat * 5 + 1].x\n#define uSmoothness kourMatTable[vKourMat * 5 + 1].y\n#define uAlphaTest kourMatTable[vKourMat * 5 + 1].z\n#define uGlow kourMatTable[vKourMat * 5 + 1].w\n#define uEmission kourMatTable[vKourMat * 5 + 2].xyz\n#define uGrid kourMatTable[vKourMat * 5 + 3]\n#define uAddColor kourMatTable[vKourMat * 5 + 4].xyz\n#else\nuniform vec4 uColor;\nuniform float uMetallic;\nuniform float uSmoothness;\nuniform vec3 uEmission;\nuniform float uAlphaTest;\nuniform vec4 uGrid; // x scale, y falloff, z overlay amount\nuniform vec3 uAddColor;\nuniform float uGlow;\n#endif\n// rebuild (FB24FIX2, characterLight below): 1 on the materials of characters\nuniform float uCharLight;\nuniform sampler2D uMap;\nuniform sampler2D uMask;\nuniform highp sampler2DShadow uShadowMap;\nuniform mat4 uShadowMatrix;\nuniform highp sampler2DShadow uShadowMap1;\nuniform mat4 uShadowMatrix1;\nuniform vec4 uShadow;\nuniform vec4 uShadow1;\nuniform vec4 uShadowRange;\n#ifdef USE_TINT\nuniform vec4 uTint; // rgb colour, a amount\n#endif\n#ifdef USE_GLITTER\n${hn}\n#endif\n#ifdef USE_GALAXY\n#ifndef USE_GLITTER\nvarying vec3 vGlitterPos;\n#endif\n${we}\n#endif\n#ifdef KOUR_OUTLINE\nuniform vec4 uOutline; // rgb colour of the outline (render/skin-outline.ts), a: shimmer strength\n#ifndef USE_GLITTER\nuniform vec4 uGlitter; // (the shared clock of glitter.ts: x seconds)\n#endif\n#endif\nvarying vec3 vWorldPos;\nvarying vec3 vNormalW;\nvarying vec2 vUv;\nvarying float vFogDepth;\n// (after the varyings: the Reality Crate's scan line reads vWorldPos)\n#ifdef SKIN_FX\n${ve}\n#endif\n#ifdef USE_VCOLOR\nvarying vec4 vColor;\n#endif\n#ifdef KOUR_GBUFFER\n${Ze}\n#endif\n#ifdef KOUR_MOTION\n\nuniform vec4 uMotion;\nvarying vec4 vClipNow;\nvarying vec4 vClipPrev;\nvec2 kourMotion() {\n  // behind the last frame's camera (a cut, a huge turn): no usable motion\n  if (vClipPrev.w <= 1e-4 || uMotion.x < 0.5) return vec2(0.0);\n  return (vClipNow.xy / vClipNow.w - vClipPrev.xy / vClipPrev.w) * 0.5;\n}\n\n#endif\n${$t}\n// Light.shadows of the sun (render/shadows.ts): the receiver moves along its normal by two texels\n// times the sine of the angle to the sun (the depth step of the 3x3 texel filter on that slope)\n// and one texel towards the sun, then 2x2 taps of the hardware 2x2 comparison; the shadows fade\n// out with the distance to the camera; Light.shadowStrength keeps part of the direct light.\n// Ultra has a second, coarser cascade beyond the first one's distance (uShadow1.x).\nfloat shadowTaps(highp sampler2DShadow map, vec3 c, float k) {\n  // (lod 0: the maps have no mip levels, and the lookups may sit in a branch)\n  return 0.25 * (\n    textureLod(map, vec3(c.xy + vec2(-k, -k), c.z), 0.0) +\n    textureLod(map, vec3(c.xy + vec2(k, -k), c.z), 0.0) +\n    textureLod(map, vec3(c.xy + vec2(-k, k), c.z), 0.0) +\n    textureLod(map, vec3(c.xy + vec2(k, k), c.z), 0.0));\n}\nfloat sunShadow(vec3 p, vec3 n, vec3 l, float nl) {\n  if (uShadow.x < 0.5) return 1.0;\n  float far = distance(p, cameraPosition);\n  if (far >= uShadowRange.y) return 1.0;\n  bool second = uShadow1.x > 0.0 && far >= uShadow1.x;\n  float t = second ? uShadow1.z : uShadow.z;\n  vec3 q = p + n * (2.0 * t * sqrt(max(1.0 - nl * nl, 0.0))) + l * (t + uShadowRange.z);\n  vec3 c = ((second ? uShadowMatrix1 : uShadowMatrix) * vec4(q, 1.0)).xyz;\n  if (c.x <= 0.0 || c.x >= 1.0 || c.y <= 0.0 || c.y >= 1.0 || c.z >= 1.0) return 1.0;\n  float lit = second\n    ? shadowTaps(uShadowMap1, c, 0.5 / uShadow1.y)\n    : shadowTaps(uShadowMap, c, 0.5 / uShadow.y);\n  lit = mix(lit, 1.0, smoothstep(uShadowRange.x, uShadowRange.y, far));\n  return mix(1.0, lit, uShadow.w);\n}\n\nvec3 shadeSH9(vec3 n) {\n  // Unity basis order: Y00, Y1-1(y), Y10(z), Y11(x), ...\n  vec3 r = uSH[0] * 0.282095\n    + uSH[1] * 0.488603 * n.y + uSH[2] * 0.488603 * n.z + uSH[3] * 0.488603 * n.x\n    + uSH[4] * 1.092548 * n.x * n.y + uSH[5] * 1.092548 * n.y * n.z\n    + uSH[6] * 0.315392 * (3.0 * n.z * n.z - 1.0) + uSH[7] * 1.092548 * n.x * n.z\n    + uSH[8] * 0.546274 * (n.x * n.x - n.y * n.y);\n  return max(r, vec3(0.0));\n}\n\nvec3 linearToGamma(vec3 c) {\n  return max(1.055 * pow(max(c, vec3(0.0)), vec3(0.416666667)) - 0.055, vec3(0.0));\n}\n\nvec3 kourPatternAlbedo(sampler2D map, sampler2D mask, vec2 uv) {\n  vec3 pmask = texture2D(mask, uv).rgb;\n  vec3 pal = mix(texture2D(map, vec2(0.1796875, 0.4)).rgb, texture2D(map, vec2(0.1796875, 0.186)).rgb, pmask.r);\n  pal = mix(pal, texture2D(map, uv).rgb, pmask.b);\n  return mix(pal, texture2D(map, vec2(0.128999993, 0.186)).rgb, pmask.g);\n}\n\nvoid main() {\n  vec4 albedo = uColor;\n  #ifdef USE_GRID\n  // Shader Graphs/Grid: triplanar _Grid in Unity world space (x mirrored back), overlay around 0.4434\n  vec3 up = vec3(-vWorldPos.x, vWorldPos.y, vWorldPos.z) * uGrid.x;\n  vec3 nn = normalize(vec3(-vNormalW.x, vNormalW.y, vNormalW.z));\n  vec3 w = exp2(log2(max(abs(nn), vec3(5.96046448e-08))) * min(uGrid.y, 158.0));\n  w /= dot(w, vec3(1.0));\n  vec3 tri = texture2D(uMap, up.zy).rgb * w.x + texture2D(uMap, up.xz).rgb * w.y + texture2D(uMap, up.xy).rgb * w.z;\n  albedo.rgb = ((tri - 0.443396211) * uGrid.z + uAddColor + 0.443396211) * uColor.rgb;\n  #elif defined(USE_PATTERN)\n  albedo.rgb = kourPatternAlbedo(uMap, uMask, vUv);\n  #elif defined(USE_MAP)\n  #ifdef SKIN_FX\n  // animated weapon skins (render/skin-fx.ts): the glitch's albedo\n  albedo *= uSkinFx.x < 1.5 ? skinGlitchAlbedo(uMap, vUv) : texture2D(uMap, vUv);\n  #else\n  albedo *= texture2D(uMap, vUv);\n  #endif\n  #endif\n  #ifdef USE_VCOLOR\n  albedo *= vColor;\n  #endif\n  #ifdef SKIN_SPACE\n  // the Chroma look (render/skin-fx.ts, FB34): the surface's light and dark in the turning colour\n  if (uSkinFx.x > 4.5 && uSkinFx.x < 5.5) albedo.rgb = skinChromaAlbedo(albedo.rgb);\n  #endif\n  #ifdef USE_TINT\n  // rebuild (tintMaterial below): the surface in one colour, shaded by its own brightness, so\n  // the texture's light and dark parts stay readable\n  albedo.rgb = mix(\n    albedo.rgb,\n    uTint.rgb * (0.3 + dot(albedo.rgb, vec3(0.299, 0.587, 0.114))),\n    uTint.a);\n  #endif\n  if (albedo.a < uAlphaTest) discard;\n  // depth pass of the sun shadow map (cut-out casters): only the depth of what is left counts\n  if (uShadow.x > 1.5) {\n    gl_FragColor = vec4(1.0);\n    return;\n  }\n  #ifdef UNLIT\n  vec3 color = albedo.rgb;\n  #else\n  vec3 v = normalize(cameraPosition - vWorldPos);\n  vec3 n = normalize(vNormalW);\n  #ifdef FACE_VIEWER\n  // double sided map geometry: light the side that faces the camera\n  if (dot(n, v) < 0.0) n = -n;\n  #else\n  if (!gl_FrontFacing) n = -n;\n  #endif\n  #ifdef SKIN_FX\n  if (uSkinFx.x > 1.5 && uSkinFx.x < 2.5) n = skinChromeNormal(n, vUv);\n  #endif\n  float m = clamp(uMetallic, 0.0, 1.0);\n  float s = clamp(uSmoothness, 0.0, 1.0);\n  vec3 specColor = mix(vec3(0.220916301), albedo.rgb, m);\n  float oneMinusRefl = 0.779083729 - m * 0.779083729;\n  vec3 diffColor = albedo.rgb * oneMinusRefl;\n  vec3 l = normalize(uLightDir);\n  vec3 h = normalize(v + l);\n  float nl = clamp(dot(n, l), 0.0, 1.0);\n  float nh = clamp(dot(n, h), 0.0, 1.0);\n  float lh = max(clamp(dot(l, h), 0.0, 1.0), 0.32);\n  float nv = clamp(dot(n, v), 0.0, 1.0);\n  float r = 1.0 - s;\n  float a = r * r;\n  float spec = a / ((nh * nh * (a * a - 1.0) + 1.00001) * lh * (a + 1.5));\n  vec3 direct = (diffColor + spec * specColor) * uLightColor * nl;\n  if (nl > 0.0) direct *= sunShadow(vWorldPos, n, l, nl);\n  // the map's point lights (ForwardAdd of Unity, rebuild: render/point-lights.ts)\n  if (uPointCount > 0) direct += pointLights(vWorldPos, n, v, diffColor, specColor, a);\n  vec3 ambient = linearToGamma(shadeSH9(n));\n  // rebuild (FB24FIX2, characterLight): a character's fully lit side shows its texture's colour\n  // instead of burning out (the lobby's light gave 1.5 x the skin colour, clipped)\n  if (uCharLight > 0.5) {\n    float charAmbient = max(\n      dot(linearToGamma(shadeSH9(l)), CHAR_LIGHT_LUMA),\n      dot(linearToGamma(shadeSH9(vec3(0.0, 1.0, 0.0))), CHAR_LIGHT_LUMA));\n    float charPeak = 0.779083729 * (charAmbient + dot(uLightColor, CHAR_LIGHT_LUMA));\n    float charScale = CHAR_LIGHT_PEAK / max(CHAR_LIGHT_PEAK, charPeak);\n    direct *= charScale;\n    ambient *= charScale;\n  }\n  vec3 color = direct + diffColor * ambient;\n  // Specular reflection: the scenes have no generated skybox reflection\n  // (RenderSettings.m_GeneratedSkyboxReflection = null), so unity_SpecCube0 is black.\n  #ifdef USE_REFLECTION\n  float grazing = min(s + (1.0 - oneMinusRefl), 1.0);\n  float f4 = pow(1.0 - nv, 4.0);\n  vec3 fresnel = specColor + (vec3(grazing) - specColor) * f4;\n  vec3 rd = reflect(-v, n);\n  vec3 env = mix(uSkyBottom, uSkyTop, clamp(rd.y, 0.0, 1.0));\n  color += env * (1.0 - 0.28 * r * a) * fresnel;\n  #endif\n  color += uEmission;\n  #ifdef USE_GLITTER\n  // rebuild (glitter.ts, FB19QUEST): gloss band, rim and sparkles of a glittering skin\n  color += kourGlitter(vGlitterPos, n, v);\n  #endif\n  #ifdef USE_GALAXY\n  // rebuild (galaxy.ts, FB23SKINS): the Celestorm's drifting nebula and stars, its glowing gold\n  color = kourGalaxy(color, albedo.rgb, vGlitterPos, n, v);\n  #endif\n  #ifdef VCOLOR_GLOW\n  // PolygonArsenal/PolyLitSurface: vertex colour * _GlowIntensity on top of the lighting\n  color += vColor.rgb * uGlow;\n  #endif\n  #ifdef SKIN_FX\n  color = skinFxColor(color, albedo.rgb, n, v, nv, vUv);\n  #endif\n  #endif\n  #ifdef KOUR_OUTLINE\n  // rebuild (render/skin-outline.ts, FB30): the hull behind the figure in the outline's colour,\n  // with bright bands drifting over it by position, view angle and time (a shimmer, "eher orange\n  // als gold-schillernd": skin-outline.ts OUTLINE_SHIMMER)\n  {\n    vec3 kourV = normalize(cameraPosition - vWorldPos);\n    float kourPhase = dot(vWorldPos, vec3(2.3, 5.7, 1.9)) + abs(dot(normalize(vNormalW), kourV)) * 5.0 - uGlitter.x * 2.6;\n    float kourShine = pow(0.5 + 0.5 * sin(kourPhase), 3.0) * uOutline.a;\n    color = mix(uOutline.rgb, vec3(1.0, 0.98, 0.88), kourShine);\n  }\n  #endif\n  if (uFog.x > 0.5) {\n    float f;\n    if (uFog.x < 1.5) f = (uFog.z - vFogDepth) / max(uFog.z - uFog.y, 1e-4);\n    else if (uFog.x < 2.5) f = exp2(-uFog.w * vFogDepth * 1.442695);\n    else { float d = uFog.w * vFogDepth; f = exp2(-d * d * 1.442695); }\n    color = mix(uFogColor, color, clamp(f, 0.0, 1.0));\n  }\n  #ifdef KOUR_GBUFFER\n  {\n    // g-buffer of the world pass (render/gbuffer.ts): the shading normal in view space, the\n    // surface's screen motion (render/motion-vectors.ts)\n    #ifdef UNLIT\n    vec3 gn = normalize(vNormalW);\n    if (!gl_FrontFacing) gn = -gn;\n    #else\n    vec3 gn = n;\n    #endif\n    vec2 octn = kourOctEncode(normalize(mat3(viewMatrix) * gn));\n    vec2 motion = vec2(0.0);\n    #ifdef KOUR_MOTION\n    motion = kourMotion();\n    #endif\n    kour_gbuffer = vec4(octn.x + ${3..toFixed(1)}, octn.y, motion);\n  }\n  #endif\n  gl_FragColor = vec4(color, albedo.a);\n}`;
function Bt(n) {
  const e = {};
  n.grid && n.map ? e.USE_GRID = "" : n.patternMask ? e.USE_PATTERN = "" : n.map && (e.USE_MAP = ""), n.unlit && (e.UNLIT = ""), n.vertexColors && (e.USE_VCOLOR = ""), n.vertexColors && n.glow && (e.VCOLOR_GLOW = ""), 2 === n.side && (e.FACE_VIEWER = ""), n.reflection && (e.USE_REFLECTION = "");
  const t = n.mapST ?? [1, 1, 0, 0],
    r = new y({
      name: n.name ?? "",
      defines: e,
      uniforms: {
        ...Et,
        ...be,
        uPrevModel: {
          value: new i()
        },
        uMotionObject: {
          value: 0
        },
        uColor: {
          value: new o(n.color[0], n.color[1], n.color[2], n.color[3] ?? 1)
        },
        uMetallic: {
          value: n.metallic ?? 0
        },
        uSmoothness: {
          value: n.smoothness ?? .5
        },
        uEmission: {
          value: new f().fromArray(n.emission ?? [0, 0, 0])
        },
        uAlphaTest: {
          value: n.alphaTest ?? 0
        },
        uMap: {
          value: n.map ?? null
        },
        uMask: {
          value: n.patternMask ?? null
        },
        uMainST: {
          value: new o(t[0], t[1], t[2], t[3])
        },
        uGrid: {
          value: new o(n.grid?.scale ?? 1, n.grid?.falloff ?? 10, n.grid?.overlay ?? 1, 0)
        },
        uAddColor: {
          value: new f().fromArray(n.grid?.add ?? [0, 0, 0])
        },
        uGlow: {
          value: n.glow ?? 0
        },
        uCharLight: {
          value: 0
        }
      },
      vertexShader: Nt,
      fragmentShader: Kt,
      transparent: !!n.transparent,
      depthWrite: n.depthWrite ?? !0,
      side: n.side ?? 0
    });
  return r.userData.unityPort = !0, r.allowOverride = !(n.transparent || (n.alphaTest ?? 0) > 0 && !n.grid), r;
}
function Dt(n) {
  const e = n.clone();
  for (const t of Object.keys(Et)) e.uniforms[t] = Et[t];
  for (const t of Object.keys(be)) e.uniforms[t] = be[t];
  return e.uniforms.uGlitter && (e.uniforms.uGlitter = (n => n.defines && "GLITTER_BOX" in n.defines ? un : cn)(e)), e.uniforms.uGalaxy && (e.uniforms.uGalaxy = xe), function (n) {
    n.uniforms.uSkinTime && (n.uniforms.uSkinTime = An);
  }(e), e;
}
function qt(n) {
  const e = n;
  e.uniforms?.uColor && !e.uniforms.uTint && (e.uniforms.uTint = {
    value: new o(1, 1, 1, 0)
  }, e.defines.USE_TINT = "", e.needsUpdate = !0);
}
function jt(n, e, t, o) {
  const r = n,
    a = r.uniforms?.uTint?.value;
  a && (a.set(e.r, e.g, e.b, t), r.uniforms.uEmission.value.setRGB(e.r * o, e.g * o, e.b * o));
}
function Vt(n, e) {
  const t = n;
  if (!t.uniforms?.uMap) return;
  t.uniforms.uMap.value = e;
  const o = "USE_MAP" in t.defines || "USE_GRID" in t.defines || "USE_PATTERN" in t.defines;
  e && !o && (t.defines.USE_MAP = "", t.needsUpdate = !0);
}
var Xt = null;
function Yt(n) {
  Xt = n;
}
function Qt(n) {
  Xt?.(n);
}
var Zt = null;
function Jt(n) {
  Zt = n;
}
function no(n, e = !1, t) {
  return Zt ? Zt.stage(n, e, t) : Promise.resolve();
}
function eo(n) {
  Zt?.draw(n);
}
function to(n, e) {
  return Zt && n ? Zt.decode(n, !1, e) : Promise.resolve();
}
var oo = new S();
function ro(n) {
  return n ? Zt ? Zt.stage(new l(oo, n)) : (Xt && Xt(new l(oo, n)), Promise.resolve()) : Promise.resolve();
}
oo.setAttribute("position", new v(new Float32Array(9), 3)), oo.setAttribute("normal", new v(new Float32Array(9), 3)), oo.setAttribute("uv", new v(new Float32Array(6), 2)), oo.setAttribute("color", new v(new Float32Array(12), 4));
var ao = class {
  renderer;
  pinned = new WeakSet();
  proxy = new k();
  constructor(n) {
    this.renderer = n, this.proxy.matrixAutoUpdate = !1;
  }
  pin() {
    const n = this.renderer.info.programs;
    if (n) for (const e of n) this.pinned.has(e) || (this.pinned.add(e), e.usedTimes++);
  }
  compile(n, e, t) {
    const o = _();
    P(!0);
    try {
      let o = t;
      o = this.proxy, o.fog = t.fog, o.environment = t.environment, this.renderer.compile(n, e, o), this.pin();
    } catch (r) {
      console.warn("shader warm-up failed", r);
    }
    P(!1), T("warm", o);
  }
};
export { wn as $, St as A, E as At, dt as B, Pt as C, on as Ct, $t as D, Z as Dt, _t as E, vn as Et, it as F, Ee as G, Se as H, ft as I, Re as J, Ge as K, ut as L, Ze as M, nn as Mt, vt as N, N as Nt, Mt as O, j as Ot, Ye as P, X as Pt, ge as Q, ot as R, Bt as S, Gn as St, Ft as T, cn as Tt, ye as U, be as V, ze as W, Fe as X, Ae as Y, de as Z, Ut as _, In as _t, ro as a, pn as at, Lt as b, Fn as bt, Qt as c, An as ct, Wt as d, bn as dt, mn as et, Ht as f, Ln as ft, It as g, kn as gt, qt as h, Dn as ht, Yt as i, yn as it, Qe as j, tn as jt, Ct as k, A as kt, Et as l, gn as lt, Dt as m, On as mt, eo as n, Cn as nt, no as o, Sn as ot, Ot as p, Hn as pt, We as q, Jt as r, $n as rt, to as s, Mn as st, ao as t, xn as tt, At as u, Wn as ut, Vt as v, Un as vt, zt as w, an as wt, jt as x, En as xt, Rt as y, Kn as yt, ht as z };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-DHGnaUyg.js","readableSha256":"fc4e1072ddcd8d86bf92c7a599adaa8078eedb9c5e5e1d1de632e93f59d7254d"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

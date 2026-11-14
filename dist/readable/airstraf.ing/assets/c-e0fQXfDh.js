import { a, f as n, l as r, n as s, r as t, s as e } from "./c-Caw4SzGP.js";
var c = a => new Map(a.map(item => [item.index, item])),
  o = c(s),
  u = c(n),
  i = c(e),
  f = c(a),
  p = c(t),
  w = a => o.get(a),
  h = a => u.get(a),
  k = a => i.get(a),
  m = a => f.get(a);
function v(a, n) {
  switch (a) {
    case "characterSkin":
      return o.get(n);
    case "weaponSkin":
      return u.get(n);
    case "hat":
      return i.get(n);
    case "emote":
      return f.get(n);
  }
}
var M = r => "characterSkin" === r ? s : "weaponSkin" === r ? n : "hat" === r ? e : a,
  S = (a, n) => M(a).find(item => item.name === n)?.index;
function l(a, n) {
  const r = v(a, n);
  return r ? S(a, r.name) ?? n : n;
}
var b = a => S(a.kind, a.name) !== a.index;
function d(a) {
  const lookupMap = new Map();
  return a.filter(item => {
    let r = lookupMap.get(item.kind);
    return r || lookupMap.set(item.kind, r = function (a) {
      const _lookupMap = new Map();
      for (const r of M(a)) _lookupMap.has(r.name) || _lookupMap.set(r.name, r.index);
      return _lookupMap;
    }(item.kind)), r.get(item.name) === item.index;
  });
}
var j = a => Number.isInteger(a) && (a >= 0 && a < 102 || p.has(a)),
  x = a => p.get(a),
  N = a => new Map(a);
N(r.characterSkin), N(r.weaponSkin), N(r.skinData);
export { k as a, d as c, m as i, j as l, w as n, b as o, x as r, v as s, l as t, h as u };

import { D as e, k as l } from "./c-DTYKuKMs.js";
var n = [{
    level: 5,
    kp: 100
  }, {
    level: 10,
    kp: 250
  }, {
    level: 15,
    kp: 500
  }, {
    level: 20,
    kp: 1e3,
    banner: !0
  }, {
    level: 25,
    kp: 2e3
  }, {
    level: 30,
    kp: 5e3
  }],
  a = n.find(e => e.banner).level,
  r = e => `class${e}`,
  s = e => `classReward${e}`;
function t(l, a, s) {
  return ((e, l) => n.filter(n => n.level > l && n.level <= e))(e(a), s).map(e => ({
    classIndex: l,
    level: e.level,
    kp: e.kp,
    banner: e.banner ? r(l) : null
  }));
}
function p(e) {
  const a = (e => n.find(l => l.level > e) ?? null)(e);
  if (!a) return "All rewards earned";
  const r = [`+${l(a.kp)} KP`];
  return a.banner && r.push("Banner"), `Next: LVL ${a.level}  ${r.join(" + ")}`;
}
export { p as a, t as i, r as n, s as r, a as t };

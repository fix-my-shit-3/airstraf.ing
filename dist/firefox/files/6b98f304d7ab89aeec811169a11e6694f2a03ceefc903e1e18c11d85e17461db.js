import { c as r } from "./c-CwMHWVDn.js";
var t = ["koursurf", "parkour", "kourstrike", "zombies", "sumo"],
  n = n => t.includes(n) ? r[n].duration : 360,
  s = 1e4,
  a = 2.5;
function o(r) {
  return r > 0 ? Math.min(2.5, r / 70) : 0;
}
function u(r) {
  if (!(r >= 0) || r >= 1280) return 0;
  if (r < 80) {
    const t = r / 80;
    return t * t * (3 - 2 * t);
  }
  const t = (r - 80) / 1200;
  return (1 - t) * (1 - t);
}
function e(r) {
  return !(r >= 0) || r >= 1e4 ? 0 : 1 - r / 1e4;
}
function i(r) {
  const t = Number.isFinite(r) ? Math.max(0, Math.min(9999, Math.ceil(100 * r - 1e-6))) : 0;
  return [String(Math.floor(t / 100)).padStart(2, "0"), String(t % 100).padStart(2, "0")];
}
export { o as a, u as c, n as i, s as n, i as o, t as r, e as s, a as t };

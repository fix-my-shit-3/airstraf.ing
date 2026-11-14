import { r as n } from "./c-Br-l5PAG.js";
import { a as t, n as r, r as a, t as o } from "./c-BOVHeOwB.js";
var l = [[1, "base"], [200, "red"], [350, "purple"], [500, "cyan"], [650, "blue"], [800, "magenta"], [1e3, "rainbow"], [n, "max"]],
  u = {
    red: "#FF3B3B",
    purple: "#B24BFF",
    cyan: "#00E5FF",
    blue: "#3D7BFF",
    magenta: "#FF4FD8",
    max: o.color
  },
  e = (n, a) => t(n, r(a)),
  s = (n, t) => a(n, r(t)),
  c = ["#FF3B3B", "#FF9E00", "#FFE600", "#3EE04B", "#2EA8FF", "#B24BFF"];
function i(n) {
  const t = Math.floor(n) || 0;
  let r = "base";
  for (const [a, o] of l) t >= a && (r = o);
  return r;
}
function F(n) {
  const t = i(n);
  return "base" === t || "rainbow" === t ? null : u[t];
}
function f(n, t) {
  const r = i(n),
    a = F(n);
  let o = 0;
  return [...t].map(item => /[0-9]/.test(item) && "base" !== r ? "rainbow" === r ? c[o++ % c.length] : a : null);
}
function $(n, t = String(Math.max(0, Math.floor(n) || 0))) {
  if ("max" === i(n)) return e(t, null);
  const r = f(n, t);
  if (r.every(item => null === item)) return t;
  let a = "",
    o = null;
  return [...t].forEach((item, index) => {
    const l = r[index];
    l !== o && (o && (a += "</color>"), l && (a += `<color=${l}>`), o = l), a += item;
  }), o ? `${a}</color>` : a;
}
function b(n, t, r) {
  const a = i(n);
  if ("base" === a) return [...`${t} ${r}`].map(() => null);
  const o = F(n);
  let l = 0;
  const u = (n, t) => t ? "rainbow" === a ? c[l++ % c.length] : o : null;
  return [...[...t].map(item => u(0, "" !== item.trim())), "rainbow" === a ? null : o, ...[...r].map(item => u(0, /[0-9]/.test(item)))];
}
function m(n, t, r, a, o = n => n) {
  let l = "",
    u = null;
  return n.forEach((item, index) => {
    const s = t[index];
    s !== u && (u && (l += a), s && (l += r(s)), u = s), l += o(item);
  }), u ? l + a : l;
}
function p(n, t = "LVL", r = String(Math.max(0, Math.floor(n) || 0))) {
  return "max" === i(n) ? e(`${t} ${r}`, t) : m([...`${t} ${r}`], b(n, t, r), n => `<color=${n}>`, "</color>");
}
function B(n, t = "LVL", r = String(Math.max(0, Math.floor(n) || 0))) {
  return "max" === i(n) ? s(`${t} ${r}`, t) : m([...`${t} ${r}`], b(n, t, r), n => `<span style="color:${n}">`, "</span>", n => h(n));
}
var h = n => n.replace(/[&<>"']/g, n => `&#${n.charCodeAt(0)};`);
function M(n, t = String(Math.max(0, Math.floor(n) || 0))) {
  if ("max" === i(n)) return s(t, null);
  const r = f(n, t);
  let a = "",
    o = null;
  return [...t].forEach((item, index) => {
    const l = r[index];
    l !== o && (o && (a += "</span>"), l && (a += `<span style="color:${l}">`), o = l), a += h(item);
  }), o ? `${a}</span>` : a;
}
export { $ as i, B as n, p as r, M as t };

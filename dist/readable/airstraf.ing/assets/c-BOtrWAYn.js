import { a as n, c as e, f as t, r, t as o, u } from "./c-DkPZj7-z.js";
import { n as a, t as c } from "./c-CGasCRDy.js";
var s = /^[0-9A-F]{6}$/;
function l(n) {
  const [e,, t, r = "", o = ""] = n.replace(/^"|"$/g, "").split("|");
  if (!c.includes(e)) return null;
  const u = r.toUpperCase(),
    l = o.toUpperCase();
  return s.test(u) ? {
    effect: e,
    speed: Number.isFinite(Number(t)) && Number(t) > 0 ? Number(t) : .5,
    color: u,
    second: "clanread" === e ? a : s.test(l) ? l : "FFFFFF"
  } : null;
}
var i = (() => {
    const n = [];
    for (let e = 0; e <= 8; e++) {
      const t = e / 8 * Math.PI * 2,
        r = (.075 * Math.cos(t)).toFixed(3),
        o = (.075 * Math.sin(t)).toFixed(3);
      n.push(`${(e / 8 * 100).toFixed(1)}%{text-shadow:${r}em ${o}em 0 var(--kour-clan-shadow)}`);
    }
    return `@keyframes kour-clan-shadow{${n.join("")}}`;
  })(),
  f = !1;
var d = /^[0-9A-F]{6}([0-9A-F]{2})?$/;
function m(n, e, r) {
  const o = function (n) {
    const e = t(n);
    return e ? `<namestyle=${e}>` : null;
  }(e);
  return o ? `${o}${n}</namestyle>` : r ? `<color=${r}>${n}</color>` : n;
}
function $(n) {
  const t = e(n);
  if (t) return t;
  const o = function (n) {
    const e = l(n);
    if (!e) return null;
    const t = "clanread" === e.effect;
    return {
      id: 0,
      key: "",
      label: "",
      effect: t ? "glow" : "solid",
      colors: [e.color],
      angle: 90,
      speed: 1,
      glow: t ? e.second : null,
      data: {}
    };
  }(n);
  if (o) return o;
  const [u, a, c, s = "", i = ""] = n.replace(/^"|"$/g, "").split("|");
  return r.includes(u) ? {
    id: 0,
    key: "",
    label: "",
    effect: u,
    colors: s.split(".").map(n => n.toUpperCase()).filter(n => d.test(n)),
    angle: Number.isFinite(Number(a)) ? Number(a) : 90,
    speed: Number.isFinite(Number(c)) ? Number(c) : 1,
    glow: d.test(i.toUpperCase()) ? i.toUpperCase() : null,
    data: {}
  } : null;
}
var b = !1,
  g = "--u-name-shadow";
function w(e, t = "single", r = 0) {
  const a = function (n) {
    const e = l(n);
    if (!e) return "";
    if ("clanread" === e.effect) return [`color:#${e.color}`, `text-shadow:0 0 0.06em #${e.second},0 0 0.14em #${e.second}d9,0 0 0.32em #${e.second}73`].join(";");
    !function () {
      if (f || "undefined" == typeof document) return;
      f = !0;
      const element = document.createElement("style");
      element.textContent = i, document.head.append(element);
    }();
    const t = (1 / e.speed).toFixed(2);
    return [`color:#${e.color}`, `--kour-clan-shadow:#${e.second}`, `text-shadow:0.075em 0 0 #${e.second}`, `animation:kour-clan-shadow ${t}s linear infinite`].join(";");
  }(e);
  if (a) return a.replace(/"/g, "'");
  const c = e.replace(/^"|"$/g, "") === o,
    s = c ? null : $(e);
  if (!(s || c && "group" === t)) return "";
  const d = u(s);
  return d.animation && function () {
    if (b || "undefined" == typeof document) return;
    b = !0;
    const element = document.createElement("style");
    element.textContent = n, document.head.append(element);
  }(), "inner" === t ? d.backgroundClip && (d.textShadow = "none", d.webkitTextStroke = "0") : (d.backgroundClip || "group" === t) && (d.textShadow = "none", d.webkitTextStroke = "0", d.filter = `var(${g},)${d.filter ? ` ${d.filter}` : ""}`), d.animation && "inner" === t && r > 0 && (d.animationDelay = `${(.09 * r).toFixed(2)}s`), Object.entries(d).map(([n, e]) => `${(n => (n.startsWith("webkit") ? "-" : "") + n.replace(/[A-Z]/g, n => `-${n.toLowerCase()}`))(n)}:${e}`).join(";").replace(/"/g, "'");
}
export { m as i, w as n, $ as r, g as t };

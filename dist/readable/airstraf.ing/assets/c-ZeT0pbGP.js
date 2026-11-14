import { a as e, b as t, v as n, x as r, y as s } from "./c-CN8Wxji6.js";
import { i as a, n as o } from "./c-qDanEe2E.js";
import { r as i } from "./c-Cc7HakJX.js";
import { i as l } from "./c-BOVHeOwB.js";
import { n as c } from "./c-BOtrWAYn.js";
var p = "/assets/badges",
  u = ["verified", "verified-yellow", "verified-green", "verified-purple", "verified-white", "clan-leader", "yrify", "artist", "nuke", "nuke-red", "verified-red", "chicken", "chicken-gold", "founder-playtest", "tournament-winner"],
  f = {
    100: `${p}/spectating.svg`,
    101: "/assets/extracted/ui/sprites/142bb070a2629669.png"
  },
  d = e => e >= 0 && e < u.length ? `${p}/${u[e]}.png` : f[e] ?? null,
  $ = e => `${Number(e.toFixed(4))}em`,
  g = 'object-fit:contain;visibility:hidden">',
  m = .38;
function h(e, t, n = !1, r = "text") {
  const s = d(e);
  if (!s) return null;
  const a = t / 16.7,
    o = 17.7 * a,
    i = -.83 * a,
    l = "tag" === r ? .02 : i - ("stacked" === r ? 6.6994 * a : 0),
    c = "tag" === r ? -.07 : 17.63 * a - i - o,
    p = 14 * a - t;
  return `<img class="tmp-sprite" src="${s}" alt="" draggable="false" style="display:inline-block;width:${$(o)};height:${$(t)};vertical-align:${$(p)};margin:0 ${$(c)} 0 ${$(l)};${n ? g : 'object-fit:contain">'}`;
}
var b = (e, t = 1) => `rgba(${Math.round(255 * e[0])},${Math.round(255 * e[1])},${Math.round(255 * e[2])},${+(e[3] * t).toFixed(4)})`,
  y = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    white: "#FFFFFF",
    black: "#000000",
    yellow: "#FFFF00",
    orange: "#FF8000",
    purple: "#A020F0",
    lightblue: "#ADD8E6",
    grey: "#808080"
  },
  v = e => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function w(e) {
  if (e = e.replace(/^"|"$/g, "").trim(), y[e.toLowerCase()]) return y[e.toLowerCase()];
  if (/^#[0-9a-f]{8}$/i.test(e)) {
    const t = parseInt(e.slice(7, 9), 16) / 255;
    return `rgba(${parseInt(e.slice(1, 3), 16)},${parseInt(e.slice(3, 5), 16)},${parseInt(e.slice(5, 7), 16)},${t.toFixed(3)})`;
  }
  return /^#[0-9a-f]{3,6}$/i.test(e) ? e : null;
}
function k(e, t) {
  return (e = e.replace(/^"|"$/g, "")).endsWith("%") ? t * parseFloat(e) / 100 : e.endsWith("em") ? t * parseFloat(e) : e.startsWith("+") || e.startsWith("-") ? t + parseFloat(e) : parseFloat(e);
}
var x = new Set(["color", "alpha", "b", "i", "u", "s", "size", "uppercase", "allcaps", "lowercase", "smallcaps", "sup", "sub", "mark", "cspace", "voffset", "nobr"]);
function F(e, t, n, r) {
  const s = r?.paragraph ? `<br><span class="u-para" style="margin-top:${r.paragraph.toFixed(3)}px"></span>` : "<br>";
  if (!t) return v(e).replace(/\n/g, s);
  let a = "";
  const o = [],
    i = [],
    p = [];
  let u = !1,
    f = -1,
    d = 0;
  const $ = /<(\/?)([a-zA-Z#][^<>]*)>/g;
  let m,
    b = 0;
  const y = [],
    F = (e, t, n = !1) => {
      o.push(e), p.push(t), a += t, y.push(n ? a.length : -1);
    };
  let N = "";
  const S = e => {
      if (!N || !e || !o.includes("mspace")) return v(e);
      let t = "";
      for (const n of e) t += "\n" === n ? n : `<span style="display:inline-block;width:${N};text-align:center">${v(n)}</span>`;
      return t;
    },
    j = () => {
      o.pop();
      const e = p.pop(),
        t = y.pop() === a.length;
      e && (a = t ? a.slice(0, -e.length) : a + "</span>");
      const n = i[i.length - 1];
      n?.depth === o.length && (i.pop(), n.cuts.length && (a = a.slice(0, n.start) + function (e, t) {
        const n = e.slice(0, e.indexOf(">") + 1),
          r = /style="([^"]*)"/.exec(n)?.[1] ?? "",
          s = t.start,
          a = 2 * t.cuts.length + 1,
          o = (e, t) => `<span style="grid-row:1;grid-column:${e}">${t}</span>`;
        let i = "",
          l = n.length,
          c = "";
        t.cuts.forEach((t, n) => {
          const r = t.at - s;
          i += o(2 * n + 1, c + e.slice(l, r) + t.close), i += o(2 * n + 2, e.slice(r, r + t.length)), l = r + t.length, c = t.reopen;
        }), i += o(a, c + e.slice(l, -7));
        let p = "";
        return t.cuts.forEach((e, t) => p += o(2 * t + 2, e.visible)), `<span style="display:inline-grid;align-items:baseline;white-space:pre;vertical-align:baseline"><span style="${r};display:grid;grid-template-columns:subgrid;grid-row:1;grid-column:1 / span ${a};align-items:baseline">${i}</span>${p}</span>`;
      }(a.slice(n.start), n)));
    },
    A = e => {
      const t = o.lastIndexOf(e);
      if (t < 0) return;
      const n = o.slice(t + 1).map((e, n) => [e, p[t + 1 + n]]),
        r = n.every(([e]) => x.has(e));
      for (; o.length > t;) j();
      if (r) for (const [s, a] of n) F(s, a, !0);
    };
  for (; m = $.exec(e);) {
    a += S(e.slice(b, m.index)), b = $.lastIndex;
    const t = "/" === m[1],
      s = m[2],
      [y, ...j] = s.split(/[= ]/),
      z = y.toLowerCase(),
      O = s.includes("=") ? s.slice(s.indexOf("=") + 1).trim() : j.join(" ");
    if (u) t && "noparse" === z ? u = !1 : a += v(m[0]);else if ("noparse" !== z) {
      if (t) A(z.startsWith("#") ? "color" : z);else {
        if (z.startsWith("#")) {
          const e = w(z);
          e && F("color", `<span style="color:${e}">`);
          continue;
        }
        switch (z) {
          case "color":
            {
              const e = w(O);
              e && F("color", `<span style="color:${e}">`);
              break;
            }
          case "alpha":
            {
              const e = parseInt(O.replace("#", ""), 16) / 255,
                t = o.lastIndexOf("alpha");
              t >= 0 && o.slice(t + 1).every(e => x.has(e)) && A("alpha"), F("alpha", `<span style="opacity:${e.toFixed(3)}">`);
              break;
            }
          case "b":
            F("b", '<span class="u-bold">');
            break;
          case "i":
            F("i", '<span style="font-style:italic">');
            break;
          case "u":
            F("u", '<span style="text-decoration:underline">');
            break;
          case "s":
            F("s", '<span style="text-decoration:line-through">');
            break;
          case "size":
            {
              const e = k(O, n),
                t = r ? `;--lh:${(r.glyphEm * e + r.leading).toFixed(3)}px` : "";
              Number.isFinite(e) && F("size", `<span style="font-size:${e}px${t}">`);
              break;
            }
          case "uppercase":
          case "allcaps":
            F(z, '<span style="text-transform:uppercase">');
            break;
          case "lowercase":
            F(z, '<span style="text-transform:lowercase">');
            break;
          case "smallcaps":
            F(z, '<span style="font-variant:small-caps">');
            break;
          case "sup":
            F(z, '<span style="vertical-align:super;font-size:0.6em">');
            break;
          case "sub":
            F(z, '<span style="vertical-align:sub;font-size:0.6em">');
            break;
          case "mark":
            F("mark", `<span style="background:${w(O) ?? "rgba(255,255,0,0.4)"}">`);
            break;
          case "cspace":
            F("cspace", `<span style="letter-spacing:${parseFloat(O) / 100}em">`);
            break;
          case "mspace":
            {
              const e = parseFloat(O);
              if (!(e > 0)) break;
              N = `${e}${O.trim().endsWith("em") ? "em" : "px"}`, F("mspace", "<span>");
              break;
            }
          case "voffset":
            F("voffset", `<span style="position:relative;top:${-parseFloat(O)}px">`);
            break;
          case "nobr":
            F("nobr", '<span style="white-space:nowrap">');
            break;
          case "br":
            a += "<br>";
            break;
          case "namestyle":
            {
              const t = o.includes("namestyle"),
                n = t ? "inner" : M(e, $.lastIndex) ? "group" : "single";
              d = t ? d + 1 : 0;
              const r = c(O, n, t ? d - 1 : 0);
              if (!r) {
                F("namestyle", "");
                break;
              }
              r.includes("filter:") && i.push({
                depth: o.length,
                start: a.length,
                cuts: []
              }), F("namestyle", `<span style="${r}">`);
              break;
            }
          case "maxlvl":
            {
              const [e, t] = l(O);
              F("maxlvl", e), F("maxlvl-a", t);
              break;
            }
          case "sprite":
            {
              const t = i[i.length - 1],
                n = m.index === f ? "stacked" : "]" === e[$.lastIndex] ? "tag" : "text",
                s = /^\d+$/.test(O) ? h(Number(O), r?.ascentEm ?? 1.05, !!t, n) : null;
              s && (f = $.lastIndex), s && t && t.cuts.push({
                at: a.length,
                length: s.length,
                visible: s.replace(g, 'object-fit:contain;visibility:visible">'),
                reopen: p.slice(t.depth + 1).join(""),
                close: "</span>".repeat(p.slice(t.depth + 1).filter(Boolean).length)
              }), a += s ?? v(m[0]);
              break;
            }
          case "link":
            {
              const e = v(O.replace(/^"|"$/g, "")).replace(/"/g, "&quot;");
              /^(nick|lit):/.test(e) ? F("link", "") : F("link", `<span class="u-link" data-link="${e}">`);
              break;
            }
        }
      }
    } else u = !t;
  }
  for (a += S(e.slice(b)); o.length;) j();
  return a.replace(/\n/g, s);
}
function M(e, t) {
  const n = e.indexOf("<namestyle=", t);
  if (n < 0) return !1;
  const r = e.indexOf("</namestyle>", t);
  return r < 0 || n < r;
}
function N(e) {
  return e && e > 0 ? `padding-left:${U(e)};text-indent:${U(-e)};` : "";
}
var S = {
    [t.Left]: "left",
    [t.Center]: "center",
    [t.Right]: "right",
    [t.Justified]: "justify",
    [t.Flush]: "justify",
    [t.Geometry]: "center"
  },
  j = {
    [r.Top]: "flex-start",
    [r.Middle]: "center",
    [r.Bottom]: "flex-end",
    [r.Baseline]: "center",
    [r.Geometry]: "center",
    [r.Capline]: "center"
  };
function A(e, t, n, r, s) {
  if (!e) return 0;
  const a = e.floats,
    o = ((r ? a._WeightBold ?? .75 : a._WeightNormal ?? 0) / 4 + (a._FaceDilate ?? 0)) * (a._ScaleRatioA ?? 1) * .5 * ((a._GradientScale ?? 6) * (n / (t?.pointSize ?? 29)));
  return o >= .25 * s ? o : 0;
}
var z = null;
function O() {
  if (null === z) {
    const e = (e, t) => "undefined" != typeof CSS && "function" == typeof CSS.supports && CSS.supports(e, t);
    z = e("paint-order", "stroke fill") && e("-webkit-text-stroke", "1px #000") && e("stroke-linejoin", "round");
  }
  return z;
}
function E(e, t, n, r, s, a = !1) {
  if (!e) return null;
  const o = e.floats,
    i = e.keywords.includes("OUTLINE_ON") ? o._OutlineWidth ?? 0 : 0;
  if (!(i > 0 && e.colors._OutlineColor)) return null;
  const l = (o._GradientScale ?? 6) * (n / (t?.pointSize ?? 29)),
    c = ((a ? (o._WeightBold ?? .75) / 4 : 0) + (o._FaceDilate ?? 0) + i) * (o._ScaleRatioA ?? 1) * .5,
    p = Math.max(.5, e.outlineMinPx ?? 0) * s;
  return {
    width: Math.max(p, c * l),
    color: b(e.colors._OutlineColor, r)
  };
}
function I(e, t, n, r) {
  if (!e || !e.keywords.includes("UNDERLAY_ON") || !e.colors._UnderlayColor) return [];
  const s = e.floats,
    a = (s._GradientScale ?? 6) * (n / (t?.pointSize ?? 29)),
    o = (s._ScaleRatioC ?? 1) * a,
    i = (s._UnderlayOffsetX ?? 0) * o,
    l = -(s._UnderlayOffsetY ?? 0) * o,
    c = (s._UnderlaySoftness ?? 0) * o;
  return [`${U(i)} ${U(l)} ${U(c)} ${b(e.colors._UnderlayColor, r)}`];
}
function C(e, t, n, r, s, a = !1, o) {
  const i = [],
    l = E(e, t, n, r, s, a),
    c = (e, t) => {
      const n = e > 3 * s ? 22.5 : 45;
      for (let r = 0; r < 360; r += n) {
        const n = r * Math.PI / 180;
        i.push(`${U(Math.cos(n) * e)} ${U(Math.sin(n) * e)} 0 ${t}`);
      }
    };
  if (l) c(l.width, l.color);else if (o) {
    const r = A(e, t, n, a, s);
    r && c(r, o);
  }
  return i.push(...I(e, t, n, r)), i;
}
var D = /<(?:#[0-9a-f]|color[= ]|alpha[= ]|mark[= >]|namestyle[= ]|maxlvl[= ]|sprite[= ])/i;
function _(e) {
  return e.rich && !!e.text && D.test(e.text);
}
function L(e) {
  return !!e && e.keywords.includes("OUTLINE_ON") && (e.floats._OutlineWidth ?? 0) > 0;
}
var U = e => `${Number(e.toPrecision(4))}px`;
function B(e, t, a, o, i = e.size, l = e.color[3], c = 1) {
  const p = t?.pointSize ?? 29,
    u = (t?.lineHeight ?? 43.5) / p + e.lineSpacing / 100,
    f = ((t?.ascent ?? 30.45) - (t?.descent ?? -10.15)) / p,
    d = (u - f) / 2,
    $ = 0 !== (e.style & s.Bold),
    g = e.style & s.UpperCase ? "uppercase" : e.style & s.LowerCase ? "lowercase" : "none",
    m = e.charSpacing + ($ ? t?.boldSpacing ?? 7 : 0),
    h = e.v === r.Top ? -d : e.v === r.Bottom ? d : 0,
    y = l < 1 && (_(e) || l > 0 && (L(a) || function (e) {
      return !!e && e.keywords.includes("UNDERLAY_ON") && !!e.colors._UnderlayColor && e.colors._UnderlayColor[3] > 0;
    }(a)));
  return {
    family: o,
    size: i,
    weight: $ ? 700 : $ ? 800 : 700,
    italic: 0 !== (e.style & s.Italic),
    transform: e.style & s.SmallCaps ? "none" : g,
    letterSpacing: m / 100 + "em",
    wordSpacing: e.wordSpacing / 100 + "em",
    lineHeight: String(u),
    lines: {
      glyphEm: f,
      leading: (u - f) * i,
      ascentEm: (t?.ascent ?? 30.45) / p,
      paragraph: (e.paragraphSpacing ?? 0) / 100 * i
    },
    whiteSpace: e.wrap === n.NoWrap || e.wrap === n.PreserveWhitespaceNoWrap ? "pre" : "pre-wrap",
    shift: h,
    color: b(y ? [e.color[0], e.color[1], e.color[2], 1] : e.color),
    shadows: l <= 0 ? [] : O() ? I(a, t, i, y ? 1 : l) : C(a, t, i, y ? 1 : l, c, $, _(e) ? void 0 : b(y ? [e.color[0], e.color[1], e.color[2], 1] : e.color)),
    stroke: l > 0 && O() ? E(a, t, i, y ? 1 : l, c, $) ?? G(A(a, t, i, $, c)) : void 0,
    opacity: y ? l : void 0,
    bold: l > 0 && O() && !L(a) && A(a, t, i, !0, c) || void 0,
    textAlign: S[e.h] ?? "left",
    justify: j[e.v] ?? "flex-start",
    hang: e.hangingIndent ? e.hangingIndent * i : void 0
  };
}
var G = e => e > 0 ? {
    width: e,
    color: "currentColor",
    face: !0
  } : void 0,
  H = ["left", "center", "right"],
  R = ["flex-start", "center", "flex-end"];
function q(t, n, r = t.size) {
  const s = t.align;
  return {
    family: n,
    size: r,
    weight: t.style === e.Bold || t.style === e.BoldAndItalic ? 700 : 400,
    italic: t.style === e.Italic || t.style === e.BoldAndItalic,
    transform: "none",
    letterSpacing: "normal",
    wordSpacing: "normal",
    lineHeight: String(1.15 * t.lineSpacing),
    whiteSpace: 1 === t.hOverflow ? "pre" : "pre-wrap",
    shift: 0,
    color: b(t.color),
    shadows: [],
    textAlign: H[s % 3],
    justify: R[Math.floor(s / 3)]
  };
}
var T = /^(-?[\d.e+-]+)px (-?[\d.e+-]+)px (-?[\d.e+-]+)(?:px)? (.+)$/,
  Y = new Map(),
  Z = null;
function K(e, t) {
  const n = t?.face ? void 0 : t;
  if (!e.length && !n) return "";
  const r = `${e.join(",")}|${Q(n)}`,
    s = Y.get(r);
  if (void 0 !== s) return s;
  const a = e.map(e => T.exec(e)).filter(e => !!e);
  let o = "";
  if (1 !== a.length || n) {
    if ((a.length || n) && "undefined" != typeof document) {
      if (!Z) {
        const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        e.setAttribute("aria-hidden", "true"), e.style.cssText = "position:absolute;width:0;height:0;overflow:hidden", Z = document.createElementNS("http://www.w3.org/2000/svg", "defs"), e.append(Z), document.body.append(e);
      }
      const e = `u-shadow-${Y.size}-${Z.childElementCount}`,
        t = a.map(([, e, t, n, r], s) => {
          const a = Number(n) / 2;
          return (a > 0 ? `<feGaussianBlur in="SourceAlpha" stdDeviation="${a}"/>` : "") + `<feOffset ${a > 0 ? "" : 'in="SourceAlpha" '}dx="${e}" dy="${t}" result="o${s}"/><feFlood flood-color="${r}"/><feComposite operator="in" in2="o${s}" result="s${s}"/>`;
        }).join(""),
        r = n ? `<feMorphology in="SourceAlpha" operator="dilate" radius="${Number(n.width.toPrecision(4))}" result="m"/><feFlood flood-color="${n.color}"/><feComposite operator="in" in2="m" result="rim"/>` : "",
        s = a.map((e, t) => `<feMergeNode in="s${a.length - 1 - t}"/>`).join("") + (n ? '<feMergeNode in="rim"/>' : "");
      Z.insertAdjacentHTML("beforeend", `<filter id="${e}" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">${t}${r}<feMerge>${s}<feMergeNode in="SourceGraphic"/></feMerge></filter>`), o = `url(#${e})`;
    }
  } else {
    const [, e, t, n, r] = a[0];
    o = `drop-shadow(${e}px ${t}px ${Number(n) / 2}px ${r})`;
  }
  return Y.size > 500 && Y.clear(), Y.set(r, o), o;
}
function P(e, t) {
  const n = e.style;
  n.fontFamily = t.family, n.fontSize = `${t.size}px`, n.fontWeight = String(t.weight), n.fontStyle = t.italic ? "italic" : "normal", n.textTransform = t.transform, n.letterSpacing = t.letterSpacing, n.wordSpacing = t.wordSpacing, n.lineHeight = t.lineHeight, n.setProperty("--lem", t.lineHeight), n.whiteSpace = t.whiteSpace, n.color = t.color, n.textShadow = t.shadows.join(","), n.webkitTextStroke = Q(t.stroke), J(n, t), n.opacity = V(t), n.textAlign = t.textAlign, n.setProperty("--u-ax", "right" === t.textAlign ? "1" : "center" === t.textAlign ? "0.5" : "0");
}
function J(e, t) {
  t.bold ? (e.setProperty("--u-bold-weight", "700"), e.setProperty("--u-bold-stroke", U(2 * t.bold))) : (e.removeProperty("--u-bold-weight"), e.removeProperty("--u-bold-stroke"));
}
function Q(e) {
  return e ? `${U(2 * e.width)} ${e.color}` : "";
}
function V(e) {
  return void 0 !== e.opacity && e.opacity < 1 ? String(Number(e.opacity.toFixed(4))) : "";
}
var W = new Set(["br", "img", "wbr", "hr"]);
function X(e, t) {
  let n = "";
  for (let r = t + 1; r < e.length; r++) {
    const t = e[r];
    if (n) t === n && (n = "");else if ('"' === t || "'" === t) n = t;else if (">" === t) return r;
  }
  return e.length - 1;
}
function ee(e, t, n) {
  let r = 0;
  const s = [];
  let a = 0;
  for (; a < e.length;) {
    const o = e.indexOf("<", a),
      i = o < 0 ? e.length : o;
    if (i > a && n(e.slice(a, i), 0 === r), o < 0) break;
    const l = X(e, o),
      c = e.slice(o, l + 1);
    if (t(c), "/" === e[o + 1]) !1 === s.pop() && r--;else if (!c.endsWith("/>")) {
      const e = /^<([a-zA-Z][\w-]*)/.exec(c),
        t = e ? e[1].toLowerCase() : "";
      if (t && !W.has(t)) {
        const e = "span" === t;
        s.push(e), e || r++;
      }
    }
    a = l + 1;
  }
}
var te = new Map();
function ne(e) {
  let t = te.get(e);
  if (void 0 !== t) return t;
  let n = "";
  return ee(e, e => n += e, (e, t) => n += t ? `<span class="u-t">${e}</span>` : e), t = n, te.set(e, t), te.size > 5e3 && te.clear(), t;
}
function re(e) {
  let t = "";
  const n = [];
  return ee(e, e => t += e, e => {
    t += "\0", n.push(function (e) {
      return e.includes("&") && (e = e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")), e.includes("\r") ? e.replace(/\r\n?/g, "\n") : e;
    }(e));
  }), {
    skeleton: t,
    runs: n
  };
}
var se = null,
  ae = new Map(),
  oe = /^(<\/span>|<span style="(color|opacity):[^";<>]*">)$/;
function ie(e, t, n, r = !1) {
  const s = `${e}|${t.family}|${t.size}|${t.weight}|${t.italic}|${t.transform}|${t.letterSpacing}|${t.wordSpacing}|${t.lineHeight}|${t.whiteSpace}|${Number.isFinite(n) ? n.toFixed(2) : "inf"}|${t.hang ?? 0}`,
    i = ae.get(s);
  if (i) return i;
  if (!r) {
    const r = function (e, t) {
      if ("'Poppins', sans-serif" !== t.family || !/[1-9]/.test(e)) return null;
      let n = !0,
        r = "",
        s = "";
      return ee(e, e => {
        oe.test(e) || (n = !1), r += e;
      }, e => {
        r += e.replace(/[0-9]/g, e => (s += e, "0"));
      }), n && /[1-9]/.test(s) ? {
        shape: r,
        digits: s
      } : null;
    }(e, t);
    if (r) {
      const e = function (e, t, n, r) {
        if (!Number.isFinite(r) || "pre" === n.whiteSpace) return null;
        const s = ie(e, n, 1 / 0),
          a = ie(e, n, r);
        if (Math.abs(a.h - s.h) > .01) return null;
        const o = ie("0", n, 1 / 0, !0).w;
        let i = 0;
        for (let c = 0; c < t.length; c++) {
          const e = t[c];
          "0" !== e && (i += ie(e, n, 1 / 0, !0).w - o);
        }
        const l = s.w - .05;
        return Math.max(l, l + i) > r - .5 ? null : a;
      }(r.shape, r.digits, t, n);
      if (e) return a.shapedMeasures++, ae.set(s, e), e;
    }
  }
  const l = performance.now();
  if (a.measures++, o.on && o.measured.push(`${t.size}|${Number.isFinite(n) ? n.toFixed(2) : "inf"}|${e}`), !se) {
    const element = document.createElement("div");
    element.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;contain:strict;visibility:hidden;pointer-events:none", element.setAttribute("data-literal", ""), (se = document.createElement("div")).style.cssText = "position:absolute;left:0;top:0;contain:layout", element.append(se), document.body.append(element);
  }
  P(se, t), se.style.textShadow = "";
  const c = t.size < 4 ? 100 : 1;
  se.style.zoom = String(c);
  const p = Number.isFinite(n) && "pre" !== t.whiteSpace;
  se.style.width = p ? `${Math.max(0, n)}px` : "max-content", se.style.whiteSpace = p ? t.whiteSpace : "pre";
  const u = p ? N(t.hang) : "";
  se.innerHTML = `<span class="u-line"${u ? ` style="${u}"` : ""}>${ne(e)}</span>`;
  const bounds = se.getBoundingClientRect();
  let d = p ? bounds.width : bounds.width + .05;
  if (p && /<span style="white-space:nowrap">/.test(e)) {
    const e = document.createRange();
    e.selectNodeContents(se.firstElementChild ?? se);
    const _bounds = e.getBoundingClientRect();
    d = Math.max(d, _bounds.right - bounds.left);
  }
  const $ = {
    w: d / c,
    h: bounds.height / c
  };
  return ae.set(s, $), ae.size > 2e4 && ae.clear(), a.measureMs += performance.now() - l, $;
}
function le(e, t) {
  const n = e.map((e, n) => e * (t[n] ?? 1));
  return `rgba(${n.slice(0, 3).map(e => Math.round(255 * Math.min(1, Math.max(0, e)))).join(",")},${Math.min(1, Math.max(0, n[3]))})`;
}
function ce(e, t) {
  return `<span class="u-gradient">${e}<span class="u-gradient-top" aria-hidden="true" style="color:${t}">${e}</span></span>`;
}
export { B as _, q as a, ie as c, F as d, K as f, re as g, V as h, ce as i, le as l, Q as m, J as n, ne as o, k as p, w as r, N as s, P as t, b as u, m as v, d as y };

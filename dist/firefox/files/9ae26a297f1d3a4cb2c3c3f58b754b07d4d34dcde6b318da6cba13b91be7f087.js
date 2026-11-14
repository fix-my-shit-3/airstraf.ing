import { f as n } from "./c-DkPZj7-z.js";
var a = ["glow", "shadow", "rainbow"],
  r = [{
    style: "glow",
    score: 5e7,
    label: "Glow",
    description: "The clan tag glows"
  }, {
    style: "shadow",
    score: 15e7,
    label: "Animated Shadow",
    description: "A shadow circles the clan tag"
  }, {
    style: "rainbow",
    score: 1e9,
    label: "Rainbow",
    description: "The clan tag in moving rainbow colours"
  }];
function t(n, a, t) {
  const o = Math.max(Number(n) || 0, Number(a) || 0);
  return r.map(item => ({
    ...item,
    unlocked: o >= item.score,
    progress: Math.max(0, Math.min(1, o / item.score)),
    active: t === item.style
  }));
}
var o = /^[0-9A-Fa-f]{6}/;
function e(n) {
  const a = String(n ?? "").replace(/^#/, "");
  return o.test(a) ? a.slice(0, 6).toUpperCase() : "FFFFFF";
}
var s = n => function (n) {
  const a = a => {
    const r = parseInt(n.slice(a, a + 2), 16) / 255;
    return r <= .04045 ? r / 12.92 : ((r + .055) / 1.055) ** 2.4;
  };
  return .2126 * a(0) + .7152 * a(2) + .0722 * a(4);
}(e(n)) < .07;
function c(n, a, r) {
  let t = "";
  for (let o = 0; o < 6; o += 2) {
    const e = parseInt(n.slice(o, o + 2), 16),
      s = parseInt(a.slice(o, o + 2), 16);
    t += Math.round(e + (s - e) * r).toString(16).padStart(2, "0");
  }
  return t.toUpperCase();
}
var l = ["clanshadow", "clanread"],
  i = "C0C0C0",
  u = n => `clanread|0|1|${e(n)}|${i}`;
function w(n, a) {
  const r = e(a),
    t = s(r);
  switch (n) {
    case "glow":
      return `glow|90|1|${r}|${t ? c(r, "FFFFFF", .65) : r}`;
    case "shadow":
      return `clanshadow|0|0.5|${r}|${t ? c(r, "FFFFFF", .7) : c(r, "000000", .6)}`;
    case "rainbow":
      return "rainbow|90|0.35|";
  }
}
function F(r, t) {
  const o = function (n) {
    const r = n?.key ?? "";
    if (!r.startsWith("clan-fx-")) return null;
    const t = r.slice(8);
    return o = t, a.includes(o) ? t : null;
    var o;
  }(r);
  return o ? w(o, t) : n(r);
}
export { F as a, t as i, i as n, s as o, w as r, u as s, l as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-CGasCRDy.js","readableSha256":"9153dd8a17d85f9649925952018de0a7be593fd268043b3478b36e07aedd0a05"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

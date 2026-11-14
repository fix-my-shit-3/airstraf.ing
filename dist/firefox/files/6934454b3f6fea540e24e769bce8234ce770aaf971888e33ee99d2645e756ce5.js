var t = {
    color: "#EAD9FF",
    glow: "#B266FF",
    deep: "#6A1FD0",
    roll: "#FFFFFF",
    cycle: 7
  },
  n = {
    change: 1.15,
    roll: .5,
    rate: 20,
    glyphs: "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ#$%&?+=<>"
  };
function a(t, n) {
  const flooredValue = Math.floor((n - t.length) / 2),
    e = [];
  for (let r = 0; r < n; r++) e.push(t[r - flooredValue] ?? " ");
  return e;
}
function e(t, n) {
  let a = (Math.imul(t + 1, 2654435761) ^ Math.imul(n + 7, 2246822507)) >>> 0;
  return a = Math.imul(a ^ a >>> 15, 739982445) >>> 0, a = (a ^ a >>> 12) >>> 0, a / 4294967296;
}
function r(a) {
  const e = t.cycle / 2,
    r = (a % e + e) % e,
    o = e - n.change;
  return r < o ? -1 : (r - o) / n.change;
}
function o(o, l, c) {
  const s = t.cycle,
    u = (c % s + s) % s / s >= .5,
    f = r(c);
  if (f < 0) return u ? l : o;
  const i = [...o],
    d = [...l],
    h = Math.max(i.length, d.length),
    M = a(u ? d : i, h),
    F = a(u ? i : d, h),
    {
      change: m,
      roll: p,
      rate: $,
      glyphs: v
    } = n,
    x = f * m,
    flooredValue = Math.floor(c * $),
    y = o === o.toLowerCase() && o !== o.toUpperCase();
  let A = "";
  for (let t = 0; t < h; t++) {
    const n = h > 1 ? t / (h - 1) * (m - p) : 0;
    if (x < n) A += M[t];else if (x >= n + p || " " === M[t] && " " === F[t]) A += F[t];else {
      const n = v[Math.floor(e(t, flooredValue) * v.length)];
      A += y ? n.toLowerCase() : n;
    }
  }
  return A;
}
function l(t) {
  return t ? `${t === t.toLowerCase() && t !== t.toUpperCase() ? "max" : "MAX"} ${t}` : "MAX";
}
var c = (t, n) => `<maxlvl=${n}>${t}</maxlvl>`,
  s = t => t.replace(/[&<>"']/g, t => `&#${t.charCodeAt(0)};`);
function u(t) {
  return [`<span class="u-maxlvl" data-b="${s(t)}">`, '<span class="u-maxlvl-a">'];
}
var f = null,
  i = -1,
  d = !1,
  h = null;
function M(t) {
  if ("undefined" == typeof document) return;
  f ??= document.getElementsByClassName("u-maxlvl");
  const a = f.length;
  if (!a) return;
  if (h ??= "function" == typeof matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, h) return;
  const e = t / 1e3,
    l = r(e) >= 0,
    c = l ? Math.floor(e * n.rate) : -1,
    s = c !== i || l !== d;
  i = c, d = l;
  for (let n = 0; n < a; n++) {
    const t = f[n];
    if (!s && t.hasAttribute("data-t")) continue;
    const a = o(t.firstElementChild?.textContent ?? "", t.dataset.b ?? "", e);
    t.getAttribute("data-t") !== a && t.setAttribute("data-t", a), l !== t.hasAttribute("data-roll") && t.toggleAttribute("data-roll", l);
  }
}
function F(t, n) {
  const [a, e] = u(n);
  return `${a}${e}${s(t)}</span></span>`;
}
export { c as a, M as c, u as i, l as n, r as o, F as r, o as s, t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-BOVHeOwB.js","readableSha256":"78ffa2b551299d8ba632d303b8ec26cd788153fe34792c2701592adff65b2257"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

var t = .6;
function r(t, r, n) {
  if (!(t > 0 && r[0] > 0 && r[1] > 0)) return t;
  let o = r[0],
    e = r[1];
  const a = t => t.h <= e + .5 && Math.max(t.w, t.word) <= o + .5,
    u = n(t, !1);
  if (a(u)) return t;
  const f = n(t, !0);
  if (o = Math.max(o, f.w, f.word), e = Math.max(e, f.h), a(u)) return t;
  let s = .6 * t,
    c = t;
  if (!a(n(s, !1))) return s;
  for (let i = 0; i < 5; i++) {
    const t = (s + c) / 2;
    a(n(t, !1)) ? s = t : c = t;
  }
  return s;
}
var n = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"'
};
function o(t) {
  const r = t.replace(/<[^>]*>/g, " ").replace(/&(amp|lt|gt|quot);/g, t => n[t] ?? t).replace(/&#?\w+;/g, " ");
  let o = "";
  for (const n of r.split(/[\s​]+/)) n.length > o.length && (o = n);
  return o;
}
export { r as n, o as r, t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-CvegKie5.js","readableSha256":"f5727524412eab88bf23ceeb88e0991d2847826a8612e366df52189175fdbbf0"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

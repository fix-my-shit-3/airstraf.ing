var t = () => "undefined" != typeof navigator ? navigator.language : "en-US";
function n(n, a = 0) {
  return n.toLocaleString(t(), {
    minimumFractionDigits: a,
    maximumFractionDigits: a,
    useGrouping: !1
  });
}
function a(n) {
  return Math.round(n).toLocaleString(t(), {
    maximumFractionDigits: 0
  });
}
function r(t) {
  const n = Math.max(0, Math.floor(t));
  return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
}
function i(t) {
  const n = Math.max(0, Math.floor(100 * t)),
    flooredValue = Math.floor(n / 6e3),
    r = Math.floor(n / 100) % 60;
  return `${flooredValue}:${String(r).padStart(2, "0")}.${String(n % 100).padStart(2, "0")}`;
}
function u(t) {
  const n = t % 100;
  return n >= 11 && n <= 13 ? "th" : ["th", "st", "nd", "rd"][t % 10] ?? "th";
}
function o(t) {
  return "#" + [0, 1, 2, 3].map(item => Math.max(0, Math.min(255, function (t) {
    const roundedValue = Math.round(t);
    return .5 === Math.abs(t % 1) && roundedValue % 2 != 0 ? roundedValue - 1 : roundedValue;
  }(255 * (t[item] ?? 1)))).toString(16).toUpperCase().padStart(2, "0")).join("");
}
function s(t) {
  const n = /^#?([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(t.trim());
  if (!n) return null;
  const a = parseInt(n[1], 16);
  return [(a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (255 & a) / 255, n[2] ? parseInt(n[2], 16) / 255 : 1];
}
export { i as a, n as i, o as n, r as o, a as r, u as s, s as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-BSF9mkvK.js","readableSha256":"5886309e7802cf52f570fbed6a035a2c9f11c10f833d8f1fe41ab3a82888d08f"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

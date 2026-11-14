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
  a = n.find(item => item.banner).level,
  r = e => `class${e}`,
  s = e => `classReward${e}`;
function t(l, a, s) {
  return ((e, l) => n.filter(item => item.level > l && item.level <= e))(e(a), s).map(item => ({
    classIndex: l,
    level: item.level,
    kp: item.kp,
    banner: item.banner ? r(l) : null
  }));
}
function p(e) {
  const a = (e => n.find(item => item.level > e) ?? null)(e);
  if (!a) return "All rewards earned";
  const r = [`+${l(a.kp)} KP`];
  return a.banner && r.push("Banner"), `Next: LVL ${a.level}  ${r.join(" + ")}`;
}
export { p as a, t as i, r as n, s as r, a as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-4ZchrfCo.js","readableSha256":"d11ff8dbed256db1d2b725f6b652e5f315b328e009c2bf4308d1ecfbdd776dd0"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

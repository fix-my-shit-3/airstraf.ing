import { Ai as n, Ci as t, Di as u, Si as r, Ti as e } from "./c-DRieNrHJ.js";
function a(n, e, a = 1, i = null, o = r) {
  return u(t, n, e, (n => ({
    menu: !0,
    min: n ?? null
  }))(i), o) * a;
}
function i(t, u = {}) {
  const i = "number" == typeof u ? {
      unit: u
    } : u,
    o = i.unit ?? 1,
    l = () => {
      const u = n.state,
        l = a(u.width, u.height, o, i.min, u.sizing) || 1,
        [s, p] = function (n, t, u = 1, i = null, o = r) {
          return e(n, t, a(n, t, u, i, o));
        }(u.width, u.height, o, i.min, u.sizing),
        x = t.style;
      x.position = "fixed", x.left = "0", x.top = "0", x.right = "auto", x.bottom = "auto", x.width = `${s}px`, x.height = `${p}px`, x.transformOrigin = "0 0", x.transform = `scale(${l})`, x.setProperty("--layer-w", `${s}px`), x.setProperty("--layer-h", `${p}px`), x.setProperty("--layer-px", `${Number((1 / (l * (u.dpr || 1))).toPrecision(4))}px`);
    };
  return l(), n.subscribe(l), l;
}
export { i as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-Clm_iQHR.js","readableSha256":"b78a8c957fc309305f8ac2fc78fb533a797ce80177ca4884b99905618026361b"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

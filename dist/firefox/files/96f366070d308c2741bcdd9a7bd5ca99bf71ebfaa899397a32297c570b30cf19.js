var r = "Airstraf.ing",
  o = "Airstrafing",
  n = [["Your Kour Account", `Your ${o} Account`], ["Kour Essentials", `${o} Essentials`], ["Kour Version", `${o} Version`], ["Kour Weapon", `${o} Weapon`], ["Kour Mail", `${o} Mail`], ["Kour Shop", `${o} Shop`], ["a Kour Clan", `an ${o} Clan`], ["Kour Clan", `${o} Clan`], ["Kour team", `${o} team`], ["KOUR CRATES", `${o.toUpperCase()} CRATES`]],
  t = {
    "Kour.io Settings": "Airstrafe Settings",
    "GENERAL KOUR.IO SETTINGS": "GENERAL AIRSTRAFE SETTINGS",
    "KOUR.IO GAME SETTINGS": "AIRSTRAFE GAME SETTINGS",
    "KOUR.IO SOUND SETTINGS": "AIRSTRAFE SOUND SETTINGS"
  },
  i = [/available on <color=[^>]*>kour\.io</i],
  u = /\bkour\.io\b/gi,
  a = n.map(([r, o]) => {
    return [new RegExp(`\\b${n = r, n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"), o];
    var n;
  });
function S(o) {
  return o === o.toUpperCase() ? r.toUpperCase() : o === o.toLowerCase() ? r.toLowerCase() : r;
}
function e(r) {
  if (!/kour/i.test(r) || i.some(item => item.test(r))) return r;
  const o = t[r];
  if (o) return o;
  let n = r.replace(u, S);
  for (const [t, i] of a) n = n.replace(t, i);
  return n;
}
export { e as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-ycaScJyf.js","readableSha256":"e51b0cfefc39c05846096f7a593200c0ed975651f21d8d343ebb3015704837de"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

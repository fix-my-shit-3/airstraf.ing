var n = new Map();
function t(t, e = null) {
  let o = n.get(e);
  o || n.set(e, o = new Set()), o.add(t);
  const r = () => {
    o.delete(t), o.size || n.delete(e);
  };
  return t.then(r, r), t;
}
function e(t) {
  const e = (void 0 === t ? [...n.values()] : [n.get(t), n.get(null)]).flatMap(item => item ? [...item] : []);
  return e.length ? Promise.allSettled(e).then(() => {}) : Promise.resolve();
}
export { t as n, e as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-C4hbbDNp.js","readableSha256":"bbf4fe89a2cb9d239b5b20f290922df304a2f9fdb632423d0b0c0ee6474f9694"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

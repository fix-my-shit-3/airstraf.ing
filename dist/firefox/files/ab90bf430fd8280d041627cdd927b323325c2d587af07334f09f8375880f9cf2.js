var e = Object.create,
  t = Object.defineProperty,
  r = Object.getOwnPropertyDescriptor,
  l = Object.getOwnPropertyNames,
  a = Object.getPrototypeOf,
  u = Object.prototype.hasOwnProperty,
  o = (e, t, r) => () => {
    if (r) throw r[0];
    try {
      return e && (t = e(e = 0)), t;
    } catch (l) {
      throw r = [l], l;
    }
  },
  n = (e, t) => () => (t || (e((t = {
    exports: {}
  }).exports, t), e = null), t.exports),
  b = (e, r) => {
    let l = {};
    for (var a in e) t(l, a, {
      get: e[a],
      enumerable: !0
    });
    return r || t(l, Symbol.toStringTag, {
      value: "Module"
    }), l;
  },
  c = (e, a, o, n) => {
    if (a && "object" == typeof a || "function" == typeof a) for (var b, c = l(a), index = 0, s = c.length; index < s; index++) b = c[index], u.call(e, b) || b === o || t(e, b, {
      get: (e => a[e]).bind(null, b),
      enumerable: !(n = r(a, b)) || n.enumerable
    });
    return e;
  },
  f = (r, l, o) => (o = null != r ? e(a(r)) : {}, c(!l && r && r.__esModule && u.call(r, "default") ? o : t(o, "default", {
    value: r,
    enumerable: !0
  }), r)),
  s = e => u.call(e, "module.exports") ? e["module.exports"] : c(t({}, "__esModule", {
    value: !0
  }), e);
export { f as a, s as i, o as n, b as r, n as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-BJ87Xak5.js","readableSha256":"bd27be81e5e3e912b9ddc270216647083b407553c2082f1ec2e3ffaad610652d"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

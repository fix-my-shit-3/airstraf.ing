var e = {},
  t = function (t, r, o) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      const t = document.getElementsByTagName("link"),
        element = document.querySelector("meta[property=csp-nonce]"),
        c = element?.nonce || element?.getAttribute("nonce");
      s = r.map(item => {
        var o;
        if (o = item = function (e) {
          return "/" + e;
        }(item), (item = import.meta.resolve ? import.meta.resolve(o) : new URL(o, import.meta.url).href) in e) return;
        e[item] = !0;
        const n = item.endsWith(".css");
        for (let e = t.length - 1; e >= 0; e--) {
          const o = t[e];
          if (o.href === item && (!n || "stylesheet" === o.rel)) return;
        }
        const _element = document.createElement("link");
        return _element.rel = n ? "stylesheet" : "modulepreload", n || (_element.as = "script"), _element.crossOrigin = "", _element.href = item, c && _element.setAttribute("nonce", c), document.head.appendChild(_element), n ? new Promise((e, t) => {
          _element.addEventListener("load", e), _element.addEventListener("error", () => t(new Error(`Unable to preload CSS for ${item}`)));
        }) : void 0;
      }).filter(item => void 0 !== item), n = Promise.all(s.map(item => Promise.resolve(item).then(result => ({
        status: "fulfilled",
        value: result
      }), e => ({
        status: "rejected",
        reason: e
      }))));
    }
    var s;
    function c(e) {
      const t = new Event("vite:preloadError", {
        cancelable: !0
      });
      if (t.payload = e, window.dispatchEvent(t), !t.defaultPrevented) throw e;
    }
    return n.then(result => {
      for (const t of result || []) "rejected" === t.status && c(t.reason);
      return t().catch(c);
    });
  };
export { t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-BE9ZXeD7.js","readableSha256":"f735482bf5daa5c3a38b070202b62778aa73dd84e2e18d5de5f7ee10e568401d"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

var e = {},
  t = function (t, r, o) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      const t = document.getElementsByTagName("link"),
        element = document.querySelector("meta[property=csp-nonce]"),
        c = element?.nonce || element?.getAttribute("nonce");
      s = r.map(r => {
        var o;
        if (o = r = function (e) {
          return "/" + e;
        }(r), (r = import.meta.resolve ? import.meta.resolve(o) : new URL(o, import.meta.url).href) in e) return;
        e[r] = !0;
        const n = r.endsWith(".css");
        for (let e = t.length - 1; e >= 0; e--) {
          const o = t[e];
          if (o.href === r && (!n || "stylesheet" === o.rel)) return;
        }
        const _element = document.createElement("link");
        return _element.rel = n ? "stylesheet" : "modulepreload", n || (_element.as = "script"), _element.crossOrigin = "", _element.href = r, c && _element.setAttribute("nonce", c), document.head.appendChild(_element), n ? new Promise((e, t) => {
          _element.addEventListener("load", e), _element.addEventListener("error", () => t(new Error(`Unable to preload CSS for ${r}`)));
        }) : void 0;
      }).filter(e => void 0 !== e), n = Promise.all(s.map(e => Promise.resolve(e).then(e => ({
        status: "fulfilled",
        value: e
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
    return n.then(e => {
      for (const t of e || []) "rejected" === t.status && c(t.reason);
      return t().catch(c);
    });
  };
export { t };

import { a as t, i as e, n, o, r, t as i } from "./c-BjGOj7jP.js";
var s = "integrity",
  c = "userscripts",
  a = 1048576,
  u = Math.floor(2e3) - 1,
  f = (Math.ceil(a / u), /^[0-9a-f]{64}$/);
function l(t) {
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const o = t.charCodeAt(n);
    if (o < 128) e += 1;else if (o < 2048) e += 2;else if (o >= 55296 && o <= 56319 && n + 1 < t.length) {
      const o = t.charCodeAt(n + 1);
      o >= 56320 && o <= 57343 ? (e += 4, n++) : e += 3;
    } else e += 3;
  }
  return e;
}
function h(t, e) {
  const n = [];
  let o = 0;
  for (; o < e.length;) {
    let t = o,
      r = 0;
    for (; t < e.length && t - o < 6e3;) {
      const n = e.charCodeAt(t),
        i = n >= 55296 && n <= 56319 && t + 1 < e.length && 56320 == (64512 & e.charCodeAt(t + 1)),
        s = i ? 4 : n < 128 ? 1 : n < 2048 ? 2 : 3,
        c = i ? 2 : 1;
      if (r + s > 6e3 || t - o + c > 6e3) break;
      r += s, t += c;
    }
    n.push(e.slice(o, t)), o = t;
  }
  n.length || n.push("");
  const r = n.length;
  return n.map((item, index) => ({
    sha: t,
    i: index,
    n: r,
    text: item
  }));
}
function p(t) {
  return `${t.sha}|${t.kind}|${t.length}|${t.label}`;
}
function y(t) {
  return t.code ? {
    ...t,
    code: t.code.map(p)
  } : t;
}
var d = Object.freeze([]),
  m = new class {
    getter = null;
    apply = null;
    probe = null;
    own = new WeakSet();
    rejected = new Map();
    $_o3p = null;
    get armed() {
      return null !== this.getter;
    }
    works(t, e, n) {
      try {
        return !1 === e(t, n(), d);
      } catch {
        return !1;
      }
    }
    arm(t, e, n) {
      return "function" == typeof t && "function" == typeof e && !!this.works(t, e, n) && (this.getter = t, this.apply = e, this.probe = n, !0);
    }
    $_4xd() {
      this.getter = this.apply = this.probe = null;
    }
    mine(t) {
      return this.own.add(t), t;
    }
    ok(t, e = !0) {
      const n = this.getter;
      if (!n) return !0;
      if (this.own.has(t)) return !0;
      let o = !1;
      try {
        o = !0 === this.apply(n, t, d);
      } catch {
        if (!this.works(n, this.apply, this.probe)) return this.$_4xd(), !0;
        o = !1;
      }
      if (o) return !0;
      if (!e) return !1;
      let r = "event";
      try {
        "string" == typeof t.type && (r = t.type.slice(0, 24));
      } catch {}
      const i = this.rejected.get(r) ?? 0;
      if (this.rejected.set(r, i + 1), 0 === i) try {
        this.$_o3p?.(r);
      } catch {}
      return !1;
    }
  }(),
  g = new WeakMap();
function b(t) {
  let e = t;
  for (let n = 0; n < 4 && ("function" == typeof e || "object" == typeof e) && null !== e && g.has(e); n++) e = g.get(e);
  return e;
}
var w = /\)\s*\{\s*\[native code\]\s*\}\s*;?\s*$/;
function v(t, e) {
  if (t) return Object.getOwnPropertyDescriptor(t, e)?.get;
}
function k(t, e) {
  if (!t || "object" != typeof t && "function" != typeof t) return;
  const n = Object.getOwnPropertyDescriptor(t, e);
  return n && "value" in n ? n.value : void 0;
}
var $ = (t, e) => t[e]?.prototype;
function j(t) {
  const e = [],
    n = (t, n) => e.push({
      path: t,
      resolve: n
    }),
    o = (t, n) => e.push({
      path: t,
      resolve: n,
      accessor: !0
    });
  for (const r of ["WebGLRenderingContext", "WebGL2RenderingContext"]) {
    const e = $(t, r);
    if (e) for (const t of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced", "useProgram", "uniform1f", "uniform2fv", "uniform3fv", "uniform4fv", "uniformMatrix4fv", "shaderSource", "bufferData", "bufferSubData", "texImage2D", "getParameter", "readPixels", "getUniformLocation", "getAttribLocation"]) t in e && n(`${r}.prototype.${t}`, e => k($(e, r), t));
  }
  for (const r of ["getImageData", "drawImage", "fillText", "getContext"]) $(t, "CanvasRenderingContext2D") && r in $(t, "CanvasRenderingContext2D") && n(`CanvasRenderingContext2D.prototype.${r}`, t => k($(t, "CanvasRenderingContext2D"), r));
  n("HTMLCanvasElement.prototype.getContext", t => k($(t, "HTMLCanvasElement"), "getContext")), n("requestAnimationFrame", t => t.requestAnimationFrame), n("cancelAnimationFrame", t => t.cancelAnimationFrame), n("performance.now", t => t.performance?.now), n("Date.now", t => t.Date?.now), n("WebSocket.prototype.send", t => k($(t, "WebSocket"), "send")), n("WebSocket.prototype.close", t => k($(t, "WebSocket"), "close")), o("WebSocket.prototype.onmessage", t => v($(t, "WebSocket"), "onmessage")), o("WebSocket.prototype.onmessage (set)", t => function (t) {
    if (t) return Object.getOwnPropertyDescriptor(t, "onmessage")?.set;
  }($(t, "WebSocket"))), o("MessageEvent.prototype.data", t => v($(t, "MessageEvent"), "data")), n("fetch", t => t.fetch), n("XMLHttpRequest.prototype.open", t => k($(t, "XMLHttpRequest"), "open")), n("XMLHttpRequest.prototype.send", t => k($(t, "XMLHttpRequest"), "send")), n("EventTarget.prototype.addEventListener", t => k($(t, "EventTarget"), "addEventListener")), n("EventTarget.prototype.dispatchEvent", t => k($(t, "EventTarget"), "dispatchEvent"));
  for (const r of ["MouseEvent", "PointerEvent"]) for (const e of ["movementX", "movementY", "clientX", "clientY"]) $(t, r) && v($(t, r), e) && o(`${r}.prototype.${e}`, t => v($(t, r), e));
  n("Element.prototype.requestPointerLock", t => k($(t, "Element"), "requestPointerLock")), n("Navigator.prototype.getGamepads", t => k($(t, "Navigator"), "getGamepads"));
  for (const r of ["axes", "buttons"]) $(t, "Gamepad") && v($(t, "Gamepad"), r) && o(`Gamepad.prototype.${r}`, t => v($(t, "Gamepad"), r));
  o("GamepadButton.prototype.value", t => v($(t, "GamepadButton"), "value"));
  for (const r of ["atan2", "tan", "sin", "cos", "sqrt", "hypot", "random"]) n(`Math.${r}`, t => t.Math?.[r]);
  n("JSON.parse", t => t.JSON?.parse), n("JSON.stringify", t => t.JSON?.stringify), n("DataView.prototype.getFloat32", t => k($(t, "DataView"), "getFloat32")), n("DataView.prototype.getUint32", t => k($(t, "DataView"), "getUint32")), n("TextDecoder.prototype.decode", t => k($(t, "TextDecoder"), "decode"));
  for (const [r, i] of [["Map", ["get", "set", "has", "delete", "forEach"]], ["Set", ["add", "has", "forEach"]], ["WeakMap", ["get", "set"]], ["Array", ["push", "forEach", "map", "filter", "find", "indexOf", "includes"]]]) for (const t of i) n(`${r}.prototype.${t}`, e => k($(e, r), t));
  for (const r of ["defineProperties", "assign", "keys", "values", "entries", "getOwnPropertyNames", "getOwnPropertyDescriptor", "getPrototypeOf", "setPrototypeOf", "preventExtensions", "seal"]) n(`Object.${r}`, t => k(t.Object, r));
  for (const r of ["get", "set", "defineProperty", "ownKeys", "construct"]) n(`Reflect.${r}`, t => k(t.Reflect, r));
  return n("Object.defineProperty", t => t.Object?.defineProperty), n("Function.prototype.call", t => k($(t, "Function"), "call")), n("Function.prototype.apply", t => k($(t, "Function"), "apply")), n("Function.prototype.bind", t => k($(t, "Function"), "bind")), n("Proxy", t => t.Proxy), n("Error.captureStackTrace", t => t.Error?.captureStackTrace), e.filter(item => void 0 !== item.resolve(t));
}
function S(t, e) {
  if ("function" != typeof e) return null;
  try {
    return String(t.apply(t.toString, e, []));
  } catch {
    return null;
  }
}
function x(t) {
  return !!t && w.test(t);
}
function M(t, e) {
  const n = [];
  for (const o of j(e)) {
    let r;
    try {
      r = b(o.resolve(e));
    } catch {
      n.push({
        path: o.path,
        source: "",
        reasons: ["descriptor-throws"]
      });
      continue;
    }
    if (null == r) continue;
    if ("function" != typeof r) {
      n.push({
        path: o.path,
        source: "",
        reasons: ["not-a-function"]
      });
      continue;
    }
    const i = S(t, r),
      s = [];
    null === i ? s.push("tostring-throws") : x(i) || s.push("non-native-source"), s.length && n.push({
      path: o.path,
      source: i ?? "",
      reasons: s,
      fn: r
    });
  }
  return n;
}
function T(t, e) {
  try {
    const n = e.Error?.prepareStackTrace;
    return "function" != typeof n ? [] : [{
      path: "Error.prepareStackTrace",
      source: S(t, n) ?? "",
      reasons: ["stack-filter"],
      fn: n
    }];
  } catch {
    return [];
  }
}
function O(t, e, n) {
  const o = [],
    r = (e, n, r) => {
      const i = S(t, n),
        s = [];
      null === i ? s.push("tostring-throws") : x(i) || s.push("non-native-source"), s.push(...r(n)), s.length && o.push({
        path: e,
        source: i ?? "",
        reasons: s
      });
    };
  return r("Function.prototype.toString", e, t => {
    const e = [];
    return "function" == typeof t && ("prototype" in t && t.prototype && e.push("has-prototype"), 0 !== t.length && e.push("wrong-length"), "toString" !== t.name && e.push("wrong-name")), e;
  }), r("Reflect.apply", n, t => {
    const e = [];
    return "function" == typeof t && "apply" !== t.name && e.push("wrong-name"), e;
  }), o;
}
var P = ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced", "drawRangeElements", "uniform1f", "uniform4fv", "uniformMatrix4fv", "bufferData", "bufferSubData", "useProgram", "vertexAttribPointer"],
  C = /(?:chrome-extension|moz-extension|safari-web-extension|safari-extension):\/\/[^\s)'"]+|user-script:[^\s)'"]+|[^\s)'"]+\.user\.js(?:#[^\s)'"]*)?/gi;
function E(t, e = 6) {
  if (!t) return [];
  const n = [],
    uniqueItems = new Set();
  let r;
  for (C.lastIndex = 0; (r = C.exec(t)) && n.length < e;) {
    const t = r[0].slice(0, 300);
    uniqueItems.has(t) || (uniqueItems.add(t), n.push(t));
  }
  return n;
}
var R = Object.freeze({}),
  _ = [0, 0, 0, 0, 0, 0, 0, 0, 0];
function W(t, e) {
  const n = [];
  let o = [];
  if ("function" != typeof e) return {
    reasons: n,
    frames: o
  };
  try {
    t.apply(e, R, _), n.push("receiver-accepted");
  } catch (r) {
    o = E(r?.stack), o.length && n.push("proxy-trap");
  }
  return {
    reasons: n,
    frames: o
  };
}
var A = t => "symbol" == typeof t ? `[${t.description ?? "symbol"}]` : String(t);
function L(t, e) {
  try {
    return Object.getOwnPropertyDescriptor(t, e);
  } catch {
    return;
  }
}
function G(t) {
  try {
    return Reflect.ownKeys(t);
  } catch {
    return [];
  }
}
function D(t) {
  const lookupMap = new Map();
  for (const n of G(t)) {
    const o = L(t, n);
    o && ("value" in o ? lookupMap.set(n, {
      data: !0,
      fn: "function" == typeof o.value ? o.value : void 0
    }) : lookupMap.set(n, {
      data: !1,
      get: o.get,
      set: o.set
    }));
  }
  return lookupMap;
}
function F(t, e) {
  let n = null;
  try {
    n = Object.getPrototypeOf(t);
  } catch {
    return !1;
  }
  for (let o = 0; n && n !== Object.prototype && o < 12; o++) {
    const t = L(n, e);
    if (t) return "function" == typeof t.value || !!t.get || !!t.set;
    try {
      n = Object.getPrototypeOf(n);
    } catch {
      return !1;
    }
  }
  return !1;
}
var I = class {
    guarded = [];
    seen = new WeakSet();
    get size() {
      return this.guarded.length;
    }
    protect(t, e) {
      const n = "function" == typeof e ? e.prototype : null;
      if (!n || "object" != typeof n || this.seen.has(n)) return !1;
      this.seen.add(n);
      let o = !1;
      try {
        Object.seal(n), o = Object.isSealed(n);
      } catch {
        o = !1;
      }
      let r = null;
      try {
        r = Object.getPrototypeOf(n);
      } catch {
        r = null;
      }
      return this.guarded.push({
        label: t,
        target: n,
        kept: D(n),
        instance: !1,
        parent: r,
        sealed: o
      }), !0;
    }
    watch(t, e) {
      if (!e || "object" != typeof e || this.seen.has(e)) return !1;
      this.seen.add(e);
      let n = null;
      try {
        n = Object.getPrototypeOf(e);
      } catch {
        n = null;
      }
      return this.guarded.push({
        label: t,
        target: e,
        kept: D(e),
        instance: !0,
        parent: n,
        sealed: !1
      }), !0;
    }
    check(t) {
      const e = [],
        n = (n, o, r, i) => {
          const s = "function" == typeof i ? S(t, i) ?? "" : "";
          e.push({
            path: `game:${n.label}${null === o ? "" : `.${A(o)}`}`,
            source: s,
            reasons: [r],
            ...("function" == typeof i ? {
              fn: i
            } : {})
          });
        };
      for (const o of this.guarded) try {
        this.$_625(o, n);
      } catch {}
      return e;
    }
    $_625(t, e) {
      let n = t.parent;
      try {
        n = Object.getPrototypeOf(t.target);
      } catch {
        e(t, null, "prototype-unreadable");
      }
      if (n !== t.parent && e(t, null, "prototype-swapped"), !t.instance && t.sealed) {
        let n = !0;
        try {
          n = Object.isSealed(t.target);
        } catch {
          n = !1;
        }
        n || e(t, null, "seal-undone");
      }
      const o = G(t.target);
      for (const r of o) {
        const n = L(t.target, r);
        if (!n) continue;
        const o = t.kept.get(r),
          i = !("value" in n);
        o ? o.data ? i ? e(t, r, "accessor", n.set ?? n.get) : void 0 !== o.fn && n.value !== o.fn ? t.instance && !F(t.target, r) || e(t, r, t.instance ? "method-override" : "replaced-method", n.value) : t.instance && void 0 === o.fn && "function" == typeof n.value && F(t.target, r) && e(t, r, "method-override", n.value) : i ? n.get !== o.get ? e(t, r, "replaced-accessor", n.get) : n.set !== o.set && e(t, r, "replaced-accessor", n.set) : t.instance || e(t, r, "replaced-accessor", n.value) : t.instance ? i ? e(t, r, "accessor", n.set ?? n.get) : "function" == typeof n.value && F(t.target, r) && e(t, r, "method-override", n.value) : e(t, r, "added-property", i ? n.set ?? n.get : n.value);
      }
      if (!t.instance) for (const r of t.kept.keys()) o.includes(r) || e(t, r, "removed");
    }
  },
  U = {
    dhdgffkkebhmkfjojejmpbldmpobfkfo: "tampermonkey",
    gcalenpjmijncebpfijmoaglllgpjagf: "tampermonkey",
    iikmkjmpaadaobahmlepeloendndfphd: "tampermonkey",
    "firefox@tampermonkey.net": "tampermonkey",
    jinjaccalgkegednnccohejagnlnfdag: "violentmonkey",
    eeagobfjdenkkddmbclomhiblgggliao: "violentmonkey",
    "{aecec67f-0d10-4fa7-b7c7-609a2db280cf}": "violentmonkey",
    ekmeppjgajofkpiofbebgcbohbmfldaf: "orangemonkey",
    "{e4a8a97b-f2ed-450b-b12d-ee082ba24781}": "greasemonkey",
    ndcooeababalnlpkfedmmbbbgkljhpjf: "scriptcat",
    "firemonkey@eros.man": "firemonkey"
  };
function V(t) {
  return t ? U[t] ?? U[t.toLowerCase()] ?? "other" : "other";
}
function H(t) {
  const e = (t ?? "").toLowerCase().trim();
  return e.includes("tampermonkey") ? "tampermonkey" : e.includes("violentmonkey") ? "violentmonkey" : e.includes("orangemonkey") ? "orangemonkey" : e.includes("firemonkey") ? "firemonkey" : e.includes("greasemonkey") ? "greasemonkey" : e.includes("scriptcat") ? "scriptcat" : /^userscripts(?:\s|$)/.test(e) ? "userscripts" : "other";
}
function q(t) {
  const e = /(?:chrome|moz|safari-web|safari)-extension:\/\/([a-z0-9_{}@.-]+)/i.exec(t);
  return e ? e[1] : void 0;
}
function N(t) {
  const e = /[?&]name=([^&#]+)/i.exec(t);
  if (e) {
    let t = e[1];
    for (let e = 0; e < 2 && /%[0-9a-f]{2}/i.test(t); e++) try {
      t = decodeURIComponent(t);
    } catch {
      break;
    }
    return t.replace(/\.user\.js$/i, "").slice(0, 200);
  }
  const n = /([^/\\?#]+)\.user\.js(?:[#?:]|$)/i.exec(t);
  if (n) {
    let t = n[1];
    try {
      t = decodeURIComponent(t);
    } catch {}
    return t.trim().slice(0, 200);
  }
  const o = /user-script:(?:[^/\s]*\/)?([^\s:)]+)/i.exec(t);
  if (o) {
    let t = o[1];
    try {
      t = decodeURIComponent(t);
    } catch {}
    return t.trim().slice(0, 200);
  }
  return "";
}
function B(t) {
  if (/\.user\.js(?:[#?:)\s]|$)|userscript\.html\?|user-script:/i.test(t)) return !0;
  const e = q(t);
  return !!e && "other" !== V(e);
}
function z(t, e) {
  try {
    return e in t && void 0 !== t[e];
  } catch {
    return !1;
  }
}
var J = Object.freeze({
  frames: [],
  caller: "",
  userscriptCaller: !1,
  own: !1,
  functions: []
});
function X(t, e) {
  return !!e && (t.startsWith(`${e}/`) || t.startsWith(`blob:${e}/`));
}
function K(t) {
  try {
    const e = t.getScriptNameOrSourceURL?.() || t.getFileName?.() || "";
    if (e) return String(e);
    if (t.isEval?.()) return String(t.getEvalOrigin?.() ?? "");
  } catch {}
  return "";
}
function Y(t) {
  const e = /((?:[a-z][a-z0-9+.-]*:)?\/\/[^\s)]+|user-script:[^\s)]+|[^\s()@]+\.user\.js[^\s)]*)/i.exec(t);
  return e ? e[1] : "";
}
function Q(t, e, n) {
  const o = function (t) {
    const e = [];
    for (const n of t.split("\n")) {
      const t = n.trim();
      t && (t.startsWith("at ") || t.includes("@") || /:\d+:\d+\)?$/.test(t)) && e.push(t);
    }
    return e;
  }(t).slice(n);
  let r = "",
    i = !1;
  for (const s of o) {
    const t = Y(s);
    t && (r || (r = t.slice(0, 300)), X(t, e) && (i = !0));
  }
  return {
    frames: E(o.join("\n"), 8),
    caller: r,
    userscriptCaller: B(r),
    own: i,
    functions: []
  };
}
function Z(t, e, n, o, r = 40) {
  const i = t.Error ?? Error;
  let s;
  const c = "function" == typeof i.captureStackTrace && "function" == typeof e,
    a = i.stackTraceLimit;
  try {
    c ? i.stackTraceLimit = 0 : 40 !== r && (i.stackTraceLimit = r + n), s = new i();
  } catch {
    return J;
  } finally {
    (c || 40 !== r) && (i.stackTraceLimit = a);
  }
  if (!c) {
    let t = "";
    try {
      t = String(s.stack ?? "");
    } catch {
      return J;
    }
    return Q(t, o, n);
  }
  const u = i.prepareStackTrace;
  let f = null;
  try {
    i.prepareStackTrace = (t, e) => e, 40 !== r && (i.stackTraceLimit = r), i.captureStackTrace(s, e), f = s.stack;
  } catch {
    f = null;
  } finally {
    try {
      i.prepareStackTrace = u, 40 !== r && (i.stackTraceLimit = a);
    } catch {}
  }
  return Array.isArray(f) ? function (t, e) {
    const n = [],
      o = [];
    let r = "",
      i = !1;
    for (let s = 0; s < t.length && s < 40; s++) {
      const c = t[s],
        a = K(c);
      if (!a) continue;
      let u = a;
      try {
        u = `${a}:${c.getLineNumber?.() ?? 0}:${c.getColumnNumber?.() ?? 0}`.slice(0, 300);
      } catch {}
      r || (r = u), X(a, e) && (i = !0);
      const f = E(u, 1)[0];
      if (!f) continue;
      if (n.length < 8 && !n.includes(f) && n.push(f), !B(f)) continue;
      let l;
      try {
        l = c.getFunction?.();
      } catch {
        l = void 0;
      }
      "function" == typeof l && !o.some(item => item.fn === l) && o.length < 6 && o.push({
        frame: f,
        fn: l
      });
    }
    return {
      frames: n,
      caller: r,
      userscriptCaller: B(r),
      own: i,
      functions: o
    };
  }(f, o) : "string" == typeof f ? Q(f, o, 0) : J;
}
function tt(t, e) {
  try {
    if (e === t) return "window";
    if (null == e) return "window";
    if (e === t.document) return "document";
    if ("object" != typeof e && "function" != typeof e) return typeof e;
    const n = Object.getOwnPropertyDescriptor(e, "constructor"),
      o = n && "value" in n ? n.value : null;
    if ("function" == typeof o && o.prototype === e) {
      const t = nt(o);
      return `${"a function" === t ? "anonymous" : t}.prototype`;
    }
    const r = t.Node;
    if (r?.prototype && Object.prototype.isPrototypeOf.call(r.prototype, e)) {
      const t = e.nodeName;
      if ("string" == typeof t) return `<${t.toLowerCase()}>`;
    }
    const i = Object.getPrototypeOf(e),
      s = i ? Object.getOwnPropertyDescriptor(i, "constructor") : void 0,
      c = s && "value" in s ? s.value?.name : void 0;
    return "string" == typeof c && c ? `${/^[aeiou]/i.test(c) ? "an" : "a"} ${c}` : "an object";
  } catch {
    return "an object";
  }
}
var et = t => "string" == typeof t ? t : "symbol" == typeof t ? String(t) : "number" == typeof t ? `${t}` : "?";
function nt(t) {
  try {
    if ("function" != typeof t) return "object" == typeof t && t ? "an object" : typeof t;
    const e = Object.getOwnPropertyDescriptor(t, "name"),
      n = e && "value" in e ? e.value : "";
    return "string" == typeof n && n ? n : "a function";
  } catch {
    return "a function";
  }
}
var ot = class {
    clean;
    emit;
    seen = new WeakSet();
    texts = new Set();
    tokens = 1e3;
    at = -1;
    looks = new Map();
    installed = [];
    calls = {};
    root;
    origin;
    now;
    P;
    construct;
    constructor(t, e, n = {}) {
      this.clean = t, this.emit = e, this.root = n.root ?? globalThis;
      let o = n.origin;
      if (void 0 === o) try {
        o = globalThis.location?.origin ?? "";
      } catch {
        o = "";
      }
      this.origin = "null" === o ? "" : o;
      const r = t.now ?? Date.now;
      this.now = () => {
        try {
          return r();
        } catch {
          return 0;
        }
      }, this.P = t.Proxy ?? Proxy, this.construct = t.construct ?? Reflect.construct;
    }
    get tapped() {
      return this.installed.map(item => item.api);
    }
    install() {
      if (this.installed.length) return;
      const n = this.root,
        o = t => n[t]?.prototype,
        i = this.seen,
        s = o("EventTarget");
      s && this.$_31l("addEventListener", s, "addEventListener", e(1, i), (t, e, o) => {
        const r = e[1];
        this.consider(r, "callback", "addEventListener", o, () => `callback of addEventListener('${"string" == typeof e[0] ? e[0] : "?"}') on ${tt(n, t)}`);
      }), this.$_31l("requestAnimationFrame", n, "requestAnimationFrame", e(0, i), (t, e, n) => {
        this.consider(e[0], "callback", "requestAnimationFrame", n, () => "callback of requestAnimationFrame()");
      });
      for (const t of ["setInterval", "setTimeout"]) this.$_31l(t, n, t, e(0, i), (e, n, o) => {
        this.consider(n[0], "callback", t, o, () => {
          const e = "number" == typeof n[1] ? n[1] : 0;
          return `callback of ${t}(…, ${e})`;
        });
      });
      this.$_5if("MutationObserver", n, "MutationObserver", e(0, i), (t, e, n) => {
        this.consider(e[0], "callback", "MutationObserver", n, () => "callback of new MutationObserver()");
      });
      const c = o("WebSocket");
      c && this.$_1bo("WebSocket.onmessage", c, "onmessage", e(0, i), (t, e, n) => {
        this.consider(e[0], "callback", "WebSocket.onmessage", n, () => "callback of WebSocket.onmessage");
      }), this.$_5if("Proxy", n, "Proxy", t(1, i), (t, e, n) => {
        this.$_6f6(e[0], e[1], n);
      });
      const a = t => (e, o, r) => {
          const i = o[2];
          if (null === i || "object" != typeof i) return;
          const s = i.get,
            c = i.set;
          "function" != typeof s || this.seen.has(s) || this.consider(s, "accessor", t, r, () => `getter of ${tt(n, o[0])}.${et(o[1])}`), "function" != typeof c || this.seen.has(c) || this.consider(c, "accessor", t, r, () => `setter of ${tt(n, o[0])}.${et(o[1])}`);
        },
        u = n.Object;
      u && this.$_31l("Object.defineProperty", u, "defineProperty", r(i), a("Object.defineProperty"));
      const f = n.Reflect;
      f && this.$_31l("Reflect.defineProperty", f, "defineProperty", r(i), a("Reflect.defineProperty"));
    }
    uninstall() {
      for (const t of this.installed.splice(0)) try {
        this.$_6vj(t) && Object.defineProperty(t.holder, t.key, t.desc);
      } catch {}
    }
    wrapped() {
      const t = [];
      for (const e of this.installed) {
        let n;
        try {
          n = Object.getOwnPropertyDescriptor(e.holder, e.key);
        } catch {
          continue;
        }
        const o = n ? e.setter ? n.set : "value" in n ? n.value : n.get : void 0;
        o !== e.tap && "function" == typeof o && t.push({
          api: e.api,
          fn: o
        });
      }
      return t;
    }
    $_6vj(t) {
      try {
        const e = Object.getOwnPropertyDescriptor(t.holder, t.key);
        return !!e && (t.setter ? e.set === t.tap : "value" in e && e.value === t.tap);
      } catch {
        return !1;
      }
    }
    $_7ij(t) {
      const e = this.installed.find(item => item.api === t);
      return !!e && this.$_6vj(e);
    }
    $_31l(t, e, n, o, r) {
      let s;
      try {
        s = Object.getOwnPropertyDescriptor(e, n);
      } catch {
        return;
      }
      if (!s || !("value" in s) || "function" != typeof s.value || !s.configurable) return;
      const c = s.value,
        a = i(this.clean.apply, o, r, null, t);
      this.put({
        api: t,
        holder: e,
        key: n,
        desc: s,
        tap: new this.P(c, a)
      });
    }
    $_5if(t, e, o, r, i) {
      let s;
      try {
        s = Object.getOwnPropertyDescriptor(e, o);
      } catch {
        return;
      }
      if (!s || !("value" in s) || "function" != typeof s.value || !s.configurable) return;
      const c = s.value,
        a = n(this.construct, r, i, null, t);
      this.put({
        api: t,
        holder: e,
        key: o,
        desc: s,
        tap: new this.P(c, a)
      });
    }
    $_1bo(t, e, n, o, r) {
      let s;
      try {
        s = Object.getOwnPropertyDescriptor(e, n);
      } catch {
        return;
      }
      if (!s || "function" != typeof s.set || !s.configurable) return;
      const c = s.set,
        a = i(this.clean.apply, o, r, null, t);
      this.put({
        api: t,
        holder: e,
        key: n,
        desc: s,
        tap: new this.P(c, a),
        setter: !0
      });
    }
    put(t) {
      try {
        const o = t.setter ? {
          get: t.desc.get,
          set: t.tap,
          enumerable: t.desc.enumerable,
          configurable: !0
        } : {
          value: t.tap,
          writable: t.desc.writable,
          enumerable: t.desc.enumerable,
          configurable: !0
        };
        Object.defineProperty(t.holder, t.key, o), e = t.tap, n = t.setter ? t.desc.set : t.desc.value, g.set(e, n), this.installed.push(t);
      } catch {}
      var e, n;
    }
    take() {
      const t = this.now();
      return this.at < 0 && (this.at = t), t > this.at && (this.tokens = Math.min(1e3, this.tokens + (t - this.at) / 1e3 * 60), this.at = t), !(this.tokens < 1 || (this.tokens -= 1, 0));
    }
    $_5r5(t) {
      const e = this.now();
      let n = this.looks.get(t);
      return n || this.looks.set(t, n = [2e3, e]), e > n[1] && (n[0] = Math.min(2e3, n[0] + (e - n[1]) / 1e3 * 200), n[1] = e), !(n[0] < 1 || (n[0] -= 1, 0));
    }
    $_11w(t) {
      this.seen.add(t);
      const e = S(this.clean, t);
      return !e || x(e) || this.texts.has(e) ? "" : e;
    }
    remember(t) {
      this.texts.size < 8192 && this.texts.add(t);
    }
    direct(t, e) {
      if (!Z(this.clean, e, 5, this.origin, 3).userscriptCaller) return null;
      const n = Z(this.clean, e, 5, this.origin);
      return n.userscriptCaller ? n.own && !this.$_7ij(t) ? null : n : null;
    }
    consider(t, e, n, o, r) {
      try {
        if (!this.$_5r5(n)) return;
        const i = this.$_11w(t);
        if (!i || !this.take()) return;
        this.remember(i);
        const s = this.direct(n, o);
        if (!s) return;
        this.emit({
          kind: e,
          label: r().slice(0, 100),
          source: i,
          frames: s.frames,
          functions: s.functions.map(item => item.fn)
        });
      } catch {}
    }
    $_6f6(t, e, n) {
      try {
        if (!this.$_5r5("Proxy")) return;
        this.seen.add(e);
        const o = [];
        for (const t of Object.getOwnPropertyNames(e)) {
          if (o.length >= 13) break;
          const n = Object.getOwnPropertyDescriptor(e, t),
            r = n && "value" in n ? n.value : void 0;
          if ("function" != typeof r || this.seen.has(r)) continue;
          const i = this.$_11w(r);
          i && o.push([t, r, i]);
        }
        if (!o.length || !this.take()) return;
        for (const [,, t] of o) this.remember(t);
        const r = this.direct("Proxy", n);
        if (!r) return;
        const i = nt(t);
        for (const [t,, e] of o) this.emit({
          kind: "trap",
          label: `Proxy trap '${t}' around ${i}`.slice(0, 100),
          source: e,
          frames: r.frames,
          functions: r.functions.map(item => item.fn)
        });
      } catch {}
    }
  },
  rt = /\b(chrome|moz|safari-web)-extension:\/\/([^/\s)'"]+)(\/[^\s)'"?#]*)/g,
  it = /\/(userscript|background|options|popup|sandbox|content)[^/]*\.html$/i,
  st = class {
    read;
    asked = new Set();
    constructor(t = (t, e) => fetch(t, {
      signal: e,
      credentials: "omit",
      cache: "force-cache"
    })) {
      this.read = t;
    }
    get count() {
      return this.asked.size;
    }
    async texts(t) {
      const e = [];
      for (const n of function (t) {
        const e = [];
        for (const n of t) for (const t of n.matchAll(rt)) {
          const n = t[3].replace(/(:\d+){1,2}$/, "");
          if (it.test(n)) continue;
          if (!/(\.m?js|\/[^./]+)$/i.test(n)) continue;
          const o = `${t[1]}-extension://${t[2]}${n}`;
          e.includes(o) || e.push(o);
        }
        return e;
      }(t)) {
        if (this.asked.has(n) || this.asked.size >= 6) continue;
        this.asked.add(n);
        const abortController = new AbortController(),
          o = setTimeout(() => abortController.abort(), 3e3);
        try {
          const o = await this.read(n, abortController.signal);
          if (!o.ok) continue;
          const r = await o.text();
          if (!r.trim() || r.length > 1048576 || /^\s*</.test(r)) continue;
          e.push({
            url: n,
            text: r
          });
        } catch {} finally {
          clearTimeout(o);
        }
      }
      return e;
    }
  };
async function ct(t) {
  const e = globalThis.crypto?.subtle;
  if (e) try {
    const n = new TextEncoder().encode(t),
      o = await e.digest("SHA-256", n);
    return [...new Uint8Array(o)].map(item => item.toString(16).padStart(2, "0")).join("");
  } catch {}
  return at(t);
}
function at(t) {
  let e = 2166136261,
    n = 3421674724;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e ^= 255 & r, n ^= r >> 8 & 255, e = Math.imul(e, 16777619) >>> 0, n = Math.imul(n, 16777619) >>> 0;
  }
  return (n >>> 0).toString(16).padStart(8, "0") + (e >>> 0).toString(16).padStart(8, "0");
}
var ut = Object.freeze({
  probe: "stop"
});
function ft(t, e) {
  const n = [],
    o = [];
  let r = !1;
  if ("function" != typeof e) return {
    frames: n,
    functions: o,
    returned: !1,
    touched: r
  };
  const i = function (t) {
    const e = t.Proxy ?? Proxy,
      i = () => {
        throw (t => {
          r = !0;
          for (const e of t.frames) n.includes(e) || n.push(e);
          for (const e of t.functions) o.includes(e.fn) || o.push(e.fn);
        })(Z(t, i, 2, "")), ut;
      };
    return new e(Object.create(null), {
      get: i,
      set: i,
      has: i,
      ownKeys: i,
      getPrototypeOf: i,
      setPrototypeOf: i,
      getOwnPropertyDescriptor: i,
      defineProperty: i,
      deleteProperty: i,
      isExtensible: i,
      preventExtensions: i
    });
  }(t);
  let s = !1;
  try {
    const n = t.apply(e, i, [i, i, i, i]),
      o = n?.then;
    if ("function" == typeof o) try {
      t.apply(o, n, [void 0, () => {}]);
    } catch {} else s = !0;
  } catch (c) {
    c !== ut && (t => {
      for (const e of E(t)) n.includes(e) || n.push(e);
    })(function (t) {
      try {
        const e = t?.stack;
        return "string" == typeof e ? e : "";
      } catch {
        return "";
      }
    }(c));
  }
  return {
    frames: n.slice(0, 6),
    functions: o.slice(0, 4),
    returned: s,
    touched: r
  };
}
function lt(t) {
  return t.startsWith("Math.") || t.startsWith("JSON.") || t.startsWith("Function.prototype.") || t.startsWith("Error.") || "Date.now" === t || t.startsWith("Object.") || t.startsWith("Reflect.") || t.startsWith("Array.prototype.") || "Proxy" === t;
}
var ht = /^WebGL2?RenderingContext\.prototype\./,
  pt = new WeakSet();
function yt(t, e) {
  return dt(t, e)?.frames ?? [];
}
function dt(t, e) {
  return "function" != typeof e || pt.has(e) ? null : (pt.add(e), ft(t, e));
}
var mt = ["Object", "Array", "Function", "Map", "Set", "WeakMap", "Promise", "String", "Number", "Float32Array", "Float64Array", "Uint8Array", "ArrayBuffer", "DataView"],
  gt = (t, e) => {
    try {
      const n = t[e]?.prototype;
      return !n || "object" != typeof n && "function" != typeof n ? null : n;
    } catch {
      return null;
    }
  };
function bt(t) {
  const e = [];
  for (const n of mt) {
    const o = gt(t, n);
    o && e.push([`${n}.prototype`, o]);
  }
  try {
    const n = gt(t, "Float32Array"),
      o = n ? Object.getPrototypeOf(n) : null;
    o && o !== gt(t, "Object") && e.push(["TypedArray.prototype", o]);
  } catch {}
  return e;
}
var wt = t => "symbol" == typeof t ? `[${t.description ?? "symbol"}]` : String(t);
function vt(t, e, n) {
  const o = [];
  for (const [r, i] of bt(e)) {
    const e = n.get(r);
    if (!e) continue;
    let s;
    try {
      s = Reflect.ownKeys(i);
    } catch {
      continue;
    }
    for (const n of s) {
      let s;
      try {
        s = Object.getOwnPropertyDescriptor(i, n);
      } catch {
        s = void 0;
      }
      if (e.has(n)) {
        if ("constructor" === n) continue;
        for (const e of [s?.value, s?.get, s?.set]) {
          const i = b(e);
          if ("function" != typeof i) continue;
          const s = S(t, i);
          null === s || x(s) || o.push({
            path: `${r}.${wt(n)}`,
            source: s,
            reasons: ["non-native-source"],
            fn: i
          });
        }
        continue;
      }
      const c = ["foreign-property"],
        a = s?.set ?? s?.get;
      a && c.push("accessor");
      const u = a ?? ("function" == typeof s?.value ? s.value : void 0),
        f = (u ? S(t, u) : null) ?? (s && "value" in s ? typeof s.value : "unreadable");
      o.push({
        path: `${r}.${wt(n)}`,
        source: f,
        reasons: c,
        fn: u
      });
    }
  }
  return o;
}
function kt(t) {
  try {
    const e = t.Function.prototype.toString,
      n = t.Reflect.apply;
    return "function" != typeof e || "function" != typeof n ? null : /\)\s*\{\s*\[native code\]\s*\}\s*;?\s*$/.test(n(e, e, [])) ? {
      toString: e,
      apply: n,
      Error: t.Error,
      Proxy: t.Proxy,
      construct: t.Reflect?.construct,
      now: t.Date?.now
    } : null;
  } catch {
    return null;
  }
}
function $t(t, e) {
  const lookupMap = new Map(),
    o = t[e]?.prototype;
  if (!o) return lookupMap;
  for (const r of Object.getOwnPropertyNames(o)) {
    if ("constructor" === r) continue;
    let t;
    try {
      t = Object.getOwnPropertyDescriptor(o, r);
    } catch {
      continue;
    }
    t && ("function" != typeof t.value && "function" != typeof t.get || lookupMap.set(r, t));
  }
  return lookupMap;
}
var jt = new Set(["article", "aside", "blockquote", "body", "div", "footer", "h1", "h2", "h3", "h4", "h5", "h6", "header", "main", "nav", "p", "section", "span"]);
function St(t) {
  try {
    return !(t.isConnected || t.firstChild || t.attributes.length || !jt.has(t.localName) && !t.localName.includes("-") || (t.shadowRoot || t.attachShadow({
      mode: "open"
    }), 1));
  } catch (e) {
    return "NotSupportedError" === e?.name;
  }
}
function xt(t, e) {
  return {
    subject: "injected:closed-shadow",
    evidence: `a <${t.localName}> with a closed shadow root was added to <${e}> and removed in the same task (Violentmonkey page-mode injection)`,
    manager: "violentmonkey"
  };
}
var Mt = (() => {
  const t = Function.prototype.toString;
  return e => {
    try {
      return t.call(e);
    } catch {
      return "";
    }
  };
})();
function Tt(t) {
  if (!t) return [];
  try {
    return [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
  } catch {
    return [];
  }
}
function Ot(t, e) {
  const n = [];
  for (const o of Tt(t)) {
    if (e.has(o)) continue;
    let r;
    e.add(o);
    try {
      r = Object.getOwnPropertyDescriptor(t, o);
    } catch {
      r = void 0;
    }
    if (!r || !("value" in r) || "function" != typeof r.value) continue;
    const i = Mt(r.value);
    if (!(i.length < 40 || /\{\s*\[native code\]\s*\}/.test(i)) && (n.includes(i) || n.push(i), n.length >= 4)) break;
  }
  return n;
}
var Pt = new WeakSet(),
  Ct = ["https://challenges.cloudflare.com/turnstile/"];
function Et(t, e) {
  if (Pt.has(t)) return null;
  const n = t.getAttribute("src");
  if (n) {
    let t = null;
    try {
      t = new URL(n, e.origin || void 0);
    } catch {
      t = null;
    }
    return t && Ct.some(item => t.href.startsWith(item)) || t && t.origin === e.origin ? null : {
      subject: n.slice(0, 256),
      evidence: n
    };
  }
  if (e.booted.has(t)) return null;
  const o = t.textContent ?? "";
  return o.trim() ? {
    subject: "inline-script",
    evidence: o,
    code: !0
  } : null;
}
var Rt = class {
    emit;
    doc;
    win;
    booted = new WeakSet();
    flagged = new WeakSet();
    observer = null;
    $_hw5 = null;
    origin = function (t = globalThis.location) {
      try {
        return t?.origin ?? "";
      } catch {
        return "";
      }
    }();
    globals = new Set();
    constructor(t, e = globalThis.document, n = globalThis.window) {
      this.emit = t, this.doc = e, this.win = n;
    }
    start() {
      if (this.doc) {
        for (const t of Tt(this.win)) this.globals.add(t);
        for (const t of this.doc.getElementsByTagName("script")) this.booted.add(t);
        this.$_5as();
        try {
          this.observer = new MutationObserver(t => this.$_4h2(t)), this.observer.observe(this.doc.documentElement ?? this.doc, {
            childList: !0,
            subtree: !0
          });
        } catch {
          this.observer = null;
        }
        if (this.win?.addEventListener) {
          this.$_hw5 = t => this.$_2pk(t);
          try {
            this.win.addEventListener("securitypolicyviolation", this.$_hw5);
          } catch {
            this.$_hw5 = null;
          }
        }
      }
    }
    scan() {
      this.$_5as();
      for (const t of function (t = globalThis) {
        const e = [];
        try {
          "unsafeWindow" in t && (t.unsafeWindow === t || t.unsafeWindow) && e.push({
            subject: "userscript:unsafeWindow",
            evidence: "unsafeWindow"
          });
        } catch {}
        for (const n of ["GM_info", "GM", "GM_addStyle", "GM_setValue", "GM_xmlhttpRequest"]) try {
          n in t && void 0 !== t[n] && e.push({
            subject: `userscript:${n}`,
            evidence: n
          });
        } catch {}
        return e;
      }(this.win)) this.emit(t);
    }
    stop() {
      this.observer?.disconnect(), this.observer = null, this.$_hw5 && this.win?.removeEventListener && this.win.removeEventListener("securitypolicyviolation", this.$_hw5), this.$_hw5 = null;
    }
    $_5as() {
      if (this.doc) for (const t of this.doc.getElementsByTagName("script")) {
        const e = Et(t, {
          origin: this.origin,
          booted: this.booted
        });
        e && this.emit(e), t.getAttribute("src") || this.booted.add(t);
      }
    }
    $_4h2(t) {
      for (const e of t) for (const t of e.addedNodes) if ("SCRIPT" === t.tagName) {
        const e = t,
          n = Et(e, {
            origin: this.origin,
            booted: this.booted
          });
        n && this.emit(n), e.getAttribute("src") || this.booted.add(e);
      } else if (!(1 !== t.nodeType || e.target !== this.doc?.documentElement && e.target !== this.doc || t.isConnected || this.flagged.has(t))) {
        this.flagged.add(t);
        const n = t;
        if (St(n)) {
          const t = xt(n, e.target.localName ?? "document"),
            o = Ot(this.win, this.globals);
          o.length || this.emit(t);
          for (const e of o) this.emit({
            ...t,
            evidence: e,
            code: !0
          });
        }
      }
    }
    $_2pk(t) {
      const e = t.effectiveDirective || t.violatedDirective || "";
      if (!(n = e).startsWith("script-src") && "default-src" !== n) return;
      var n;
      const o = t.blockedURI || "inline";
      this.emit({
        subject: `csp:${o}`.slice(0, 256),
        evidence: `${e} ${o} ${t.sample ?? ""} ${t.sourceFile ?? ""}:${t.lineNumber ?? 0}`
      });
    }
  },
  _t = ["keydown", "keyup", "mousedown", "mouseup", "mousemove", "pointerdown", "pointermove", "pointerrawupdate", "wheel"],
  Wt = class {
    clean;
    emit;
    win;
    now;
    last = new Map();
    $_4fd = null;
    listeners = [];
    $_68d = !1;
    reported = new Set();
    constructor(t, e, n = globalThis.window, o = () => Date.now()) {
      this.clean = t, this.emit = e, this.win = n, this.now = o;
    }
    refresh() {
      const t = this.win;
      if (t) {
        try {
          const e = t.addEventListener;
          if ("function" == typeof e && e !== this.$_4fd) {
            this.removeListeners();
            for (const n of _t) {
              const r = `listener:${n}`,
                i = o(5e3, this.now, t => this.sample(r, !1, t, 4));
              try {
                e.call(t, n, i, {
                  capture: !0,
                  passive: !0
                }), this.listeners.push([n, i]);
              } catch {}
            }
            this.$_4fd = e;
          }
        } catch {}
        this.frame();
      }
    }
    frame() {
      const t = this.win?.requestAnimationFrame;
      if (!this.$_68d && "function" == typeof t) {
        this.$_68d = !0;
        try {
          const e = () => {
            this.$_68d = !1, this.sample("requestAnimationFrame", !0, e);
          };
          t.call(this.win, e);
        } catch {
          this.$_68d = !1;
        }
      }
    }
    sample(t, e = !1, n = null, o = 3) {
      if (this.reported.has(t)) return;
      const r = this.now();
      if (!e && r - (this.last.get(t) ?? -1 / 0) < 5e3) return;
      let i, s;
      this.last.set(t, r);
      try {
        const t = Z(this.clean, n, o, "");
        i = t.frames, s = t.functions.map(item => item.fn);
      } catch {
        return;
      }
      if (i.length) {
        this.reported.add(t);
        try {
          this.emit({
            where: t,
            frames: i,
            functions: s
          });
        } catch {}
      }
    }
    removeListeners() {
      const t = this.win?.removeEventListener;
      for (const [e, n] of this.listeners) try {
        t?.call(this.win, e, n, {
          capture: !0
        });
      } catch {}
      this.listeners = [];
    }
    stop() {
      this.removeListeners(), this.$_4fd = null;
    }
  },
  At = [2500, 8e3, 2e4],
  Lt = () => {
    try {
      return performance.now();
    } catch {
      return 0;
    }
  },
  Gt = (t, e) => `${t}|${e.toLowerCase().replace(/[\s_-]+/g, "-")}`;
function Dt(t) {
  return /==\/?UserScript==/.test(t) ? {
    name: /@name\s+([^\n\r]+)/.exec(t)?.[1]?.trim().slice(0, 200) ?? "",
    manager: H(/@namespace\s+([^\n\r]+)/.exec(t)?.[1]?.trim() ?? "")
  } : null;
}
var Ft = class {
  clean;
  $_6iy;
  pageToString;
  pageApply;
  watcher;
  sink = null;
  $_1ks = null;
  all = new Map();
  sent = new Set();
  $_6v5 = new Map();
  $_33o = new Set();
  $_3ruj = [];
  started = !1;
  schedule;
  $_6pe = new Map();
  $_mgu = 0;
  $_3x4 = [];
  capture;
  $_57e = !1;
  lookedAt = new WeakSet();
  $_2ce = new st();
  $_3zr = [];
  sentry;
  $_39t = !1;
  root;
  shape;
  trusted;
  guard = new I();
  $_5bb = null;
  $_1lo = new Map();
  $_6wo = [];
  $_6d6 = null;
  $_4gr = !1;
  $_2un = !1;
  $_4hh = !1;
  constructor(t = {}) {
    this.root = t.root ?? globalThis, this.schedule = t.schedule ?? ((t, e) => {
      try {
        setTimeout(t, e);
      } catch {}
    });
    const e = function (t = globalThis.document) {
      const e = globalThis.Function?.prototype?.toString,
        n = globalThis.Reflect?.apply;
      let o = null,
        r = null,
        i = null,
        s = null;
      try {
        if (t?.documentElement && "function" == typeof t.createElement) {
          s = t.createElement("iframe"), s.setAttribute("aria-hidden", "true"), s.style.display = "none", s.width = "0", s.height = "0", t.documentElement.appendChild(s);
          const e = s.contentWindow;
          if (e && (o = kt(e)), e && o) {
            try {
              r = function (t) {
                const lookupMap = new Map();
                for (const [n, o] of bt(t)) try {
                  lookupMap.set(n, new Set(Reflect.ownKeys(o)));
                } catch {}
                return lookupMap;
              }(e);
            } catch {
              r = null;
            }
            i = function (t) {
              try {
                const e = Object.getOwnPropertyDescriptor(new t.Event("x"), "isTrusted");
                return "function" == typeof e?.get ? e.get : null;
              } catch {
                return null;
              }
            }(e);
          }
          try {
            o?.Error && (o.Error.stackTraceLimit = 40);
          } catch {}
        }
      } catch {
        o = null;
      } finally {
        try {
          s?.remove();
        } catch {}
      }
      return o ? {
        clean: o,
        pageToString: e,
        pageApply: n,
        fresh: !0,
        shape: r,
        isTrusted: i
      } : {
        clean: kt(globalThis) ?? {
          toString: Function.prototype.toString,
          apply: Reflect.apply,
          Error: Error,
          Proxy: Proxy,
          construct: Reflect.construct,
          now: Date.now
        },
        pageToString: e,
        pageApply: n,
        fresh: !1,
        shape: null,
        isTrusted: null
      };
    }(t.doc);
    this.clean = e.clean, this.$_6iy = e.fresh, this.pageToString = e.pageToString, this.pageApply = e.pageApply, this.shape = e.shape, this.trusted = {
      getter: e.isTrusted,
      apply: e.fresh ? e.clean.apply : null
    }, this.watcher = new Rt(t => {
      this.$_3ruj.push(t), t.subject.startsWith("injected:") && !this.$_4hh && (this.$_4hh = !0, this.schedule(() => {
        this.$_4hh = !1, this.recheck("injection");
      }, 300));
    }, t.doc, t.win), this.sentry = new Wt(this.clean, t => {
      this.$_3zr.push(t), this.$_39t || (this.$_39t = !0, this.schedule(() => {
        this.$_39t = !1, this.recheck("sentry");
      }, 1500));
    }, t.win), this.capture = new ot(this.clean, t => {
      this.$_3x4.length < 200 && this.$_3x4.push(t), this.$_57e || (this.$_57e = !0, this.schedule(() => {
        this.$_57e = !1, this.recheck("capture");
      }, 1500));
    }, {
      root: this.root,
      origin: t.origin
    });
  }
  $_4xm(t) {
    this.$_5bb = t;
  }
  get tapped() {
    return this.capture.tapped;
  }
  $_37y = {
    last: 0,
    max: 0,
    count: 0
  };
  $_1hg() {
    return {
      ...this.capture.calls
    };
  }
  get fresh() {
    return this.$_6iy;
  }
  $_10g(t) {
    this.sink = t, t && this.flush();
  }
  $_6zm(t) {
    this.$_1ks = t, t && this.$_5qs();
  }
  $_2cdh(t) {
    this.$_6d6 = t, t || (this.$_6wo.length = 0);
  }
  $_5u2(t) {
    for (const e of t) {
      const t = this.$_1lo.get(e);
      void 0 === t || this.$_6wo.some(item => item.sha === e) || this.$_6wo.push(...h(e, t));
    }
    this.$_4ri();
  }
  get $_61ul() {
    return this.$_6wo.length;
  }
  $_4ri() {
    if (this.$_4gr || !this.$_6wo.length) return;
    const t = this.$_6wo[0];
    let e = !1;
    try {
      e = !!this.$_6d6?.(t);
    } catch {
      e = !1;
    }
    e ? (this.$_6wo.shift(), this.$_6wo.length && (this.$_4gr = !0, this.schedule(() => {
      this.$_4gr = !1, this.$_4ri();
    }, 150))) : this.$_6wo.length = 0;
  }
  findings() {
    return [...this.all.values()];
  }
  userscripts() {
    return [...this.$_6v5.values()];
  }
  start() {
    if (!this.started) {
      this.started = !0;
      try {
        this.capture.install();
      } catch {}
      try {
        this.watcher.start();
      } catch {}
      this.recheck("boot");
      for (const t of At) this.schedule(() => {
        this.recheck("early");
      }, t);
      this.schedule(() => this.tick(), 45e3);
    }
  }
  tick() {
    this.recheck("interval"), this.schedule(() => this.tick(), 45e3);
  }
  running = new Set();
  async idle() {
    for (; this.running.size;) await Promise.all([...this.running]);
  }
  recheck(t) {
    const e = this.check(t).finally(() => this.running.delete(e));
    return this.running.add(e), e;
  }
  async check(t) {
    try {
      this.watcher.scan();
    } catch {}
    try {
      this.sentry.refresh();
    } catch {}
    const lookupMap = new Map(),
      n = (t, n, o, r = t) => {
        for (const i of function (t) {
          const e = [],
            uniqueItems = new Set();
          for (const o of t) {
            const t = q(o),
              r = N(o);
            let i = V(t);
            "other" === i && /user-script:/i.test(o) && (i = "greasemonkey");
            const s = `${i}|${t ?? ""}|${r}`;
            if (uniqueItems.has(s)) continue;
            uniqueItems.add(s);
            const c = {
              manager: i,
              name: r
            };
            t && (c.extensionId = t), e.push(c);
          }
          return e;
        }(t.filter(B))) {
          const t = Gt(i.manager, i.name);
          let s = lookupMap.get(t);
          s || lookupMap.set(t, s = {
            ...i,
            hooked: new Set(),
            parts: [],
            frames: []
          }), i.extensionId && !s.extensionId && (s.extensionId = i.extensionId), n && s.hooked.add(n);
          for (const e of o) s.parts.some(item => item.source === e.source) || s.parts.push(e);
          for (const e of r) s.frames.includes(e) || s.frames.push(e);
        }
      };
    try {
      const t = Lt(),
        o = [...O(this.clean, this.pageToString, this.pageApply), ...M(this.clean, this.root), ...T(this.clean, this.root), ...(this.shape ? vt(this.clean, this.root, this.shape) : []), ...this.guard.check(this.clean)],
        r = Lt() - t;
      this.$_37y.last = r, this.$_37y.max = Math.max(this.$_37y.max, r), this.$_37y.count++;
      for (const e of o) {
        const t = e.source || `${e.path}:${e.reasons.join(",")}`,
          o = await ct(`client_hook|${e.path}|${t}`),
          r = yt(this.clean, e.fn);
        this.add({
          kind: "client_hook",
          subject: e.path,
          fingerprint: o,
          excerpt: Ut(r.length ? `${e.source}\n${r.join("\n")}` : e.source || e.reasons.join(", ")),
          detail: {
            reasons: e.reasons.join(","),
            ...(this.$_6iy ? {} : {
              degraded: !0
            })
          }
        }), n(r, e.path, Vt("hook", `hook of ${e.path}`, e.source));
      }
      for (const [e, n] of this.$_5bb?.() ?? []) {
        const t = await ct(`client_hook|input:${e}`);
        this.add({
          kind: "client_hook",
          subject: `input:${e}`,
          fingerprint: t,
          excerpt: Ut(`${n} untrusted ${e} event(s) left out by the match input`),
          detail: {
            reasons: "untrusted-input",
            ...(this.$_6iy ? {} : {
              degraded: !0
            })
          }
        });
      }
      const i = function (t, e) {
        const n = [];
        for (const o of ["WebGL2RenderingContext", "WebGLRenderingContext"]) {
          const r = $(e, o);
          if (r) for (const e of P) {
            if (!(e in r)) continue;
            let i;
            try {
              i = k(r, e);
            } catch {
              continue;
            }
            if ("function" != typeof i) continue;
            if (!x(S(t, i))) continue;
            const {
              reasons: s,
              frames: c
            } = W(t, i);
            s.length && n.push({
              path: `${o}.prototype.${e}`,
              reasons: s,
              frames: c,
              fn: i
            });
          }
        }
        return n;
      }(this.clean, this.root);
      for (const e of i) {
        const t = e.frames.join("\n") || `${e.path}:${e.reasons.join(",")}`,
          o = await ct(`client_hook|${e.path}|${t}`);
        this.add({
          kind: "client_hook",
          subject: e.path,
          fingerprint: o,
          excerpt: Ut(t),
          detail: {
            reasons: e.reasons.join(","),
            proxy: !0,
            ...(this.$_6iy ? {} : {
              degraded: !0
            })
          }
        });
        const r = dt(this.clean, e.fn),
          i = this.$_7f6(r?.functions ?? [], `Proxy trap on ${e.path}`),
          s = [...new Set([...e.frames, ...(r?.frames ?? [])])];
        s.some(B) ? n(s, e.path, i) : await this.$_3cr("other", "", void 0, [e.path], [...i, ...(await this.$_4aw(s))], s);
      }
      for (const e of function (t, e) {
        const n = [];
        let o;
        try {
          o = j(e);
        } catch {
          return n;
        }
        for (const r of o) {
          if (ht.test(r.path)) continue;
          let o;
          try {
            o = b(r.resolve(e));
          } catch {
            continue;
          }
          if ("function" != typeof o || pt.has(o)) continue;
          if (pt.add(o), !x(S(t, o))) continue;
          const i = ft(t, o),
            s = [];
          i.frames.length ? s.push("proxy-trap") : i.returned && !lt(r.path) && s.push("receiver-accepted"), s.length && n.push({
            path: r.path,
            reasons: s,
            frames: i.frames,
            functions: i.functions
          });
        }
        return n;
      }(this.clean, this.root)) {
        const t = e.frames.join("\n") || `${e.path}:${e.reasons.join(",")}`,
          o = await ct(`client_hook|${e.path}|${t}`);
        this.add({
          kind: "client_hook",
          subject: e.path,
          fingerprint: o,
          excerpt: Ut(t),
          detail: {
            reasons: e.reasons.join(","),
            proxy: !0,
            ...(this.$_6iy ? {} : {
              degraded: !0
            })
          }
        }), n(e.frames, e.path, this.$_7f6(e.functions, `Proxy trap on ${e.path}`));
      }
      for (const e of this.capture.wrapped()) {
        if ("function" != typeof e.fn || this.lookedAt.has(e.fn)) continue;
        this.lookedAt.add(e.fn);
        const t = dt(this.clean, e.fn);
        if (!t?.frames.some(B)) continue;
        const o = S(this.clean, e.fn) ?? "";
        n(t.frames, e.api, [...Vt("hook", `hook of ${e.api}`, x(o) ? "" : o), ...this.$_7f6(t.functions, `Proxy trap on ${e.api}`)]);
      }
      for (const e of this.$_3zr.splice(0)) {
        const t = e.frames.join("\n"),
          o = await ct(`client_hook|callback:${e.where}|${t}`);
        this.add({
          kind: "client_hook",
          subject: `callback:${e.where}`,
          fingerprint: o,
          excerpt: Ut(t),
          detail: {
            reasons: "wrapped-callback",
            ...(this.$_6iy ? {} : {
              degraded: !0
            })
          }
        }), n(e.frames, `callback:${e.where}`, this.$_7f6(e.functions ?? [], `wrapper around the game's ${e.where} callback`));
      }
      for (const e of this.$_3x4.splice(0)) n(e.frames, null, [...this.$_7f6(e.functions, "function on the stack of the script"), ...Vt(e.kind, e.label, e.source)]);
      const s = this.$_3ruj.splice(0);
      for (const e of s) {
        const t = await ct(`foreign_script|${e.evidence}`);
        this.add({
          kind: "foreign_script",
          subject: e.subject,
          fingerprint: t,
          excerpt: Ut(e.evidence)
        });
        const o = e.code ? Dt(e.evidence) : null,
          r = Vt("whole", "whole userscript (injected into the page)", e.evidence);
        o && !e.manager && (await this.$_3cr(o.manager, o.name, void 0, [], r, []));
        const i = e.code ? It(e.evidence) : [];
        if (i.some(B) && n(i, null, o ? r : Vt("injected", "injected <script>", e.evidence)), e.manager) {
          const t = o?.name ?? "",
            n = e.code ? o ? r : Vt("injected", "function handed over by the injection", e.evidence) : [];
          await this.$_3cr(e.manager, t, void 0, [], n, e.code ? [] : [e.evidence]);
        }
      }
      for (const e of function (t = globalThis) {
        const _lookupMap = new Map(),
          n = (t, n) => {
            let o = _lookupMap.get(t);
            o || _lookupMap.set(t, o = new Set()), o.add(n);
          };
        z(t, "**VMInitInjection**") && n("violentmonkey", "**VMInitInjection**");
        try {
          1 === t.VM && n("orangemonkey", "VM");
        } catch {}
        z(t, "tm_info") && n("tampermonkey", "tm_info"), z(t, "tm_scripts") && n("tampermonkey", "tm_scripts");
        try {
          const e = t.external;
          e && "object" == typeof e && "Tampermonkey" in e && n("tampermonkey", "external.Tampermonkey"), e && "object" == typeof e && "Violentmonkey" in e && n("violentmonkey", "external.Violentmonkey");
        } catch {}
        let o = null;
        try {
          const e = t.GM_info,
            r = e && "object" == typeof e && "string" == typeof e.scriptHandler ? e.scriptHandler : "";
          r && (o = H(r), n(o, `GM_info.scriptHandler=${r}`.slice(0, 80)));
        } catch {}
        for (const r of ["GM_info", "GM", "GM_addStyle", "GM_setValue", "GM_xmlhttpRequest", "unsafeWindow"]) z(t, r) && n(o ?? "other", r);
        return [..._lookupMap.entries()].map(([t, e]) => ({
          manager: t,
          markers: [...e]
        }));
      }(this.root)) await this.$_3cr(e.manager, "", void 0, [], [], e.markers);
      for (const e of function (t = globalThis) {
        const _lookupMap2 = new Map();
        try {
          const n = t.performance?.getEntriesByType?.("resource") ?? [];
          for (const t of n) {
            const n = "string" == typeof t?.name ? t.name : "",
              o = q(n);
            if (!o) continue;
            const r = V(o);
            if ("other" === r) continue;
            const i = _lookupMap2.get(o) ?? {
              manager: r,
              extensionId: o,
              markers: []
            };
            i.markers.length < 4 && i.markers.push(`resource:${n.slice(0, 160)}`), _lookupMap2.set(o, i);
          }
        } catch {}
        return [..._lookupMap2.values()];
      }(this.root)) await this.$_3cr(e.manager, "", e.extensionId, [], [], e.markers);
      for (const n of lookupMap.values()) for (const t of await this.$_4aw(n.frames)) n.parts.some(item => item.source === t.source) || n.parts.push(t);
      for (const n of lookupMap.values()) await this.$_3cr(n.manager, n.name, n.extensionId, [...n.hooked], n.parts, n.frames);
    } catch {}
    await this.flush(), await this.$_5qs();
  }
  async $_4aw(t) {
    return (await this.$_2ce.texts(t)).map(item => ({
      kind: "injected",
      label: `extension file ${item.url}`.slice(0, 100),
      source: item.text
    }));
  }
  $_7f6(t, e) {
    const n = [];
    for (let o = t.length - 1; o >= 0 && n.length < 1; o--) {
      const r = t[o];
      if ("function" != typeof r || this.lookedAt.has(r)) continue;
      this.lookedAt.add(r);
      const i = S(this.clean, r) ?? "";
      i && !x(i) && n.push(/==UserScript==/.test(i) ? {
        kind: "whole",
        label: "whole userscript (as the manager runs it)",
        source: i
      } : {
        kind: "function",
        label: e,
        source: i
      });
    }
    return n;
  }
  async $_3cr(t, e, n, o, r, i) {
    const s = r.find(item => "whole" === item.kind);
    !e && s && (e = Dt(s.source)?.name ?? "");
    const c = Gt(t, e);
    let u = this.$_6pe.get(c);
    if (!u) {
      if (this.$_6pe.size >= 64) return;
      this.$_6pe.set(c, u = {
        refs: [],
        shas: new Set(),
        frames: new Set(),
        hooked: new Set(),
        chars: 0
      });
    }
    n && (u.extensionId = n);
    const f = [],
      h = [...r].sort((leftItem, rightItem) => "whole" === leftItem.kind ? -1 : "whole" === rightItem.kind ? 1 : 0);
    let p = !1;
    for (const l of h) {
      const t = "whole" === l.kind ? l.source.slice(0, a) : l.source;
      if (!t.trim() || t.length > 1048576) continue;
      const e = await ct(t);
      if (64 !== e.length || u.shas.has(e)) continue;
      if ("whole" !== l.kind && u.chars + t.length > 262144) continue;
      if (this.$_mgu + t.length > 2097152) continue;
      u.shas.add(e), "whole" !== l.kind && (u.chars += t.length), this.$_mgu += t.length, this.$_1lo.set(e, t);
      const n = {
        sha: e,
        kind: l.kind,
        label: l.label,
        length: t.length
      };
      "whole" !== l.kind || u.version || (u.version = e, p = !0), f.push(n);
    }
    const d = p ? [...f, ...u.refs] : f;
    u.refs.push(...f);
    const m = [];
    for (const a of i) {
      const t = a.trim().slice(0, 240);
      t && !u.frames.has(t) && (u.frames.add(t), m.length < 8 && m.push(t));
    }
    const g = o.filter(item => !u.hooked.has(item));
    for (const a of g) u.hooked.add(a);
    if (!d.length && !m.length && !g.length) return;
    const b = [];
    for (let a = 0; a < d.length; a += 12) b.push(d.slice(a, a + 12));
    b.length || b.push([]);
    for (let a = 0; a < b.length; a++) {
      const n = b[a],
        o = {
          manager: t,
          name: e,
          fingerprint: ""
        };
      u.extensionId && (o.extensionId = u.extensionId);
      const r = 0 === a ? [...u.hooked] : [];
      r.length && (o.hooked = r), n.length && (o.code = n), 0 === a && m.length && (o.frames = m), u.version && (o.version = u.version);
      const i = n[0];
      for (i ? (o.source = (this.$_1lo.get(i.sha) ?? "").slice(0, 600), o.sourceSha = i.sha, o.sourceLength = i.length) : o.frames && (o.source = o.frames.join("\n")); l(JSON.stringify(y(o))) > 6600;) {
        if (o.frames?.length) o.frames.pop();else {
          if (!o.source) break;
          o.source = o.source.slice(0, o.source.length >> 1);
        }
        o.frames && !o.frames.length && delete o.frames;
      }
      o.fingerprint = await ct(`userscript|${t}|${e}|${r.join(",")}|${n.map(item => item.sha).join(",")}|${(o.frames ?? []).join("\n")}|${u.version ?? ""}`), this.$_6v5.has(o.fingerprint) || this.$_6v5.set(o.fingerprint, o);
    }
  }
  add(t) {
    const e = `${t.kind}|${t.fingerprint}`;
    this.all.has(e) || this.all.set(e, t);
  }
  async flush() {
    if (!this.sink) return;
    const t = [];
    for (const [r, i] of this.all) this.sent.has(r) || t.push(i);
    if (!t.length) return;
    const e = [];
    let n = 16;
    for (const r of t) {
      if (e.length >= 6) break;
      const t = l(JSON.stringify(r)) + 1;
      if (e.length && n + t > 6800) break;
      e.push(r), n += t;
    }
    let o = !1;
    try {
      o = this.sink(e);
    } catch {
      o = !1;
    }
    if (o) for (const r of e) this.sent.add(`${r.kind}|${r.fingerprint}`);
  }
  async $_5qs() {
    if (!this.$_1ks) return;
    const t = [];
    for (const [r, i] of this.$_6v5) this.$_33o.has(r) || t.push(i);
    if (!t.length) return;
    const e = function (t) {
        const e = [];
        let n = 16;
        for (const o of t) {
          if (e.length >= 3) break;
          const t = l(JSON.stringify(o)) + 1;
          if (e.length && n + t > 6800) break;
          e.push(o), n += t;
        }
        return e;
      }(t.slice(0, 8).map(y)),
      n = t.slice(0, e.length);
    let o = !1;
    try {
      o = this.$_1ks(e);
    } catch {
      o = !1;
    }
    if (o) for (const r of n) this.$_33o.add(r.fingerprint);
    o && t.length > n.length && !this.$_2un && (this.$_2un = !0, this.schedule(() => {
      this.$_2un = !1, this.$_5qs();
    }, 5200));
  }
  dispose() {
    try {
      this.watcher.stop(), this.sentry.stop();
    } catch {}
  }
};
function It(t) {
  const e = [],
    n = /\/\/[#@]\s*sourceURL=([^\s]+)/g;
  let o;
  for (; (o = n.exec(t)) && e.length < 4;) e.push(o[1].slice(0, 300));
  return e;
}
function Ut(t) {
  const e = t.trim();
  return e ? e.slice(0, 700) : void 0;
}
function Vt(t, e, n) {
  const o = n ?? "";
  return o.trim() && !x(o) ? [{
    kind: t,
    label: e.slice(0, 100),
    source: o
  }] : [];
}
var Ht = ["__THREE__", "__THREE_DEVTOOLS__"],
  qt = "fingerprint",
  Nt = ["gpu", "canvas", "audio", "fonts", "screen", "locale", "platform", "hw"],
  Bt = "kd-v1",
  zt = "/__kour-device",
  Jt = /^([0-9a-z]{1,12})\.([0-9a-f]{32})$/,
  Xt = t => {
    const e = t ? Jt.exec(t) : null;
    return e ? parseInt(e[1], 36) : 1 / 0;
  };
async function Kt(t) {
  const e = globalThis.crypto?.subtle;
  if (e) try {
    const n = await e.digest("SHA-256", new TextEncoder().encode(t));
    return [...new Uint8Array(n)].map(item => item.toString(16).padStart(2, "0")).join("");
  } catch {}
  return at(`a|${t}`) + at(`b|${t}`) + at(`c|${t}`) + at(`d|${t}`);
}
function Yt(t) {
  const uint8Values = new Uint8Array(t);
  try {
    globalThis.crypto.getRandomValues(uint8Values);
  } catch {
    for (let n = 0; n < t; n++) uint8Values[n] = Math.floor(256 * Math.random());
  }
  return [...uint8Values].map(item => item.toString(16).padStart(2, "0")).join("");
}
var Qt = {
    name: "localStorage",
    read: async () => globalThis.localStorage?.getItem("kour-device-id") ?? null,
    async write(t) {
      globalThis.localStorage?.setItem("kour-device-id", t);
    }
  },
  Zt = t => new Promise((e, n) => {
    t.onsuccess = () => e(t.result), t.onerror = () => n(t.error);
  });
async function te() {
  const t = globalThis.indexedDB;
  if (!t) return null;
  const e = t.open("kour-device", 1);
  return e.onupgradeneeded = () => e.result.createObjectStore("kv"), Zt(e);
}
var ee = {
    name: "indexedDB",
    async read() {
      const t = await te();
      if (!t) return null;
      try {
        const e = await Zt(t.transaction("kv", "readonly").objectStore("kv").get("id"));
        return "string" == typeof e ? e : null;
      } finally {
        t.close();
      }
    },
    async write(t) {
      const e = await te();
      if (e) try {
        await Zt(e.transaction("kv", "readwrite").objectStore("kv").put(t, "id"));
      } finally {
        e.close();
      }
    }
  },
  ne = {
    name: "caches",
    async read() {
      const t = await (await globalThis.caches?.open(Bt))?.match(zt);
      return t ? (await t.text()).trim() : null;
    },
    async write(t) {
      await (await globalThis.caches?.open(Bt))?.put(zt, new Response(t, {
        headers: {
          "content-type": "text/plain"
        }
      }));
    }
  },
  oe = async t => {
    try {
      return await t();
    } catch {
      return null;
    }
  };
function re() {
  const element = document.createElement("canvas"),
    e = element.getContext("webgl2") ?? element.getContext("webgl");
  if (!e) return null;
  try {
    const t = e.getExtension("WEBGL_debug_renderer_info"),
      n = t => {
        const n = e.getParameter(t);
        return n && "object" == typeof n && "length" in n ? Array.from(n).join("x") : String(n);
      };
    return [n(t ? t.UNMASKED_VENDOR_WEBGL : e.VENDOR), n(t ? t.UNMASKED_RENDERER_WEBGL : e.RENDERER), n(e.VERSION), n(e.SHADING_LANGUAGE_VERSION), n(e.MAX_TEXTURE_SIZE), n(e.MAX_RENDERBUFFER_SIZE), n(e.MAX_VIEWPORT_DIMS), n(e.MAX_VERTEX_UNIFORM_VECTORS), n(e.MAX_FRAGMENT_UNIFORM_VECTORS), n(e.MAX_VARYING_VECTORS), n(e.ALIASED_LINE_WIDTH_RANGE), n(e.ALIASED_POINT_SIZE_RANGE), (e.getSupportedExtensions() ?? []).slice().sort().join(",")].join("|");
  } finally {
    e.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
function ie() {
  const element = document.createElement("canvas");
  element.width = 240, element.height = 60;
  const drawingContext = element.getContext("2d");
  if (!drawingContext) return null;
  const n = drawingContext.createLinearGradient(0, 0, 240, 60);
  return n.addColorStop(0, "#f60"), n.addColorStop(.5, "rgba(20, 120, 220, 0.7)"), n.addColorStop(1, "#2c9"), drawingContext.fillStyle = n, drawingContext.fillRect(0, 0, 240, 60), drawingContext.textBaseline = "alphabetic", drawingContext.fillStyle = "#103", drawingContext.font = '17px "Times New Roman", serif', drawingContext.fillText("Kour.io airstrafing 🚀 éß", 4, 26), drawingContext.font = "bold 13px Arial, sans-serif", drawingContext.fillStyle = "rgba(250, 250, 250, 0.6)", drawingContext.fillText("Cwm fjordbank glyphs vext quiz", 9, 50), drawingContext.globalCompositeOperation = "multiply", drawingContext.beginPath(), drawingContext.arc(190, 30, 22, 0, 2 * Math.PI), drawingContext.fillStyle = "rgb(255, 0, 255)", drawingContext.fill(), drawingContext.beginPath(), drawingContext.arc(210, 30, 18, 0, 1.7 * Math.PI, !0), drawingContext.fillStyle = "rgb(0, 255, 255)", drawingContext.fill(), element.toDataURL("image/png");
}
async function se() {
  const t = globalThis.OfflineAudioContext ?? globalThis.webkitOfflineAudioContext;
  if (!t) return null;
  const e = new t(1, 5e3, 44100),
    n = e.createOscillator();
  n.type = "triangle", n.frequency.value = 1e4;
  const o = e.createDynamicsCompressor();
  o.threshold.value = -50, o.knee.value = 40, o.ratio.value = 12, o.attack.value = 0, o.release.value = .25, n.connect(o), o.connect(e.destination), n.start(0);
  const r = await new Promise(t => {
    const n = setTimeout(() => t(null), 1500);
    e.oncomplete = e => (clearTimeout(n), t(e.renderedBuffer)), e.startRendering()?.then(e => (clearTimeout(n), t(e)), () => (clearTimeout(n), t(null)));
  });
  if (!r) return null;
  const i = r.getChannelData(0);
  let s = 0;
  for (let c = 4500; c < 5e3; c++) s += Math.abs(i[c]);
  return s.toFixed(9);
}
var ce = ["Arial Black", "Bahnschrift", "Calibri", "Cambria", "Candara", "Comic Sans MS", "Consolas", "Constantia", "Corbel", "Courier New", "Ebrima", "Franklin Gothic Medium", "Gabriola", "Gadugi", "Georgia", "HoloLens MDL2 Assets", "Impact", "Ink Free", "Javanese Text", "Leelawadee UI", "Lucida Console", "Lucida Sans Unicode", "Malgun Gothic", "Marlett", "Microsoft Himalaya", "Microsoft JhengHei", "MS Gothic", "MV Boli", "Myanmar Text", "Nirmala UI", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI Emoji", "SimSun", "Sitka Text", "Sylfaen", "Tahoma", "Trebuchet MS", "Verdana", "Yu Gothic", "Helvetica Neue", "Menlo", "Monaco", "Avenir", "Futura", "Geneva", "Optima", "Skia", "American Typewriter", "Apple Chancery", "Baskerville", "Didot", "Herculanum", "Papyrus", "DejaVu Sans", "Liberation Sans", "Noto Sans", "Ubuntu", "Cantarell", "Droid Sans", "Roboto", "Open Sans", "Source Code Pro", "Fira Code", "Lato", "Montserrat", "Wingdings", "Webdings", "Garamond", "Century Gothic", "Bookman Old Style"];
async function ae() {
  const drawingContext = document.createElement("canvas").getContext("2d");
  if (!drawingContext) return null;
  const e = e => {
      drawingContext.font = `72px ${e}`;
      const n = drawingContext.measureText("mmmmmmmmmmlliWWQ@#0");
      return `${n.width.toFixed(2)}/${(n.actualBoundingBoxAscent ?? 0).toFixed(1)}`;
    },
    n = ["monospace", "serif", "sans-serif"],
    o = n.map(e),
    r = [];
  for (let i = 0; i < ce.length; i += 6) {
    i && (await new Promise(t => setTimeout(t, 0)));
    for (const t of ce.slice(i, i + 6)) n.some((item, index) => e(`"${t}", ${item}`) !== o[index]) && r.push(t);
  }
  return r.join(",");
}
function ue() {
  const t = globalThis.screen;
  return t ? [Math.max(t.width, t.height), Math.min(t.width, t.height), t.colorDepth, t.pixelDepth].join("x") : null;
}
function fe() {
  return `${Intl.DateTimeFormat().resolvedOptions().timeZone ?? ""}|${(navigator.languages ?? [navigator.language]).join(",")}|${new Date(2020, 0, 1).getTimezoneOffset()}`;
}
function le() {
  const t = navigator,
    e = navigator.userAgent.replace(/[\d._]+/g, "");
  return [navigator.platform, t.userAgentData?.platform ?? "", t.userAgentData?.mobile ?? "", navigator.vendor, e].join("|");
}
function he() {
  const t = navigator;
  return [navigator.hardwareConcurrency ?? "", t.deviceMemory ?? "", navigator.maxTouchPoints ?? ""].join("|");
}
function pe() {
  return {
    stores: [Qt, ee, ne],
    async components() {
      const t = () => new Promise(t => setTimeout(() => t(null), 0));
      return {
        gpu: await oe(re),
        canvas: (await t()) ?? (await oe(ie)),
        audio: (await t()) ?? (await oe(se)),
        fonts: (await t()) ?? (await oe(ae)),
        screen: await oe(ue),
        locale: await oe(fe),
        platform: await oe(le),
        hw: await oe(he)
      };
    },
    hash: Kt,
    random: Yt,
    now: () => Date.now()
  };
}
var ye = null,
  de = null;
function me(t = pe) {
  return ye || (ye = (async () => {
    try {
      de = await async function (t) {
        try {
          const e = await async function (t) {
              const e = await Promise.all(t.stores.map(item => item.read().then(result => result && Jt.test(result) ? result : null, () => null)));
              let n = null;
              for (const o of e) o && Xt(o) < Xt(n) && (n = o);
              return n || (n = `${Math.max(0, Math.floor(t.now())).toString(36)}.${t.random(16)}`), await Promise.all(t.stores.map((item, index) => e[index] === n ? null : item.write(n).catch(() => {}))), n;
            }(t),
            n = (await t.hash(`kour-device|${e}`)).slice(0, 32),
            o = await t.components().catch(() => ({})),
            r = {};
          for (const i of Nt) {
            const e = o[i];
            "string" == typeof e && e && (r[i] = (await t.hash(`kour-device|${i}|${e}`)).slice(0, 16));
          }
          return /^[0-9a-f]{32}$/.test(n) ? {
            v: 1,
            id: n,
            c: r
          } : null;
        } catch {
          return null;
        }
      }("function" == typeof t ? t() : t);
    } catch {
      de = null;
    }
    return de;
  })()), ye;
}
async function ge(t = 1500) {
  if (de) return de;
  const e = me();
  let n;
  return await Promise.race([e, new Promise(e => n = setTimeout(e, t))]), clearTimeout(n), de;
}
function be() {
  return de ? {
    [qt]: de
  } : {};
}
var we = null;
function ve() {
  if (we) return we;
  try {
    (we = new Ft()).start();
  } catch {
    we = null;
  }
  try {
    (t = we) && "function" == typeof Event && m.arm(t.trusted.getter, t.trusted.apply, () => new Event("kour-probe")) && (t.$_4xm(() => m.rejected), m.$_o3p = () => {
      setTimeout(() => {
        t.recheck("input");
      }, ke);
    });
  } catch {}
  var t;
  try {
    !function (t = globalThis) {
      for (const e of Ht) try {
        e in t && delete t[e];
      } catch {}
    }();
  } catch {}
  try {
    "undefined" != typeof window && setTimeout(() => {
      me();
    }, 1200);
  } catch {}
  return we;
}
var ke = 1e3;
function $e(t) {
  const e = we;
  if (e) for (const [n, o] of t) try {
    e.guard.protect(n, o);
  } catch {}
}
function je(t) {
  const e = we;
  if (e) for (const [n, o] of t) try {
    e.guard.watch(n, o);
  } catch {}
}
function Se(t) {
  we?.$_10g(t);
}
function xe(t) {
  we?.$_6zm(t);
}
function Me(t) {
  we?.recheck(t);
}
function Te(t) {
  const e = we;
  if (e) try {
    e.$_2cdh(e => {
      try {
        return t.send("userscriptSource", e), !0;
      } catch {
        return !1;
      }
    }), t.onMessage("userscriptNeed", t => e.$_5u2(function (t) {
      const e = t?.shas;
      return Array.isArray(e) ? [...new Set(e.filter(item => "string" == typeof item && f.test(item)).slice(0, 16))] : [];
    }(t)));
  } catch {}
}
var Oe = new Set(["linkProgram", "texStorage2D", "texImage2D", "compressedTexImage2D", "texSubImage2D"]),
  Pe = null,
  Ce = null;
try {
  const t = globalThis.HTMLCanvasElement?.prototype?.getContext;
  "function" == typeof t && (Ce = t);
} catch {
  Ce = null;
}
function Ee() {
  return Pe || (Pe = function (t = globalThis.document) {
    const e = (t, e) => {
      let n = null;
      try {
        const e = t.HTMLCanvasElement?.prototype?.getContext;
        "function" == typeof e && (n = e);
      } catch {
        n = null;
      }
      return {
        getContext: n,
        gl2: $t(t, "WebGL2RenderingContext"),
        gl1: $t(t, "WebGLRenderingContext"),
        fresh: e
      };
    };
    let n = null;
    try {
      if (t?.documentElement && "function" == typeof t.createElement) {
        n = t.createElement("iframe"), n.setAttribute("aria-hidden", "true"), n.style.display = "none", n.width = "0", n.height = "0", t.documentElement.appendChild(n);
        const o = n.contentWindow;
        if (o && o.HTMLCanvasElement) {
          const t = e(o, !0);
          if (t.getContext && t.gl2.size) return t;
        }
      }
    } catch {} finally {
      try {
        n?.remove();
      } catch {}
    }
    return e(globalThis, !1);
  }()), Pe;
}
var Re = new WeakSet();
function _e(t, e) {
  if (!t || Re.has(t)) return 0;
  Re.add(t);
  let n = 0;
  for (const [o, r] of e) {
    try {
      const e = Object.getOwnPropertyDescriptor(t, o);
      if (e && !e.configurable) continue;
    } catch {
      continue;
    }
    try {
      if ("function" == typeof r.get || "function" == typeof r.set) Object.defineProperty(t, o, {
        get: r.get,
        set: r.set,
        enumerable: !1,
        configurable: !1
      }), n++;else if ("function" == typeof r.value) {
        const e = Oe.has(o);
        Object.defineProperty(t, o, {
          value: r.value,
          writable: e,
          enumerable: !1,
          configurable: !1
        }), n++;
      }
    } catch {}
  }
  return n;
}
var We = new WeakSet();
function Ae(t) {
  if (!t || We.has(t)) return;
  We.add(t);
  const e = Ee(),
    n = e.getContext ?? Ce,
    lookupMap = new Map(),
    r = function (t, r) {
      const i = lookupMap.get(t);
      if (void 0 !== i) return i;
      let s = null;
      try {
        n && (s = Reflect.apply(n, this, void 0 === r ? [t] : [t, r]));
      } catch {
        s = null;
      }
      return s && "object" == typeof s && ("webgl2" === t ? _e(s, e.gl2) : "webgl" === t && _e(s, e.gl1)), s && lookupMap.set(t, s), s ?? null;
    };
  try {
    Object.defineProperty(t, "getContext", {
      value: r,
      writable: !1,
      enumerable: !1,
      configurable: !1
    });
  } catch {
    We.delete(t);
  }
}
export { Se as a, je as c, Pt as d, m as f, Me as i, be as l, c as m, Te as n, xe as o, s as p, $e as r, ve as s, Ae as t, ge as u };

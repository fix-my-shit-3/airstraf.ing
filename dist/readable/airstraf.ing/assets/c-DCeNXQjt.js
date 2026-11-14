import { Bn as t, Hn as n, Jn as e, Kn as s, Mn as r, Xn as i, Yn as o, dr as u, kn as a, lr as c, or as l, qn as h, tr as f, ur as p } from "./c-DRieNrHJ.js";
import "./c-CwMHWVDn.js";
import { r as m } from "./c-Coxkuiy2.js";
import { r as d, s as g, t as y } from "./c-ByodlC33.js";
import { m as w, t as k } from "./c-DkPZj7-z.js";
import { D as $, E as v, O as b, S as E, T as A, a as N, k as M } from "./c-BLzjMcqR.js";
import { i as S } from "./c-BOtrWAYn.js";
import { t as x } from "./c-0_FeqyJL.js";
var F = new WeakMap();
function j(t, n) {
  if (1 === n || !(n >= .1 && n <= 2)) return t;
  let e = F.get(t);
  e || F.set(t, e = new Map());
  let s = e.get(n);
  return s || (s = {
    ...t,
    gravity: t.gravity * n
  }, e.size > 32 && e.clear(), e.set(n, s)), s;
}
var C = t => t && !t.includes("<") ? s(t) : t;
function z(n) {
  return c(n, t, C);
}
function O(t) {
  const n = p(t);
  return n ? u(n.style, z(n)) : null;
}
function D(t) {
  const n = void 0 === t.line ? null : p(t.line);
  return n ? z(n) : t.text;
}
var B = "adminNick",
  T = "adminNick",
  Y = "runAssisted",
  I = (a.Normal, a.Chick, a.Pink, a.Pink, a.Red, a.Green, a.Myth, t => l[`cmd.help.${t}`]),
  L = [{
    name: "help",
    usage: "/help",
    text: I("help"),
    party: !0
  }, {
    name: "kick",
    usage: "/kick NAME",
    text: I("kick"),
    party: !0
  }, {
    name: "ban",
    usage: "/ban NAME [7d|12h|perm] [REASON] [by=SHOWN NAME]",
    text: I("ban"),
    party: !0
  }, {
    name: "unban",
    usage: "/unban NAME",
    text: I("unban"),
    party: !0
  }, {
    name: "mute",
    usage: "/mute NAME [30m|2h|1d] [REASON]",
    text: I("mute"),
    party: !0
  }, {
    name: "unmute",
    usage: "/unmute NAME",
    text: I("unmute"),
    party: !0
  }, {
    name: "hp",
    usage: "/hp 1-100000 [NAME|@a]",
    text: I("hp"),
    party: !1
  }, {
    name: "god",
    usage: "/god",
    text: I("god"),
    party: !1
  }, {
    name: "fly",
    usage: "/fly",
    text: I("fly"),
    party: !1
  }, {
    name: "spawn",
    usage: "/spawn chicken|chickoletta|kyle|kebin|myth",
    text: I("spawn"),
    party: !1
  }, {
    name: "respawn",
    usage: "/respawn",
    text: I("respawn"),
    party: !1
  }, {
    name: "tp",
    usage: "/tp NAME | here | NAME here | NAME1 NAME2",
    text: I("tp"),
    party: !1
  }, {
    name: "spectate",
    usage: "/spectate [NAME]",
    text: I("spectate"),
    party: !1
  }, {
    name: "bots",
    usage: "/bots 0-15",
    text: I("bots"),
    party: !1
  }, {
    name: "time",
    usage: "/time 90|5m|2m30s",
    text: I("time"),
    party: !1
  }, {
    name: "give",
    usage: "/give WEAPON [NAME|@a]",
    text: I("give"),
    party: !1
  }, {
    name: "nick",
    usage: "/nick [NAME]",
    text: I("nick"),
    party: !0
  }, {
    name: "chickenrain",
    usage: `/chickenrain [1-${r.maxAdminMinutes}|off]`,
    text: I("chickenrain"),
    party: !1
  }, {
    name: "gravity",
    usage: "/gravity [0.1-2]",
    text: I("gravity"),
    party: !1
  }, {
    name: "size",
    usage: `/size [${m.min}-${m.max}] [NAME|@a]`,
    text: I("size"),
    party: !1
  }];
new Map(L.map(t => [t.name, t]));
var R = "announce",
  U = ["banner", "souls"],
  H = t => U.includes(t);
function J(t) {
  if ("string" != typeof t) return null;
  const n = t.trim().replace(/^#/, "").toUpperCase();
  return /^[0-9A-F]{6}$/.test(n) ? n : null;
}
var P = ["grey", "normal", "red", "green", "rainbow"],
  W = {
    grey: "#9B9B9B",
    normal: "#E8E8E8",
    red: "#EE4E51",
    green: "#83DE72"
  },
  _ = ["#FF4040", "#FFD040", "#40FF60", "#40C0FF", "#C040FF"],
  q = t => P.includes(t),
  K = class {
    view;
    now;
    later;
    seen = new Map();
    queue = [];
    current = null;
    timer = null;
    constructor(t, n = Date.now, e = (t, n) => setTimeout(t, n)) {
      this.view = t, this.now = n, this.later = e;
    }
    get showing() {
      return this.current?.a ?? null;
    }
    get waiting() {
      return this.queue.map(t => t.a);
    }
    receive(t) {
      const n = function (t) {
          if (!t || "object" != typeof t) return null;
          const n = t,
            e = "string" == typeof n.id && /^[\w-]{1,64}$/.test(n.id) ? n.id : null,
            s = function (t, n = 160) {
              return "string" != typeof t ? "" : [...t.normalize("NFC").replace(/[<>\u0000-\u001f\u007f\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim()].slice(0, n).join("").trim();
            }(n.text),
            r = Number(n.seconds),
            i = Number(n.remainingMs);
          return e && s && Number.isFinite(r) && Number.isFinite(i) ? {
            id: e,
            text: s,
            color: J(n.color) ?? "FFE45C",
            seconds: Math.max(3, Math.min(60, r)),
            remainingMs: Math.max(0, Math.min(6e4, i)),
            ...(H(n.style) && "banner" !== n.style ? {
              style: n.style
            } : {})
          } : null;
        }(t),
        e = this.now();
      for (const [s, r] of this.seen) r < e && this.seen.delete(s);
      return !(!n || n.remainingMs <= 0 || this.seen.has(n.id) || (this.seen.set(n.id, e + n.remainingMs + 6e4), this.queue.push({
        a: n,
        until: e + n.remainingMs
      }), this.pump(), 0));
    }
    pump() {
      if (this.current) return;
      const t = this.now(),
        n = this.queue.shift();
      if (!n) return;
      const e = Math.max(n.until, t + 3e3);
      this.current = {
        a: n.a,
        until: e
      }, this.view.show(n.a), this.clear(), this.timer = this.later(() => this.done(), e - t);
    }
    done() {
      this.timer = null, this.current = null, this.view.hide(), this.queue.length && (this.timer = this.later(() => (this.timer = null, this.pump()), 400));
    }
    clear() {
      this.timer && clearTimeout(this.timer), this.timer = null;
    }
    reset() {
      this.clear(), this.queue = [], this.current = null, this.view.hide();
    }
  },
  V = class {
    deps;
    timer = null;
    asking = !1;
    constructor(t) {
      this.deps = t;
    }
    start(t = 6e3) {
      this.timer || (this.timer = setInterval(() => {
        this.deps.wanted() && this.ask();
      }, t), this.deps.wanted() && this.ask());
    }
    stop() {
      this.timer && clearInterval(this.timer), this.timer = null;
    }
    async ask() {
      if (!this.asking) {
        this.asking = !0;
        try {
          const t = await this.deps.fetch();
          for (const n of Array.isArray(t?.items) ? t.items : []) this.deps.receive(n);
        } catch {} finally {
          this.asking = !1;
        }
      }
    }
  },
  X = null,
  Z = [];
function G(t) {
  X ? X.feed.receive(t) : Z.length < 16 && Z.push(t);
}
function Q(t, n) {
  X = {
    feed: t,
    poll: n
  };
  for (const e of Z.splice(0)) t.receive(e);
}
var tt = {
    match: !1,
    party: !1,
    chat: !1
  },
  nt = new Set(),
  et = (t, n) => {
    if (tt[t] !== n) {
      tt[t] = n;
      for (const n of nt) n(t);
    }
  },
  st = null,
  rt = new Set(),
  it = new Set(),
  ot = () => st ? {
    [B]: st
  } : {};
function ut(t, n) {
  it.add(t), t.onLeave?.(() => it.delete(t)), t.onMessage(T, n => {
    const e = function (t) {
      if (!t || "object" != typeof t || Array.isArray(t)) return;
      const n = t.nick;
      return null === n ? null : "string" == typeof n ? ("string" != typeof (e = n) ? "" : e.slice(0, 64).normalize("NFC").trim()) || null : void 0;
      var e;
    }(n);
    void 0 !== e && function (t, n) {
      if (n !== st) {
        st = n;
        for (const e of it) e !== t && e.send?.(T, {
          nick: n
        });
        for (const t of rt) t(n);
      }
    }(t, e);
  }), t.onMessage("admin", e => {
    const s = !0 === e?.admin;
    et(n, s), s && t.send?.(T, {
      nick: st
    });
  });
}
function at(t, n) {
  et(n, !1), ut(t, n), t.onMessage(R, G), X?.poll?.ask();
}
function ct(t) {
  et("chat", !1), ut(t, "chat");
}
var lt = (t, n) => tt[t] ? function (t, n = 120) {
    return t.startsWith("/") ? [...t.replace(/[<>\u0000-\u001f\u007f]/g, "")].slice(0, n).join("") : null;
  }(n) : null,
  ht = (t, n) => {
    return tt[t] && "string" == typeof (e = n) && e.trimStart().startsWith("/") && function (t, n = 120) {
      return "string" != typeof t ? "" : [...t.slice(0, 8 * n).normalize("NFC").replace(/[<>\u0000-\u001f\u007f\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim()].slice(0, n).join("").trim();
    }(n) || null;
    var e;
  };
function ft(t, n) {
  t.onMessage("adminSpectate", t => {
    const {
      target: e,
      name: s
    } = t ?? {};
    "string" == typeof e && e ? n.start(e, "string" == typeof s ? s : "") : n.stop();
  });
}
var pt = t => t.replace(/<[^>]*>/g, "");
function mt(t) {
  const n = pt(t).replace(/\s+/g, " ").trim(),
    e = n.indexOf(": ");
  if (e <= 0) return null;
  let s = n.slice(0, e);
  const r = Math.max(s.lastIndexOf("]"), s.lastIndexOf(")"));
  return r >= 0 && (s = s.slice(r + 1)), s = s.trim(), (t => t.length >= 3 && t.length <= 16 && N.test(t))(s) ? s : null;
}
var dt = class {
    $_4t5 = new Map();
    names = new Set();
    listeners = new Set();
    set(t) {
      this.$_4t5 = new Map(t.map(t => [t.uid, t.username])), this.rebuild();
    }
    add(t, n) {
      this.$_4t5.set(t, n), this.rebuild();
    }
    remove(t) {
      this.$_4t5.delete(t) && this.rebuild();
    }
    has(t) {
      return this.$_4t5.has(t);
    }
    get size() {
      return this.$_4t5.size;
    }
    get entries() {
      return [...this.$_4t5].map(([t, n]) => ({
        uid: t,
        username: n
      }));
    }
    hides(t) {
      return this.names.size > 0 && this.names.has(pt(t).trim().toLowerCase());
    }
    onChange(t) {
      return this.listeners.add(t), () => {
        this.listeners.delete(t);
      };
    }
    rebuild() {
      this.names = new Set([...this.$_4t5.values()].map(t => t.toLowerCase()).filter(Boolean));
      for (const t of this.listeners) t();
    }
  },
  gt = t => `You muted ${t}: you no longer see their chat messages`,
  yt = t => `You unmuted ${t}`,
  wt = (t, n = 0) => `You blocked ${t}: they can no longer send you trade offers` + (n > 0 ? ". Open trades with them were declined." : ""),
  kt = t => `You unblocked ${t}`,
  $t = new dt(),
  vt = new dt(),
  bt = new class {
    keep;
    lines = [];
    constructor(t = 200) {
      this.keep = t;
    }
    note(t, n, e) {
      const s = pt(t).trim();
      s && (this.lines.push({
        name: s.toLowerCase(),
        text: pt(n).slice(0, 160),
        where: e
      }), this.lines.length > this.keep && this.lines.splice(0, this.lines.length - this.keep));
    }
    of(t, n = 5) {
      const e = t.trim().toLowerCase(),
        s = this.lines.filter(t => t.name === e).slice(-n);
      return {
        lines: s.map(t => t.text),
        where: s.at(-1)?.where ?? null
      };
    }
    clear() {
      this.lines = [];
    }
  }();
function Et(t, n, e) {
  return !!$t.hides(t) || (bt.note(t, n, e), !1);
}
var At = "#9A9A9A",
  Nt = (t, n) => `<color=${At}>${t} <size=75%>${n}</size></color>`,
  Mt = /<(?=\/?[a-zA-Z#])(?!\/?(?:(?:color=#\w+|alpha=#\w+|sprite=\d+|namestyle=[\w.|-]+|color|alpha|namestyle)\b|link="(?:nick|lit):[^"<>]*">|link>))[^<>]+>/gi,
  St = /^(?:<link="(?:nick|lit):[^"<>]*">)?(?:<sprite=\d+>){0,3}/;
function xt(t, n, e = !0) {
  if (!e) return jt(t.replace(Mt, ""), n);
  const uniqueItems = new Set(),
    r = (t, n) => uniqueItems.has(n) ? "" : (uniqueItems.add(n), t),
    i = St.exec(t)[0],
    o = i.replace(/<sprite=(\d+)>/g, r);
  return uniqueItems.add("0"), jt(o + t.slice(i.length).replace(Mt, "").replace(/<sprite=(\d+)>(?!\])/g, r), n);
}
var Ft = /<\/?namestyle(?:=[\w.|-]+)?>|<sprite=\d+>|<link="(?:nick|lit):[^"<>]*">|<\/link>/gi;
function jt(t, n) {
  if (!/namestyle|<sprite=|<link=/i.test(t)) return t.length > n ? t.slice(0, n) : t;
  let e = "",
    s = 0,
    r = 0;
  const i = [],
    o = () => e + i.map(t => `</${t}>`).reverse().join(""),
    u = St.exec(t)[0].length;
  for (const c of t.matchAll(Ft)) {
    const a = t.slice(r, c.index);
    if (s + a.length > n) return e += a.slice(0, n - s), o();
    e += a, s += a.length, r = c.index + c[0].length;
    const l = c[0];
    if ("s" === l[1].toLowerCase()) {
      if (c.index >= u && "]" !== t[r]) {
        if (s + l.length > n) return o();
        s += l.length;
      }
      e += l;
      continue;
    }
    e += l;
    const h = "/" === l[1] ? l.slice(2, -1).toLowerCase() : l.slice(1).split(/[=>]/)[0].toLowerCase();
    if ("/" !== l[1]) i.push(h);else {
      const t = i.lastIndexOf(h);
      t >= 0 && i.splice(t, 1);
    }
  }
  const a = t.slice(r);
  return s + a.length > n ? (e += a.slice(0, n - s), o()) : e + a;
}
function Ct(t, n) {
  let e = "",
    s = 0,
    r = !1;
  for (let i = 0; i < t.length; i++) {
    const o = t[i];
    if (r || "<" === o) e += o, r = ">" !== o;else {
      if (s++, s > n) return `${e}...`;
      e += o;
    }
  }
  return e;
}
var zt = /[\p{L}\p{M}\p{Nd}_]/u;
function Ot(t) {
  return A(String(t ?? "")).replace(/\s+/g, " ").trim();
}
function Dt(t) {
  const n = [];
  for (const e of t) {
    const t = Ot(e);
    t && n.push({
      key: t,
      lower: t.toLowerCase(),
      name: e
    });
  }
  return n.sort((t, n) => n.key.length - t.key.length);
}
var Bt = (t, n) => {
    const e = t.codePointAt(n);
    return void 0 === e ? "" : String.fromCodePoint(e);
  },
  Tt = (t, n) => {
    if (n <= 0) return "";
    const e = t.charCodeAt(n - 1),
      s = e >= 56320 && e <= 57343 && n >= 2;
    return t.slice(s ? n - 2 : n - 1, n);
  };
function Yt(t, n) {
  if ("string" != typeof t || !t.includes("@")) return [];
  const e = Dt(n);
  if (!e.length) return [];
  const s = [];
  for (let r = t.indexOf("@"); r >= 0; r = t.indexOf("@", r + 1)) {
    if (zt.test(Tt(t, r))) continue;
    let n = null;
    for (const i of e) {
      if (n && i.key.length < n.key.length) break;
      const e = r + 1 + i.key.length;
      e > t.length || t.slice(r + 1, e).toLowerCase() !== i.lower || zt.test(Bt(t, e)) || (n || (n = i), s.push({
        start: r,
        end: e,
        name: i.name
      }));
    }
  }
  return s;
}
function It(t, n, e = []) {
  const s = Ot(n).toLowerCase();
  return s ? Yt(t, [n, ...[...e].filter(t => Ot(t).toLowerCase() !== s)]).filter(t => t.name === n) : [];
}
function Lt(t, n) {
  const e = t.toLowerCase(),
    uniqueItems = new Set(),
    r = [];
  for (const {
    key: i,
    lower: o
  } of Dt(n)) o.startsWith(e) && !uniqueItems.has(o) && (uniqueItems.add(o), r.push(i));
  return r.sort((t, n) => t.toLowerCase().localeCompare(n.toLowerCase()));
}
function Rt(t, n) {
  const e = b(t, n),
    s = A(e.text);
  return {
    value: s,
    caret: s === e.text ? e.caret : A(e.text.slice(0, e.caret)).length
  };
}
function Ut(t, n) {
  const e = Rt(n, t.input.selectionStart ?? n.length);
  e.value !== n && (t.value = e.value, t.input.setSelectionRange(e.caret, e.caret));
}
function Ht(t, n) {
  const e = /^(<link="nick:[^"<>]*">)([\s\S]*)<\/link>$/.exec(t);
  if (e) return `${e[1]}${Ht(e[2], n)}</link>`;
  const [s, r] = function (t) {
    const n = /^((?:<sprite=\d+>)*)([\s\S]*)$/.exec(t);
    return [n[1], n[2]];
  }(t);
  return r.includes("<namestyle=letters>") ? `${s}<color=white>${r}</color>` : r.includes("<namestyle=") ? t : `${s}${S(r, n, "white")}`;
}
var Jt = (t, n = !1, e) => `<color=#e8e8e8>${s(function (t, n, e = !1) {
  if (!n || !t.includes("@")) return t;
  const s = Ot(n.me ?? "").toLowerCase(),
    r = [...n.names];
  n.me && r.push(n.me);
  let i = "",
    o = 0;
  for (const u of Yt(t, r)) {
    if (u.start < o) continue;
    const n = t.slice(u.start, u.end),
      r = e && !!s && Ot(u.name).toLowerCase() === s;
    i += t.slice(o, u.start) + (r ? `<namestyle=glow|90|1|B4E0FF|2E8BFF>${n}</namestyle>` : `<color=#7CC4FF>${n}</color>`), o = u.end;
  }
  return o ? i + t.slice(o) : t;
}(E(t), e, n))}`;
function Pt(t, n = "", e = !1, s) {
  return `${n}${Wt(Ht(t.name, t.style))}: ${Jt(t.message, e, s)}`;
}
function Wt(t) {
  return t.startsWith('<link="nick:') ? t : s(t);
}
function _t(t, n = !1, r) {
  const u = E(t.text);
  if (t.systemColor && q(t.systemColor)) return s(function (t, n) {
    if ("rainbow" !== n) return `<color=${W[n]}>${t}</color>`;
    let e = 0;
    return [...t].map(t => " " === t ? t : `<color=${_[e++ % _.length]}>${t}</color>`).join("");
  }(`[SYSTEM] ${u}`, t.systemColor));
  if ("nick" in t) {
    const a = i(t.nick),
      c = t.name.replace(/[<>]/g, ""),
      l = h(a) + e(a, "after");
    if (t.system) return `<color=#EE4E51>${s(l + c)}</color> ${u}`;
    const f = o(c, a);
    return `${s(l + (a?.letters ? `<color=white>${f}</color>` : a?.style ? f : `<color=white>${f}</color>`))}: ${Jt(u, n, r)}`;
  }
  const a = f(t.badge, t.adminBadges) + x(t.clan ?? {}, "after");
  if (t.system) return `<color=#EE4E51>${s(a + t.name)}</color> ${u}`;
  const c = t.letters?.length ? `<color=white>${w(t.name, t.style, t.letters)}</color>` : S(t.name, t.style, "white");
  return `${s(a + c)}: ${Jt(u, n, r)}`;
}
function qt(t, n) {
  const e = function (t, n = new Date()) {
    if ("number" != typeof t || !Number.isFinite(t) || t <= 0) return "";
    const date = new Date(t),
      s = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    return date.getFullYear() === n.getFullYear() && date.getMonth() === n.getMonth() && date.getDate() === n.getDate() ? s : `${new Intl.DateTimeFormat(void 0, {
      month: "short",
      day: "numeric"
    }).format(date)} ${s}`;
  }(t, n);
  return e ? `<color=#9F9F9F><size=75%>${e}</size></color> ` : "";
}
var Kt = t => t.systemColor && q(t.systemColor) ? 3160 : 400;
function Vt(t, n = !1, e) {
  return `${Wt(Ht(t.name, null))}: ${Jt(t.message, n, e)}`;
}
var Xt = /[\p{L}\p{M}\p{Nd}_]/u;
function Zt(t, n, e, s = 0) {
  return function (t, n, e, s = 0) {
    const r = t.slice(0, n),
      i = r.lastIndexOf("@");
    if (i < 0 || zt.test(Tt(t, i))) return null;
    const o = r.slice(i + 1);
    if (/\s/.test(o)) return null;
    const u = Lt(o, e);
    if (!u.length) return null;
    const a = u[(s % u.length + u.length) % u.length],
      c = t.slice(n).replace(/^\S*/, ""),
      l = `${t.slice(0, i)}@${a}`;
    return {
      value: l + (c.startsWith(" ") ? c : ` ${c}`),
      caret: l.length + 1,
      name: a,
      from: {
        value: t,
        caret: n
      }
    };
  }(t, n, e, s) ?? v(t, n, s);
}
function Gt(eventTarget, n) {
  let e = null;
  const s = "undefined" == typeof document ? null : new Qt(eventTarget, n),
    r = () => eventTarget.selectionStart ?? eventTarget.value.length,
    i = n => {
      eventTarget.value = n.value, eventTarget.setSelectionRange(n.caret, n.caret), eventTarget.dispatchEvent(new Event("input", {
        bubbles: !0
      }));
    },
    o = o => {
      const u = Zt(eventTarget.value, r(), n.names(), o);
      return !!u && (i(u), e = {
        value: eventTarget.value,
        caret: r(),
        from: u.from,
        nth: o
      }, s?.update(), !0);
    },
    u = u => {
      const event = u;
      if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
      const c = s?.state ?? null;
      if (c && ("ArrowUp" === event.key || "ArrowDown" === event.key)) return s.move("ArrowUp" === event.key ? -1 : 1), event.preventDefault(), void event.stopImmediatePropagation();
      if ("Enter" === event.key && c && function (t, n) {
        if (!t) return !1;
        const e = t.items[n];
        return !!e && ("emoji" === t.kind || e.label.toLowerCase() !== t.partial.toLowerCase());
      }(c, s.picked)) return o(s.picked), event.preventDefault(), void event.stopImmediatePropagation();
      if ("Tab" !== event.key) return;
      event.preventDefault();
      const l = eventTarget.value,
        h = r();
      if (e && e.value === l && e.caret === h) {
        const o = e.nth + (event.shiftKey ? -1 : 1),
          u = Zt(e.from.value, e.from.caret, n.names(), o);
        if (!u) return;
        return i(u), e = {
          value: eventTarget.value,
          caret: r(),
          from: u.from,
          nth: o
        }, void s?.update();
      }
      o(c ? s.picked : event.shiftKey ? -1 : 0) || (e = null);
    };
  eventTarget.addEventListener("keydown", u, !0);
  const a = () => s?.update();
  eventTarget.addEventListener("input", a), eventTarget.addEventListener("click", a);
  const c = t => {
    const n = t.key;
    "ArrowLeft" !== n && "ArrowRight" !== n && "Home" !== n && "End" !== n || a();
  };
  eventTarget.addEventListener("keyup", c);
  const l = () => s?.close();
  return eventTarget.addEventListener("blur", l), s && (s.$_2kw = t => o(t)), () => {
    eventTarget.removeEventListener("keydown", u, !0), eventTarget.removeEventListener("input", a), eventTarget.removeEventListener("click", a), eventTarget.removeEventListener("keyup", c), eventTarget.removeEventListener("blur", l), s?.dispose();
  };
}
var Qt = class {
    input;
    options;
    state = null;
    picked = 0;
    $_2kw = null;
    el = null;
    layer;
    constructor(t, n) {
      this.input = t, this.options = n, this.layer = g.layer({
        name: "chat-assist",
        z: () => d(t) + y + .25,
        element: () => this.el ?? t,
        back: () => this.close(),
        showing: () => !!this.state && t.isConnected
      });
    }
    update() {
      const t = this.input,
        n = "undefined" != typeof document && document.activeElement === t ? function (t, n, e) {
          const s = function (t, n) {
            const e = t.slice(0, n),
              s = e.lastIndexOf("@");
            if (s < 0) return null;
            const r = s > 0 ? e[s - 1] : "";
            if (r && Xt.test(r)) return null;
            const i = e.slice(s + 1);
            return /\s/.test(i) ? null : i;
          }(t, n);
          if (null !== s) {
            const t = Lt(s, e).slice(0, 6);
            return t.length ? {
              kind: "mention",
              partial: s,
              items: t.map(t => ({
                label: t
              }))
            } : null;
          }
          const r = M(t, n);
          if (!r || r.partial.length < 2) return null;
          const i = $(r.partial, 6);
          return i.length ? {
            kind: "emoji",
            partial: r.partial,
            items: i.map(t => ({
              label: `:${t.name}:`,
              emoji: t.emoji
            }))
          } : null;
        }(t.value, t.selectionStart ?? t.value.length, this.options.names()) : null,
        e = !!n && !!this.state && n.kind === this.state.kind && n.items.map(t => t.label).join("\n") === this.state.items.map(t => t.label).join("\n");
      this.state = n, e || (this.picked = 0), this.render();
    }
    move(t) {
      const n = this.state?.items.length ?? 0;
      n && (this.picked = ((this.picked + t) % n + n) % n, this.render());
    }
    close() {
      this.state = null, this.render();
    }
    dispose() {
      this.close(), this.el?.remove(), this.el = null;
    }
    render() {
      const t = this.state;
      if (!t) return this.el && (this.el.hidden = !0), void this.layer.close();
      const n = this.box();
      if (!n) return;
      n.replaceChildren(...t.items.map((t, n) => {
        const element = document.createElement("div");
        if (element.className = "kour-chat-assist-row", n === this.picked && element.classList.add("is-picked"), t.emoji) {
          const _element2 = document.createElement("span");
          _element2.className = "kour-chat-assist-emoji", _element2.textContent = t.emoji, element.append(_element2);
        }
        const _element = document.createElement("span");
        return _element.className = t.emoji ? "kour-chat-assist-code" : "kour-chat-assist-name", _element.textContent = t.label, element.append(_element), element.addEventListener("pointerdown", event => {
          event.preventDefault(), event.stopPropagation(), this.$_2kw?.(n);
        }), element;
      }));
      const e = this.input.style.fontSize || getComputedStyle(this.input).fontSize;
      e && (n.style.fontSize = e), n.hidden = !1, this.layer.open();
    }
    box() {
      if (this.el?.isConnected) return this.el;
      const t = this.options.host ?? this.input.parentElement;
      if (!t) return null;
      const n = this.el ??= document.createElement("div");
      return n.className = "kour-chat-assist", n.setAttribute("role", "listbox"), "static" === getComputedStyle(t).position && t.classList.add("kour-chat-assist-host"), t.append(n), n;
    }
  },
  tn = "kour-chat-history",
  nn = new class {
    storage;
    entries = [];
    constructor(t = null) {
      this.storage = t;
      try {
        const n = t?.getItem(tn),
          e = n ? JSON.parse(n) : [];
        Array.isArray(e) && (this.entries = e.filter(t => "string" == typeof t && !!t.trim()).map(t => t.slice(0, 200)).slice(-30));
      } catch {
        this.entries = [];
      }
    }
    get list() {
      return this.entries;
    }
    push(t) {
      const n = String(t ?? "").trim().slice(0, 200);
      if (n && this.entries[this.entries.length - 1] !== n) {
        this.entries.push(n), this.entries.length > 30 && this.entries.splice(0, this.entries.length - 30);
        try {
          this.storage?.setItem(tn, JSON.stringify(this.entries));
        } catch {}
      }
    }
    at(t) {
      return t >= 1 && t <= this.entries.length ? this.entries[this.entries.length - t] : null;
    }
  }("undefined" == typeof sessionStorage ? null : (() => {
    try {
      return sessionStorage;
    } catch {
      return null;
    }
  })());
function en(eventTarget, n = nn) {
  const e = {
      recall: null
    },
    s = s => {
      const event = s;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.isComposing) return;
      const i = "ArrowUp" === event.key ? "up" : "ArrowDown" === event.key ? "down" : null;
      if (!i) return;
      const o = 0 === eventTarget.selectionStart && 0 === eventTarget.selectionEnd,
        u = function (t, n, e, s, r) {
          const i = n.recall,
            o = !!i && i.shown === s;
          if (o || (n.recall = null), "up" === e) {
            if (!o && "" !== s && !r) return null;
            const e = (o ? i.back : 0) + 1,
              u = t.at(e);
            return null === u ? null : (n.recall = {
              back: e,
              shown: u,
              draft: o ? i.draft : s
            }, u);
          }
          if (!o) return null;
          if (i.back <= 1) return n.recall = null, i.draft;
          const u = i.back - 1,
            a = t.at(u) ?? "";
          return n.recall = {
            back: u,
            shown: a,
            draft: i.draft
          }, a;
        }(n, e, i, eventTarget.value, o);
      null !== u && (event.preventDefault(), eventTarget.value = u, eventTarget.setSelectionRange(u.length, u.length), eventTarget.dispatchEvent(new Event("input", {
        bubbles: !0
      })), e.recall && (e.recall.shown = eventTarget.value));
    };
  return eventTarget.addEventListener("keydown", s), () => eventTarget.removeEventListener("keydown", s);
}
export { lt as A, O as B, bt as C, at as D, ot as E, Q as F, R as I, Y as L, K as M, V as N, ft as O, G as P, D as R, pt as S, yt as T, j as V, wt as _, Rt as a, $t as b, _t as c, It as d, Ct as f, vt as g, Nt as h, qt as i, ht as j, ct as k, Pt as l, At as m, nn as n, Ut as o, xt as p, Gt as r, Kt as s, en as t, Vt as u, Et as v, kt as w, gt as x, mt as y, z };

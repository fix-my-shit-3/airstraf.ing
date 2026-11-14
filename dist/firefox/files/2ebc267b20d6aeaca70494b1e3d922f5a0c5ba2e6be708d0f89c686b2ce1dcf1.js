import { r as t } from "./c-PsaaRsFW.js";
var n = ["ffa", "tdm", "gungame", "hardpoint", "ctf"],
  a = {
    min: 100,
    guest: 3500,
    bot: 2e3,
    scale: 16e3,
    minExpected: .03,
    maxExpected: .97,
    k: 275,
    kShrinkFrom: 12e3,
    kShrinkRange: 14e3,
    participation: 16,
    participationUntil: 1e4,
    placementGames: 3,
    placementK: 2.5,
    earlyGames: 10,
    earlyK: 1.5,
    maxGain: 400,
    maxLoss: 300,
    minSeconds: 30,
    leaverGain: .5,
    performance: {
      kills: .5,
      kd: .3,
      win: .2
    },
    kdMinGain: 5
  },
  r = (t, n, a) => Math.min(a, Math.max(n, t)),
  e = t => "number" == typeof t && Number.isFinite(t) ? Math.min(1e5, Math.max(0, Math.trunc(t))) : 0;
function o(t, n, a) {
  if (!(a.teamWeight > 0)) return t;
  const e = r(n, 0, 1);
  return (t + (a.teamSum + t * e) / (a.teamWeight + e)) / 2;
}
function s(t, n, s) {
  const i = Math.max(0, Math.min(15, Math.trunc(t.botElo ?? 0) || 0));
  return function (t) {
    const n = a,
      o = r(t.played, 0, 1);
    if (!(o > 0)) return 0;
    const s = r(Math.max(t.span, o), 0, 1),
      i = r(t.result, 0, 1),
      u = t.games <= n.placementGames ? n.placementK : t.games <= n.earlyGames ? n.earlyK : 1,
      c = function (t) {
        const n = a;
        return n.k / (1 + Math.max(0, t - n.kShrinkFrom) / n.kShrinkRange);
      }(t.elo) * u * (i - function (t, n) {
        const e = a,
          o = 1 / (1 + Math.pow(10, (n - t) / e.scale));
        return r(o, e.minExpected, e.maxExpected);
      }(t.own, t.opponents));
    let h;
    var m;
    h = c >= 0 ? c * o * (t.left ? n.leaverGain : 1) : t.games <= n.placementGames ? 0 : c * s, t.left || (h += n.participation * o * (1 - (m = t.elo, r((m - 0) / (n.participationUntil - 0), 0, 1)))), t.scored || (h = Math.min(h, 0));
    const f = !t.left && (E = t.kills, M = t.deaths, e(E) > e(M));
    var E, M;
    return f && (h = Math.max(h, n.kdMinGain * o)), h = Math.floor(r(h, -n.maxLoss, n.maxGain) + .5), f && (h = Math.max(h, 1)), Math.max(h, Math.min(0, n.min - t.elo));
  }({
    ...t,
    elo: n,
    own: o(n, t.played, t),
    games: s
  }) + i;
}
var i = "botElo",
  u = {
    window: 2500,
    growth: 3750,
    maxWait: 2,
    pollMs: 400,
    maxClaim: 1e5
  };
!function (t, n = u) {
  Math.min(n.maxWait, Math.max(0, Number.isFinite(t) ? t : 0));
  n.window, n.growth;
}(u.maxWait);
var c = ["zombies"];
function h(n, a) {
  const r = n.metadata?.mode,
    e = n.metadata?.mapId;
  return !!r && !!e && a.includes(r) && !n.metadata?.practice && n.clients > 0 && n.clients < n.maxClients && t(e, r) && !!(o = n.metadata) && (void 0 === o.phase || "playing" === o.phase) && (void 0 === o.left || o.left < 0 || o.left >= 45);
  var o;
}
function m(t, a, r = Math.random, e) {
  const o = a.filter(item => h(item, t)),
    s = t => e ? function (t, a) {
      if (!t || !n.includes(t.mode ?? "")) return 0;
      const r = t.elo;
      return "number" == typeof r && Number.isFinite(r) ? Math.abs(r - a) : 0;
    }(t.metadata, e.elo) : 0,
    i = e ? o.filter(item => s(item) <= e.window) : o,
    u = i.length ? i : o,
    c = t.filter(item => u.some(_item => _item.metadata?.mode === item));
  if (!c.length) return {
    mode: t[Math.floor(r() * t.length)],
    rooms: []
  };
  const m = c[Math.floor(r() * c.length)],
    f = t => t.filter(item => item.metadata?.mode === m),
    E = f(i).sort((leftItem, rightItem) => rightItem.clients - leftItem.clients || s(leftItem) - s(rightItem)),
    M = f(o.filter(item => !i.includes(item))).sort((leftItem, rightItem) => s(leftItem) - s(rightItem) || rightItem.clients - leftItem.clients),
    l = E.length ? E : M,
    p = l[0],
    _ = l.filter(item => item.clients === p.clients && s(item) === s(p)),
    d = _[Math.floor(r() * _.length)];
  return {
    mode: m,
    mapId: d.metadata.mapId,
    rooms: [d.roomId, ...[...E, ...M].filter(item => item !== d).map(item => item.roomId)],
    ...(e && !i.length ? {
      wait: !0
    } : {})
  };
}
function f(t, n = Math.random) {
  let a = 0;
  return () => {
    const r = t[a++];
    return "number" == typeof r && Number.isFinite(r) && r >= 0 && r < 1 ? r : n();
  };
}
function E(t = {
  BASE_URL: "/",
  DEV: !1,
  MODE: "production",
  PROD: !0,
  SSR: !1,
  VITE_BAN_APPEAL_URL: "",
  VITE_CHANGELOG_URL: "",
  VITE_GAME_SERVER: "",
  VITE_GAME_SERVERS: "eu=wss://eu.airstraf.ing,us=wss://us.airstraf.ing,asia=wss://asia.airstraf.ing",
  VITE_SUPABASE_LOOKUP_URL: "",
  VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_bgnHV-4EdzoLBN8oezZm2g_FnqC84Bb",
  VITE_SUPABASE_URL: "https://nxvdccsggoyccvkcpeth.supabase.co",
  VITE_TURNSTILE_SITE_KEY: "0x4AAAAAAFeMcViOYCIw1zxk"
}) {
  return (t?.VITE_GAME_SERVER ?? "").trim().replace(/\/+$/, "");
}
function M(t = E(), n = location) {
  if (t) return t;
  const a = "5173" === n.port ? ":2567" : n.port ? ":" + n.port : "";
  return `${"https:" === n.protocol ? "wss" : "ws"}://${n.hostname}${a}`;
}
function l(t, n = E()) {
  return n ? n.replace(/^ws/i, "http") + t : t;
}
function p(t) {
  return t === _ || (_ = t, d = function (t) {
    let n;
    try {
      n = new URL(t).hostname.toLowerCase();
    } catch {
      return !1;
    }
    return n.startsWith("[") && n.endsWith("]") && (n = n.slice(1, -1)), "localhost" === n || n.endsWith(".localhost") || "::1" === n || "0.0.0.0" === n || /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n);
  }(t)), d;
}
var _ = null,
  d = !1;
export { c as a, f as c, s as d, p as i, u as l, l as n, h as o, M as r, m as s, E as t, i as u };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-DEgsQ2SC.js","readableSha256":"a203ee74758a61896cabc21fd7b76c8232737bb44b4699bfa5fcf676806c3a1e"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

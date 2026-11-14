import { R as n, f as e, t } from "./c-CwMHWVDn.js";
var s = [0, 5, 15, 30, 50, 80, 125, 200, 300, 450, 650, 900, 1200, 1600, 2100, 2700, 3500, 4500, 5700, 7e3, 8400, 1e4, 12e3, 14500, 17500, 21500, 26500, 32500, 4e4, 5e4],
  l = s.length,
  o = (s[l - 1], n => Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0);
function a(n) {
  const e = n === 1 / 0 ? 1 / 0 : o(n);
  let t = 1;
  for (; t < l && e >= s[t];) t++;
  return t;
}
function r(n) {
  const e = o(n),
    t = s.findIndex(item => item >= e);
  return t < 0 ? l : t + 1;
}
function c(n) {
  const e = o(n),
    t = a(e),
    r = t >= l,
    c = s[t - 1],
    u = r ? c : s[t];
  return {
    level: t,
    max: r,
    kills: e,
    from: c,
    next: u,
    fill: r ? 1 : (e - c) / (u - c)
  };
}
var u = n => o(n).toLocaleString("en-US"),
  i = n => `LVL ${n}`;
function f(n, e = !1) {
  const t = c(n);
  return t.max ? "MAX" : `${u(t.kills)}${e ? " / " : "/"}${u(t.next)} Kills`;
}
function p(n, e) {
  const t = Math.max(1, o(e)),
    s = Math.min(t, o(n));
  return {
    current: s,
    goal: t,
    fill: s / t,
    done: s >= t
  };
}
function k(n, e, t, s = !1) {
  const l = p(n, e);
  return `${u(l.current)} / ${u(l.goal)}${s ? "\n" : " "}${t} Kills`;
}
var w = r(n),
  m = {
    soldier: {
      glock: 15,
      ak109: 18,
      m4a1: 22
    },
    agent: {
      glock: 15,
      ump: 18
    },
    gunner: {
      uzi: 15
    },
    hitman: {
      kar98: 18
    },
    brawler: {
      xm1014: 18
    },
    sentinel: {
      instagib: 18
    }
  },
  $ = (n, e) => m[n]?.[e] ?? w,
  v = (n, e) => `class${n}unlock${e}`,
  y = (n, e) => `${n}:${e}`,
  g = [{
    id: "1012",
    fromClass: 15,
    toClass: 14,
    weapon: 6,
    kills: n
  }];
function h(n) {
  const e = [];
  for (const t of g) {
    const s = `carriedUnlock_${t.id}`;
    n.getInt(s, 0) > 0 || (n.getInt(`class${t.fromClass}kills`, 0) >= t.kills && (n.setInt(v(t.toClass, t.weapon), 1), e.push(y(t.toClass, t.weapon))), n.setInt(s, 1));
  }
  return e;
}
var d = [{
    entry: 1,
    slot: 1,
    weapon: "cz"
  }, {
    entry: 3,
    slot: 2,
    weapon: "fists"
  }, {
    entry: 5,
    slot: 1,
    weapon: "usps"
  }, {
    entry: 7,
    slot: 2,
    weapon: "glizzy"
  }, {
    entry: 11,
    slot: 1,
    weapon: "tec9"
  }, {
    entry: 13,
    slot: 2,
    weapon: "axe"
  }, {
    entry: 18,
    slot: 2,
    weapon: "karambit"
  }, {
    entry: 34,
    slot: 2,
    weapon: "butterfly"
  }, {
    entry: 45,
    slot: 2,
    weapon: "knife"
  }, {
    entry: 60,
    slot: 1,
    weapon: "deagle"
  }, {
    entry: 71,
    slot: 1,
    weapon: "thompson"
  }, {
    entry: 82,
    slot: 1,
    weapon: "revolver"
  }, {
    entry: 83,
    slot: 1,
    weapon: "beretta"
  }, {
    entry: 84,
    slot: 1,
    weapon: "dualpistols"
  }],
  M = [{
    slot: 2,
    weapon: "scythe",
    stat: "knifeKills",
    goal: 1e3,
    label: "Melee"
  }],
  b = {
    meleeKills: 0
  },
  K = {
    meleeKills: 1 / 0
  },
  x = (n, e) => "knifeKills" === n.stat ? e.meleeKills : 0,
  A = n => M.find(item => item.weapon === n),
  N = (n, e, t = !1) => k(x(n, e), n.goal, n.label, t),
  W = n => t.find(item => item.id === n) ?? null,
  z = n => n ? e[n]?.index ?? -1 : -1,
  j = n => Object.keys(e).find(item => e[item].index === n) ?? null,
  C = n => {
    const t = j(n);
    return t ? e[t].model : n;
  },
  L = n => {
    const t = j(n);
    return t && e[t].model !== n ? e[t].icon : null;
  },
  O = n => {
    const t = e[n];
    return t && t.model !== t.index ? j(t.model) ?? n : n;
  },
  S = n => a(n);
function U(n) {
  const e = c(n);
  return {
    level: e.level,
    text: f(n),
    fill: e.fill,
    max: e.max
  };
}
var _ = (n, e, t = !1) => n.firstLevelIsUnlock && e < 0 && !t,
  D = n => `${u(n)}/${u(0)} Kills`,
  E = "random",
  R = () => !1,
  T = (e, t = n) => `${u(t)} ${e} Kills`,
  V = (r(n), (e, t, s = !1, l = n) => k(t, l, e, s)),
  X = new WeakMap();
function q(n) {
  let e = X.get(n);
  return e || (e = n.levels.filter(item => item.unlock).map(item => {
    return {
      slot: item.unlock.slot,
      weapon: item.unlock.weapon,
      level: $(n.id, item.unlock.weapon),
      kills: (t = n.id, o = item.unlock.weapon, a = $(t, o), s[Math.min(l, Math.max(1, Math.trunc(a) || 1)) - 1])
    };
    var t, o, a;
  }).sort((leftItem, rightItem) => leftItem.kills - rightItem.kills), X.set(n, e)), e;
}
function B(n, t, s, l, o, a = R, r = b) {
  const c = [],
    i = n => c.some(item => item.weapon === n),
    f = n.weapons[t];
  f && c.push({
    weapon: f,
    unlocksAt: 0,
    current: 0,
    className: n.name,
    locked: !1,
    goal: "",
    classWeapon: !1,
    level: 0,
    kept: !1
  });
  const p = l - 1;
  for (const e of d) {
    if (e.slot !== t || i(e.weapon)) continue;
    const n = Math.max(p, e.entry);
    c.push({
      weapon: e.weapon,
      unlocksAt: e.entry,
      current: n,
      className: "",
      locked: n < e.entry,
      goal: `Level ${e.entry + 1}`,
      classWeapon: !1,
      level: 0,
      kept: !1
    });
  }
  for (const k of M) {
    if (k.slot !== t || i(k.weapon) || !Object.hasOwn(e, k.weapon)) continue;
    const n = x(k, r);
    c.push({
      weapon: k.weapon,
      unlocksAt: k.goal,
      current: n,
      className: "",
      locked: n < k.goal,
      goal: `${u(k.goal)} ${k.label} Kills`,
      classWeapon: !1,
      level: 0,
      kept: !1,
      stat: !0
    });
  }
  for (const e of q(n)) {
    if (e.slot !== t || i(e.weapon)) continue;
    const l = s >= e.kills,
      o = !l && a(e.weapon);
    c.push({
      weapon: e.weapon,
      unlocksAt: e.kills,
      current: s,
      className: n.name,
      locked: !l && !o,
      goal: T(n.name, e.kills),
      classWeapon: !0,
      level: e.level,
      kept: o
    });
  }
  return c;
}
var F = (n, e, t, s = R, l = b) => B(n, e, t, 1 / 0, 0, s, l).filter(item => !item.locked).map(item => item.weapon);
function G(n, e) {
  return new Set(B(n, e, 1 / 0, 1 / 0, 0, R, K).map(item => item.weapon));
}
function H(n, e, t, s = R, l, o = b) {
  const a = [],
    r = n => null !== n && a.includes(n);
  return n.weapons.forEach((item, index) => {
    const i = item ?? null,
      f = e?.[index];
    let p = null;
    if (index < 3 && "random" === f) {
      const e = l ? F(n, index, t ?? 1 / 0, s, o).filter(_item => !r(_item)) : [];
      e.length && (p = e[Math.min(e.length - 1, Math.floor(l() * e.length))]);
    } else if (index < 3 && f) {
      const e = B(n, index, t ?? 1 / 0, 1 / 0, 0, s, o).find(_item2 => _item2.weapon === f);
      !e || e.locked || r(e.weapon) || (p = e.weapon);
    }
    a.push(p ?? (r(i) ? null : i));
  }), a;
}
export { p as A, v as C, a as D, i as E, c as O, y as S, f as T, B as _, U as a, m as b, q as c, O as d, L as f, N as g, A as h, _ as i, u as k, H as l, G as m, W as n, D as o, F as p, S as r, V as s, E as t, C as u, j as v, s as w, h as x, z as y };

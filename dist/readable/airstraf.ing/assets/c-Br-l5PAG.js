function e(e, t) {
  if (t <= e[0][0]) return e[0][1];
  const n = e[e.length - 1];
  if (t >= n[0]) return n[1];
  let r = 0;
  for (; t > e[r + 1][0];) r++;
  const [a, o, l] = e[r],
    [s, I, i] = e[r + 1],
    u = s - a,
    c = (t - a) / u,
    f = c * c,
    h = f * c;
  return (2 * h - 3 * f + 1) * o + (h - 2 * f + c) * l * u + (-2 * h + 3 * f) * I + (h - f) * i * u;
}
var t = [[0, 0, 1252.8009], [152.76376, 788114.4375, 11160.09668], [1e3, 15e7, 420977.15625], [1111, 2e8, 466848]],
  n = 1111,
  r = n => Math.floor(e(t, n));
function a(e) {
  const t = Math.min(n, Math.max(1, Math.floor(e)));
  return 1 === t ? 0 : r(t - 1);
}
function o(e) {
  if (e >= r(1111)) return {
    level: n,
    xpSoFar: e - r(n),
    delta: 0
  };
  let t = 1,
    a = n;
  for (; t < a;) {
    const n = t + a >> 1;
    r(n) <= e ? t = n + 1 : a = n;
  }
  const o = t,
    l = 1 === o ? 0 : r(o - 1);
  return {
    level: o,
    xpSoFar: e - l,
    delta: r(o) - l
  };
}
var l = [[0, 0, 1e-5], [110.13479, .00953, 17e-5], [125.78199, .01332, .00146], [2e4, 16, 27e-5]],
  s = ["Bronze I", "Bronze II", "Bronze III", "Bronze IV", "Silver I", "Silver II", "Silver III", "Silver IV", "Gold I", "Gold II", "Gold III", "Gold IV", "Champion I", "Champion II", "Champion III", "Champion IV", "Elite"],
  I = [{
    name: "Master",
    elo: 22e3
  }, {
    name: "Supreme",
    elo: 24e3
  }, {
    name: "Legend",
    elo: 26e3
  }, {
    name: "Mythic",
    elo: 28e3
  }, {
    name: "Immortal",
    elo: 3e4
  }],
  i = [...s, ...I.map(e => e.name)],
  u = I[I.length - 1].elo,
  c = 3500;
function f(t) {
  for (let e = I.length - 1; e >= 0; e--) if (t >= I[e].elo) return s.length + e;
  return Math.floor(e(l, t));
}
var h = e => i[f(e)] ?? "Error",
  M = e => e >= u,
  m = "Celestial",
  d = (e, t) => t && M(e) ? m : h(e);
function v(e) {
  const t = f(e);
  if (e >= u) return {
    currentRank: t,
    eloToNextRank: 0,
    deltaElo: 1
  };
  let n = 0,
    r = Math.max(0, Math.floor(e));
  for (; n < r;) {
    const e = Math.floor((n + r) / 2);
    f(e) >= t ? r = e : n = e + 1;
  }
  const a = e > 0 ? n : 0;
  for (n = Math.floor(e), r = u; n < r;) {
    const e = Math.floor((n + r) / 2);
    f(e) > t ? r = e : n = e + 1;
  }
  return {
    currentRank: t,
    eloToNextRank: n - e,
    deltaElo: n - a
  };
}
var p = e => (e.deltaElo - e.eloToNextRank) / e.deltaElo;
function S(e, t) {
  const n = function (e) {
    const t = Math.floor(e),
      n = e - t;
    return n > .5 ? t + 1 : n < .5 || t % 2 == 0 ? t : t + 1;
  }(e / 100);
  return n < 1 || t >= 150 ? 0 : Math.min(n, 150 - t);
}
function k(e) {
  const t = e => {
    const t = Math.round(10 * e) / 10;
    return Number.isInteger(t) ? String(t) : t.toFixed(1);
  };
  return e >= 999950 ? `${t(e / 1e6)}M` : e >= 1e3 ? `${t(e / 1e3)}k` : String(e);
}
export { k as _, i as a, M as c, a as d, p as f, d as g, h, s as i, S as l, v as m, c as n, I as o, f as p, n as r, e as s, m as t, o as u };

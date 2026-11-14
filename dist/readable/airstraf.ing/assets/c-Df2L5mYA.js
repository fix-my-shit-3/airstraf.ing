const Z = r;
(function (N, E) {
  const D = r,
    S = N();
  while (!![]) {
    try {
      const y = parseInt(D(0x137)) / 0x1 + parseInt(D(0x13e)) / 0x2 + -parseInt(D(0x143)) / 0x3 + parseInt(D(0x13b)) / 0x4 + -parseInt(D(0x13c)) / 0x5 + parseInt(D(0x133)) / 0x6 + -parseInt(D(0x140)) / 0x7 * (parseInt(D(0x130)) / 0x8);
      if (y === E) break;else S['push'](S['shift']());
    } catch (q) {
      S['push'](S['shift']());
    }
  }
})(a, 0x54bcf);
var t = class {
  ['limit'];
  [Z(0x138)] = new Map();
  constructor(N = 0x20) {
    this['limit'] = N;
  }
  [Z(0x13f)](N) {
    const W = Z,
      E = this['entries']['get'](N);
    if (void 0x0 !== E) return this[W(0x138)]['delete'](N), this['entries']['set'](N, E), E;
  }
  [Z(0x12d)](N) {
    const B = Z;
    return this['entries'][B(0x12d)](N);
  }
  ['set'](N, E) {
    const m = Z;
    for (this['entries'][m(0x141)](N), this['entries']['set'](N, E); this[m(0x138)]['size'] > this['limit'];) {
      const S = this['entries']['keys']()['next']();
      if (S['done']) break;
      this['entries']['delete'](S[m(0x135)]);
    }
  }
  [Z(0x141)](N) {
    this['entries']['delete'](N);
  }
  ['clear']() {
    this['entries']['clear']();
  }
  get [Z(0x139)]() {
    const C = Z;
    return this['entries'][C(0x139)];
  }
};
function s(N) {
  return JSON['stringify'](N, (E, S) => S instanceof Map ? {
    'map': [...S['entries']()]
  } : S instanceof Set ? {
    'set': [...S]
  } : S);
}
function a() {
  const n = ['get', '49iPRiMm', 'delete', 'key', '1815840iZhWrq', 'has', 'draw', 'same', '1169520KLIMlE', 'first\x20screen:', 'failed', '2844198LHyapj', 'pending', 'value', 'current', '240622oGMZIb', 'entries', 'size', 'set', '2709100euMVqA', '515110iBfxDQ', 'then', '1373578fQefhM'];
  a = function () {
    return n;
  };
  return a();
}
function i(N, E) {
  return N === E || s(N) === s(E);
}
function e(N) {
  const T = Z,
    E = N[T(0x136)] ?? (() => !0x0),
    S = N[T(0x12f)] ?? i,
    y = N['cache'][T(0x13f)](N[T(0x142)]);
  let q;
  void 0x0 !== y ? N['draw'](y, !0x0) : N[T(0x134)]?.();
  try {
    q = N['read']();
  } catch (M) {
    q = Promise['reject'](M);
  }
  if (!q) return void 0x0 === y && E() && N['failed']?.(null), Promise['resolve']();
  const b = q[T(0x13d)](l => {
    const k = T;
    N['cache'][k(0x13a)](N['key'], l), E() && (void 0x0 !== y && S(y, l) || N[k(0x12e)](l, !0x1));
  }, l => {
    const g = T;
    void 0x0 === y && E() && N[g(0x132)]?.(l);
  })['catch'](l => console['error'](T(0x131), l));
  return void 0x0 !== y ? Promise['resolve']() : b;
}
function r(N, E) {
  N = N - 0x12d;
  const e = a();
  let s = e[N];
  return s;
}
export { e as n, i as r, t };

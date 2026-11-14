const l = r;
(function (N, E) {
  const b = r,
    S = N();
  while (!![]) {
    try {
      const y = -parseInt(b(0x1aa)) / 0x1 + parseInt(b(0x1a9)) / 0x2 * (-parseInt(b(0x1a7)) / 0x3) + parseInt(b(0x19b)) / 0x4 * (parseInt(b(0x1ab)) / 0x5) + -parseInt(b(0x1a3)) / 0x6 + -parseInt(b(0x1a4)) / 0x7 + -parseInt(b(0x1a6)) / 0x8 * (parseInt(b(0x1a1)) / 0x9) + parseInt(b(0x1a5)) / 0xa;
      if (y === E) break;else S['push'](S['shift']());
    } catch (q) {
      S['push'](S['shift']());
    }
  }
})(a, 0x83e60);
var t = new WeakMap();
function s(N, E) {
  const M = r;
  let S = t['get'](N);
  S || t[M(0x1a2)](N, S = new Map());
  let y = S[M(0x196)](E);
  return y || S['set'](E, y = new e(N, E)), y;
}
function a() {
  const T = ['some', 'setAuth', 'get', 'add', 'userId', 'listeners', 'open', '762236RQEbsc', 'error', 'values', 'emit', 'then', '\x20failed:', '2250hsbkgg', 'set', '968700Niondk', '6227186WmZvlX', '17316740vjmPre', '25288SwnMwV', '449760ajTGii', 'channel', '4eKiFzf', '3075xwIUet', '25bdfXVn', 'close'];
  a = function () {
    return T;
  };
  return a();
}
var e = class {
  ['sb'];
  ['userId'];
  [l(0x199)] = new Map();
  [l(0x1a8)] = null;
  constructor(N, E) {
    this['sb'] = N, this['userId'] = E;
  }
  ['on'](N, E) {
    const D = l;
    let S = this['listeners'][D(0x196)](N);
    return S || this['listeners'][D(0x1a2)](N, S = new Set()), S[D(0x197)](E), this[D(0x19a)](), () => {
      const Z = D;
      S['delete'](E), [...this[Z(0x199)][Z(0x19d)]()][Z(0x1ad)](y => y['size'] > 0x0) || this['close']();
    };
  }
  ['emit'](N, E) {
    const W = l,
      S = E && 'object' == typeof E ? E : {};
    for (const y of this['listeners'][W(0x196)](N) ?? []) try {
      y(S);
    } catch (q) {
      console[W(0x19c)]('user\x20event\x20' + N + W(0x1a0), q);
    }
  }
  ['open']() {
    const B = l;
    if (this[B(0x1a8)]) return;
    const N = this['sb']['channel']('user:' + this[B(0x198)], {
      'config': {
        'private': !0x0
      }
    });
    N['on']('broadcast', {
      'event': '*'
    }, S => {
      const m = B;
      S['event'] && this[m(0x19e)](S['event'], S['payload']);
    }), this[B(0x1a8)] = N;
    const E = this['sb']['realtime'];
    Promise['resolve'](E?.[B(0x195)]?.())['catch'](() => {})[B(0x19f)](() => {
      this['channel'] === N && N['subscribe']();
    });
  }
  [l(0x1ac)]() {
    const C = l,
      N = this['channel'];
    this[C(0x1a8)] = null, N && this['sb']['removeChannel'](N);
  }
};
function r(N, E) {
  N = N - 0x195;
  const e = a();
  let s = e[N];
  return s;
}
export { s as t };

const w = E;
(function (S, q) {
  const X = E,
    M = S();
  while (!![]) {
    try {
      const D = -parseInt(X(0x16f)) / 0x1 * (parseInt(X(0x16c)) / 0x2) + -parseInt(X(0x176)) / 0x3 + parseInt(X(0x167)) / 0x4 + -parseInt(X(0x179)) / 0x5 + -parseInt(X(0x166)) / 0x6 + -parseInt(X(0x159)) / 0x7 + parseInt(X(0x180)) / 0x8;
      if (D === q) break;else M['push'](M['shift']());
    } catch (Z) {
      M['push'](M['shift']());
    }
  }
})(N, 0x3cf0d);
var n = /^[\p{L}\p{N}][\p{L}\p{N} ._\-@#'()+&!?,]*$/u;
function e(S) {
  const Y = E;
  return Y(0x153) != typeof S || function (q) {
    const v = Y;
    if (null == q) return null;
    if ('string' != typeof q) return 'The\x20shown\x20name\x20must\x20be\x20text.';
    const M = q['trim']()[v(0x150)](/\s+/g, '\x20');
    return M ? [...M][v(0x172)] > 0x20 ? 'The\x20shown\x20name\x20is\x20too\x20long\x20(max\x2032).' : n['test'](M) ? null : 'The\x20shown\x20name\x20may\x20only\x20contain\x20letters,\x20digits,\x20spaces\x20and\x20.\x20_\x20-\x20@\x20#\x20\x27\x20(\x20)\x20+\x20&\x20!\x20?\x20,\x20and\x20must\x20start\x20with\x20a\x20letter\x20or\x20digit.' : null;
  }(S) ? null : S[Y(0x15d)]()['replace'](/\s+/g, '\x20') || null;
}
var t = w(0x17c);
function a(S, q = Date['now']()) {
  const A = w;
  let M = S;
  if ('string' == typeof M) try {
    M = JSON['parse'](M);
  } catch {
    return null;
  }
  if (!M || 'object' != typeof M) return null;
  const D = M;
  if (!0x0 !== D[A(0x17c)]) return null;
  const Z = D['expires_at'] ?? D['expiresAt'] ?? null,
    W = 'number' == typeof Z ? Z : 'string' == typeof Z && Z ? Date[A(0x171)](Z) : null;
  if (null !== W && (!Number[A(0x182)](W) || W <= q)) return null;
  const B = e(D['by'] ?? D[A(0x16a)]);
  return {
    'reason': 'string' == typeof D[A(0x163)] && D[A(0x163)][A(0x15d)]() ? D[A(0x163)][A(0x15d)]() : 'Break\x20Rules',
    'expiresAt': W,
    'scope': 'ip' === D['scope'] ? 'ip' : 'device' === D['scope'] ? A(0x15f) : 'account',
    ...(B ? {
      'bannedBy': B
    } : {})
  };
}
function o(S, q = Date[w(0x158)]()) {
  const P = w;
  if (!S) return null;
  const M = P(0x153) == typeof S ? S : S[P(0x17b)];
  if (P(0x153) != typeof M) return null;
  const D = M['indexOf'](P(0x17e));
  return D >= 0x0 ? a(M['slice'](D + 0x7), q) : P(0x177) === M && 'object' == typeof S ? a(S[P(0x14d)] ?? S['detail'], q) ?? {
    'reason': 'Break\x20Rules',
    'expiresAt': null,
    'scope': P(0x178)
  } : null;
}
function N() {
  const I = ['2478625SZajBq', 'Break\x20Rules', 'message', 'banned', 'scope', 'BANNED:', '</noparse>', '13152192jGLxFD', 'This\x20device\x20has\x20been\x20banned\x20by\x20the\x20KBI\x20(Kour\x20Bureau\x20of\x20Investigation)', 'isFinite', 'You\x20will\x20probably\x20never\x20gain\x20access\x20from\x20this\x20IP\x20ever\x20back\x20again.', 'numeric', 'details', 'slice', '2-digit', 'replace', 'expiresAt', 'Ban:\x20', 'string', 'join', 'reach\x20us\x20out\x20on\x20<link=\x22', 'Your\x20account\x20has\x20been\x20banned\x20by\x20the\x20KBI\x20(Kour\x20Bureau\x20of\x20Investigation)', 'toLocaleString', 'now', '2131808PHfzVZ', 'Reason:\x20', 'rpc', 'You\x20will\x20probably\x20never\x20gain\x20access\x20to\x20this\x20account\x20ever\x20\x20back\x20again.', 'trim', 'Why\x20I\x20think\x20this\x20ban\x20is\x20a\x20mistake:', 'device', 'Seen:\x20', 'UID:\x20<link=\x22uid\x22>', 'uid', 'reason', 'An\x20Admin', 'Name:\x20', '518346WhSGDd', '334956PPERzC', 'Ban\x20appeal', 'push', 'bannedBy', 'json', '1698ESMLGa', 'name', 'contact', '514LIGcKE', 'code', 'parse', 'length', 'en-GB', 'UID:\x20', 'You\x20will\x20probably\x20never\x20gain\x20access\x20from\x20this\x20device\x20ever\x20back\x20again.', '465312iCoHup', 'BANNED', 'account'];
  N = function () {
    return I;
  };
  return N();
}
function r(S, q) {
  const x = w;
  return null === S['expiresAt'] ? 'Permanent' : 'Banned\x20until\x20' + function (M, D) {
    const R = E;
    return new Date(M)[R(0x157)](D ?? R(0x173), {
      'day': R(0x14c),
      'month': 'short',
      'year': R(0x14c),
      'hour': R(0x14f),
      'minute': R(0x14f)
    });
  }(S[x(0x151)], q);
}
var i = w(0x16e),
  u = S => '<noparse>' + S['replace'](/<\/?noparse>/gi, '') + w(0x17f);
function s(S, q = null, M) {
  const K = w,
    D = 'ip' === S['scope'],
    Z = K(0x15f) === S[K(0x17d)],
    W = S[K(0x163)] || 'Break\x20Rules',
    B = e(S[K(0x16a)]),
    m = D ? 'Your\x20IP\x20has\x20been\x20banned\x20by\x20the\x20KBI\x20(Kour\x20Bureau\x20of\x20Investigation)' : Z ? K(0x181) : K(0x156),
    C = [m + '<size=70%>'];
  q?.['name'] && C[K(0x169)](K(0x165) + q[K(0x16d)]), q?.['uid'] && C['push'](K(0x161) + u(q[K(0x162)]) + '</link>'), C['push']('Think\x20we\x20made\x20a\x20mistake?', K(0x155) + i + '\x22><color=blue><u>our\x20Discord</color></u></link>', 'Ban\x20Reason:\x20`' + u(W) + '`', 'Banned\x20By:\x20' + (B ? u(B) : K(0x164)));
  const T = !D && !Z,
    k = null === S['expiresAt'] ? D ? K(0x183) : Z ? K(0x175) : K(0x15c) : r(S, M) + '.';
  return {
    'title': m,
    'reason': W,
    'until': r(S, M),
    'main': C[K(0x154)]('\x0a'),
    'bottom': T ? k + '\x20Please\x20click\x20<color=blue><u>HERE</color></u>\x20to\x20logout' : k,
    'canLogOut': T
  };
}
function c(S, q = null, M = Date['now'](), D) {
  const O = w,
    Z = [O(0x168)];
  return q?.[O(0x16d)] && Z['push'](O(0x165) + q['name']['replace'](/<[^>]*>/g, '')['trim']()), q?.[O(0x162)] && Z[O(0x169)](O(0x174) + q[O(0x162)]), Z[O(0x169)](O(0x152) + ('ip' === S['scope'] ? 'IP\x20address' : O(0x15f) === S['scope'] ? 'device' : O(0x178)), O(0x15a) + (S[O(0x163)] || O(0x17a)), 'Until:\x20' + r(S, D), O(0x160) + new Date(M)['toISOString']()[O(0x14e)](0x0, 0x10)['replace']('T', '\x20') + '\x20UTC', '', O(0x15e), ''), Z[O(0x154)]('\x0a');
}
function l(S) {
  const q = o(S);
  if (q) return q;
  throw new Error(S['message']);
}
function E(a, r) {
  a = a - 0x14c;
  const e = N();
  let s = e[a];
  return s;
}
async function f(S) {
  const {
    data: q,
    error: M
  } = await S['rpc']('get_ban_status');
  return M ? l(M) : a(q);
}
async function d(S, q) {
  const F = w,
    {
      data: M,
      error: D
    } = await S[F(0x15b)]('touch_session', {
      'p_kind': q
    });
  return D ? l(D) : a(M);
}
async function p(S, q, M) {
  const G = w,
    {
      data: D,
      error: Z
    } = await S['rpc']('touch_device', {
      'p_device': q,
      'p_kind': M
    });
  return Z ? (W => 'PGRST202' === W[G(0x170)] || /could not find the function/i['test'](W['message']))(Z) ? void 0x0 : l(Z) : a(D);
}
var h = new Set();
function b(S) {
  return h['add'](S), () => {
    h['delete'](S);
  };
}
function y(S) {
  for (const q of h) q(S);
}
function g(S = (...q) => fetch(...q)) {
  return async (q, M) => {
    const J = E,
      D = await S(q, M);
    if (D['status'] >= 0x190 && D['status'] < 0x1f4) try {
      const Z = await D['clone']()[J(0x16b)]();
      if ('BANNED' === Z?.[J(0x17b)]) {
        const W = o(Z);
        W && y(W);
      }
    } catch {}
    return D;
  };
}
export { p as a, t as c, a as d, s as f, y as i, c as l, f as n, d as o, b as r, i as s, g as t, o as u };

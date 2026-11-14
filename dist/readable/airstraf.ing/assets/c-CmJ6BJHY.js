const __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f || (m.f = ["assets/three-Bi9Yyrpt.js", "assets/c-BJ87Xak5.js"])) => i.map(item => d[item]);
import { $ as A, Et as t, P as s, Tt as n, V as e, W as B, X as o, Z as i, at as r, f as w, ht as f, lt as a, ot as g, r as c, t as Q, ut as h } from "./c-CwMHWVDn.js";
import { t as l } from "./c-D7DrHuA8.js";
import { At as C, Br as Vector4, Ct as LinearFilter, Dr as Uint16BufferAttribute, Dt as LinearSRGBColorSpace, Ft as Matrix4, H as P, It as Mesh, J as Float32BufferAttribute, Lt as MeshBasicMaterial, Mt as MathUtils, Or as Uint32BufferAttribute, Pt as Matrix3, Rr as Vector2, T as Color, W as Euler, Xt as Object3D, Yt as NearestMipmapNearestFilter, Z as Frustum, _ as BufferAttribute, et as Group, f as AnimationMixer, g as BoxGeometry, gr as Sphere, h as Box3, hr as SkinnedMesh, mr as Skeleton, nn as PlaneGeometry, on as PropertyBinding, qt as NearestFilter, sn as Quaternion, v as BufferGeometry, w as ClampToEdgeWrapping, x as CanvasTexture, zr as Vector3 } from "./three-Bi9Yyrpt.js";
import { s as _ } from "./c-D-fVO02v.js";
import { d as $, n as AA, r as tA, s as sA } from "./c-Caw4SzGP.js";
import { a as nA, l as eA, r as BA, u as oA } from "./c-e0fQXfDh.js";
import { u as iA } from "./c-DTYKuKMs.js";
import { s as rA } from "./c-Br-l5PAG.js";
import { n as wA } from "./c-C1mpvyXQ.js";
import { t as fA } from "./c-BE9ZXeD7.js";
import { _ as aA, h as gA, i as cA, m as QA, p as hA, y as lA } from "./c-j2W5q53j.js";
import { C as CA, Et as HA, Mt as uA, Q as EA, S as FA, T as DA, Tt as PA, _t as dA, c as MA, ht as kA, jt as bA, m as IA, mt as GA, n as UA, o as vA, p as pA, s as mA, u as YA, ut as TA, v as LA, w as JA, yt as RA } from "./c-DHGnaUyg.js";
import { C as OA, E as VA, T as yA, a as jA, d as xA, f as zA, h as XA, i as WA, n as SA, o as ZA, r as NA, u as KA } from "./c-B0EPN0fS.js";
var qA = A => w[A];
function _A(A, t) {
  if (A.beam) return 0;
  let n = t.aimed && A.aim ? A.aim.instability : A.instability;
  const e = t.crouching && (t.grounded || !t.tucked);
  e && (n *= .7);
  const B = (n > 1 ? 20 * (n - 1) : 0) + n * (3 * f(A.kind, t.speed) + A.staticInstabilityAdd + (t.grounded ? 0 : (10 * Math.abs(Math.sin(t.time)) + 15) * g(A.kind)) + 5 * t.recoil) + function (A, t) {
    return "Sniper" !== A.kind || t.aimed || t.grounded && t.crouching && t.speed < i.stillSpeed ? 0 : i.spread + (t.grounded ? 0 : i.airSpread);
  }(A, t) + r(A, t.aimed) + a(A, !!t.fan) + $A(A, t.aimed, e);
  return t.aimed && A.aim ? B * s : B;
}
function $A(A, t, s) {
  if (t && A.aim) return 0;
  const n = h(A.id);
  return s ? .7 * n : n;
}
var At = A => A + 30;
function tt(A, t, s, n = new Vector3()) {
  const e = () => (2 * s() - 1) * t * 5e-4;
  return n.set(A.x + e(), A.y + e(), A.z + e());
}
function st(A, t) {
  return A.shells ? Math.max(0, Math.ceil((A.magazine - Math.max(0, t)) / A.shells.rounds)) : 0;
}
function nt(A, t) {
  const s = st(A, t);
  return A.shells && !A.shells.loop ? Math.min(A.shells.inserts, s) : s;
}
var et = {
  speed: 90,
  slowTo: .60122,
  slowTime: .35,
  radius: 6.8,
  lifetime: 10,
  hitRadius: .55
};
function Bt(A) {
  const t = et.slowTime;
  if (A >= t) return et.speed * et.slowTo;
  const s = Math.max(0, A) / t,
    n = s * s,
    e = n * s;
  return et.speed * (1 * (2 * e - 3 * n + 1) + (e - 2 * n + s) * t * -1.16141 + (-2 * e + 3 * n) * et.slowTo + (e - n) * t * -1.13219);
}
var ot = {
    impulse: 111.8,
    up: .26,
    mass: 2,
    drag: .2,
    radius: .17,
    bounciness: .15,
    gravity: -29.43,
    fuse: [2, 1.4, 3.5, 5],
    fragDamage: 160,
    fragRadius: 14,
    flashRadius: 88
  },
  it = {
    interval: .33,
    minDamage: 14,
    maxDamage: 21,
    duration: 11.1,
    halfX: 5.08,
    halfZ: 4.75,
    below: 2.46,
    above: 4.36
  },
  rt = {
    force: 550,
    up: .2,
    mass: 100,
    boost: A
  },
  wt = class {
    current = new Vector3();
    target = new Vector3();
    returnSpeed = 3;
    crosshairMulti = 0;
    landing = 0;
    wasGrounded = !0;
    fire(A, t = 1.5, s = Math.random) {
      const n = function (A, t, s) {
        const n = A.recoilPhysical * t;
        return [-1.5 * n, n * (2 * s() - 1) * .7, n * (2 * s() - 1) * .2];
      }(A, t, s);
      return this.apply(4 * A.recoilCrosshair, A.recoilReturnSpeed, n), n;
    }
    apply(A, t, s) {
      this.crosshairMulti = .65 * A, this.returnSpeed = 3 * t, this.target.x += s[0] ?? 0, this.target.y += s[1] ?? 0, this.target.z += s[2] ?? 0;
    }
    step(A, t) {
      t && !this.wasGrounded && (this.landing = 3), this.wasGrounded = t, this.landing > 0 ? (this.target.x += .8, this.landing--) : this.target.lerp(ft, at(this.returnSpeed * A)), function (A, t, s) {
        s = at(s);
        const n = A.length(),
          e = t.length();
        if (n < 1e-6 || e < 1e-6) return void A.lerp(t, s);
        const B = A.clone().divideScalar(n),
          o = t.clone().divideScalar(e),
          i = Math.min(1, Math.max(-1, B.dot(o))),
          r = Math.acos(i) * s,
          w = o.sub(B.clone().multiplyScalar(i));
        w.lengthSq() > 1e-12 && w.normalize();
        const f = B.multiplyScalar(Math.cos(r)).add(w.multiplyScalar(Math.sin(r)));
        A.copy(f.multiplyScalar(n + (e - n) * s));
      }(this.current, this.target, 50 * A);
    }
    get value() {
      return Math.abs(this.current.x) * this.crosshairMulti;
    }
    save(A) {
      return A.cx = this.current.x, A.cy = this.current.y, A.cz = this.current.z, A.tx = this.target.x, A.ty = this.target.y, A.tz = this.target.z, A.returnSpeed = this.returnSpeed, A.crosshairMulti = this.crosshairMulti, A.landing = this.landing, A.wasGrounded = this.wasGrounded, A;
    }
    load(A) {
      return this.current.set(A.cx, A.cy, A.cz), this.target.set(A.tx, A.ty, A.tz), this.returnSpeed = A.returnSpeed, this.crosshairMulti = A.crosshairMulti, this.landing = A.landing, this.wasGrounded = A.wasGrounded, this;
    }
  },
  ft = new Vector3(),
  at = A => Math.min(1, Math.max(0, A)),
  gt = new Quaternion(),
  ct = new Quaternion(),
  Qt = new Euler();
function ht(A, t, s = 0, n = 0, e = new Vector3()) {
  return gt.setFromEuler(Qt.set(t, A, 0, "YXZ")), ct.setFromEuler(Qt.set(-s * Math.PI / 180, -n * Math.PI / 180, 0, "YXZ")), e.set(0, 0, -1).applyQuaternion(gt.multiply(ct));
}
function lt(A, t, s, n, e, B) {
  const o = t.x - A.x,
    i = t.y - A.y,
    r = t.z - A.z,
    w = e - n,
    f = A.x - s,
    a = A.y - n,
    g = A.z - B,
    c = o * o + i * i + r * r,
    Q = w * w,
    h = w * a;
  let l = 0,
    C = 0;
  if (c <= 1e-9 && Q <= 1e-9) return f * f + a * a + g * g;
  if (c <= 1e-9) C = Math.min(1, Math.max(0, h / Q));else {
    const A = o * f + i * a + r * g;
    if (Q <= 1e-9) l = Math.min(1, Math.max(0, -A / c));else {
      const t = i * w,
        s = c * Q - t * t;
      l = s > 1e-9 ? Math.min(1, Math.max(0, (t * h - A * Q) / s)) : 0, C = (t * l + h) / Q, C < 0 ? (C = 0, l = Math.min(1, Math.max(0, -A / c))) : C > 1 && (C = 1, l = Math.min(1, Math.max(0, (t - A) / c)));
    }
  }
  const H = A.x + o * l - s,
    u = A.y + i * l - (n + w * C),
    E = A.z + r * l - B;
  return H * H + u * u + E * E;
}
function Ct(A, t, s) {
  return (t - A >= 0 && t - A < .03333333333333333 ? A : t) + s;
}
var Ht = ["shootAt", "switchUntil", "fireHeld", "burstLeft", "burstAt", "ammo", "reserve", "reloadUntil", "shots"];
function ut(A, t = {}) {
  for (const s of Ht) t[s] = A[s];
  return t;
}
function Et(A, t) {
  const s = t.magazine - Math.max(0, A.ammo);
  return A.reserve < 0 ? s : Math.max(0, Math.min(s, A.reserve));
}
function Ft(A, t, s) {
  if (A.reloadUntil <= 0 || s < A.reloadUntil) return !1;
  const n = Et(A, t),
    e = t.shells ? Math.min(t.shells.rounds, n) : n;
  return A.ammo = Math.max(0, A.ammo) + e, A.reserve >= 0 && (A.reserve -= e), t.shells && e > 0 ? A.reloadUntil += Et(A, t) > 0 ? t.shells.per : t.shells.tail : A.reloadUntil = 0, !0;
}
function Dt(A, t) {
  return function (A, t) {
    if (A.shells) {
      const s = st(A, t);
      return s > 0 ? A.shells.first + (s - 1) * A.shells.per + A.shells.tail : 0;
    }
    let s = A.reload;
    for (let n = 0; n < A.magazine - t; n++) s += A.bulletAddReloadTimes[n] ?? 0;
    return s;
  }(t, t.magazine - Et(A, t));
}
function Pt(A, t, s, n = !1) {
  return !(t.magazine < 0 || A.reloadUntil || A.ammo >= t.magazine || Et(A, t) <= 0 || (A.reloadUntil = s + (t.shells ? t.shells.first : Dt(A, t)), A.burstAt = -1, n && (A.fireHeld = !0), A.tapUntil && (A.tapUntil = 0), 0));
}
function dt(A, t) {
  return !(t.magazine <= 0 || "Grenade" === t.kind || "Bomb" === t.kind) && A.ammo <= 0 && !A.reloadUntil && Et(A, t) > 0;
}
function Mt(A, t, s, n, e) {
  const B = !s && !t.automatic && (A.tapUntil ?? 0) > n - 1e-9;
  if (!s && !B) return A.fireHeld = !1, A.tapUntil && (A.tapUntil = 0), !1;
  const o = B || !A.fireHeld,
    i = e && n >= A.switchUntil;
  return o && i && A.reloadUntil && A.ammo > 0 && (A => "Shotgun" === A.kind)(t) && (A.reloadUntil = 0), !i || A.reloadUntil || n < A.shootAt ? (s && o && !t.automatic && (A.tapUntil = n + .12), !1) : (A.tapUntil && (A.tapUntil = 0), !!B || (A.fireHeld = !0, t.automatic || o));
}
function kt(A, t) {
  return A.burstAt < 0 || t < A.burstAt ? null : (A.burstAt = -1, A.burstLeft);
}
function bt(A, t, s) {
  return !(!A.heavy && !A.fan) && s && !t;
}
function It(A, t, s, n, e, B) {
  return B && bt(t, s, n) && e >= A.shootAt;
}
function Gt(A, t, s, n, e = A.shootAt) {
  return s < A.switchUntil || A.reloadUntil ? "blocked" : t.magazine >= 0 && A.ammo <= 0 ? "empty" : (t.magazine >= 0 && A.ammo--, A.shootAt = Ct(e, s, 1 / t.fireRate), A.shots++, t.burst && n >= 0 && (A.burstLeft = n - 1, A.burstAt = Ct(e, s, 1 / t.burst.rate)), "fired");
}
function Ut(A, t, s) {
  const n = A.shootAt,
    e = Gt(A, t, s, -1),
    B = t.heavy?.fireRate ?? t.fan?.fireRate;
  return "fired" === e && B && (A.shootAt = Ct(n, s, 1 / B)), e;
}
var vt = (A, t) => t && A.fan ? A.fan.kick : 1;
function pt(A, t) {
  let s = (A ^ Math.imul(t + 1, 2654435761)) >>> 0;
  return () => {
    s = s + 1831565813 | 0;
    let A = Math.imul(s ^ s >>> 15, 1 | s);
    return A = A + Math.imul(A ^ A >>> 7, 61 | A) ^ A, ((A ^ A >>> 14) >>> 0) / 4294967296;
  };
}
function mt(A, t, s, n) {
  const e = ((A, t) => (t ? A.heavy?.windup : A.windup) ?? 0)(t, n);
  return !(e <= 0 || (A.strike = n ? -(s + e) : s + e, 0));
}
function Yt(A, t) {
  const s = A.strike ?? 0;
  return !s || t < Math.abs(s) - 1e-9 ? null : (A.strike = 0, s < 0 ? "heavy" : "light");
}
var Tt = [{
    name: "head",
    zone: "head",
    bone: "Head",
    half: [.2189, .2296, .2736]
  }, {
    name: "chest",
    zone: "body",
    bone: "Spine_02",
    half: [.3838, .3586, .2139]
  }, {
    name: "pelvis",
    zone: "body",
    bone: "Spine_01",
    half: [.3712, .2204, .2173]
  }, {
    name: "upperArmL",
    zone: "body",
    bone: "Shoulder_L",
    half: [.2543, .1263, .123]
  }, {
    name: "upperArmR",
    zone: "body",
    bone: "Shoulder_R",
    half: [.2543, .1263, .123]
  }, {
    name: "forearmL",
    zone: "body",
    bone: "Elbow_L",
    half: [.2791, .137, .0953]
  }, {
    name: "forearmR",
    zone: "body",
    bone: "Elbow_R",
    half: [.2537, .1049, .1345]
  }, {
    name: "thighL",
    zone: "legs",
    bone: "UpperLeg_L",
    half: [.3332, .2044, .185]
  }, {
    name: "thighR",
    zone: "legs",
    bone: "UpperLeg_R",
    half: [.3332, .2044, .185]
  }, {
    name: "shinL",
    zone: "legs",
    bone: "LowerLeg_L",
    half: [.3207, .2738, .1988]
  }, {
    name: "shinR",
    zone: "legs",
    bone: "LowerLeg_R",
    half: [.3207, .2738, .1988]
  }],
  Lt = [0, 3, 4, 5, 6],
  Jt = [3, 4, 5, 6],
  Rt = {
    deagle: 1,
    bayonet: 2,
    revolver: 1,
    usps: 1,
    glock: 1,
    karambit: 2,
    knife: 2,
    vector: 1,
    tec9: 1,
    beretta: 1,
    cz: 1,
    butterfly: 2,
    bomb: 3,
    smoke: 4,
    molotov: 4,
    grenade: 4,
    flashbang: 4,
    glizzy: 2,
    axe: 2,
    fists: 2,
    dualpistols: 1,
    flag: 1
  },
  Ot = [-90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
  Vt = {
    idle: "AAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj1E/9AD3/8pAbb/RKRBWbwA0APf/7+mRKRKACkBV/85ARoA+ED3wYm+eT+sADoBIAAcwPC+7D4aQA==",
    crouch: "AADzB94AyQwAAAAAW3///7YFWQDJDAAAAABbf///rAMBAMkMAAAAAFt/2v6dBaYBhNeLOm9H1E4bAVsF3gBNU7awHTj2Aof/YwVqA+XRkFx7QXElkgBRBQMCzQmg6LNt4Tzv/vEB+f9xAc/r1Jj/SLQArgLgACdF+UbWx2Q6Af+ZAPH+EphX+UpKRQSLACcBiwLEtam6ujolMw==",
    lean: "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",
    crouchLean: "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",
    jump: "AAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj1E/9AD3/8pAbb/RKRBWbwA0APf/7+mRKRKACkBV/85ARoA+ED3wYm+eT+sADoBIAAcwPC+7D4aQAAAvwnk/wAAAAAAAP9///9zB9T/AAAAAAAA/3///2IF5f8AAAAAAAD/f9r+nQcfAdjPY0E6QWRKGwE0B2gAllK3tsE/RQuH/78H5QJjzqRi6DemIJIAZQeJAasDs/N9b449Of+JAwcAAAdL6D6lzlbAAIYD+P+0p8KkWQ8UBTz/9wATALhQj8h6u88tuQDtAAsApstZufI3TUoAAJoJ5P8AAAAAAAD/f///TgfU/wAAAAAAAP9///89BeX/AAAAAAAA/3/a/ncHHwHYz2NBOkFkShsBDwdoAJZSt7bBP0ULh/+ZB+UCY86kYug3piCSAD8HiQGrA7PzfW+OPTT/agMiANEB/uOdpSxW4QCCA1UAI1IjWsTZFgc4/+0AHABrVAzPqbdWKOoAUQEuAJzlFrMiJZxbAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj1F/9AD1/93Dwnwd6W1VwcBPASeAPdGOliAyVoYRf85AR8AoEauuw7FCDk4AY0CoQDB8Q2zbiD0XwAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449Qf/WA6v/xBbV9uOjalUOAXQEvwC2P3tWE8UOJTj/PAGH/8lK57+cv1syYgH8AusA4fOzsXMlSV0AAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPTf/3gOQ/0obpfr+oUtSDwF6BMEAxT5oVtrEcyYY/04BGf/NTXfDvbo4K2cBCQPwAF30hLEeJu1cAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0s/+YDgv+1HVT8GqBPTxQBagS2AAxAnVc3xechAP9yAaL+xVMYzJu0ax9hAfQCzgBC9rGylyJ5XwAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449Iv/rA3v/vh7//Gme2UwaAVMEpADPQUZZI8YbG/H+qgFC/g5ZOdZKsMgSVAHZApkARPl/tDkd6WIAAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPRv/7gN6/9Me5/xqnYdLHgE4BIsAikP8WofHzhLr/tEBGP6RW1fcw65GCz8BvwJWAAr9A7e2Fp9mAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0Z/+4DfP96Hlj8GZ06SyABIQRvALhEIVybyDoK6P7WARj+7FsK3bKuCAokAa4CFgCNAF66RxAoagAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449GP/rA4T/RR3G+gOdgEsfAQ8EUwBqRWhdycrhAuT+xwEy/opbTds9r5ULDQGmAtj/lwT1vJAKbGwAAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPRj/5wOP/4MbhfgMnQVMHAEBBDgAMbofofgxUQPh/rUBV/4uW17ZDLCPDfkApgKb/yMJsb5vBZFtAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0X/+MDnf9dGbL1P52wTBkB9wMfAAu6eZ/fLTAI4P6gAYX+vloN1yyxEBDtAK4CYf/7DYO/EAGsbQAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449F//fA6z/Ixek8padXE0XAfEDCAAVutmdaSkXDOD+jQG3/kdao9SFsrUS5QC8Aiv/yhLPv0z9GW0AAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPRf/3QO7/x8VlO8Nnu5NFQHtA/T/QrpanPsk5A7h/n0B6P7gWVPSCrQvFeMAzQL+/jgXn79P+gRsAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0X/9sDx/9/E+7sh55YThQB7APk/366GJvsIOUQ4v5yARP/jFlg0HW1OhfkAN8C2f4QGzm/9ve5agAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449F//bA8//dBJs69Oelk4UAewD2f+wujGazx0HEuL+bAEs/0ZZQs9AtncY6ADtAsD+2h25vmn2imkAAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPRf/2gPS/9sRwur2nrdOFAHtA9P/xrqqmdEbjxLh/moBOf8RWbzOkbYdGesA9gKy/ogfSL6E9bFoAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0X/9oD0v/AEfTq656+ThQB7QPT/7O6opmjG10S4f5qATj/91jUzmO2IxnsAPYCsv6SHw6+ivWKaAAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449F//bA9D//hGw68Wesk4UAewD2v9vuvaZ7BwsEeD+bAEu//NYUs/qtb4Y7QDuAsD+KR62vZL21mgAAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPRf/2wPL/5YS5+yJnpNOFAHsA+n/xrnamqMf0Q7g/nABHP8JWS7QMrXxF+4A3gLe/g8bFr2E+HBpAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0X/9wDxf9ME1fuSZ5sThMB7QP8//q4L5wgI+oL3/51AQf/I1k20V+0/hbuAMwCBf8DF3S86PojagAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449F//cA77/CRTq7wmeRE4RAe8DEQApuPSdICfUCN/+ewHx/jdZWdJ5s/0V6wC7AjP/URIGvHj93moAAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPRf/3QO4/8EUgPHOnRpODwHzAyUAdLf8ny8r/gXe/oIB2/5DWX/TlLL/FOYArQJi/4gN7bvf/4xrAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0X/94Dsv9lFfrynZ3yTQ0B+AM4ALe2GqK9LkkD3f6IAcf+SFmT1MKxGBThAKQCjv8BCcO79QHmawAACgrk/wAAAAAAAP9///++B9T/AAAAAAAA/3///60F5f8AAAAAAAD/f9r+6AcfAdjPY0E6QWRKGwF/B2gAllK3tsE/RQuH/woI5QJjzqRi6DemIJIAsAeJAasDs/N9b449F//fA63/7xVF9Had0E0KAf0DRwAgtvyjkzHPANz+jgG2/khZhdULsVIT3ACfArT/KwWGu8UD82sAAAoK5P8AAAAAAAD/f///vgfU/wAAAAAAAP9///+tBeX/AAAAAAAA/3/a/ugHHwHYz2NBOkFkShsBfwdoAJZSt7bBP0ULh/8KCOUCY86kYug3piCSALAHiQGrA7PzfW+OPRf/4AOq/0wWM/VdnbhNCAEBBFIAR0qoWo/MBwHc/pMBqf5EWTTWiLDIEtkAngLP/34CSbsPBddrAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj0X/+ADqP99Fr71UZ2tTQcBBARYAIBK3VmIyxQC3P6VAaP+Plma1juwfhLYAJ0C3v/7ACW7xwW9awAAmgnk/wAAAAAAAP9///9OB9T/AAAAAAAA/3///z0F5f8AAAAAAAD/f9r+dwcfAdjPY0E6QWRKGwEPB2gAllK3tsE/RQuH/5kH5QJjzqRi6DemIJIAPweJAasDs/N9b449NP9pAx4AlQKr5GSlIlbIAGcDFwACqQilLhegATj/7AANAMxUnM9St5wnxgDiAAkAYdXOtRsxjFEAAL8J5P8AAAAAAAD/f///cwfU/wAAAAAAAP9///9iBeX/AAAAAAAA/3/a/p0HHwHYz2NBOkFkShsBNAdoAJZSt7bBP0ULh/+/B+UCY86kYug3piCSAGUHiQGrA7PzfW+OPTn/igMPAHkF7eaipfBW8QC9A3EAh059WaTSSww9//kAMQDgT4HHS7wwLwIBwQFPAPbrObO/IPFeAAAKCuT/AAAAAAAA/3///74H1P8AAAAAAAD/f///rQXl/wAAAAAAAP9/2v7oBx8B2M9jQTpBZEobAX8HaACWUre2wT9FC4f/CgjlAmPOpGLoN6YgkgCwB4kBqwOz831vjj1E/9EDx/9MEony/qQXVwwBUwStAPxDn1d0x8UdRP83Aeb/ZEhJvSfDrTZMAbsCwgCs8mqycSLeXg==",
    land: "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",
    landCrouch: "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",
    dances: ["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"],
    holds: [{
      lean: "5/5iCHD/va7pVqoV6SkbAUoIfv9uMkL552BeQon/XglP/yI1Rdq9ba0JkgBqCU3/EdcjRohXHy7n/kUIgP+zsrFUKB3VMBsBKwiK/wU41/DyX7g9if9DCYv/xjXZ0AlqAgWSAFAJjP8+2z4+T12DMef+Ngiq/0C31FFtJGI3GwEbCK//MD2J6EJemjiJ/y8J4f8BNsnHhWVOAJIAOwnk/7Pf3zVhYoc05/4kCND/WrxYTmwrhD0bAQgI0P/jQWng21sNM4n/DwkxACzK2UDEn2cEkgAbCTYAZuQYLbNmJDfn/hAI8f/5wUNKFTItQxsB9Afs/xZGhtjBWB4tif/mCHkAw8r9SMilFAmSAPEIgABP6fgjPWpXOef++gcYABDInUVdOFNIGwHgBw4AwEnw0PpU1iaJ/7YIxADCy5NQfayvDZIAvwjMAGXukxr4bBk75/7iBzoAlM5vQDg+7UwbAckHLADbTLbJjVBCIIn/fAgEASbNjFfUsy8SkgCECA4BnfP6EN9uaDzn/scHVwB51cU6mUPxUBsBsQdFAGBP5sKDS3AZif88CDgB7c7aXb+7jBaSAEIIRAHs+D8H7m9CPef+qgduALDcpzR2SFdUGwGYB1kASlGMvOZFbBKJ//YHYQEU0XFjMMS9GpIA+gdtAUr+d/0icKQ95/6NB4AALOQjLsZMGVcbAX8HaACWUre2wT9FC4n/rgd8AZbTR2gVzboekgCwB4kBqwOz831vjj3n/nEHjQDf60UngVAxWRsBaAdzAEFTcLEgOQcEif9mB4sBb9ZRbF3WeyKSAGUHmAEFCQjq/m0APef+VgeVALjzGyCfU5taGwFSB3kAtqw+U/HNPgOJ/x8HjQGZ2Ylv99/5JZIAHAeZAU0Oh+Coa/w75/4+B5gAqvuyGBpWVVsbAT4HfABQrUpXY9V9Con/3QaDAQ7d53HO6S0pkgDYBo8BehNE14Fogjrn/ikHmACkAxkR7VdcWxsBLQd9AIqurFoo3agRif+gBm8BxuBnc9HzECySAJkGeQGAGFDOj2SXOOf+FweVAJcLXgkUWbJaGwEgB3sAZLBdXTHlsRiJ/2sGUQG85Ad07P2eLpIAYgZaAVcdvcXYXz025/4JB5AAcxORAY9ZV1kbARcHeADYslhfbu2JH4n/PwYrAefoxHMLCNEwkgA1BjMB9CGbvWdaeTPn/v8GigApG8L5WllOVxsBEQd0AOO1mmDQ9SQmif8dBv8APu2gchoSpTKSABIGBQFQJvu1RVRSMOf+AweIAKsi/vF4WJtUGwEZB3YAfrkfYUX+dCyJ/xEG1QC78ZxwBhwWNJIABQbYAGAq666ATcws5/4LB4oA6SlW6ulWQ1EbASMHfACivedgvgZuMon/DgarAFP2vW27JSI1kgACBqwAHy54qCNG7yg=",
      crouchLean: "5/5qBhgAVbNQVD0e0TEbAU8GIQDOOJ3vv1//PIn/aAcqANU1f89saVIEkgB0ByoA4dsLPRle+jHn/ksGIgD3t1tReSVPOBsBLwYmAOg9Vef0XdA3if9BB2AA/8mCOTWbYwCSAE4HYwBg4Jw0D2PwNOf+NAZJACW9yE1rLGA+GwEYBkgAiUI833JbNDKJ/xwHsAA8yhNCmqAYBZIAKAe1ABvlxitFZ3435/4bBmoA1sKdSQgz90MbAf8FZACoRmTXPlg3LIn/7Qb4AOLKI0q5psIJkgD4Bv8ADOqbIrFqoDnn/gAGhgD+yONEQDkJSRsB5gV8AD5K289eVOMlif+3BjcB8MujUYetWg6SAMAGQAEn7y0ZTW1RO+f+4wWoAJHPoj8KP41NGwHLBZkAQ02vyNlPRh+J/3kGdgFizYNY9LTWEpIAgAaAAWP0jg8Ub5A85/7EBcUAg9bmOVhEelEbAa8FsgCyT/DBuUpsGIn/NAapATjPt170vC0XkgA5BrUBtfnRBQNwWD3n/qQF2wDF3bkzIUnJVBsBkgXGAIVRqbsIRWIRif/qBdABbdEzZHfFVhuSAO0F3AEU/wj8GHCoPef+gwXtAErlJy1cTXJXGwF2BdQAuVLntdA+NgqJ/54F6gH80+xobM5LH5IAnwX2AXUER/JSb4E95/5kBfkAA+09JgBRcVkbAVsF3gBNU7awHTj2Aon/UgX2AeHW2GzB1wMjkgBRBQMCzQmg6LNt4Tzn/kUFAAHh9AgfBlTBWhsBQQXkAMOs4VMDz08Eif8IBfYBFtrvb2XhdiaSAAUFAwIRDyffP2vMO+f+KgUCAdX8lxdpVmFbGwEqBeYAdK3UV4LWjAuJ/8IE6gGV3S1yROueKZIAvQT2ATkU7tX6Z0E65/4RBQEBzwT4DyNYTlsbARYF5QDGrhxbUt6zEon/gwTUAVfhjXNM9XYskgB8BN4BORkIzepjRTjn/vwE/ADADDoIMVmKWhsBBgXiALaws11j5rUZif9LBLMBVeULdGj/9y6SAEIEvAEIHoTEF1/cNef+6wT2AJcUbACSWRZZGwH5BN4AQbOTX6fuhSCJ/x0EiwGH6adzhgkcMZIAEwSTAZwidLyLWQkz5/7eBO4ARxyd+ERZ81YbAfEE2QBhtrlgDPcWJ4n/+gNdAeXtYnKRE+EykgDuA2MB7SbotFFT0y/n/tYE5gC/I93wSFgoVBsB7ATUABG6I2GD/1otif/hAywBZfI+cHYdRDSSANUDLwHyKu6tdExALOf+2wTlAPIqOumhVrhQGwHzBNgASb7PYPsHRjOJ/94DAAEB9z9tIidANZIA0QMBAaQulacDRVco5/7hBOgA0THD4VBUq0wbAfwE3wABw79fYxDOOIn/5APWAK77bGmBMNU1kgDXA9UA+jHnoQs9HyQ=",
      jump: "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",
      land: "5/6NB4AALOQjLsZMGVcbAX8HaACWUre2wT9FC4n/rgd8AZbTR2gVzboekgCwB4kBqwOz831vjj3n/n0HgAAs5CMuxkwZVxsBbwdoAJZSt7bBP0ULif+eB3wBltNHaBXNuh6SAKAHiQGrA7PzfW+OPef+EgeAACzkIy7GTBlXGwEEB2gAllK3tsE/RQuJ/zMHfAGW00doFc26HpIANQeJAasDs/N9b4495/6sBoAALOQjLsZMGVcbAZ4GaACWUre2wT9FC4n/zQZ8AZbTR2gVzboekgDPBokBqwOz831vjj3n/tIGgAAs5CMuxkwZVxsBxAZoAJZSt7bBP0ULif/zBnwBltNHaBXNuh6SAPUGiQGrA7PzfW+OPef+EweAACzkIy7GTBlXGwEFB2gAllK3tsE/RQuJ/zUHfAGW00doFc26HpIANgeJAasDs/N9b4495/5QB4AALOQjLsZMGVcbAUIHaACWUre2wT9FC4n/cQd8AZbTR2gVzboekgBzB4kBqwOz831vjj3n/nQHgAAs5CMuxkwZVxsBZgdoAJZSt7bBP0ULif+VB3wBltNHaBXNuh6SAJYHiQGrA7PzfW+OPef+hAeAACzkIy7GTBlXGwF2B2gAllK3tsE/RQuJ/6UHfAGW00doFc26HpIApgeJAasDs/N9b4495/6MB4AALOQjLsZMGVcbAX4HaACWUre2wT9FC4n/rQd8AZbTR2gVzboekgCvB4kBqwOz831vjj3n/o0HgAAs5CMuxkwZVxsBfwdoAJZSt7bBP0ULif+uB3wBltNHaBXNuh6SALAHiQGrA7PzfW+OPef+jQeAACzkIy7GTBlXGwF/B2gAllK3tsE/RQuJ/64HfAGW00doFc26HpIAsAeJAasDs/N9b4495/6NB4AALOQjLsZMGVcbAX8HaACWUre2wT9FC4n/rgd8AZbTR2gVzboekgCwB4kBqwOz831vjj3n/o0HgAAs5CMuxkwZVxsBfwdoAJZSt7bBP0ULif+uB3wBltNHaBXNuh6SALAHiQGrA7PzfW+OPef+jQeAACzkIy7GTBlXGwF/B2gAllK3tsE/RQuJ/64HfAGW00doFc26HpIAsAeJAasDs/N9b4495/6NB4AALOQjLsZMGVcbAX8HaACWUre2wT9FC4n/rgd8AZbTR2gVzboekgCwB4kBqwOz831vjj0=",
      landCrouch: "5/5kBfkAA+09JgBRcVkbAVsF3gBNU7awHTj2Aon/UgX2AeHW2GzB1wMjkgBRBQMCzQmg6LNt4Tzn/i0HkwB+5fksd02CVxsBIAd6AL9SwrWkPgUKif9HB5ABDtQJaarOZR+SAEgHnAGZBAXySm9+Pef+EQbKAH3paSlsT55YGwEGBrAAHlP+sjU7QQaJ/xMGyAGH1Spre9NbIZIAEwbVAWIH/OyKbjg95/5kBfkAA+09JgBRcVkbAVsF3gBNU7awHTj2Aon/UgX2AeHW2GzB1wMjkgBRBQMCzQmg6LNt4Tzn/mQF+QAD7T0mAFFxWRsBWwXeAE1TtrAdOPYCif9SBfYB4dbYbMHXAyOSAFEFAwLNCaDos23hPOf+ZAX5AAPtPSYAUXFZGwFbBd4ATVO2sB049gKJ/1IF9gHh1thswdcDI5IAUQUDAs0JoOizbeE85/5kBfkAA+09JgBRcVkbAVsF3gBNU7awHTj2Aon/UgX2AeHW2GzB1wMjkgBRBQMCzQmg6LNt4Tzn/mQF+QAD7T0mAFFxWRsBWwXeAE1TtrAdOPYCif9SBfYB4dbYbMHXAyOSAFEFAwLNCaDos23hPOf+ZAX5AAPtPSYAUXFZGwFbBd4ATVO2sB049gKJ/1IF9gHh1thswdcDI5IAUQUDAs0JoOizbeE85/5kBfkAA+09JgBRcVkbAVsF3gBNU7awHTj2Aon/UgX2AeHW2GzB1wMjkgBRBQMCzQmg6LNt4Tzn/mQF+QAD7T0mAFFxWRsBWwXeAE1TtrAdOPYCif9SBfYB4dbYbMHXAyOSAFEFAwLNCaDos23hPOf+ZAX5AAPtPSYAUXFZGwFbBd4ATVO2sB049gKJ/1IF9gHh1thswdcDI5IAUQUDAs0JoOizbeE85/5kBfkAA+09JgBRcVkbAVsF3gBNU7awHTj2Aon/UgX2AeHW2GzB1wMjkgBRBQMCzQmg6LNt4Tzn/mQF+QAD7T0mAFFxWRsBWwXeAE1TtrAdOPYCif9SBfYB4dbYbMHXAyOSAFEFAwLNCaDos23hPOf+ZAX5AAPtPSYAUXFZGwFbBd4ATVO2sB049gKJ/1IF9gHh1thswdcDI5IAUQUDAs0JoOizbeE85/5kBfkAA+09JgBRcVkbAVsF3gBNU7awHTj2Aon/UgX2AeHW2GzB1wMjkgBRBQMCzQmg6LNt4Tw="
    }, {
      lean: "Yv4GCFH/JqRDPzIHZD5mAQgIe/+hShP88EFQUFP+lwmJ/0Tm3AhUkFI4rAF+CZb/kRJQTylLBUBi/vwHWf/wqWU+rwwpRmYB/gd4/1hRWPZZQYFJU/5+Cdf/ReuPEoeRWTqsAWkJ0/8UGHZIylEoPmL+/Ad8/2GwDT0TEmRNZgH9B5T/cVev8EJAIkJT/mIJOwBv8B0ckJPvO6wBUwktAGcdDkHLV9I7Yv76B57/brc/O1MXClRmAfsHr//fXCXrrT5DOlP+OQmYALj1dSVtlhA9rAExCYEAgSIoOSFdCDli/vUHvv8Hv/04ZhwLWmYB+QfJ/5lhwuWfPPIxU/4ECewAFPuELhiauj2sAQYJzgBYJ9MwwWHPNWL+6Qfh/yDHSzZCIV1fZgHqB+z/lGWT4Bo6QClT/r8IOgF6ADk3iZ7rPawBxggcAeIrHiikZSwyYv7aBwEAp88wM90l9WNmAdkHDADJaKLbJTc9IFP+cQh5Ad8Fgj+4o6Q9rAF9CF4BFzAbH8BoKC5i/sgHHQCM2LIvLirKZ2YBxgcpADNr99bDM/wWU/4cCKoBOQtPR5up5TysAS0IkQHuM9wVEGvLKWL+tgc2AL7h1istLtZqZgGyB0EAy2yc0v0vjg1T/sQHywF9EJFOJrCvO6wB2Ae1AWA3cgyPbBslYv6jB0sAK+ulJ9MxEW1mAZ0HVQCPbZnO2isFBFP+agfdAaAVOlVNtwU6rAGCB8sBZjrvAjttJCBi/o8HXADB9CcjFzV3bmYBiAdlAIKSCTWf2IsFU/4SB94Bmho9WwG/6jesAS0H0AH6PGf5Em3tGmL+fQdqAG3+ZB7zNwZvZgF0B3EAaJNEOGXdEQ9T/r4G0AFfH45gNMdiNawB2wbHARc/7O8VbIMVYv5rB3UAGwhmGWM6vW5mAWEHewAilRE7buJ5GFP+cQa0AegjJGXWz3IyrAGPBrEBukCR5kVq7g9i/lsHfQC6ETcUYTydbWYBUAeBAKyXbD2x57IhU/4tBowBKyj0aNXYIC+sAUsGjgHeQWbdpmc6CmL+TQeEADcb4A7pPaZrZgFCB4UAAZtOPyPtqSpT/vUFWgEfLPdrIeJyK6wBEgZhAYJCf9Q9ZHMEYv5BB4gAfiRsCfg+3mhmATYHiAAcn7VAufJMM1P+yQUgAb0vKW6n628nrAHlBSwBW70TNPCfXgFi/jgHjAB+LeYDjT9KZWYBLQeKAPOjnkFq+Iw7U/6rBeAA/zKDb1X1ICOsAcQF8AC7vT8816QrB2L+MweWACY2WP6mP/BgZgEqB5oAfakIQir+WENT/p4FpADdNQVwF/+MHqwBtgXAAJu+90NwqusMYv4uB6EAZD7O+EM/2ltmAScHqwCwr/BB7QOhSlP+nQVoAFI4rG/cCLwZrAGxBZAA+78pS7CwkRI=",
      crouchLean: "Yv4WBuf/2Ko6PnsNQUdmARAGEQBHUoL1OEF1SFP+lAdvAAXs+BPGkZw6rAF5B3YA3xhoR7VS2D1i/gsG7v9gsdE82hJoTmYBBgYMAEhY3e8OQANBU/5sB7YANPGAHe+TIDysAVgHrgAqHu0/nlhxO2L+BAYQAIK48ToVGPZUZgEABicAnF1Y6mg+EjlT/j0HEgGA9s4m6pYwPawBMQcBATsj9jfaXZY4Yv77BTEAMMCeOCAd3lpmAfkFQQA6YvzkSDyxMFP+AgdlAd770S+ymsg9rAH/Bk0BByiRL19iTTVi/vAFTwBZyN018yEVYGYB8QVaABlm1t+yOfInU/69Bq0BRQF3OECf6D2sAcUGkAGGLNAmJWacMWL+3QVvAO/QszKEJpFkZgHcBXoAMWnu2qw25R5T/moG6wGpBq9AiqSQPawBdwbQAa0wwx0jaYotYv7HBYsA4dknL8oqSWhmAcUFlgB8a07WPDOcFVP+EQYaAgAMaEiGqr88rAEiBgECdjR9FFVrICli/rEFpAAd4z4rvC42a2YBrQWuAPVsANJoLykMU/60BTkCQBGVTymxeDusAcoFJALYNw4LtmxlJGL+mgW4AJHsASdTMlJtZgGUBcIAmm0LzjcrngJT/lcFSAJeFiZWZri9OawBbwU3As46igFCbWQfYv6DBckAK/Z4Iok1mm5mAXsF0QCWkok1TtnyBlP++wRHAlAbEFwuwJI3rAEXBToCUT0C+PpsJRpi/m0F1gDY/6wdVjgJb2YBZAXdAJyTtDge3nQQU/6lBDcCDiBGYXLI+zSsAcIELwJcP4vu3muzFGL+WAXgAIYJphi1OqBuZgFOBeUAdJVxOzDj1xlT/lUEGQKMJL9lItH8MawBcwQWAu1ANeXvaRoPYv5EBecAIRNxE6I8YG1mATkF6gAdmLo9eugHI1P+EATuAcQocmku2pwurAEuBPEB/kET3DJnYgli/jMF7ACXHBUOGD5La2YBKAXtAI+biz/y7fIrU/7VA7kBrCxXbITj4SqsAfIDwQGPQjjTrGOZA2L+JAXvANUlnggWP2RoZgEZBe8Axp/fQI7ziTRT/qgDfQE9MGluEe3SJqwBwwOKAWG9TDWcoDgCYv4XBfEAyS4WA5k/s2RmAQwF7wC4pLZBQfm5PFP+iQM7AXEzpG/D9ngirAGhA0wB1L1pPZ6lBAhi/g4F8wBiN4j9oD89YGYBAwXvAFuqDEIC/3JEU/54A/YAQDYFcIYA2x2sAY0DDAHHvg1FUavBDWL+BgX8AJA///cqPwtbZgH9BP4AprDiQcUEpktT/ncDuQClOIxvSQoDGawBiAPaADnALEyosWMTYv4ABQYBQUeF8jo+KFVmAfcEDwGLtzhBfgpHUlP+ggN+AJw6Om74E/sTrAGOA6oAKMK1Upi43xg=",
      jump: "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",
      land: "Yv6jB0sALOulJ9MxEW1mAZ0HVQCPbZnO2isFBFP+agfdAaAVOlVNtwU6rAGCB8sBZjrvAjttJCBi/pIHSwAs66Un0zERbWYBjQdVAI9tmc7aKwUEU/5ZB90BoBU6VU23BTqsAXIHywFmOu8CO20kIGL+KAdLACzrpSfTMRFtZgEiB1UAj22ZztorBQRT/u8G3QGgFTpVTbcFOqwBBwfLAWY67wI7bSQgYv7CBksALOulJ9MxEW1mAbwGVQCPbZnO2isFBFP+iQbdAaAVOlVNtwU6rAGhBssBZjrvAjttJCBi/ucGSwAs66Un0zERbWYB4gZVAI9tmc7aKwUEU/6uBt0BoBU6VU23BTqsAccGywFmOu8CO20kIGL+KQdLACzrpSfTMRFtZgEjB1UAj22ZztorBQRT/vAG3QGgFTpVTbcFOqwBCAfLAWY67wI7bSQgYv5lB0sALOulJ9MxEW1mAWAHVQCPbZnO2isFBFP+LAfdAaAVOlVNtwU6rAFFB8sBZjrvAjttJCBi/okHSwAs66Un0zERbWYBgwdVAI9tmc7aKwUEU/5QB90BoBU6VU23BTqsAWgHywFmOu8CO20kIGL+mQdLACzrpSfTMRFtZgGTB1UAj22ZztorBQRT/mAH3QGgFTpVTbcFOqwBeAfLAWY67wI7bSQgYv6hB0sAK+ulJ9MxEW1mAZwHVQCPbZnO2isFBFP+aAfdAaAVOlVNtwU6rAGBB8sBZjrvAjttJCBi/qMHSwAr66Un0zERbWYBnQdVAI9tmc7aKwUEU/5qB90BoBU6VU23BTqsAYIHywFmOu8CO20kIGL+owdLACvrpSfTMRFtZgGdB1UAj22ZztorBQRT/moH3QGgFTpVTbcFOqwBggfLAWY67wI7bSQgYv6jB0sAK+ulJ9MxEW1mAZ0HVQCPbZnO2isFBFP+agfdAaAVOlVNtwU6rAGCB8sBZjrvAjttJCBi/qMHSwAr66Un0zERbWYBnQdVAI9tmc7aKwUEU/5qB90BoBU6VU23BTqsAYIHywFmOu8CO20kIGL+owdLACvrpSfTMRFtZgGdB1UAj22ZztorBQRT/moH3QGgFTpVTbcFOqwBggfLAWY67wI7bSQgYv6jB0sAK+ulJ9MxEW1mAZ0HVQCPbZnO2isFBFP+agfdAaAVOlVNtwU6rAGCB8sBZjrvAjttJCA=",
      landCrouch: "Yv6DBckAK/Z4Iok1mm5mAXsF0QCWkok1TtnyBlP++wRHAlAbEFwuwJI3rAEXBToCUT0C+PpsJRpi/kQHXgDS7OMmajJebWYBPgdoAJxt8c0aK10CU/7/Bu4BgBZRVpm4sDmsARgH3QHgOkkBQ21BH2L+LAaYAM3xkCQhNCBuZgEmBqEAZpL2MzfXnAJT/sMFHwIYGXdZlrycOKwB3gUQAjw8VPw1bY0cYv6DBckAK/Z4Iok1mm5mAXsF0QCWkok1TtnyBlP++wRHAlAbEFwuwJI3rAEXBToCUT0C+PpsJRpi/oMFyQAr9ngiiTWabmYBewXRAJaSiTVO2fIGU/77BEcCUBsQXC7AkjesARcFOgJRPQL4+mwlGmL+gwXJACv2eCKJNZpuZgF7BdEAlpKJNU7Z8gZT/vsERwJQGxBcLsCSN6wBFwU6AlE9Avj6bCUaYv6DBckAK/Z4Iok1mm5mAXsF0QCWkok1TtnyBlP++wRHAlAbEFwuwJI3rAEXBToCUT0C+PpsJRpi/oMFyQAr9ngiiTWabmYBewXRAJaSiTVO2fIGU/77BEcCUBsQXC7AkjesARcFOgJRPQL4+mwlGmL+gwXJACv2eCKJNZpuZgF7BdEAlpKJNU7Z8gZT/vsERwJQGxBcLsCSN6wBFwU6AlE9Avj6bCUaYv6DBckAK/Z4Iok1mm5mAXsF0QCWkok1TtnyBlP++wRHAlAbEFwuwJI3rAEXBToCUT0C+PpsJRpi/oMFyQAr9ngiiTWabmYBewXRAJaSiTVO2fIGU/77BEcCUBsQXC7AkjesARcFOgJRPQL4+mwlGmL+gwXJACv2eCKJNZpuZgF7BdEAlpKJNU7Z8gZT/vsERwJQGxBcLsCSN6wBFwU6AlE9Avj6bCUaYv6DBckAK/Z4Iok1mm5mAXsF0QCWkok1TtnyBlP++wRHAlAbEFwuwJI3rAEXBToCUT0C+PpsJRpi/oMFyQAr9ngiiTWabmYBewXRAJaSiTVO2fIGU/77BEcCUBsQXC7AkjesARcFOgJRPQL4+mwlGmL+gwXJACv2eCKJNZpuZgF7BdEAlpKJNU7Z8gZT/vsERwJQGxBcLsCSN6wBFwU6AlE9Avj6bCUaYv6DBckAK/Z4Iok1mm5mAXsF0QCWkok1TtnyBlP++wRHAlAbEFwuwJI3rAEXBToCUT0C+PpsJRo="
    }, {
      lean: "j/5uCAn/BK8lS/joZTxmAQgIe/+hShP88EFQUBz/6wnr/gjdzSQljJcTrAF+CZb/kRJQTylLBUCP/m8IJf+XtN5Mm+85Q2YB/gd4/1hRWPZZQYFJHP/sCUr/397CLsuPkBasAWkJ0/8UGHZIylEoPo/+dghd/7y6AU5e9opJZgH9B5T/cVev8EJAIkIc/+cJw//34Fw4TJRdGawBUwktAGcdDkHLV9I7j/53CJX/aMGMTjT9TE9mAfsHr//fXCXrrT5DOhz/0Qk5AEvjiEGemfkbrAExCYEAgSIoOSFdCDmP/nIIy/+OyH5ODwRzVGYB+QfJ/5lhwuWfPPIxHP+qCagA1+U1SrifXh6sAQYJzgBYJ9MwwWHPNY/+YggDACHQ103iCvZYZgHqB+z/lGWT4Bo6QCkc/24JFAGW6FFSjqaIIKwBxggcAeIrHiikZSwyj/5LCDgAENiYTKARy1xmAdkHDADJaKLbJTc9IBz/JAlzAYPrzFkRrnMirAF9CF4BFzAbH8BoKC6P/i8IZwBN4MRKPBjsX2YBxgcpADNr99bDM/wWHP/OCMMBl+6ZYDW2GySsAS0IkQHuM9wVEGvLKY/+DgiQAMnoX0ipHlJiZgGyB0EAy2yc0v0vjg0c/24IAgLO8alm6L58JawB2Ae1AWA3cgyPbBslj/7qB7MAcfFsRdok+GNmAZ0HVQCPbZnO2isFBBz/CAgwAiD18WsayJQmrAGCB8sBZjrvAjttJCCP/sMHzwA2+vJBwyrbZGYBiAdlAIKSCTWf2IsFHP+fB0wCiPhocLnRYSesAS0H0AH6PGf5Em3tGo/+nAfkAAUD+D1YMPpkZgF0B3EAaJNEOGXdEQ8c/zYHVQL9+wN0stviJ6wB2wbHARc/7O8VbIMVj/51B/MA0AuFOZA1VWRmAWEHewAilRE7buJ5GBz/0AZMAnv/vHby5RQorAGPBrEBukCR5kVq7g+P/k8H+wCDFKI0XzrrYmYBUAeBAKyXbD2x57IhHP9xBjIC+gKNeGTw+SesAUsGjgHeQWbdpmc6Co/+Kwf9AA4dWC+9PsFgZgFCB4UAAZtOPyPtqSoc/xsGCQJzBnR59fqPJ6wBEgZhAYJCf9Q9ZHMEj/4LB/oAYCWyKaBC211mATYHiAAcn7VAufJMMxz/0AXTAd8JbnmQBdkmrAHlBSwBW70TNPCfXgGP/u8G8gBqLbsjAUY+WmYBLQeKAPOjnkFq+Iw7HP+TBZEBOA18eCAQ1yWsAcQF8AC7vT8816QrB4/+2QbuABs1fh3aSPBVZgEqB5oAfakIQir+WEMc/2cFTgF4EJ92kBqLJKwBtgXAAJu+90NwqusMj/7GBugAZTwIFyVL/FBmAScHqwCwr/BB7QOhShz/SQUHAZcT23PNJPgirAGxBZAA+78pS7CwkRI=",
      crouchLean: "j/6KBrb/dLUSTZfwLkRmARAGEQBHUoL1OEF1SBz/Bgjk/yrfMTBnkPwWrAF5B3YA3xhoR7VS2D2P/oYG0v+uux9OXvdrSmYBBgYMAEhY3e8OQANBHP/zB0EAS+G8OQeVwhmsAVgHrgAqHu0/nlhxO4/+ggYKAG3Ck041/hdQZgEABicAnF1Y6mg+Ejkc/9cHtwCn49ZCd5pXHKwBMQcBATsj9jfaXZY4j/54BkAApMlvThAFJ1VmAfkFQQA6YvzkSDyxMBz/qgcmATvmb0utoLMerAH/Bk0BByiRL19iTTWP/mgGdABF0bFN4QuRWWYB8QVaABlm1t+yOfInHP9tB4sBAel0U52n1CCsAcUGkAGGLNAmJWacMY/+TQapAEHZXUybEkxdZgHcBXoAMWnu2qw25R4c/x4H6QH069daOa+2IqwBdwbQAa0wwx0jaYotj/4sBtcAiOFzSjEZUmBmAcUFlgB8a07WPDOcFRz/wgY3Ag7viGFzt1MkrAEiBgECdjR9FFVrICmP/gcGAAEL6vlHlR+cYmYBrQWuAPVsANJoLykMHP9eBnUCSfJ8ZzrAqiWsAcoFJALYNw4LtmxlJI/+3gUiAbny8kS8JSZkZgGUBcIAmm0LzjcrngIc//MFoAKf9aZsfcm3JqwBbwU3As46igFCbWQfj/60BT0BgPtlQZor7GRmAXsF0QCWkok1TtnyBhz/hgW5Agn5/XAq03knrAEXBToCUT0C+PpsJRqP/okFUQFQBFg9IjHuZGYBZAXdAJyTtDge3nQQHP8aBb8CgPx3dC/d7iesAcIELwJcP4vu3muzFI/+XgVeARgN1DhLNixkZgFOBeUAdJVxOzDj1xkc/7EEswL+/w53d+cVKKwBcwQWAu1ANeXvaRoPj/41BWQBxhXhMwo7pmJmATkF6gAdmLo9eugHIxz/TwSWAn0Dvnjv8e4nrAEuBPEB/kET3DJnYgmP/g4FZAFKHoouVj9gYGYBKAXtAI+biz/y7fIrHP/2A2oC9AaCeYP8eSesAfIDwQGPQjjTrGOZA4/+6gRfAZMm1ygnQ15dZgEZBe8Axp/fQI7ziTQc/6oDMAJeClp5HQe4JqwBwwOKAWG9TDWcoDgCj/7LBFYBkC7VInVGp1lmAQwF7wC4pLZBQfm5PBz/bAPsAbQNRXiqEaslrAGhA0wB1L1pPZ6lBAiP/rEESQEzNo8cOUlBVWYBAwXvAFuqDEIC/3JEHP89A6AB7xBFdhQcVCSsAY0DDAHHvg1FUavBDY/+nQRBAW09EhZvSzRQZgH9BP4AprDiQcUEpksc/x8DVQEJFGBzSCa3IqwBiAPaADnALEyosWMTj/6MBDcBLkRpDxJNjEpmAfcEDwGLtzhBfgpHUhz/EAMJAfwWmW8xMNYgrAGOA6oAKMK1Upi43xg=",
      jump: "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",
      land: "j/7qB7MAcfFsRdok+GNmAZ0HVQCPbZnO2isFBBz/CAgwAiD18msayJQmrAGCB8sBZjrvAjttJCCP/tkHswBx8WxF2iT4Y2YBjQdVAI9tmc7aKwUEHP/4BzACIPXyaxrIlCasAXIHywFmOu8CO20kII/+bwezAHHxbEXaJPhjZgEiB1UAj22ZztorBQQc/40HMAIg9fJrGsiUJqwBBwfLAWY67wI7bSQgj/4JB7MAcfFsRdok+GNmAbwGVQCPbZnO2isFBBz/JwcwAiD18msayJQmrAGhBssBZjrvAjttJCCP/i4HswBx8WxF2iT4Y2YB4gZVAI9tmc7aKwUEHP9NBzACIPXyaxrIlCasAccGywFmOu8CO20kII/+cAezAHHxbEXaJPhjZgEjB1UAj22ZztorBQQc/44HMAIg9fJrGsiUJqwBCAfLAWY67wI7bSQgj/6sB7MAcfFsRdok+GNmAWAHVQCPbZnO2isFBBz/ywcwAiD18msayJQmrAFFB8sBZjrvAjttJCCP/tAHswBx8WxF2iT4Y2YBgwdVAI9tmc7aKwUEHP/vBzACIPXyaxrIlCasAWgHywFmOu8CO20kII/+4AezAHHxbEXaJPhjZgGTB1UAj22ZztorBQQc//4HMAIg9fJrGsiUJqwBeAfLAWY67wI7bSQgj/7oB7MAcfFsRdok+GNmAZwHVQCPbZnO2isFBBz/BwgwAiD18msayJQmrAGBB8sBZjrvAjttJCCP/uoHswBx8WxF2iT4Y2YBnQdVAI9tmc7aKwUEHP8ICDACIPXxaxrIlCasAYIHywFmOu8CO20kII/+6gezAHHxbEXaJPhjZgGdB1UAj22ZztorBQQc/wgIMAIg9fFrGsiUJqwBggfLAWY67wI7bSQgj/7qB7MAcfFsRdok+GNmAZ0HVQCPbZnO2isFBBz/CAgwAiD18WsayJQmrAGCB8sBZjrvAjttJCCP/uoHswBx8WxF2iT4Y2YBnQdVAI9tmc7aKwUEHP8ICDACIPXxaxrIlCasAYIHywFmOu8CO20kII/+6gezAHHxbEXaJPhjZgGdB1UAj22ZztorBQQc/wgIMAIg9fFrGsiUJqwBggfLAWY67wI7bSQgj/7qB7MAcfFsRdok+GNmAZ0HVQCPbZnO2isFBBz/CAgwAiD18WsayJQmrAGCB8sBZjrvAjttJCA=",
      landCrouch: "j/60BT0BgPtlQZor7GRmAXsF0QCWkok1TtnyBhz/hgW5Agn5/XAq03knrAEXBToCUT0C+PpsJRqP/ogHyAD08ttE5SUtZGYBPgdoAJxt8c0aK10CHP+bB0YCtvXHbL3JvSasARgH3QHgOkkBQ21BH4/+ZgYIAYP3EUP7KKpkZgEmBqEAZpL2MzfXnAIc/1cGhgJ69yBvu84qJ6wB3gUQAjw8VPw1bY0cj/60BT0BgPtlQZor7GRmAXsF0QCWkok1TtnyBhz/hgW5Agn5/XAq03knrAEXBToCUT0C+PpsJRqP/rQFPQGA+2VBmivsZGYBewXRAJaSiTVO2fIGHP+GBbkCCfn9cCrTeSesARcFOgJRPQL4+mwlGo/+tAU9AYD7ZUGaK+xkZgF7BdEAlpKJNU7Z8gYc/4YFuQIJ+f1wKtN5J6wBFwU6AlE9Avj6bCUaj/60BT0BgPtlQZor7GRmAXsF0QCWkok1TtnyBhz/hgW5Agn5/XAq03knrAEXBToCUT0C+PpsJRqP/rQFPQGA+2VBmivsZGYBewXRAJaSiTVO2fIGHP+GBbkCCfn9cCrTeSesARcFOgJRPQL4+mwlGo/+tAU9AYD7ZUGaK+xkZgF7BdEAlpKJNU7Z8gYc/4YFuQIJ+f1wKtN5J6wBFwU6AlE9Avj6bCUaj/60BT0BgPtlQZor7GRmAXsF0QCWkok1TtnyBhz/hgW5Agn5/XAq03knrAEXBToCUT0C+PpsJRqP/rQFPQGA+2VBmivsZGYBewXRAJaSiTVO2fIGHP+GBbkCCfn9cCrTeSesARcFOgJRPQL4+mwlGo/+tAU9AYD7ZUGaK+xkZgF7BdEAlpKJNU7Z8gYc/4YFuQIJ+f1wKtN5J6wBFwU6AlE9Avj6bCUaj/60BT0BgPtlQZor7GRmAXsF0QCWkok1TtnyBhz/hgW5Agn5/XAq03knrAEXBToCUT0C+PpsJRqP/rQFPQGA+2VBmivsZGYBewXRAJaSiTVO2fIGHP+GBbkCCfn9cCrTeSesARcFOgJRPQL4+mwlGo/+tAU9AYD7ZUGaK+xkZgF7BdEAlpKJNU7Z8gYc/4YFuQIJ+f1wKtN5J6wBFwU6AlE9Avj6bCUaj/60BT0BgPtlQZor7GRmAXsF0QCWkok1TtnyBhz/hgW5Agn5/XAq03knrAEXBToCUT0C+PpsJRo="
    }, {
      lean: "s/5sB2v/sbkoL+lC2ERmAQgIe/+hShP88EFQUHn+igdyAWPqflv/9UlWrAF+CZb/kRJQTylLBUCz/lQHXv/2vyUpxEa1SmYB/gd4/1hRWPZZQYFJef4YB2IB/fEEXAL+11esAWkJ0/8UGHZIylEoPrP+Tgdm/7fG0iIVSgFQZgH9B5T/cVev8EJAIkJ5/rkGWAGy+ddbCQa6WKwBUwktAGcdDkHLV9I7s/5LB2z/6M07HNZMslRmAfsHr//fXCXrrT5DOnn+YgY9AXQB91oEDvBYrAExCYEAgSIoOSFdCDmz/kkHcP961W0VAU+9WGYB+QfJ/5lhwuWfPPIxef4TBhEBMwllWeQVeVisAQYJzgBYJ9MwwWHPNbP+TQd3/2Dddg6SUBtcZgHqB+z/lGWT4Bo6QCl5/tMF2wDgECZXmR1WV6wBxggcAeIrHiikZSwys/5TB33/iOViB4ZRxl5mAdkHDADJaKLbJTc9IHn+oQWbAGwYPFQVJYhVrAF9CF4BFzAbH8BoKC6z/lsHhP/l7UAA21G4YGYBxgcpADNr99bDM/wWef5+BVIAyR+vUEgsFFOsAS0IkQHuM9wVEGvLKbP+ZQeM/2T2HfmRUe5hZgGyB0EAy2yc0v0vjg15/msFBADoJoVMJTP+T6wB2Ae1AWA3cgyPbBsls/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/n0Hof+LBw7rIk8cYmYBiAdlAIKSCTWf2IsFef55BWX/NDR5Qqg/BUisAS0H0AH6PGf5Em3tGrP+iweu/xEQPeQBTRRhZgF0B3EAaJNEOGXdEQ95/poFGv9IOqw8NUUyQ6wB2wbHARc/7O8VbIMVs/6aB7//dxii3UtKT19mAWEHewAilRE7buJ5GHn+ygXW/us/aTY7St09rAGPBrEBukCR5kVq7g+z/qkH0v+uIErXBEfQXGYBUAeBAKyXbD2x57Ihef4IBpz+EUW8L7FODjisAUsGjgHeQWbdpmc6CrP+uAfo/6UoQdEyQ51ZZgFCB4UAAZtOPyPtqSp5/lMGbv6wSbIojVLTMawBEgZhAYJCf9Q9ZHMEs/7FBwIATTCTy94+u1VmATYHiAAcn7VAufJMM3n+qAZQ/sBNWCHJVTYrrAHlBSwBW70TNPCfXgGz/tIHHgCWN0vGDzoyUWYBLQeKAPOjnkFq+Iw7ef4DB0H+OVG+GV1YRSSsAcQF8AC7vT8816QrB7P+4Ac+AHQ+dMHPNApMZgEqB5oAfakIQir+WEN5/mgHRP4TVPERRVoNHawBtgXAAJu+90NwqusMs/7sB2EA2EQXvSgvT0ZmAScHqwCwr/BB7QOhSnn+zQda/klWAQp+W50VrAGxBZAA+78pS7CwkRI=",
      crouchLean: "s/56BeP/7MA8KElHhktmARAGEQBHUoL1OEF1SHn+MAXlAR3zCFwv/wNYrAF5B3YA3xhoR7VS2D2z/mUF0f++x94hhkq7UGYBBgYMAEhY3e8OQANBef7DBL4B1frBWzUHzVisAVgHrgAqHu0/nlhxO7P+XgXY//7OPxsxTVRVZgEABicAnF1Y6mg+Ejl5/mkEogGYAsdaLQ/qWKwBMQcBATsj9jfaXZY4s/5ZBd3/ntZqFEVPRllmAfkFQQA6YvzkSDyxMHn+GAR2AVUKHFkIF1lYrAH/Bk0BByiRL19iTTWz/lcF4P+O3m0NwFCLXGYB8QVaABlm1t+yOfInef7UAzsB/hHDVrYeHVesAcUGkAGGLNAmJWacMbP+WQXo/7/mVwacURtfZgHcBXoAMWnu2qw25R55/qAD+gCEGcFTKCY3VawBdwbQAa0wwx0jaYots/5eBe//Iu80/9pR8WBmAcUFlgB8a07WPDOcFXn+fAOxANkgHFBPLapSrAEiBgECdjR9FFVrICmz/mQF+P+l9xL4eVELYmYBrQWuAPVsANJoLykMef5oA2MA7SfbSx80fU+sAcoFJALYNw4LtmxlJLP+bAUBADkAAPF5UGZiZgGUBcIAmm0LzjcrngJ5/mUDEgC0LgdHiDq1S6wBbwU3As46igFCbWQfs/52BQ0AzAgL6ttOAWJmAXsF0QCWkok1TtnyBnn+cwPD/x81p0GAQFlHrAEXBToCUT0C+PpsJRqz/oAFGgBPEUHjpUzeYGYBZAXdAJyTtDge3nQQef6SA3n/IzvIO/pFckKsAcIELwJcP4vu3muzFLP+iwUrAK8Zr9zZSf1eZgFOBeUAdJVxOzDj1xl5/sEDNv+0QHU17EoKPawBcwQWAu1ANeXvaRoPs/6XBT0A3SFi1n1GY1xmATkF6gAdmLo9eugHI3n+/gP9/sdFuS5LTys3rAEuBPEB/kET3DJnYgmz/qEFUwDKKWbQmEIWWWYBKAXtAI+biz/y7fIref5GBNH+UkqiJxFT4DCsAfIDwQGPQjjTrGOZA7P+qwVsAGUxxsoxPhtVZgEZBe8Axp/fQI7ziTR5/pkEs/5MTj4gNFY2KqwBwwOKAWG9TDWcoDgCs/60BYgAnziOxVA5elBmAQwF7wC4pLZBQfm5PHn+8gSm/q5RnBivWDojrAGhA0wB1L1pPZ6lBAiz/roFpgBsP8nAATQ8S2YBAwXvAFuqDEIC/3JEef5PBar+cFTJEH5a+RusAY0DDAHHvg1FUavBDbP+wgXIAL1FfrxLLmxFZgH9BP4AprDiQcUEpkt5/rEFwf6OVtYInVuCFKwBiAPaADnALEyosWMTs/7GBe0Ahku3uDwoFD9mAfcEDwGLtzhBfgpHUnn+EAbq/gNY0QAIXOMMrAGOA6oAKMK1Upi43xg=",
      jump: "s/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/iUHlf/3/gjyqFBlYmYBUgdVAI9tmc7aKwUEef4fBbT/uy3FR545TEysATcHywFmOu8CO20kILP+AAeV//f+CPKoUGViZgEsB1UAj22ZztorBQR5/vkEtP+7LcVHnjlMTKwBEQfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/gAHlf/3/gjyqFBlYmYBLAdVAI9tmc7aKwUEef75BLT/uy3FR545TEysAREHywFmOu8CO20kILP+JQeV//f+CPKoUGViZgFSB1UAj22ZztorBQR5/h8FtP+7LcVHnjlMTKwBNwfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCA=",
      land: "s/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/mAHlf/3/gjyqFBlYmYBjQdVAI9tmc7aKwUEef5ZBbT/uy3FR545TEysAXIHywFmOu8CO20kILP+9QaV//f+CPKoUGViZgEiB1UAj22ZztorBQR5/u8EtP+7LcVHnjlMTKwBBwfLAWY67wI7bSQgs/6PBpX/9/4I8qhQZWJmAbwGVQCPbZnO2isFBHn+iQS0/7stxUeeOUxMrAGhBssBZjrvAjttJCCz/rUGlf/3/gjyqFBlYmYB4gZVAI9tmc7aKwUEef6uBLT/uy3FR545TEysAccGywFmOu8CO20kILP+9gaV//f+CPKoUGViZgEjB1UAj22ZztorBQR5/vAEtP+7LcVHnjlMTKwBCAfLAWY67wI7bSQgs/4zB5X/9/4I8qhQZWJmAWAHVQCPbZnO2isFBHn+LAW0/7stxUeeOUxMrAFFB8sBZjrvAjttJCCz/lcHlf/3/gjyqFBlYmYBgwdVAI9tmc7aKwUEef5QBbT/uy3FR545TEysAWgHywFmOu8CO20kILP+ZgeV//f+CPKoUGViZgGTB1UAj22ZztorBQR5/mAFtP+7LcVHnjlMTKwBeAfLAWY67wI7bSQgs/5vB5X/9/4I8qhQZWJmAZwHVQCPbZnO2isFBHn+aAW0/7stxUeeOUxMrAGBB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCCz/nAHlf/3/gjyqFBlYmYBnQdVAI9tmc7aKwUEef5qBbT/uy3FR545TEysAYIHywFmOu8CO20kILP+cAeV//f+CPKoUGViZgGdB1UAj22ZztorBQR5/moFtP+7LcVHnjlMTKwBggfLAWY67wI7bSQgs/5wB5X/9/4I8qhQZWJmAZ0HVQCPbZnO2isFBHn+agW0/7stxUeeOUxMrAGCB8sBZjrvAjttJCA=",
      landCrouch: "s/52BQ0AzAgL6ttOAWJmAXsF0QCWkok1TtnyBnn+cwPD/x81p0GAQFlHrAEXBToCUT0C+PpsJRqz/hcHp/9zANDwcFBmYmYBPgdoAJxt8c0aK10Cef4QBbb/4C7kRrI6mUusARgH3QHgOkkBQ21BH7P+EAbd/+oELu2qT0diZgEmBqEAZpL2MzfXnAJ5/goEvf9CMihE2j1lSawB3gUQAjw8VPw1bY0cs/52BQ0AzAgL6ttOAWJmAXsF0QCWkok1TtnyBnn+cwPD/x81p0GAQFlHrAEXBToCUT0C+PpsJRqz/nYFDQDMCAvq204BYmYBewXRAJaSiTVO2fIGef5zA8P/HzWnQYBAWUesARcFOgJRPQL4+mwlGrP+dgUNAMwIC+rbTgFiZgF7BdEAlpKJNU7Z8gZ5/nMDw/8fNadBgEBZR6wBFwU6AlE9Avj6bCUas/52BQ0AzAgL6ttOAWJmAXsF0QCWkok1TtnyBnn+cwPD/x81p0GAQFlHrAEXBToCUT0C+PpsJRqz/nYFDQDMCAvq204BYmYBewXRAJaSiTVO2fIGef5zA8P/HzWnQYBAWUesARcFOgJRPQL4+mwlGrP+dgUNAMwIC+rbTgFiZgF7BdEAlpKJNU7Z8gZ5/nMDw/8fNadBgEBZR6wBFwU6AlE9Avj6bCUas/52BQ0AzAgL6ttOAWJmAXsF0QCWkok1TtnyBnn+cwPD/x81p0GAQFlHrAEXBToCUT0C+PpsJRqz/nYFDQDMCAvq204BYmYBewXRAJaSiTVO2fIGef5zA8P/HzWnQYBAWUesARcFOgJRPQL4+mwlGrP+dgUNAMwIC+rbTgFiZgF7BdEAlpKJNU7Z8gZ5/nMDw/8fNadBgEBZR6wBFwU6AlE9Avj6bCUas/52BQ0AzAgL6ttOAWJmAXsF0QCWkok1TtnyBnn+cwPD/x81p0GAQFlHrAEXBToCUT0C+PpsJRqz/nYFDQDMCAvq204BYmYBewXRAJaSiTVO2fIGef5zA8P/HzWnQYBAWUesARcFOgJRPQL4+mwlGrP+dgUNAMwIC+rbTgFiZgF7BdEAlpKJNU7Z8gZ5/nMDw/8fNadBgEBZR6wBFwU6AlE9Avj6bCUas/52BQ0AzAgL6ttOAWJmAXsF0QCWkok1TtnyBnn+cwPD/x81p0GAQFlHrAEXBToCUT0C+PpsJRo="
    }]
  },
  yt = A => A && Rt[A] || 0,
  jt = Tt.length,
  xt = Tt.findIndex(item => "head" === item.name),
  zt = Tt.findIndex(item => "chest" === item.name),
  Xt = 7 * jt,
  Wt = Xt + 6,
  St = Jt.length,
  Zt = 7 * St;
function Nt(A, t, s = jt) {
  if (!A) return [];
  const n = "function" == typeof atob ? atob(A) : Buffer.from(A, "base64").toString("latin1"),
    e = n.length >> 1,
    B = [];
  for (let o = 0; o < e / t; o++) {
    const float64Values = new Float64Array(t);
    for (let e = 0; e < t; e++) {
      const B = 2 * (o * t + e);
      let i = n.charCodeAt(B) | n.charCodeAt(B + 1) << 8;
      i >= 32768 && (i -= 65536);
      const r = e < 7 * s ? e % 7 >= 3 : e >= 7 * s + 3;
      float64Values[e] = r ? i / 32767 : i / 1e3;
    }
    for (let t = 0; t < s; t++) Kt(float64Values, 7 * t + 3);
    B.push(float64Values);
  }
  return B;
}
function Kt(A, t) {
  const s = Math.hypot(A[t], A[t + 1], A[t + 2], A[t + 3]) || 1;
  A[t] /= s, A[t + 1] /= s, A[t + 2] /= s, A[t + 3] /= s;
}
var qt = {
    idle: Nt(Vt.idle, Xt)[0],
    crouch: Nt(Vt.crouch, Xt)[0],
    lean: Nt(Vt.lean, Xt),
    crouchLean: Nt(Vt.crouchLean, Xt),
    jump: Nt(Vt.jump, Xt),
    land: Nt(Vt.land, Xt),
    landCrouch: Nt(Vt.landCrouch, Xt),
    dances: Vt.dances.map(item => Nt(item, Wt)),
    holds: Vt.holds.map(item => ({
      lean: Nt(item.lean, Zt, St),
      crouchLean: Nt(item.crouchLean, Zt, St),
      jump: Nt(item.jump, Zt, St),
      land: Nt(item.land, Zt, St),
      landCrouch: Nt(item.landCrouch, Zt, St)
    }))
  },
  _t = (qt.land.length - 1) / 20,
  $t = (qt.landCrouch.length - 1) / 20,
  As = Ot.indexOf(0),
  ts = qt.lean[As],
  ss = [ts, ...qt.holds.map(item => Bs(ts.slice(), item.lean[As]))],
  ns = qt.crouchLean[As],
  es = [ns, ...qt.holds.map(item => Bs(ns.slice(), item.crouchLean[As]))];
function Bs(A, t) {
  for (let s = 0; s < St; s++) {
    const n = 7 * Jt[s];
    for (let e = 0; e < 7; e++) A[n + e] = t[7 * s + e];
  }
  return A;
}
var os = A => A && A > 0 ? qt.holds[A - 1] ?? null : null;
function is(A, t, s, n, e, B = jt) {
  if (s <= 0 || A === t) return e.set(A), e;
  for (let o = 0; o < B; o++) {
    const n = 7 * o;
    for (let o = 0; o < 3; o++) e[n + o] = A[n + o] + (t[n + o] - A[n + o]) * s;
    const B = A[n + 3] * t[n + 3] + A[n + 4] * t[n + 4] + A[n + 5] * t[n + 5] + A[n + 6] * t[n + 6] < 0 ? -1 : 1;
    for (let o = 3; o < 7; o++) e[n + o] = A[n + o] + (B * t[n + o] - A[n + o]) * s;
    Kt(e, n + 3);
  }
  for (let o = 7 * B; o < n; o++) e[o] = A[o] + (t[o] - A[o]) * s;
  return e;
}
var rs = new Float64Array(Wt);
function ws(A, t, s, n, e = rs, B = jt) {
  const o = A.length;
  let i = Math.max(0, t) * s;
  n ? i %= o : i = Math.min(i, o - 1);
  const flooredValue = Math.floor(i),
    w = i - flooredValue,
    f = A[flooredValue];
  return is(f, A[n ? (flooredValue + 1) % o : Math.min(o - 1, flooredValue + 1)], w, f.length, e, B);
}
var fs = new Float64Array(Xt);
function as(A, t, s = fs, n = jt) {
  const e = Ot[0],
    B = Ot[1] - Ot[0],
    o = Math.min(A.length - 1, Math.max(0, (t - e) / B)),
    i = Math.min(A.length - 2, Math.floor(o)),
    r = o - i;
  return is(A[i], A[i + 1], r, 7 * n, s, n);
}
var gs = new Float64Array(Zt),
  cs = new Float64Array(4),
  Qs = new Float64Array(4),
  hs = new Float64Array(3);
function ls(A, t, s, n, e, B) {
  const o = A[t],
    i = A[t + 1],
    r = A[t + 2],
    w = A[t + 3],
    f = s[n],
    a = s[n + 1],
    g = s[n + 2],
    c = s[n + 3];
  e[B] = o * c + w * f + i * g - r * a, e[B + 1] = i * c + w * a + r * f - o * g, e[B + 2] = r * c + w * g + o * a - i * f, e[B + 3] = w * c - o * f - i * a - r * g;
}
function Cs(A, t, s, n, e, B) {
  const o = A[t],
    i = A[t + 1],
    r = A[t + 2],
    w = A[t + 3],
    f = w * s + i * e - r * n,
    a = w * n + r * s - o * e,
    g = w * e + o * n - i * s,
    c = -o * s - i * n - r * e;
  B[0] = f * w + c * -o + a * -r - g * -i, B[1] = a * w + c * -i + g * -o - f * -r, B[2] = g * w + c * -r + f * -i - a * -o;
}
var Hs = new Float64Array(4);
function us(A, t, s = ts) {
  for (let n = 0; n < jt; n++) {
    const e = 7 * n;
    cs[0] = -s[e + 3], cs[1] = -s[e + 4], cs[2] = -s[e + 5], cs[3] = s[e + 6], ls(t, e + 3, cs, 0, Hs, 0), Cs(Hs, 0, A[e] - s[e], A[e + 1] - s[e + 1], A[e + 2] - s[e + 2], hs), A[e] = t[e] + hs[0], A[e + 1] = t[e + 1] + hs[1], A[e + 2] = t[e + 2] + hs[2], ls(Hs, 0, A, e + 3, Qs, 0), A.set(Qs, e + 3);
  }
}
var Es = -167.244,
  Fs = (A, t) => (t - 1) * A;
function Ds(A, t, s, n = function () {
  const {
    headScale: A,
    chestGap: t
  } = B;
  if (Ps.scale !== A || Ps.gap !== t) {
    const s = Ds(qt.idle, 0, {
        fx: 0,
        fz: -1,
        boxes: Tt.map((item, index) => ps(index))
      }, 0),
      n = A => Math.abs(A.xv) * A.hx + Math.abs(A.yv) * A.hy + Math.abs(A.zv) * A.hz,
      e = s.boxes[xt],
      B = s.boxes[zt],
      o = B.v + n(B) - (e.v - n(e));
    Ps.scale = A, Ps.gap = t, Ps.value = Math.min(B.hy, Math.max(0, o + t));
  }
  return Ps.value;
}()) {
  const e = B.headScale;
  for (let B = 0; B < jt; B++) {
    const t = 7 * B,
      o = s.boxes[B],
      i = Tt[B].half,
      r = B === xt ? e : 1,
      w = B === zt ? n / 2 : 0;
    o.hx = i[0] * r, o.hy = i[1] * r - w, o.hz = i[2] * r, o.u = A[t], o.v = A[t + 1], o.w = A[t + 2];
    const f = Math.hypot(A[t + 3], A[t + 4], A[t + 5], A[t + 6]) || 1,
      a = A[t + 3] / f,
      g = A[t + 4] / f,
      c = A[t + 5] / f,
      Q = A[t + 6] / f;
    if (o.xu = 1 - 2 * (g * g + c * c), o.xv = 2 * (a * g + c * Q), o.xw = 2 * (a * c - g * Q), o.yu = 2 * (a * g - c * Q), o.yv = 1 - 2 * (a * a + c * c), o.yw = 2 * (g * c + a * Q), o.zu = 2 * (a * c + g * Q), o.zv = 2 * (g * c - a * Q), o.zw = 1 - 2 * (a * a + g * g), 1 !== r || w) {
      const A = (Fs(i[1], r) + w) * (o.yv >= 0 ? 1 : -1);
      o.u -= o.yu * A, o.v -= o.yv * A, o.w -= o.yw * A;
    }
  }
  return s.fx = -Math.sin(t), s.fz = -Math.cos(t), s;
}
var Ps = {
  scale: NaN,
  gap: NaN,
  value: 0
};
function ds(A, t = ms()) {
  const s = Math.trunc(180 * -A.pitch / Math.PI),
    n = A.emote >= 0 ? qt.dances[A.emote] : void 0;
  if (n?.length) {
    const e = ws(n, A.emoteTime, 10, !0);
    return function (A, t) {
      if (0 === t) return;
      const s = A[Xt],
        n = A[Xt + 1],
        e = A[Xt + 2],
        B = t * Math.PI / 360,
        o = Math.sin(B);
      cs[0] = A[Xt + 3] * o, cs[1] = A[Xt + 4] * o, cs[2] = A[Xt + 5] * o, cs[3] = Math.cos(B);
      for (const i of Lt) {
        const t = 7 * i;
        Cs(cs, 0, A[t] - s, A[t + 1] - n, A[t + 2] - e, hs), A[t] = s + hs[0], A[t + 1] = n + hs[1], A[t + 2] = e + hs[2], ls(cs, 0, A, t + 3, Qs, 0), A.set(Qs, t + 3);
      }
    }(e, Math.min(-125.3, Math.max(-249, s + Es)) - Es), Ds(e, A.yaw, t);
  }
  const e = A.crouchTime ?? -1,
    B = A.crouchFade ?? .05;
  if (e >= 0 && e < B) {
    const n = A.crouching ? Gs(A, s, ks) : vs(A, s, Ms);
    return Ds(is(A.crouching ? vs(A, s, Ms) : Gs(A, s, ks), n, e / B, Xt, bs), A.yaw, t);
  }
  return A.crouching ? Ds(Gs(A, s, ks), A.yaw, t) : Ds(vs(A, s, Ms), A.yaw, t);
}
var Ms = new Float64Array(Xt),
  ks = new Float64Array(Xt),
  bs = new Float64Array(Xt),
  Is = new Float64Array(Xt);
function Gs(A, t, s) {
  const n = Us;
  n.set(as(qt.crouchLean, t));
  const e = os(A.hold);
  return e && Bs(n, as(e.crouchLean, t, gs, St)), A.air >= 0 || !(A.landed >= 0 && A.landed < $t) ? (s.set(n), s) : (s.set(ws(qt.landCrouch, A.landed, 20, !1).subarray(0, Xt)), e && Bs(s, ws(e.landCrouch, A.landed, 20, !1, gs, St)), us(s, n, es[e ? A.hold ?? 0 : 0]), s);
}
var Us = new Float64Array(Xt);
function vs(A, t, s) {
  const n = os(A.hold),
    e = Is;
  e.set(as(qt.lean, t)), n && Bs(e, as(n.lean, t, gs, St));
  let B = null,
    o = null,
    i = 0,
    r = 0;
  return A.air >= 0 ? (i = A.air % 1.3333, r = 20, B = ws(qt.jump, i, r, !1), o = n?.jump ?? null) : A.landed >= 0 && A.landed < _t && (i = A.landed, r = 20, B = ws(qt.land, i, r, !1), o = n?.land ?? null), B ? (s.set(B.subarray(0, Xt)), o && Bs(s, ws(o, i, r, !1, gs, St)), us(s, e, ss[n ? A.hold ?? 0 : 0]), s) : (s.set(e), s);
}
var ps = A => {
    const t = Tt[A];
    return {
      part: t.zone,
      hx: t.half[0],
      hy: t.half[1],
      hz: t.half[2],
      u: 0,
      v: 0,
      w: 0,
      xu: 1,
      xv: 0,
      xw: 0,
      yu: 0,
      yv: 1,
      yw: 0,
      zu: 0,
      zv: 0,
      zw: 1
    };
  },
  ms = () => Ds(qt.idle, 0, {
    fx: 0,
    fz: -1,
    boxes: Tt.map((item, index) => ps(index))
  }),
  Ys = (A, t = 0, s = ms()) => Ds(A ? qt.crouch : qt.idle, t, s),
  Ts = (A, t, s = 0, n) => A ?? Ys(t, s, n);
function Ls(A) {
  return Os.scale === B.headScale && Os.gap === B.chestGap || Object.assign(Os, {
    scale: B.headScale,
    gap: B.chestGap,
    standing: Rs(!1),
    crouching: Rs(!0)
  }), A ? Os.crouching : Os.standing;
}
var Js = Tt.findIndex(item => "head" === item.name),
  Rs = A => {
    const t = Ys(A),
      s = t.boxes[Js];
    let n = 1 / 0,
      e = -1 / 0;
    for (const B of t.boxes) {
      if ("body" !== B.part) continue;
      const A = Math.abs(B.xv) * B.hx + Math.abs(B.yv) * B.hy + Math.abs(B.zv) * B.hz;
      n = Math.min(n, B.v - A), e = Math.max(e, B.v + A);
    }
    return {
      body: (n + e) / 2,
      head: s.v,
      top: s.v + Math.abs(s.xv) * s.hx + Math.abs(s.yv) * s.hy + Math.abs(s.zv) * s.hz
    };
  },
  Os = {
    scale: NaN,
    gap: NaN,
    standing: Rs(!1),
    crouching: Rs(!0)
  },
  Vs = A => Ls(A).top,
  ys = class {
    grounded = !0;
    airAt = -1;
    landAt = -1;
    jumpAt = -1;
    crouching = !1;
    crouchAt = -1;
    crouchAir = !1;
    seen = !1;
    observe(A, t, s) {
      if (!this.seen) return this.seen = !0, this.grounded = A, void (void 0 !== s && (this.crouching = s));
      void 0 !== s && s !== this.crouching && (this.crouching = s, this.crouchAt = t, this.crouchAir = !A, this.crouchAir && !s && (this.jumpAt = t)), A !== this.grounded && (this.grounded = A, A ? this.landAt = t : (this.airAt = t, this.crouching || (this.jumpAt = t)));
    }
    reset() {
      this.seen = !1, this.grounded = !0, this.crouching = !1, this.crouchAir = !1, this.airAt = this.landAt = this.crouchAt = this.jumpAt = -1;
    }
  };
function js(A, t, s, n, e, B = -1, o = t, i = !1) {
  e.crouchTime = B >= 0 && n >= B ? n - B : -1, e.crouchFade = i ? .08 : .05, e.crouching = A.crouching;
  const r = o >= 0 ? o : t;
  return e.air = A.grounded || r < 0 ? -1 : n - r, e.landed = A.grounded && s >= 0 ? n - s : -1, e.pitch = A.pitch, e.yaw = A.yaw, e.emote = A.emote, e.emoteTime = A.emote >= 0 ? n - A.emoteAt : 0, e.hold = A.hold ?? 0, e;
}
var xs = () => ({
    hold: 0,
    crouchTime: -1,
    crouchFade: .05,
    crouching: !1,
    air: -1,
    landed: -1,
    pitch: 0,
    yaw: 0,
    emote: -1,
    emoteTime: 0
  }),
  zs = function (A) {
    return A[A.Ammo = 0] = "Ammo", A[A.Heal = 1] = "Heal", A[A.Box = 2] = "Box", A[A.Barricade = 3] = "Barricade", A[A.ThickSkin = 4] = "ThickSkin", A[A.QuickHands = 5] = "QuickHands", A[A.Runner = 6] = "Runner", A[A.DoubleTap = 7] = "DoubleTap", A[A.Upgrade = 8] = "Upgrade", A;
  }({}),
  Xs = {
    0: "Ammo",
    1: "Health",
    2: "Mystery Box",
    3: "Barricade",
    4: "Thick Skin",
    5: "Quick Hands",
    6: "Runner",
    7: "Double Tap",
    8: "Upgrade Bench"
  },
  Ws = {
    0: 16765503,
    1: 5034295,
    2: 6211839,
    3: 16751164,
    4: 16734810,
    5: 3989696,
    6: 16769354,
    7: 16747050,
    8: 13073919
  },
  Ss = 14721120,
  Zs = {
    hp: 600,
    halfWidth: 1.6,
    halfDepth: .35,
    ahead: 1.8,
    kits: 2,
    standing: 8
  },
  Ns = (tA.length, A => Number.isInteger(A) && (-3 === A || -1 === A || -2 === A || nA(A)) ? A : -1);
function Ks(A) {
  const t = A ? Q.find(item => item.id === A) : void 0;
  return t ? t.skin >= 0 ? t.skin : t.index : -1;
}
var qs = A => {
  return !(A > 0 && (t = A, AA.some(item => item.skinIndex === t)));
  var t;
};
function _s(A, t) {
  if (!qs(A)) return A;
  const s = Ks(t);
  return s >= 0 ? s : Ks(Q[0].id);
}
function $s(A, t, s) {
  let n = A,
    e = t;
  return (s.classSkin ?? ((A, t) => (A => A < 12 || 31 === A)(A) || A >= 0 && Ks(t) === A)(n, s.classId)) && (e = -1, s.menu || "parkour" !== s.mode ? e = t : n = 82, "kourstrike" === s.mode && (n = "t" === s.team ? 40 : 41, e = -2)), n >= 0 && !eA(n) ? null : (n < 0 && (n = 0), e = Ns(e), {
    skin: n,
    hat: e
  });
}
var An = A => A?.icon ? `characters/icons/${A.icon}` : null;
function tn(A, t, s) {
  if (!t && A > 0) {
    let t = "";
    for (const s of AA) s.skinIndex === A && s.iconPath && (t = s.iconPath);
    if (t || (t = $.find(item => "characterSkin" === item.kind && item.skinIndex === A && item.iconPath)?.iconPath ?? ""), t) return t;
  }
  const n = s ? Q.find(item => item.id === s) : void 0;
  return An(n) ?? An(Q.find(item => Ks(item.id) === A));
}
var sn = [1, 2, 4, 8],
  nn = {
    1: zs.ThickSkin,
    2: zs.QuickHands,
    4: zs.Runner,
    8: zs.DoubleTap
  };
function en(A) {
  for (const t of sn) if (nn[t] === A) return t;
  return 0;
}
var Bn = {
    1: "THICK SKIN",
    2: "QUICK HANDS",
    4: "RUNNER",
    8: "DOUBLE TAP"
  },
  on = {
    1: "+100 Health",
    2: "Faster Reload",
    4: "Faster Movement",
    8: "+50% Damage"
  },
  rn = "Double Damage",
  wn = (A, t) => 0 !== ((A ?? 0) & t),
  fn = new WeakMap();
function an(A, t) {
  const s = 6 & (t ?? 0);
  if (!s) return A;
  let n = fn.get(A);
  n || fn.set(A, n = new Map());
  const e = n.get(s);
  if (e) return e;
  const B = 2 & s ? .6 : 1,
    o = {
      ...A,
      reload: A.reload * B,
      bulletAddReloadTimes: A.bulletAddReloadTimes.map(item => item * B),
      groundSpeedMulti: A.groundSpeedMulti * (4 & s ? 1.12 : 1),
      ...(A.shells ? {
        shells: {
          ...A.shells,
          first: A.shells.first * B,
          per: A.shells.per * B,
          tail: A.shells.tail * B
        }
      } : {})
    };
  return n.set(s, o), o;
}
var gn = (A, t) => 0 !== ((A ?? 0) & (A => 0 === A ? 1 : 1 === A ? 2 : 0)(t)),
  cn = {
    "golden-glitter": HA,
    glitch: RA("glitch"),
    galaxy: EA,
    ghost: kA,
    chroma: RA("chroma")
  },
  Qn = new Set([...new Set(["glitch"]), "galaxy", "ghost"]),
  hn = A => BA(A)?.effect ?? null;
function ln(A, t, s = !1) {
  const n = hn(t);
  for (const e of A) for (const [A, t] of Object.entries(cn)) t(e, A === n, s);
}
var Cn = A => BA(A)?.outline ?? null;
function Hn(A, t) {
  const s = new Color(t.color);
  return A.defines.KOUR_OUTLINE = "", A.uniforms.uOutline = {
    value: new Vector4(s.r, s.g, s.b, t.shimmer ?? .85)
  }, A.uniforms.uGlitter = PA, A.uniforms.uOutlineWidth = {
    value: new Vector2(t.width / JA, CA)
  }, A.side = 1, A.userData.skinOutline = !0, A.needsUpdate = !0, A;
}
var un = new Map();
function En(A) {
  const t = `${A.color}|${A.width}|${A.shimmer ?? ""}`;
  let s = un.get(t);
  return s || (s = Hn(FA({
    name: "skin-outline",
    color: [1, 1, 1, 1],
    smoothness: 0
  }), A), un.set(t, s)), s;
}
var Fn = new WeakMap();
function Dn(A) {
  const t = Fn.get(A);
  if (void 0 !== t) return t;
  const s = A.getAttribute("position"),
    n = A.getAttribute("normal");
  let e = null;
  if (s && n) {
    const t = s.count,
      float32Values = new Float32Array(3 * t),
      _float32Values = new Float32Array(3 * t);
    for (let A = 0; A < t; A++) float32Values[3 * A] = s.getX(A), float32Values[3 * A + 1] = s.getY(A), float32Values[3 * A + 2] = s.getZ(A), _float32Values[3 * A] = n.getX(A), _float32Values[3 * A + 1] = n.getY(A), _float32Values[3 * A + 2] = n.getZ(A);
    e = new BufferGeometry(), e.name = `${A.name || "mesh"} (outline)`;
    for (const [s, n] of Object.entries(A.attributes)) "normal" !== s && e.setAttribute(s, n);
    e.setAttribute("normal", new BufferAttribute(DA(float32Values, _float32Values, t), 3)), e.setIndex(A.index), e.setDrawRange(A.drawRange.start, A.drawRange.count), A.boundingSphere && (e.boundingSphere = A.boundingSphere.clone()), A.boundingBox && (e.boundingBox = A.boundingBox.clone());
  }
  return Fn.set(A, e), e;
}
function Pn(A, t) {
  const s = Dn(A.geometry);
  if (!s) return null;
  const n = En(t);
  let e;
  const B = A;
  if (B.isSkinnedMesh) {
    const A = new SkinnedMesh(s, n);
    A.bindMode = B.bindMode, A.bind(B.skeleton, B.bindMatrix), e = A;
  } else e = new Mesh(s, n);
  return e.name = "skin-outline", e.userData.skinOutline = !0, e.frustumCulled = A.frustumCulled, e.renderOrder = A.renderOrder, e.matrixAutoUpdate = !1, e;
}
function dn(A) {
  return A.children.filter(child => child.userData.skinOutline);
}
var Mn = 72;
function kn(A, t) {
  const s = A.ppu || 100,
    n = A.size ?? [t?.width ?? s, t?.height ?? s],
    e = A.textureRect,
    B = e?.[2] ?? t?.width ?? n[0],
    o = e?.[3] ?? t?.height ?? n[1],
    i = A.pivot ?? [.5, .5],
    r = A.textureRectOffset ?? [(n[0] - B) / 2, (n[1] - o) / 2];
  return {
    size: [B / s, o / s],
    center: [(r[0] + B / 2 - i[0] * n[0]) / s, (r[1] + o / 2 - i[1] * n[1]) / s]
  };
}
var bn = new Matrix4(),
  In = new Matrix4(),
  Gn = new Box3(),
  Un = new Vector3(),
  vn = new Vector3(),
  pn = new Vector3(),
  mn = new Object3D(),
  Yn = new Vector3(),
  Tn = new Float64Array(36),
  Ln = new Float64Array(36),
  Jn = [new Vector3(), new Vector3(), new Vector3()];
function Rn(A, t, s, n, e) {
  let B = 0;
  for (let o = 0; o < t; o++) {
    const i = 3 * o,
      r = (o + 1) % t * 3,
      w = e * A[i + n] - .5,
      f = e * A[r + n] - .5,
      a = w <= 0,
      g = f <= 0;
    if (a && B < 12 && (s[3 * B] = A[i], s[3 * B + 1] = A[i + 1], s[3 * B + 2] = A[i + 2], B++), a !== g && B < 12) {
      const t = w / (w - f);
      s[3 * B] = A[i] + (A[r] - A[i]) * t, s[3 * B + 1] = A[i + 1] + (A[r + 1] - A[i + 1]) * t, s[3 * B + 2] = A[i + 2] + (A[r + 2] - A[i + 2]) * t, B++;
    }
  }
  return B;
}
var On = class A {
    surface = null;
    target = null;
    lifted = new Vector3();
    visit = A => this.clip(A);
    facing = new Vector3();
    static frame(A, t, s, n, e, B = [0, 0], o = .12, i = new Matrix4()) {
      return mn.position.copy(A), mn.scale.set(1, 1, 1), mn.rotation.set(0, 0, 0), mn.lookAt(Yn.copy(A).add(t)), mn.rotateZ(e), mn.translateX(B[0]), mn.translateY(B[1]), mn.scale.set(s, n, o), mn.updateMatrix(), i.copy(mn.matrix);
    }
    project(t, s, n, e, B, o, i) {
      if (i.count = 0, !this.surface) return !1;
      A.frame(t, s, n, e, B, o, .12, bn), In.copy(bn).invert(), Gn.makeEmpty();
      for (let A = 0; A < 8; A++) Gn.expandByPoint(Un.set(1 & A ? .5 : -.5, 2 & A ? .5 : -.5, 4 & A ? .5 : -.5).applyMatrix4(bn));
      return this.facing.copy(s).normalize(), this.lifted.copy(this.facing).multiplyScalar(.012), this.target = i, this.surface.trianglesIn(Gn, this.visit, !0), this.target = null, i.count > 0;
    }
    emit(A) {
      const t = this.target,
        s = t.count++,
        n = Tn[3 * A],
        e = Tn[3 * A + 1],
        B = Tn[3 * A + 2];
      Un.set(n, e, B).applyMatrix4(bn).add(this.lifted), t.positions[3 * s] = Un.x, t.positions[3 * s + 1] = Un.y, t.positions[3 * s + 2] = Un.z, t.uvs[2 * s] = n + .5, t.uvs[2 * s + 1] = e + .5;
    }
    clip(A) {
      const t = this.target;
      if (t.count + 3 > Mn) return !0;
      if (!A.intersectsBox(Gn)) return !1;
      if (A.getNormal(vn), Math.abs(vn.dot(this.facing)) < .25) return !1;
      Jn[0].copy(A.a).applyMatrix4(In), Jn[1].copy(A.b).applyMatrix4(In), Jn[2].copy(A.c).applyMatrix4(In);
      for (let i = 0; i < 3; i++) Tn[3 * i] = Jn[i].x, Tn[3 * i + 1] = Jn[i].y, Tn[3 * i + 2] = Jn[i].z;
      let s = 3;
      if (s = Rn(Tn, s, Ln, 0, 1), s = Rn(Ln, s, Tn, 0, -1), s = Rn(Tn, s, Ln, 1, 1), s = Rn(Ln, s, Tn, 1, -1), s = Rn(Tn, s, Ln, 2, 1), s = Rn(Ln, s, Tn, 2, -1), s < 3) return !1;
      const n = Tn[3] - Tn[0],
        e = Tn[4] - Tn[1],
        B = Tn[6] - Tn[0],
        o = n * (Tn[7] - Tn[1]) - e * B < 0;
      for (let i = 1; i < s - 1; i++) {
        if (t.count + 3 > Mn) return !0;
        this.emit(0), this.emit(o ? i + 1 : i), this.emit(o ? i : i + 1);
      }
      return !1;
    }
  },
  Vn = [-.5, -.5, .5, -.5, .5, .5, -.5, -.5, .5, .5, -.5, .5];
function yn(A, t, s, n, e, B, o, i) {
  pn.copy(A).addScaledVector(t, o), On.frame(pn, t, s, n, e, B, 1, bn);
  const r = i.positions,
    w = i.uvs,
    f = Vn;
  for (let a = 0; a < 6; a++) {
    const A = f[2 * a],
      t = f[2 * a + 1];
    Un.set(A, t, 0).applyMatrix4(bn), r[3 * a] = Un.x, r[3 * a + 1] = Un.y, r[3 * a + 2] = Un.z, w[2 * a] = A + .5, w[2 * a + 1] = t + .5;
  }
  i.count = 6;
}
function jn() {
  return {
    positions: new Float32Array(216),
    uvs: new Float32Array(144),
    count: 0
  };
}
var xn = class {
    slots;
    mesh;
    positions;
    uvs;
    colors;
    free = [];
    dirty = new Set();
    used = 0;
    taken;
    constructor(A, t) {
      this.slots = t;
      const s = t * Mn;
      this.positions = new Float32Array(3 * s), this.uvs = new Float32Array(2 * s), this.colors = new Float32Array(4 * s).fill(1), this.taken = new Uint8Array(t);
      const n = new BufferGeometry(),
        e = (A, t) => new BufferAttribute(A, t).setUsage(P);
      n.setAttribute("position", e(this.positions, 3)), n.setAttribute("uv", e(this.uvs, 2)), n.setAttribute("color", e(this.colors, 4)), n.setDrawRange(0, 0), this.mesh = new Mesh(n, A), this.mesh.frustumCulled = !1, this.mesh.matrixAutoUpdate = !1, this.mesh.visible = !1;
      for (let B = t - 1; B >= 0; B--) this.free.push(B);
    }
    take() {
      const A = this.free.pop() ?? -1;
      return A >= 0 && (this.taken[A] = 1), A;
    }
    release(A) {
      A < 0 || !this.taken[A] || (this.taken[A] = 0, this.positions.fill(0, A * Mn * 3, (A + 1) * Mn * 3), this.free.push(A), this.dirty.add(A));
    }
    write(A, t) {
      const s = A * Mn;
      this.positions.set(t.positions.subarray(0, 3 * t.count), 3 * s), this.uvs.set(t.uvs.subarray(0, 2 * t.count), 2 * s), this.positions.fill(0, 3 * (s + t.count), 3 * (s + Mn)), this.colors.fill(1, 4 * s, 4 * (s + Mn)), this.dirty.add(A);
    }
    $_7cxj(A, t) {
      const s = A * Mn * 4;
      if (this.colors[s + 3] !== t) {
        for (let A = 3; A < 288; A += 4) this.colors[s + A] = t;
        this.dirty.add(A);
      }
    }
    get count() {
      return this.slots - this.free.length;
    }
    flush() {
      if (!this.dirty.size) return;
      let A = 0;
      for (let s = this.slots - 1; s >= 0; s--) if (this.taken[s]) {
        A = s + 1;
        break;
      }
      this.used = A;
      const t = this.mesh.geometry;
      for (const s of ["position", "uv", "color"]) {
        const A = t.getAttribute(s);
        A.clearUpdateRanges();
        for (const t of this.dirty) A.addUpdateRange(t * Mn * A.itemSize, Mn * A.itemSize);
        A.needsUpdate = !0;
      }
      this.dirty.clear(), t.setDrawRange(0, this.used * Mn), this.mesh.visible = this.used > 0;
    }
  },
  zn = 5 * Math.PI / 180,
  Xn = jn(),
  Wn = new Vector3(),
  Sn = class {
    group = new Group();
    defs = new Map();
    ready = new Map();
    marks = [];
    $_6ot = [];
    batches = new Map();
    time = 0;
    projector = new On();
    enabled = !0;
    constructor() {
      this.group.name = "KnifeMarks";
    }
    def(A) {
      let t = this.defs.get(A);
      return t || (t = async function (A) {
        const t = w[A];
        if (!t || "Knife" !== t.kind || t.flag) return null;
        const s = (await NA("index.json")).weapons[t.model];
        return s ? (await NA(s.file)).behaviours.find(item => "Knife" === item.script)?.data?.impactPrefab?.key ?? null : null;
      }(A).then(async result => result ? (await async function (A) {
        const t = await NA(`impact-${A}.json`).catch(() => null),
          s = t?.components.find(A => "sprite" === A.type && A.sprite);
        if (!t || !s?.sprite) return null;
        const n = await KA(s.sprite).catch(() => null),
          e = n?.image;
        if (!n || !e?.width || !e.height) return null;
        const B = kn(s, e),
          o = t.nodes[s.node]?.s[0] ?? 1,
          [i, r, w] = s.color ?? [1, 1, 1];
        return {
          texture: n,
          size: [B.size[0] * o, B.size[1] * o],
          center: [B.center[0] * o, B.center[1] * o],
          color: new Color(i, r, w)
        };
      }(result)) ?? function () {
        const element = document.createElement("canvas");
        element.width = 136, element.height = 18;
        const drawingContext = element.getContext("2d"),
          s = drawingContext.createLinearGradient(0, 0, element.width, 0);
        return s.addColorStop(0, "rgba(60,58,60,0)"), s.addColorStop(.2, "rgba(60,58,60,0.85)"), s.addColorStop(.8, "rgba(60,58,60,0.85)"), s.addColorStop(1, "rgba(60,58,60,0)"), drawingContext.fillStyle = s, drawingContext.beginPath(), drawingContext.ellipse(68, 9, 66, 5, 0, 0, 2 * Math.PI), drawingContext.fill(), {
          texture: new CanvasTexture(element),
          size: [11.11936, .36 * 4.088],
          center: [0, 0],
          color: new Color(1, 1, 1)
        };
      }() : null).catch(() => null).then(result => (this.ready.set(A, result), result && vA(this.batch(result).mesh), result)), this.defs.set(A, t)), t;
    }
    batch(A) {
      let t = this.batches.get(A.texture);
      return t || (t = new xn(new MeshBasicMaterial({
        map: A.texture,
        color: A.color,
        vertexColors: !0,
        transparent: !0,
        depthWrite: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -4,
        side: 2,
        forceSinglePass: !0
      }), 36), t.mesh.name = "KnifeMarks", t.mesh.renderOrder = 2, this.group.add(t.mesh), this.batches.set(A.texture, t)), t;
    }
    preload(A) {
      return "Knife" === w[A]?.kind ? this.def(A) : null;
    }
    attack(A, t) {
      if (!this.enabled || "Knife" !== w[A]?.kind) return;
      const s = t.filter(item => item.normal && item.normal.lengthSq() > 1e-10);
      if (!s.length) return;
      const n = A,
        e = this.ready.get(n);
      if (null !== e) if (e) for (const B of s) this.spawn(e, B.at, B.normal);else this.def(n).then(result => {
        if (result) for (const t of s) this.spawn(result, t.at, t.normal);
      });
    }
    spawn(A, t, s) {
      const n = Wn.copy(s).normalize(),
        e = this.batch(A);
      for (; this.marks.length >= 32;) this.remove(this.marks.shift());
      const B = e.take();
      if (B < 0) return;
      const o = .072 * (.8 + .4 * Math.random()),
        i = A.size[0] * o,
        r = A.size[1] * o,
        w = (2 * Math.random() - 1) * zn,
        f = [A.center[0] * o, A.center[1] * o];
      this.projector.project(t, n, i, r, w, f, Xn) || yn(t, n, i, r, w, f, .04, Xn), e.write(B, Xn);
      const a = this.$_6ot.pop() ?? {
        batch: e,
        slot: B,
        born: 0
      };
      a.batch = e, a.slot = B, a.born = this.time, this.marks.push(a);
    }
    remove(A) {
      A.batch.release(A.slot), this.$_6ot.push(A);
    }
    get count() {
      return this.marks.length;
    }
    update(A) {
      if (this.time += A, this.marks.length) {
        let A = 0;
        for (const t of this.marks) {
          const s = this.time - t.born;
          s >= 12 ? this.remove(t) : (t.batch.$_7cxj(t.slot, Math.min(1, (12 - s) / 1.5)), this.marks[A++] = t);
        }
        this.marks.length = A;
      }
      for (const t of this.batches.values()) t.flush();
    }
    clear() {
      for (const A of this.marks) this.remove(A);
      this.marks = [];
      for (const A of this.batches.values()) A.flush();
    }
  };
function Zn(A) {
  A.updateMatrix(), A.matrixAutoUpdate = !1;
}
function Nn(A) {
  A.updateMatrixWorld(), A.matrixWorldAutoUpdate = !1;
}
function Kn(A) {
  A.matrixWorldAutoUpdate = !0;
}
var qn = new WeakSet();
function _n(A) {
  const t = A.updateMatrixWorld;
  return A.updateMatrixWorld = function (A) {
    if (this.visible) return qn.has(this) && (qn.delete(this), A = !0), t.call(this, A);
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || A) && (this.matrixWorldAutoUpdate && (this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix)), this.matrixWorldNeedsUpdate = !1), this.children.length && qn.add(this);
  }, A;
}
var $n = new Map();
function Ae(A) {
  if (null == A || A < 0) return null;
  let t = $n.get(A);
  var s;
  return void 0 === t && $n.set(A, (s = oA(A)?.tracer, t = "string" == typeof s && /^#[0-9a-f]{6}$/i.test(s) ? parseInt(s.slice(1), 16) : null)), t;
}
function te(A, t, s, n, e, B, o, i) {
  const r = Math.max(s, n, e);
  A[t] = B * r, A[t + 1] = o * r, A[t + 2] = i * r;
}
var se = .04,
  ne = (A, t) => `${A}:${t}`,
  ee = 1e3,
  Be = A => A.map(([A, t,, s]) => [A, t, s]);
function oe(A, t, s, n) {
  if (!A.length) {
    for (let A = 0; A < n; A++) s[A] = 1;
    return;
  }
  if (t <= A[0][0]) {
    for (let t = 0; t < n; t++) s[t] = A[0][t + 1];
    return;
  }
  for (let B = 0; B < A.length - 1; B++) {
    const e = A[B],
      o = A[B + 1];
    if (t <= o[0]) {
      const A = o[0] > e[0] ? (t - e[0]) / (o[0] - e[0]) : 0;
      for (let t = 0; t < n; t++) s[t] = e[t + 1] + (o[t + 1] - e[t + 1]) * A;
      return;
    }
  }
  const e = A[A.length - 1];
  for (let B = 0; B < n; B++) s[B] = e[B + 1];
}
var ie = new Vector3(),
  re = new Vector3(),
  we = new Vector3(),
  fe = new Vector3(),
  ae = new Vector3(),
  ge = new Vector3(),
  ce = [1, 1, 1],
  Qe = [1],
  he = jn(),
  le = 64,
  Ce = new WeakMap(),
  He = class {
    def;
    mesh;
    points = new Float32Array(192);
    born = new Float64Array(le);
    first = 0;
    count = 0;
    geometry = new BufferGeometry();
    attributes;
    position;
    color;
    uv;
    width;
    shades;
    $_79in = -1;
    $_c9v = 0;
    $_1fp = 0;
    constructor(A, t) {
      this.def = A;
      const s = A => new BufferAttribute(new Float32Array(128 * A), A).setUsage(P),
        n = s(3),
        e = s(4),
        B = s(2);
      this.attributes = [n, e, B], this.position = n, this.color = e, this.uv = B, this.geometry.setAttribute("position", n), this.geometry.setAttribute("color", e), this.geometry.setAttribute("uv", B);
      const o = [];
      for (let r = 0; r < 63; r++) {
        const A = 2 * r;
        o.push(A, A + 1, A + 2, A + 1, A + 3, A + 2);
      }
      this.geometry.setIndex(o), this.geometry.setDrawRange(0, 0), this.width = Be(A.widthCurve);
      let i = Ce.get(A);
      i || Ce.set(A, i = []), this.shades = i, this.mesh = new Mesh(this.geometry, t), this.mesh.frustumCulled = !1, this.mesh.renderOrder = 3e3, this.mesh.matrixAutoUpdate = !1;
    }
    get empty() {
      return this.count < 2;
    }
    reset(A = null) {
      null === A ? this.$_79in = -1 : (this.$_79in = (A >> 16 & 255) / 255, this.$_c9v = (A >> 8 & 255) / 255, this.$_1fp = (255 & A) / 255), this.first = this.count = 0, this.geometry.setDrawRange(0, 0), this.mesh.visible = !0;
    }
    shade(A) {
      let t = this.shades[A];
      if (t) return t;
      t = new Float64Array(5 * A);
      for (let s = 0; s < A; s++) {
        const n = s / (A - 1);
        t[5 * s] = this.def.widthMultiplier * rA(this.width, n) * .5, oe(this.def.colorKeys, n, ce, 3), oe(this.def.alphaKeys, n, Qe, 1), t[5 * s + 1] = ce[0], t[5 * s + 2] = ce[1], t[5 * s + 3] = ce[2], t[5 * s + 4] = Qe[0];
      }
      return this.shades[A] = t, t;
    }
    emit(A, t) {
      const s = t.time,
        n = this.points;
      if (this.count) {
        const t = (this.first + this.count - 1) % le * 3,
          s = n[t] - A.x,
          e = n[t + 1] - A.y,
          B = n[t + 2] - A.z;
        if (Math.sqrt(s * s + e * e + B * B) < this.def.minVertexDistance) return n[t] = A.x, n[t + 1] = A.y, void (n[t + 2] = A.z);
      }
      this.count === le && (this.first = (this.first + 1) % le, this.count--);
      const e = (this.first + this.count) % le;
      n[3 * e] = A.x, n[3 * e + 1] = A.y, n[3 * e + 2] = A.z, this.born[e] = s, this.count++;
    }
    update(A, t) {
      const s = A.time,
        n = this.def.time;
      for (; this.count && s - this.born[this.first] >= n;) this.first = (this.first + 1) % le, this.count--;
      const e = this.count;
      if (e < 2) return void this.geometry.setDrawRange(0, 0);
      const B = this.position.array,
        o = this.color.array,
        i = this.uv.array,
        r = this.shade(e),
        w = this.points,
        f = this.first + e - 1;
      for (let g = 0; g < e; g++) {
        const A = (f - g) % le * 3,
          s = (f - Math.max(0, g - 1)) % le * 3,
          n = (f - Math.min(e - 1, g + 1)) % le * 3,
          a = w[A],
          c = w[A + 1],
          Q = w[A + 2];
        re.set(w[s] - w[n], w[s + 1] - w[n + 1], w[s + 2] - w[n + 2]), we.set(t.x - a, t.y - c, t.z - Q), ie.crossVectors(re, we), ie.lengthSq() < 1e-12 && ie.set(0, 1, 0), ie.normalize();
        const h = g / (e - 1),
          l = 5 * g,
          C = r[l],
          H = 6 * g;
        B[H] = a + ie.x * C, B[H + 1] = c + ie.y * C, B[H + 2] = Q + ie.z * C, B[H + 3] = a - ie.x * C, B[H + 4] = c - ie.y * C, B[H + 5] = Q - ie.z * C;
        const u = 8 * g;
        this.$_79in < 0 ? (o[u] = o[u + 4] = r[l + 1], o[u + 1] = o[u + 5] = r[l + 2], o[u + 2] = o[u + 6] = r[l + 3]) : (te(o, u, r[l + 1], r[l + 2], r[l + 3], this.$_79in, this.$_c9v, this.$_1fp), o[u + 4] = o[u], o[u + 5] = o[u + 1], o[u + 6] = o[u + 2]), o[u + 3] = o[u + 7] = r[l + 4];
        const E = 4 * g;
        i[E] = i[E + 2] = h, i[E + 1] = 1, i[E + 3] = 0;
      }
      const a = this.attributes;
      for (let g = 0; g < a.length; g++) {
        const A = a[g];
        A.clearUpdateRanges(), A.addUpdateRange(0, 2 * e * A.itemSize), A.needsUpdate = !0;
      }
      this.geometry.setDrawRange(0, 6 * (e - 1));
    }
  },
  ue = class {
    group = new Group();
    index = null;
    loaded = new Map();
    ready = new Map();
    live = [];
    pool = new Map();
    impacts = [];
    $_5d1 = [];
    $_544r = new Map();
    $_51k = new Set();
    projector = new On();
    $_3q8 = new Map();
    $_738 = new Map();
    $_4x9 = null;
    clock = {
      time: 0
    };
    cube = new BoxGeometry(1, 1, 1);
    quad = new PlaneGeometry(1, 1);
    bulletHoles = !0;
    $_1rvq = new Sn();
    constructor() {
      this.group.name = "Bullets", this.group.add(this.$_1rvq.group);
    }
    $_5ii(A) {
      this.projector.surface = A, this.$_1rvq.projector.surface = A;
    }
    preload(A) {
      return this.load(A);
    }
    async $_5jc() {
      this.index ??= NA("bullets.json").catch(() => ({})), await Promise.all(Object.keys(await this.index).map(item => this.load(item)));
    }
    $_333(A) {
      const t = "number" == typeof A ? A : A.getHex();
      let s = this.$_3q8.get(t);
      return s || (s = new MeshBasicMaterial({
        color: A,
        transparent: !0,
        depthWrite: !1
      }), this.$_3q8.set(t, s)), s;
    }
    $_1pp(A) {
      let t = this.$_544r.get(A);
      return t || (t = (async () => {
        const t = (await NA(A).catch(() => null))?.components?.find(A => "sprite" === A.type && A.sprite);
        if (!t?.sprite) return null;
        const s = await KA(t.sprite),
          n = new xn(new MeshBasicMaterial({
            map: s,
            color: new Color(t.color[0], t.color[1], t.color[2]),
            vertexColors: !0,
            transparent: !0,
            alphaTest: .01,
            depthWrite: !1,
            polygonOffset: !0,
            polygonOffsetFactor: -2,
            polygonOffsetUnits: -4,
            side: 2,
            forceSinglePass: !0
          }), 80);
        n.mesh.name = "BulletHoles", n.mesh.renderOrder = 2, this.group.add(n.mesh);
        const e = kn(t, s.image);
        return {
          size: e.size,
          center: e.center,
          batch: n
        };
      })().catch(() => null), this.$_544r.set(A, t)), t;
    }
    load(A) {
      let t = this.loaded.get(A);
      return t || (t = (async () => {
        this.index ??= NA("bullets.json").catch(() => ({}));
        const t = (await this.index)[A];
        if (!t) return null;
        const s = await NA(t.file),
          n = await Promise.all(s.components.filter(component => "TrailRenderer" === component.type && component.enabled).map(async item => {
            const t = item.materials[0] ? s.materials[item.materials[0]] : void 0,
              n = t?.texture ? await KA(t.texture).catch(() => null) : null;
            return !n || 1006 === n.magFilter && 1006 === n.minFilter || (n.magFilter = LinearFilter, n.minFilter = LinearFilter, n.needsUpdate = !0), {
              def: item,
              material: new MeshBasicMaterial({
                map: n,
                vertexColors: !0,
                transparent: !0,
                blending: 2,
                depthWrite: !1,
                side: 2,
                forceSinglePass: !0,
                fog: !1
              })
            };
          })),
          e = s.renderers.map(item => {
            const t = s.nodes[item.node],
              [n, e, B] = (item.materials[0] ? s.materials[item.materials[0]] : void 0)?.color ?? [1, 1, 1];
            return {
              node: item.node,
              scale: new Vector3().fromArray(t.s),
              material: this.$_333(new Color(n, e, B))
            };
          }),
          B = t.impact ? await this.$_1pp(t.impact) : null,
          o = {
            info: t,
            prefab: s,
            trails: n,
            gfx: e,
            speed: t.speedCurve.length ? Be(t.speedCurve) : null,
            impact: B
          };
        return t.initialSpeed > 0 && this.recycle(this.create(A, o)), await vA(this.group), this.ready.set(A, o), o;
      })().catch(() => null), this.loaded.set(A, t)), t;
    }
    create(A, t) {
      cA("bullet");
      const s = _n(new Group()),
        n = [];
      for (const B of t.gfx) {
        const A = new Mesh(this.cube, B.material);
        A.scale.copy(B.scale), s.add(A), n.push(A);
      }
      const e = t.trails.map(item => new He(item.def, item.material));
      for (const B of e) this.group.add(B.mesh);
      return this.group.add(s), {
        key: A,
        root: s,
        gfx: n,
        trails: e,
        info: t.info,
        speed: t.speed,
        dir: new Vector3(),
        from: new Vector3(),
        distance: 0,
        age: 0,
        stopped: !1,
        left: 0,
        fresh: !0
      };
    }
    recycle(A) {
      A.root.visible = !1;
      for (const s of A.trails) s.mesh.visible = !1;
      let t = this.pool.get(A.key);
      t || this.pool.set(A.key, t = []), t.push(A);
    }
    async fire(A, t, s, n, e, B = !0, o = null) {
      const i = this.ready.get(A),
        r = i ?? (await this.load(A));
      if (!r) return;
      ae.subVectors(s, t);
      const w = ae.length();
      if (!(w < 1e-4)) {
        if (ae.divideScalar(w), B && r.info.initialSpeed > 0) {
          const s = this.pool.get(A)?.pop() ?? this.create(A, r);
          s.root.visible = !0, s.root.position.copy(t), s.root.lookAt(ge.copy(t).add(ae));
          for (let A = 0; A < s.gfx.length; A++) {
            const t = s.gfx[A];
            t.visible = !0, t.material = null === o ? r.gfx[A].material : this.$_333(o);
          }
          for (const A of s.trails) A.reset(o), A.emit(t, this.clock);
          s.dir.copy(ae), s.from.copy(t), s.distance = w, s.age = 0, s.stopped = !1, s.left = r.info.destroyDelay, s.fresh = !0, this.live.push(s);
        }
        n && this.hole(r, s, n, e, !!i);
      }
    }
    async $_amh(A, t, s, n) {
      const e = this.ready.get(A),
        B = e ?? (await this.load(A));
      B && this.hole(B, t, s, n, !!e);
    }
    hole(A, t, s, n, e) {
      if (!A.impact || !this.bulletHoles) return;
      if (!n) return void this.impact(A.impact, t, s);
      if (!e) return;
      const B = this.$_738.get(n);
      B && this.$_27m(B);
      const o = this.impact(A.impact, t, s);
      o.giveUp = this.clock.time + 1.5, o.tag = n, this.$_738.set(n, o);
    }
    $_6m5s(A, t) {
      this.$_6a3(A, null);
    }
    $_6a3(A, t) {
      if (!this.$_738.size) return;
      const s = `${A}:`;
      for (const [n, e] of this.$_738) n.startsWith(s) && !t?.has(n) && this.$_27m(e);
    }
    $_37g(A, t, s) {
      const n = this.ready.get(A),
        e = this.confirmed;
      e.clear(), s.forEach((item, index) => {
        const B = ne(t, item.index ?? index);
        e.add(B);
        const o = this.$_738.get(B);
        this.$_738.delete(B), o && (o.tag = null), o && item.normal ? (ge.copy(item.to).addScaledVector(item.normal, se), o.position.distanceTo(ge) > .01 && this.$_7o9(o, item.to, item.normal)) : o ? this.$_27m(o) : item.normal && n?.impact && this.bulletHoles && this.impact(n.impact, item.to, item.normal);
      }), this.$_6a3(t, e);
    }
    confirmed = new Set();
    $_7o9(A, t, s) {
      if (A.position.copy(t).addScaledVector(s, se), A.slot < 0 && (A.slot = A.def.batch.take()), A.slot < 0) return;
      const n = A.sx / A.def.size[0],
        e = A.def.center[0] * n,
        B = A.def.center[1] * n;
      this.projector.project(t, s, A.sx, A.sy, A.spin, [e, B], he) || yn(t, s, A.sx, A.sy, A.spin, [e, B], se, he), A.def.batch.write(A.slot, he), this.$_51k.add(A.def);
    }
    $_27m(A) {
      const t = this.impacts,
        s = t.indexOf(A);
      if (!(s < 0)) {
        for (let A = s + 1; A < t.length; A++) t[A - 1] = t[A];
        t.length--, this.$_7dm(A);
      }
    }
    $_66s() {
      this.$_7dm(this.impacts.shift());
    }
    $_7dm(A) {
      this.$_51k.add(A.def), A.def.batch.release(A.slot), A.slot = -1, null !== A.tag && (this.$_738.get(A.tag) === A && this.$_738.delete(A.tag), A.tag = null), this.$_5d1.push(A);
    }
    impact(A, t, s) {
      const n = .072 * (.8 + .4 * Math.random());
      let e = this.$_5d1.pop();
      for (e || (cA("hole"), e = {
        def: A,
        slot: -1,
        position: new Vector3(),
        sx: 0,
        sy: 0,
        spin: 0,
        until: 0,
        giveUp: 1 / 0,
        tag: null
      }), e.def = A, e.slot = -1, e.sx = A.size[0] * n, e.sy = A.size[1] * n, e.spin = Math.random() * Math.PI * 2, e.until = this.clock.time + 12, e.giveUp = 1 / 0, e.tag = null, this.$_7o9(e, t, s), this.impacts.push(e), this.$_4x9?.(e.position, s, n); this.impacts.length > 64;) this.$_66s();
      return e;
    }
    $_1qs() {
      for (const A of this.$_51k) A.batch.flush();
      this.$_51k.clear();
    }
    $_53o = A => {
      this.clock.time >= A.giveUp && this.$_27m(A);
    };
    update(A, t) {
      this.clock.time += A, this.$_1rvq.update(A);
      let s = 0;
      for (const n of this.live) {
        if (n.fresh) {
          n.fresh = !1;
          for (let A = 0; A < n.trails.length; A++) n.trails[A].update(this.clock, t);
          this.live[s++] = n;
          continue;
        }
        if (n.stopped) n.left -= A;else {
          n.age += A;
          const t = n.info.initialSpeed * (n.speed ? rA(n.speed, n.age) : 1);
          if (n.root.position.addScaledVector(n.dir, t * A), n.info.allowDistanceDestroy && n.root.position.distanceTo(n.from) >= n.distance) {
            n.root.position.copy(n.from).addScaledVector(n.dir, n.distance), n.stopped = !0;
            for (const A of n.gfx) A.visible = !1;
          }
          fe.copy(n.root.position);
          for (let A = 0; A < n.trails.length; A++) n.trails[A].emit(fe, this.clock);
        }
        let e = !0;
        for (let A = 0; A < n.trails.length; A++) {
          const s = n.trails[A];
          s.update(this.clock, t), s.empty || (e = !1);
        }
        n.stopped && e && n.left <= 0 || n.age > 10 ? this.recycle(n) : this.live[s++] = n;
      }
      for (this.live.length = s, this.$_738.size && this.$_738.forEach(this.$_53o); this.impacts.length && this.clock.time >= this.impacts[0].until;) this.$_66s();
      this.$_51k.size && this.$_1qs();
    }
    clear() {
      for (const A of this.live) this.recycle(A);
      for (this.live.length = 0; this.impacts.length;) this.$_66s();
      this.$_1qs(), this.$_738.clear(), this.$_1rvq.clear();
    }
  },
  Ee = new Set(["Knife", "Grenade", "Bomb", "RocketLauncher"]);
function Fe(A) {
  const t = A.data.behaviours.find(item => item.data && "bulletPrefab" in item.data);
  if (!t || Ee.has(t.script)) return null;
  const s = t.data.bulletPrefab?.key,
    n = t.data.bulletSpawnPoint?.node;
  return s && "number" == typeof n && A.nodes[n] ? {
    key: s,
    node: A.nodes[n]
  } : null;
}
function De(A) {
  const {
      angle: t,
      speed: s,
      life: n
    } = e.visual,
    B = (A, t) => ({
      ...A,
      s: A.s * t,
      ...(void 0 !== A.n ? {
        n: A.n * t
      } : {})
    });
  return {
    ...A,
    main: {
      ...A.main,
      startSpeed: B(A.main.startSpeed, s),
      startLifetime: B(A.main.startLifetime, n)
    },
    ...(A.shape ? {
      shape: {
        ...A.shape,
        angle: A.shape.angle * t
      }
    } : {}),
    ...(A.limitVelocity ? {
      limitVelocity: {
        ...A.limitVelocity,
        magnitude: B(A.limitVelocity.magnitude, s)
      }
    } : {})
  };
}
var Pe = class {
  world;
  rig;
  maxAmmo;
  reloadTime;
  fireRate;
  kept;
  systems = new Map();
  $_4zm = null;
  flame = null;
  reloadSmoke = null;
  $_26i = 0;
  $_htw = -1 / 0;
  $_5b7 = 1 / 0;
  $_66s1 = 1 / 0;
  time = 0;
  disposed = !1;
  constructor(A, t, s, n, e, B = !1) {
    this.world = A, this.rig = t, this.maxAmmo = s, this.reloadTime = n, this.fireRate = e, this.kept = B;
  }
  async load() {
    const A = this.rig.data,
      t = A.materials,
      s = this.kept ? null : this.rig.nodes[0],
      n = A.behaviours.find(item => "Flamethrower" === item.script)?.data?.flame?.node;
    for (const o of A.components) {
      const A = o.ps;
      if ("ParticleSystem" !== o.type || !A) continue;
      const e = o.node === n ? De(A) : A,
        B = this.rig.nodes[o.node],
        i = await this.world.attach(e, t, B, B.scale.clone(), s);
      if (this.disposed) return this.world.remove(i);
      this.systems.set(o.node, i);
    }
    const e = (t, s) => {
        const n = A.behaviours.find(item => item.script === t)?.data?.[s]?.node;
        return "number" == typeof n ? this.systems.get(n) ?? null : null;
      },
      B = A.behaviours.find(item => item.data && "aftersmokeParticleFx" in item.data);
    this.$_4zm = B ? e(B.script, "aftersmokeParticleFx") : null, this.flame = e("Flamethrower", "flame"), this.reloadSmoke = e("Minigun", "reloadSmoke");
  }
  shoot() {
    this.$_26i = this.time - this.$_htw < .5 ? this.$_26i + 1 : 0, this.$_htw = this.time, this.$_4zm?.stop(), this.$_5b7 = this.time + .2, this.flame && !this.flame.isPlaying && this.flame.play();
  }
  release() {
    this.flame?.stop();
  }
  reload() {
    this.reloadSmoke && (this.reloadSmoke.play(), this.$_66s1 = this.time + this.reloadTime - .2);
  }
  update(A) {
    var t;
    this.time += A, this.time >= this.$_5b7 && (this.$_5b7 = 1 / 0, this.$_26i > Math.trunc(.3 * this.maxAmmo) && this.$_4zm?.play()), this.time >= this.$_66s1 && (this.$_66s1 = 1 / 0, this.reloadSmoke?.stop()), this.flame?.isPlaying && this.time - this.$_htw > (t = this.fireRate, Math.max(.15, 2.5 / Math.max(t, .001))) && this.release();
  }
  rest() {
    for (const A of this.systems.values()) A.reset();
    this.$_26i = 0, this.$_htw = -1 / 0, this.$_5b7 = 1 / 0, this.$_66s1 = 1 / 0;
  }
  dispose() {
    this.disposed = !0;
    for (const A of this.systems.values()) this.world.remove(A);
    this.systems.clear();
  }
};
function de(A) {
  const t = A.skins.data;
  for (const s of tA) t[s.index] = {
    meshIndex: s.meshIndex,
    useTransparentMaterial: s.useTransparentMaterial,
    useHatIndex: s.useHatIndex,
    useBodyAttachmentIndex: s.useBodyAttachmentIndex,
    forceToUseHat: s.forceToUseHat
  }, s.headMesh && ((A.skins.headMeshes ??= {})[String(s.index)] = s.headMesh), s.attachmentMesh && ((A.skins.attachmentMeshes ??= {})[String(s.index)] = s.attachmentMesh), s.bodyMesh && ((A.skins.bodyMeshes ??= {})[String(s.index)] = s.bodyMesh), s.armsMesh && ((A.skins.armsMeshes ??= {})[String(s.index)] = s.armsMesh);
  for (let s = 0; s < t.length; s++) t[s] ??= t[0];
  for (const s of sA) s.mesh && ((A.skins.hatMeshes ??= {})[String(s.index)] = s.mesh);
  return A;
}
var Me = new Vector3(),
  ke = new Vector3(),
  be = new Vector3(),
  Ie = new Vector3(),
  Ge = new Vector3(),
  Ue = new Vector3(),
  ve = new Vector3(),
  pe = new Vector3(),
  me = new Quaternion(),
  Ye = new Quaternion(),
  Te = new Quaternion();
function Le(A, t, s) {
  return t.updateWorldMatrix(!0, !1), s.setFromMatrixPosition(t.matrixWorld), function (A, t) {
    for (let s = t; s; s = s.parent) if (s === A) return !0;
    return !1;
  }(A, t) || A.updateWorldMatrix(!0, !1), s.applyMatrix4(Je.copy(A.matrixWorld).invert());
}
var Je = new Matrix4();
function Re(A, t) {
  A.updateWorldMatrix(!0, !1), Oe(A, t);
}
function Oe(A, t) {
  const s = t.parent;
  s && t !== A && (s !== A && Oe(A, s), t.matrixAutoUpdate && t.updateMatrix(), t.matrixWorld.multiplyMatrices(s.matrixWorld, t.matrix));
}
function Ve(A, t, s) {
  return Re(A, t), s.setFromMatrixPosition(t.matrixWorld), A.worldToLocal(s);
}
function ye(A, t, s) {
  !function (A, t, s) {
    s.identity();
    for (let n = t.parent; n && n !== A; n = n.parent) s.premultiply(n.quaternion);
    s.normalize();
  }(A, t, Ye), Te.copy(Ye).invert().multiply(s).multiply(Ye), t.quaternion.premultiply(Te).normalize();
}
function je(A, t, s, n) {
  ve.copy(s).normalize(), pe.copy(n).normalize(), ve.lengthSq() < 1e-12 || pe.lengthSq() < 1e-12 || (me.setFromUnitVectors(ve, pe), ye(A, t, me));
}
function xe(A, t, s, n, e, B) {
  Le(A, t, Me), Le(A, s, ke), Le(A, n, be);
  const o = ke.distanceTo(Me),
    i = be.distanceTo(ke);
  Ie.subVectors(e, Me);
  const r = Ie.length();
  if (o < 1e-6 || i < 1e-6 || r < 1e-6) return be.distanceTo(e);
  const w = Math.min(o + i - 1e-4, Math.max(Math.abs(o - i) + 1e-4, r));
  Ie.divideScalar(r);
  const f = Math.min(1, Math.max(-1, (o * o + w * w - i * i) / (2 * o * w))),
    a = Math.sqrt(1 - f * f);
  return Ge.copy(B).addScaledVector(Ie, -B.dot(Ie)), Ge.lengthSq() < 1e-10 && Ge.set(0, -1, 0).addScaledVector(Ie, Ie.y), Ge.normalize(), Ue.copy(Me).addScaledVector(Ie, o * f).addScaledVector(Ge, o * a), je(A, t, ve.subVectors(ke, Me), pe.subVectors(Ue, Me)), Le(A, s, ke), Le(A, n, be), je(A, s, ve.subVectors(be, ke), pe.subVectors(e, ke)), Le(A, n, be), be.distanceTo(e);
}
var ze = A => A * A * (3 - 2 * A),
  Xe = {
    light: {
      time: .32,
      windup: .22,
      strike: .48,
      back: .4,
      raise: 10,
      across: 70,
      twist: 14
    },
    heavy: {
      time: .5,
      windup: .4,
      strike: .62,
      back: .9,
      raise: -45,
      across: 10,
      twist: 10
    },
    flag: {
      time: .42,
      windup: .22,
      strike: .5,
      back: .22,
      forward: .8,
      across: .3
    }
  },
  We = {
    light: {
      time: .26,
      windup: .2,
      strike: .45,
      back: .3
    },
    heavy: {
      time: .55,
      windup: .42,
      strike: .62,
      back: .7
    },
    reach: .95,
    hookReach: .85,
    inward: .6,
    twist: 16,
    hookTwist: 32,
    sweepFrom: 75,
    sweepTo: -20,
    lean: 8,
    cock: [.03, -.16],
    jabElbow: [.5, -.85, -.2],
    hookElbow: [.9, .35, -.25]
  },
  Se = new Vector3(1, 0, 0),
  Ze = new Vector3(0, 1, 0),
  Ne = new Vector3(0, 0, 1),
  Ke = new Quaternion(),
  qe = new Quaternion(),
  _e = new Vector3(),
  $e = new Vector3(),
  AB = new Vector3(),
  tB = new Vector3(),
  sB = new Vector3(),
  nB = new Vector3(),
  eB = class {
    elapsed = -1;
    shape = Xe.light;
    heavy = !1;
    start(A, t = !1) {
      this.shape = A, this.heavy = t, this.elapsed = 0;
    }
    stop() {
      this.elapsed = -1;
    }
    update(A) {
      if (this.elapsed < 0) return 0;
      this.elapsed += A;
      const t = this.elapsed / this.shape.time;
      return t >= 1 ? (this.elapsed = -1, 0) : function (A, t) {
        return A <= 0 || A >= 1 ? 0 : A < t.windup ? -t.back * ze(A / t.windup) : A < t.strike ? -t.back + (1 + t.back) * ze((A - t.windup) / (t.strike - t.windup)) : 1 - ze((A - t.strike) / (1 - t.strike));
      }(t, this.shape);
    }
    get running() {
      return this.elapsed >= 0;
    }
  },
  BB = class {
    root;
    swing = new eB();
    side = -1;
    next = -1;
    left;
    right;
    $_4oi;
    $_1jj;
    constructor(A, t) {
      this.root = A;
      const s = A => {
        const s = t(`Shoulder_${A}`),
          n = t(`Elbow_${A}`),
          e = t(`Hand_${A}`);
        return s && n && e ? {
          shoulder: s,
          elbow: n,
          hand: e
        } : null;
      };
      this.left = s("L"), this.right = s("R"), this.$_4oi = t("Spine_01"), this.$_1jj = t("Spine_02");
    }
    start(A) {
      this.side = A ? -1 : this.next, A || (this.next = -this.next), this.swing.start(A ? We.heavy : We.light, A);
    }
    stop() {
      this.swing.stop(), this.next = -1;
    }
    update(A) {
      return this.swing.update(A);
    }
    pose(A) {
      const t = this.side > 0 ? this.right : this.left;
      if (0 === A || !t) return;
      const s = this.root,
        n = this.swing.heavy,
        e = We,
        B = MathUtils.DEG2RAD;
      Le(s, t.shoulder, _e);
      const o = Math.sign(_e.x) || this.side;
      this.$_1jj && ye(s, this.$_1jj, Ke.setFromAxisAngle(Ze, -o * (n ? e.hookTwist : e.twist) * B * A)), n && this.$_4oi && A > 0 && ye(s, this.$_4oi, Ke.setFromAxisAngle(Se, e.lean * B * A)), Le(s, t.shoulder, _e), Le(s, t.elbow, $e), Le(s, t.hand, AB);
      const i = _e.distanceTo($e) + $e.distanceTo(AB);
      if (A < 0) sB.copy(AB), sB.y += e.cock[0] * -A, sB.z += e.cock[1] * -A;else {
        if (n) {
          const t = (e.sweepFrom + (e.sweepTo - e.sweepFrom) * A) * B;
          tB.set(o * Math.sin(t), 0, Math.cos(t)).multiplyScalar(i * e.hookReach).add(_e), tB.y = _e.y + .08 * i;
        } else tB.set(_e.x * (1 - e.inward), _e.y - .04 * i, _e.z + i * e.reach);
        sB.copy(AB).lerp(tB, A);
      }
      const r = n ? e.hookElbow : e.jabElbow;
      nB.set(o * r[0], r[1], r[2]).normalize(), xe(s, t.shoulder, t.elbow, t.hand, sB, nB);
    }
  },
  oB = {
    state: 1,
    scale: .6,
    grip: .65,
    spread: .75,
    reach: .42,
    forward: .1,
    side: .2,
    drop: .34,
    tilt: .15,
    lean: .15,
    turn: .45,
    inset: .45,
    elbows: [[.5, -.6, -.6], [-.4, -.85, .1]],
    sway: {
      stride: 2.8,
      angle: .17,
      roll: .07,
      bob: .025,
      full: 7
    },
    raise: {
      time: .45,
      drop: .32,
      tilt: 1
    }
  };
function iB(A = new Quaternion(), t = oB) {
  return A.setFromEuler(rB.set(t.tilt, t.turn, -t.lean, "ZXY"));
}
var rB = new Euler();
iB();
var wB = [{
    shoulder: "Shoulder_R",
    elbow: "Elbow_R",
    hand: "Hand_R",
    index: "IndexFinger_01 1",
    finger: "Finger_01 1",
    indexTip: "IndexFinger_03 1",
    fingerTip: "Finger_03 1"
  }, {
    shoulder: "Shoulder_L",
    elbow: "Elbow_L",
    hand: "Hand_L",
    index: "IndexFinger_01",
    finger: "Finger_01",
    indexTip: "IndexFinger_03",
    fingerTip: "Finger_03"
  }],
  fB = new Vector3(),
  aB = new Vector3(),
  gB = new Vector3(),
  cB = new Vector3(),
  QB = new Vector3(),
  hB = new Vector3(),
  lB = new Vector3(),
  CB = new Vector3(),
  HB = new Vector3(),
  uB = new Quaternion(),
  EB = new Quaternion(),
  FB = new Quaternion(),
  DB = new Euler(),
  PB = new Vector3(0, 1, 0),
  dB = class {
    root;
    get active() {
      return this.held;
    }
    set active(A) {
      A && !this.held && (this.raised = 0), this.held = A;
    }
    held = !1;
    raised = -1;
    mount = new Group();
    hands;
    arms = [];
    chest;
    phase = 0;
    swing = new eB();
    constructor(A, t) {
      this.root = A, this.mount.name = "flagMount", A.add(this.mount), this.hands = ["Hand_R", "Hand_L"].map(t).filter(item => !!item), this.chest = t("Spine_03"), wB.forEach((item, index) => {
        const n = Object.fromEntries(Object.entries(item).map(([A, s]) => [A, t(s)]));
        Object.values(n).some(_item => !_item) || this.arms.push({
          ...n,
          side: index,
          hint: new Vector3()
        });
      });
    }
    pose(A, t = 0, s = 0, n = !0) {
      let e = 0;
      if (this.raised >= 0) {
        this.raised += t;
        const A = this.raised / oB.raise.time;
        A >= 1 ? this.raised = -1 : e = 1 - A * A * (3 - 2 * A);
      }
      if (this.hands.length < 2 || !n) return;
      if (A || this.arms.length < 2 || !this.chest) return void this.$_utq();
      this.phase = (this.phase + t * s * Math.PI * 2 / oB.sway.stride) % (4 * Math.PI);
      const B = function (A, t) {
          const s = Math.min(1, Math.max(0, t / oB.sway.full));
          return {
            pitch: Math.sin(A) * oB.sway.angle * s,
            roll: Math.sin(.5 * A) * oB.sway.roll * s,
            bob: Math.abs(Math.cos(A)) * oB.sway.bob * s
          };
        }(this.phase, s),
        o = Le(this.root, this.chest, fB);
      this.mount.position.set(o.x + oB.side, o.y - oB.drop + B.bob - e * oB.raise.drop, o.z + oB.reach + oB.forward), uB.setFromEuler(DB.set(B.pitch + e * oB.raise.tilt, 0, B.roll, "XYZ"));
      const i = this.swing.update(t);
      this.mount.quaternion.copy(uB), 0 !== i && this.mount.quaternion.multiply(function (A, t) {
        const s = Xe.flag,
          n = A >= 0 ? A * s.forward : A;
        return Ke.setFromAxisAngle(Ne, Math.max(0, A) * s.across), qe.setFromAxisAngle(Se, n), t.copy(Ke).multiply(qe);
      }(i, EB)), this.mount.quaternion.multiply(iB(FB)), this.mount.updateMatrix(), CB.copy(PB).applyQuaternion(this.mount.quaternion);
      for (let r = 0; r < 2; r++) {
        const A = this.arms[r];
        HB.copy(this.mount.position).addScaledVector(CB, (0 === r ? -1 : 1) * oB.spread * oB.scale / 2);
        for (let t = 0; t < 2; t++) {
          const t = Le(this.root, A.hand, aB),
            s = this.$_1bu(A, gB),
            n = cB.copy(HB).sub(s).add(t),
            [e, B, o] = oB.elbows[A.side];
          xe(this.root, A.shoulder, A.elbow, A.hand, n, A.hint.set(e, B, o).normalize()), this.$_6q2(A);
        }
      }
    }
    $_1bu(A, t) {
      const s = Le(this.root, A.index, QB).add(Le(this.root, A.finger, hB)).multiplyScalar(.5),
        n = Le(this.root, A.indexTip, hB).add(Le(this.root, A.fingerTip, lB)).multiplyScalar(.5);
      return t.copy(s).lerp(n, oB.inset);
    }
    $_6q2(A) {
      const t = Le(this.root, A.index, QB),
        s = Le(this.root, A.finger, hB);
      je(this.root, A.hand, lB.subVectors(t, s), CB);
    }
    strike() {
      this.swing.start(Xe.flag);
    }
    $_utq() {
      const [A, t] = this.hands,
        s = Le(this.root, A, fB).add(Le(this.root, t, aB));
      s.multiplyScalar(.5), this.mount.position.set(s.x, s.y, s.z + oB.forward), iB(this.mount.quaternion);
    }
  },
  MB = {
    gripLower: [.110563, .305634, 0],
    gripLowerUp: [.13662, .411268, 0],
    gripUpper: [.074648, .859859, 0],
    gripUpperUp: [.044366, .921831, 0],
    nib: [-.230282, 1.392254, 0],
    nibEnd: [-.297183, 1.392254, 0],
    edgeRoot: [-.119014, 2.119014, 0],
    edgeMid: [.433803, 2.121127, 0],
    edgeTip: [.923239, 1.666901, 0],
    length: 2.4
  },
  kB = [0, 0, 0];
function bB(A, t, s) {
  let n = 1;
  for (; n < A.length - 1 && A[n].t < t;) n++;
  const e = A[Math.max(0, n - 1)],
    B = A[Math.min(A.length - 1, n)],
    o = B.t - e.t,
    i = o > 0 ? ((A, t) => "in" === A ? t * t * t : "out" === A ? 1 - (1 - t) * (1 - t) * (1 - t) : "linear" === A ? t : t * t * (3 - 2 * t))(B.ease, Math.min(1, Math.max(0, (t - e.t) / o))) : 1,
    r = e.at ?? kB,
    w = B.at ?? kB;
  for (let f = 0; f < 3; f++) s.at[f] = r[f] + (w[f] - r[f]) * i;
  return s.yaw = (e.yaw ?? 0) + ((B.yaw ?? 0) - (e.yaw ?? 0)) * i, s.pitch = (e.pitch ?? 0) + ((B.pitch ?? 0) - (e.pitch ?? 0)) * i, s.roll = (e.roll ?? 0) + ((B.roll ?? 0) - (e.roll ?? 0)) * i, s.spin = (e.spin ?? 0) + ((B.spin ?? 0) - (e.spin ?? 0)) * i, s;
}
var IB = new Vector3(0, 1, 0),
  GB = new Vector3(1, 0, 0),
  UB = new Vector3(0, 0, 1),
  vB = new Quaternion(),
  pB = new Matrix4(),
  mB = new Vector3(),
  YB = new Vector3(),
  TB = new Vector3(),
  LB = new Quaternion(),
  JB = new Vector3(...MB.gripLower),
  RB = (A, t, s) => s.set(t[0], t[1], t[2]).applyMatrix4(A);
function OB(A, t, s, n) {
  return n.set(s[0] - t[0], s[1] - t[1], s[2] - t[2]).transformDirection(A), n;
}
var VB = [.86, .92, 1],
  yB = null,
  jB = class {
    samples;
    mesh;
    ring;
    ages;
    position;
    color;
    head = 0;
    count = 0;
    constructor(A = 40) {
      this.samples = A, this.ring = new Float32Array(6 * A), this.ages = new Float32Array(A);
      const t = new BufferGeometry();
      this.position = new BufferAttribute(new Float32Array(6 * A), 3), this.position.setUsage(P), this.color = new BufferAttribute(new Float32Array(8 * A), 4), this.color.setUsage(P), t.setAttribute("position", this.position), t.setAttribute("color", this.color);
      const uint16Values = new Uint16Array(6 * (A - 1));
      for (let n = 0; n < A - 1; n++) {
        const A = 2 * n,
          t = A + 2;
        uint16Values.set([A, A + 1, t, A + 1, t + 1, t], 6 * n);
      }
      t.setIndex(new BufferAttribute(uint16Values, 1)), t.setDrawRange(0, 0), this.mesh = new Mesh(t, yB ??= new MeshBasicMaterial({
        name: "scythe-trail",
        vertexColors: !0,
        transparent: !0,
        blending: 2,
        depthWrite: !1,
        side: 2,
        toneMapped: !1
      })), this.mesh.name = "scythe-trail", this.mesh.frustumCulled = !1, this.mesh.renderOrder = 10, this.mesh.visible = !1;
    }
    push(A, t) {
      const s = this.head,
        n = this.ring;
      n[6 * s] = A.x, n[6 * s + 1] = A.y, n[6 * s + 2] = A.z, n[6 * s + 3] = t.x, n[6 * s + 4] = t.y, n[6 * s + 5] = t.z, this.ages[s] = 0, this.head = (s + 1) % this.samples, this.count = Math.min(this.samples, this.count + 1);
    }
    update(A) {
      for (; this.count > 0;) {
        const t = (this.head - this.count + this.samples) % this.samples;
        if (this.ages[t] + A < .16) break;
        this.count--;
      }
      const t = this.position.array,
        s = this.color.array,
        [n, e, B] = VB;
      for (let o = 0; o < this.count; o++) {
        const i = (this.head - this.count + o + this.samples) % this.samples,
          r = this.ages[i] += A,
          w = Math.max(0, 1 - r / .16),
          f = w * w * Math.min(1, (o + 1) / 3, (this.count - o) / 2);
        for (let A = 0; A < 2; A++) {
          const r = 2 * o + A;
          t[3 * r] = this.ring[6 * i + 3 * A], t[3 * r + 1] = this.ring[6 * i + 3 * A + 1], t[3 * r + 2] = this.ring[6 * i + 3 * A + 2];
          const w = f * (0 === A ? 0 : .42);
          s[4 * r] = n, s[4 * r + 1] = e, s[4 * r + 2] = B, s[4 * r + 3] = w;
        }
      }
      this.mesh.visible = this.count > 1, this.count > 1 && (this.position.needsUpdate = !0, this.color.needsUpdate = !0), this.mesh.geometry.setDrawRange(0, 6 * Math.max(0, this.count - 1));
    }
    get length() {
      return this.count;
    }
    clear() {
      this.count = 0, this.mesh.visible = !1, this.mesh.geometry.setDrawRange(0, 0);
    }
    dispose() {
      this.mesh.geometry.dispose();
    }
  },
  xB = 1,
  zB = 2,
  XB = 3,
  WB = 4,
  SB = {
    [xB]: 46,
    [zB]: 28,
    [XB]: 30,
    [WB]: 6
  },
  ZB = {
    [xB]: 32,
    [zB]: 0,
    [XB]: 0,
    [WB]: 0
  },
  NB = new Vector3(0, 1, 0),
  KB = new Quaternion(),
  qB = new Quaternion(),
  _B = new Quaternion();
function $B(A, t, s) {
  if (0 !== s) {
    KB.identity();
    for (let s = t.parent; s && s !== A; s = s.parent) KB.premultiply(s.quaternion);
    KB.normalize(), qB.setFromAxisAngle(NB, s * Math.PI / 180), _B.copy(KB).invert().multiply(qB).multiply(KB), t.quaternion.premultiply(_B).normalize();
  }
}
function Ao(A, t = new Matrix4()) {
  const s = A.size ?? 1,
    n = new Vector3(...(A.toAxis ?? [0, 1, 0])).normalize(),
    e = new Vector3(...(A.fromAxis ?? [0, 1, 0])).normalize(),
    B = new Matrix4().makeRotationAxis(n, (A.spin ?? 0) * ao),
    o = new Matrix4().makeRotationFromQuaternion(new Quaternion().setFromUnitVectors(n, e));
  return t.makeTranslation(A.from[0], A.from[1], A.from[2]).multiply(new Matrix4().makeScale(s, s, s)).multiply(o).multiply(B).multiply(new Matrix4().makeTranslation(-A.to[0], -A.to[1], -A.to[2]));
}
var to = {
    _doc: "Own looks of the rebuild's new weapons (FUTURE-IMPROVMENTS #70), built in the client from parts on the bones of the placeholder prefab whose arms and clips they use (apps/client/src/render/weapon-models.ts). `base`: the weapon id of that prefab (balance.ts NEW_WEAPONS); `hide`: names of its renderer nodes switched off; `parts`: boxes (`box` size) or bars (`from` -> `to`, `width` x `height`) in the prefab's rest space (prefab units: muzzle towards -x, up +y, the camera's right +z), hung on the bone `bone` so they follow every clip; `turn`: Unity Euler degrees; `color`: a palette name or [r, g, b]; a palette entry may carry `alpha` (below 1: see-through glass - the shader port's blended variant with the sky as reflection, no depth write, no sun shadow; FB30: the Heavy Sniper's scope lenses, `glass`). A part `model` (a glTF / GLB file below extracted/custom-weapons/, installed from assets-custom/weapons/ by tools/install-custom-assets.mjs) is a user-supplied model placed the same way. A weapon with an exported own rig (reference/custom-rigs.json) shows that instead.",
    palette: {
      wood: {
        color: [.6, .3, .22],
        smoothness: .1
      },
      darkWood: {
        color: [.43, .21, .15],
        smoothness: .1
      },
      metal: {
        color: [.34, .33, .31],
        metallic: .2,
        smoothness: .3
      },
      darkMetal: {
        color: [.17, .16, .16],
        metallic: .2,
        smoothness: .3
      },
      steel: {
        color: [.55, .58, .66],
        metallic: .4,
        smoothness: .45
      },
      string: {
        color: [.86, .72, .5],
        smoothness: .05
      },
      olive: {
        color: [.42, .5, .25],
        smoothness: .15
      },
      glass: {
        color: [.62, .8, .86],
        smoothness: .7,
        alpha: .2
      }
    },
    weapons: {
      crossbow: {
        base: "kar98",
        hide: ["Cube"],
        parts: [{
          name: "butt",
          bone: "Bone",
          box: [3.5, 1.8, .44],
          at: [4.15, -.35, 0],
          color: "wood"
        }, {
          name: "wrist",
          bone: "Bone",
          box: [1.7, 1.15, .38],
          at: [1.75, 0, 0],
          color: "wood"
        }, {
          name: "tiller",
          bone: "Bone",
          box: [6.3, .8, .42],
          at: [-2.15, .3, 0],
          color: "darkWood"
        }, {
          name: "rail",
          bone: "Bone",
          box: [5.8, .08, .16],
          at: [-2.3, .74, 0],
          color: "metal"
        }, {
          name: "mount",
          bone: "Bone",
          box: [.8, .7, .72],
          at: [-5.1, .45, 0],
          color: "steel"
        }, {
          name: "limbL",
          bone: "Bone",
          from: [-5.15, .6, -.3],
          to: [-4.35, .6, -2.55],
          width: .3,
          height: .22,
          color: "steel"
        }, {
          name: "limbR",
          bone: "Bone",
          from: [-5.15, .6, .3],
          to: [-4.35, .6, 2.55],
          width: .3,
          height: .22,
          color: "steel"
        }, {
          name: "capL",
          bone: "Bone",
          box: [.32, .32, .32],
          at: [-4.3, .6, -2.6],
          color: "metal"
        }, {
          name: "capR",
          bone: "Bone",
          box: [.32, .32, .32],
          at: [-4.3, .6, 2.6],
          color: "metal"
        }, {
          name: "stringL",
          bone: "Bone",
          from: [-4.3, .82, -2.55],
          to: [.35, .86, 0],
          width: .05,
          height: .05,
          color: "string"
        }, {
          name: "stringR",
          bone: "Bone",
          from: [-4.3, .82, 2.55],
          to: [.35, .86, 0],
          width: .05,
          height: .05,
          color: "string"
        }, {
          name: "nut",
          bone: "Bone",
          box: [.4, .26, .3],
          at: [.45, .82, 0],
          color: "metal"
        }, {
          name: "bolt",
          bone: "Bone",
          from: [-5.85, .86, 0],
          to: [.3, .86, 0],
          width: .08,
          height: .08,
          color: "darkWood"
        }, {
          name: "head",
          bone: "Bone",
          box: [.22, .22, .05],
          at: [-6, .86, 0],
          turn: [0, 0, 45],
          color: "steel"
        }, {
          name: "fletch",
          bone: "Bone",
          box: [.5, .2, .02],
          at: [0, .96, 0],
          color: "string"
        }, {
          name: "stirrupL",
          bone: "Bone",
          from: [-5.45, .2, -.3],
          to: [-6.3, -.45, -.3],
          width: .1,
          height: .1,
          color: "steel"
        }, {
          name: "stirrupR",
          bone: "Bone",
          from: [-5.45, .2, .3],
          to: [-6.3, -.45, .3],
          width: .1,
          height: .1,
          color: "steel"
        }, {
          name: "stirrup",
          bone: "Bone",
          box: [.1, .1, .7],
          at: [-6.3, -.45, 0],
          color: "steel"
        }, {
          name: "trigger",
          bone: "Bone",
          box: [.12, .42, .08],
          at: [1.65, -.48, 0],
          color: "darkMetal"
        }]
      },
      m14: {
        base: "scar",
        hide: ["Cylinder.001"],
        parts: [{
          name: "butt",
          bone: "body",
          box: [1.6, 1.5, .42],
          at: [3.85, .05, 0],
          color: "wood"
        }, {
          name: "wrist",
          bone: "body",
          box: [2.4, 1.05, .36],
          at: [2, .2, 0],
          color: "wood"
        }, {
          name: "plate",
          bone: "body",
          box: [.12, 1.5, .44],
          at: [4.7, .05, 0],
          color: "darkMetal"
        }, {
          name: "forend",
          bone: "body",
          box: [4.2, .6, .4],
          at: [-.7, .55, 0],
          color: "wood"
        }, {
          name: "receiver",
          bone: "body",
          box: [2.4, .42, .3],
          at: [.4, .96, 0],
          color: "darkMetal"
        }, {
          name: "guard",
          bone: "body",
          box: [2.6, .12, .26],
          at: [-1.3, .92, 0],
          color: "darkWood"
        }, {
          name: "barrel",
          bone: "body",
          from: [-4.9, .82, 0],
          to: [-2.6, .82, 0],
          width: .16,
          height: .16,
          color: "darkMetal"
        }, {
          name: "gas",
          bone: "body",
          from: [-3.7, .6, 0],
          to: [-2.6, .6, 0],
          width: .12,
          height: .12,
          color: "metal"
        }, {
          name: "frontSight",
          bone: "body",
          box: [.18, .34, .08],
          at: [-4.65, 1.04, 0],
          color: "darkMetal"
        }, {
          name: "rearSight",
          bone: "body",
          box: [.3, .3, .2],
          at: [1.35, 1.3, 0],
          color: "darkMetal"
        }, {
          name: "triggerGuard",
          bone: "body",
          box: [.8, .1, .12],
          at: [1.4, -.2, 0],
          color: "metal"
        }, {
          name: "magazine",
          bone: "mag",
          box: [.82, 1.15, .26],
          at: [.25, -.18, 0],
          turn: [0, 0, -6],
          color: "darkMetal"
        }, {
          name: "handle",
          bone: "bolt",
          box: [.26, .16, .26],
          at: [.45, .95, .3],
          color: "metal"
        }]
      },
      vss: {
        base: "awp",
        hide: [],
        parts: [{
          name: "brakeFront",
          bone: "body",
          box: [.42, .5, .86],
          at: [-10.7, .83, 0],
          color: "darkMetal"
        }, {
          name: "brakeNeck",
          bone: "body",
          box: [.16, .3, .34],
          at: [-10.41, .83, 0],
          color: "darkMetal"
        }, {
          name: "brakeRear",
          bone: "body",
          box: [.42, .5, .86],
          at: [-10.12, .83, 0],
          color: "darkMetal"
        }, {
          name: "magazine",
          bone: "mag",
          box: [1.5, 1.05, .52],
          at: [0, -.72, 0],
          color: "olive"
        }, {
          name: "magBase",
          bone: "mag",
          box: [1.6, .12, .58],
          at: [0, -1.28, 0],
          color: "darkMetal"
        }, {
          name: "clamp",
          bone: "body",
          box: [.35, .36, .5],
          at: [-7, .62, 0],
          color: "darkMetal"
        }, {
          name: "legL",
          bone: "body",
          from: [-6.85, .45, -.2],
          to: [-4.3, .36, -.3],
          width: .12,
          height: .12,
          color: "metal"
        }, {
          name: "legR",
          bone: "body",
          from: [-6.85, .45, .2],
          to: [-4.3, .36, .3],
          width: .12,
          height: .12,
          color: "metal"
        }]
      }
    },
    models: {
      scythe: {
        base: "axe",
        hide: ["axe"],
        firstPerson: {
          scale: 1,
          hold: {
            from: [.16, .305634, 0],
            fromAxis: [.026057, .105634, 0],
            to: [-.117, 1.6, 0],
            toAxis: [.013, .1, 0],
            spin: 175,
            size: 1
          }
        },
        parts: [{
          name: "scythe",
          bone: "axe",
          model: "scythe.glb",
          mirror: !0,
          turn: [34.13, 126.06, -83.23],
          scale: 10,
          at: [.737, -1.719, 4.516],
          metallic: .2,
          smoothness: .35,
          materials: {
            GripA: [.25, .16, .12],
            GripB: [.11, .09, .09],
            BladeX: [.74, .77, .82]
          }
        }]
      },
      vss: {
        base: "awp",
        hide: ["Cylinder.003"],
        relativeSize: 1.7,
        move: {
          bulletSpawnPoint: [-9.62, .4825, 0]
        },
        parts: [{
          name: "heavysniper",
          bone: "body",
          model: "heavysniper.glb",
          mirror: !0,
          scale: 15,
          at: [-17.4475, .4825, 0],
          smoothness: .1,
          materials: {
            lens: "glass"
          },
          follow: {
            bolt: "boltmove",
            magazine: "mag"
          }
        }]
      },
      instagib: {
        base: "awp",
        hide: ["Cylinder.003"],
        flash: !1,
        relativeSize: 1.5,
        firstPerson: {
          scale: .82
        },
        move: {
          bulletSpawnPoint: [-5.85, .8, 0]
        },
        parts: [{
          name: "instagib",
          bone: "body",
          model: "instagib.glb",
          mirror: !0,
          scale: 9.5,
          at: [.143, .571, 0],
          smoothness: .3,
          follow: {
            charger: "boltmove",
            cells: "mag"
          }
        }]
      },
      crossbow: {
        base: "kar98",
        hide: ["Cube"],
        flash: !1,
        move: {
          bulletSpawnPoint: [-4.63, .95, 0]
        },
        parts: [{
          name: "crossbow",
          bone: "Bone",
          model: "poxel-crossbow.glb",
          textures: !0,
          mirror: !0,
          turn: [0, 90, 0],
          scale: 11,
          at: [-1.44, .347, 0],
          clips: {
            Shoot: {
              clip: "release",
              to: .3
            },
            Reload: {
              clip: "reload",
              from: .3,
              to: .75
            }
          },
          empty: "release"
        }]
      }
    },
    skins: {
      _doc: "How the weapon skins (Weapon.SetSkin, the shop's weapon skins) dress a model part, by its model file (ModelPart.skin of a part wins; render/weapon-models.ts ModelSkin, FB4SKIN 2026-10-24). 'uv': the skins are painted for the model's own UV layout (the poxel.io Heavy Sniper and its gunskin textures until FB11HEAVY; no model uses it now): the texture of every textured surface is swapped. Otherwise the model has no UVs and wears the original pattern skins the way TriplanarPatterns draws them on the original weapons: the materials (glTF names) of `pattern` show the skin texture projected per face along the model's axes (the blue channel of the _PatternMask), `accent` / `detail` the skin's palette texels of the red / green channel, all others its base texel. m14.glb: wooden stock and handguard patterned, magazine and butt plate accent, every metal part detail (the grey (65, 69, 73) of most pattern textures). heavysniper.glb (FB26, the user's OBJ painted by tools/split-weapon-model.py): stock, receiver and magazine patterned, rail, scope rings, barrel collar and rings and the muzzle brake accent, barrel, bolt, trigger group, bipod, scope and butt pad detail, the glass lenses kept (FB30, `keep`: never dressed - the box skins pass them by too -, palette `glass`, see-through); its rigid parts share one projection frame (flattenModel skinFrame). instagib.glb has no shop skins.",
      "heavysniper.glb": {
        pattern: ["stock", "receiver", "magazine"],
        accent: ["accent"],
        detail: ["metal", "scope", "pad"],
        keep: ["lens"]
      },
      "m14.glb": {
        pattern: ["Material", "Material.002"],
        accent: ["Material.012", "Material.011"],
        detail: ["Material.004", "Material.005", "Material.006", "Material.007", "Material.008", "Material.009", "Material.010", "Material.013", "Material.014", "bolt1", "bolt2"]
      }
    }
  },
  so = to.weapons,
  no = to.models ?? {};
function eo(A) {
  if (A.skin) return A.skin;
  const t = A.model && Object.hasOwn(to.skins ?? {}, A.model) ? to.skins[A.model] : null;
  return "uv" === t || t && "object" == typeof t ? t : void 0;
}
var Bo = (A, t) => Object.hasOwn(A, t) ? A[t] : null;
function oo(A, s = {}) {
  return !A || t(A) ? [] : [Bo(s, A), Bo(no, A), Bo(so, A)].filter(item => !!item);
}
var io = "/assets/extracted/custom-weapons/",
  ro = null;
function wo() {
  return ro ??= wA(`${io}models.json`).then(result => result.ok ? result.json() : {}).then(result => result?.weapons ?? {}).catch(() => ({}));
}
function fo(A) {
  const t = "string" == typeof A.color ? to.palette[A.color] : void 0;
  return {
    color: Array.isArray(A.color) ? A.color : t?.color ?? [.5, .5, .5],
    metallic: A.metallic ?? t?.metallic ?? 0,
    smoothness: A.smoothness ?? t?.smoothness ?? .2,
    ...(void 0 !== t?.alpha && t.alpha < 1 ? {
      alpha: t.alpha
    } : {})
  };
}
var ao = MathUtils.DEG2RAD,
  go = new Vector3(1, 0, 0);
function co(A) {
  const t = new Vector3(),
    s = new Quaternion(),
    n = new Vector3(1, 1, 1);
  if (A.from && A.to) {
    const e = new Vector3(...A.from),
      B = new Vector3(...A.to);
    t.addVectors(e, B).multiplyScalar(.5);
    const o = B.clone().sub(e);
    n.set(o.length(), A.height ?? .1, A.width ?? .1), o.lengthSq() > 1e-12 && s.setFromUnitVectors(go, o.normalize());
  } else t.fromArray(A.at ?? [0, 0, 0]), A.box && n.fromArray(A.box);
  return A.turn && s.multiply(new Quaternion().setFromEuler(new Euler(A.turn[0] * ao, A.turn[1] * ao, A.turn[2] * ao, "YXZ"))), {
    position: t,
    quaternion: s,
    size: n
  };
}
function Qo(A, t) {
  const s = new Matrix4(),
    n = new Matrix4();
  for (let e = t; e > 0; e = A.data.nodes[e].parent) {
    const t = A.data.nodes[e];
    n.compose(new Vector3(...t.t), new Quaternion(...t.r), new Vector3(...t.s)), s.premultiply(n);
  }
  return s;
}
var ho = new BoxGeometry(1, 1, 1),
  lo = new Map(),
  Co = new Map();
function Ho(A) {
  return uo(fo(A), "string" == typeof A.color ? A.color : null);
}
function uo(A, t, s = 0, n = !1) {
  const e = void 0 !== A.alpha && A.alpha < 1,
    B = `${A.color.join(",")}|${A.metallic}|${A.smoothness}${0 === s ? "" : `|${s}`}${n ? "|vc" : ""}${e ? `|a${A.alpha}` : ""}`;
  let o = lo.get(B);
  return o || (o = FA({
    name: `weapon-model:${t ?? B}`,
    color: [A.color[0], A.color[1], A.color[2], e ? A.alpha : 1],
    metallic: A.metallic,
    smoothness: A.smoothness,
    side: s,
    vertexColors: n,
    ...(e ? {
      transparent: !0,
      depthWrite: !1,
      reflection: !0
    } : {})
  }), lo.set(B, o)), o;
}
function Eo(A, t) {
  const s = A.materials && Object.hasOwn(A.materials, t.name) ? A.materials[t.name] : null;
  if (s) {
    const t = "string" == typeof s ? to.palette[s] : void 0;
    return fo({
      ...A,
      color: s,
      metallic: t?.metallic ?? A.metallic,
      smoothness: t?.smoothness ?? A.smoothness
    });
  }
  const n = t.color ? t.color.clone().convertLinearToSRGB() : new Color(.5, .5, .5),
    e = A.lift ?? 1;
  return {
    color: [n.r, n.g, n.b].map(item => Math.min(1, item * e)),
    metallic: A.metallic ?? 0,
    smoothness: A.smoothness ?? .2
  };
}
var Fo = A => ({
  color: [1, 1, 1],
  metallic: A.metallic ?? .1,
  smoothness: A.smoothness ?? .25
});
async function Do(A, t, s = new Set()) {
  if (t.textures) return async function (A, t) {
    const {
        clone: s
      } = await fA(async () => {
        const {
          clone: A
        } = await import("./three-Bi9Yyrpt.js").then(result => result.n);
        return {
          clone: A
        };
      }, __vite__mapDeps([0, 1])),
      n = s(A),
      e = A => 2 === A.side ? 2 : 0,
      B = A => {
        const s = A,
          n = !!t.materials && Object.hasOwn(t.materials, s.name),
          {
            look: B,
            map: o
          } = function (A, t) {
            const s = t.color ? t.color.clone().convertLinearToSRGB() : new Color(1, 1, 1);
            return {
              look: {
                color: [s.r, s.g, s.b],
                metallic: A.metallic ?? t.metalness ?? 0,
                smoothness: A.smoothness ?? 1 - (t.roughness ?? 1)
              },
              map: t.map ?? null
            };
          }(t, s);
        return o && !n ? function (A, t, s, n) {
          const e = `tex:${t.uuid}|${A.color.join(",")}|${A.metallic}|${A.smoothness}|${n}`;
          let B = lo.get(e);
          return B || (t.colorSpace = YA, B = FA({
            name: `weapon-model:${s}`,
            color: [A.color[0], A.color[1], A.color[2], 1],
            metallic: A.metallic,
            smoothness: A.smoothness,
            side: n,
            map: t
          }), lo.set(e, B)), B;
        }(B, o, s.name || t.name, e(s)) : uo(Eo(t, s), s.name || null, e(s));
      };
    return n.traverse(A => {
      const t = A;
      t.isMesh && (t.material = Array.isArray(t.material) ? t.material.map(B) : B(t.material), t.frustumCulled = !1);
    }), n;
  }(A, t);
  const [{
      clone: n
    }, {
      mergeGeometries: e
    }] = await Promise.all([fA(() => import("./three-Bi9Yyrpt.js").then(result => result.n), __vite__mapDeps([0, 1])), fA(() => import("./three-Bi9Yyrpt.js").then(result => result.i), __vite__mapDeps([0, 1]))]),
    B = n(A),
    o = A => 2 === A.side ? 2 : 0,
    lookupMap = new Map(),
    r = [],
    _lookupMap = new Map(),
    f = eo(t),
    uniqueItems = new Set(f && "uv" !== f ? f.keep ?? [] : []);
  B.traverse(A => {
    const n = A;
    if (!n.isMesh) return;
    !Array.isArray(n.material) && uniqueItems.has(n.material.name) && (n.userData.keepLook = !0);
    const e = n;
    if (e.isSkinnedMesh && !Array.isArray(n.material) && n.parent) {
      const A = n.material,
        s = [e.skeleton.bones.map(bone => bone.uuid).join(","), e.skeleton.boneInverses.map(item => item.elements.join(",")).join(";"), n.parent.uuid, e.bindMatrix.elements.join(","), n.position.toArray().join(","), n.quaternion.toArray().join(","), n.scale.toArray().join(","), o(A)].join("|"),
        B = lookupMap.get(s) ?? [];
      B.push({
        mesh: e,
        color: Eo(t, A).color,
        name: A.name
      }), lookupMap.set(s, B);
    } else if (!e.isSkinnedMesh && (A => !(Array.isArray(A.material) || !A.parent || A.children.length || uniqueItems.has(A.material.name) || s.has(A.name) || s.has(PropertyBinding.sanitizeNodeName(A.name))))(n)) {
      const A = `${n.parent.uuid}|${o(n.material)}`;
      _lookupMap.set(A, [...(_lookupMap.get(A) ?? []), n]);
    } else r.push(n);
  }), function (A, t, s, n) {
    const e = [];
    for (const w of s) {
      const A = 1 === w.length,
        s = w.map(item => {
          const n = item.geometry,
            e = new BufferGeometry();
          e.setAttribute("position", n.getAttribute("position").clone()), n.getAttribute("normal") ? e.setAttribute("normal", n.getAttribute("normal").clone()) : e.computeVertexNormals(), n.index && e.setIndex(n.index.clone()), A || (item.updateMatrix(), e.applyMatrix4(item.matrix));
          const B = Eo(t, item.material).color,
            o = e.getAttribute("position").count,
            float32Values = new Float32Array(4 * o),
            r = n.getAttribute("color");
          for (let A = 0; A < o; A++) {
            const t = r ? r.getX(A) : 1;
            float32Values.set([B[0] * t, B[1] * t, B[2] * t, 1], 4 * A);
          }
          return e.setAttribute("color", new BufferAttribute(float32Values, 4)), e;
        }),
        B = s.every(item => item.index) ? s : s.map(item => item.index ? item.toNonIndexed() : item),
        o = A ? B[0] : n(B, !1);
      if (!o) {
        for (const A of w) {
          const s = A.material;
          A.material = uo(Eo(t, s), s.name || null, 2 === s.side ? 2 : 0), A.frustumCulled = !1;
        }
        continue;
      }
      let i = 0;
      o.userData.skinRanges = B.map((item, index) => {
        const s = item.getAttribute("position").count,
          n = {
            name: w[index].material.name,
            start: i,
            count: s
          };
        return i += s, n;
      });
      const r = w[0],
        f = 2 === r.material.side ? 2 : 0,
        a = uo(Fo(t), t.name, f, !0);
      if (A) {
        r.geometry = o, r.material = a, r.frustumCulled = !1, e.push(r);
        continue;
      }
      const g = new Mesh(o, a);
      g.name = `${r.parent.name}:flat`, g.frustumCulled = !1, r.parent.add(g);
      for (const t of w) t.removeFromParent();
      e.push(g);
    }
    if (!e.length) return;
    A.updateMatrixWorld(!0);
    const B = A.matrixWorld.clone().invert(),
      o = new Box3(),
      i = new Vector3(),
      r = e.map(item => {
        const t = B.clone().multiply(item.matrixWorld),
          s = item.geometry.getAttribute("position");
        for (let n = 0; n < s.count; n++) o.expandByPoint(i.fromBufferAttribute(s, n).applyMatrix4(t));
        return t;
      });
    e.forEach((item, index) => {
      item.geometry.userData.skinFrame = {
        matrix: r[index].elements.slice(),
        min: o.min.toArray(),
        max: o.max.toArray()
      };
    });
  }(B, t, [..._lookupMap.values()], e);
  for (const g of r) {
    const A = A => uo(Eo(t, A), A.name || null, o(A));
    g.material = Array.isArray(g.material) ? g.material.map(A) : A(g.material), g.frustumCulled = !1;
  }
  for (const g of lookupMap.values()) {
    const A = g[0].mesh,
      s = g.map(({
        mesh: A,
        color: t
      }) => {
        const s = new BufferGeometry(),
          n = A.geometry;
        for (const o of ["position", "normal", "skinIndex", "skinWeight"]) n.getAttribute(o) && s.setAttribute(o, n.getAttribute(o));
        n.index && s.setIndex(n.index), s.getAttribute("normal") || s.computeVertexNormals();
        const e = s.getAttribute("position").count,
          float32Values = new Float32Array(4 * e);
        for (let o = 0; o < e; o++) float32Values.set([t[0], t[1], t[2], 1], 4 * o);
        return s.setAttribute("color", new BufferAttribute(float32Values, 4)), s;
      }),
      n = s.every(item => item.index) ? s : s.map(item => item.index ? item.toNonIndexed() : item),
      B = n.every(item => item.getAttribute("skinIndex")) && n.length ? e(n, !1) : null;
    if (!B) {
      for (const {
        mesh: A,
        color: s
      } of g) {
        const n = o(A.material);
        A.material = uo({
          ...Eo(t, {
            name: ""
          }),
          color: s
        }, null, n), A.frustumCulled = !1;
      }
      continue;
    }
    let i = 0;
    B.userData.skinRanges = n.map((item, index) => {
      const s = item.getAttribute("position").count,
        n = {
          name: g[index].name,
          start: i,
          count: s
        };
      return i += s, n;
    });
    const r = o(A.material),
      w = new SkinnedMesh(B, uo(Fo(t), t.name, r, !0));
    w.name = `${A.name}:flat`, w.position.copy(A.position), w.quaternion.copy(A.quaternion), w.scale.copy(A.scale), w.frustumCulled = !1, A.parent.add(w), w.bind(A.skeleton, A.bindMatrix);
    for (const {
      mesh: t
    } of g) t.removeFromParent();
  }
  return B;
}
var Po = [1, -1, 0, 1],
  Mo = {
    base: [.1796875, .4],
    accent: [.1796875, .186],
    detail: [.128999993, .186]
  },
  ko = {
    u0: 0,
    u1: 1,
    v0: .42,
    v1: 1
  },
  bo = new WeakMap();
function Io(A, t) {
  let s = bo.get(A);
  s || bo.set(A, s = new Map());
  const serializedValue = JSON.stringify(t);
  let e = s.get(serializedValue);
  return e || s.set(serializedValue, e = function (A, t) {
    const s = A.userData.skinRanges ?? [],
      n = A.getAttribute("position"),
      e = A.index,
      B = e ? e.count : n.count,
      o = A => e ? e.getX(A) : A,
      i = A.userData.skinFrame,
      r = i ? new Matrix4().fromArray(i.matrix) : null,
      w = i ? [...i.min] : [1 / 0, 1 / 0, 1 / 0],
      f = i ? [...i.max] : [-1 / 0, -1 / 0, -1 / 0];
    if (!i) for (let D = 0; D < n.count; D++) for (let A = 0; A < 3; A++) {
      const t = n.getComponent(D, A);
      t < w[A] && (w[A] = t), t > f[A] && (f[A] = t);
    }
    const a = [0, 1, 2].map(item => Math.max(f[item] - w[item], 1e-9)),
      [g, c, Q] = [0, 1, 2].sort((leftItem, rightItem) => a[rightItem] - a[leftItem] || leftItem - rightItem),
      h = ko,
      l = Math.min((h.u1 - h.u0) / a[g], (h.v1 - h.v0) / Math.max(a[c], a[Q])),
      C = A => {
        const n = s.find(item => A >= item.start && A < item.start + item.count)?.name ?? "";
        return t.pattern.includes(n) ? "pattern" : t.accent?.includes(n) ? "accent" : t.detail?.includes(n) ? "detail" : "base";
      },
      H = new BufferGeometry();
    for (const D of ["position", "normal", "skinIndex", "skinWeight"]) {
      const t = A.getAttribute(D);
      if (!t) continue;
      const s = new t.array.constructor(B * t.itemSize);
      for (let A = 0; A < B; A++) for (let n = 0; n < t.itemSize; n++) s[A * t.itemSize + n] = t.getComponent(o(A), n);
      H.setAttribute(D, new BufferAttribute(s, t.itemSize, t.normalized));
    }
    const float32Values = new Float32Array(2 * B),
      E = [new Vector3(), new Vector3(), new Vector3()],
      F = new Vector3(),
      P = new Vector3();
    for (let D = 0; D < B; D += 3) {
      const A = C(o(D));
      if ("pattern" !== A) {
        for (let t = 0; t < 3; t++) float32Values.set(Mo[A], 2 * (D + t));
        continue;
      }
      for (let w = 0; w < 3; w++) E[w].fromBufferAttribute(n, o(D + w)), r && E[w].applyMatrix4(r);
      const t = F.subVectors(E[1], E[0]).cross(P.subVectors(E[2], E[0])),
        s = [Math.abs(t.getComponent(g)), Math.abs(t.getComponent(c))],
        e = Math.abs(t.getComponent(Q)),
        [B, i] = e >= s[0] && e >= s[1] ? [g, c] : s[1] >= s[0] ? [g, Q] : [Q, c];
      for (let n = 0; n < 3; n++) float32Values[2 * (D + n)] = h.u0 + (E[n].getComponent(B) - w[B]) * l, float32Values[2 * (D + n) + 1] = h.v0 + (E[n].getComponent(i) - w[i]) * l;
    }
    return H.setAttribute("uv", new BufferAttribute(float32Values, 2)), H;
  }(A, t)), e;
}
function Go(A, t, s, n, e, B = null, o = !1) {
  const i = `skin:${A.uuid}|${t.color.join(",")}|${t.metallic}|${t.smoothness}|${s}|${e?.join(",") ?? ""}|${B ?? ""}|${o ? "box" : ""}`;
  let r = lo.get(i);
  return r || (r = FA({
    name: `weapon-model-skin:${n}`,
    color: [t.color[0], t.color[1], t.color[2], 1],
    metallic: t.metallic,
    smoothness: t.smoothness,
    side: s,
    map: A,
    mapST: e ? [...e] : void 0
  }), TA(r, B, o), lo.set(i, r)), r;
}
function Uo(A, t, s = null) {
  const n = A.uniforms;
  if (!n?.uMap?.value) return A;
  const e = n.uColor.value;
  return Go(t, {
    color: [e.x, e.y, e.z],
    metallic: n.uMetallic.value,
    smoothness: n.uSmoothness.value
  }, A.side, A.name, Po, s);
}
var vo = new WeakMap();
function po(A, t, s = null) {
  for (const {
    part: n,
    skin: e,
    object: B
  } of A) B.traverse(A => {
    const B = A;
    if (!B.isMesh) return;
    let o = vo.get(B);
    o || vo.set(B, o = {
      material: B.material,
      geometry: B.geometry
    }), B.material = o.material, B.geometry = o.geometry, t && ("uv" !== e ? o.geometry.userData.skinRanges && !Array.isArray(o.material) && (B.geometry = Io(o.geometry, e), B.material = Go(t, Fo(n), o.material.side, n.name, void 0, s)) : B.material = Array.isArray(o.material) ? o.material.map(item => Uo(item, t, s)) : Uo(o.material, t, s));
  });
  return A.length > 0;
}
var mo = new WeakMap(),
  Yo = new Map();
function To(A) {
  const serializedValue = JSON.stringify([A.model, A.materials ?? {}, A.metallic, A.smoothness, A.lift, A.name, !!A.textures, eo(A) ?? null]);
  let s = Yo.get(serializedValue);
  return s || (s = function (A) {
    let t = Co.get(A);
    return t || (t = fA(async () => {
      const {
        GLTFLoader: A
      } = await import("./three-Bi9Yyrpt.js").then(result => result.t);
      return {
        GLTFLoader: A
      };
    }, __vite__mapDeps([0, 1])).then(({
      GLTFLoader: t
    }) => new t().register(A => function (A) {
      return {
        name: Jo,
        extendMaterialParams(t, s) {
          const n = A.json.materials?.[t]?.extensions?.[Jo]?.diffuseFactor;
          return n && (s.color = new Color().setRGB(n[0], n[1], n[2], LinearSRGBColorSpace)), Promise.resolve();
        }
      };
    }(A)).loadAsync(`${io}${A}`)).then(result => ({
      scene: result.scene,
      animations: result.animations
    })).catch(error => (console.warn(`weapon model ${A} missing`, error), null)), Co.set(A, t)), t;
  }(A.model).then(async result => {
    if (!result) return null;
    const uniqueItems = new Set(result.animations.flatMap(animation => animation.tracks.map(track => PropertyBinding.parseTrackName(track.name).nodeName)));
    return {
      scene: await Do(result.scene, A, uniqueItems),
      animations: result.animations
    };
  }), Yo.set(serializedValue, s)), s;
}
async function Lo(A, t) {
  const s = await wo();
  for (const n of oo(A, s)) for (const A of n.parts) {
    if (!A.model) continue;
    const s = (await To(A))?.scene.getObjectByName(t);
    if (s?.isMesh) return s;
  }
  return null;
}
var Jo = "KHR_materials_pbrSpecularGlossiness",
  Ro = class {
    animators;
    parts = [];
    loaded = !0;
    constructor(A) {
      this.animators = A;
    }
    add(A, t, s, n) {
      const e = new AnimationMixer(A),
        lookupMap = new Map();
      for (const [a, g] of Object.entries(s)) {
        const {
            clip: A,
            from: s = 0,
            to: n = 1
          } = "string" == typeof g ? {
            clip: g
          } : g,
          o = t.find(item => item.name === A);
        if (!o) {
          console.warn(`weapon model: no animation "${A}" for state ${a}`);
          continue;
        }
        const i = e.clipAction(o);
        i.setLoop(C, 1), i.clampWhenFinished = !0, lookupMap.set(a, {
          action: i,
          from: s,
          to: Math.max(n, s + 1e-6)
        });
      }
      if (!lookupMap.size) return !1;
      const o = n ? t.find(item => item.name === n) : void 0;
      n && !o && console.warn(`weapon model: no animation "${n}" (empty)`);
      let i = null;
      o && (i = e.clipAction(o), i.setLoop(C, 1), i.clampWhenFinished = !0);
      const uniqueItems = new Set(),
        w = [...lookupMap.values()].map(item => item.action.getClip());
      o && w.push(o);
      for (const a of w) for (const t of a.tracks) {
        const {
            nodeName: s
          } = PropertyBinding.parseTrackName(t.name),
          n = PropertyBinding.findNode(A, s);
        n && n !== A && uniqueItems.add(n);
      }
      const f = [...uniqueItems].map(item => ({
        node: item,
        p: item.position.clone(),
        q: item.quaternion.clone(),
        s: item.scale.clone()
      }));
      return this.parts.push({
        mixer: e,
        actions: lookupMap,
        empty: i,
        rest: f,
        shown: null
      }), !0;
    }
    sync() {
      for (const A of this.parts) {
        let t = null,
          s = 0;
        for (const n of this.animators) {
          const e = n.currentState(0),
            B = e.state ? A.actions.get(e.state.name) : void 0;
          if (!B) continue;
          t = B.action;
          const o = e.normalizedTime,
            i = e.state.loop ? o - Math.floor(o) : Math.min(1, Math.max(0, o));
          s = Math.min(1, Math.max(0, (i - B.from) / (B.to - B.from)));
          break;
        }
        if (t || this.loaded || !A.empty || (t = A.empty, s = 1), t !== A.shown) if (A.shown?.stop(), A.shown = t, t) t.play();else for (const n of A.rest) n.node.position.copy(n.p), n.node.quaternion.copy(n.q), n.node.scale.copy(n.s);
        t && (t.time = s * t.getClip().duration, A.mixer.update(0));
      }
    }
  };
function Oo(A, t, s) {
  s.identity();
  for (let n = A; n && n !== t; n = n.parent) s.premultiply(Vo.compose(n.position, n.quaternion, n.scale));
  return s;
}
var Vo = new Matrix4(),
  yo = class {
    links = [];
    delta = new Matrix4();
    inverse = new Matrix4();
    local = new Matrix4();
    add(A, t, s, n) {
      const e = [];
      for (const [B, o] of Object.entries(n)) {
        const n = A.getObjectByName(B) ?? A.getObjectByName(PropertyBinding.sanitizeNodeName(B)),
          i = s(o);
        if (!n || !i) {
          console.warn(`weapon model: cannot follow ${o} with ${B}`);
          continue;
        }
        let r = 0;
        for (let A = n; A && A !== t; A = A.parent) r++;
        e.push({
          node: n,
          bone: i,
          stop: t,
          boneRestInverse: Oo(i, t, new Matrix4()).invert(),
          nodeRest: Oo(n, t, new Matrix4()),
          current: Oo(n, t, new Matrix4()),
          parent: null,
          parentInverse: n.parent ? Oo(n.parent, t, new Matrix4()).invert() : new Matrix4(),
          depth: r
        });
      }
      for (const B of e) B.parent = e.find(item => item.node === B.node.parent) ?? null;
      return this.links.push(...e), this.links.sort((leftItem, rightItem) => leftItem.depth - rightItem.depth), e;
    }
    sync() {
      for (const A of this.links) {
        this.delta.multiplyMatrices(Oo(A.bone, A.stop, this.delta), A.boneRestInverse), A.current.multiplyMatrices(this.delta, A.nodeRest);
        const t = A.parent ? this.inverse.copy(A.parent.current).invert() : A.parentInverse;
        this.local.multiplyMatrices(t, A.current).decompose(A.node.position, A.node.quaternion, A.node.scale);
      }
    }
  },
  jo = new WeakMap(),
  xo = new WeakMap();
function zo(A, t) {
  return xo.get(A) ?? t;
}
function Xo(A, t) {
  const s = A ? jo.get(A) : void 0;
  s && (s.loaded = t);
}
async function Wo(A, t, s = "world") {
  const n = "first" === s ? t.firstPerson?.scale ?? 1 : 1,
    e = new Vector3().fromArray(t.firstPerson?.pivot ?? t.parts.find(item => item.model)?.at ?? [0, 0, 0]),
    B = A => A.sub(e).multiplyScalar(n).add(e),
    uniqueItems = new Set(t.hide);
  A.data.renderers.forEach((item, index) => {
    const n = A.meshes[index];
    n && uniqueItems.has(A.data.nodes[item.node]?.name ?? "") && (n.visible = !1);
  });
  const lookupMap = new Map();
  let r = null,
    w = null;
  const f = [],
    a = [],
    g = function (A, t) {
      const s = (A.data.behaviours ?? []).find(item => 0 === item.node && item.data && Array.isArray(item.data.weaponRenderers))?.data?.weaponRenderers?.find(A => "number" == typeof A?.node);
      if ("number" == typeof s?.node) return s.node;
      const n = A.data.renderers.find(item => t.has(A.data.nodes[item.node]?.name ?? ""));
      return n ? n.node : -1;
    }(A, uniqueItems);
  t.relativeSize && xo.set(A, t.relativeSize);
  for (const [h, l] of Object.entries(t.move ?? {})) {
    const t = A.index(h),
      s = t >= 0 ? A.data.nodes[t].parent : -1;
    if (t < 0) continue;
    const n = s >= 0 ? Qo(A, s).invert() : new Matrix4();
    A.nodes[t].position.copy(B(new Vector3().fromArray(l))).applyMatrix4(n);
  }
  if (!1 === t.flash) {
    const t = () => {
      for (const t of A.data.behaviours) "MuzzleFlash" === t.script && A.nodes[t.node]?.traverse(A => A.layers.disableAll());
    };
    t(), A.$_5rrc.then(t);
  }
  for (const h of t.parts) {
    const e = A.index(h.bone);
    if (e < 0) continue;
    let o = lookupMap.get(e);
    o || lookupMap.set(e, o = Qo(A, e).invert());
    const c = co(h);
    let Q;
    if (h.model) {
      const n = await To(h);
      if (!n) continue;
      const {
          clone: e
        } = await fA(async () => {
          const {
            clone: A
          } = await import("./three-Bi9Yyrpt.js").then(result => result.n);
          return {
            clone: A
          };
        }, __vite__mapDeps([0, 1])),
        B = e(n.scene);
      Q = B;
      const o = "first" === s ? t.firstPerson?.hold : void 0;
      if (o && (B.applyMatrix4(Ao(o)), Q = new Group(), Q.add(B)), h.clips && n.animations.length && (r ??= new Ro(A.animators), r.add(B, n.animations, h.clips, h.empty)), c.size.setScalar(h.scale ?? 1), h.mirror && (c.size.x = -c.size.x), h.center) {
        const A = new Box3().setFromObject(B).getCenter(new Vector3());
        B.position.sub(A), Q = new Group(), Q.add(B);
      }
    } else {
      const A = new Mesh(ho, Ho(h));
      A.frustumCulled = !1, Q = A;
    }
    Q.name = `part:${h.name}`, 1 !== n && (B(c.position), c.size.multiplyScalar(n)), new Matrix4().compose(c.position, c.quaternion, c.size).premultiply(o).decompose(Q.position, Q.quaternion, Q.scale), A.nodes[e].add(Q), g >= 0 && A.$_7dt(g, Q), h.model && h.follow && (w ??= new yo(), w.add(Q, A.nodes[e], t => A.nodes[A.index(t)] ?? null, h.follow));
    const l = eo(h);
    h.model && l && f.push({
      part: h,
      skin: l,
      object: Q
    }), h.model && a.push(Q);
  }
  (f.length || a.length) && xA(A, (A, t, s, n) => (function (A) {
    for (const t of A) t.traverse(A => {
      const t = A,
        s = t.isMesh ? mo.get(t) : void 0;
      s && (t.material = s.material, t.geometry = s.geometry, mo.delete(t));
    });
  }(a), "frame" === s ? (f.length && po(f, null), n ? function (A, t) {
    if (!A.length) return !1;
    const s = uA(A),
      n = A => GA(A, t, IA);
    for (const [e, B] of s) {
      mo.set(e, {
        material: e.material,
        geometry: e.geometry
      });
      const A = e.material;
      e.geometry = B, e.material = Array.isArray(A) ? A.map(n) : n(A);
    }
    return !0;
  }(a, n) : a.length > 0) : "box" === s ? (f.length && po(f, null), function (A, t, s = null) {
    if (!t || !A.length) return A.length > 0;
    const n = bA(A);
    for (const [e, B] of n) {
      if (e.userData.keepLook) continue;
      mo.set(e, {
        material: e.material,
        geometry: e.geometry
      });
      const A = Array.isArray(e.material) ? e.material[0] : e.material;
      e.geometry = B, e.material = Go(t, {
        color: [1, 1, 1],
        metallic: 0,
        smoothness: .5
      }, A.side, "box", void 0, s, !0);
    }
    return !0;
  }(a, A, n ?? null)) : !!f.length && po(f, A, n ?? null)));
  const c = r?.parts.length ? r : null;
  c && jo.set(A, c);
  const Q = w?.links.length ? w : null;
  (c || Q) && (A.afterUpdate = () => {
    c?.sync(), Q?.sync();
  });
}
async function So(A, t, s = "world") {
  const [n, e] = await Promise.all([jA(A), t ? wo() : null]);
  for (const B of oo(t, e ?? {})) if (await Zo(B)) {
    await Wo(n, B, s);
    break;
  }
  return n;
}
async function Zo(A) {
  return (await Promise.all(A.parts.filter(item => item.model).map(item => To(item)))).every(item => null !== item);
}
var No = {
    state: 0,
    size: 1,
    grip: [.32, -.62, .46],
    snath: [.16, 1, .14],
    blade: [-.2, 0, 1],
    pivot: [0, -.25, 0],
    inset: .45,
    elbows: [[.6, -.7, -.4], [-.5, -.8, .2]],
    idle: {
      period: 3.6,
      pitch: .02,
      roll: .015
    },
    walk: {
      stride: 2.8,
      pitch: .12,
      roll: .06,
      bob: .03,
      full: 7
    },
    torso: {
      follow: -22,
      max: 30
    },
    light: {
      keys: [{
        t: -1
      }, {
        t: -.45,
        ease: "out",
        at: [0, .1, .14],
        yaw: .48,
        pitch: -.5,
        roll: -.26
      }, {
        t: -.08,
        ease: "out",
        at: [0, .13, .16],
        yaw: .56,
        pitch: -.58,
        roll: -.3
      }, {
        t: 0,
        ease: "in",
        at: [0, .2, .05],
        yaw: 0,
        pitch: .95,
        roll: .25
      }, {
        t: .08,
        ease: "linear",
        at: [0, .14, .05],
        yaw: -.85,
        pitch: 1,
        roll: .35
      }, {
        t: .3,
        ease: "out",
        at: [0, .04, 0],
        yaw: -1.2,
        pitch: .9,
        roll: .4
      }, {
        t: .8,
        ease: "smooth"
      }],
      trail: {
        from: -.1,
        to: .16
      }
    },
    heavy: {
      keys: [{
        t: -1
      }, {
        t: -.45,
        ease: "out",
        at: [0, .34, .12],
        yaw: .3,
        pitch: -.75,
        roll: -.26
      }, {
        t: -.08,
        ease: "out",
        at: [0, .4, .14],
        yaw: .34,
        pitch: -.85,
        roll: -.3
      }, {
        t: 0,
        ease: "in",
        at: [0, .2, .06],
        yaw: .05,
        pitch: .95,
        roll: .45
      }, {
        t: .09,
        ease: "linear",
        at: [0, -.05, .06],
        yaw: -.6,
        pitch: 1.35,
        roll: .6
      }, {
        t: .38,
        ease: "out",
        at: [0, -.12, .02],
        yaw: -.8,
        pitch: 1.3,
        roll: .6
      }, {
        t: 1,
        ease: "smooth"
      }],
      trail: {
        from: -.1,
        to: .18
      }
    },
    trailSteps: 3
  },
  Ko = [{
    shoulder: "Shoulder_R",
    elbow: "Elbow_R",
    hand: "Hand_R",
    index: "IndexFinger_01 1",
    finger: "Finger_01 1",
    indexTip: "IndexFinger_03 1",
    fingerTip: "Finger_03 1"
  }, {
    shoulder: "Shoulder_L",
    elbow: "Elbow_L",
    hand: "Hand_L",
    index: "IndexFinger_01",
    finger: "Finger_01",
    indexTip: "IndexFinger_03",
    fingerTip: "Finger_03"
  }],
  qo = {
    at: [0, 0, 0],
    yaw: 0,
    pitch: 0,
    roll: 0,
    spin: 0
  },
  _o = {
    at: [0, 0, 0],
    yaw: 0,
    pitch: 0,
    roll: 0,
    spin: 0
  },
  $o = new Quaternion(),
  Ai = new Vector3(),
  ti = new Vector3(),
  si = new Vector3(),
  ni = new Matrix4(),
  ei = new Vector3(),
  Bi = new Vector3(),
  oi = new Vector3(),
  ii = new Vector3(),
  ri = new Vector3(),
  wi = new Vector3(),
  fi = new Vector3(),
  ai = new Vector3();
var gi = null,
  ci = class {
    root;
    get active() {
      return this.held;
    }
    set active(A) {
      A !== this.held && (this.held = A, this.attack = -1, this.trail?.clear(), A && this.build(), this.$_2fi());
    }
    get shown() {
      return this.$_75a;
    }
    set shown(A) {
      this.$_75a = A, this.$_2fi();
    }
    $_75a = !0;
    $_2fi() {
      const A = this.held && this.ready && this.$_75a;
      this.mesh && (this.mesh.visible = A), A || this.trail?.clear();
    }
    held = !1;
    ready = !1;
    building = null;
    mesh = null;
    trail = null;
    attack = -1;
    heavy = !1;
    windup = .4;
    lastKey = -2;
    time = 0;
    phase = 0;
    arms = [];
    chest;
    spine;
    constructor(A, t) {
      this.root = A, this.chest = t("Spine_03"), this.spine = t("Spine_01"), Ko.forEach((item, index) => {
        const n = Object.fromEntries(Object.entries(item).map(([A, s]) => [A, t(s)]));
        if (Object.values(n).some(_item2 => !_item2)) return;
        const [e, B, o] = No.elbows[index];
        this.arms.push({
          ...n,
          hint: new Vector3(e, B, o).normalize()
        });
      });
    }
    build() {
      return this.building ??= (async () => {
        const A = await (gi ??= async function () {
          const A = await wo();
          for (const t of oo("scythe", A)) for (const A of t.parts) {
            if (!A.model) continue;
            let t = null;
            if ((await To(A))?.scene.traverse(A => {
              !t && A.isMesh && (t = A);
            }), t) return t;
          }
          return null;
        }());
        if (!A) return;
        const t = new Mesh(A.geometry, A.material);
        t.name = "scythe:held", t.matrixAutoUpdate = !1, t.frustumCulled = !1, t.visible = !1;
        const s = new jB();
        this.root.add(t, s.mesh), await Promise.all([vA(t, !1), vA(s.mesh, !1)]), this.mesh = t, this.trail = s, this.ready = !0, this.$_2fi();
      })();
    }
    strike(A) {
      this.attack = 0, this.heavy = A, this.windup = function (A) {
        const t = w.scythe;
        return (A ? t.heavy?.windup : t.windup) ?? t.windup ?? .4;
      }(A), this.lastKey = -2;
    }
    stop() {
      this.attack = -1, this.trail?.clear();
    }
    pose(A, t, s, n) {
      this.time += t;
      const e = No;
      let B = -2,
        o = null;
      var i, r, w, f;
      if (this.attack >= 0 && (this.attack += t, o = this.heavy ? e.heavy : e.light, B = (r = this.attack) < (w = this.windup) && w > 0 ? r / w - 1 : r - w, B > (i = o.keys)[i.length - 1].t && (this.attack = -1, o = null, B = -2)), this.trail?.update(t), !(this.mesh && n && this.chest && this.$_75a)) return;
      if (this.phase = (this.phase + t * s * Math.PI * 2 / e.walk.stride) % (4 * Math.PI), (f = qo).at[0] = f.at[1] = f.at[2] = 0, f.yaw = f.pitch = f.roll = f.spin = 0, o && function (A, t) {
        for (let s = 0; s < 3; s++) A.at[s] += t.at[s];
        A.yaw += t.yaw, A.pitch += t.pitch, A.roll += t.roll, A.spin += t.spin;
      }(qo, bB(o.keys, B, _o)), !A && this.spine && 0 !== qo.yaw) {
        const A = Math.max(-e.torso.max, Math.min(e.torso.max, qo.yaw * e.torso.follow));
        $B(this.root, this.spine, A);
      }
      if (this.sway(s), this.$_5mg(qo, this.mesh.matrix), this.mesh.matrixWorldNeedsUpdate = !0, o && B > -2 && this.trail && this.$_4lx(o, B), this.lastKey = B, A || this.arms.length < 2) return;
      const a = this.mesh.matrix;
      this.$_14v(this.arms[0], RB(a, MB.gripLower, ii), OB(a, MB.gripLower, MB.gripLowerUp, ri)), this.$_14v(this.arms[1], RB(a, MB.gripUpper, ii), OB(a, MB.gripUpper, MB.gripUpperUp, ri));
    }
    sway(A) {
      const t = No,
        s = Math.min(1, Math.max(0, A / t.walk.full)),
        n = this.time * Math.PI * 2 / t.idle.period;
      qo.pitch += Math.sin(n) * t.idle.pitch + Math.sin(this.phase) * t.walk.pitch * s, qo.roll += Math.sin(.7 * n + 1) * t.idle.roll + Math.sin(.5 * this.phase) * t.walk.roll * s, qo.at[1] += Math.abs(Math.cos(this.phase)) * t.walk.bob * s;
    }
    $_5mg(A, t) {
      return function (A, t, s) {
        const n = No;
        return function (A, t) {
          t.setFromAxisAngle(IB, A.yaw), t.multiply(vB.setFromAxisAngle(GB, A.pitch)), t.multiply(vB.setFromAxisAngle(UB, A.roll));
        }(t, $o), Ai.set(n.grip[0] - n.pivot[0], n.grip[1] - n.pivot[1], n.grip[2] - n.pivot[2]), Ai.applyQuaternion($o), Ai.x += A.x + n.pivot[0] + t.at[0], Ai.y += A.y + n.pivot[1] + t.at[1], Ai.z += A.z + n.pivot[2] + t.at[2], ti.set(n.snath[0], n.snath[1], n.snath[2]).normalize(), si.set(n.blade[0], n.blade[1], n.blade[2]), si.addScaledVector(ti, -si.dot(ti)).normalize(), function (A, t, s, n, e, B, o) {
          const i = mB.copy(t).applyQuaternion(n),
            r = YB.copy(s).applyQuaternion(n);
          0 !== e && r.applyQuaternion(LB.setFromAxisAngle(i, e)), r.addScaledVector(i, -r.dot(i)).normalize();
          const w = TB.crossVectors(r, i);
          o.makeBasis(r, i, w).scale(mB.setScalar(B));
          const f = YB.copy(JB).applyMatrix4(pB.copy(o));
          return o.setPosition(A.x - f.x, A.y - f.y, A.z - f.z);
        }(Ai, ti, si, $o, t.spin, n.size, s);
      }(Le(this.root, this.chest, ei), A, t);
    }
    $_4lx(A, t) {
      const {
          from: s,
          to: n
        } = A.trail,
        e = this.lastKey > -2 ? this.lastKey : t;
      if (t < s || e > n) return;
      const B = Math.max(1, No.trailSteps);
      bB(A.keys, t, _o);
      const o = qo.pitch - _o.pitch,
        i = qo.roll - _o.roll,
        r = qo.at[1] - _o.at[1];
      for (let w = 1; w <= B; w++) {
        const f = e + (t - e) * w / B;
        f < s || f > n || (bB(A.keys, f, _o), _o.pitch += o, _o.roll += i, _o.at[1] += r, this.$_5mg(_o, ni), this.trail.push(RB(ni, MB.edgeMid, Bi), RB(ni, MB.edgeTip, oi)));
      }
    }
    $_14v(A, t, s) {
      for (let n = 0; n < 2; n++) {
        const n = Le(this.root, A.hand, ei),
          e = this.$_1bu(A, Bi),
          B = oi.copy(t).sub(e).add(n);
        xe(this.root, A.shoulder, A.elbow, A.hand, B, A.hint);
        const o = Le(this.root, A.index, wi),
          i = Le(this.root, A.finger, fi);
        je(this.root, A.hand, ai.subVectors(o, i), s);
      }
    }
    $_1bu(A, t) {
      const s = Le(this.root, A.index, wi).add(Le(this.root, A.finger, fi)).multiplyScalar(.5),
        n = Le(this.root, A.indexTip, fi).add(Le(this.root, A.fingerTip, ai)).multiplyScalar(.5);
      return t.copy(s).lerp(n, No.inset);
    }
    dispose() {
      this.mesh?.removeFromParent(), this.trail?.mesh.removeFromParent(), this.trail?.dispose();
    }
  },
  Qi = class A {
    rig;
    tube;
    carried;
    static of(t) {
      const s = t.data.behaviours.find(item => "RocketLauncher" === item.script)?.data?.tempRocket?.node;
      if ("number" != typeof s || !t.nodes[s]) return null;
      const n = t.data.renderers.find(item => item.node === s)?.mesh,
        e = t.data.nodes[s].parent,
        B = n ? t.data.renderers.find(item => item.node !== s && item.mesh === n && t.data.nodes[item.node].parent === e) : void 0;
      return new A(t, s, B?.node ?? -1);
    }
    loaded = !0;
    shown = null;
    get $_6z1() {
      return this.carried;
    }
    get $_2lp() {
      return this.tube;
    }
    constructor(A, t, s) {
      this.rig = A, this.tube = t, this.carried = s;
    }
    $_4wg() {
      return this.carried >= 0 && this.rig.setActive(this.carried, !1), this.apply(), this;
    }
    set(A) {
      this.loaded = A, this.apply();
    }
    apply() {
      const A = this.carried >= 0 && this.rig.activeInHierarchy(this.carried),
        t = this.loaded && !A;
      t !== this.shown && (this.shown = t, this.rig.setActive(this.tube, t));
    }
  },
  hi = class {
    loaded = !0;
    reloading = !1;
    life = -1;
    equipped() {
      this.loaded = !0;
    }
    fired() {
      this.loaded = !1;
    }
    state(A, t) {
      return (this.reloading && !A || t !== this.life) && (this.loaded = !0), this.reloading = A, this.life = t, this.loaded;
    }
  },
  li = new Vector3(),
  Ci = new Vector3(),
  Hi = new Quaternion(),
  ui = new Quaternion(),
  Ei = new Quaternion();
function Fi(A, t) {
  const s = Math.min(1, Math.max(0, t)) * (A.samples - 1),
    flooredValue = Math.floor(s);
  return {
    a: flooredValue,
    b: Math.min(A.samples - 1, flooredValue + 1),
    k: s - flooredValue
  };
}
function Di(A, t, s) {
  const n = A.hand;
  if (!n) return !1;
  const {
    a: e,
    b: B,
    k: o
  } = Fi(A, t);
  return s.set(n[3 * e] + (n[3 * B] - n[3 * e]) * o, n[3 * e + 1] + (n[3 * B + 1] - n[3 * e + 1]) * o, n[3 * e + 2] + (n[3 * B + 2] - n[3 * e + 2]) * o), !0;
}
var Pi = new WeakMap();
function di(A, t) {
  const s = A[t]?.path ?? "",
    n = [];
  for (const e of A) /mag/i.test(e.name) && !/release|retainer|_end/i.test(e.name) && ("" === s || e.path.startsWith(s + "/")) && n.push(yA("" === s ? e.path : e.path.slice(s.length + 1)));
  return n;
}
function Mi(A) {
  let t = 0,
    s = -1;
  for (let B = 0; B < A.length; B++) A[B] > t && (t = A[B], s = B);
  if (s < 0) return -1;
  let n = s,
    e = s;
  for (; n > 0 && A[n - 1] >= .98 * t;) n--;
  for (; e < A.length - 1 && A[e + 1] >= .98 * t;) e++;
  return Math.round((n + e) / 2);
}
var ki = (A, t, s, n) => {
  const e = t + 3 * s,
    B = t + 3 * n;
  return Math.hypot(A[e] - A[B], A[e + 1] - A[B + 1], A[e + 2] - A[B + 2]);
};
function bi(A, t, s, n = []) {
  const e = A.machines[A.layers[0]?.machine ?? 0]?.states.find(A => A.name === s),
    B = e?.tree.find(A => A.clip)?.clip,
    o = B ? t.get(B) : void 0;
  if (!e || !o) return null;
  const i = function (A) {
      const t = A.frames - 1;
      if (t < 1) return 1;
      const s = A.samples,
        n = Math.cos(.5 * Math.PI / 180),
        lookupMap = new Map();
      for (let i = 0; i < A.tracks.length; i++) {
        const n = A.tracks[i];
        if ("position" !== n.kind && "scale" !== n.kind) continue;
        let B = 0;
        for (let A = 0; A < t; A++) B = Math.max(B, ki(s, n.offset, A, t));
        lookupMap.set(i, B);
      }
      const B = B => {
        for (let o = 0; o < A.tracks.length; o++) {
          const i = A.tracks[o];
          if ("rotation" === i.kind) {
            const A = i.offset + 4 * B,
              e = i.offset + 4 * t;
            if (Math.abs(s[A] * s[e] + s[A + 1] * s[e + 1] + s[A + 2] * s[e + 2] + s[A + 3] * s[e + 3]) < n) return !0;
          } else if ("position" === i.kind || "scale" === i.kind) {
            if (ki(s, i.offset, B, t) > .02 * (lookupMap.get(o) ?? 0) + 1e-9) return !0;
          } else if (!i.kind && !i.pptr && Math.abs(s[i.offset + B] - s[i.offset + t]) > .001) return !0;
        }
        return !1;
      };
      let o = t;
      for (; o > 0 && !B(o - 1);) o--;
      return o / t;
    }(o),
    r = function (A, t) {
      const s = A.frames - 1;
      if (s < 2) return null;
      const n = A.samples,
        float64Values = new Float64Array(A.frames);
      for (const o of A.tracks) if ("position" === o.kind && t.includes(o.path)) for (let A = 0; A <= s; A++) float64Values[A] = Math.max(float64Values[A], ki(n, o.offset, A, s));
      let B = Mi(float64Values);
      if (B < 0 || float64Values[B] < 1e-4) {
        float64Values.fill(0);
        for (const t of A.tracks) if ("rotation" === t.kind) for (let A = 0; A <= s; A++) {
          const B = t.offset + 4 * A,
            o = t.offset + 4 * s,
            i = Math.min(1, Math.abs(n[B] * n[o] + n[B + 1] * n[o + 1] + n[B + 2] * n[o + 2] + n[B + 3] * n[o + 3]));
          float64Values[A] += 2 * Math.acos(i);
        }
        if (B = Mi(float64Values), B < 0 || float64Values[B] < 1e-4) return null;
      }
      return B / s;
    }(o, n),
    w = function (A) {
      const t = A.frames - 1,
        uniqueItems = new Set();
      for (const n of A.tracks) if (!n.kind && !n.pptr && "m_IsActive" === n.property) for (let e = 1; e <= t; e++) A.samples[n.offset + e - 1] > .5 && A.samples[n.offset + e] <= .5 && uniqueItems.add(e / t);
      return [...uniqueItems].sort((leftItem, rightItem) => leftItem - rightItem);
    }(o),
    f = function (A, t) {
      const s = A.frames - 1;
      if (s < 2 || t.length < 2) return null;
      const n = A.samples,
        e = A.tracks.map(track => {
          if ("position" !== track.kind && "scale" !== track.kind) return 0;
          let t = 0;
          for (let e = 0; e < s; e++) t = Math.max(t, ki(n, track.offset, e, s));
          return t;
        }),
        B = Math.cos(.25 * Math.PI / 180),
        o = (t, s) => {
          let o = 0;
          for (let i = 0; i < A.tracks.length; i++) {
            const r = A.tracks[i];
            if ("rotation" === r.kind) {
              const A = r.offset + 4 * t,
                e = r.offset + 4 * s,
                i = Math.min(1, Math.abs(n[A] * n[e] + n[A + 1] * n[e + 1] + n[A + 2] * n[e + 2] + n[A + 3] * n[e + 3]));
              o = Math.max(o, (1 - i) / (1 - B));
            } else if ("position" === r.kind || "scale" === r.kind) e[i] > 1e-9 && (o = Math.max(o, ki(n, r.offset, t, s) / (.01 * e[i])));else if (!r.kind && !r.pptr && Math.abs(n[r.offset + t] - n[r.offset + s]) > .001) return 1 / 0;
          }
          return o;
        },
        i = t.map(item => Math.round(item * s));
      let r = null,
        w = 1;
      for (let f = 0; f + 1 < i.length; f++) {
        const A = i[f + 1] - i[f];
        if (!(A < 2)) for (let t = i[f] - A + 1; t <= i[f]; t++) {
          if (t < 0 || t + A > s) continue;
          const n = o(t, t + A);
          n <= w && (!r || n < w) && (r = {
            from: t / s,
            to: (t + A) / s,
            insert: f
          }, w = n);
        }
      }
      return r;
    }(o, w);
  return {
    state: s,
    seconds: o.duration / Math.max(1e-6, e.speed || 1),
    ready: i,
    inserts: w,
    ...(null !== r && r > 0 && r < i ? {
      hold: r
    } : {}),
    ...(f ? {
      loop: f
    } : {})
  };
}
function Ii(A, t) {
  return A.shells ? `Reload${Math.min(A.shells.inserts, Math.max(1, st(A, t)))}Shell` : "Shotgun" === A.kind && 1 === t ? "Reload2" : "Reload";
}
function Gi(A, t, s, n) {
  const e = Dt({
      ammo: t,
      reserve: s
    }, A),
    B = {
      duration: e,
      seconds: n.seconds,
      times: [0, e],
      clip: [0, n.ready]
    },
    o = A.shells;
  if (!o) return function (A, t) {
    const s = t.hold,
      n = t.seconds * t.ready;
    if (void 0 === s || A.duration <= 0 || n <= 0) return A;
    if (n / A.duration >= .85) return A;
    const e = s * t.seconds / .85,
      B = (t.ready - s) * t.seconds / .85,
      o = A.duration - e - B;
    return o <= 0 || (A.times = [0, e, e + o, A.duration], A.clip = [0, s, s, t.ready]), A;
  }(B, n);
  const ceiledValue = Math.ceil(Ui(A, t, s) / o.rounds);
  if (ceiledValue < 1) return B;
  if (n.inserts.length < ceiledValue) return n.loop ? function (A, t, s, n) {
    const e = n.loop,
      {
        inserts: B
      } = n,
      o = s - B.length,
      i = e.to - e.from,
      r = e.insert,
      w = A => A <= r ? B[A] : A <= r + o ? B[r] + (A - r) * i : B[A - o] + o * i,
      f = [0],
      a = [0];
    for (let Q = 0; Q < s; Q++) f.push(t.first + Q * t.per), a.push(w(Q));
    f.push(A.duration), a.push(Math.max(n.ready, B[B.length - 1]) + o * i);
    const g = A => A < e.to ? A : A < e.to + o * i ? e.from + (A - e.to) % i : A - o * i,
      c = {
        ...A,
        times: [0],
        clip: [0]
      };
    for (let Q = 1; Q < f.length; Q++) {
      if (!(f[Q] > f[Q - 1] && a[Q] > a[Q - 1])) return A;
      for (let A = 0; A < o; A++) {
        const t = e.to + A * i;
        if (t <= a[Q - 1] || t > a[Q]) continue;
        const s = f[Q - 1] + (t - a[Q - 1]) / (a[Q] - a[Q - 1]) * (f[Q] - f[Q - 1]);
        c.times.push(s, s), c.clip.push(e.to, e.from);
      }
      c.times.push(f[Q]), c.clip.push(Math.min(1, g(a[Q])));
    }
    return c;
  }(B, o, ceiledValue, n) : B;
  const r = [0],
    w = [0];
  for (let f = 0; f < ceiledValue; f++) r.push(o.first + f * o.per), w.push(n.inserts[f]);
  r.push(e), w.push(Math.max(n.ready, n.inserts[ceiledValue - 1]));
  for (let f = 1; f < w.length; f++) if (w[f] < w[f - 1] || r[f] <= r[f - 1]) return B;
  return B.times = r, B.clip = w, B;
}
var Ui = (A, t, s) => {
  const n = A.magazine - Math.max(0, t);
  return s < 0 ? n : Math.max(0, Math.min(n, s));
};
function vi(A, t) {
  const {
    times: s,
    clip: n
  } = A;
  if (t <= 0) return 0;
  if (t >= A.duration) return 1;
  for (let e = 1; e < s.length; e++) if (t < s[e]) {
    const A = (t - s[e - 1]) / (s[e] - s[e - 1]);
    return n[e - 1] + (n[e] - n[e - 1]) * A;
  }
  return 1;
}
function pi(A, t) {
  const s = t / Math.max(1e-6, A.seconds),
    {
      times: n,
      clip: e
    } = A;
  if (s <= 0) return 0;
  for (let B = 1; B < e.length; B++) if (s < e[B]) {
    const A = (s - e[B - 1]) / Math.max(1e-9, e[B] - e[B - 1]);
    return n[B - 1] + (n[B] - n[B - 1]) * A;
  }
  return A.duration + (s - e[e.length - 1]) * A.seconds;
}
function mi(A, t = 0) {
  const s = qA(A);
  return s && t ? an(s, t) : s;
}
var Yi = .1,
  Ti = class {
    current = null;
    until = 0;
    shots = 0;
    keys = 0;
    update(A) {
      const t = A ? mi(A.weapon, A.mods) : void 0;
      if (!A || !t || A.until <= 0 || t.magazine < 0) return this.current = null, this.until = 0, null;
      const s = this.current,
        n = !!s && s.weapon === A.weapon && (s.mods ?? 0) === (A.mods ?? 0) && A.shots === this.shots && (Math.abs(A.until - this.until) < .25 || function (A, t, s, n = .001) {
          if (!A?.shells || t <= 0 || s <= 0) return !1;
          const e = s - t;
          return Math.abs(e - A.shells.per) < n || Math.abs(e - A.shells.tail) < n;
        }(t, this.until, A.until, .25));
      if (this.until = A.until, this.shots = A.shots, n && s) return s.start = Li(t, A.until, s.ammo, A.ammo, s.reserve), s.end = s.start + Dt(s, t), s;
      const e = Li(t, A.until, A.ammo, A.ammo, A.reserve);
      return this.current = {
        key: ++this.keys,
        weapon: A.weapon,
        start: e,
        end: e + Dt(A, t),
        ammo: A.ammo,
        reserve: A.reserve,
        mods: A.mods ?? 0
      }, this.current;
    }
  };
function Li(A, t, s, n, e = -1) {
  const B = A.shells,
    o = Dt({
      ammo: s,
      reserve: e
    }, A);
  if (!B) return t - o;
  const ceiledValue = Math.ceil(Ui(A, s, e) / B.rounds),
    r = Math.max(0, Math.ceil((n - s) / B.rounds - 1e-9));
  return r >= ceiledValue ? t - o : t - B.first - r * B.per;
}
var Ji = ["reload-rifle", "reload-pistol", "reload-shotgun", "reload-rpg"],
  Ri = "/assets/extracted/anim-2v2/clips/",
  Oi = {
    clips: {},
    loading: null
  };
function Vi(A, t, s) {
  return A.magazine > 0 ? s ? "reload-rpg" : t === _.Pistol ? "reload-pistol" : A.shells ? "reload-shotgun" : t === _.Rifle ? "reload-rifle" : null : null;
}
var yi = new Quaternion(),
  ji = new Quaternion(),
  xi = new Quaternion(),
  zi = new Quaternion(),
  Xi = class {
    clip;
    bones = [];
    offsets = [];
    weights = [];
    reference;
    constructor(A, t, s) {
      this.clip = A;
      for (const e of A.tracks) {
        if ("rotation" !== e.kind || 4 !== e.width) continue;
        const A = t(e.path),
          n = A ? s[A.name] ?? 0 : 0;
        A && n > 0 && !this.bones.includes(A) && (this.bones.push(A), this.offsets.push(e.offset), this.weights.push(Math.min(1, n)));
      }
      this.reference = new Float32Array(4 * this.bones.length);
      const n = A.samples;
      this.offsets.forEach((item, index) => {
        yi.set(n[item], n[item + 1], n[item + 2], n[item + 3]).normalize().invert(), yi.toArray(this.reference, 4 * index);
      });
    }
    get empty() {
      return 0 === this.bones.length;
    }
    get turned() {
      return this.bones;
    }
    apply(A, t) {
      if (t <= 0 || 0 === this.bones.length) return;
      const s = this.clip,
        n = Math.min(1, Math.max(0, A)) * (s.frames - 1),
        e = Math.min(s.frames - 1, Math.floor(n)),
        B = Math.min(s.frames - 1, e + 1),
        o = n - e,
        i = s.samples;
      for (let r = 0; r < this.bones.length; r++) {
        const A = Math.min(1, t) * this.weights[r],
          s = this.offsets[r] + 4 * e,
          n = this.offsets[r] + 4 * B;
        yi.set(i[s], i[s + 1], i[s + 2], i[s + 3]), ji.set(i[n], i[n + 1], i[n + 2], i[n + 3]), yi.dot(ji) < 0 && ji.set(-ji.x, -ji.y, -ji.z, -ji.w), yi.set(yi.x + (ji.x - yi.x) * o, yi.y + (ji.y - yi.y) * o, yi.z + (ji.z - yi.z) * o, yi.w + (ji.w - yi.w) * o).normalize(), xi.fromArray(this.reference, 4 * r).multiply(yi), A < 1 ? ji.slerpQuaternions(zi, xi, A) : ji.copy(xi), this.bones[r].quaternion.multiply(ji).normalize();
      }
    }
  },
  Wi = {
    enabled: !0
  },
  Si = {
    blend: .12,
    lower: .32,
    cant: .45,
    pull: .22,
    belt: [-.2, -.05, .12],
    under: .1,
    elbow: [-.75, -.55, -.35],
    magReach: .35,
    clipWeights: {
      "reload-rifle": {
        Spine_02: .7,
        Neck: .8,
        Clavicle_L: 1,
        Clavicle_R: 1,
        Shoulder_R: .7,
        Elbow_R: .7,
        Hand_R: .5,
        Hand_L: 1
      },
      "reload-pistol": {
        Spine_02: 1,
        Neck: .6,
        Clavicle_L: 1,
        Clavicle_R: 1,
        Shoulder_R: 1,
        Elbow_R: 1,
        Hand_R: 1,
        Hand_L: 1
      },
      "reload-shotgun": {
        Spine_02: 1,
        Neck: .7
      },
      "reload-rpg": {
        Spine_02: 1,
        Neck: .7
      }
    }
  },
  Zi = ["Spine_02", "Neck", "Clavicle_L", "Clavicle_R", "Shoulder_R", "Elbow_R", "Hand_R"],
  Ni = (A, t) => Object.fromEntries(t.filter(item => A[item] > 0).map(item => [item, A[item]])),
  Ki = (A, t, s) => (A => {
    const t = Math.min(1, Math.max(0, A));
    return t * t * (3 - 2 * t);
  })((A - t) / (s - t)),
  qi = class {
    until = 0;
    elapsed = 0;
    total = 0;
    weapon = "";
    update(A, t, s, n) {
      if (!(t > 0)) return this.until = 0, -1;
      const e = Math.max(0, t - s);
      if (this.until <= 0 || A !== this.weapon) {
        const t = qA(A),
          s = t && t.magazine > 0 ? Dt({
            ammo: 0,
            reserve: -1
          }, t) : e;
        this.total = Math.max(e, s, .001), this.elapsed = this.total - e, this.weapon = A;
      } else this.elapsed += n, t > this.until + 1e-6 && (this.total += t - this.until);
      return this.until = t, Math.min(1, Math.max(0, this.elapsed / this.total));
    }
  },
  _i = class {
    rig;
    clip;
    bound = [];
    frames;
    constructor(A, t, s, n) {
      this.rig = A, this.clip = t;
      const e = A.data,
        B = e.nodes[s]?.path ?? "",
        lookupMap = new Map();
      e.nodes.forEach((node, index) => {
        (A => {
          for (let t = A; t >= 0; t = e.nodes[t].parent) if (t === n) return !0;
          return !1;
        })(index) && ("" === B || node.path.startsWith(B + "/")) && lookupMap.set(yA("" === B ? node.path : node.path.slice(B.length + 1)), index);
      });
      for (const i of t.tracks) {
        const t = lookupMap.get(i.path);
        void 0 !== t && (i.kind || "m_IsActive" === i.property && !i.pptr) && this.bound.push({
          node: A.nodes[t],
          kind: i.kind ?? "active",
          offset: i.offset,
          i: t
        });
      }
      this.frames = t.frames;
    }
    get empty() {
      return 0 === this.bound.length;
    }
    apply(A) {
      const t = this.clip.samples,
        s = Math.min(1, Math.max(0, A)) * (this.frames - 1),
        flooredValue = Math.floor(s),
        e = Math.min(this.frames - 1, flooredValue + 1),
        B = s - flooredValue;
      for (const o of this.bound) {
        const A = o.offset;
        if ("position" === o.kind || "scale" === o.kind) ("position" === o.kind ? o.node.position : o.node.scale).set(t[A + 3 * flooredValue] + (t[A + 3 * e] - t[A + 3 * flooredValue]) * B, t[A + 3 * flooredValue + 1] + (t[A + 3 * e + 1] - t[A + 3 * flooredValue + 1]) * B, t[A + 3 * flooredValue + 2] + (t[A + 3 * e + 2] - t[A + 3 * flooredValue + 2]) * B);else {
          if ("rotation" !== o.kind) {
            this.rig.setActive(o.i, t[A + Math.round(s)] > .5);
            continue;
          }
          $i.set(t[A + 4 * flooredValue], t[A + 4 * flooredValue + 1], t[A + 4 * flooredValue + 2], t[A + 4 * flooredValue + 3]), Ar.set(t[A + 4 * e], t[A + 4 * e + 1], t[A + 4 * e + 2], t[A + 4 * e + 3]), o.node.quaternion.slerpQuaternions($i, Ar, B);
        }
        o.node.updateMatrix();
      }
    }
  },
  $i = new Quaternion(),
  Ar = new Quaternion(),
  tr = new Quaternion(),
  sr = new Vector3(1, 0, 0),
  nr = new Vector3(0, 0, 1),
  er = new Vector3(),
  Br = new Vector3(),
  or = new Vector3(),
  ir = new Vector3(),
  rr = new Vector3(),
  wr = new Vector3(),
  fr = new Vector3(),
  ar = new Vector3(),
  gr = new Vector3(),
  cr = new Vector3(),
  Qr = new Vector3(),
  hr = new Matrix4();
function lr(A) {
  const t = A.data.nodes.findIndex(node => /mag/i.test(node.name) && !/release|retainer|_end/i.test(node.name));
  return t >= 0 && A.nodes[t].parent ? t : -1;
}
var Cr = class {
    bones;
    before;
    after;
    posed = !1;
    constructor(A) {
      this.bones = A, this.before = A.map(() => new Quaternion()), this.after = A.map(() => new Quaternion());
    }
    begin() {
      this.restore(), this.bones.forEach((bone, index) => this.before[index].copy(bone.quaternion));
    }
    end() {
      this.bones.forEach((bone, index) => this.after[index].copy(bone.quaternion)), this.posed = !0;
    }
    restore() {
      this.posed && (this.posed = !1, this.bones.forEach((bone, index) => {
        bone.quaternion.equals(this.after[index]) && bone.quaternion.copy(this.before[index]);
      }));
    }
  },
  Hr = class {
    root;
    bone;
    hips;
    shoulderR;
    handR;
    arm;
    hint = new Vector3(...Si.elbow).normalize();
    weapon = null;
    active = !1;
    guard;
    constructor(A, t, s) {
      this.root = A, this.bone = s, this.hips = t("Hips"), this.shoulderR = t("Shoulder_R"), this.handR = t("Hand_R");
      const n = t("Shoulder_L"),
        e = t("Elbow_L"),
        B = t("Hand_L");
      this.arm = n && e && B ? {
        shoulder: n,
        elbow: e,
        hand: B
      } : null;
      const o = Zi.map(t);
      this.guard = new Cr([this.shoulderR, this.handR, n, e, B, ...o].filter((item, index, s) => !!item && s.indexOf(item) === index));
    }
    setWeapon(A, t = -1, s = null, n = _.Rifle) {
      if (this.release(), !A) return void (this.weapon = null);
      const e = lr(A);
      let B = null,
        o = null,
        i = null;
      const r = A.data.animators[0],
        w = r?.controller ? A.rig.controllers.get(r.controller) : void 0;
      if (r && w && t < 0) {
        const t = w.machines[w.layers[0]?.machine ?? 0]?.states.find(A => "Reload" === A.name)?.tree.find(A => A.clip)?.clip,
          n = t ? A.rig.clips.get(t) : void 0;
        if (n && (o = function (A, t, s = 0) {
          let n = Pi.get(t);
          return n || Pi.set(t, n = new WeakMap()), n.has(A) || n.set(A, function (A, t, s = 0, n = 48) {
            const e = A.nodes,
              B = e[s]?.path ?? "",
              lookupMap = new Map();
            e.forEach((item, index) => {
              ("" === B || index === s || item.path.startsWith(B + "/")) && lookupMap.set(yA("" === B ? item.path : item.path.slice(B.length + 1)), index);
            });
            const _lookupMap2 = new Map();
            for (const E of t.tracks) {
              const A = lookupMap.get(E.path);
              if (void 0 === A) continue;
              let t = _lookupMap2.get(A);
              t || _lookupMap2.set(A, t = {
                pos: -1,
                rot: -1,
                scale: -1,
                active: -1
              }), "position" === E.kind ? t.pos = E.offset : "rotation" === E.kind ? t.rot = E.offset : "scale" === E.kind ? t.scale = E.offset : "m_IsActive" !== E.property || E.pptr || (t.active = E.offset);
            }
            const r = function (A) {
                const t = A.nodes.findIndex(node => /mag/i.test(node.name) && !/release|retainer|_end/i.test(node.name));
                return t > 0 && A.nodes[t].parent >= 0 ? t : -1;
              }(A),
              w = e.findIndex((item, index) => "Hand_L" === item.name && function (A, t, s) {
                for (let n = t; n >= 0; n = A[n].parent) if (n === s) return !0;
                return !1;
              }(e, index, s)),
              f = r >= 0 && !!_lookupMap2.get(r) && (_lookupMap2.get(r).pos >= 0 || _lookupMap2.get(r).rot >= 0),
              a = [];
            if (w >= 0) for (let E = w; E >= 0 && E !== s; E = e[E].parent) a.unshift(E);
            const g = w >= 0 && a.some(item => _lookupMap2.has(item)),
              c = [];
            if (r >= 0) for (let E = r; E >= 0 && E !== s; E = e[E].parent) c.unshift(E);
            if (!f && !g) return null;
            const Q = function (A) {
                const t = A.samples.slice(),
                  s = A.frames;
                for (const n of A.tracks) {
                  if (!n.kind) continue;
                  const A = n.width,
                    uint8Values = new Uint8Array(s);
                  if ("rotation" === n.kind) for (let o = 0; o < s; o++) {
                    const s = n.offset + o * A,
                      B = Math.hypot(t[s], t[s + 1], t[s + 2], t[s + 3]);
                    Math.abs(B - 1) < .05 || (uint8Values[o] = 1);
                  } else for (let o = 0; o < A; o++) {
                    const B = [];
                    for (let e = 0; e < s; e++) B.push(Math.abs(t[n.offset + e * A + o]));
                    const i = B.slice().sort((leftItem, rightItem) => leftItem - rightItem),
                      r = i[Math.min(i.length - 1, Math.floor(.9 * i.length))],
                      w = 50 * Math.max(r, .001);
                    for (let A = 0; A < s; A++) B[A] <= w || (uint8Values[A] = 1);
                  }
                  let B = -1;
                  for (let o = 0; o < s; o++) {
                    if (!uint8Values[o]) {
                      B = o;
                      continue;
                    }
                    let i = B;
                    if (i < 0) for (let A = o + 1; A < s && i < 0; A++) uint8Values[A] || (i = A);
                    if (i < 0) break;
                    for (let s = 0; s < A; s++) t[n.offset + o * A + s] = t[n.offset + i * A + s];
                  }
                }
                return t;
              }(t),
              h = Math.max(1, t.frames),
              l = {
                samples: n,
                mag: f ? {
                  node: r,
                  pos: new Float32Array(3 * n),
                  rot: new Float32Array(4 * n),
                  shown: _lookupMap2.get(r).active >= 0 ? new Uint8Array(n) : null
                } : null,
                hand: g ? new Float32Array(3 * n) : null,
                magAt: f && g ? new Float32Array(3 * n) : null,
                hold: f && g ? new Float32Array(n) : null,
                magOut: f && g ? new Float32Array(n) : null,
                arm: g ? new Float32Array(9) : null
              },
              C = new Matrix4(),
              H = new Matrix4(),
              u = (A, t, s, n) => {
                const B = e[A],
                  o = _lookupMap2.get(A);
                if (o && o.pos >= 0) {
                  const A = o.pos;
                  li.set(Q[A + 3 * t] + (Q[A + 3 * s] - Q[A + 3 * t]) * n, Q[A + 3 * t + 1] + (Q[A + 3 * s + 1] - Q[A + 3 * t + 1]) * n, Q[A + 3 * t + 2] + (Q[A + 3 * s + 2] - Q[A + 3 * t + 2]) * n);
                } else li.fromArray(B.t);
                if (o && o.rot >= 0) {
                  const A = o.rot;
                  ui.set(Q[A + 4 * t], Q[A + 4 * t + 1], Q[A + 4 * t + 2], Q[A + 4 * t + 3]), Ei.set(Q[A + 4 * s], Q[A + 4 * s + 1], Q[A + 4 * s + 2], Q[A + 4 * s + 3]), Hi.slerpQuaternions(ui, Ei, n);
                } else Hi.fromArray(B.r);
                if (o && o.scale >= 0) {
                  const A = o.scale;
                  Ci.set(Q[A + 3 * t], Q[A + 3 * t + 1], Q[A + 3 * t + 2]);
                } else Ci.fromArray(B.s);
                return H.compose(li, Hi, Ci);
              };
            for (let E = 0; E < n; E++) {
              const A = E / Math.max(1, n - 1) * (h - 1),
                flooredValue = Math.floor(A),
                s = Math.min(h - 1, flooredValue + 1),
                B = A - flooredValue;
              if (l.mag) {
                u(r, flooredValue, s, B), H.decompose(li, Hi, Ci), li.toArray(l.mag.pos, 3 * E), Hi.toArray(l.mag.rot, 4 * E);
                const n = _lookupMap2.get(r).active;
                l.mag.shown && (l.mag.shown[E] = Q[n + Math.round(A)] > .5 ? 1 : 0);
              }
              if (l.hand) {
                C.identity();
                for (const A of a) if (C.multiply(u(A, flooredValue, s, B)), 0 === E && l.arm) {
                  const t = ["Shoulder_L", "Elbow_L", "Hand_L"].indexOf(e[A].name);
                  t >= 0 && li.setFromMatrixPosition(C).toArray(l.arm, 3 * t);
                }
                li.setFromMatrixPosition(C).toArray(l.hand, 3 * E);
              }
              if (l.magAt) {
                C.identity();
                for (const A of c) C.multiply(u(A, flooredValue, s, B));
                li.setFromMatrixPosition(C).toArray(l.magAt, 3 * E);
              }
            }
            if (l.hold && l.hand && l.magAt && l.arm) {
              const A = function (A) {
                const t = (t, s) => Math.hypot(A[t] - A[s], A[t + 1] - A[s + 1], A[t + 2] - A[s + 2]);
                return t(0, 3) + t(3, 6);
              }(l.arm);
              for (let t = 0; t < n; t++) {
                l.magOut[t] = Math.hypot(l.magAt[3 * t] - l.magAt[0], l.magAt[3 * t + 1] - l.magAt[1], l.magAt[3 * t + 2] - l.magAt[2]) / Math.max(A, 1e-6);
                const s = Math.hypot(l.hand[3 * t] - l.magAt[3 * t], l.hand[3 * t + 1] - l.magAt[3 * t + 1], l.hand[3 * t + 2] - l.magAt[3 * t + 2]),
                  n = Math.min(1, Math.max(0, 2 - s / (.12 * A)));
                l.hold[t] = n * n * (3 - 2 * n);
              }
            }
            return l;
          }(A, t, s)), n.get(A) ?? null;
        }(A.data, n, r.node)), o && s && s.magazine > 0) {
          const t = bi(w, A.rig.clips, "Reload", di(A.data.nodes, r.node));
          t && (i = Gi(s, 0, -1, t));
        }
      }
      if (t >= 0) {
        const s = A.data.animators[0],
          n = s?.controller ? A.rig.controllers.get(s.controller) : void 0,
          e = n?.machines[n.layers[0]?.machine ?? 0]?.states.find(A => "Reload" === A.name)?.tree.find(A => A.clip)?.clip,
          o = e ? A.rig.clips.get(e) : void 0;
        if (s && o) {
          const n = new _i(A, o, s.node, t);
          n.empty || (B = {
            clip: n,
            node: t,
            ready: 1
          });
        }
      }
      const f = o?.mag ? o.mag.node : -1,
        a = B ? -1 : f >= 0 ? f : e;
      this.weapon = {
        rig: A,
        mag: a,
        rest: a >= 0 ? A.nodes[a].position.clone() : new Vector3(),
        restRot: a >= 0 ? A.nodes[a].quaternion.clone() : new Quaternion(),
        rocket: B,
        motion: o,
        plan: i,
        role: s ? Vi(s, n, t >= 0) : null,
        clip: null
      }, this.$_4qk(this.weapon);
    }
    $_4qk(A) {
      if (A.clip || !A.role || !this.bone) return A.clip;
      const t = Oi.clips[A.role];
      if (!t) return null;
      const s = Si.clipWeights[A.role],
        n = new Xi(t, this.bone, Ni(s, Zi)),
        e = new Xi(t, this.bone, Ni(s, ["Hand_L"]));
      return n.empty || (A.clip = {
        body: n,
        wrist: e,
        arm: (s.Shoulder_R ?? 0) > 0
      }), A.clip;
    }
    release() {
      this.guard.restore();
      const A = this.weapon;
      if (this.active && A) {
        if (this.active = !1, A.mag >= 0) {
          const t = A.rig.nodes[A.mag];
          t.position.copy(A.rest), t.quaternion.copy(A.restRot), t.updateMatrix(), A.rig.setActive(A.mag, !0);
        }
        A.rocket && A.rig.setActive(A.rocket.node, !1);
      } else this.active = !1;
    }
    pose(A) {
      const t = this.weapon;
      if (A < 0 || !t || !this.arm || !Wi.enabled) return this.release(), !1;
      const s = function (A) {
        const t = Si.blend,
          s = A <= 0 || A >= 1 ? 0 : Math.min(Ki(A, 0, t), 1 - Ki(A, 1 - t, 1)),
          n = (A, t, n, e, B, o = !0) => ({
            weight: s,
            from: A,
            to: t,
            k: n,
            pull: e,
            carried: B,
            shown: o
          });
        return A < .15 ? n("grip", "mag", Ki(A, 0, .15), 0, !1) : A < .32 ? n("mag", "mag", 0, Ki(A, .15, .32), !1) : A < .5 ? n("mag", "belt", Ki(A, .32, .5), 1, !0, A < .45) : A < .68 ? n("belt", "mag", Ki(A, .5, .68), 1, !0, A > .55) : A < .82 ? n("mag", "mag", 0, 1 - Ki(A, .68, .82), !1) : n("mag", "grip", Ki(A, .82, 1), 0, !1);
      }(A);
      if (s.weight <= 0) return this.release(), !1;
      this.active = !0, this.guard.begin();
      const n = this.root,
        e = t.rig.nodes[0];
      Re(n, e), this.arm.hand.getWorldPosition(Qr), Qr.applyMatrix4(hr.copy(e.matrixWorld).invert());
      const B = this.$_4qk(t);
      let o;
      if (B && B.body.apply(A, s.weight), B?.arm || (this.shoulderR && ye(n, this.shoulderR, tr.setFromAxisAngle(sr, Si.lower * s.weight)), this.handR && ye(n, this.handR, tr.setFromAxisAngle(nr, -Si.cant * s.weight))), Re(n, e), er.copy(Qr).applyMatrix4(e.matrixWorld), n.worldToLocal(er), this.hips ? (Le(n, this.hips, or), or.x += Si.belt[0], or.y += Si.belt[1], or.z += Si.belt[2]) : or.copy(er).y -= .4, t.motion) o = this.clipPose(t, A, s.weight);else if (t.rocket) {
        t.rocket.clip.apply(A);
        const e = t.rig.nodes[t.rocket.node];
        t.rig.activeInHierarchy(t.rocket.node) ? (Ve(n, e, Br), o = ir.copy(er).lerp(Br, s.weight)) : o = ir.copy(er);
      } else {
        this.$_m1z(t, s, Br);
        const A = A => "grip" === A ? er : "mag" === A ? Br : or;
        rr.copy(A(s.from)).lerp(A(s.to), s.k), o = ir.copy(er).lerp(rr, s.weight), t.mag >= 0 && this.$_3py(t, s, o);
      }
      return xe(n, this.arm.shoulder, this.arm.elbow, this.arm.hand, o, this.hint), B && B.wrist.apply(A, s.weight), this.guard.end(), !0;
    }
    clipPose(A, t, s) {
      const n = A.motion,
        e = this.arm,
        B = A.plan ? vi(A.plan, t * A.plan.duration) : t,
        o = A.rig.nodes[0];
      Re(this.root, o);
      const i = A => this.root.worldToLocal(A.applyMatrix4(o.matrixWorld));
      let r = 1;
      if (n.arm) {
        const A = n.arm,
          t = (t, s) => i(s.fromArray(A, 3 * t)),
          s = t(0, ar).distanceTo(t(1, gr)) + gr.distanceTo(t(2, ar));
        Le(this.root, e.shoulder, ar), Le(this.root, e.elbow, gr);
        const B = ar.distanceTo(gr) + gr.distanceTo(Le(this.root, e.hand, ar));
        s > 1e-6 && (r = Math.min(1.25, Math.max(.25, B / s)));
      }
      const w = function (A, t) {
        const s = A.hold;
        if (!s) return 0;
        const {
          a: n,
          b: e,
          k: B
        } = Fi(A, t);
        return s[n] + (s[e] - s[n]) * B;
      }(n, B);
      if (A.mag >= 0) {
        const t = A.rig.nodes[A.mag];
        (function (A, t, s, n) {
          const e = A.mag;
          if (!e) return !1;
          const {
            a: B,
            b: o,
            k: i
          } = Fi(A, t);
          return s.set(e.pos[3 * B] + (e.pos[3 * o] - e.pos[3 * B]) * i, e.pos[3 * B + 1] + (e.pos[3 * o + 1] - e.pos[3 * B + 1]) * i, e.pos[3 * B + 2] + (e.pos[3 * o + 2] - e.pos[3 * B + 2]) * i), ui.fromArray(e.rot, 4 * B), Ei.fromArray(e.rot, 4 * o), n.slerpQuaternions(ui, Ei, i), !0;
        })(n, B, cr, tr) && (t.position.copy(A.rest).addScaledVector(cr.sub(A.rest), r * s), t.quaternion.copy(A.restRot).slerp(tr, s), t.updateMatrix());
        const e = function (A, t) {
          const s = A.magOut;
          if (!s) return 0;
          const {
            a: n,
            b: e,
            k: B
          } = Fi(A, t);
          return s[n] + (s[e] - s[n]) * B;
        }(n, B) < Si.magReach || w > .5;
        A.rig.setActive(A.mag, s < .5 || function (A, t) {
          const s = A.mag?.shown;
          return !s || 1 === s[Math.round(Math.min(1, Math.max(0, t)) * (A.samples - 1))];
        }(n, B) && e);
      }
      return Di(n, B, rr) ? (Di(n, 0, wr), i(rr), i(wr), ir.copy(er).addScaledVector(rr.sub(wr), r), w > 0 && A.mag >= 0 && (Ve(this.root, A.rig.nodes[A.mag], ar), ir.lerp(ar, w)), ir.lerp(er, 1 - s)) : ir.copy(er);
    }
    $_m1z(A, t, s) {
      if (A.mag < 0) return this.handR ? Le(this.root, this.handR, s).y -= Si.under : s.copy(er), s;
      const n = A.rig.nodes[A.mag].parent;
      return Re(this.root, n), cr.copy(A.rest).applyMatrix4(n.matrixWorld), fr.set(0, -1, 0).transformDirection(A.rig.nodes[0].matrixWorld), cr.addScaledVector(fr, Si.pull * t.pull), s.copy(cr), this.root.worldToLocal(s);
    }
    $_3py(A, t, s) {
      const n = A.rig.nodes[A.mag],
        e = n.parent;
      A.rig.setActive(A.mag, t.shown), t.carried ? cr.copy(s).applyMatrix4(this.root.matrixWorld) : cr.copy(Br).applyMatrix4(this.root.matrixWorld), hr.copy(e.matrixWorld).invert(), n.position.copy(cr.applyMatrix4(hr)), n.updateMatrix();
    }
  },
  ur = {
    share: .4,
    forward: 36,
    back: 32,
    lower: .5,
    chestUp: 30,
    armsDown: 45,
    armsUp: 45,
    neckDown: 45,
    neckUp: 40,
    head: .5
  },
  Er = -125.3,
  Fr = -167.244,
  Dr = (A, t, s) => A < t ? t : A > s ? s : A,
  Pr = new Vector3(1, 0, 0),
  dr = Math.PI / 180,
  Mr = new Euler(),
  kr = new Quaternion(),
  br = new Quaternion(),
  Ir = new Quaternion(),
  Gr = {
    spine: 0,
    chest: 0,
    arms: 0,
    neck: 0
  };
function Ur(A, t, s) {
  if (0 !== s) {
    br.identity();
    for (let s = t.parent; s && s !== A; s = s.parent) br.premultiply(s.quaternion);
    br.normalize(), kr.setFromAxisAngle(Pr, s * dr), Ir.copy(br).invert().multiply(kr).multiply(br), t.quaternion.premultiply(Ir).normalize();
  }
}
var vr = class {
    root;
    chest;
    $_4oi;
    $_1jj;
    $_2bp;
    $_5q2;
    neck;
    head;
    constructor(A, t, s) {
      this.root = A, this.chest = t, this.$_4oi = s("Spine_01"), this.$_1jj = s("Spine_02"), this.$_2bp = s("Clavicle_L"), this.$_5q2 = s("Clavicle_R"), this.neck = s("Neck"), this.head = s("Head");
    }
    apply(A, t, s) {
      const n = function (A, t = 0, s = !0, n = {
        spine: 0,
        chest: 0,
        arms: 0,
        neck: 0
      }) {
        const e = A + t;
        if (!s) return n.spine = 0, n.arms = 0, n.neck = 0, n.chest = Dr(e, -249, Er), n;
        const B = ur,
          o = Dr((A - Fr) * B.share, -B.back, B.forward),
          i = Dr(e - o, Math.max(-249, Fr - B.chestUp), Er),
          r = e - o - i;
        return n.spine = o, n.chest = i, n.arms = Dr(r, -B.armsUp, B.armsDown), n.neck = Dr(r, -B.neckUp, B.neckDown), n;
      }(A, t, s && true, Gr);
      if (0 !== n.spine) {
        const A = n.spine * ur.lower;
        this.$_4oi && Ur(this.root, this.$_4oi, A), this.$_1jj && Ur(this.root, this.$_1jj, n.spine - A);
      }
      var e;
      if (e = n.chest, this.chest.quaternion.setFromEuler(Mr.set(0, MathUtils.degToRad(180), MathUtils.degToRad(e), "YXZ")), 0 !== n.arms && (this.$_2bp && Ur(this.root, this.$_2bp, n.arms), this.$_5q2 && Ur(this.root, this.$_5q2, n.arms)), 0 !== n.neck) {
        const A = this.head ? n.neck * ur.head : 0;
        this.neck && Ur(this.root, this.neck, n.neck - A), this.head && Ur(this.root, this.head, A);
      }
      return n;
    }
  },
  pr = ["Hips", "Spine_01", "Spine_02", "Spine_03"],
  mr = pr.length,
  Yr = new WeakMap(),
  Tr = (A, t, s) => s.setFromMatrixPosition(Lr.copy(A.boneInverses[t]).invert()),
  Lr = new Matrix4();
function Jr(A) {
  const t = A.skeleton,
    s = Yr.get(t);
  if (void 0 !== s) return s;
  const n = pr.map(item => t.bones.findIndex(bone => bone?.name === item));
  if (n.some(item => item < 0 || !t.boneInverses[item])) return Yr.set(t, null), null;
  const e = Tr(t, n[0], new Vector3()),
    B = t.bones.findIndex(bone => "Neck" === bone?.name),
    o = Tr(t, B >= 0 ? B : n[mr - 1], new Vector3()).clone().sub(e),
    i = o.length();
  if (!(i > 1e-6)) return Yr.set(t, null), null;
  o.divideScalar(i);
  for (const h of ["x", "y", "z"]) if (Math.abs(o[h]) > .99) {
    const A = Math.sign(o[h]);
    o.set(0, 0, 0), o[h] = A;
    break;
  }
  const r = t.bones.slice(),
    w = t.boneInverses.slice(),
    f = [],
    a = [],
    g = new Matrix4();
  for (const h of n) for (const [A, s] of [[f, 1], [a, -1]]) A.push(r.length), r.push(t.bones[h]), g.makeTranslation(o.x * i * s, o.y * i * s, o.z * i * s), w.push(t.boneInverses[h].clone().multiply(g));
  const c = new Skeleton(r, w);
  A.bind(c, A.bindMatrix);
  const Q = {
    bones: n,
    up: f,
    down: a,
    axis: o,
    reach: i
  };
  return Yr.set(c, Q), Q;
}
var Rr = A => Yr.get(A) ?? null,
  Or = new WeakMap(),
  Vr = new Float32Array(3);
function yr(A, t, s, n, e) {
  const B = n[e],
    o = n[e + 1],
    i = n[e + 2],
    r = n[e + 3] - B,
    w = n[e + 4] - o,
    f = n[e + 5] - i,
    a = n[e + 6] - B,
    g = n[e + 7] - o,
    c = n[e + 8] - i,
    Q = A - B,
    h = t - o,
    l = s - i,
    C = r * Q + w * h + f * l,
    H = a * Q + g * h + c * l;
  let u, E, F;
  A: {
    if (C <= 0 && H <= 0) {
      u = 1, E = 0, F = 0;
      break A;
    }
    const A = Q - r,
      t = h - w,
      s = l - f,
      n = r * A + w * t + f * s,
      e = a * A + g * t + c * s;
    if (n >= 0 && e <= n) {
      u = 0, E = 1, F = 0;
      break A;
    }
    const B = C * e - n * H;
    if (B <= 0 && C >= 0 && n <= 0) {
      E = C / (C - n), u = 1 - E, F = 0;
      break A;
    }
    const o = Q - a,
      i = h - g,
      D = l - c,
      P = r * o + w * i + f * D,
      d = a * o + g * i + c * D;
    if (d >= 0 && P <= d) {
      u = 0, E = 0, F = 1;
      break A;
    }
    const M = P * H - C * d;
    if (M <= 0 && H >= 0 && d <= 0) {
      F = H / (H - d), u = 1 - F, E = 0;
      break A;
    }
    const k = n * d - P * e;
    if (k <= 0 && e - n >= 0 && P - d >= 0) {
      F = (e - n) / (e - n + (P - d)), u = 0, E = 1 - F;
      break A;
    }
    const b = 1 / (k + M + B);
    E = M * b, F = B * b, u = 1 - E - F;
  }
  Vr[0] = u, Vr[1] = E, Vr[2] = F;
  const D = B + r * E + a * F - A,
    P = o + w * E + g * F - t,
    d = i + f * E + c * F - s;
  return D * D + P * P + d * d;
}
var jr = 1e-4;
function xr(A, t, s, n, e = 0) {
  const B = function (A, t) {
    const s = t.bones.join(",");
    let n = Or.get(A);
    n || Or.set(A, n = new Map());
    const e = n.get(s);
    if (e) return e.count ? e : null;
    const B = A.getAttribute("position"),
      o = A.getAttribute("skinIndex"),
      i = A.getAttribute("skinWeight"),
      r = A.getIndex(),
      w = {
        count: 0,
        corners: new Float32Array(0),
        weights: new Float32Array(0),
        spheres: new Float32Array(0)
      };
    if (!B || !o || !i) return n.set(s, w), null;
    const _float32Values2 = new Float32Array(B.count * mr),
      uint8Values = new Uint8Array(B.count);
    for (let E = 0; E < B.count; E++) {
      let A = 0;
      for (let t = 1; t < 4; t++) i.getComponent(E, t) > i.getComponent(E, A) && (A = t);
      if (!(i.getComponent(E, A) > 0)) continue;
      if (!t.bones.includes(o.getComponent(E, A))) continue;
      let s = 0;
      for (let n = 0; n < 4; n++) {
        const A = t.bones.indexOf(o.getComponent(E, n)),
          e = i.getComponent(E, n);
        !(A < 0) && e > 0 && (_float32Values2[E * mr + A] += e, s += e);
      }
      for (let t = 0; t < mr; t++) _float32Values2[E * mr + t] /= s;
      uint8Values[E] = 1;
    }
    const g = (r ? r.count : B.count) / 3,
      c = (A, t) => r ? r.getX(3 * A + t) : 3 * A + t,
      Q = [],
      h = new Vector3(),
      l = new Vector3(),
      C = new Vector3();
    for (let E = 0; E < g; E++) {
      const [A, t, s] = [c(E, 0), c(E, 1), c(E, 2)];
      uint8Values[A] && uint8Values[t] && uint8Values[s] && (h.fromBufferAttribute(B, A), l.fromBufferAttribute(B, t), C.fromBufferAttribute(B, s), l.clone().sub(h).cross(C.clone().sub(h)).lengthSq() > 1e-12 && Q.push(A, t, s));
    }
    const H = Q.length / 3,
      u = {
        count: H,
        corners: new Float32Array(9 * H),
        weights: new Float32Array(3 * H * mr),
        spheres: new Float32Array(4 * H)
      };
    for (let E = 0; E < H; E++) {
      let A = 0,
        t = 0,
        s = 0;
      for (let e = 0; e < 3; e++) {
        const n = Q[3 * E + e],
          o = B.getX(n),
          i = B.getY(n),
          r = B.getZ(n);
        u.corners[9 * E + 3 * e] = o, u.corners[9 * E + 3 * e + 1] = i, u.corners[9 * E + 3 * e + 2] = r, A += o / 3, t += i / 3, s += r / 3;
        for (let A = 0; A < mr; A++) u.weights[(3 * E + e) * mr + A] = _float32Values2[n * mr + A];
      }
      let n = 0;
      for (let e = 0; e < 3; e++) {
        const B = u.corners[9 * E + 3 * e] - A,
          o = u.corners[9 * E + 3 * e + 1] - t,
          i = u.corners[9 * E + 3 * e + 2] - s;
        n = Math.max(n, B * B + o * o + i * i);
      }
      u.spheres.set([A, t, s, Math.sqrt(n)], 4 * E);
    }
    return n.set(s, u), H ? u : null;
  }(A, t);
  if (!B) return null;
  const uint16Values = new Uint16Array(4 * n),
    float32Values = new Float32Array(4 * n),
    {
      corners: r,
      weights: w,
      spheres: f
    } = B,
    {
      axis: a,
      reach: g
    } = t,
    c = [0, 0, 0],
    Q = [0, 0, 0, 0],
    h = [0, 0, 0, 0];
  for (let l = 0; l < n; l++) {
    const A = s[e + 3 * l],
      n = s[e + 3 * l + 1],
      C = s[e + 3 * l + 2];
    let H = 1 / 0,
      u = -1;
    for (let t = 0; t < B.count; t++) {
      const s = f[4 * t] - A,
        e = f[4 * t + 1] - n,
        B = f[4 * t + 2] - C,
        o = Math.sqrt(s * s + e * e + B * B) - f[4 * t + 3];
      if (o > 0 && o * o >= H) continue;
      const i = yr(A, n, C, r, 9 * t);
      i < H && (H = i, u = t, c[0] = Vr[0], c[1] = Vr[1], c[2] = Vr[2]);
    }
    let E = 0,
      F = 0,
      D = 0;
    for (let t = 0; t < 3; t++) E += c[t] * r[9 * u + 3 * t], F += c[t] * r[9 * u + 3 * t + 1], D += c[t] * r[9 * u + 3 * t + 2];
    Q.fill(0), h.fill(0);
    for (let t = 0; t < 3; t++) {
      const A = (r[9 * u + 3 * t] - E) * a.x + (r[9 * u + 3 * t + 1] - F) * a.y + (r[9 * u + 3 * t + 2] - D) * a.z;
      for (let s = 0; s < mr; s++) {
        const n = c[t] * w[(3 * u + t) * mr + s];
        Q[s] += n, h[s] += n * A;
      }
    }
    let P = 0;
    for (let t = 1; t < mr; t++) Q[t] > Q[P] && (P = t);
    let d = -1;
    for (let t = 0; t < mr; t++) t !== P && Q[t] > jr && (d < 0 || Q[t] > Q[d]) && (d = t);
    const M = Q[P] + (d >= 0 ? Q[d] : 0);
    let k = 0;
    const b = (A, t) => {
      t > jr && !(k >= 4) && (uint16Values[4 * l + k] = A, float32Values[4 * l + k] = t, k++);
    };
    for (const s of d >= 0 ? [P, d] : [P]) {
      const A = Q[s] / M,
        n = Q[s] > 0 ? h[s] / Q[s] : 0,
        e = Math.min(A, A * Math.abs(n) / g);
      b(t.bones[s], A - e), b(n > 0 ? t.up[s] : t.down[s], e);
    }
    let I = 0;
    for (let t = 0; t < k; t++) I += float32Values[4 * l + t];
    if (I > 0) {
      if (1 !== I) for (let t = 0; t < k; t++) float32Values[4 * l + t] /= I;
    } else uint16Values[4 * l] = t.bones[P], float32Values[4 * l] = 1;
  }
  return {
    skinIndex: uint16Values,
    skinWeight: float32Values
  };
}
var zr = new WeakMap(),
  Xr = new Set(["skinIndex", "skinWeight"]),
  Wr = class {
    array;
    length = 0;
    constructor(A = 256) {
      this.array = new Float32Array(A);
    }
    reserve(A) {
      if (this.length + A <= this.array.length) return;
      const float32Values = new Float32Array(Math.max(2 * this.array.length, this.length + A));
      float32Values.set(this.array.subarray(0, this.length)), this.array = float32Values;
    }
    push(A) {
      this.reserve(1), this.array[this.length++] = A;
    }
    zeros(A) {
      this.reserve(A), this.array.fill(0, this.length, this.length + A), this.length += A;
    }
    view() {
      return this.array.subarray(0, this.length);
    }
  },
  Sr = class {
    array = new Uint32Array(256);
    length = 0;
    push(A) {
      if (this.length === this.array.length) {
        const uint32Values = new Uint32Array(2 * this.array.length);
        uint32Values.set(this.array), this.array = uint32Values;
      }
      this.array[this.length++] = A;
    }
    view() {
      return this.array.subarray(0, this.length);
    }
  },
  Zr = new WeakMap(),
  Nr = {
    computed: 0,
    cached: 0
  };
function Kr(A, t) {
  for (const s of t) {
    s.removeFromParent(), s.isSkinnedMesh && s.skeleton.dispose();
    const t = A.meshes.indexOf(s);
    t >= 0 && (A.meshes[t] = null);
  }
}
function qr(A, t, s) {
  const uniqueItems = new Set(s);
  for (const B of A.meshes) if (B && B.isSkinnedMesh) for (const A of B.skeleton.bones) uniqueItems.add(sw(A));
  let e = 0;
  for (const B of t) e += iw(B, uniqueItems);
  return e;
}
var _r = new WeakMap();
function $r(A, t, s) {
  const n = new Mesh(A, function (A) {
    let t = _r.get(A);
    if (t) return t;
    const s = A,
      n = !!s.isShaderMaterial,
      e = A.userData,
      B = n ? s.uniforms : null,
      o = n ? s.uniformsGroups : null;
    A.userData = {}, n && (s.uniforms = {}, s.uniformsGroups = []);
    try {
      t = A.clone();
    } finally {
      A.userData = e, n && (s.uniforms = B, s.uniformsGroups = o);
    }
    if (t.userData = e, n) {
      const A = t;
      A.uniforms = B, A.uniformsGroups = o, A.defines = s.defines;
    }
    const i = A,
      r = t;
    for (const w of Object.keys(i)) "uuid" !== w && "_listeners" !== w && "version" !== w && "kourProgram" !== w && (w in r && "function" != typeof i[w] || (r[w] = i[w]));
    return _r.set(A, t), t;
  }(t));
  return n.name = `weapon-batch:${t.name || "material"}`, n.userData.weaponBatch = !0, n.matrixAutoUpdate = !1, s.add(n), n;
}
var Aw = {
  m: new Matrix4(),
  n: new Matrix3(),
  v: new Vector3(),
  w: new Vector3(),
  acc: new Vector3(),
  nacc: new Vector3(),
  local: new Matrix4()
};
function tw(A, t) {
  return t.compose(A.position, A.quaternion, A.scale);
}
function sw(A) {
  const t = A?.userData?.rigIndex;
  return "number" == typeof t ? t : -1;
}
function nw(A) {
  return Array.isArray(A.material) ? Math.max(1, A.geometry.groups.length) : 1;
}
function ew(A, t, s) {
  const n = ow(A, t, s);
  for (;;) {
    const A = n.next();
    if (A.done) return A.value;
  }
}
async function Bw(A, t, s, n, e = () => {}) {
  const B = ow(A, t, s);
  for (;;) {
    const A = performance.now(),
      t = B.next();
    if (t.done) return t.value;
    e(performance.now() - A), await n();
  }
}
function* ow(A, t, s) {
  const n = {
    baked: 0,
    meshes: [],
    pruned: 0
  };
  if (!t.length) return n;
  const e = function (A, t, s) {
    const _lookupMap6 = new Map(),
      _uniqueItems = new Set(t),
      B = [t.map(item => A.nodes.indexOf(item)).join(","), [...s].sort((leftItem, rightItem) => leftItem - rightItem).join(",")];
    for (const o of A.meshes) {
      if (!o) {
        B.push("-");
        continue;
      }
      const A = (Array.isArray(o.material) ? o.material : [o.material]).map(item => {
        let t = _lookupMap6.get(item);
        return void 0 === t && _lookupMap6.set(item, t = _lookupMap6.size), t;
      }).join(".");
      let t = o.visible,
        s = !1;
      for (let n = o.parent; n; n = n.parent) if (n.visible || (t = !1), _uniqueItems.has(n)) {
        s = !0;
        break;
      }
      B.push(`${o.geometry.uuid}:${A}${t ? "" : "h"}${s ? "" : "o"}${o.isSkinnedMesh ? "s" : ""}`);
    }
    return B.join("|");
  }(A, t, s);
  let B = Zr.get(A.data);
  const o = B?.get(e);
  if (o) {
    const n = function (A, t, s, n) {
      const e = [];
      for (const i of n.buckets) {
        const t = A.meshes[i.source[0]],
          s = (t ? Array.isArray(t.material) ? t.material : [t.material] : [])[i.source[1]],
          n = A.nodes[i.parent];
        if (!s || !n) return null;
        e.push({
          geometry: i.geometry,
          material: s,
          parent: n
        });
      }
      const B = [];
      for (const i of n.baked) {
        const t = A.meshes[i];
        if (!t) return null;
        B.push(t);
      }
      const o = {
        baked: B.length,
        meshes: [],
        pruned: 0,
        cached: !0
      };
      for (const i of e) o.meshes.push($r(i.geometry, i.material, i.parent));
      return Kr(A, B), o.pruned = qr(A, t, s), Nr.cached++, o;
    }(A, t, s, o);
    if (n) return n;
  }
  Nr.computed++;
  const i = A.data.nodes,
    uniqueItems = new Set(t),
    w = A => {
      for (let t = A; t >= 0; t = i[t].parent) if (s.has(t)) return t;
      return -1;
    };
  let f = 0;
  const a = [];
  for (let E = 0; E < A.meshes.length; E++) {
    const t = A.meshes[E];
    if (!t) continue;
    let n = null,
      e = t.visible,
      B = !1;
    for (let A = t; A; A = A.parent) if (A === t || A.visible || (e = !1), s.has(sw(A)) && (B = !0), uniqueItems.has(A)) {
      n = A;
      break;
    }
    const o = t.isSkinnedMesh ? t : null;
    if (!n || !e || B && !o) continue;
    const i = t.geometry,
      g = i.getAttribute("position"),
      c = i.getIndex();
    if (!g || !c) continue;
    const Q = sw(n);
    if (o && (0 !== Q || n !== A.nodes[0])) continue;
    let h = null,
      l = [];
    if (o) {
      if (l = o.skeleton.bones.map(bone => sw(bone)), l.some(item => item < 0)) continue;
      const A = i.getAttribute("skinIndex"),
        t = i.getAttribute("skinWeight");
      h = new Int32Array(g.count);
      for (let s = 0; s < g.count; s++) {
        let n = -1,
          e = -1;
        for (let o = 0; o < 4; o++) {
          const B = t.getComponent(s, o);
          B <= 0 || B > e && (e = B, n = A.getComponent(s, o));
        }
        const B = n >= 0 ? w(l[n]) : -1;
        h[s] = B >= 0 ? B : Q, ++f >= 4096 && (f = 0, yield);
      }
    }
    a.push({
      mesh: t,
      meshIndex: E,
      root: n,
      rootIndex: Q,
      skin: o,
      position: g,
      normal: i.getAttribute("normal"),
      index: c,
      materials: Array.isArray(t.material) ? t.material : [t.material],
      groups: i.groups.length && Array.isArray(t.material) ? i.groups : [{
        start: 0,
        count: c.count,
        materialIndex: 0
      }],
      target: h,
      boneNode: l
    });
  }
  const g = (t, s) => {
      const n = t.target ? t.target[t.index.getX(s)] : t.rootIndex;
      return n === t.rootIndex ? t.root : A.nodes[n];
    },
    c = function (A, t) {
      let s = 0,
        n = 0;
      for (const e of A.meshes) {
        if (!e) continue;
        let A = !1,
          B = e.visible;
        for (let s = e; s; s = s.parent) if (s === e || s.visible || (B = !1), t.has(s)) {
          A = !0;
          break;
        }
        A && B && (s += nw(e), e.isSkinnedMesh && n++);
      }
      return {
        draws: s,
        skinned: n
      };
    }(A, uniqueItems),
    Q = A => A.draws + A.skinned;
  let h = null;
  for (const E of [!1, !0]) {
    const _lookupMap7 = new Map();
    let t = 0,
      s = c.draws,
      n = c.skinned,
      e = 0;
    for (const o of a) if (E || !o.skin) {
      for (const s of o.groups) {
        const n = o.materials[s.materialIndex ?? 0];
        if (!n) continue;
        let e = _lookupMap7.get(n);
        e || _lookupMap7.set(n, e = new Set());
        for (let A = s.start; A + 2 < s.start + s.count; A += 3) {
          const s = g(o, A);
          if (e.has(s) || (e.add(s), t++), !o.target) break;
        }
      }
      e++, s -= nw(o.mesh), o.skin && n--;
    }
    if (!e) continue;
    const B = {
      skinnedToo: E,
      draws: s + t,
      skinned: n
    };
    (Q(B) < Q(c) || Q(B) === Q(c) && B.skinned < c.skinned) && (!h || Q(B) <= Q(h)) && (h = B);
  }
  if (!h) return B || Zr.set(A.data, B = new Map()), B.set(e, {
    buckets: [],
    baked: []
  }), n;
  const l = function (A) {
      const t = A.data.nodes,
        s = t.map(() => null),
        n = e => {
          let B = s[e];
          if (!B) {
            B = tw(A.nodes[e], new Matrix4());
            const o = t[e].parent;
            o >= 0 && B.premultiply(n(o)), s[e] = B;
          }
          return B;
        };
      return t.map((item, index) => n(index));
    }(A),
    lookupMap = new Map(),
    H = A => {
      let t = lookupMap.get(A);
      return t || lookupMap.set(A, t = l[A].clone().invert()), t;
    },
    _lookupMap3 = new Map(),
    F = A => {
      let t = _lookupMap3.get(A);
      return t || _lookupMap3.set(A, t = new Matrix3().getNormalMatrix(H(A))), t;
    },
    P = [],
    _lookupMap4 = new Map(),
    k = (A, t, s) => {
      let n = _lookupMap4.get(A);
      n || _lookupMap4.set(A, n = new Map());
      let e = n.get(t);
      return e || (e = {
        material: A,
        source: s,
        parent: t,
        positions: new Wr(),
        normals: new Wr(),
        extra: new Map(),
        indices: new Sr(),
        vertices: 0
      }, n.set(t, e), P.push(e)), e;
    },
    _lookupMap5 = new Map(),
    U = [];
  for (const E of a) {
    if (!h.skinnedToo && E.skin) continue;
    const {
        position: A,
        normal: t,
        index: s,
        root: n,
        rootIndex: e,
        skin: B
      } = E,
      o = A.count,
      float64Values = new Float64Array(3 * o),
      _float64Values = new Float64Array(3 * o);
    if (B) {
      const s = E.mesh.geometry,
        n = s.getAttribute("skinIndex"),
        e = s.getAttribute("skinWeight"),
        w = E.target,
        a = E.boneNode.map((item, index) => l[item].clone().multiply(B.skeleton.boneInverses[index])),
        g = a.map(item => new Matrix3().getNormalMatrix(item));
      for (let c = 0; c < o; c++) {
        Aw.v.fromBufferAttribute(A, c).applyMatrix4(B.bindMatrix), Aw.acc.set(0, 0, 0), Aw.nacc.set(0, 0, 0);
        for (let A = 0; A < 4; A++) {
          const s = e.getComponent(c, A);
          if (s <= 0) continue;
          const B = n.getComponent(c, A);
          Aw.acc.addScaledVector(Aw.w.copy(Aw.v).applyMatrix4(a[B]), s), t && Aw.nacc.addScaledVector(Aw.w.fromBufferAttribute(t, c).applyMatrix3(g[B]), s);
        }
        const s = w[c];
        Aw.acc.applyMatrix4(H(s)), float64Values[3 * c] = Aw.acc.x, float64Values[3 * c + 1] = Aw.acc.y, float64Values[3 * c + 2] = Aw.acc.z, t && (Aw.nacc.applyMatrix3(F(s)).normalize(), _float64Values[3 * c] = Aw.nacc.x, _float64Values[3 * c + 1] = Aw.nacc.y, _float64Values[3 * c + 2] = Aw.nacc.z), ++f >= 4096 && (f = 0, yield);
      }
    } else {
      const s = Aw.m.identity();
      for (let A = E.mesh; A && A !== n; A = A.parent) s.premultiply(tw(A, Aw.local));
      Aw.n.getNormalMatrix(s);
      const e = s.clone(),
        B = Aw.n.clone();
      for (let n = 0; n < o; n++) Aw.v.fromBufferAttribute(A, n).applyMatrix4(e), float64Values[3 * n] = Aw.v.x, float64Values[3 * n + 1] = Aw.v.y, float64Values[3 * n + 2] = Aw.v.z, t && (Aw.v.fromBufferAttribute(t, n).applyMatrix3(B).normalize(), _float64Values[3 * n] = Aw.v.x, _float64Values[3 * n + 1] = Aw.v.y, _float64Values[3 * n + 2] = Aw.v.z), ++f >= 4096 && (f = 0, yield);
    }
    const w = E.mesh.geometry,
      a = [],
      c = [];
    for (const f of Object.keys(w.attributes)) if ("position" !== f && "normal" !== f && !Xr.has(f)) {
      a.push(f);
      const A = w.getAttribute(f);
      c.push(A), _lookupMap5.set(f, A.itemSize);
    }
    for (const Q of E.groups) {
      const A = E.materials[Q.materialIndex ?? 0];
      if (!A) continue;
      const _lookupMap8 = new Map();
      let n = null,
        e = null,
        B = null;
      for (let w = Q.start; w + 2 < Q.start + Q.count; w += 3) {
        const h = g(E, w);
        h !== n && (n = h, e = k(A, h, [E.meshIndex, Q.materialIndex ?? 0]), B = _lookupMap8.get(h) ?? null, B || _lookupMap8.set(h, B = new Int32Array(o).fill(-1)));
        for (let A = 0; A < 3; A++) {
          const t = s.getX(w + A);
          let n = B[t];
          if (n < 0) {
            n = B[t] = e.vertices++;
            const A = e.positions,
              s = e.normals;
            A.reserve(3), A.array[A.length++] = float64Values[3 * t], A.array[A.length++] = float64Values[3 * t + 1], A.array[A.length++] = float64Values[3 * t + 2], s.reserve(3), s.array[s.length++] = _float64Values[3 * t], s.array[s.length++] = _float64Values[3 * t + 1], s.array[s.length++] = _float64Values[3 * t + 2];
            for (let n = 0; n < a.length; n++) {
              const A = c[n];
              let s = e.extra.get(a[n]);
              s || (s = new Wr(), s.zeros((e.vertices - 1) * A.itemSize), e.extra.set(a[n], s));
              for (let n = 0; n < A.itemSize; n++) s.push(A.getComponent(t, n));
            }
            if (e.extra.size > a.length) for (const [t, n] of e.extra) a.includes(t) || n.zeros(_lookupMap5.get(t));
          }
          e.indices.push(n);
        }
        ++f >= 4096 && (f = 0, yield);
      }
    }
    U.push(E.mesh);
  }
  f > 0 && (yield);
  const v = {
    buckets: [],
    baked: []
  };
  for (const D of P) {
    if (!D.indices.length) continue;
    const t = new BufferGeometry();
    t.setAttribute("position", new Float32BufferAttribute(D.positions.view(), 3)), t.setAttribute("normal", new Float32BufferAttribute(D.normals.view(), 3));
    for (const [A, s] of D.extra) t.setAttribute(A, new Float32BufferAttribute(s.view(), _lookupMap5.get(A)));
    t.setIndex(D.vertices > 65535 ? new Uint32BufferAttribute(D.indices.view(), 1) : new Uint16BufferAttribute(D.indices.view(), 1)), t.computeBoundingSphere(), t.computeBoundingBox(), n.meshes.push($r(t, D.material, D.parent)), v.buckets.push({
      geometry: t,
      source: D.source,
      parent: A.nodes.indexOf(D.parent)
    });
  }
  for (const E of U) v.baked.push(A.meshes.indexOf(E));
  return v.buckets.every(item => item.parent >= 0) && v.baked.every(item => item >= 0) && (B || Zr.set(A.data, B = new Map()), B.set(e, v)), Kr(A, U), n.baked = U.length, n.pruned = qr(A, t, s), n;
}
function iw(A, t) {
  let s = 0;
  for (const n of [...A.children]) {
    s += iw(n, t);
    const A = sw(n);
    A >= 0 && !t.has(A) && 0 === n.children.length && n.isBone && (n.removeFromParent(), s++);
  }
  return s;
}
var rw = new Map(),
  ww = new Map();
function fw(A) {
  if (A.isCompressedTexture) return null;
  const t = A.image;
  return t && t.width && t.height ? t : null;
}
function aw(A, t, s, n, e) {
  return [(A.x + n * A.w) / t, (s - A.y - A.h + e * A.h) / s];
}
function gw(A, t, s) {
  const n = A.getAttribute("uv");
  if (!n) return !1;
  const e = 1 / t,
    B = 1 / s;
  for (let o = 0; o < n.count; o++) {
    const A = n.getX(o),
      t = n.getY(o);
    if (A < -e || A > 1 + e || t < -B || t > 1 + B) return !1;
  }
  return !0;
}
function cw(A, t, s, n) {
  const e = [A, ...s.map(item => item.geometry)];
  let B = 0,
    o = 0;
  for (const D of e) B += D.getAttribute("position").count, o += D.getIndex()?.count ?? D.getAttribute("position").count;
  const float32Values = new Float32Array(3 * B),
    _float32Values3 = new Float32Array(3 * B),
    _float32Values4 = new Float32Array(2 * B),
    uint16Values = new Uint16Array(4 * B),
    _float32Values5 = new Float32Array(4 * B),
    g = B > 65535 ? new Uint32Array(o) : new Uint16Array(o),
    {
      width: c,
      height: Q,
      rects: h
    } = n;
  let l = 0,
    C = 0;
  const H = new Vector3(),
    u = new Vector3(),
    E = new Matrix4(),
    F = new Matrix3();
  e.forEach((item, index) => {
    const B = item.getAttribute("position"),
      o = item.getAttribute("normal"),
      D = item.getAttribute("uv"),
      P = index > 0 ? s[index - 1] : null;
    P && (E.copy(t[P.bone]).invert().multiply(P.local), F.getNormalMatrix(E));
    const d = item.getAttribute("skinIndex"),
      M = item.getAttribute("skinWeight");
    for (let A = 0; A < B.count; A++) {
      const t = l + A;
      if (H.fromBufferAttribute(B, A), o ? u.fromBufferAttribute(o, A) : u.set(0, 1, 0), P) H.applyMatrix4(E), u.applyMatrix3(F).normalize(), uint16Values[4 * t] = P.bone, _float32Values5[4 * t] = 1;else for (let e = 0; e < 4; e++) uint16Values[4 * t + e] = d.getComponent(A, e), _float32Values5[4 * t + e] = M.getComponent(A, e);
      float32Values[3 * t] = H.x, float32Values[3 * t + 1] = H.y, float32Values[3 * t + 2] = H.z, _float32Values3[3 * t] = u.x, _float32Values3[3 * t + 1] = u.y, _float32Values3[3 * t + 2] = u.z;
      const [s, n] = aw(h[index], c, Q, D.getX(A), D.getY(A));
      _float32Values4[2 * t] = s, _float32Values4[2 * t + 1] = n;
    }
    const k = P?.trunk ? xr(A, P.trunk, float32Values, B.count, 3 * l) : null;
    k && (uint16Values.set(k.skinIndex, 4 * l), _float32Values5.set(k.skinWeight, 4 * l));
    const b = item.getIndex(),
      I = b ? b.count : B.count;
    for (let A = 0; A < I; A++) g[C + A] = (b ? b.getX(A) : A) + l;
    l += B.count, C += I;
  });
  const P = new BufferGeometry();
  return P.setAttribute("position", new BufferAttribute(float32Values, 3)), P.setAttribute("normal", new BufferAttribute(_float32Values3, 3)), P.setAttribute("uv", new BufferAttribute(_float32Values4, 2)), P.setAttribute("skinIndex", new BufferAttribute(uint16Values, 4)), P.setAttribute("skinWeight", new BufferAttribute(_float32Values5, 4)), P.setIndex(new BufferAttribute(g, 1)), P.computeBoundingSphere(), P;
}
var Qw = {
    blendIn: .07,
    blendOut: .2,
    hold: 1.4,
    fp: {
      hip: {
        right: -.03,
        up: -.06,
        forward: -.04,
        cant: 18,
        pitch: 4
      },
      palm: [.35, .12, -.45],
      raise: [.1, .5, -.1],
      sweep: [.4, 0, 0],
      elbow: [.2, -.8, -.6],
      fingers: [-.85, -.1, .5],
      knuckles: [.5, 0, .85],
      reach: 1.4
    },
    tp: {
      lower: .55,
      cant: .5,
      palm: [-.085, .045, -.01],
      raise: [-.02, .18, .03],
      sweep: [0, 0, -.09],
      elbow: [-.75, -.55, -.35],
      fingers: [1, -.1, 0],
      knuckles: [0, 0, 1]
    }
  },
  hw = A => {
    const t = Math.min(1, Math.max(0, A));
    return t * t * (3 - 2 * t);
  };
function lw(A) {
  if (A >= 1 || A < 0) return {
    lift: 1,
    sweep: -1
  };
  if (A < .15) return {
    lift: .15 * hw(A / .15),
    sweep: .4 * hw(A / .15)
  };
  if (A < .7) {
    const t = hw((A - .15) / .55);
    return {
      lift: .15 + .85 * t,
      sweep: .4 - 1.4 * t
    };
  }
  const t = (A - .7) / .3;
  return {
    lift: 1 - t * t,
    sweep: -1 + hw(t)
  };
}
var Cw = class {
    interval;
    since = 1 / 0;
    weight = 0;
    constructor(A) {
      this.interval = A;
    }
    shot() {
      this.since = 0;
    }
    stop() {
      this.since = 1 / 0, this.weight = 0;
    }
    update(A) {
      this.since += A;
      const t = this.since < Qw.hold * this.interval,
        s = 1 / (t ? Qw.blendIn : Qw.blendOut);
      return this.weight = Math.min(1, Math.max(0, this.weight + (t ? A : -A) * s)), hw(this.weight);
    }
    get phase() {
      return this.since / this.interval;
    }
  },
  Hw = new Vector3(),
  uw = new Vector3(),
  Ew = new Vector3(),
  Fw = new Vector3(),
  Dw = new Vector3(),
  Pw = new Vector3(),
  dw = new Vector3(),
  Mw = new Vector3(),
  kw = new Quaternion(),
  bw = new Quaternion(),
  Iw = new Quaternion(),
  Gw = new Euler(),
  Uw = ["Shoulder_L", "Elbow_L", "Hand_L", "IndexFinger_01", "Finger_01"],
  vw = ["IndexFinger_03", "Finger_03"];
function pw(A) {
  const [t, s, n, e, B] = Uw.map(A),
    [o, i] = vw.map(A);
  return t && s && n && e && B && o && i ? {
    shoulder: t,
    elbow: s,
    hand: n,
    index: e,
    finger: B,
    indexTip: o,
    fingerTip: i
  } : null;
}
function mw(A, t, s, n, e) {
  kw.copy(t.hand.quaternion);
  const B = Le(A, t.index, Fw),
    o = Le(A, t.finger, Dw);
  je(A, t.hand, Pw.subVectors(B, o), dw.set(...n));
  const i = dw.normalize(),
    r = Le(A, t.index, Fw).add(Le(A, t.finger, Dw)).multiplyScalar(.5),
    w = Le(A, t.indexTip, Dw).add(Le(A, t.fingerTip, Pw)).multiplyScalar(.5),
    f = Pw.subVectors(w, r);
  f.addScaledVector(i, -f.dot(i));
  const a = Dw.set(...s);
  a.addScaledVector(i, -a.dot(i)), je(A, t.hand, f, a), bw.copy(t.hand.quaternion), t.hand.quaternion.copy(kw).slerp(bw, e);
}
function Yw(A, t, s, n) {
  return n.copy(A).add(Fw.set(...s.palm)).addScaledVector(Dw.set(...s.raise), t.lift).addScaledVector(Pw.set(...s.sweep), t.sweep);
}
var Tw = class A {
    timing;
    root;
    $_1t70z;
    arm;
    hint = new Vector3(...Qw.fp.elbow).normalize();
    $_kxe = new Vector3();
    $_1gk = new Vector3();
    reached = !1;
    constructor(A, t, s, n) {
      this.root = A.nodes[0], this.$_1t70z = t, this.arm = s, this.timing = new Cw(n);
    }
    static of(t, s) {
      const n = t.node("hammer_end") ?? t.node("hammer"),
        e = pw(A => t.node(A));
      return n && e && s > 0 ? new A(t, n, e, 1 / s) : null;
    }
    shot() {
      this.timing.shot();
    }
    stop() {
      this.timing.stop(), this.reached && this.arm.shoulder.position.equals(this.$_1gk) && this.arm.shoulder.position.copy(this.$_kxe), this.reached = !1;
    }
    update(A) {
      const t = this.timing.update(A),
        s = this.arm.shoulder;
      if (this.reached && s.position.equals(this.$_1gk) && s.position.copy(this.$_kxe), this.reached = !1, t <= 0) return;
      const n = Qw.fp,
        e = this.root;
      e.position.x -= n.hip.forward / .2 * t, e.position.y += n.hip.up / .2 * t, e.position.z += n.hip.right / .2 * t;
      const B = MathUtils.DEG2RAD;
      Iw.setFromEuler(Gw.set(-n.hip.cant * B * t, 0, n.hip.pitch * B * t, "XYZ")), e.quaternion.premultiply(Iw), Le(e, this.arm.hand, Ew), Le(e, this.$_1t70z, Hw), Yw(Hw, lw(this.timing.phase), n, uw), Ew.lerp(uw, t), this.$_kxe.copy(s.position);
      const o = Le(e, s, Fw);
      o.addScaledVector(Dw.subVectors(Ew, o).normalize(), n.reach * t), e.localToWorld(o), s.parent.updateWorldMatrix(!0, !1), s.position.copy(s.parent.worldToLocal(o)), this.$_1gk.copy(s.position), this.reached = !0, xe(e, s, this.arm.elbow, this.arm.hand, Ew, this.hint), mw(e, this.arm, n.fingers, n.knuckles, t);
    }
  },
  Lw = class {
    root;
    guard;
    timing = null;
    $_1t70z = null;
    arm;
    shoulderR;
    handR;
    hint = new Vector3(...Qw.tp.elbow).normalize();
    constructor(A, t, s) {
      this.root = A, this.guard = s, this.arm = pw(t), this.shoulderR = t("Shoulder_R"), this.handR = t("Hand_R");
    }
    setWeapon(A, t = 0) {
      this.guard.restore(), this.$_1t70z = A && t > 0 ? A.node("hammer_end") ?? A.node("hammer") ?? null : null, this.timing = this.$_1t70z ? new Cw(1 / t) : null;
    }
    shot() {
      this.timing?.shot();
    }
    pose(A, t, s = !1) {
      const n = this.timing,
        e = n ? n.update(A) : 0;
      if (!n || e <= 0 || !t || s || !this.arm || !this.$_1t70z) return s || this.guard.restore(), !1;
      const B = Qw.tp,
        o = this.root;
      return this.guard.begin(), this.shoulderR && ye(o, this.shoulderR, Iw.setFromAxisAngle(Fw.set(1, 0, 0), B.lower * e)), this.handR && ye(o, this.handR, Iw.setFromAxisAngle(Fw.set(0, 0, 1), -B.cant * e)), Le(o, this.arm.hand, Ew), Ve(o, this.$_1t70z, Hw), Yw(Hw, lw(n.phase), B, uw), Ew.lerp(uw, e), Mw.copy(this.hint), xe(o, this.arm.shoulder, this.arm.elbow, this.arm.hand, Ew, Mw), mw(o, this.arm, B.fingers, B.knuckles, e), this.guard.end(), !0;
    }
  },
  Jw = {
    origin: .16,
    scale: .2,
    half: .24,
    gap: .05,
    soft: .05
  },
  Rw = (Jw.half - Jw.origin) / Jw.scale,
  Ow = (-Jw.half - Jw.origin) / Jw.scale,
  Vw = {
    elbow: "Elbow_R",
    at: [0, .35, .7]
  },
  yw = new Vector3(),
  jw = class {
    chain = [];
    probes = [];
    table = null;
    constructor(A, t) {
      const lookupMap = new Map(),
        n = t => {
          const e = lookupMap.get(t);
          if (void 0 !== e) return e;
          const B = A.data.nodes[t].parent,
            o = B >= 0 ? n(B) : -1,
            i = this.chain.length;
          return this.chain.push({
            node: A.nodes[t],
            parent: o,
            matrix: new Matrix4()
          }), lookupMap.set(t, i), i;
        };
      A.data.renderers.forEach((item, index) => {
        const B = A.meshes[index];
        if (!B || !item.enabled || t.includes(item.node)) return;
        if (B.isSkinnedMesh) {
          const t = B,
            e = A.nodes[item.rootBone ?? -1],
            o = e ? t.skeleton.bones.indexOf(e) : -1;
          if (o < 0) return;
          for (const [s, B] of function (A, t) {
            const s = A.geometry,
              n = s.getAttribute("position"),
              e = s.getAttribute("skinIndex"),
              B = s.getAttribute("skinWeight"),
              _lookupMap9 = new Map(),
              i = new Vector3();
            for (let w = 0; n && w < n.count; w++) {
              let s = t;
              if (e && B) {
                let A = -1;
                for (let t = 0; t < e.itemSize; t++) {
                  const n = B.getComponent(w, t);
                  n > A && (A = n, s = e.getComponent(w, t));
                }
              }
              const r = A.skeleton.boneInverses[s];
              if (!r) continue;
              i.fromBufferAttribute(n, w).applyMatrix4(r);
              let f = _lookupMap9.get(s);
              f || _lookupMap9.set(s, f = new Box3()), f.expandByPoint(i);
            }
            const _lookupMap0 = new Map();
            for (const [w, f] of _lookupMap9) {
              const A = [];
              for (const t of [f.min.x, f.max.x]) for (const s of [f.min.y, f.max.y]) for (const n of [f.min.z, f.max.z]) A.push(new Vector3(t, s, n));
              _lookupMap0.set(w, A);
            }
            return _lookupMap0;
          }(t, o)) {
            const e = A.nodes.indexOf(t.skeleton.bones[s]);
            e >= 0 && this.probes.push({
              slot: n(e),
              points: B
            });
          }
          return;
        }
        B.geometry.boundingBox || B.geometry.computeBoundingBox();
        const o = B.geometry.boundingBox,
          i = [];
        for (const A of [o.min.x, o.max.x]) for (const t of [o.min.y, o.max.y]) for (const s of [o.min.z, o.max.z]) i.push(new Vector3(A, t, s));
        this.probes.push({
          slot: n(item.node),
          points: i
        });
      });
      const e = A.data.nodes.findIndex(node => "Hand_R" === node.name);
      if (e >= 0) {
        const t = s => s === e || s >= 0 && t(A.data.nodes[s].parent);
        A.data.nodes.forEach((node, index) => {
          t(index) && this.probes.push({
            slot: n(index),
            points: [new Vector3()]
          });
        });
        const s = A.data.nodes.findIndex(node => node.name === Vw.elbow);
        if (s >= 0 && A.data.nodes[e].parent === s) {
          const t = A.nodes[e].position;
          this.probes.push({
            slot: n(s),
            points: Vw.at.map(item => t.clone().multiplyScalar(item))
          });
        }
      }
    }
    $_63ot() {
      for (const t of this.chain) t.node.updateMatrix(), t.parent >= 0 ? t.matrix.multiplyMatrices(this.chain[t.parent].matrix, t.node.matrix) : t.matrix.copy(t.node.matrix);
      let A = 1 / 0;
      for (const t of this.probes) {
        const s = this.chain[t.slot].matrix;
        for (const n of t.points) {
          const t = yw.copy(n).applyMatrix4(s).z;
          t < A && (A = t);
        }
      }
      return A;
    }
    measure() {
      const A = this.$_63ot();
      return A === 1 / 0 ? 0 : function (A, t = Jw) {
        return function (A, t) {
          return A >= t ? 0 : A <= -t ? -A : (t - A) * (t - A) / (4 * t);
        }(A - -(t.half - t.gap) / t.scale, t.soft / t.scale);
      }(A);
    }
    push(A) {
      const t = A?.currentState(0),
        s = t && !t.inTransition && t.state ? this.table?.get(t.state) : void 0;
      if (!s || !t) return this.measure();
      const n = s.length > 0 && (this.loops.get(t.state) ?? !1);
      let e = t.normalizedTime;
      e = n ? e - Math.floor(e) : Math.min(1, Math.max(0, e));
      const B = e * (s.length - 1),
        o = Math.min(s.length - 2, Math.floor(B));
      return o < 0 ? s[0] : s[o] + (s[o + 1] - s[o]) * (B - o);
    }
    loops = new Map();
    bake(A, t) {
      const s = A.controller,
        n = s.machines[s.layers[0]?.machine ?? 0],
        lookupMap = new Map(),
        B = A.speed;
      A.speed = 1;
      for (const o of n?.states ?? []) {
        const s = t(o),
          n = Math.min(100, Math.max(9, Math.ceil(20 * s.seconds) + 1)),
          float32Values = new Float32Array(n);
        for (let t = 0; t < n; t++) A.play(o.name, 0, t / (n - 1)), A.update(0), float32Values[t] = this.measure();
        lookupMap.set(o, float32Values), this.loops.set(o, s.loop);
      }
      return A.restart(), A.update(0), A.speed = B, this.table = lookupMap, lookupMap;
    }
    $_gt5(A) {
      this.table = A.table, this.loops = A.loops;
    }
  };
function xw(A, t, s, n) {
  const e = Dt({
      ammo: t,
      reserve: s
    }, A),
    B = .5 * e,
    o = e => Gi({
      ...A,
      reload: e,
      bulletAddReloadTimes: []
    }, t, s, n);
  return {
    plans: [o(B), o(e - B)],
    offsets: [0, B]
  };
}
var zw = {
  state: "Inspect",
  handOver: .85
};
function Xw(A) {
  return A.state?.name !== zw.state ? !A.inTransition : A.normalizedTime >= zw.handOver;
}
var Ww = [.65, -.7, -.25];
function Sw(A) {
  const t = .03;
  if (A < 0 || A >= .16) return 0;
  if (A < t) return A / t;
  const s = (A - t) / .13;
  return (1 - s) * (1 - s);
}
var Zw = [["Finger_01 1", "Finger_01"], ["Finger_02 1", "Finger_02"], ["Finger_03 1", "Finger_03"], ["IndexFinger_01 1", "IndexFinger_01"], ["IndexFinger_02 1", "IndexFinger_02"], ["IndexFinger_03 1", "IndexFinger_03"], ["Thumb_01 1", "Thumb_01"], ["Thumb_02 1", "Thumb_02"]],
  Nw = new Vector3(),
  Kw = new Vector3(),
  qw = new Vector3(),
  _w = new Vector3(),
  $w = new Vector3(),
  Af = new Vector3(),
  tf = new Vector3(),
  sf = new Vector3(),
  nf = new Vector3(),
  ef = new Vector3(),
  Bf = new Vector3(),
  of = new Vector3(),
  rf = new Matrix4();
function wf(A, t, s, n, e) {
  return Re(A, t), e.set(s, n, 0).transformDirection(t.matrixWorld), e.transformDirection(rf.copy(A.matrixWorld).invert());
}
var ff = class {
    root;
    guard;
    arms;
    fingers = [];
    guns = null;
    since = [1 / 0, 1 / 0];
    constructor(A, t, s) {
      this.root = A, this.guard = s;
      const n = (A, s) => {
          const n = t(`Shoulder_${A}`),
            e = t(`Elbow_${A}`),
            B = t(`Hand_${A}`),
            [o, i, r] = Ww;
          return n && e && B ? {
            shoulder: n,
            elbow: e,
            hand: B,
            hint: new Vector3(s * o, i, r).normalize()
          } : null;
        },
        e = n("R", 1),
        B = n("L", -1);
      this.arms = e && B ? [e, B] : null;
      for (const [o, i] of Zw) {
        const A = t(o),
          s = t(i);
        A && s && this.fingers.push([A, s]);
      }
    }
    setWeapon(A, t) {
      this.guard.restore();
      const s = A => {
          const t = Fe(A)?.node;
          return t ? {
            root: A.nodes[0],
            muzzle: t
          } : null;
        },
        n = A && t ? s(A) : null,
        e = A && t ? s(t) : null;
      this.guns = n && e ? [n, e] : null, this.since[0] = this.since[1] = 1 / 0;
    }
    get active() {
      return !!this.guns;
    }
    shot(A) {
      this.since[1 === A ? 1 : 0] = 0;
    }
    pose(A, t, s) {
      this.since[0] += A, this.since[1] += A;
      const n = this.guns,
        e = this.arms;
      if (!n || !e || !t) return this.guard.restore(), !1;
      const B = this.root;
      this.guard.begin(), Le(B, e[0].hand, Nw), Le(B, e[1].hand, Kw), qw.addVectors(Nw, Kw).multiplyScalar(.5), Le(B, e[0].shoulder, Nw), Le(B, e[1].shoulder, Kw), _w.addVectors(Nw, Kw).multiplyScalar(.5), $w.subVectors(Nw, Kw).normalize(), Af.subVectors(qw, _w), Af.addScaledVector($w, -Af.dot($w)).normalize(), tf.crossVectors(Af, $w).normalize();
      const o = function (A) {
        if (A < 0 || A > 1) return [0, 0];
        const t = A => {
          if (A <= 0 || A >= 1) return 0;
          const t = Math.min(1, A / .25, (1 - A) / .25);
          return t * t * (3 - 2 * t);
        };
        return [t(A / .5), t((A - .5) / .5)];
      }(s);
      for (let i = 0; i < 2; i++) {
        const A = e[i],
          t = 0 === i ? 1 : -1,
          s = Sw(this.since[i]),
          r = o[i],
          w = 0 === i ? Nw : Kw,
          f = Le(B, A.elbow, ef).distanceTo(w) + Le(B, A.hand, Bf).distanceTo(ef);
        sf.copy(w).addScaledVector(Af, .9 * f - .05 * s - .15 * r).addScaledVector($w, t * (.03 - .12 * r)).addScaledVector(tf, -.06 - .16 * r), nf.copy(A.hint), xe(B, A.shoulder, A.elbow, A.hand, sf, nf);
        const a = n[i],
          g = of.copy(Af).addScaledVector($w, t * (.1 - .9 * r)).addScaledVector(tf, Math.tan(.45 * s) - .4 * r).normalize();
        je(B, A.hand, wf(B, a.root, -1, 0, ef), g);
        const c = wf(B, a.root, 0, 1, ef);
        c.addScaledVector(g, -c.dot(g)), Bf.copy(tf).addScaledVector(g, -tf.dot(g)), c.lengthSq() > 1e-8 && Bf.lengthSq() > 1e-8 && je(B, A.hand, c, Bf);
      }
      for (const [i, r] of this.fingers) r.quaternion.copy(i.quaternion);
      return this.guard.end(), !0;
    }
  },
  af = new Vector3(1, 0, 0),
  gf = new Quaternion(),
  cf = new Vector3(),
  Qf = class {
    node;
    amount = 0;
    $_4rp = new Vector3();
    $_4cd = new Quaternion();
    posed = !1;
    constructor(A) {
      this.node = A, A && (this.$_4rp.copy(A.position), this.$_4cd.copy(A.quaternion));
    }
    get $_7i7() {
      return 18 * this.amount;
    }
    ease(A, t) {
      const s = t ? 1 : 0,
        n = s > this.amount ? 12 : 6;
      return this.amount += (s - this.amount) * Math.min(1, Math.max(0, A * n)), !t && this.amount < .001 && (this.amount = 0), this.amount;
    }
    pose(A, t, s) {
      const n = this.node,
        e = this.ease(A, t);
      if (!n || !s && e > 0) return;
      if (e <= 0) {
        if (!this.posed) return;
        return this.posed = !1, n.position.copy(this.$_4rp), n.quaternion.copy(this.$_4cd), void n.updateMatrix();
      }
      this.posed = !0;
      const B = gf.setFromAxisAngle(af, MathUtils.degToRad(-18 * e)),
        o = cf.set(0, 1, 0);
      n.quaternion.copy(this.$_4cd).premultiply(B), n.position.copy(o).applyQuaternion(B).negate().add(o).add(this.$_4rp), n.position.y += .06 * e, n.updateMatrix();
    }
    reset() {
      this.amount = 0, this.pose(0, !1, !0);
    }
  },
  hf = [[0, 0, 0], [.1, .83, 5.19], [.25, 2.56, 5.67], [.5, 5.92, 5.1], [.75, 8.02, 4.19], [1, 8.96, 3.41], [1.25, 9.65, 2.98], [1.5, 10.29, 2.52], [2, 11.23, 2.23], [2.5, 11.81, 1.87], [3, 12, 1.86], [4, 12.13, 1.74], [6, 12.19, 1.86], [9, 12.38, 1.76], [12, 12.42, 1.76], [16, 12.52, 1.72], [20, 12.54, 1.69], [23, 12.54, 1.64], [25, 12.81, .937], [26, 13.15, .49], [27, 13.78, .189], [28, 14.5, .0639], [29, 14.93, .0122], [30, 0, 0]],
  lf = (Math.max(...hf.map(item => item[1])), 0),
  Cf = {
    radius: 0,
    density: 0
  };
function Hf(A) {
  if (Cf.radius = 0, Cf.density = 0, !(A > 0) || A >= 30) return Cf;
  for (let t = 1; t < hf.length; t++) {
    const [s, n, e] = hf[t];
    if (A <= s) {
      const [B, o, i] = hf[t - 1],
        r = (A - B) / (s - B);
      Cf.radius = o + (n - o) * r, Cf.density = i + (e - i) * r;
      break;
    }
  }
  return Cf;
}
function uf(A, t, s) {
  const n = s * s;
  return s * (A * A - 2 * A / (3 * t) * n + n * n / (5 * t * t));
}
function Ef(A, t, s, n, e) {
  if (!(n > 0 && e > 0)) return 0;
  const B = t.x - A.x,
    o = t.y - A.y,
    i = t.z - A.z,
    r = Math.sqrt(B * B + o * o + i * i),
    w = s.x - A.x,
    f = s.y - A.y,
    a = s.z - A.z,
    g = w * w + f * f + a * a,
    c = r > 1e-9 ? (w * B + f * o + a * i) / r : 0,
    Q = n * n,
    h = Math.max(0, g - c * c);
  if (h >= Q) return 0;
  const l = Math.sqrt(Q - h),
    C = Math.max(0, c - l) - c,
    H = Math.min(r, c + l) - c;
  if (H <= C) return 0;
  const u = 1 - h / Q;
  return e * (uf(u, Q, H) - uf(u, Q, C));
}
function Ff(A) {
  return A <= .5 ? 0 : A >= .8 ? 1 : (A - .5) / .30000000000000004;
}
var Df = class {
    clouds = [];
    add(A, t) {
      this.prune(t), this.clouds.push({
        x: A[0],
        y: A[1] + lf,
        z: A[2],
        at: t,
        until: t + 30
      });
    }
    any(A) {
      return this.prune(A), this.clouds.length > 0;
    }
    transmittance(A, t, s) {
      let n = 0;
      for (const e of this.clouds) {
        const B = Hf(s - e.at);
        n += Ef(A, t, e, B.radius, B.density);
      }
      return n > 0 ? Math.exp(-n) : 1;
    }
    blocks(A, t, s) {
      return this.transmittance(A, t, s) < .5;
    }
    clear() {
      this.clouds.length = 0;
    }
    prune(A) {
      this.clouds.some(item => item.until <= A) && (this.clouds = this.clouds.filter(item => item.until > A));
    }
  },
  Pf = {
    x: 0,
    y: 0,
    z: 0
  },
  df = {
    x: 0,
    y: 0,
    z: 0
  },
  Mf = new class {
    clouds = null;
    clock = () => performance.now() / 1e3;
    objects = [];
    bases = [];
    sorted = !1;
    active = !1;
    add(A, t) {
      const s = this.objects.indexOf(A);
      s >= 0 ? this.bases[s] = t : (this.objects.push(A), this.bases.push(t)), A.renderOrder = t;
    }
    remove(A) {
      const t = this.objects.indexOf(A);
      if (t < 0) return;
      A.renderOrder = this.bases[t];
      const s = this.objects.length - 1;
      this.objects[t] = this.objects[s], this.bases[t] = this.bases[s], this.objects.pop(), this.bases.pop();
    }
    front(A, t, s) {
      return !(!this.active || !this.clouds) && (df.x = A, df.y = t, df.z = s, this.clouds.transmittance(Pf, df, this.clock()) >= .5);
    }
    update(A) {
      const t = this.clock();
      if (this.active = !!this.clouds?.any(t), !this.active && !this.sorted) return;
      const s = A.matrixWorld.elements;
      Pf.x = s[12], Pf.y = s[13], Pf.z = s[14];
      const n = this.objects;
      for (let e = 0; e < n.length; e++) {
        const A = n[e],
          t = this.bases[e];
        if (!this.active || !A.visible) {
          A.renderOrder = t;
          continue;
        }
        const s = A.matrixWorld.elements;
        A.renderOrder = this.front(s[12], s[13], s[14]) ? t + 5 : t;
      }
      this.sorted = this.active;
    }
    get size() {
      return this.objects.length;
    }
  }(),
  kf = {
    _doc: ['GENERATED by tools/hat-fit.ts --write (FB26, docs/re/SKINS.md "Hüte auf allen Köpfen (FB26)").', "bodies: the bone each body's head is skinned to (the dominant bone of its topmost vertex in", "rig/player.json + the body meshes): the head slot hangs there at HEAD_TEMPLATE's rest offset.", "fits: hat item index -> body -> the hat scaled about the slot's origin and moved, the least", "change (tools/hat-fit-lib.ts solveFit) that leaves no head point of the body standing out of", "the hat in the rest pose, at pitch 0 / +90 / -90 and in the worst frame of every emote.", "An original hat on the cube (male, female) never gets a fit: the original pairs stay."],
    bodies: [{
      key: "male",
      renderer: "MaleCharacter",
      bone: "Neck"
    }, {
      key: "female",
      renderer: "FemaleCharacter",
      bone: "Neck"
    }, {
      key: "rtx",
      renderer: "RTXCharacter",
      bone: "Neck"
    }, {
      key: "egg",
      renderer: "EggCharacter",
      bone: "Hips"
    }, {
      key: "body-1038",
      renderer: "MaleCharacter",
      mesh: "custom-body-1038",
      bone: "Head"
    }],
    fits: {
      0: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      1: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      2: {
        "body-1038": {
          position: [0, 0, -.2],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, .802, .2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .1],
          scale: [1, 1, 1]
        }
      },
      3: {
        "body-1038": {
          position: [0, 0, -.2],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, .802, .2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .1],
          scale: [1, 1, 1]
        }
      },
      4: {
        "body-1038": {
          position: [0, 0, .3],
          scale: [1.2, 1.2, 1.2]
        },
        egg: {
          position: [0, 1.637, -.1],
          scale: [1, 1, 1]
        }
      },
      5: {
        "body-1038": {
          position: [0, 0, .3],
          scale: [1.2, 1.2, 1.2]
        },
        egg: {
          position: [0, 1.637, -.1],
          scale: [1, 1, 1]
        }
      },
      6: {
        "body-1038": {
          position: [0, 0, -.4],
          scale: [1.08, 1.08, 1.08]
        },
        egg: {
          position: [0, .595, .1],
          scale: [1, 1, 1]
        }
      },
      7: {
        "body-1038": {
          position: [0, 0, -.4],
          scale: [1.08, 1.08, 1.08]
        },
        egg: {
          position: [0, .595, .1],
          scale: [1, 1, 1]
        }
      },
      8: {
        "body-1038": {
          position: [0, .078, -.3],
          scale: [1.08, 1.08, 1.08]
        },
        egg: {
          position: [0, .726, .7],
          scale: [1, 1, 1]
        }
      },
      9: {
        "body-1038": {
          position: [0, .078, -.3],
          scale: [1.08, 1.08, 1.08]
        },
        egg: {
          position: [0, .726, .7],
          scale: [1, 1, 1]
        }
      },
      10: {
        egg: {
          position: [0, .125, 0],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .031, 0],
          scale: [1, 1, 1]
        }
      },
      11: {
        "body-1038": {
          position: [0, .604, -.4],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .734, 0],
          scale: [1, 1, 1]
        }
      },
      12: {
        "body-1038": {
          position: [0, 0, -.3],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, 2.695, .3],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .3],
          scale: [1.12, 1.12, 1.12]
        }
      },
      13: {
        "body-1038": {
          position: [0, 0, .5],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, .795, .2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .063, 0],
          scale: [1, 1, 1]
        }
      },
      14: {
        "body-1038": {
          position: [0, 0, .4],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.431, -.2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.06, 0],
          scale: [1, 1, 1]
        }
      },
      15: {
        "body-1038": {
          position: [0, 0, .2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .117, .1],
          scale: [1, 1, 1]
        }
      },
      16: {
        "body-1038": {
          position: [0, .346, .2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .293, -.1],
          scale: [1, 1, 1]
        }
      },
      17: {
        "body-1038": {
          position: [0, 0, -.3],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .547, -.2],
          scale: [1, 1, 1]
        }
      },
      18: {
        "body-1038": {
          position: [0, .532, -.2],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .677, .1],
          scale: [1, 1, 1]
        }
      },
      19: {
        "body-1038": {
          position: [0, .193, .5],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, .762, .1],
          scale: [1, 1, 1]
        }
      },
      20: {
        "body-1038": {
          position: [0, .363, .1],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .266, 0],
          scale: [1, 1, 1]
        }
      },
      21: {
        "body-1038": {
          position: [0, .469, 0],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .313, 0],
          scale: [1, 1, 1]
        }
      },
      22: {
        "body-1038": {
          position: [0, .026, .5],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, .891, 0],
          scale: [1, 1, 1]
        }
      },
      23: {
        "body-1038": {
          position: [0, .346, -.2],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .469, 0],
          scale: [1, 1, 1]
        }
      },
      24: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      25: {
        "body-1038": {
          position: [0, .302, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.837, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .3],
          scale: [1.12, 1.12, 1.12]
        }
      },
      26: {
        "body-1038": {
          position: [0, .302, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.837, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .3],
          scale: [1.12, 1.12, 1.12]
        }
      },
      27: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      28: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      29: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      30: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      31: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      32: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      33: {
        "body-1038": {
          position: [0, .167, -.3],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, 1.745, .6],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.06, .2],
          scale: [1, 1, 1]
        }
      },
      34: {
        "body-1038": {
          position: [0, .167, -.3],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, 1.745, .6],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.06, .2],
          scale: [1, 1, 1]
        }
      },
      35: {
        "body-1038": {
          position: [0, .361, -.3],
          scale: [1.04, 1.04, 1.04]
        },
        egg: {
          position: [0, 2.777, -.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .271, .2],
          scale: [1.12, 1.12, 1.12]
        }
      },
      36: {
        "body-1038": {
          position: [0, .813, 0],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .775, .2],
          scale: [1, 1, 1]
        }
      },
      37: {
        "body-1038": {
          position: [0, .235, .4],
          scale: [1.08, 1.08, 1.08]
        },
        egg: {
          position: [0, 2.356, .2],
          scale: [1, 1, 1]
        }
      },
      38: {
        "body-1038": {
          position: [0, .374, -.3],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .893, .2],
          scale: [1, 1, 1]
        }
      },
      39: {
        "body-1038": {
          position: [0, 0, .1],
          scale: [1.08, 1.08, 1.08]
        },
        egg: {
          position: [0, 1.975, .7],
          scale: [1, 1, 1]
        }
      },
      40: {
        "body-1038": {
          position: [0, 0, .1],
          scale: [1.08, 1.08, 1.08]
        },
        egg: {
          position: [0, 1.975, .7],
          scale: [1, 1, 1]
        }
      },
      41: {
        "body-1038": {
          position: [0, 0, -.3],
          scale: [1.25, 1.25, 1.25]
        },
        egg: {
          position: [0, 1.407, -.4],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .096, .1],
          scale: [1, 1, 1]
        }
      },
      42: {
        "body-1038": {
          position: [0, .706, -.2],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .703, 0],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .1],
          scale: [1.04, 1.04, 1.04]
        }
      },
      43: {
        "body-1038": {
          position: [0, 0, .4],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, 2.265, .8],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .1],
          scale: [1, 1, 1]
        }
      },
      44: {
        "body-1038": {
          position: [0, -.28, -.3],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, 2.48, .1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .2],
          scale: [1.08, 1.08, 1.08]
        }
      },
      45: {
        "body-1038": {
          position: [0, 0, .2],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, 2.431, 1.1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.04, 0],
          scale: [1, 1, 1]
        }
      },
      46: {
        "body-1038": {
          position: [0, -.28, -.3],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, 2.48, .1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .2],
          scale: [1.08, 1.08, 1.08]
        }
      },
      47: {
        "body-1038": {
          position: [0, .067, .4],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, 2.191, -.4],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.02, 0],
          scale: [1, 1, 1]
        }
      },
      48: {
        "body-1038": {
          position: [0, .454, .1],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .579, -.2],
          scale: [1, 1, 1]
        }
      },
      49: {
        "body-1038": {
          position: [0, -.14, .1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.18, .4],
          scale: [1, 1, 1]
        }
      },
      50: {
        "body-1038": {
          position: [0, -.14, .1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.18, .4],
          scale: [1, 1, 1]
        }
      },
      51: {
        "body-1038": {
          position: [0, -.14, .1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.18, .4],
          scale: [1, 1, 1]
        }
      },
      52: {
        "body-1038": {
          position: [0, .692, -.4],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .491, .1],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .5],
          scale: [1, 1, 1]
        }
      },
      53: {
        "body-1038": {
          position: [0, -.04, .1],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .528, -.1],
          scale: [1, 1, 1]
        }
      },
      55: {
        "body-1038": {
          position: [0, .198, .3],
          scale: [1.12, 1.12, 1.12]
        },
        egg: {
          position: [0, 1.623, -.2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .1],
          scale: [1.04, 1.04, 1.04]
        }
      },
      1e3: {
        "body-1038": {
          position: [0, .411, .6],
          scale: [1.04, 1.04, 1.04]
        },
        rtx: {
          position: [0, -.14, .3],
          scale: [1, 1, 1]
        }
      },
      1001: {
        "body-1038": {
          position: [0, .411, .6],
          scale: [1.04, 1.04, 1.04]
        },
        rtx: {
          position: [0, -.14, .3],
          scale: [1, 1, 1]
        }
      },
      1003: {
        "body-1038": {
          position: [0, .148, .3],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, 1.533, .3],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, -.1],
          scale: [1, 1, 1]
        }
      },
      1004: {
        "body-1038": {
          position: [0, .608, -.1],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, 2.553, .1],
          scale: [1, 1, 1]
        },
        female: {
          position: [0, .011, .2],
          scale: [1, 1, 1]
        },
        male: {
          position: [0, .011, .2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, -.06, .4],
          scale: [1.08, 1.08, 1.08]
        }
      },
      1005: {
        "body-1038": {
          position: [0, .469, 0],
          scale: [1, 1, 1]
        }
      },
      1006: {
        "body-1038": {
          position: [0, -.04, -.1],
          scale: [1, 1, 1]
        },
        egg: {
          position: [0, .549, .3],
          scale: [1, 1, 1]
        },
        female: {
          position: [0, -.26, 0],
          scale: [1, 1, 1]
        },
        male: {
          position: [0, -.26, 0],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, .129, .1],
          scale: [1, 1, 1]
        }
      },
      1007: {
        "body-1038": {
          position: [0, 0, -.1],
          scale: [1.25, 1.25, 1.25]
        },
        egg: {
          position: [0, 1.703, 0],
          scale: [1, 1, 1]
        },
        female: {
          position: [0, .14, .2],
          scale: [1, 1, 1]
        },
        male: {
          position: [0, .14, .2],
          scale: [1, 1, 1]
        },
        rtx: {
          position: [0, 0, .4],
          scale: [1.04, 1.04, 1.04]
        }
      }
    }
  },
  bf = ["male", "female", "rtx", "egg"];
function If(A) {
  return kf.bodies.find(item => item.key === A)?.bone ?? "Head";
}
function Gf(A, t) {
  return A < 0 ? null : kf.fits[String(A)]?.[t] ?? null;
}
kf.bodies;
var Uf = A => A ? `${A.position.join(",")}/${A.scale.join(",")}` : "";
function vf(A, t = new Matrix4()) {
  return A ? t.compose(new Vector3(...A.position), new Quaternion(), new Vector3(...A.scale)) : t.identity();
}
var pf = null;
function mf() {
  return pf ??= NA("index.json").then(de).then(result => function (A, t = n) {
    for (const [s, n] of Object.entries(t)) {
      const t = o[s];
      if (!t) continue;
      const e = A.weapons[l.weapons[t.base].index];
      e && (A.weapons[t.index] = {
        ...e,
        index: t.index,
        name: t.name,
        file: n.file
      });
    }
    return A;
  }(result));
}
var Yf = new Map();
function Tf(A, t) {
  const s = `${A}/${t}`;
  let n = Yf.get(s);
  if (!n) {
    const e = KA(`../skins/${A}/${t}.png`).then(result => result).catch(() => null);
    n = e, Yf.set(s, e), e.then(result => {
      result || Yf.get(s) !== e || Yf.delete(s);
    });
  }
  return n;
}
function Lf(A) {
  const uniqueItems = new Set(),
    s = Fe(A),
    n = s ? A.nodes.indexOf(s.node) : -1;
  n >= 0 && uniqueItems.add(n);
  for (const r of A.data.behaviours) "MuzzleFlash" === r.script && uniqueItems.add(r.node);
  for (const r of A.data.components) "ParticleSystem" === r.type && "number" == typeof r.node && uniqueItems.add(r.node);
  const e = lr(A);
  e >= 0 && uniqueItems.add(e);
  const B = A.node("hammer_end") ?? A.node("hammer"),
    o = B ? A.nodes.indexOf(B) : -1;
  o >= 0 && uniqueItems.add(o);
  const i = Qi.of(A);
  return i && (uniqueItems.add(i.$_2lp), i.$_6z1 >= 0 && uniqueItems.add(i.$_6z1)), uniqueItems;
}
var Jf = {
    Knife: A => A.includes("Butterfly") ? {
      position: [-1.46, 1.05, -1.23]
    } : A.includes("Karambit") ? {
      position: [-.269, -.418, 2.751],
      euler: [20.963, 168.55, 144.83]
    } : {
      position: [-.12, -.03, 1.48]
    },
    Grenade: () => ({
      position: [.64, 1.43, -.25]
    }),
    Bomb: () => ({
      position: [-.16, .28, .15]
    })
  },
  Rf = new Euler(),
  Of = new Sphere(),
  Vf = new Matrix4(),
  yf = /finger|thumb/i,
  jf = class extends Group {
    culled = !1;
    updateMatrixWorld(A) {
      if (!this.culled) return super.updateMatrixWorld(A);
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || A) && (this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1);
    }
  },
  xf = class {
    frustum = new Frustum();
    eye = new Vector3();
    near = 0;
    screen = 0;
    pixels = 0;
    set(A) {
      A.updateMatrixWorld(), this.frustum.setFromProjectionMatrix(Vf.multiplyMatrices(A.projectionMatrix, A.matrixWorldInverse)), this.eye.setFromMatrixPosition(A.matrixWorld), this.pixels = this.screen * A.projectionMatrix.elements[5] / 2;
    }
    lod(A, t = 1) {
      if (this.pixels <= 0) return 0;
      const s = Math.max(.01, this.eye.distanceTo(A)),
        n = Wf * t * this.pixels / s;
      return n < 60 ? 2 : n < 160 ? 1 : 0;
    }
    sees(A, t = 1) {
      return Of.center.set(A.x, A.y + zf * t, A.z), Of.radius = Xf * t, this.$_tpc();
    }
    sphere(A, t, s, n) {
      return Of.center.set(A, t, s), Of.radius = n, this.$_tpc();
    }
    $_tpc() {
      return !!this.frustum.intersectsSphere(Of) || this.near > 0 && this.eye.distanceToSquared(Of.center) < this.near ** 2;
    }
  },
  zf = 1.5,
  Xf = 4,
  Wf = 1.9,
  Sf = null,
  Zf = 3e3,
  Nf = class A {
    rig;
    index;
    lobby;
    object;
    $_4qu;
    weaponsParent;
    weapon = null;
    twin = null;
    $_40a = null;
    $_2v8;
    shoulderR = null;
    side = 1;
    $_5qo = [];
    weaponIndex = -1;
    weaponSkin = -1;
    $_39lf = -167.244;
    $_7s3 = 0;
    $_6u9i = 0;
    $_qgv = 0;
    wasGrounded = !0;
    $_qkm = !1;
    $_350;
    $_3ji = 0;
    held = new Map();
    $_6ge = new Map();
    $_288 = "";
    staged = !1;
    $_xa8 = null;
    dancing = !1;
    hold = null;
    $_12h = null;
    $_3ml = "lobby";
    $_71v = 0;
    lobbyAnimator;
    $_2n4g;
    $_7aqp;
    melee = !1;
    $_2lz = new eB();
    fists = !1;
    $_323;
    $_1jj = null;
    $_4oi = null;
    $_31s;
    $_5xd;
    $_3c2 = new qi();
    $_4g0 = "";
    reloadUntil = 0;
    $_5p9 = 0;
    fingers = new Set();
    $_6rk = 0;
    $_2apc = 0;
    $_6mv = !1;
    $_28xp(A) {
      if (A === this.$_6mv) return;
      this.$_6mv = A;
      const t = this.rig.nodes;
      for (let s = 0; s < t.length; s++) t[s].matrixAutoUpdate = !A;
    }
    $_4nh() {
      this.$_28xp(!1);
    }
    constructor(A, t, s) {
      this.rig = A, this.index = t, this.lobby = s, this.object = A.object, this.$_4qu = new vr(A.object, A.node("Spine_03"), t => A.node(t)), this.weaponsParent = A.node("weaponsParent");
      const n = A.node("Hand_L");
      n && (this.$_40a = new Group(), this.$_40a.position.copy(this.weaponsParent.position).negate(), this.$_40a.quaternion.copy(this.weaponsParent.quaternion), this.$_40a.scale.copy(this.weaponsParent.scale).negate(), n.add(this.$_40a), this.shoulderR = A.node("Shoulder_R") ?? null), A.data.nodes.forEach((node, index) => yf.test(node.name) && this.fingers.add(index)), this.$_2n4g = new dB(A.object, t => A.node(t)), this.$_7aqp = new ci(A.object, t => A.node(t)), this.$_323 = new BB(A.object, t => A.node(t));
      const e = A.animators[0],
        lookupMap = new Map();
      A.data.nodes.forEach((node, index) => {
        const n = e?.$_36i?.(index);
        void 0 === n || lookupMap.has(n) || lookupMap.set(n, A.nodes[index]);
      }), this.$_31s = new Hr(A.object, t => A.node(t), A => lookupMap.get(A)), this.$_5xd = new Lw(A.object, t => A.node(t), this.$_31s.guard), this.$_2v8 = new ff(A.object, t => A.node(t), this.$_31s.guard), this.$_1jj = A.node("Spine_02") ?? null, this.$_4oi = A.node("Spine_01") ?? null, this.lobbyAnimator = A.animators[0];
      for (let i = 0; i < 4; i++) {
        const A = this.bodyMesh(i);
        A && Jr(A);
      }
      this.$_1ap = new Qf(A.node("Character_Dummy_Male_01") ?? null);
      const o = t.materials[t.skins.defaultMaterial];
      this.$_350 = pA(FA({
        color: o?.color ?? [1, 1, 1, 1],
        metallic: o?.metallic ?? 0,
        smoothness: o?.smoothness ?? 0
      }));
    }
    get animator() {
      return this.rig.animators[0];
    }
    static async create(t = "player", s = 0, n = -1) {
      const e = await mf();
      "player" === t && (Oi.loading ??= async function (A = A => fetch(`${Ri}${A}.bin`).then(result => {
        if (!result.ok) throw new Error(`Missing clip ${A}`);
        return result.arrayBuffer().then(VA);
      }), t) {
        const s = {};
        try {
          const n = t ?? (await wA(`${Ri}clips.json`).then(result => result.ok ? result.json() : null));
          for (const t of Ji) {
            const e = n?.roles?.[t];
            if (e && /^[\w-]+$/.test(e)) try {
              s[t] = await A(e);
            } catch (ke) {
              console.warn(`Third-person clip ${e}: ${ke.message}`);
            }
          }
        } catch {}
        return s;
      }().then(result => Oi.clips = result), Oi.loading);
      const B = await jA(e.prefabs[t]),
        o = new A(B, e, "lobby" === t);
      return await o.setSkin(s, n).catch(error => {
        if (!o.$_1j1) throw error;
        console.warn("a character was built with a stand-in look", error);
      }), o;
    }
    $_5s5r = !0;
    skin = -1;
    hat = -99;
    get look() {
      return {
        skin: Math.max(0, this.skin),
        hat: this.hat < -1 && -3 !== this.hat ? -1 : this.hat
      };
    }
    $_47ko(A) {
      this.$_6sev = !A;
      for (const t of this.$_5qo) t.visible = this.$_7ffb();
      this.$_7aqp.shown = this.$_7ffb();
    }
    $_6sev = !1;
    $_7ffb() {
      return !this.dancing && !this.$_6sev;
    }
    $_4i0 = 0;
    $_6n2e = [];
    async setSkin(A, t = -1) {
      const s = this.$_4i0;
      try {
        if (this.$_1j1 = "", await this.$_xnz(A, t), this.$_1j1 && this.$_4i0 === s + 1) throw new Error(this.$_1j1);
      } catch (ke) {
        throw this.$_4i0 === s + 1 && (this.skin = -1, this.hat = -99), ke;
      }
    }
    $_1j1 = "";
    async $_xnz(A, t) {
      const s = this.index.skins;
      if ((A < 0 || A >= s.data.length) && (A = 0), A === this.skin && t === this.hat) return;
      const n = A !== this.skin;
      this.skin = A, this.hat = t;
      const e = ++this.$_4i0,
        B = s.data[A],
        o = this.index.materials[s.transparentMaterial],
        i = this.$_350,
        r = !(!B.useTransparentMaterial || !o);
      i.transparent = r, i.depthWrite = !0, i.allowOverride = !r, i.uniforms.uColor.value.w = r ? o.color[3] : 1, i.needsUpdate = !0, ln([i], A);
      for (const l of this.$_6n2e) Mf.remove(l);
      this.$_6n2e.length = 0;
      const w = s.bodyMeshes?.[String(A)] ?? null,
        f = w ? await WA(w).catch(() => null) : null;
      if (e !== this.$_4i0) return;
      this.$_2co(B.meshIndex, f?.geometry ?? null), this.$_63n = function (A, t, s) {
        return s ? `body-${A}` : bf[t] ?? "male";
      }(A, B.meshIndex, !!w), this.$_5hh = If(this.$_63n), ["MaleCharacter", "FemaleCharacter", "RTXCharacter", "EggCharacter"].forEach((item, index) => {
        const s = this.rig.index(item);
        s < 0 || (this.rig.setActive(s, index === B.meshIndex), this.rig.data.renderers.forEach((_item3, _index) => {
          const e = this.rig.meshes[_index];
          _item3.node === s && e && (e.material = i, r && index === B.meshIndex && (Mf.add(e, 0), this.$_6n2e.push(e)));
        }));
      });
      const a = this.$_3w2p(A, t, B.useHatIndex);
      n && (this.$_2zd = -2 === B.useBodyAttachmentIndex ? null : {
        mesh: s.attachmentMeshes[String(-1 === B.useBodyAttachmentIndex ? A : B.useBodyAttachmentIndex)],
        texture: Tf("body-attachments", A)
      });
      const g = this.$_2zd;
      let c = await Tf("body", A);
      const Q = !c && 0 !== A;
      if (Q && (c = await Tf("body", 0)), Q && (s.textures.body.includes(String(A)) || BA(A)) && (this.$_1j1 = `the body texture of skin ${A} did not load`), this.staged && (await mA(c, this.$_xa8)), e !== this.$_4i0) return;
      if (LA(i, c), await this.$_2n4(B.meshIndex, e), e !== this.$_4i0) return;
      if (!r && c && (await this.$_us2(e, B.meshIndex, c, a, g))) return;
      if (e !== this.$_4i0) return;
      const h = this.$_4gu();
      await Promise.all([this.$_3tb("HEAD_TEMPLATE", a, e), n || h ? this.$_3tb("BODY_TEMPLATE", g, e) : null]);
    }
    merged = null;
    $_smm = [];
    $_3t7 = 0;
    $_2zd = null;
    $_63n = "male";
    $_5hh = "Head";
    $_6oh = new Map();
    $_16p(A = this.$_5hh) {
      const t = this.rig.node("HEAD_TEMPLATE");
      if (!t || "Head" === A) return t;
      let s = this.$_6oh.get(A);
      if (s) return s;
      const n = this.rig.node(A),
        e = this.rig.index(A),
        B = this.rig.index("HEAD_TEMPLATE");
      if (!n || e < 0 || B < 0) return t;
      s = new Object3D(), s.name = `HEAD_SLOT_${A}`;
      try {
        (function (A, t, s) {
          const n = new Matrix4(),
            e = new Matrix4(),
            B = new Vector3(),
            o = new Quaternion(),
            i = new Vector3();
          for (let r = s; r !== t; r = A[r].parent) {
            if (r < 0) throw new Error(`node ${t} is not above ${s}`);
            const w = A[r];
            n.premultiply(e.compose(B.fromArray(w.t), o.fromArray(w.r), i.fromArray(w.s)));
          }
          return n;
        })(this.rig.data.nodes, e, B).decompose(s.position, s.quaternion, s.scale);
      } catch {
        return t;
      }
      return s.updateMatrix(), s.matrixAutoUpdate = !1, n.add(s), this.$_6oh.set(A, s), s;
    }
    get $_3qm() {
      return this.index.skins.data[Math.max(0, this.skin)]?.meshIndex ?? 0;
    }
    get $_686j() {
      return !!this.index.skins.bodyMeshes?.[String(this.skin)];
    }
    get $_q3t() {
      return If(this.$_63n);
    }
    $_1y7() {
      const A = this.rig.node("HEAD_TEMPLATE");
      return [...(A ? [A] : []), ...this.$_6oh.values()];
    }
    $_7e9 = new Map();
    $_2co(A, t) {
      for (const [n, e] of this.$_7e9) {
        const s = this.bodyMesh(n);
        !s || n === A && t || (s.geometry = e), n === A && t || this.$_7e9.delete(n);
      }
      if (!t) return;
      const s = this.bodyMesh(A);
      s && (this.$_7e9.has(A) || this.$_7e9.set(A, s.geometry), s.geometry = t);
    }
    bodyMesh(A) {
      const t = ["MaleCharacter", "FemaleCharacter", "RTXCharacter", "EggCharacter"][A],
        s = t ? this.rig.index(t) : -1;
      if (s < 0) return null;
      const n = this.rig.data.renderers.findIndex(item => item.node === s),
        e = n >= 0 ? this.rig.meshes[n] : null;
      return e && e.isSkinnedMesh ? e : null;
    }
    $_3ih(A, t) {
      const s = new Matrix4(),
        n = new Matrix4();
      for (let e = A; e; e = e.parent) {
        const B = t.bones.indexOf(e);
        if (B >= 0 && e !== A) return {
          bone: B,
          local: s
        };
        const o = e.userData?.rigIndex;
        if ("number" == typeof o && this.animator.$_2q5(o)) return null;
        s.premultiply(n.compose(e.position, e.quaternion, e.scale));
      }
      return null;
    }
    async $_us2(A, t, s, n, e) {
      if (!this.$_5s5r) return !1;
      if (Cn(this.skin)) return !1;
      const B = this.bodyMesh(t);
      if (!B?.parent) return !1;
      const o = [{
          template: "HEAD_TEMPLATE",
          node: this.$_16p(),
          part: n
        }, {
          template: "BODY_TEMPLATE",
          node: this.rig.node("BODY_TEMPLATE"),
          part: e
        }],
        i = await Promise.all(o.map(async ({
          part: A
        }) => A?.mesh ? Promise.all([WA(A.mesh), A.texture]) : null));
      if (A !== this.$_4i0) return !0;
      const r = [];
      for (let c = 0; c < o.length; c++) {
        const A = i[c];
        if (!A) continue;
        const [t, s] = A,
          n = o[c].node;
        if (!s || !n) return !1;
        const e = this.$_3ih(n, B.skeleton);
        if (!e) return !1;
        const w = o[c].part.fit ?? null;
        r.push({
          key: `${o[c].part.mesh}${w ? `~${Uf(w)}` : ""}`,
          geometry: t.geometry,
          texture: s,
          local: w ? e.local.multiply(vf(w)) : e.local,
          bone: e.bone,
          trunk: "BODY_TEMPLATE" === o[c].template ? Rr(B.skeleton) : null
        });
      }
      const w = hn(this.skin);
      if (r.length && w && Qn.has(w)) return !1;
      const f = function (A, t, s, n, e) {
        if ("undefined" == typeof document) return null;
        const B = [s, ...e.map(item => item.texture)],
          o = B.map(fw);
        if (o.some(item => !item)) return null;
        const i = o.map(item => ({
          w: item.width,
          h: item.height
        }));
        if (!gw(t, i[0].w, i[0].h)) return null;
        for (let l = 0; l < e.length; l++) if (!gw(e[l].geometry, i[l + 1].w, i[l + 1].h)) return null;
        for (const l of ["position", "normal", "uv", "skinIndex", "skinWeight"]) if (!t.getAttribute(l)) return null;
        const r = function (A) {
            const [t, ...s] = A,
              n = [{
                x: 1,
                y: 1,
                w: t.w,
                h: t.h
              }];
            let e = 0,
              B = 0;
            for (const o of s) n.push({
              x: t.w + 2 + 1,
              y: e + 1,
              w: o.w,
              h: o.h
            }), e += o.h + 2, B = Math.max(B, o.w + 2);
            return {
              width: t.w + 2 + B,
              height: Math.max(t.h + 2, e),
              rects: n
            };
          }(i),
          w = B.map(item => item.uuid).join("|"),
          f = `${A}|${e.map(item => `${item.key}@${item.bone}${item.trunk ? "~trunk" : ""}`).join("|")}|${r.width}x${r.height}|${i.map(item => `${item.w}x${item.h}`).join(",")}`;
        let a = rw.get(w);
        if (!a) {
          const A = new CanvasTexture(function (A, t) {
            const element = document.createElement("canvas");
            element.width = t.width, element.height = t.height;
            const drawingContext = element.getContext("2d");
            return drawingContext.imageSmoothingEnabled = !1, A.forEach((item, index) => {
              const e = t.rects[index];
              drawingContext.save(), drawingContext.beginPath(), drawingContext.rect(e.x - 1, e.y - 1, e.w + 2, e.h + 2), drawingContext.clip();
              for (let t = -1; t <= 1; t++) for (let s = -1; s <= 1; s++) drawingContext.drawImage(item, e.x + s * e.w, e.y + t * e.h, e.w, e.h);
              drawingContext.restore();
            }), element;
          }(o, r));
          A.name = "body-atlas", A.colorSpace = s.colorSpace, A.flipY = !0;
          const t = 1 === OA(i[0].w, i[0].h)[1];
          A.generateMipmaps = t, A.magFilter = NearestFilter, A.minFilter = t ? NearestMipmapNearestFilter : NearestFilter, A.wrapS = A.wrapT = ClampToEdgeWrapping, a = {
            value: A,
            users: 0
          }, rw.set(w, a);
        }
        let g = ww.get(f);
        g || (g = {
          value: cw(t, n, e, r),
          users: 0
        }, ww.set(f, g)), a.users++, g.users++;
        let c = !1;
        const Q = a,
          h = g;
        return {
          geometry: h.value,
          atlas: Q.value,
          release() {
            c || (c = !0, --Q.users <= 0 && (rw.delete(w), Q.value.dispose()), --h.users <= 0 && (ww.delete(f), h.value.dispose()));
          }
        };
      }(`${t}:${B.geometry.uuid}`, B.geometry, s, B.skeleton.boneInverses, r);
      if (!f) return !1;
      let a = this.$_smm[this.$_3t7];
      a || (a = pA(FA({
        color: [1, 1, 1, 1],
        smoothness: 0,
        metallic: 0
      })), this.$_smm[this.$_3t7] = a), this.$_3t7 ^= 1, LA(a, f.atlas), ln([a], this.skin);
      const g = new SkinnedMesh(f.geometry, a);
      if (g.bind(B.skeleton, B.bindMatrix), g.frustumCulled = !1, g.name = "body-batch", g.userData.skinPart = !0, this.staged) {
        if (await vA(g, !1, this.$_xa8), A !== this.$_4i0) return f.release(), !0;
      } else MA(g);
      this.$_4gu();
      for (const c of [...this.$_1y7(), this.rig.node("BODY_TEMPLATE")]) if (c) {
        for (const A of [...c.children]) A.userData.skinPart && c.remove(A);
        this.rig.data.renderers.forEach((item, index) => {
          this.rig.nodes[item.node] === c && this.rig.meshes[index] && (this.rig.meshes[index].visible = !1);
        });
      }
      return B.visible = !1, B.parent.add(g), this.merged = {
        mesh: g,
        body: B,
        release: f.release
      }, !0;
    }
    $_164 = null;
    $_686 = !1;
    async $_2n4(A, t) {
      const s = Cn(this.skin),
        n = s ? this.bodyMesh(A) : null,
        e = this.$_164;
      if (e && n && s && e.parent === n && e.geometry === Dn(n.geometry) && e.material === En(s)) return;
      const B = n && s ? Pn(n, s) : null;
      if (B) if (B.visible = !this.$_686, this.staged) {
        if (await vA(B, !1, this.$_xa8), t !== this.$_4i0) return;
      } else MA(B);
      e?.removeFromParent(), this.$_164 = B, B && n.add(B);
    }
    $_3le(A) {
      this.$_686 = !A, this.object.traverse(t => {
        t.userData.skinOutline && (t.visible = A);
      });
    }
    $_4gu() {
      const A = this.merged;
      return !!A && (this.merged = null, A.mesh.removeFromParent(), A.body.visible = !0, A.release(), !0);
    }
    $_3w2p(A, t, s) {
      const n = this.index.skins;
      if (-3 === t) return null;
      const e = t >= 0 ? nA(t) : null;
      if (e) {
        const A = /^characters\/meshes\/head\/(\d+)$/.exec(e.meshPath),
          s = /^hats\/mesh\/(\d+)$/.exec(e.meshPath);
        return {
          mesh: (A ? n.headMeshes[A[1]] : s ? n.hatMeshes?.[s[1]] ?? null : null) ?? null,
          texture: Tf("hats", e.texturePath.replace(/^hats\/texture\//, "")),
          fit: Gf(t, this.$_63n)
        };
      }
      return -2 === s ? null : {
        mesh: n.headMeshes[String(-1 === s ? A : s)] ?? null,
        texture: Tf("head", A)
      };
    }
    async $_3tb(A, t, s) {
      const n = "HEAD_TEMPLATE" === A,
        e = n ? this.$_16p() : this.rig.node(A);
      if (!e) return;
      const [B, o] = t?.mesh ? await Promise.all([WA(t.mesh), t.texture]) : [null, null];
      if (s !== this.$_4i0) return;
      let i = null;
      if (B) {
        const A = pA(FA({
            color: [1, 1, 1, 1],
            map: o,
            smoothness: 0
          })),
          r = n ? null : this.bodyMesh(this.$_3qm),
          w = r ? Rr(r.skeleton) : null,
          f = r && w ? this.$_3ih(e, r.skeleton) : null,
          a = r && w && f ? function (A, t, s, n) {
            const e = `${s.uuid}|${n.bones.join(",")}|${t.elements.map(item => Math.fround(item)).join(",")}`;
            let B = zr.get(A);
            B || zr.set(A, B = new Map());
            const o = B.get(e);
            if (void 0 !== o) return o;
            const i = A.getAttribute("position"),
              r = A.getAttribute("normal"),
              float32Values = new Float32Array(3 * i.count),
              _float32Values6 = new Float32Array(3 * i.count),
              a = new Vector3(),
              g = new Vector3(),
              c = new Matrix3().getNormalMatrix(t);
            for (let l = 0; l < i.count; l++) a.fromBufferAttribute(i, l).applyMatrix4(t), r ? g.fromBufferAttribute(r, l).applyMatrix3(c).normalize() : g.set(0, 1, 0), a.toArray(float32Values, 3 * l), g.toArray(_float32Values6, 3 * l);
            const Q = xr(s, n, float32Values, i.count);
            if (!Q) return B.set(e, null), null;
            const h = new BufferGeometry();
            h.name = "body-attachment-bound", h.setAttribute("position", new BufferAttribute(float32Values, 3)), h.setAttribute("normal", new BufferAttribute(_float32Values6, 3));
            for (const l of Object.keys(A.attributes)) ["position", "normal", "skinIndex", "skinWeight"].includes(l) || h.setAttribute(l, A.attributes[l]);
            h.setIndex(A.getIndex());
            for (const l of A.groups) h.addGroup(l.start, l.count, l.materialIndex);
            return h.setAttribute("skinIndex", new Uint16BufferAttribute(Q.skinIndex, 4)), h.setAttribute("skinWeight", new Float32BufferAttribute(Q.skinWeight, 4)), h.computeBoundingSphere(), B.set(e, h), A.addEventListener("dispose", () => {
              B.delete(e), h.dispose();
            }), h;
          }(B.geometry, r.skeleton.boneInverses[f.bone].clone().invert().multiply(f.local), r.geometry, w) : null;
        if (a && r) {
          const t = new SkinnedMesh(a, A);
          t.bind(r.skeleton, r.bindMatrix), t.frustumCulled = !1, t.name = "body-attachment", i = t;
        } else i = new Mesh(B.geometry, A);
        t?.fit && (i.position.fromArray(t.fit.position), i.scale.fromArray(t.fit.scale)), (!n || this.hat < 0) && ln([i.material], this.skin, !0), i.userData.skinPart = !0;
        const g = Cn(this.skin),
          c = g ? Pn(i, g) : null;
        if (c && (c.visible = !this.$_686, i.add(c)), this.staged) {
          if (await vA(i, !1, this.$_xa8), s !== this.$_4i0) return;
        } else MA(i);
      }
      for (const w of n ? this.$_1y7() : [e]) for (const A of [...w.children]) A.userData.skinPart && w.remove(A);
      const r = this.rig.node(A);
      this.rig.data.renderers.forEach((item, index) => {
        this.rig.nodes[item.node] === r && this.rig.meshes[index] && (this.rig.meshes[index].visible = !1);
      }), i && e.add(i);
    }
    async setWeapon(A, t = -1) {
      if (A === this.weaponIndex && t === this.weaponSkin) return;
      this.weaponIndex = A, this.weaponSkin = t;
      const s = ++this.$_3ji;
      let n;
      try {
        n = await this.heldWeapon(A, t);
      } catch (ke) {
        throw s === this.$_3ji && (this.weaponIndex = -1, this.weaponSkin = -2), ke;
      }
      if (!n || s !== this.$_3ji) return;
      this.$_288 = `${A}:${t}`;
      for (const B of this.$_5qo) B.removeFromParent();
      this.$_bjz && (this.$_bjz.visible = !1, this.$_bjz = null), this.$_5qo = [...n.objects, ...n.twinObjects], this.weapon = n.weapon, this.twin = n.twin, this.side = 1, this.rocket = Qi.of(n.weapon)?.$_4wg() ?? null, this.$_31s.setWeapon(n.stats && !n.stats.flag && !n.twin && n.weaponType <= 1 && n.stats.magazine > 0 ? n.weapon : null, this.rocket?.$_6z1 ?? -1, n.stats ?? null, n.weaponType), this.$_5xd.setWeapon(n.twin ? null : n.weapon, n.stats?.fan?.fireRate ?? 0), this.$_2v8.setWeapon(n.twin ? n.weapon : null, n.twin), this.launcher.equipped(), this.rocket?.set(!0);
      for (const B of n.objects) this.weaponsParent.add(B);
      for (const B of n.twinObjects) this.$_40a.add(B);
      this.fx?.rest(), this.fx = null;
      const e = n.stats;
      this.particles && e && (n.fx || (n.fx = new Pe(this.particles, n.weapon, e.magazine, e.reload, e.fireRate, !0), n.fx.load()), this.fx = n.fx);
      for (const B of this.$_5qo) B.visible = this.$_7ffb();
      this.$_7aqp.shown = this.$_7ffb(), this.$_2n4g.active = !!e?.flag, this.$_7aqp.active = "scythe" === e?.id, this.melee = "Knife" === e?.kind && !e.flag && "scythe" !== e.id, this.fists = this.melee && "fists" === e?.id, this.$_2lz.stop(), this.$_323.stop(), this.lobby ? await this.$_5e4(n.weaponType, n.lobbyAnimation, !!n.twin) : this.animator.play(String(n.weaponType), 1, 0);
    }
    async $_5e4(A, t, s) {
      const n = ++this.$_71v;
      let e = function (A, t, s, n) {
        const e = t || "DefaultRifle",
          B = "DefaultRifle" !== e && n(e);
        return !s && (B || 0 === A && n(e)) ? {
          controller: "lobby",
          state: e,
          pitch: 0,
          turn: 0
        } : (0 !== A || s || (A = 1), {
          controller: "match",
          state: String(A),
          pitch: s ? 44 : SB[A] ?? 0,
          turn: s ? 0 : ZB[A] ?? 0
        });
      }(A, t, s, A => this.lobbyAnimator.hasState(A, 0));
      const B = "match" === e.controller ? await (o = this.index, Sf ??= NA(o.prefabs.player).then(result => {
        const t = result.animators[0]?.controller;
        return t ? ZA(t) : null;
      }).catch(error => (console.warn("player controller failed to load", error), Sf = null, null))) : null;
      var o;
      n === this.$_71v && ("match" !== e.controller || B || (e = {
        controller: "lobby",
        state: t,
        pitch: 0,
        turn: 0
      }), this.hold = e, this.$_12h = B, this.dancing || this.$_2hv());
    }
    $_2hv() {
      const A = this.hold;
      A && (A.controller !== this.$_3ml && (this.rig.$_3ta(0, "match" === A.controller ? this.$_12h : null), this.$_3ml = A.controller), "match" === A.controller ? this.animator.play(A.state, 1, 0) : this.lobbyAnimation(A.state));
    }
    async $_26iv(A, t = -1) {
      const s = await this.heldWeapon(A, t);
      return s ? Fe(s.weapon)?.key ?? null : null;
    }
    $_14i() {
      return this.weapon ? Fe(this.weapon)?.key ?? null : null;
    }
    heldWeapon(A, t) {
      const s = `${A}:${t}`;
      let n = this.held.get(s);
      if (n) return this.held.delete(s), this.held.set(s, n), n;
      n = this.$_6px(A, t).catch(error => (console.warn("weapon failed to load", error), this.held.delete(s), null)), this.held.set(s, n);
      const e = n;
      if (e.then(result => {
        result && this.held.get(s) === e && this.$_6ge.set(s, result);
      }), this.held.size > 5) {
        const A = `${this.weaponIndex}:${this.weaponSkin}`;
        for (const [t, n] of this.held) if (t !== this.$_288 && t !== A && t !== s) {
          this.held.delete(t), this.$_6ge.delete(t), n.then(result => {
            result?.weapon.dispose(), result?.twin?.dispose(), result?.fx?.dispose();
          });
          break;
        }
      }
      return n;
    }
    async $_6px(A, t) {
      const s = this.index.weapons[iA(A)];
      if (!s) return null;
      this.staged && (await lA("rig", this.$_xa8));
      const n = Object.values(w).find(item => item.index === A),
        e = await So(s.file, n?.id);
      await SA(e, ...XA(t), "third");
      const B = n?.dual && this.$_40a ? await jA(s.file) : null;
      B && (await SA(B, ...XA(t), "third"));
      const o = [],
        i = [],
        r = e.nodes[0];
      r.position.set(0, 0, 0), e.animators.length = 0;
      const f = e.data.behaviours.find(item => 0 === item.node && item.data && "weaponType" in item.data),
        a = f?.data?.handsModel?.node;
      "number" == typeof a && e.setActive(a, !1);
      const g = Jf[s.class],
        c = f?.data?.weaponRenderers?.[0]?.node,
        Q = s.class in Jf && "number" == typeof c ? c : -1;
      if (g && "number" == typeof c) {
        const A = e.nodes[c];
        r.updateMatrix();
        const t = new Matrix4();
        for (let s = c; s >= 0; s = e.data.nodes[s].parent) e.nodes[s].updateMatrix(), t.premultiply(e.nodes[s].matrix);
        t.decompose(A.position, A.quaternion, A.scale);
        const n = g(s.name);
        A.position.fromArray(n.position), n.euler && A.quaternion.copy(((A, t, s, n = new Quaternion()) => n.setFromEuler(Rf.set(MathUtils.degToRad(A), MathUtils.degToRad(t), MathUtils.degToRad(s), "YXZ")))(n.euler[0], n.euler[1], n.euler[2])), A.removeFromParent(), o.push(A);
      }
      r.removeFromParent(), o.push(r), B && (B.nodes[0].position.set(0, 0, 0), B.animators.length = 0, "number" == typeof a && B.setActive(a, !1), B.nodes[0].removeFromParent(), i.push(B.nodes[0]));
      const h = "number" == typeof a ? a : -1;
      if (this.$_79b(e, h, Q, o), "scythe" === n?.id && (o.length = 0), B && this.$_79b(B, h, -1, i), this.staged) {
        const A = this.$_xa8,
          t = () => lA("bake", A),
          s = A => (aA("bake", A), hA("bake", A));
        await t(), await Bw(e, o, Lf(e), t, s), B && (await Bw(B, i, Lf(B), t, s));
      } else {
        const A = QA();
        ew(e, o, Lf(e)), B && ew(B, i, Lf(B)), gA("bake", A);
      }
      for (const w of o) dA(w);
      return this.staged && (await Promise.all([...o, ...i].map(item => vA(item, !1, this.$_xa8)))), n?.flag && (o.length = 0), {
        weapon: e,
        twin: B,
        objects: o,
        twinObjects: i,
        weaponType: n?.flag ? oB.state : "scythe" === n?.id ? No.state : s.weaponType ?? 0,
        lobbyAnimation: s.lobbyAnimation,
        stats: n,
        fx: null
      };
    }
    $_79b(A, t, s, n) {
      const e = A.data.nodes,
        B = (A, t) => {
          for (let s = A; s >= 0; s = e[s].parent) if (s === t) return !0;
          return !1;
        };
      if (t >= 0) {
        const uniqueItems = new Set(),
          e = Fe(A);
        e && uniqueItems.add(A.nodes.indexOf(e.node));
        for (const t of A.data.behaviours) "MuzzleFlash" === t.script && uniqueItems.add(t.node);
        for (const t of A.data.components) "ParticleSystem" === t.type && "number" == typeof t.node && uniqueItems.add(t.node);
        let o = s >= 0 && B(t, s);
        for (const A of uniqueItems) A >= 0 && A !== s && B(A, t) && (o = !0);
        o || A.nodes[t].removeFromParent();
      }
      for (const o of n) o.traverse(A => {
        A.updateMatrix(), A.matrixAutoUpdate = !1;
      });
    }
    $_5c0() {
      const A = [this.$_350];
      return this.object.traverse(t => {
        const s = t.userData.skinPart ? t.material : null;
        s && !Array.isArray(s) && A.push(s);
      }), A;
    }
    prime() {
      const A = this.$_350,
        {
          transparent: t,
          depthWrite: s,
          allowOverride: n
        } = A;
      for (const e of [!t, t]) A.transparent = e, A.depthWrite = !0, A.allowOverride = !e, A.needsUpdate = !0, UA(this.object);
      A.depthWrite = s, A.allowOverride = n;
    }
    dance(A, t, s = 0) {
      const n = this.rig.$_3ta(0, t);
      if (n) {
        this.dancing = !0, this.$_3ml = "dance";
        for (const A of this.$_5qo) A.visible = !1;
        n.play(A, -1, s), n.$_11u8(2, 1);
      }
    }
    $_8se() {
      if (this.dancing) {
        this.dancing = !1, this.rig.$_3ta(0, null), this.$_3ml = "lobby", this.$_2hv();
        for (const A of this.$_5qo) A.visible = this.$_7ffb();
        this.$_7aqp.shown = this.$_7ffb();
      }
    }
    emote(A, t = 0) {
      if (!this.animator.play(A, 2, t)) return !1;
      this.animator.$_11u8(2, 1), this.dancing = !0;
      for (const s of this.$_5qo) s.visible = !1;
      return !0;
    }
    $_67u() {
      if (this.dancing) {
        this.dancing = !1, this.animator.play("None", 2, 0), this.animator.$_11u8(2, 0);
        for (const A of this.$_5qo) A.visible = this.$_7ffb();
        this.$_7aqp.shown = this.$_7ffb();
      }
    }
    wallKick() {
      this.lobby || this.wasGrounded || this.animator.$_3iz("jump");
    }
    $_3t9() {
      const A = this.shooting,
        t = A ? Fe(A) : null;
      return t ? (t.node.updateWorldMatrix(!0, !1), {
        key: t.key,
        from: t.node.getWorldPosition(new Vector3()),
        tint: Ae(this.weaponSkin)
      }) : null;
    }
    particles = null;
    fx = null;
    get shooting() {
      return this.twin && 1 === this.side ? this.twin : this.weapon;
    }
    $_3mi3(A = !1, t) {
      this.$_2n4g.active ? this.$_2n4g.strike() : this.$_7aqp.active ? this.$_7aqp.strike(A) : this.fists ? this.$_323.start(A) : this.melee ? this.$_2lz.start(A ? Xe.heavy : Xe.light, A) : A && this.$_5xd.shot(), this.twin && (this.side = 0 === t || 1 === t ? t : 1 ^ this.side, this.$_2v8.shot(this.side)), this.fx?.shoot(), this.launcher.fired(), this.rocket?.set(!1);
    }
    rocket = null;
    launcher = new hi();
    $_5o6(A, t) {
      const s = this.launcher.state(A, t);
      this.rocket?.set(s);
    }
    $_3ik(A, t, s) {
      this.$_4g0 = A, this.reloadUntil = t, this.$_5p9 = s;
    }
    $_cnv(A) {
      this.rocket?.set(A);
    }
    muzzleFlash() {
      const A = this.shooting,
        t = A?.data.behaviours.find(A => "MuzzleFlash" === A.script);
      if (!A || !t) return;
      const s = A.nodes[t.node];
      s.visible = !0, zA(s, MathUtils.degToRad(1e3 * Math.random())), s.updateMatrix(), this.$_3pb = Number(t.data?.lifeTime ?? .05), this.$_bjz = s, this.$_7fy = !1;
    }
    $_3pb = 0;
    $_bjz = null;
    $_7fy = !1;
    lobbyAnimation(A) {
      this.animator.play(A, 0, 0) || this.animator.play("DefaultRifle", 0, 0);
    }
    update(A, t, s = !0, n = 0) {
      if (t && !this.lobby) {
        const s = Math.hypot(t.vx, t.vz);
        if (s > 2) {
          const A = -Math.sin(t.yaw),
            n = -Math.cos(t.yaw),
            e = Math.cos(t.yaw),
            B = -Math.sin(t.yaw);
          this.$_6u9i = (t.vx * A + t.vz * n) / s > 0 ? 1 : -1, this.$_qgv = (t.vx * e + t.vz * B) / s > 0 ? 1 : -1;
        } else this.$_6u9i = this.$_qgv = 0;
        this.$_7s3 += A, this.$_7s3 >= .15 && (this.$_7s3 = 0, this.animator.$_2qw("Move", 0 === this.$_6u9i ? this.$_qgv : this.$_6u9i)), this.animator.$_4r9("crouch", t.crouch);
        const n = !t.grounded && t.crouch;
        if (t.grounded !== this.wasGrounded && (t.grounded ? this.animator.$_3iz("land") : n || this.animator.$_3iz("jump")), !t.grounded && n !== this.$_qkm) {
          const A = n ? "Crouch 0" : "Jump";
          this.animator.currentState(0).state?.name !== A && this.animator.$_6zy(A, .08, 0, 0, !0);
        }
        this.wasGrounded = t.grounded, this.$_qkm = n;
        const e = Math.min(1, Math.max(0, 40 * A));
        this.$_39lf += (Math.trunc(t.pitchDeg) - 167.244 - this.$_39lf) * e;
      }
      this.$_bjz && !this.$_7fy ? this.$_7fy = !0 : this.$_bjz && (this.$_3pb -= A) <= 0 && (this.$_bjz.visible = !1, this.$_bjz = null);
      const e = this.lobby ? -1 : this.$_3c2.update(this.$_4g0, this.reloadUntil, this.$_5p9, A),
        B = this.$_2lz.update(A),
        o = this.$_323.update(A),
        i = !!this.twin || this.$_2n4g.active || this.$_7aqp.active || 0 !== B || 0 !== o || e >= 0,
        r = n > 0 && !i && !this.lobby;
      this.animator.$_75e(r ? this.fingers : null), this.$_6rk += A, this.$_2apc ^= 1;
      const w = r && s && (this.$_6rk < 1 / 60 || n > 1 && 1 === this.$_2apc);
      w || (this.$_6rk = 0), this.$_28xp(w && !0), this.rig.update(A, s && !w), this.fx?.update(A), w || (!this.lobby && s ? this.$_4qu.apply(this.$_39lf, this.$_1ap.$_7i7, !this.dancing) : this.lobby && s && "match" === this.$_3ml && this.hold && (this.$_4qu.apply(this.hold.pitch - 167.244, 0, !0), this.$_4oi && $B(this.object, this.$_4oi, this.hold.turn)), 0 !== B && s && !this.dancing && this.shoulderR && function (A, t, s, n, e) {
        if (0 === n) return;
        const B = e ? Xe.heavy : Xe.light,
          o = MathUtils.DEG2RAD;
        Ke.setFromAxisAngle(Ze, -B.across * o * n), qe.setFromAxisAngle(Se, -B.raise * o * n), ye(A, t, Ke.multiply(qe)), s && ye(A, s, qe.setFromAxisAngle(Ze, -B.twist * o * n));
      }(this.object, this.shoulderR, this.$_1jj, B, this.$_2lz.heavy), 0 !== o && s && !this.dancing && this.$_323.pose(o), this.$_2n4g.active && this.$_2n4g.pose(this.dancing, A, t ? Math.hypot(t.vx, t.vz) : 0, s), this.$_7aqp.active && this.$_7aqp.pose(this.dancing, A, t ? Math.hypot(t.vx, t.vz) : 0, s), this.$_31s.pose(s && !this.dancing ? e : -1) ? this.$_5xd.pose(A, !1, !0) : this.$_5xd.pose(A, s && !this.dancing), this.$_2v8.active && this.$_2v8.pose(A, s && !this.dancing, e), this.$_1ap.pose(A, !this.lobby && !this.dancing && !!t?.slide, s));
    }
    $_76vj() {
      this.fx?.rest();
      for (const A of this.held.values()) A.then(result => result?.fx?.rest());
    }
    $_1ap;
    $_50r() {
      this.$_1ap.reset();
    }
    $_70vf() {
      const A = [this.object];
      for (const t of this.$_6ge.values()) A.push(t.weapon.object), t.twin && A.push(t.twin.object);
      return A;
    }
    dispose() {
      for (const A of this.$_6n2e) Mf.remove(A);
      this.$_6n2e.length = 0, this.$_4gu(), this.fx = null;
      for (const A of this.held.values()) A.then(result => {
        result?.weapon.dispose(), result?.twin?.dispose(), result?.fx?.dispose();
      });
      this.held.clear(), this.$_6ge.clear(), this.$_7aqp.dispose(), this.rig.dispose();
    }
  };
globalThis.kourThreeFlags = {
  slowBind: !1,
  plainUniformCaches: !1
};
export { ln as $, $A as $t, Xo as A, Ht as At, ne as B, Gt as Bt, bi as C, Vs as Ct, zo as D, Ts as Dt, Qi as E, js as Et, xe as F, dt as Ft, _n as G, Mt as Gt, Nn as H, pt as Ht, Pe as I, Pt as It, Dn as J, rt as Jt, dn as K, wt as Kt, ue as L, mt as Lt, je as M, bt as Mt, Le as N, It as Nt, So as O, Ys as Ot, ye as P, vt as Pt, cn as Q, At as Qt, ee as R, ut as Rt, Gi as S, yt as St, pi as T, xs as Tt, Kn as U, kt as Ut, Ae as V, Et as Vt, Zn as W, Yt as Wt, En as X, et as Xt, Pn as Y, it as Yt, Cn as Z, ht as Zt, Yi as _, Xs as _t, mf as a, tt as an, wn as at, mi as b, Ls as bt, Ff as c, an as ct, Ow as d, Ns as dt, _A as en, Bn as et, jw as f, qs as ft, Wi as g, Ws as gt, Tw as h, Ss as ht, Zf as i, nt as in, sn as it, oB as j, Ut as jt, Lo as k, Tt as kt, zw as l, _s as lt, Xw as m, Zs as mt, Nf as n, lt as nn, on as nt, Mf as o, qA as on, gn as ot, xw as p, tn as pt, Hn as q, ot as qt, xf as r, st as rn, rn as rt, Df as s, en as st, jf as t, Bt as tn, nn as tt, Rw as u, $s as ut, Ti as v, zs as vt, Ii as w, ms as wt, di as x, ds as xt, vi as y, ys as yt, Fe as z, Ft as zt };

const __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f || (m.f = ["assets/meshopt_decoder-rMrdvjGn.js", "assets/c-BJ87Xak5.js", "assets/c-Do-pPzOP.js", "assets/three-Bi9Yyrpt.js", "assets/c-D6JpfG2D.js", "assets/c-C1mpvyXQ.js", "assets/c-BE9ZXeD7.js"])) => i.map(item => d[item]);
import { $n as RepeatWrapping, Ct as LinearFilter, Et as LinearMipmapNearestFilter, Ft as Matrix4, It as Mesh, Kt as MirroredRepeatWrapping, Lt as MeshBasicMaterial, T as Color, Tt as LinearMipmapLinearFilter, W as Euler, Yt as NearestMipmapNearestFilter, _ as BufferAttribute, et as Group, hr as SkinnedMesh, m as Bone, mr as Skeleton, nn as PlaneGeometry, qt as NearestFilter, v as BufferGeometry, w as ClampToEdgeWrapping } from "./three-Bi9Yyrpt.js";
import { a as A } from "./c-Caw4SzGP.js";
import { u as $ } from "./c-e0fQXfDh.js";
import { i as S, n as g } from "./c-C1mpvyXQ.js";
import { t as T } from "./c-BE9ZXeD7.js";
import { a as b, d as k, f as E, o as I, u as P } from "./c-D6JpfG2D.js";
import { _ as x, h as _, m as D } from "./c-j2W5q53j.js";
import { At as U, Dt as j, Nt as R, Ot as F, Pt as N, S as O, bt as L, c as C, kt as z, m as W, mt as V, pt as B, u as K, ut as H, v as q } from "./c-DHGnaUyg.js";
var J = (() => {
  const uint32Values = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let s = n;
    for (let t = 0; t < 8; t++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
    uint32Values[n] = s >>> 0;
  }
  return uint32Values;
})();
function Z(t) {
  const n = new TextEncoder().encode(t);
  let s = 4294967295;
  for (const e of n) s = J[255 & (s ^ e)] ^ s >>> 8;
  return (4294967295 ^ s) >>> 0;
}
function G(t, n) {
  const dataView = new DataView(t),
    e = String.fromCharCode(...new Uint8Array(t, 0, 4));
  if (e !== n) throw new Error(`Expected ${n}, got ${e}`);
  const i = dataView.getUint32(4, !0);
  return {
    header: JSON.parse(new TextDecoder().decode(new Uint8Array(t, 8, i))),
    body: 8 + i
  };
}
function Q(t, n, s, e) {
  if ("float32" === e) return new Float32Array(t, n, s);
  if ("uint16" === e) return new Uint16Array(t, n, s);
  if ("uint32" === e) return new Uint32Array(t, n, s);
  throw new Error("Unsupported array type " + e);
}
function X(t) {
  const {
    header: n,
    body: s
  } = G(t, "KCLP");
  return {
    ...n,
    samples: new Float32Array(t, s, t.byteLength - s >> 2)
  };
}
var Y = class {
    slots;
    values;
    constructor(t) {
      this.slots = t, this.values = new Float32Array(4 * t);
    }
  },
  tt = 1e-6,
  nt = new Uint8Array(0),
  st = class {
    controller;
    target;
    params = new Map();
    types = new Map();
    $_74j = new Map();
    $_20q = [];
    $_595 = [];
    defaults;
    pose;
    $_1e8v;
    $_41hq;
    clips = new Map();
    $_1fe = new Map();
    loops = new Map();
    layers = [];
    $_6jq = new Map();
    $_4vk = [];
    $_1tg = [];
    $_59d = [];
    $_20m = new Float64Array(0);
    $_72c = new Uint8Array(0);
    $_cew = new Int32Array(0);
    $_2oi = 0;
    $_7aq = [];
    $_69j = [];
    $_5pb = 0;
    accumulated = new Float32Array(0);
    seen = new Int32Array(0);
    stamp = 0;
    enabled = !0;
    speed = 1;
    onEvent;
    skip = null;
    $_7i1z = null;
    $_2q5(t) {
      return this.$_74j.has(3 * t) || this.$_74j.has(3 * t + 1) || this.$_74j.has(3 * t + 2);
    }
    $_75e(t) {
      if (t === this.$_7i1z) return;
      if (this.$_7i1z = t, !t) return void (this.skip = null);
      const uint8Values = new Uint8Array(this.$_20q.length);
      let s = !1;
      for (let e = 0; e < uint8Values.length; e++) t.has(this.$_20q[e]) && (uint8Values[e] = 1, s = !0);
      this.skip = s ? uint8Values : null;
    }
    constructor(t, n, s) {
      this.controller = t, this.target = s;
      for (const r of t.params) this.types.set(r.name, r.type), this.params.set(r.name, Number(r.default));
      for (const r of t.clips) {
        if (!r || this.clips.has(r)) continue;
        const t = n.get(r);
        if (!t) continue;
        const e = new Int32Array(t.tracks.length).fill(-1),
          uint8Values = new Uint8Array(t.tracks.length),
          o = new Int32Array(t.tracks.length).fill(-1);
        t.tracks.forEach((track, index) => {
          const r = s.resolve(track.path);
          if (void 0 !== r) if (track.kind) {
            const s = "position" === track.kind ? 0 : "rotation" === track.kind ? 1 : 2;
            e[index] = this.slot(r, s), uint8Values[index] = s;
          } else track.property && !track.pptr && (uint8Values[index] = 3, o[index] = this.$_yxo(r, track.typeID, track.property));
        }), this.clips.set(r, {
          clip: t,
          slots: e,
          kinds: uint8Values,
          floats: o
        });
      }
      const e = this.$_20q.length;
      this.defaults = new Y(e), this.pose = new Y(e), this.$_1e8v = new Y(e), this.$_41hq = new Y(e), this.accumulated = new Float32Array(e), this.seen = new Int32Array(e);
      const i = this.$_4vk.length;
      this.$_20m = new Float64Array(i), this.$_72c = new Uint8Array(i), this.$_cew = new Int32Array(i);
      for (let r = 0; r < e; r++) {
        const t = s.defaults(this.$_20q[r]),
          n = 0 === this.$_595[r] ? t.t : 1 === this.$_595[r] ? t.r : t.s;
        this.defaults.values.set([n[0], n[1], n[2], n[3] ?? 0], 4 * r);
      }
      t.layers.forEach((layer, index) => {
        const i = t.machines[layer.machine],
          uniqueItems = new Set(),
          o = [];
        for (const t of i.states) {
          const uint8Values = new Uint8Array(e);
          for (const s of t.tree) {
            const t = s.clip ? this.clips.get(s.clip) : void 0;
            if (t) {
              this.$_1fe.set(s, t);
              for (const s of t.slots) s >= 0 && (uint8Values[s] = 1, uniqueItems.add(s));
            }
          }
          o.push(uint8Values);
        }
        const a = new Float32Array(e).fill(1);
        if (layer.mask) {
          const lookupMap = new Map(layer.mask);
          for (let n = 0; n < e; n++) {
            const s = this.$_36i?.(this.$_20q[n]);
            a[n] = void 0 !== s ? lookupMap.get(s) ?? 0 : 1;
          }
        }
        const c = Int32Array.from(uniqueItems),
          h = new Int32Array(e).fill(-1);
        c.forEach((item, _index) => h[item] = _index), this.layers.push({
          weight: 0 === index ? 1 : layer.weight,
          current: {
            state: i.default,
            time: 0,
            prevTime: 0
          },
          next: null,
          props: c,
          maskWeights: a,
          propIndex: h,
          animated: o
        });
      });
    }
    $_36i;
    restart() {
      for (const t of this.controller.params) this.params.set(t.name, Number(t.default));
      this.controller.layers.forEach((layer, index) => {
        const s = this.layers[index];
        s && (s.weight = 0 === index ? 1 : layer.weight, s.current.state = this.controller.machines[layer.machine].default, s.current.time = s.current.prevTime = 0, s.next = null);
      }), this.speed = 1, this.enabled = !0;
    }
    slot(t, n) {
      const s = 3 * t + n;
      let e = this.$_74j.get(s);
      return void 0 === e && (e = this.$_20q.length, this.$_74j.set(s, e), this.$_20q.push(t), this.$_595.push(n)), e;
    }
    $_yxo(t, n, s) {
      const e = `${t}|${n}|${s}`;
      let i = this.$_6jq.get(e);
      return void 0 === i && (i = this.$_4vk.length, this.$_6jq.set(e, i), this.$_4vk.push(t), this.$_1tg.push(n), this.$_59d.push(s)), i;
    }
    $_2qw(t, n) {
      this.params.has(t) && this.params.set(t, n);
    }
    $_58s(t, n) {
      this.params.has(t) && this.params.set(t, Math.trunc(n));
    }
    $_4r9(t, n) {
      this.params.has(t) && this.params.set(t, n ? 1 : 0);
    }
    $_3iz(t) {
      this.params.has(t) && this.params.set(t, 1);
    }
    $_6c2w(t) {
      this.params.has(t) && this.params.set(t, 0);
    }
    getBool(t) {
      return 0 !== (this.params.get(t) ?? 0);
    }
    $_11u8(t, n) {
      this.layers[t] && t > 0 && (this.layers[t].weight = n);
    }
    $_4sw(t) {
      return this.layers[t]?.weight ?? 0;
    }
    $_306(t, n = 0) {
      const s = this.controller.layers[n];
      return s ? this.controller.machines[s.machine].states.findIndex(state => state.name === t || state.fullPath === t) : -1;
    }
    hasState(t, n = 0) {
      return this.$_306(t, n) >= 0;
    }
    $_4vj6(t, n = 0) {
      const s = this.$_306(t, n);
      return s < 0 ? 0 : this.$_2v7a(n, s);
    }
    currentState(t = 0) {
      const n = this.layers[t];
      return n ? {
        state: this.controller.machines[this.controller.layers[t].machine].states[n.current.state],
        normalizedTime: n.current.time,
        inTransition: !!n.next
      } : {
        state: void 0,
        normalizedTime: 0,
        inTransition: !1
      };
    }
    $_3kf(t = 0) {
      const n = this.controller.machines[this.controller.layers[t]?.machine ?? -1];
      return n?.states[n.default]?.name;
    }
    $_1rh(t, n = 0) {
      const s = this.layers[n];
      if (!s) return !1;
      const e = this.$_1ei(n);
      return e.states[s.current.state]?.name === t || !!s.next && e.states[s.next.state]?.name === t;
    }
    play(t, n = 0, s = 0) {
      if (-1 === n) {
        const n = this.controller.layers.findIndex((layer, index) => this.hasState(t, index));
        return n >= 0 && this.play(t, n, s);
      }
      const e = this.$_306(t, n);
      if (e < 0 || !this.layers[n]) return !1;
      const i = this.layers[n];
      return i.current = {
        state: e,
        time: s,
        prevTime: s
      }, i.next = null, !0;
    }
    seek(t, n = 0) {
      const s = this.layers[n];
      s && (s.current.time = s.current.prevTime = t);
    }
    $_6zy(t, n, s = 0, e = 0, i = !1) {
      const r = this.$_306(t, s);
      if (r < 0) return !1;
      const o = this.layers[s];
      return n <= 0 ? this.play(t, s, e) : (o.next = {
        state: r,
        time: e,
        prevTime: e,
        duration: n,
        fixed: i,
        elapsed: 0
      }, !0);
    }
    $_1ei(t) {
      return this.controller.machines[this.controller.layers[t].machine];
    }
    $_2v7a(t, n) {
      const s = this.$_1ei(t).states[n];
      if (!s?.tree.length) return 1;
      this.$_njr(s.tree);
      let e = 0,
        i = 0;
      for (let r = 0; r < this.$_5pb; r++) {
        const t = this.$_69j[r],
          n = this.$_1fe.get(s.tree[this.$_7aq[r]])?.clip;
        t > 0 && n && (e += t * Math.max(n.duration, tt), i += t);
      }
      return i > 0 ? e / i : 1;
    }
    $_jww(t, n) {
      const s = this.$_1ei(t).states[n];
      if (!s) return !1;
      let e = this.loops.get(s);
      if (void 0 === e) {
        const t = s.tree.find(item => item.clip),
          n = t ? this.$_1fe.get(t)?.clip : void 0;
        e = n ? n.loop : s.loop ?? !1, this.loops.set(s, e);
      }
      return e;
    }
    $_njr(t) {
      this.$_5pb = 0, this.visit(t, 0, 1);
    }
    visit(t, n, s) {
      const e = t[n];
      if (e && !(s <= 0)) {
        if (!e.children.length) {
          for (let t = 0; t < this.$_5pb; t++) if (this.$_7aq[t] === n) return void (this.$_69j[t] += s);
          return this.$_7aq[this.$_5pb] = n, void (this.$_69j[this.$_5pb++] = s);
        }
        if (0 === e.type) {
          const n = this.params.get(e.param ?? "") ?? 0,
            i = e.thresholds,
            r = e.children.length;
          if (n <= i[0]) return this.visit(t, e.children[0], s);
          if (n >= i[r - 1]) return this.visit(t, e.children[r - 1], s);
          for (let o = 0; o < r - 1; o++) if (n >= i[o] && n <= i[o + 1]) {
            const r = i[o + 1] - i[o] > tt ? (n - i[o]) / (i[o + 1] - i[o]) : 0;
            return this.visit(t, e.children[o], s * (1 - r)), void this.visit(t, e.children[o + 1], s * r);
          }
        } else if (4 === e.type) {
          const n = e.directParams ?? [];
          for (let i = 0; i < e.children.length; i++) this.visit(t, e.children[i], s * (this.params.get(n[i]) ?? 0));
        } else {
          const n = this.params.get(e.param ?? "") ?? 0,
            i = this.params.get(e.paramY ?? "") ?? 0,
            r = e.positions ?? [],
            o = r.map((item, index) => {
              let e = 1;
              for (let o = 0; o < r.length; o++) {
                if (index === o) continue;
                const a = r[o],
                  c = a[0] - item[0],
                  h = a[1] - item[1],
                  f = c * c + h * h;
                if (f < tt) continue;
                const l = 1 - ((n - item[0]) * c + (i - item[1]) * h) / f;
                e = Math.min(e, Math.max(0, l));
              }
              return e;
            }),
            a = o.reduce((accumulator, item) => accumulator + item, 0) || 1;
          for (let c = 0; c < e.children.length; c++) this.visit(t, e.children[c], s * o[c] / a);
        }
      }
    }
    condition(t) {
      const n = this.params.get(t.param);
      if (void 0 === n) return !1;
      switch (t.mode) {
        case 1:
          return 0 !== n;
        case 2:
          return 0 === n;
        case 3:
          return n > t.threshold;
        case 4:
          return n < t.threshold;
        case 6:
          return n === t.threshold;
        case 7:
          return n !== t.threshold;
        default:
          return !1;
      }
    }
    $_4vw(t) {
      for (const n of t.conditions) if (!this.condition(n)) return !1;
      return !0;
    }
    $_2z4(t) {
      for (const n of t.conditions) "trigger" === this.types.get(n.param) && this.params.set(n.param, 0);
    }
    $_1ri(t, n, s) {
      if (!n.hasExitTime) return !0;
      if (!this.$_jww(t, s.state) || n.exitTime > 1) return s.time >= n.exitTime;
      const e = s.prevTime - n.exitTime,
        i = s.time - n.exitTime;
      return Math.floor(e) < Math.floor(i) || s.prevTime <= n.exitTime && s.time >= n.exitTime;
    }
    $_6wy(t, n) {
      const s = this.layers[t],
        e = this.$_1ei(t);
      if (!(n.to < 0 || n.to >= e.states.length)) {
        if (this.$_2z4(n), n.duration <= 0) return s.current = {
          state: n.to,
          time: n.offset,
          prevTime: n.offset
        }, void (s.next = null);
        s.next = {
          state: n.to,
          time: n.offset,
          prevTime: n.offset,
          duration: n.duration,
          fixed: n.fixed,
          elapsed: 0
        };
      }
    }
    $_p2w(t) {
      const n = this.layers[t],
        s = this.$_1ei(t);
      for (const i of s.any) {
        if (!i.conditions.length && !i.hasExitTime) continue;
        const s = n.next ? n.next.state : n.current.state;
        if ((i.canSelf || i.to !== s) && this.$_4vw(i) && (!i.hasExitTime || this.$_1ri(t, i, n.current))) return void this.$_6wy(t, i);
      }
      if (n.next) return;
      const e = s.states[n.current.state];
      if (e) for (const i of e.transitions) if ((i.conditions.length || i.hasExitTime) && this.$_4vw(i) && this.$_1ri(t, i, n.current)) return void this.$_6wy(t, i);
    }
    advance(t, n, s) {
      const e = this.$_1ei(t).states[n.state];
      if (!e) return;
      const i = e.speed * (e.speedParam ? this.params.get(e.speedParam) ?? 1 : 1) * this.speed;
      n.prevTime = n.time, n.time += s * i / this.$_2v7a(t, n.state), this.$_4qka(t, n);
    }
    $_4qka(t, n) {
      if (!this.onEvent) return;
      const s = this.$_1ei(t).states[n.state];
      for (const e of s.tree) {
        const t = this.$_1fe.get(e);
        if (!t?.clip.events.length) continue;
        const s = Math.max(t.clip.duration, tt);
        for (const e of t.clip.events) {
          const i = e.time / s,
            r = (t.clip.loop, n.prevTime - i),
            o = n.time - i;
          (t.clip.loop ? Math.floor(r) < Math.floor(o) : n.prevTime < i && n.time >= i) && this.onEvent(e.function, e.string);
        }
      }
    }
    update(t, n = !0) {
      if (this.enabled) {
        for (let n = 0; n < this.layers.length; n++) {
          const s = this.layers[n];
          this.advance(n, s.current, t), s.next && (this.advance(n, s.next, t), s.next.elapsed += s.next.fixed ? t * this.speed : t * this.speed / this.$_2v7a(n, s.current.state), s.next.elapsed >= s.next.duration && (s.current = {
            state: s.next.state,
            time: s.next.time,
            prevTime: s.next.prevTime
          }, s.next = null)), this.$_p2w(n);
        }
        n && this.evaluate();
      }
    }
    writeDefaults() {
      const t = this.defaults.values;
      for (let n = 0; n < this.$_20q.length; n++) this.target.write(this.$_20q[n], this.$_595[n], t, 4 * n);
    }
    evaluate() {
      const t = this.pose.values,
        n = this.defaults.values;
      t.set(n);
      for (let o = 0; o < this.$_2oi; o++) this.$_72c[this.$_cew[o]] = 0;
      this.$_2oi = 0;
      const s = this.$_595;
      for (let o = 0; o < this.layers.length; o++) {
        const e = this.layers[o],
          i = 0 === o ? 1 : e.weight,
          r = e.props;
        if (i <= tt || !r.length) continue;
        const a = this.$_1e8v.values;
        for (let n = 0; n < r.length; n++) {
          const s = 4 * r[n];
          a[s] = t[s], a[s + 1] = t[s + 1], a[s + 2] = t[s + 2], a[s + 3] = t[s + 3];
        }
        const c = e.next ? Math.min(1, e.next.elapsed / Math.max(e.next.duration, tt)) : 0;
        this.$_uz7(o, e.current, 1, !0), e.next && this.$_uz7(o, e.next, c, !1);
        const h = "additive" === this.controller.layers[o].blending;
        for (let o = 0; o < r.length; o++) {
          const c = r[o],
            f = i * e.maskWeights[c];
          if (f <= tt) continue;
          const l = 4 * c;
          if (1 === s[c]) h ? ot(t, l, a, l, n, l, f) : rt(t, l, a, l, f);else for (let s = 0; s < 3; s++) {
            const e = h ? t[l + s] + (a[l + s] - n[l + s]) : a[l + s];
            t[l + s] += (e - t[l + s]) * f;
          }
        }
      }
      const e = this.target,
        i = this.$_20q,
        r = this.skip;
      if (r) for (let o = 0; o < i.length; o++) r[o] || e.write(i[o], s[o], t, 4 * o);else for (let o = 0; o < i.length; o++) e.write(i[o], s[o], t, 4 * o);
      if (e.applyFloat) for (let o = 0; o < this.$_2oi; o++) {
        const t = this.$_cew[o];
        e.applyFloat(this.$_4vk[t], this.$_1tg[t], this.$_59d[t], this.$_20m[t]);
      }
    }
    $_uz7(t, n, s, e) {
      const i = this.$_1ei(t).states[n.state],
        r = this.layers[t],
        o = this.$_1e8v.values,
        a = this.$_41hq.values,
        c = this.defaults.values,
        h = this.$_595,
        f = r.props,
        l = f.length,
        u = r.animated[n.state] ?? nt,
        w = !!i?.writeDefaults;
      for (let v = 0; v < l; v++) {
        const t = f[v],
          n = 4 * t;
        w || u[t] ? a[n] = a[n + 1] = a[n + 2] = a[n + 3] = 0 : (a[n] = o[n], a[n + 1] = o[n + 1], a[n + 2] = o[n + 2], a[n + 3] = o[n + 3]);
      }
      i ? this.$_njr(i.tree) : this.$_5pb = 0;
      const d = this.accumulated;
      d.fill(0, 0, l);
      const p = r.propIndex,
        m = this.seen,
        y = this.skip;
      for (let v = 0; v < this.$_5pb; v++) {
        const t = this.$_69j[v],
          s = i.tree[this.$_7aq[v]],
          e = this.$_1fe.get(s);
        if (!e) continue;
        const r = e.clip,
          o = r.samples;
        let u = n.time + (i.cycleOffset || 0) + (s.cycleOffset || 0);
        u = r.loop ? u - Math.floor(u) : Math.min(Math.max(u, 0), 1);
        const w = u * r.duration * r.sampleRate,
          M = Math.min(r.frames - 1, Math.max(0, Math.floor(w))),
          A = Math.min(r.frames - 1, M + 1),
          $ = Math.min(1, Math.max(0, w - M)),
          S = ++this.stamp,
          g = r.tracks;
        for (let n = 0; n < g.length; n++) {
          const s = g[n],
            i = e.kinds[n];
          if (3 === i) {
            const i = e.floats[n];
            if (i < 0) continue;
            const r = o[s.offset + M],
              a = o[s.offset + A];
            this.$_72c[i] || (this.$_72c[i] = 1, this.$_cew[this.$_2oi++] = i, this.$_20m[i] = 0), this.$_20m[i] += (r + (a - r) * $) * t;
            continue;
          }
          const r = e.slots[n];
          if (r < 0) continue;
          const c = p[r];
          if (c < 0 || null !== y && 1 === y[r]) continue;
          m[r] = S;
          const h = 4 * r,
            f = s.offset + M * s.width,
            l = s.offset + A * s.width;
          if (1 === i) {
            let n = o[f],
              s = o[f + 1],
              e = o[f + 2],
              i = o[f + 3],
              r = o[l],
              c = o[l + 1],
              u = o[l + 2],
              w = o[l + 3];
            n * r + s * c + e * u + i * w < 0 && (r = -r, c = -c, u = -u, w = -w), n += (r - n) * $, s += (c - s) * $, e += (u - e) * $, i += (w - i) * $, et(a, h, n, s, e, i, t);
          } else for (let n = 0; n < 3; n++) {
            const s = o[f + n],
              e = o[l + n];
            a[h + n] += (s + (e - s) * $) * t;
          }
          d[c] += t;
        }
        if (i.writeDefaults) for (let n = 0; n < l; n++) {
          const s = f[n];
          if (m[s] === S) continue;
          const e = 4 * s;
          if (1 === h[s]) et(a, e, c[e], c[e + 1], c[e + 2], c[e + 3], t);else for (let n = 0; n < 3; n++) a[e + n] += c[e + n] * t;
          d[n] += t;
        }
      }
      for (let v = 0; v < l; v++) {
        const t = f[v],
          n = 4 * t,
          s = d[v];
        if (s <= tt) (w || u[t]) && (a[n] = c[n], a[n + 1] = c[n + 1], a[n + 2] = c[n + 2], a[n + 3] = c[n + 3]);else if (1 === h[t]) it(a, n);else for (let e = 0; e < 3; e++) a[n + e] /= s;
      }
      for (let v = 0; v < l; v++) {
        const t = f[v],
          n = 4 * t;
        if (e) o[n] = a[n], o[n + 1] = a[n + 1], o[n + 2] = a[n + 2], o[n + 3] = a[n + 3];else if (1 === h[t]) rt(o, n, a, n, s);else for (let e = 0; e < 3; e++) o[n + e] += (a[n + e] - o[n + e]) * s;
      }
    }
  };
function et(t, n, s, e, i, r, o) {
  t[n] * s + t[n + 1] * e + t[n + 2] * i + t[n + 3] * r < 0 && (o = -o), t[n] += s * o, t[n + 1] += e * o, t[n + 2] += i * o, t[n + 3] += r * o;
}
function it(t, n) {
  const s = t[n],
    e = t[n + 1],
    i = t[n + 2],
    r = t[n + 3],
    o = Math.sqrt(s * s + e * e + i * i + r * r) || 1;
  t[n] /= o, t[n + 1] /= o, t[n + 2] /= o, t[n + 3] /= o;
}
function rt(t, n, s, e, i) {
  let r = i;
  t[n] * s[e] + t[n + 1] * s[e + 1] + t[n + 2] * s[e + 2] + t[n + 3] * s[e + 3] < 0 && (r = -i);
  for (let o = 0; o < 4; o++) t[n + o] = t[n + o] * (1 - i) + s[e + o] * r;
  it(t, n);
}
function ot(t, n, s, e, i, r, o) {
  const a = -i[r],
    c = -i[r + 1],
    h = -i[r + 2],
    f = i[r + 3],
    l = s[e],
    u = s[e + 1],
    w = s[e + 2],
    d = s[e + 3];
  let p = f * l + a * d + c * w - h * u,
    m = f * u - a * w + c * d + h * l,
    y = f * w + a * u - c * l + h * d,
    v = f * d - a * l - c * u - h * w;
  p *= o, m *= o, y *= o, v = 1 - o + v * o;
  const M = Math.sqrt(p * p + m * m + y * y + v * v) || 1;
  p /= M, m /= M, y /= M, v /= M;
  const A = t[n],
    $ = t[n + 1],
    S = t[n + 2],
    g = t[n + 3];
  t[n] = g * p + A * v + $ * y - S * m, t[n + 1] = g * m - A * y + $ * v + S * p, t[n + 2] = g * y + A * m - $ * p + S * v, t[n + 3] = g * v - A * p - $ * m - S * y;
}
var at = [RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping];
function ct(t, e) {
  const [i, r, o, a] = e ?? [0, 0, 0, 0],
    h = !0 === t.isCompressedTexture,
    l = h ? !!r && t.mipmaps.length > 1 : !!r;
  return t.generateMipmaps = l && !h, t.magFilter = 0 === i ? NearestFilter : LinearFilter, t.minFilter = l ? 0 === i ? NearestMipmapNearestFilter : 1 === i ? LinearMipmapNearestFilter : LinearMipmapLinearFilter : 0 === i ? NearestFilter : LinearFilter, e && (t.wrapS = at[o] ?? 1e3, t.wrapT = at[a] ?? 1e3), t.needsUpdate = !0, t;
}
var ht = [0, 0, 0, 0],
  ft = [0, 1, 0, 0];
function lt(t, n = t) {
  return Math.max(t, n) > 256 ? ft : ht;
}
var ut = {
    scene: {
      layout: 1,
      revision: 3,
      minRevision: 0
    },
    kmsz: {
      layout: 1,
      revision: 1,
      minRevision: 0
    },
    kclz: {
      layout: 1,
      revision: 1,
      minRevision: 1
    },
    nav: {
      layout: 1,
      revision: 4,
      minRevision: 1
    }
  },
  wt = class extends Error {
    kind;
    constructor(t, n) {
      super(n), this.kind = t, this.name = "PackedStaleError";
    }
  };
function dt(t, n) {
  const s = function (t, n) {
    const s = ut[t];
    return n.v !== s.layout ? `${t} layout ${n.v}, this build reads ${s.layout}` : n.r < s.minRevision ? `${t} revision ${n.r} < ${s.minRevision} (written by an older, faulty packer)` : null;
  }(t, function (t) {
    return {
      v: "number" == typeof t.v ? t.v : 1,
      r: "number" == typeof t.r ? t.r : 0
    };
  }(n));
  if (s) throw new wt(t, s);
}
var pt = t => (4 - t % 4) % 4;
function mt(t) {
  return t.byteLength >= 8 && 1514947403 === new DataView(t.buffer, t.byteOffset, 8).getUint32(0, !0);
}
var yt = t => (4 - t % 4) % 4;
function vt(t) {
  return t.byteLength >= 8 && 1515408715 === new DataView(t.buffer, t.byteOffset, 8).getUint32(0, !0);
}
async function Mt(t, n, s) {
  const e = await fetch(t, s).catch(() => null);
  if (!e?.ok) return null;
  let uint8Values = new Uint8Array(await e.arrayBuffer());
  var r;
  return (r = uint8Values).byteLength > 2 && 31 === r[0] && 139 === r[1] && (uint8Values = await async function (t) {
    if ("undefined" == typeof DecompressionStream) try {
      return S(t);
    } catch {
      return null;
    }
    try {
      const n = new Blob([t]).stream().pipeThrough(new DecompressionStream("gzip"));
      return new Uint8Array(await new Response(n).arrayBuffer());
    } catch {
      return null;
    }
  }(uint8Values)), uint8Values && n(uint8Values) ? uint8Values : null;
}
var At = null;
function $t() {
  return At ??= T(async () => {
    const {
      MeshoptDecoder: t
    } = await import("./meshopt_decoder-rMrdvjGn.js").then(result => result.t);
    return {
      MeshoptDecoder: t
    };
  }, __vite__mapDeps([0, 1])).then(async ({
    MeshoptDecoder: t
  }) => {
    if (await t.ready, "undefined" != typeof Worker) {
      const n = "undefined" != typeof navigator && navigator.hardwareConcurrency || 2;
      try {
        t.useWorkers(Math.max(1, Math.min(2, n - 1)));
      } catch {}
    }
    return t;
  });
}
var St = new Set();
function gt(t, n) {
  if (n instanceof wt) {
    if (St.has(n.kind)) return;
    St.add(n.kind), console.warn(`${t}: ${n.message} - loading the originals (\`npm run assets:pack\` rebuilds the .${n.kind} files)`);
  } else console.warn(`${t} unusable, loading the original`, n);
}
var Tt = {
  hits: 0,
  misses: 0
};
async function bt(t, n) {
  if (Tt.hits > 0 || Tt.misses < 3) {
    const s = await Mt(`${t}meshes/${n}.kmsz`, vt);
    if (s) {
      Tt.hits++;
      try {
        return await async function (t, n) {
          const {
            out: s,
            streams: e
          } = function (t) {
            if (!vt(t)) throw new Error("not KMSZ");
            const n = new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(4, !0),
              parsedValue = JSON.parse(new TextDecoder().decode(t.subarray(8, 8 + n)));
            dt("kmsz", parsedValue);
            const e = 8 + n,
              uint8Values = new Uint8Array(parsedValue.size);
            uint8Values.set(t.subarray(e, e + parsedValue.head));
            let r = e + parsedValue.head + yt(parsedValue.head);
            return {
              out: uint8Values,
              streams: parsedValue.streams.map(item => {
                const s = t.subarray(r, r + item.len);
                return r += item.len + yt(item.len), {
                  s: item,
                  src: s
                };
              })
            };
          }(t);
          return await Promise.all(e.map(async ({
            s: t,
            src: e
          }) => {
            "raw" === t.m ? s.set(e, t.at) : "i" === t.m ? s.set(await n.decodeGltfBufferAsync(t.n, t.s, e, "INDICES"), t.at) : "v" === t.m ? s.set(await n.decodeGltfBufferAsync(t.n, t.s, e, "ATTRIBUTES", t.f), t.at) : function (t, n, s, e) {
              const int16Values = new Int16Array(e.buffer, e.byteOffset, 4 * s),
                float32Values = new Float32Array(t.buffer, t.byteOffset + n, 3 * s);
              for (let o = 0; o < s; o++) {
                const t = int16Values[4 * o] / 32767,
                  n = int16Values[4 * o + 1] / 32767,
                  s = int16Values[4 * o + 2] / 32767,
                  e = Math.hypot(t, n, s) || 1;
                float32Values[3 * o] = t / e, float32Values[3 * o + 1] = n / e, float32Values[3 * o + 2] = s / e;
              }
            }(s, t.at, t.n, await n.decodeGltfBufferAsync(t.n, 8, e, "ATTRIBUTES", "OCTAHEDRAL"));
          })), s.buffer;
        }(s, await $t());
      } catch (e) {
        gt(`rig mesh ${n}.kmsz`, e);
      }
    } else Tt.misses++;
  }
  const response = await fetch(`${t}meshes/${n}.bin`);
  if (!response.ok) throw new Error(`Missing mesh ${n}`);
  return response.arrayBuffer();
}
var kt = {
  hits: 0,
  misses: 0
};
async function Et(t, n) {
  if (kt.hits > 0 || kt.misses < 3) {
    const s = await Mt(`${t}clips/${n}.kclz`, mt);
    if (s) {
      kt.hits++;
      try {
        return await async function (t, n) {
          const {
              out: s,
              streams: e,
              frames: i,
              body: r
            } = function (t) {
              if (!mt(t)) throw new Error("not KCLZ");
              const n = new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(4, !0),
                parsedValue = JSON.parse(new TextDecoder().decode(t.subarray(8, 8 + n)));
              dt("kclz", parsedValue);
              const e = 8 + n,
                uint8Values = new Uint8Array(parsedValue.size);
              uint8Values.set(t.subarray(e, e + parsedValue.head));
              const {
                header: r,
                body: o
              } = function (t) {
                const dataView = new DataView(t.buffer, t.byteOffset, t.byteLength);
                if (t.byteLength < 8 || 1347175243 !== dataView.getUint32(0, !0)) throw new Error("not KCLP");
                const s = dataView.getUint32(4, !0);
                return {
                  header: JSON.parse(new TextDecoder().decode(t.subarray(8, 8 + s))),
                  body: 8 + s
                };
              }(uint8Values);
              let a = e + parsedValue.head + pt(parsedValue.head);
              return {
                out: uint8Values,
                streams: parsedValue.tracks.map((track, index) => {
                  const e = t.subarray(a, a + track.len);
                  return a += track.len + pt(track.len), {
                    s: track,
                    src: e,
                    t: r.tracks[index]
                  };
                }),
                frames: r.frames,
                body: o
              };
            }(t),
            o = await Promise.all(e.map(({
              s: t,
              src: s,
              t: e
            }) => "c" === t.m ? null : n.decodeGltfBufferAsync(i, "q" === t.m ? 8 : 4 * e.width, s, "ATTRIBUTES", "q" === t.m ? "QUATERNION" : "e" === t.m ? "EXPONENTIAL" : void 0)));
          return e.forEach(({
            s: t,
            src: n,
            t: e
          }, index) => function (t, n, s, e, i, r, o) {
            const a = n + 4 * i.offset,
              float32Values = new Float32Array(t.buffer, t.byteOffset + a, s * i.width);
            if ("c" === e.m) {
              const _float32Values = new Float32Array(new Uint8Array(r).buffer, 0, i.width);
              for (let n = 0; n < s; n++) float32Values.set(_float32Values, n * i.width);
            } else "q" === e.m ? function (t, n, s, e) {
              const int16Values = new Int16Array(t.buffer, t.byteOffset, 4 * n);
              for (let r = 0; r < n; r++) {
                let t = int16Values[4 * r] / 32767,
                  n = int16Values[4 * r + 1] / 32767,
                  o = int16Values[4 * r + 2] / 32767,
                  a = int16Values[4 * r + 3] / 32767;
                const c = Math.hypot(t, n, o, a) || 1;
                t /= c, n /= c, o /= c, a /= c;
                let h = 1;
                if (0 === r) h = s ? -1 : 1;else {
                  const s = 4 * (r - 1);
                  e[s] * t + e[s + 1] * n + e[s + 2] * o + e[s + 3] * a < 0 && (h = -1);
                }
                e[4 * r] = t * h, e[4 * r + 1] = n * h, e[4 * r + 2] = o * h, e[4 * r + 3] = a * h;
              }
            }(o, s, 1 === e.f, float32Values) : t.set(o.subarray(0, s * i.width * 4), a);
          }(s, r, i, t, e, n, o[index])), s.buffer;
        }(s, await $t());
      } catch (e) {
        gt(`rig clip ${n}.kclz`, e);
      }
    } else kt.misses++;
  }
  const response = await fetch(`${t}clips/${n}.bin`);
  if (!response.ok) throw new Error(`Missing clip ${n}`);
  return response.arrayBuffer();
}
function It(t, n) {}
var Pt = {
    10: {
      from: 28,
      states: ["Reload1Shell", "Reload2Shell", "Reload3Shell", "Reload4Shell", "Reload5Shell"]
    }
  },
  xt = {
    source: "Stab0",
    state: "Heavy",
    windup: .35,
    slow: .45,
    amplify: 1.3
  };
function _t(t, n) {
  const s = xt.windup * n,
    e = s / xt.slow;
  return t <= e ? t * xt.slow : Math.min(n, s + (t - e));
}
var Dt = t => "rotation" === t.kind ? 4 : t.kind ? 3 : 1;
var Ut = new Float64Array(4);
function jt(t, n, s, e, i) {
  let r = t[s],
    o = t[s + 1],
    a = t[s + 2],
    c = t[s + 3];
  const h = t[n],
    f = t[n + 1],
    l = t[n + 2],
    u = t[n + 3];
  let w = h * r + f * o + l * a + u * c;
  w < 0 && (w = -w, r = -r, o = -o, a = -a, c = -c);
  let d = 1 - e,
    p = e;
  if (w < .9995) {
    const t = Math.acos(Math.min(1, w)),
      n = Math.sin(t);
    d = Math.sin((1 - e) * t) / n, p = Math.sin(e * t) / n;
  }
  const m = h * d + r * p,
    y = f * d + o * p,
    v = l * d + a * p,
    M = u * d + c * p,
    A = Math.hypot(m, y, v, M) || 1;
  i[0] = m / A, i[1] = y / A, i[2] = v / A, i[3] = M / A;
}
function Rt(t, n, s, e, i, r, o, a) {
  const c = t[0],
    h = t[1],
    f = t[2],
    l = t[3];
  let u = l * i + c * n + h * s + f * e,
    w = l * n - c * i - h * e + f * s,
    d = l * s + c * e - h * i - f * n,
    p = l * e - c * s + h * n - f * i;
  u < 0 && (u = -u, w = -w, d = -d, p = -p);
  const m = 2 * Math.acos(Math.min(1, u)),
    y = Math.sqrt(Math.max(0, 1 - u * u));
  if (y > 1e-6) {
    const t = m * r / 2,
      n = Math.sin(t) / y;
    w *= n, d *= n, p *= n, u = Math.cos(t);
  }
  o[a] = l * w + c * u + h * p - f * d, o[a + 1] = l * d - c * p + h * u + f * w, o[a + 2] = l * p + c * d - h * w + f * u, o[a + 3] = l * u - c * w - h * d - f * p;
}
var Ft = "Shoot_Aim",
  Nt = [14, 20, 1, 4, 5, 8, 16, 21, 22, 25, 26];
function Ot(t, n, s, e, i) {
  if (void 0 === t || !Nt.includes(t)) return;
  const r = n[0]?.controller,
    o = r ? s.get(r) : void 0;
  r && o && s.set(r, function (t, n, s) {
    const e = t.layers[0]?.machine ?? 0,
      i = t.machines[e];
    if (!i || i.states.some(state => state.name === Ft)) return t;
    const r = i.states.find(state => "Shoot" === state.name),
      o = r?.tree.find(t => t.clip)?.clip,
      a = o ? n.get(o) : void 0;
    if (!r || !o || !a) return t;
    const c = `${o}:aim`,
      h = i.states[i.default],
      f = h && h !== r ? h.tree.find(item => item.clip)?.clip : void 0,
      l = f ? n.get(f) : void 0;
    n.has(c) || n.set(c, function (t, n, s) {
      if (!n) {
        const n = t.tracks.filter(track => !(0 === track.path && "rotation" === track.kind));
        return {
          ...t,
          name: `${t.name}_Aim`,
          tracks: n
        };
      }
      const e = t => 0 === t.path || n.has(t.path >>> 0),
        i = t => s?.tracks.find(n => n.path === t.path && n.kind === t.kind && n.width === t.width),
        r = t.tracks.filter(track => !(s && e(track) && "rotation" === track.kind && !i(track))),
        float32Values = new Float32Array(t.samples);
      for (const a of r) {
        if (!e(a)) continue;
        const n = "rotation" === a.kind ? 0 : "position" === a.kind ? 1 : a.width;
        if (n >= a.width) continue;
        const r = i(a),
          c = r ? s.samples.subarray(r.offset + (s.frames - 1) * r.width, r.offset + s.frames * r.width) : t.samples.subarray(a.offset, a.offset + a.width);
        for (let s = 0; s < t.frames; s++) for (let t = n; t < a.width; t++) float32Values[a.offset + s * a.width + t] = c[t];
      }
      return {
        ...t,
        name: `${t.name}_Aim`,
        tracks: r,
        samples: float32Values
      };
    }(a, s, l));
    const u = {
      ...r,
      name: Ft,
      fullPath: `${t.layers[0]?.name ?? "Base Layer"}.${Ft}`,
      transitions: [],
      tree: r.tree.map(item => item.clip === o ? {
        ...item,
        clip: c
      } : item)
    };
    return {
      ...t,
      clips: [...t.clips, c],
      machines: t.machines.map((item, index) => index === e ? {
        ...item,
        states: [...item.states, u]
      } : item)
    };
  }(o, e, i && function (t) {
    const uniqueItems = new Set();
    return t.forEach((item, index) => {
      if ("Armature" !== item.name || /(^|\/)Hands(\/|$)/.test(item.path)) return;
      uniqueItems.add(Z(item.path));
      const i = t[item.parent];
      i && "" !== i.path && uniqueItems.add(Z(i.path)), t.forEach(_item => {
        _item.parent === index && uniqueItems.add(Z(_item.path));
      });
    }), uniqueItems;
  }(i)));
}
var Lt = "Style Dance",
  Ct = A.filter(item => item.custom && item.rigClip).map(item => ({
    name: item.animationClip,
    clip: item.rigClip
  }));
function zt(t) {
  return t.machines.findIndex(item => item.states.some(state => state.name === Lt));
}
var Wt = null;
var Vt = "/assets/extracted/rig/",
  Bt = new Map(),
  Kt = new Map(),
  Ht = new Map(),
  qt = new Map(),
  Jt = new Map();
function Zt(t) {
  let n = Bt.get(t);
  return n || (n = g(Vt + t).then(async result => {
    if (!result.ok) throw new Error(`Missing ${t}`);
    return await result.json();
  }), Bt.set(t, n)), n;
}
function Gt(t) {
  let n = Kt.get(t);
  return n || (n = bt(Vt, t).then(result => {
    const n = D(),
      s = function (t) {
        const {
            header: n,
            body: s
          } = G(t, "KMSH"),
          i = new BufferGeometry();
        for (const [e, r] of Object.entries(n.attributes)) {
          const n = Q(t, s + r.offset, r.count, r.type);
          "index" === e ? i.setIndex(new BufferAttribute(n, 1)) : i.setAttribute(e, new BufferAttribute(n, r.itemSize));
        }
        for (const [e, r, o] of n.groups) i.addGroup(e, r, o);
        return i.getAttribute("normal") || i.computeVertexNormals(), i.computeBoundingSphere(), {
          geometry: i,
          name: n.name,
          bindPoses: n.bindPoses.map(item => new Matrix4().fromArray(item))
        };
      }(result);
    return _("rig:mesh", n), s;
  }), Kt.set(t, n)), n;
}
function Qt(t) {
  let n = Ht.get(t);
  return n || (n = Et(Vt, t).then(result => {
    const n = D(),
      s = X(result);
    return _("rig:clip", n), s;
  }), Ht.set(t, n)), n;
}
var Xt = null,
  Yt = null;
function tn() {
  return Yt ??= g(`${Vt}tex/tints.json`).then(result => result.ok ? result.json() : {}).catch(() => ({}));
}
var nn = null;
function sn(t) {
  let n = qt.get(t);
  return n || (n = Promise.all([I(`${Vt}tex`, t), nn ??= g(`${Vt}tex/settings.json`).then(result => result.ok ? result.json() : {}).catch(() => ({}))]).then(([n, s]) => {
    n.colorSpace = K, b(n) || (n.flipY = !0);
    const e = n.image;
    return ct(n, t.startsWith("../") ? lt(e?.width ?? 0, e?.height ?? 0) : s[t] ?? ht);
  }), qt.set(t, n), en(qt, t, n)), n;
}
function en(t, n, s) {
  const e = () => {
    t.get(n) === s && t.delete(n);
  };
  return s.then(result => result ? void 0 : e(), e), s;
}
var rn = new Map(),
  on = 0,
  an = new Map(),
  cn = new Map(),
  hn = !1,
  fn = (t, n) => (an.set(t, on), n.then(result => {
    result && rn.get(t) === n && cn.set(t, result);
  }), n);
function ln(t) {
  const n = t.mipmaps;
  if (t.isCompressedTexture && n?.length) return n.reduce((accumulator, item) => accumulator + (item.data?.byteLength ?? 0), 0);
  const s = t.image;
  return Math.round((s?.width ?? 0) * (s?.height ?? 0) * 4 * (4 / 3));
}
function un(t) {
  const uniqueItems = new Set();
  for (const [i, r] of cn) (an.get(i) === on || t.has(r)) && uniqueItems.add(r);
  const _uniqueItems = new Set();
  for (const [i, r] of [...cn]) uniqueItems.has(r) || (cn.delete(i), rn.delete(i), an.delete(i), _uniqueItems.add(r));
  let e = 0;
  for (const i of _uniqueItems) e += ln(i), i.dispose();
  return _uniqueItems.size && hn && T(() => import("./c-Do-pPzOP.js").then(result => result.forgetSkins(_uniqueItems)), __vite__mapDeps([2, 3, 1, 4, 5, 6])), on++, {
    textures: _uniqueItems.size,
    bytes: e
  };
}
function wn(t, n = "first") {
  const s = P.compressedSkins,
    e = k(),
    i = 2 === e ? "|quarter" : e ? "|half" : "",
    r = s ? `${t}|${n}${i}` : `${t}${i}`;
  let o = rn.get(r);
  if (o && an.set(r, on), !o) {
    const a = `${t}${i}`,
      c = () => {
        let n = rn.get(a);
        return n && an.set(a, on), n || (n = E(`${Vt}weapon-skins/${t}.png`).then(result => (result.colorSpace = K, result.flipY = !0, e && (result.userData.halfSize = e), ct(result, ht))).catch(() => null), rn.set(a, n), fn(a, n), en(rn, a, n)), n;
      };
    s && (hn = !0), o = s ? T(() => import("./c-Do-pPzOP.js").then(result => result.compressedSkin(`${Vt}weapon-skins`, t, n)), __vite__mapDeps([2, 3, 1, 4, 5, 6])).catch(() => null).then(result => result ? (result.colorSpace = K, ct(result, ht)) : c()) : c(), rn.set(r, o), fn(r, o), en(rn, r, o);
  }
  return o;
}
var dn = new Map();
async function pn(t) {
  return async function (t, n) {
    return !Ct.length || zt(t) < 0 ? t : (Wt ??= Promise.all(Ct.map(item => n(item.clip).then(() => item.clip, () => (console.warn(`Custom emote "${item.name}": clip ${item.clip} missing (npm run assets:custom)`), null)))).then(result => new Set(result.filter(item => !!item))), function (t, n, s = Ct) {
      const e = zt(t);
      if (e < 0) return t;
      const i = t.machines[e],
        r = i.states.find(state => state.name === Lt),
        o = r.fullPath.slice(0, r.fullPath.length - r.name.length),
        a = [...t.clips],
        c = [];
      for (const h of s) {
        if (!n.has(h.clip) || i.states.some(state => state.name === h.name)) continue;
        a.includes(h.clip) || a.push(h.clip);
        const t = r.tree[0];
        c.push({
          ...r,
          name: h.name,
          fullPath: `${o}${h.name}`,
          tree: [{
            ...t,
            children: [],
            clip: h.clip,
            thresholds: []
          }],
          transitions: []
        });
      }
      return c.length ? {
        ...t,
        clips: a,
        machines: t.machines.map((item, index) => index === e ? {
          ...item,
          states: [...item.states, ...c]
        } : item)
      } : t;
    }(t, await Wt));
  }(await async function (t) {
    let n = await Zt(`controllers/${t}.json`);
    if (n.override) {
      const t = await Zt(`controllers/${n.override}.json`),
        lookupMap = new Map(n.clips),
        e = t => t && lookupMap.get(t) || t;
      n = {
        ...t,
        clips: t.clips.map(e),
        machines: t.machines.map(item => ({
          ...item,
          states: item.states.map(state => ({
            ...state,
            tree: state.tree.map(_item2 => ({
              ..._item2,
              clip: e(_item2.clip)
            }))
          }))
        }))
      };
    }
    return n;
  }(t), Qt);
}
var mn = new Map();
function yn(t) {
  let n = mn.get(t);
  return n || (n = (async () => {
    const n = await pn(t),
      s = [...new Set(n.clips.filter(clip => !!clip))],
      e = await Promise.all(s.map(async item => [item, await Qt(item)]));
    return {
      controller: n,
      clips: new Map(e)
    };
  })(), mn.set(t, n)), n;
}
async function vn(t) {
  const n = (await Zt("index.json")).weapons[t]?.file,
    s = n ? (await Zt(n)).animators[0]?.controller : null;
  return s ? pn(s) : null;
}
function Mn(t) {
  let n = dn.get(t);
  return n || (n = (async () => {
    const n = await Zt(t),
      uniqueItems = new Set(n.renderers.map(item => item.mesh).filter(item => !!item)),
      _uniqueItems2 = new Set(n.animators.map(item => item.controller).filter(item => !!item)),
      lookupMap = new Map();
    for (const t of _uniqueItems2) lookupMap.set(t, await pn(t));
    await async function (t, n, s, e) {
      const i = void 0 === t ? void 0 : Pt[t],
        r = n[0]?.controller,
        o = r ? s.get(r) : void 0;
      if (!i || !r || !o) return;
      const a = await e(i.from).catch(() => null);
      a && s.set(r, function (t, n, s) {
        const e = t.layers[0]?.machine ?? 0,
          i = n.machines[n.layers[0]?.machine ?? 0],
          r = t.machines[e];
        if (!i || !r) return t;
        const o = [...t.clips],
          a = [];
        for (const c of s) {
          if (r.states.some(state => state.name === c)) continue;
          const n = i.states.find(state => state.name === c);
          if (n) {
            a.push({
              ...n,
              transitions: [],
              fullPath: `${t.layers[0]?.name ?? "Base Layer"}.${n.name}`
            });
            for (const t of n.tree) t.clip && !o.includes(t.clip) && o.push(t.clip);
          }
        }
        return a.length ? {
          ...t,
          clips: o,
          machines: t.machines.map((item, index) => index === e ? {
            ...item,
            states: [...item.states, ...a]
          } : item)
        } : t;
      }(o, a, i.states));
    }(n.weaponIndex, n.animators, lookupMap, vn);
    const _uniqueItems3 = new Set();
    for (const t of lookupMap.values()) for (const n of t.clips) n && _uniqueItems3.add(n);
    const _uniqueItems4 = new Set(Object.values(n.materials).flatMap(item => [item.texture, item.patternMask]).filter(item => !!item)),
      [a, c, h] = await Promise.all([Promise.all([...uniqueItems].map(async item => [item, await Gt(item)])), Promise.all([..._uniqueItems3].map(async item => [item, await Qt(item)])), Promise.all([..._uniqueItems4].map(async item => [item, await sn(item)]))]),
      _lookupMap = new Map(c),
      l = "Knife" === n.weaponClass ? n.animators[0]?.controller : null,
      u = l ? lookupMap.get(l) : void 0;
    return l && u && lookupMap.set(l, function (t, n) {
      const s = t.layers[0]?.machine ?? 0,
        e = t.machines[s];
      if (!e || e.states.some(state => state.name === xt.state)) return t;
      const i = e.states.find(state => state.name === xt.source),
        r = i?.tree.find(t => t.clip)?.clip,
        o = r ? n.get(r) : void 0;
      if (!i || !r || !o) return t;
      const a = `${r}:heavy`;
      n.has(a) || n.set(a, function (t) {
        const n = t.sampleRate || 60,
          s = (t => xt.windup * t / xt.slow + (1 - xt.windup) * t)(t.duration),
          e = Math.max(2, Math.round(s * n) + 1),
          i = t.frames - 1;
        let r = 0;
        const o = t.tracks.map(track => {
            const n = {
              ...track,
              offset: r
            };
            return r += e * Dt(track), n;
          }),
          float32Values = new Float32Array(r),
          c = t.samples,
          h = xt.amplify;
        for (let f = 0; f < e; f++) {
          const n = _t(f / (e - 1) * s, t.duration),
            r = i > 0 ? Math.min(i, n / Math.max(1e-6, t.duration) * i) : 0,
            flooredValue = Math.floor(r),
            u = Math.min(i, flooredValue + 1),
            w = r - flooredValue,
            d = i > 0 ? r / i : 0;
          t.tracks.forEach((track, index) => {
            const s = Dt(track),
              e = o[index].offset + f * s;
            if ("rotation" === track.kind) {
              let n = 0,
                s = 0,
                r = 0,
                o = 0;
              const f = track.offset + 4 * flooredValue,
                p = track.offset + 4 * u,
                m = c[f] * c[p] + c[f + 1] * c[p + 1] + c[f + 2] * c[p + 2] + c[f + 3] * c[p + 3] < 0 ? -1 : 1;
              n = c[f] * (1 - w) + c[p] * w * m, s = c[f + 1] * (1 - w) + c[p + 1] * w * m, r = c[f + 2] * (1 - w) + c[p + 2] * w * m, o = c[f + 3] * (1 - w) + c[p + 3] * w * m;
              const y = Math.hypot(n, s, r, o) || 1;
              jt(c, track.offset, track.offset + 4 * i, d, Ut), Rt(Ut, n / y, s / y, r / y, o / y, h, float32Values, e);
            } else for (let r = 0; r < s; r++) {
              const n = c[track.offset + r] + (c[track.offset + i * s + r] - c[track.offset + r]) * d,
                o = c[track.offset + flooredValue * s + r] * (1 - w) + c[track.offset + u * s + r] * w;
              float32Values[e + r] = track.kind ? n + (o - n) * h : o;
            }
          });
        }
        return {
          ...t,
          name: `${t.name}_Heavy`,
          duration: s,
          frames: e,
          loop: !1,
          tracks: o,
          events: [],
          samples: float32Values
        };
      }(o));
      const c = {
        ...i,
        name: xt.state,
        fullPath: `${t.layers[0]?.name ?? "Base Layer"}.${xt.state}`,
        transitions: [],
        tree: i.tree.map(item => item.clip === r ? {
          ...item,
          clip: a
        } : item)
      };
      return {
        ...t,
        clips: [...t.clips, a],
        machines: t.machines.map((item, index) => index === s ? {
          ...item,
          states: [...item.states, c]
        } : item)
      };
    }(u, _lookupMap)), Ot(n.weaponIndex, n.animators, lookupMap, _lookupMap, n.nodes), {
      data: n,
      meshes: new Map(a),
      clips: _lookupMap,
      controllers: lookupMap,
      textures: new Map(h)
    };
  })(), dn.set(t, n)), n;
}
var An = new WeakMap();
function $n(t, n) {
  An.set(t, n);
}
function Sn(t) {
  const n = t >= 0 ? $(t) : void 0;
  return n ? [n.skinName, n.isTextureRaw] : [null, !1];
}
async function gn(t, n, s = !1, e = "first") {
  const i = t.data,
    r = z(n),
    o = L(n),
    a = U(n) && !!o,
    c = An.get(t);
  if (c && a) {
    if (c(null, s, "frame", o)) return void C(t.object);
  } else if (c) {
    const i = n ? await wn(n, e) : null;
    if (n && !i) return;
    if (c(i && r ? R(i) : i, s, r ? "box" : void 0, o)) return void C(t.object);
  }
  for (const d of t.meshes) d && N(d);
  if (r) {
    const s = await wn(n, e);
    if (!s) return;
    const i = H(O({
      color: [1, 1, 1, 1],
      smoothness: .5,
      metallic: 0,
      map: R(s)
    }), o, !0);
    return void (j(t, i) && C(t.object));
  }
  if (a) {
    if (i.renderers.forEach((item, index) => {
      const e = t.meshes[index];
      if (!e) return;
      const i = item.materials.map(_item3 => kn(_item3, t.rig));
      e.material = i.length > 1 ? i : i[0];
    }), await gn(t, null, !1, e), F(t, t => V(t, o, W))) {
      for (const n of t.meshes) if (n) for (const t of Array.isArray(n.material) ? n.material : [n.material]) B(t, n.geometry);
      C(t.object);
    }
    return;
  }
  const h = n || i.defaultSkin;
  if (!h) return;
  const f = (i.behaviours.find(item => 0 === item.node && item.data && Array.isArray(item.data.weaponRenderers))?.data?.weaponRenderers ?? []).map(item => item?.node).filter(item => "number" == typeof item);
  if (!f.length) return;
  const l = await wn(h, e);
  if (!l) return;
  const u = i.renderers.findIndex(item => item.node === f[0]);
  let w;
  if (!n || s) w = O({
    color: [1, 1, 1, 1],
    smoothness: .5,
    metallic: 0,
    map: l
  });else {
    const n = i.skinMaterial && kn(i.skinMaterial, t.rig) || t.meshes[u]?.material;
    if (!n) return;
    w = W(n), q(w, l);
  }
  n && H(w, o), i.renderers.forEach((item, index) => {
    const i = t.meshes[index];
    f.includes(item.node) && i && (i.material = w, n && "antique" === o && B(w, i.geometry));
  }), C(t.object);
}
function Tn(t, n) {
  return kn(t, n);
}
function bn(t, n) {
  return {
    name: t.name,
    shader: t.shader,
    color: t.color,
    map: t.texture ? n(t.texture) : null,
    mapST: [t.scale[0], t.scale[1], t.offset[0], t.offset[1]],
    metallic: t.metallic ?? 0,
    smoothness: t.smoothness ?? .5,
    emission: t.emission,
    transparent: t.transparent,
    alphaTest: t.alphaTest ?? 0,
    depthWrite: t.depthWrite ?? !0,
    unlit: /unlit/i.test(t.shader ?? ""),
    patternMask: t.patternMask ? n(t.patternMask) : null
  };
}
function kn(n, s) {
  if (!n) return En;
  let e = Jt.get(n);
  if (!e) {
    const i = s.data.materials[n];
    if (!i) return En;
    if (e = O(bn(i, t => s.textures.get(t) ?? null)), e.uniforms.uMap.value) {
      const n = e.uniforms.uMap.value;
      n.wrapS = n.wrapT = RepeatWrapping;
    }
    Jt.set(n, e);
  }
  return e;
}
var En = O({
  color: [1, 0, 1, 1]
});
function In(t, n, s, e) {
  return new MeshBasicMaterial({
    map: t,
    color: n,
    opacity: s,
    transparent: !0,
    depthWrite: !1,
    side: 2,
    forceSinglePass: !0,
    blending: e ? 2 : 1,
    toneMapped: !1,
    allowOverride: !1
  });
}
var Pn = new WeakMap();
function xn(t, n) {
  let s = Pn.get(t);
  s || Pn.set(t, s = new Map());
  let e = s.get(n);
  if (e) return e;
  e = new Map();
  const i = t.data.nodes,
    r = i[n].path;
  for (let o = 0; o < i.length; o++) {
    const t = i[o];
    if (o === n) e.set(Z(""), o);else if ("" === r || t.path.startsWith(r + "/")) {
      const n = "" === r ? t.path : t.path.slice(r.length + 1);
      e.set(Z(n), o);
    }
  }
  return s.set(n, e), e;
}
var _n = () => {},
  Dn = new Euler();
function Un(t, n) {
  Dn.setFromQuaternion(t.quaternion, t.rotation.order, !1), Dn.x = n, t.rotation.copy(Dn);
}
var jn = class {
  rig;
  object = new Group();
  nodes = [];
  meshes = [];
  animators = [];
  targets = [];
  $_50m = [];
  data;
  byPath = new Map();
  active;
  constructor(t) {
    this.rig = t;
    const n = D(),
      s = this.data = t.data;
    this.object.scale.x = -1, this.active = s.nodes.map(node => node.active), s.nodes.forEach((node, index) => {
      const s = new Bone();
      s.name = node.name, s.position.fromArray(node.t), s.quaternion.fromArray(node.r), s.scale.fromArray(node.s), s.quaternion._onChange(_n), s.visible = node.active, s.userData.rigIndex = index, this.nodes.push(s), this.byPath.set(node.path, index);
    }), s.nodes.forEach((node, index) => (node.parent >= 0 ? this.nodes[node.parent] : this.object).add(this.nodes[index]));
    for (const c of s.renderers) {
      const n = c.mesh ? t.meshes.get(c.mesh) : void 0;
      if (!n) {
        this.meshes.push(null);
        continue;
      }
      const s = c.materials.map(item => kn(item, t)),
        r = this.nodes[c.node];
      let o;
      if ("skinned" === c.type && n.geometry.getAttribute("skinIndex")) {
        const t = new SkinnedMesh(n.geometry, s.length > 1 ? s : s[0]),
          i = c.bones.map(bone => bone >= 0 ? this.nodes[bone] : new Bone()),
          a = n.bindPoses.map(item => item.clone());
        for (; a.length < i.length;) a.push(new Matrix4());
        t.bind(new Skeleton(i, a), new Matrix4()), t.frustumCulled = !1, o = t, r.add(t);
      } else o = new Mesh(n.geometry, s.length > 1 ? s : s[0]), r.add(o);
      o.visible = c.enabled, o.name = r.name + ":renderer", this.meshes.push(o);
    }
    _("rig:nodes", n);
    const r = D(),
      o = [];
    for (const e of s.components) "sprite" === e.type && e.sprite && o.push(this.$_2fx(e, t));
    this.$_5rrc = Promise.all(o).then(() => {}, () => {});
    for (const e of s.animators) {
      if (!e.controller) continue;
      const n = t.controllers.get(e.controller);
      if (!n) continue;
      const i = e.node,
        r = s.nodes[i].path,
        o = xn(t, i),
        a = {
          resolve: t => o.get(t),
          defaults: t => s.nodes[t],
          write: (t, n, s, e) => {
            const i = this.nodes[t];
            0 === n ? i.position.set(s[e], s[e + 1], s[e + 2]) : 1 === n ? i.quaternion.set(s[e], s[e + 1], s[e + 2], s[e + 3]) : i.scale.set(s[e], s[e + 1], s[e + 2]);
          },
          applyFloat: (t, n, s, e) => {
            1 === n && "m_IsActive" === s ? this.setActive(t, e > .5) : "m_Enabled" === s && this.data.renderers.forEach((item, index) => {
              item.node === t && this.meshes[index] && (this.meshes[index].visible = e > .5);
            });
          }
        },
        c = new st(n, t.clips, a);
      c.$_36i = t => {
        const n = s.nodes[t].path;
        return Z(t === i ? "" : "" === r ? n : n.slice(r.length + 1));
      }, this.animators.push(c), this.targets.push(a), this.$_50m.push(c), this.nodes[i].userData.animator = c;
    }
    _("rig:animators", r);
    const a = D();
    C(this.object), _("rig:warm", a);
  }
  $_3ta(t, n) {
    const s = this.$_50m[t];
    if (!s) return null;
    this.animators[t]?.writeDefaults();
    const e = n ? new st(n.controller, n.clips, this.targets[t]) : new st(s.controller, this.rig.clips, this.targets[t]);
    return e.$_36i = s.$_36i, this.animators[t] = e, e;
  }
  async $_2fx(t, n) {
    const [s, e, r] = await Promise.all([Xt ??= g(`${Vt}tex/sprites.json`).then(result => result.ok ? result.json() : {}).catch(() => ({})), tn(), sn(t.sprite).catch(() => null)]),
      o = s[t.sprite];
    if (!r || !o) return;
    const c = t.materials?.[0] ?? null,
      h = c && n.data.materials[c]?.shader || "",
      f = /additive/i.test(h),
      l = c && e[c] || [.5, .5, .5, .5],
      u = f ? 2 : 1,
      w = f ? l : [1, 1, 1, 1],
      d = In(r, new Color().setRGB(u * w[0] * t.color[0], u * w[1] * t.color[1], u * w[2] * t.color[2]), Math.min(1, u * w[3] * t.color[3]), f),
      p = new PlaneGeometry(o.size[0], o.size[1]).translate(o.center[0], o.center[1], 0).scale(t.flip[0] ? -1 : 1, t.flip[1] ? -1 : 1, 1),
      y = new Mesh(p, d);
    y.visible = t.enabled, y.frustumCulled = !1, y.name = this.nodes[t.node].name + ":sprite", this.nodes[t.node].add(y), this.sprites.push(y), C(y);
  }
  sprites = [];
  $_5rrc;
  index(t) {
    const n = this.byPath.get(t);
    return void 0 !== n ? n : this.data.nodes.findIndex(node => node.name === t);
  }
  node(t) {
    const n = this.index(t);
    return n >= 0 ? this.nodes[n] : void 0;
  }
  behaviour(t) {
    return this.data.behaviours.find(item => item.script === t);
  }
  setActive(t, n) {
    this.active[t] = n, this.nodes[t].visible = n;
    const s = this.followers?.get(t);
    if (s) for (const e of s) e.visible = n;
  }
  followers = null;
  $_7dt(t, n) {
    this.followers ??= new Map();
    const s = this.followers.get(t) ?? [];
    s.push(n), this.followers.set(t, s), n.visible = this.active[t];
  }
  saveState() {
    return {
      active: this.active.slice(),
      renderers: this.meshes.map(mesh => mesh?.visible ?? !1)
    };
  }
  restoreState(t) {
    for (let n = 0; n < t.active.length; n++) this.setActive(n, t.active[n]);
    for (let n = 0; n < t.renderers.length; n++) {
      const s = this.meshes[n];
      s && (s.visible = t.renderers[n]);
    }
  }
  activeInHierarchy(t) {
    for (let n = t; n >= 0; n = this.data.nodes[n].parent) if (!this.active[n]) return !1;
    return !0;
  }
  afterUpdate = null;
  update(t, n = !0) {
    for (const s of this.animators) s.update(t, n);
    this.afterUpdate?.();
  }
  dispose() {
    this.object.removeFromParent();
    for (const t of this.meshes) t instanceof SkinnedMesh && t.skeleton.dispose();
  }
};
async function Rn(t) {
  const n = await Mn(t),
    s = D(),
    e = performance.now(),
    i = new jn(n);
  return x("rig", performance.now() - e), _("rig", s), await i.$_5rrc, i;
}
export { lt as C, X as E, ct as S, Z as T, xt as _, Rn as a, Et as b, Tn as c, $n as d, Un as f, wn as g, Sn as h, Gt as i, bn as l, un as m, gn as n, yn as o, In as p, Zt as r, Mn as s, jn as t, sn as u, It as v, st as w, dt as x, Mt as y };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-B0EPN0fS.js","readableSha256":"286880362ee7362d7bd795525d22b1bb7d950c04e9d90125e0b414eced5a087a"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

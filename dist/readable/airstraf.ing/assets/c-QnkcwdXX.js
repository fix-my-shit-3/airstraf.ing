import { F as t, L as n } from "./c-DRieNrHJ.js";
import { c as o, h as r } from "./c-CN8Wxji6.js";
import { r as e } from "./c-DxipjlZ1.js";
var c = new WeakMap();
function s(t) {
  for (let n = t; n; n = n.parentElement) {
    const t = c.get(n);
    if (t) return t;
  }
  return null;
}
function a(t, n, o, r) {
  for (const e of n) r.dispatch(e, t, o);
  for (const e of r.valueListeners(t)) e(o);
}
function i(t) {
  const n = t.get("Toggle");
  n?.graphic && t.lookup(n.graphic)?.setActive(n.isOn);
}
function u(t, n, o) {
  const r = t.get("Toggle");
  if (!r) return;
  const e = r.isOn;
  r.isOn = n;
  const c = r.group ? t.lookup(r.group) : void 0;
  if (r.group && c?.activeInHierarchy && t.activeInHierarchy) {
    const n = function (t, n) {
        let o = t;
        for (; o.parent;) o = o.parent;
        return [...o.walk()].filter(item => item.get("Toggle")?.group === n);
      }(t, r.group),
      e = !!c.script("ToggleGroup")?.data?.m_AllowSwitchOff;
    if (r.isOn || !n.some(item => item.get("Toggle").isOn) && !e) {
      r.isOn = !0;
      for (const r of n) r !== t && r.get("Toggle").isOn && u(r, !1, o);
    }
  }
  e !== r.isOn && (i(t), o && a(t, r.onValueChanged, r.isOn, o));
}
function f(t, n) {
  u(t, n, null);
}
var l = t => Math.min(1, Math.max(0, t));
function h(t, n, o) {
  const r = t.get("Slider");
  if (!r) return;
  let e = Math.min(r.max, Math.max(r.min, n));
  r.step && r.step > 0 && (e = Math.min(r.max, Math.max(r.min, Math.round(e / r.step) * r.step))), r.whole && (e = Math.round(e));
  const c = e !== r.value;
  r.value = e, M(t), c && o && a(t, r.onValueChanged, e, o);
}
function M(t) {
  const n = t.get("Slider");
  if (!n) return;
  const e = n.direction === r.LeftToRight || n.direction === r.RightToLeft ? 0 : 1,
    c = n.direction === r.RightToLeft || n.direction === r.TopToBottom,
    s = function (t) {
      return t.max === t.min ? 0 : l((t.value - t.min) / (t.max - t.min));
    }(n),
    a = n.fill?.node ? t.lookup(n.fill.node) : void 0;
  if (a?.rt && a.parent) {
    const t = [0, 0],
      n = [1, 1],
      r = a.get("Image");
    r && r.type === o.Filled ? a.$_3kwd(s) : c ? t[e] = 1 - s : n[e] = s, a.rt.amin = t, a.rt.amax = n, a.$_vk4();
  }
  const i = n.handle?.node ? t.lookup(n.handle.node) : void 0;
  if (i?.rt && i.parent) {
    const t = [0, 0],
      n = [1, 1];
    t[e] = n[e] = c ? 1 - s : s, i.rt.amin = t, i.rt.amax = n, i.$_vk4();
  }
}
function v(t, n) {
  const o = t.get("Slider");
  if (!o) return;
  M(t);
  const s = o.direction === r.LeftToRight || o.direction === r.RightToLeft ? 0 : 1,
    a = o.direction === r.RightToLeft || o.direction === r.TopToBottom,
    i = pointerEvent => {
      const bounds = (() => {
        const n = o.handle?.node ? t.lookup(o.handle.node) : void 0,
          r = o.fill?.node ? t.lookup(o.fill.node) : void 0;
        return (n?.parent ?? r?.parent ?? t).el;
      })().getBoundingClientRect();
      let c = 0 === s ? (pointerEvent.clientX - bounds.left) / Math.max(1, bounds.width) : 1 - (pointerEvent.clientY - bounds.top) / Math.max(1, bounds.height);
      c = l(c), a && (c = 1 - c), h(t, o.min + c * (o.max - o.min), n);
    };
  var u, f;
  u = t.el, f = r => {
    o.interactable && h(t, o.value + r * function (t) {
      return t.step && t.step > 0 ? t.step : t.whole ? 1 : .1 * (t.max - t.min);
    }(o), n);
  }, c.set(u, f), t.el.addEventListener("pointerdown", event => {
    if (0 === event.button && o.interactable) {
      try {
        t.el.setPointerCapture(event.pointerId);
      } catch {}
      i(event), e(event, t.el), event.stopPropagation();
    }
  }), t.el.addEventListener("pointermove", event => {
    const o = event.kourPadPress;
    (t.el.hasPointerCapture(event.pointerId) || o && t.el.contains(o)) && i(event);
  });
}
var d = new WeakMap();
function p(t, n) {
  const o = d.get(t);
  return o ? (o.watchers.add(n), o.last = null, () => o.watchers.delete(n)) : () => {};
}
function g(t) {
  return d.get(t)?.state() ?? null;
}
function w(t, n) {
  d.get(t)?.scrollTo(n);
}
function m(t, n, o, r, e) {
  const c = t.rt,
    s = (t, n) => Math.abs(t[0] - n[0]) < 1e-4 && Math.abs(t[1] - n[1]) < 1e-4;
  return !(s(c.amin, n) && s(c.amax, o) && s(c.pos, r) && s(c.size, e) || (c.amin = n, c.amax = o, c.pos = r, c.size = e, t.$_vk4(), 0));
}
var T = "data-own-scroll";
function x(t, n) {
  const o = t,
    r = "function" == typeof o?.closest ? o.closest(`[${T}]`) : null;
  return !!r && r !== n && n.contains(r);
}
function S(o, r) {
  const c = o.get("ScrollRect");
  if (!c?.content) return null;
  const s = () => c.content ? o.lookup(c.content) : void 0,
    a = () => (c.viewport ? o.lookup(c.viewport) : void 0) ?? o,
    i = () => c.verticalScrollbar ? o.lookup(c.verticalScrollbar) : void 0,
    u = () => {
      const o = s();
      if (!o?.rt) return null;
      const r = n(a()),
        e = n(o);
      return {
        c: o,
        view: r,
        r: e,
        extra: Math.max(0, e.h - r.h),
        y: t(o).y - t(a()).y,
        extraX: Math.max(0, e.w - r.w),
        x: t(o).x - t(a()).x
      };
    },
    f = {
      watchers: new Set(),
      last: null,
      state: () => {
        const t = u();
        return t ? {
          top: -Math.min(0, Math.max(-t.extra, t.y)),
          view: t.view.h,
          height: t.r.h
        } : null;
      },
      scrollTo: t => {
        const n = u();
        n?.c.rt && c.vertical && (n.c.rt.pos[1] += t + n.y, n.c.$_vk4());
      }
    },
    l = s();
  l && d.set(l, f);
  const h = (t, n = 0) => {
    const o = s();
    o?.rt && (c.vertical && (o.rt.pos[1] += t), c.horizontal && (o.rt.pos[0] += n), o.$_vk4());
  };
  o.el.addEventListener("wheel", event => {
    if (!c.vertical && !c.horizontal) return;
    if (x(event.target, o.el)) return;
    const n = n => 1 === event.deltaMode ? n / 3 : n / 100,
      r = n(event.deltaY),
      e = n(event.deltaX);
    c.vertical && !c.horizontal ? h((Math.abs(e) > Math.abs(r) ? e : r) * c.scrollSensitivity) : c.horizontal && !c.vertical ? h(0, -(Math.abs(r) > Math.abs(e) ? r : e) * c.scrollSensitivity) : h(r * c.scrollSensitivity, -e * c.scrollSensitivity), event.preventDefault();
  }, {
    passive: !1
  });
  let M = null;
  o.el.addEventListener("pointerdown", pointerEvent => {
    0 !== pointerEvent.button || x(pointerEvent.target, o.el) || (M = {
      x: pointerEvent.clientX,
      y: pointerEvent.clientY
    });
  }), o.el.addEventListener("pointermove", pointerEvent => {
    if (null === M || !(1 & pointerEvent.buttons)) return;
    const r = Math.max(.01, o.el.getBoundingClientRect().height / Math.max(1, n(o).h));
    h(-(pointerEvent.clientY - M.y) / r, (pointerEvent.clientX - M.x) / r), M = {
      x: pointerEvent.clientX,
      y: pointerEvent.clientY
    };
  }), addEventListener("pointerup", () => M = null);
  const v = i();
  if (v) {
    const t = t => {
      const n = u();
      if (!n || n.extra <= 0) return;
      const bounds = v.el.getBoundingClientRect(),
        r = Math.min(1, Math.max(0, (t.clientY - bounds.top) / Math.max(1, bounds.height)));
      h(n.y + r * n.extra);
    };
    v.el.addEventListener("pointerdown", event => {
      0 === event.button && (v.el.setPointerCapture(event.pointerId), t(event), e(event, v.el), event.stopPropagation());
    }), v.el.addEventListener("pointermove", event => {
      v.el.hasPointerCapture(event.pointerId) && t(event);
    });
  }
  return () => {
    let t = (() => {
      const t = a(),
        r = i(),
        e = s();
      if (2 !== c.verticalVisibility) return !1;
      if (t === o || !t.rt || !e) return !1;
      let u = m(t, [0, 0], [1, 1], [0, 0], [-(n(e).h > n(o).h + .01 && r?.rt ? n(r).w + (c.verticalSpacing ?? 0) : 0), 0]);
      return r?.rt && (u = m(r, [r.rt.amin[0], 0], [r.rt.amax[0], 1], [r.rt.pos[0], 0], [r.rt.size[0], 0]) || u), u;
    })();
    const r = u();
    if (!r) return t;
    const e = Math.min(0, Math.max(-r.extra, r.y));
    ((t, n, o) => {
      if (!f.watchers.size) return !1;
      const r = f.last;
      if (r && Math.abs(r.top - t) < .001 && Math.abs(r.view - n) < .001 && r.height === o) return !1;
      const e = {
        top: t,
        view: n,
        height: o
      };
      f.last = e;
      let c = !1;
      for (const s of f.watchers) s(e) && (c = !0);
      return c;
    })(-e, r.view.h, r.r.h) && (t = !0), c.vertical && Math.abs(e - r.y) > .001 && (r.c.rt.pos[1] -= e - r.y, r.c.$_vk4(), t = !0);
    const l = Math.min(0, Math.max(-r.extraX, r.x));
    c.horizontal && Math.abs(l - r.x) > .001 && (r.c.rt.pos[0] += l - r.x, r.c.$_vk4(), t = !0);
    const h = i();
    if (h) {
      0 !== c.verticalVisibility && h.activeSelf !== r.extra > .5 && (h.setActive(r.extra > .5), t = !0);
      const n = h.get("Scrollbar")?.handle,
        o = n ? h.lookup(n) : void 0;
      if (o?.rt) {
        const n = r.extra > 0 ? Math.max(.05, r.view.h / r.r.h) : 1,
          c = (r.extra > 0 ? 1 + e / r.extra : 1) * (1 - n);
        (Math.abs(o.rt.amin[1] - c) > 1e-4 || Math.abs(o.rt.amax[1] - c - n) > 1e-4) && (o.rt.amin[1] = c, o.rt.amax[1] = c + n, o.$_vk4(), t = !0);
      }
    }
    return t;
  };
}
export { w as a, u as c, s as d, i, f as l, S as n, g as o, v as r, h as s, T as t, p as u };

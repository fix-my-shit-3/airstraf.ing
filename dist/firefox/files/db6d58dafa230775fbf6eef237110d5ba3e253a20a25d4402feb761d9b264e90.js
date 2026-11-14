var t = .5;
function e(t) {
  for (let e = t ?? null; e; e = e.parentElement) {
    const t = e.style?.zIndex || ("function" == typeof getComputedStyle ? getComputedStyle(e).zIndex : ""),
      n = Number(t);
    if (t && "auto" !== t && Number.isFinite(n)) return n;
  }
  return 0;
}
var n = class {
    stack;
    spec;
    raised = null;
    constructor(t, e) {
      this.stack = t, this.spec = e;
    }
    get name() {
      return this.spec.name;
    }
    get isOpen() {
      return this.stack.has(this);
    }
    open() {
      return this.stack.add(this), this;
    }
    close() {
      this.stack.remove(this);
    }
    set(t) {
      t ? this.open() : this.close();
    }
    z() {
      if (null !== this.raised) return this.raised;
      const t = this.spec.z;
      return "function" == typeof t ? t() : "number" == typeof t ? t : e(this.spec.element?.());
    }
    place(t) {
      const e = this.spec.front;
      if (!e) return;
      const n = t ?? e.base;
      this.raised = n === e.base ? null : n, e.apply(n);
    }
  },
  s = new class {
    entries = new Map();
    seq = 0;
    listeners = [];
    layer(t) {
      return new n(this, t);
    }
    has(t) {
      return this.entries.has(t);
    }
    add(t) {
      const e = t.spec.front;
      e && t.place(this.frontZ(t, e.base)), this.entries.set(t, ++this.seq), this.changed();
    }
    remove(t) {
      this.entries.delete(t) && (t.place(null), this.changed());
    }
    frontZ(t, e) {
      let n = -1 / 0;
      for (const s of this.entries.keys()) {
        if (s === t || s.spec.passive || s.spec.showing && !s.spec.showing()) continue;
        const e = s.z();
        e >= 40 && e <= 59 && e > n && (n = e);
      }
      return n >= e ? Math.min(Math.floor(n) + 1, 59) : e;
    }
    onChange(t) {
      return this.listeners.push(t), () => {
        this.listeners = this.listeners.filter(item => item !== t);
      };
    }
    changed() {
      for (const t of this.listeners) t();
    }
    get size() {
      return this.entries.size;
    }
    layers() {
      for (const e of this.entries.keys()) e.spec.showing && !e.spec.showing() && (this.entries.delete(e), e.place(null));
      const t = [...this.entries.keys()].map(item => ({
        layer: item,
        z: item.z(),
        seq: this.entries.get(item),
        el: item.spec.element?.() ?? null
      }));
      return t.sort((leftItem, rightItem) => leftItem.z !== rightItem.z ? rightItem.z - leftItem.z : leftItem.el && rightItem.el && leftItem.el !== rightItem.el && leftItem.el.isConnected && rightItem.el.isConnected ? 4 & leftItem.el.compareDocumentPosition(rightItem.el) ? 1 : -1 : rightItem.seq - leftItem.seq), t.map(item => item.layer);
    }
    top() {
      return this.layers()[0] ?? null;
    }
    back() {
      for (const t of this.layers()) if (!1 !== t.spec.back()) return t;
      return null;
    }
  }();
function r(t = s, eventTarget = window) {
  const n = e => {
    const event = e;
    "Escape" === event.key && (event.repeat ? t.size && (event.preventDefault(), event.stopImmediatePropagation()) : t.back() && (event.preventDefault(), event.stopImmediatePropagation()));
  };
  return eventTarget.addEventListener("keydown", n, {
    capture: !0
  }), () => eventTarget.removeEventListener("keydown", n, {
    capture: !0
  });
}
function i(t, e, ...n) {
  return {
    get base() {
      return "function" == typeof t ? t() : t;
    },
    apply: t => {
      for (const s of [e, ...n]) {
        const e = s();
        e && (e.style.zIndex = String(t));
      }
    }
  };
}
function o(t, e, n = s) {
  const r = n.layer({
      ...e,
      element: () => t
    }),
    i = () => r.set(!t.hidden && t.isConnected);
  return "undefined" != typeof MutationObserver && new MutationObserver(i).observe(t, {
    attributes: !0,
    attributeFilter: ["hidden"]
  }), i(), r;
}
function u(eventTarget, n = () => eventTarget.blur(), r = s) {
  const i = r.layer({
      name: "text-field",
      z: () => e(eventTarget) + .5,
      element: () => eventTarget,
      back: () => {
        n();
      },
      showing: () => "undefined" == typeof document || eventTarget.isConnected && document.activeElement === eventTarget
    }),
    o = () => i.open(),
    u = () => i.close();
  return eventTarget.addEventListener("focus", o), eventTarget.addEventListener("blur", u), "undefined" != typeof document && document.activeElement === eventTarget && i.open(), () => {
    eventTarget.removeEventListener("focus", o), eventTarget.removeEventListener("blur", u), i.close();
  };
}
export { r as a, o as i, i as n, u as o, e as r, s, t };

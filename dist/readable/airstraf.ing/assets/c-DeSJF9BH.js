import { i as t, n as o } from "./c-ByodlC33.js";
import { t as n } from "./c-Clm_iQHR.js";
var i = null,
  e = () => !0;
function s(t, o = () => !0) {
  i = t, e = o;
}
function r(t) {
  i?.(t);
}
function c(t, o) {
  const n = t instanceof Element ? t.closest('button:not([data-silent]), [role="button"]:not([data-silent])') : null;
  return n && o.contains(n) && !n.disabled ? n : null;
}
function u(eventTarget) {
  const o = o => {
      const n = c(o.target, eventTarget);
      n && !n.contains(o.relatedTarget) && r("button-pointer-enter");
    },
    n = o => {
      const n = c(o.target, eventTarget);
      n && !n.contains(o.relatedTarget) && r("button-pointer-exit");
    },
    i = o => {
      0 === o.button && c(o.target, eventTarget) && r("button-pointer-down");
    },
    e = o => {
      0 === o.button && c(o.target, eventTarget) && r("button-pointer-up");
    };
  return eventTarget.addEventListener("pointerover", o), eventTarget.addEventListener("pointerout", n), eventTarget.addEventListener("pointerdown", i), eventTarget.addEventListener("pointerup", e), () => {
    eventTarget.removeEventListener("pointerover", o), eventTarget.removeEventListener("pointerout", n), eventTarget.removeEventListener("pointerdown", i), eventTarget.removeEventListener("pointerup", e);
  };
}
var a = (t, o = "") => `kour-btn kour-btn--${t}${o ? ` ${o}` : ""}`;
function d(t, o, n = {}) {
  const element = document.createElement("button");
  element.type = "button", element.className = a(o, n.className), element.textContent = t;
  for (const [e, s] of Object.entries(n.data ?? {})) element.dataset[e] = s;
  return n.onClick && element.addEventListener("click", n.onClick), element;
}
var l = class {
  o;
  root;
  card;
  header;
  side;
  layer;
  rescale;
  ticket = 0;
  constructor(i) {
    this.o = i;
    const e = this.root = document.createElement("div");
    e.className = `kour-dom ${i.className}`, e.hidden = !0, void 0 !== i.z && (e.style.zIndex = String(i.z));
    const element = document.createElement("div");
    element.className = "kour-dom-backdrop", !1 !== i.backdropCloses && (element.dataset.close = "");
    const r = this.card = document.createElement("section");
    if (r.className = "kour-dom-card" + (i.cardClass ? ` ${i.cardClass}` : ""), r.setAttribute("role", "dialog"), r.setAttribute("aria-label", i.title || i.name), this.header = null, this.side = null, !i.noHeader) {
      const t = this.header = document.createElement("header");
      t.className = "kour-dom-top";
      const o = d("X", "red", {
        className: "kour-close",
        data: {
          close: ""
        }
      });
      if (o.setAttribute("aria-label", "Close"), t.append(o), i.iconUrl) {
        const _element2 = document.createElement("img");
        _element2.className = "kour-dom-icon", _element2.src = i.iconUrl, _element2.alt = "", _element2.draggable = !1, t.append(_element2);
      }
      const _element = document.createElement("h2");
      _element.className = "kour-dom-title", _element.textContent = i.title;
      const e = this.side = document.createElement("span");
      e.className = "kour-dom-side", t.append(_element, e), r.append(t);
    }
    e.append(element, r), (i.parent ?? document.body).append(e), this.rescale = n(e, {
      min: i.min ?? null
    });
    for (const t of ["keydown", "keyup", "keypress"]) e.addEventListener(t, event => event.stopPropagation());
    e.addEventListener("click", event => {
      event.target.closest?.("[data-close]") && this.back();
    }), u(e), this.layer = t(e, {
      name: i.name,
      ...(void 0 !== i.z ? {
        z: i.z
      } : {}),
      front: o(i.z ?? 44, () => e),
      back: () => this.back()
    });
  }
  back() {
    this.o.back ? this.o.back() : this.close();
  }
  get visible() {
    return !this.root.hidden;
  }
  setTitle(t) {
    const element = this.header?.querySelector(".kour-dom-title");
    element && (element.textContent = t);
  }
  async show(t) {
    const o = ++this.ticket,
      n = this.root;
    n.hidden = !1, n.style.visibility = "hidden", n.classList.remove("is-open"), this.rescale();
    const i = t?.();
    await async function (t, o, n = 300) {
      let i = 0;
      const promise = new Promise(t => i = window.setTimeout(() => t("timeout"), n)),
        s = (async () => {
          o && "function" == typeof o.then && (await Promise.resolve(o).catch(() => {}));
          const n = [...t.querySelectorAll("img")].filter(item => !item.complete);
          return await Promise.all(n.map(item => item.decode().catch(() => {}))), "ready";
        })(),
        r = await Promise.race([s, promise]);
      return clearTimeout(i), r;
    }(this.card, i), o !== this.ticket || n.hidden || (n.style.visibility = "", e() && (n.offsetWidth, n.classList.add("is-open")));
  }
  close() {
    this.ticket++, this.root.hidden = !0, this.root.style.visibility = "", this.root.classList.remove("is-open");
  }
  el(t) {
    return this.root.querySelector(t);
  }
};
export { s as a, u as i, d as n, a as r, l as t };

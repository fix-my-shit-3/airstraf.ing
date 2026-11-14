var r = ["solid", "gradient", "animated", "rainbow", "glow", "custom", "shine", "fatality", "neon", "glitch", "fire", "pulse"],
  e = /^[0-9A-F]{6}([0-9A-F]{2})?$/;
function n(n) {
  const o = r.includes(n.effect) ? n.effect : "solid",
    a = Array.isArray(n.colors) ? n.colors.filter(item => "string" == typeof item && e.test(item)) : [];
  return {
    id: Number(n.id),
    key: String(n.key ?? ""),
    label: String(n.label ?? ""),
    effect: o,
    colors: a,
    angle: Number.isFinite(Number(n.angle)) ? Number(n.angle) : 90,
    speed: Number.isFinite(Number(n.speed)) ? Number(n.speed) : 1,
    glow: "string" == typeof n.glow && e.test(n.glow) ? n.glow : null,
    data: n.data && "object" == typeof n.data ? n.data : {}
  };
}
function o(r) {
  if (!r) return null;
  const n = function (r) {
    if (!r) return null;
    for (const e of l) if (r.id === c[e].id && r.key === e) return e;
    return null;
  }(r);
  if (n) return n;
  const o = [r.effect, String(Math.round(r.angle)), String(+r.speed.toFixed(3)), r.colors.filter(item => e.test(item)).join(".")];
  return r.glow && e.test(r.glow) && o.push(r.glow), o.join("|");
}
function a(r, e) {
  const n = o(e);
  return n ? `<namestyle=${n}>${r}</namestyle>` : r;
}
var t = "silver",
  i = "letters",
  s = "gold",
  u = "bronze",
  l = [t, s, u],
  c = {
    silver: {
      id: -1,
      key: t,
      label: "Silver",
      effect: "gradient",
      colors: ["FFFFFF", "E4E8ED", "A9B0BA", "737A85", "FFFFFF", "C3C9D1", "8D95A0", "6F7782"],
      angle: 168,
      speed: 1,
      glow: null,
      data: {
        stops: [18, 32, 46, 54, 57, 66, 80, 96]
      }
    },
    gold: {
      id: -2,
      key: s,
      label: "Gold",
      effect: "shine",
      colors: ["FFF6C8", "FFE27A", "F2B630", "B27A12", "FFF0A8", "F5C842", "D19A1E", "A06A0C"],
      angle: 168,
      speed: .4,
      glow: null,
      data: {
        stops: [18, 32, 46, 54, 57, 66, 80, 96]
      }
    },
    bronze: {
      id: -3,
      key: u,
      label: "Bronze",
      effect: "gradient",
      colors: ["FFE0C2", "E8A878", "C47A45", "8A4F26", "F5C59A", "D18D5A", "A8642F", "7A4420"],
      angle: 168,
      speed: 1,
      glow: null,
      data: {
        stops: [18, 32, 46, 54, 57, 66, 80, 96]
      }
    }
  },
  f = r => "string" == typeof r && l.includes(r) ? c[r] : null;
function F(r) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const n of r.slice(0, 16)) {
    const {
      i: r,
      s: o
    } = n ?? {};
    "number" != typeof r || !Number.isInteger(r) || r < 0 || "string" == typeof o && /^[a-z0-9_-]{1,32}$/.test(o) && e.push({
      i: r,
      s: o
    });
  }
  return e;
}
function k(r, e) {
  if (!e?.length) return [];
  const n = Array.from(r).length,
    uniqueItems = new Set(),
    t = [];
  for (const i of e) !i || !Number.isInteger(i.index) || i.index < 0 || i.index >= n || !uniqueItems.has(i.index) && o(i.style) && (uniqueItems.add(i.index), t.push({
    index: i.index,
    style: i.style
  }));
  return t.sort((leftItem, rightItem) => leftItem.index - rightItem.index);
}
function d(r, e) {
  const n = [];
  for (const o of r) {
    const r = f(o.s) ?? e.get(o.s);
    r && n.push({
      index: o.i,
      style: r
    });
  }
  return n;
}
function g(r, e, n) {
  const t = k(r, n);
  if (!t.length) return a(r, e);
  const arrayValues = Array.from(r);
  for (const o of t) arrayValues[o.index] = a(arrayValues[o.index], o.style);
  return `<namestyle=${o(e) ?? "letters"}>${arrayValues.join("")}</namestyle>`;
}
var m = "@keyframes kour-name-scroll{from{background-position:0% 50%}to{background-position:200% 50%}}@keyframes kour-name-shine{0%{background-position:100% 0,0 0}60%,100%{background-position:0% 0,0 0}}@property --kour-fx-t{syntax:'<angle>';inherits:false;initial-value:0deg}@property --kour-fx-p{syntax:'<number>';inherits:false;initial-value:1}@property --kour-fx-g{syntax:'<number>';inherits:false;initial-value:0}@keyframes kour-name-orbit{from{--kour-fx-t:0deg}to{--kour-fx-t:360deg}}@keyframes kour-name-neon{from{--kour-fx-p:0.35}to{--kour-fx-p:1}}@keyframes kour-name-glitch{0%,16%,58%,100%{--kour-fx-g:0}8%{--kour-fx-g:1}12%{--kour-fx-g:-0.6}52%{--kour-fx-g:0.5}55%{--kour-fx-g:-1}}@keyframes kour-name-rise{from{background-position:0% 0%}to{background-position:0% 200%}}@keyframes kour-name-breathe{from{opacity:1}to{opacity:0.55}}",
  p = {
    orbit: .075,
    glitch: .07,
    neonMin: .35,
    neonBlur: .22,
    neonCore: .05,
    fireGlow: .16,
    breathe: .55
  };
function b(r) {
  const e = (r % 1 + 1) % 1;
  return e < .08 ? 0 : e < .12 ? 1 : e < .16 ? -.6 : e < .52 ? 0 : e < .55 ? .5 : e < .58 ? -1 : 0;
}
var x = r => `#${r}`;
function y(r) {
  if (!r) return {};
  const e = r.colors.map(x),
    n = (1 / Math.max(.05, r.speed)).toFixed(2),
    o = r.data.stops,
    a = Array.isArray(o) && o.length === e.length && o.every(item => Number.isFinite(item)),
    t = (n, t = "100%") => ({
      backgroundImage: `linear-gradient(${r.angle}deg, ${n.map((item, index) => a && n === e ? `${item} ${Number(o[index])}%` : item).join(", ")})`,
      backgroundSize: `${t} 100%`,
      backgroundClip: "text",
      webkitBackgroundClip: "text",
      color: "transparent"
    });
  switch (r.effect) {
    case "solid":
    case "custom":
      return e[0] ? {
        color: e[0]
      } : {};
    case "gradient":
      return e.length > 1 ? t(e) : e[0] ? {
        color: e[0]
      } : {};
    case "animated":
      return e.length < 2 ? e[0] ? {
        color: e[0]
      } : {} : {
        ...t([...e, e[0]], "200%"),
        animation: `kour-name-scroll ${n}s linear infinite`
      };
    case "rainbow":
      return {
        ...t(["#FF4040", "#FFD040", "#40FF60", "#40C0FF", "#C040FF", "#FF4040"], "200%"),
        animation: `kour-name-scroll ${n}s linear infinite`
      };
    case "glow":
      return {
        ...(e.length > 1 ? t(e) : e[0] ? {
          color: e[0]
        } : {}),
        filter: `drop-shadow(0 0 0.25em ${r.glow ? x(r.glow) : e[0] ?? "#FFFFFF"})`
      };
    case "shine":
      return {
        backgroundImage: `linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.9) 50%, transparent 58%), ${t(e.length > 1 ? e : [e[0] ?? "#FFFFFF", e[0] ?? "#FFFFFF"]).backgroundImage}`,
        backgroundSize: "300% 100%, 100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundClip: "text",
        webkitBackgroundClip: "text",
        color: "transparent",
        animation: `kour-name-shine ${n}s ease-in-out infinite`
      };
    case "fatality":
      {
        const r = p.orbit,
          o = e => `calc(cos(var(--kour-fx-t)) * ${e * r}em) calc(sin(var(--kour-fx-t)) * ${e * r}em)`;
        return {
          color: e[0] ?? "#FFFFFF",
          "--kour-fx-a": e[1] ?? "#FF2BD6",
          "--kour-fx-b": e[2] ?? "#21E6FF",
          filter: `drop-shadow(${o(1)} 0 var(--kour-fx-a)) drop-shadow(${o(-1)} 0 var(--kour-fx-b))`,
          animation: `kour-name-orbit ${n}s linear infinite`
        };
      }
    case "neon":
      {
        const o = r.glow ? x(r.glow) : e[1] ?? e[0] ?? "#00E5FF";
        return {
          color: e[0] ?? "#FFFFFF",
          "--kour-fx-a": o,
          filter: `drop-shadow(0 0 calc(${p.neonCore}em + var(--kour-fx-p) * ${p.neonBlur}em) var(--kour-fx-a)) drop-shadow(0 0 calc(var(--kour-fx-p) * ${p.neonCore}em) var(--kour-fx-a))`,
          animation: `kour-name-neon ${n}s ease-in-out infinite alternate`
        };
      }
    case "glitch":
      {
        const r = p.glitch;
        return {
          color: e[0] ?? "#FFFFFF",
          "--kour-fx-a": e[1] ?? "#FF2A4D",
          "--kour-fx-b": e[2] ?? "#2AE8FF",
          filter: `drop-shadow(calc(var(--kour-fx-g) * ${r}em) 0 0 var(--kour-fx-a)) drop-shadow(calc(var(--kour-fx-g) * ${-r}em) 0 0 var(--kour-fx-b))`,
          animation: `kour-name-glitch ${n}s steps(1, end) infinite`
        };
      }
    case "fire":
      {
        const o = e.length > 1 ? e : ["#FFF6B0", "#FFC233", "#FF7A1A", "#E5321C"],
          a = r.glow ? x(r.glow) : o[Math.min(2, o.length - 1)];
        return {
          backgroundImage: `linear-gradient(0deg, ${[...o, o[0]].join(", ")})`,
          backgroundSize: "100% 200%",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
          color: "transparent",
          filter: `drop-shadow(0 0 ${p.fireGlow}em ${a})`,
          animation: `kour-name-rise ${n}s linear infinite`
        };
      }
    case "pulse":
      return {
        ...(e.length > 1 ? t(e) : e[0] ? {
          color: e[0]
        } : {}),
        animation: `kour-name-breathe ${n}s ease-in-out infinite alternate`
      };
  }
}
export { m as a, f as c, n as d, o as f, p as i, F as l, g as m, l as n, b as o, d as p, r, k as s, i as t, y as u };

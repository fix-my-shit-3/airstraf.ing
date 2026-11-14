import { t as e } from "./c-CwMHWVDn.js";
import { D as n, d as t } from "./c-DTYKuKMs.js";
import { i as a, o, t as r } from "./c-Br-l5PAG.js";
import { t as s } from "./c-ycaScJyf.js";
import "./c-B0cRM3KE.js";
import { b as i } from "./c-CN8Wxji6.js";
import { _ as c, r as l } from "./c-BLzjMcqR.js";
import { a as f, i as u } from "./c-Cc7HakJX.js";
import { n as p } from "./c-D_UdFaKB.js";
import { r as d } from "./c-DWXBoQqt.js";
import { a as m, c as h, i as w, l as b, r as k, t as g } from "./c-BK5Oi6qK.js";
import { a as v, n as y, o as _ } from "./c-CISf5kK1.js";
import { t as x } from "./c-D8Hcbz4W.js";
import { a as S } from "./c-DeSJF9BH.js";
var $ = {
    source: "Profile pictures and map banners of the rebuild (user request 2026-10-21: more profile pictures - chickens, map secrets, a zombie, the nuke, flags, weapons - some free, some unlockable; unlockable banners of the maps). Not original data. The original's 12 class pictures (ProfilePictures.picturePaths P0..P11) keep the indices 0..11; these follow from index 12 on, rendered in the style of the original pictures by tools/render-profile-pictures.mjs (apps/client/icons.html) into assets-custom/stream/profile-pictures/{id}.png (render kind 'stream': an existing content stream picture, the Zombie skin's icon). `goals`: any one of them unlocks the picture (empty: free); `stat` is a column of public.player_stats, 'level' (the account level of total_score; FB26 \"Lets Nuke!\", drawn by the user: assets-custom/stream/profile-pictures/lets-nuke.png) or 'class_level' (highest class level, or that of `class`) / 'map_secrets' (maps whose secrets were all found). Map banners: one per map of MAP_CATALOG, its picture rendered by tools/render-map-banners.ts into assets-custom/stream/profile-banners/; earned with `wins` won matches on the map (maps whose matches end) or `runs` finished runs (ParKour / Surf), counted by the map's challenges. Read by packages/shared/src/profile-pictures.ts / profile-cosmetics.ts and tools/challenge-catalog.mjs (Supabase catalog: private.profile_cosmetic_catalog, private.picture_goals, private.map_banner_goals).",
    originalPictures: 12,
    pictures: [{
      index: 12,
      id: "chicken",
      name: "Chicken",
      rarity: 0,
      render: {
        kind: "chicken",
        variant: "normal"
      },
      goals: []
    }, {
      index: 13,
      id: "chick",
      name: "Chick",
      rarity: 0,
      render: {
        kind: "chicken",
        variant: "chick"
      },
      goals: []
    }, {
      index: 14,
      id: "flag-yellow",
      name: "Yellow Flag",
      rarity: 0,
      render: {
        kind: "flag",
        team: 1
      },
      goals: []
    }, {
      index: 15,
      id: "flag-blue",
      name: "Blue Flag",
      rarity: 0,
      render: {
        kind: "flag",
        team: 2
      },
      goals: []
    }, {
      index: 16,
      id: "ak47",
      name: "AK-47",
      rarity: 0,
      render: {
        kind: "weapon",
        weapon: "ak47"
      },
      goals: []
    }, {
      index: 17,
      id: "bayonet",
      name: "Bayonet",
      rarity: 0,
      render: {
        kind: "weapon",
        weapon: "bayonet"
      },
      goals: []
    }, {
      index: 18,
      id: "chickaletta",
      name: "Chickaletta",
      rarity: 2,
      render: {
        kind: "chicken",
        variant: "pink"
      },
      goals: [{
        stat: "chicken_kills",
        min: 100
      }, {
        stat: "chickalettas_killed",
        min: 1
      }]
    }, {
      index: 19,
      id: "kyle",
      name: "Kyle",
      rarity: 3,
      render: {
        kind: "chicken",
        variant: "red"
      },
      goals: [{
        stat: "chicken_kills",
        min: 500
      }, {
        stat: "kyles_killed",
        min: 1
      }]
    }, {
      index: 20,
      id: "kebin",
      name: "Kebin",
      rarity: 4,
      render: {
        kind: "chicken",
        variant: "green"
      },
      goals: [{
        stat: "chicken_kills",
        min: 2e3
      }, {
        stat: "kebins_killed",
        min: 1
      }]
    }, {
      index: 21,
      id: "secret",
      name: "Map Secret",
      rarity: 2,
      render: {
        kind: "secret"
      },
      goals: [{
        stat: "map_secrets",
        min: 1
      }]
    }, {
      index: 22,
      id: "zombie",
      name: "Zombie",
      rarity: 2,
      render: {
        kind: "stream",
        path: "characters/icons/102"
      },
      goals: [{
        stat: "zombie_max_round",
        min: 10
      }]
    }, {
      index: 23,
      id: "nuke",
      name: "Nuke",
      rarity: 3,
      render: {
        kind: "nuke"
      },
      goals: [{
        stat: "nukes",
        min: 1
      }]
    }, {
      index: 24,
      id: "awp",
      name: "AWP",
      rarity: 1,
      render: {
        kind: "weapon",
        weapon: "awp"
      },
      goals: [{
        stat: "max_kill_streak",
        min: 15
      }]
    }, {
      index: 25,
      id: "rpg",
      name: "RPG",
      rarity: 1,
      render: {
        kind: "weapon",
        weapon: "rpg"
      },
      goals: [{
        stat: "class_level",
        min: 10,
        class: 4
      }]
    }, {
      index: 26,
      id: "butterfly",
      name: "Butterfly",
      rarity: 3,
      render: {
        kind: "weapon",
        weapon: "butterfly"
      },
      goals: [{
        stat: "class_level",
        min: 20
      }]
    }, {
      index: 27,
      id: "ak47-gold",
      name: "Golden AK-47",
      rarity: 4,
      render: {
        kind: "weapon",
        weapon: "ak47",
        skin: "akgold"
      },
      goals: [{
        stat: "games_won",
        min: 100
      }]
    }, {
      index: 28,
      id: "lets-nuke",
      name: "Lets Nuke!",
      rarity: 4,
      render: {
        kind: "stream",
        path: "profile-pictures/lets-nuke"
      },
      goals: [{
        stat: "level",
        min: 100
      }]
    }],
    mapBanner: {
      rarity: 2,
      wins: 5,
      runs: 5
    },
    mapBanners: [{
      map: "map0",
      name: "Havana"
    }, {
      map: "map1",
      name: "Snowstorm"
    }, {
      map: "map2",
      name: "New Town"
    }, {
      map: "map3",
      name: "Kour House"
    }, {
      map: "map4",
      name: "Ghost Town"
    }, {
      map: "map5",
      name: "Legion HQ"
    }, {
      map: "map6",
      name: "Surf"
    }, {
      map: "map7",
      name: "Kour2"
    }, {
      map: "map8",
      name: "OldStorm"
    }, {
      map: "map11",
      name: "Skyline"
    }, {
      map: "map12",
      name: "Blockyard",
      retired: !0
    }, {
      map: "map13",
      name: "KourCraft",
      retired: !0
    }, {
      map: "map14",
      name: "ParKour"
    }, {
      map: "map15",
      name: "UnderKour"
    }, {
      map: "map16",
      name: "Kourage"
    }, {
      map: "map18",
      name: "Crystal Kour"
    }, {
      map: "map19",
      name: "ParKour 2"
    }, {
      map: "map20",
      name: "Rusty",
      retired: !0
    }, {
      map: "map21",
      name: "Cargo Bay"
    }, {
      map: "map22",
      name: "Lighthouse"
    }, {
      map: "map23",
      name: "Oasis"
    }, {
      map: "map24",
      name: "Jungle"
    }, {
      map: "map25",
      name: "Canyon"
    }, {
      map: "map27",
      name: "Surf_Shape"
    }, {
      map: "map28",
      name: "Sumo Temple"
    }, {
      map: "map29",
      name: "Combat Surf Kitsune"
    }],
    artBannersNote: "FB34 (user request: s!l3nt's loading screen 'soll auch als banner freischaltbar sein, nachdem man 200 chickens getötet hat'): banners that show an artwork over the whole card like a map banner (picture assets-custom/stream/profile-banners/{id}.png, written by tools/build-loading-screens.py), earned by `goals` on the player's statistics exactly like a picture's (any one of them; private.banner_goals).",
    artBanners: [{
      id: "art-chickengang",
      name: "Chicken Gang Banner",
      rarity: 1,
      credit: "s!l3nt",
      goals: [{
        stat: "chicken_kills",
        min: 200
      }]
    }]
  },
  M = $.originalPictures,
  P = $.pictures.map(e => ({
    ...e,
    path: "stream" === e.render.kind ? e.render.path : `profile-pictures/${e.id}`
  })),
  C = M + P.length,
  K = new Map(P.map(e => [e.index, e])),
  T = e => K.get(e),
  I = "profile_picture",
  B = e => `pfp${e}`;
function j(e) {
  const n = /^pfp(\d+)$/.exec(e),
    t = n ? Number(n[1]) : -1;
  return T(t)?.goals.length ? t : -1;
}
function A(e) {
  return n = e, !!(Number.isInteger(n) && n >= 0 && n < C) && (e < M || 0 === (T(e)?.goals.length ?? 0));
  var n;
}
var N = P.filter(e => e.goals.length > 0),
  G = {
    chicken_kills: 0,
    chickalettas_killed: 0,
    kyles_killed: 0,
    kebins_killed: 0,
    nukes: 0,
    zombie_max_round: 0,
    max_kill_streak: 0,
    games_won: 0,
    classKills: {},
    map_secrets: 0,
    level: 0
  };
function L(e, t) {
  if ("class_level" === e.stat) {
    if (void 0 !== e.class) return n(t.classKills[e.class] ?? 0);
    let a = 0;
    for (const e of Object.values(t.classKills)) a = Math.max(a, n(e ?? 0));
    return a;
  }
  return Math.max(0, Number(t[e.stat]) || 0);
}
function z(e, n) {
  return 0 === e.goals.length || e.goals.some(e => ((e, n) => L(e, n) >= e.min)(e, n));
}
var E = e => N.filter(n => z(n, e)).map(e => e.index),
  F = e => String(Math.round(e)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
function R(n) {
  const t = F(n.min);
  switch (n.stat) {
    case "chicken_kills":
      return `Kill ${t} Chickens`;
    case "chickalettas_killed":
      return "Kill Chickaletta";
    case "kyles_killed":
      return "Kill Kyle";
    case "kebins_killed":
      return "Kill Kebin";
    case "nukes":
      return 1 === n.min ? "Deploy A Nuke" : `Deploy ${t} Nukes`;
    case "zombie_max_round":
      return `Reach Round ${t} In Zombies`;
    case "max_kill_streak":
      return `Get A ${t} Kill Streak`;
    case "games_won":
      return `Win ${t} Matches`;
    case "class_level":
      return void 0 === n.class ? `Reach LVL ${t} With Any Class` : `Reach ${a = n.class, e.find(e => e.index === a)?.name ?? `Class ${a}`} LVL ${t}`;
    case "map_secrets":
      return 1 === n.min ? "Find All Secrets Of A Map" : `Find All Secrets Of ${t} Maps`;
    case "level":
      return `Reach Level ${t}`;
  }
  var a;
}
function U(e) {
  const [n, t] = e.goals;
  return 2 === e.goals.length && "chicken_kills" === n.stat && t.stat.endsWith("_killed") ? `Kill ${F(n.min)} Chickens or ${R(t).replace(/^Kill /, "")}` : e.goals.map(R).join(" or ");
}
function O(e, n) {
  let t = null;
  for (const a of e.goals) {
    const e = Math.min(a.min, L(a, n)),
      o = a.min > 0 ? e / a.min : 1;
    (!t || o > t.fill) && (t = {
      value: e,
      min: a.min,
      fill: o
    });
  }
  return t && {
    ...t,
    text: `${F(t.value)}/${F(t.min)}`
  };
}
var D = "kour-rank-rainbow";
function V(e, n, t) {
  const a = Math.floor(6 * e),
    o = 6 * e - a,
    r = t * (1 - n),
    s = t * (1 - o * n),
    i = t * (1 - (1 - o) * n),
    [c, l, f] = [[t, i, r], [s, t, r], [r, t, i], [r, s, t], [i, r, t], [t, r, s]][(a % 6 + 6) % 6];
  return [Math.round(255 * c), Math.round(255 * l), Math.round(255 * f)];
}
var q = !1;
function H() {
  if (!q && "undefined" != typeof document) {
    q = !0;
    const element = document.createElement("div");
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">' + (e = function (e = 64) {
      const _element = document.createElement("canvas");
      _element.width = _element.height = e;
      const drawingContext = _element.getContext("2d");
      if (!drawingContext) return "";
      const a = drawingContext.createImageData(e, e);
      for (let o = 0; o < e; o++) for (let n = 0; n < e; n++) {
        const [t, r, s] = V((Math.atan2(o - e / 2, n - e / 2) / (2 * Math.PI) % 1 + 1) % 1, .85, 1),
          i = 4 * (o * e + n);
        a.data[i] = t, a.data[i + 1] = r, a.data[i + 2] = s, a.data[i + 3] = 255;
      }
      return drawingContext.putImageData(a, 0, 0), _element.toDataURL("image/png");
    }(), `<filter id="${D}" x="0" y="0" width="1" height="1" primitiveUnits="objectBoundingBox" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="erode" radius="0.018" result="core"/><feComposite in="SourceAlpha" in2="core" operator="out" result="rim"/><feImage href="${e}" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="rainbow"/><feComposite in="rainbow" in2="rim" operator="in"/></filter></svg>`), document.body.append(element.firstElementChild);
  }
  var e;
  return `url(#${D}) hue-rotate(var(--kour-rank-hue, 0deg))`;
}
var W = [{
    sprite: "rank-master",
    color: [.72, .09, .13, 1]
  }, {
    sprite: "rank-supreme",
    color: [.9, .27, .6, 1]
  }, {
    sprite: "rank-legend",
    color: [.2, .07, .36, 1]
  }, {
    sprite: "rank-mythic",
    color: [.3, .31, .35, 1]
  }, {
    sprite: "rank-immortal",
    color: [.27, .3, .4, 1]
  }],
  Y = {
    sprite: "rank-celestial",
    color: [.05, .09, .3, 1]
  },
  Z = o[o.length - 1].name,
  J = "rank-rainbow",
  Q = "rank-celestial";
var X = e => `rank-hd-${e.toLowerCase().replace(/ /g, "-")}`,
  ee = e => e === Z ? "rainbow" : "Celestial" === e ? "celestial" : "",
  ne = (e, n, t) => "Celestial" === n ? Y.color : e[t];
function te(e) {
  const n = (e ?? []).map(e => [e.r, e.g, e.b, e.a]);
  return W.forEach((e, t) => n[a.length + t] = e.color), n;
}
function ae(e, n) {
  const t = e?.graphic;
  if (!t) return;
  !function (e, n) {
    const t = e?.graphic;
    if (!t) return;
    const _element3 = t.querySelector(`:scope > .${Q}`);
    n ? _element3 || t.append(oe(e.host.assets?.$_4u4?.(Y.sprite) ?? null)) : _element3?.remove();
  }(e, n === r);
  const element = t.querySelector(`:scope > .${J}`);
  if (n !== Z) return void element?.remove();
  if (element) return;
  const _element2 = document.createElement("div");
  _element2.className = J, _element2.style.filter = H(), t.append(_element2);
}
function oe(e) {
  const element = document.createElement("div");
  element.className = Q;
  for (const a of ["halo", "rays"]) {
    const _element5 = document.createElement("div");
    _element5.className = `${Q}-${a}`, element.append(_element5);
  }
  const _element4 = document.createElement("div");
  return _element4.className = `${Q}-shine`, e && _element4.style.setProperty("--kour-celestial-mask", `url("${e}")`), _element4.append(document.createElement("i")), element.append(_element4), element;
}
function re(e, n) {
  e && (e.$_1wn(e.host.assets.index.rankSprites?.[n] ?? null), ae(e, n));
}
var se = new Set(["UIManager.EnterKourEngine", "ServerFinderPanel.ShowCustomGamesPanel", "GameModeSelectPanel.CustomGamesButtonPressed", "GameModeSelectPanel.PlayCustom", "SettingsPanel.EnterKourEditor"]),
  ie = /Kour Engine|Kour Editor|Firebase: UID|Editor Application Version/i;
function ce(e) {
  return (e.c ?? []).some(e => (e => e.onClick ?? [])(e).some(e => se.has(`${e.type}.${e.method}`)));
}
function le(e) {
  return (e.c ?? []).some(e => ie.test((e => e.text ?? "")(e))) || (e.children ?? []).some(e => le(e));
}
function fe(e) {
  for (const t of e.children ?? []) ce(t) || /Slot/.test(t.name) && le(t) ? t.active = !1 : fe(t);
  const n = e.children?.find(e => "frame" === e.name);
  n?.children?.length && n.children.every(e => !e.active) && (e.active = !1);
}
var ue = new Set(["MapInfo.FreeKP", "ShopPanel.FreeKPButtonPressed", "ProfilePanel.ShowUserRecovery", "UIManager.ShowUserRecoveryPanel", "UIManager.FreeCrateButtonPressed", "FreeCrateMission.Claim", "GameEndedPanel.GetDoubleKP"]),
  pe = [["LeftNav", "frame"], ["News", "Legion"], ["HealthPanel", "dashpapa"]],
  de = [["PriorityCanvas", "TemporaryUnlockPanel"], ["LeftNav", "FreeCrate"], ["lockedPanel", "WatchAdToUnlockPanel"]];
function me(e) {
  return (e.c ?? []).some(e => (e => e.onClick ?? [])(e).some(e => ue.has(`${e.type}.${e.method}`)));
}
var he = (e, n) => de.some(([t, a]) => t === e.name && a === n.name);
function we(e) {
  e.children?.some(n => he(e, n)) && (e.children = e.children.filter(n => !he(e, n)));
  for (const n of e.children ?? []) me(n) || pe.some(([t, a]) => t === e.name && a === n.name) ? n.active = !1 : we(n);
}
var be = "/loading/airstrafing-wordmark.webp",
  ke = "boot",
  ge = "boot-style";
function ve() {
  return `<div id="${ke}" class="boot" role="progressbar" aria-label="Loading" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="boot__art"></div><div class="boot__glow"></div><div class="boot__center"><div class="boot__logo"><img class="boot__img" src="${be}" alt="Airstraf.ing" draggable="false" /></div><div class="boot__bar"><div class="boot__fill"></div></div><div class="boot__status"><span class="boot__task"></span><span class="boot__pct"></span></div></div><div class="boot__mark"></div><div class="boot__credit"></div></div>`;
}
function ye(e) {
  const n = e.toLowerCase().replace(/:\d+$/, "").replace(/^www\./, "");
  if (!n || "localhost" === n || /^[\d.]+$/.test(n) || n.includes(":")) return null;
  const t = n.lastIndexOf(".");
  return t <= 0 || t === n.length - 1 ? null : {
    name: n.slice(0, t).toUpperCase(),
    ending: n.slice(t).toUpperCase()
  };
}
function _e(e, n, t) {
  const a = e.length > 1 ? e.filter(e => e.file !== t) : e;
  return a.length ? a[Math.min(a.length - 1, Math.floor(n * a.length))] : null;
}
var xe = "airstrafing-wordmark",
  Se = [1770, 239],
  $e = {
    "522bea1bd1faed44": {
      name: "kour_title_cardv4",
      fill: .3
    },
    "2c625ddb071b0091": {
      name: "kour_title_cardv4",
      fill: .3
    },
    a64442d7620a6930: {
      name: "kour_title_cardv4",
      fill: .3
    },
    "75d6ce5bdb1be2f0": {
      name: "kour_title_cardv4",
      fill: .3
    },
    "6c7fb2bd0771750a": {
      name: "kourstrike",
      fill: .78
    }
  },
  Me = new Set(["1f5d7acc68071ed7", "08a6a9d4ad7d25f6", "625301a9b286b6d3"]),
  Pe = e => (e.c ?? []).find(e => "Image" === e.t),
  Ce = {
    "0e5de552a3db2de4": {
      why: "challenges title"
    },
    e62afbb537c4fba4: {
      width: 560,
      why: "shop title"
    },
    c3e0e4026ea73671: {
      why: "crates title"
    },
    "0ef63ea9a9d11ecf": {
      why: "settings title"
    },
    "4e695a0002851305": {
      why: "general settings header"
    },
    "3af839c88438de2e": {
      why: "game settings header"
    },
    "7ae41d362f7e764f": {
      why: "sound settings header"
    },
    e950d0d347efdfdb: {
      why: 'settings info "Airstrafing Version"'
    },
    "7c911f5a5e166368": {
      why: "clans title"
    },
    b81d0b3a0849b84d: {
      why: "inbox title"
    },
    "141ce8dc5d934ecc": {
      why: "custom games title"
    },
    c7ddd7b10a8a1e35: {
      why: "publish title"
    }
  },
  Ke = "effects-tab",
  Te = 256,
  Ie = "You are not eligible for this!";
function Be(e, n) {
  if (e.id === n) return e;
  for (const t of e.children ?? []) {
    const e = Be(t, n);
    if (e) return e;
  }
  return null;
}
var je = class {
  host;
  busy = !1;
  constructor(e) {
    this.host = e;
  }
  async press() {
    if (this.busy) return null;
    const e = this.host,
      n = e.store();
    if (!n.dailyCaseEligible() || e.gone()) return e.notify(Ie, !0), null;
    this.busy = !0;
    try {
      const t = await n.claimDailyCase();
      return "Success" === t.result ? (e.claimed(t), t) : ("You are not eligible for this!" === t.result ? (e.notify(Ie, !0), e.refused()) : "Failed" === t.result && e.notify("Something went wrong.", !0), null);
    } finally {
      this.busy = !1;
    }
  }
};
function Ae(e, n, t) {
  return e && t !== n;
}
var Ne = "https://discord.gg/ukqNTnSNVp",
  Ge = new Set(["MyFriendList.InviteDiscordCummunityToParty", "MapInfo.ShareRoomDiscord"]),
  Le = new Set(["b96c737fb63a6eb4", "33cce7acb9c03f88", "69c0c48d0885807b", "4afed10ea1d5c57f"]),
  ze = new Set(["568e709d33338e2d"]),
  Ee = {
    be2297e937a4b0e8: "Effects",
    a4c16b2e965633bc: y,
    f2768c250b237822: "LATEST UPDATE",
    "20bfe0b00440b461": v(_()?.title ?? "")
  },
  Fe = {},
  Re = 73.0364,
  Ue = "ba41dce7c8809849",
  Oe = "news-notification",
  De = "20bfe0b00440b461",
  Ve = "c06b8275d5c9c1f3",
  qe = e => (e.c ?? []).flatMap(e => e.onClick ?? []),
  He = (e, n) => qe(e).some(e => `${e.type}.${e.method}` === n) || (e.children ?? []).some(e => He(e, n));
function We(e, n) {
  for (const t of e.c ?? []) "TMP" !== t.t && "Text" !== t.t || (t.text = n);
}
function Ye(e) {
  Le.has(e.id) || qe(e).some(e => Ge.has(`${e.type}.${e.method}`)) ? e.active = !1 : ze.has(e.id) && (e.active = !0);
  const n = Ee[e.id];
  void 0 !== n && We(e, n);
  const t = Fe[e.id];
  if (t) for (const a of e.c ?? []) "Image" === a.t && (a.sprite = t);
  for (const a of e.c ?? []) "TMP" !== a.t && "Text" !== a.t || "string" != typeof a.text || (a.text = "Get <color=yellow>100 KP</color> for free!" === a.text ? c() : s(a.text));
  switch (function (e) {
    const n = Ce[e.id];
    if (!n) return !1;
    for (const a of e.c ?? []) "TMP" === a.t && x(a, .6);
    const t = e.rt;
    n.width && t && t.amin[0] === t.amax[0] && t.size[0] < n.width && (t.size = [n.width, t.size[1]]);
  }(e), function (e) {
    const n = Pe(e),
      t = n?.sprite ? $e[n.sprite] : void 0;
    if (!n || !t) return !1;
    const a = (e.children ?? []).filter(e => {
      const n = Pe(e)?.sprite;
      return !!n && Me.has(n);
    });
    if (a.length && (e.children = (e.children ?? []).filter(e => !a.includes(e))), n.sprite = xe, n.type = 0, n.preserveAspect = !0, e.rt) {
      const n = Math.round(e.rt.size[1] * t.fill * 10) / 10,
        o = Math.round(n * Se[0] / Se[1] * 10) / 10;
      e.rt.size = [o, n], a.length && (e.rt.pos = [0, e.rt.pos[1]]);
    }
  }(e), e.id) {
    case "be2297e937a4b0e8":
      for (const n of e.c ?? []) "TMP" === n.t && (n.lineSpacing = 0);
      break;
    case "52d9d6efe182da1e":
      !function (e) {
        e.rt && (e.rt.size = [Re, Re]);
        const n = (e.c ?? []).find(e => "Image" === e.t);
        if (!n) return;
        const t = {
          ...structuredClone(e),
          id: `${e.id}-picture`,
          name: "Image_2",
          rt: {
            ...structuredClone(e.rt),
            amin: [0, 0],
            amax: [1, 1],
            pos: [0, 0],
            size: [0, 0]
          },
          children: []
        };
        for (const a of t.c ?? []) "Image" === a.t && (a.sprite = Ke);
        n.sprite = "ffead363a3c4dda8", n.type = 1, n.ppuMul = 1, e.name = "Image_1", e.c = [...(e.c ?? []), {
          t: "Mask",
          enabled: !0,
          showGraphic: !0
        }], e.children = [...(e.children ?? []), t];
      }(e);
      break;
    case "537d3d513eef538a":
      for (const n of e.children ?? []) {
        n.active = n.active && He(n, "ShopPanel.BuyItem");
        for (const e of n.children ?? []) "peoplePurchsedTxt" === e.name && (e.active = !1);
      }
      break;
    case "105c0b542c066c88":
      e.rt && (e.rt.pos = [e.rt.pos[0], -31.2491]);
      break;
    case "5a0ffcc7b9f84b3a":
      e.rt && (e.rt.amin = [0, 0], e.rt.amax = [1, 1], e.rt.pos = [0, -42.945], e.rt.size = [0, -85.89]);
      break;
    case Ue:
      for (const n of qe(e)) "OpenURL" === n.method && (n.args.string = Ne);
      break;
    case "b4bf831474af9fe9":
      for (const n of e.c ?? []) "Button" === n.t && (n.enabled = !0);
      for (const n of qe(e)) "ShowSettingsPanel" === n.method && (n.method = "ShowRegionSettings");
      break;
    case "918782c1154a227b":
      for (const n of qe(e)) "ShowKourTV" === n.method && (n.method = "ShowNews");
  }
  for (const a of e.c ?? []) {
    if ("Script" !== a.t || "SimpleTooltip" !== a.cls) continue;
    const e = a.data;
    "string" == typeof e.infoLeft && (e.infoLeft = s(e.infoLeft.replace(" or our discord community", "")));
  }
  for (const a of e.children ?? []) Ye(a);
}
var Ze = new Set(["KourstrikeBackInCanvas"]),
  Je = ["GameEndedPanel/ExpandedGameplayLeaderboardTeams", "GameEndedPanel/MAIN"],
  Qe = new Set(["Button", "Toggle", "Slider", "Scrollbar", "Dropdown", "InputField"]),
  Xe = e => !!e.c?.some(e => Qe.has(e.t));
function en(e) {
  if (!Xe(e)) {
    for (const n of e.c ?? []) {
      const e = n;
      !0 === e.raycast && (e.raycast = !1);
    }
    for (const n of e.children ?? []) en(n);
  }
}
function nn(e) {
  if (!Xe(e)) for (const n of e.c ?? []) {
    const e = n;
    !0 === e.raycast && (e.raycast = !1);
  }
}
function tn(e, n) {
  if (e.name !== n[0]) return null;
  let t = e;
  for (const a of n.slice(1)) t = t?.children?.find(e => e.name === a);
  return t ?? null;
}
function an(e) {
  const n = e => {
    if (Ze.has(e.name)) en(e);else for (const t of e.children ?? []) n(t);
  };
  for (const t of e.roots) {
    n(t);
    for (const e of Je) {
      const n = tn(t, e.split("/"));
      n && nn(n);
    }
  }
  return e;
}
var on = [1920, 1080],
  rn = ["Image_2", "Image_3", "Button"],
  sn = new Set(["Image_2", "Image_3"]);
function cn(e, n, t, a) {
  const o = a * (e.scale?.[0] || 1),
    r = n + e.pos[0] * a,
    s = t + e.pos[1] * a,
    i = e.size[0] * o,
    c = e.size[1] * o;
  return {
    x0: r - e.pivot[0] * i,
    x1: r + (1 - e.pivot[0]) * i,
    y0: s - e.pivot[1] * c,
    y1: s + (1 - e.pivot[1]) * c
  };
}
var ln = (e, n) => e ? {
    x0: Math.min(e.x0, n.x0),
    y0: Math.min(e.y0, n.y0),
    x1: Math.max(e.x1, n.x1),
    y1: Math.max(e.y1, n.y1)
  } : n,
  fn = e => e.amin[0] === e.amax[0] && e.amin[1] === e.amax[1];
function un(e, n = on) {
  const t = (e.children ?? []).filter(e => rn.includes(e.name) && e.rt && fn(e.rt));
  if (!t.some(e => "Image_2" === e.name) || !t.some(e => "Image_3" === e.name)) return !1;
  let a = !1;
  for (const i of t) {
    const e = i.rt;
    .5 === e.amin[0] && .5 === e.amin[1] || (e.pos = [e.pos[0] + (e.amin[0] - .5) * n[0], e.pos[1] + (e.amin[1] - .5) * n[1]], e.amin = [.5, .5], e.amax = [.5, .5], a = !0);
  }
  let o = null;
  for (const i of t) {
    if (!sn.has(i.name)) continue;
    const e = i.rt;
    o = ln(o, cn(e, 0, 0, 1));
    const n = e.scale?.[0] || 1,
      t = e.pos[0] + (.5 - e.pivot[0]) * e.size[0] * n,
      a = e.pos[1] + (.5 - e.pivot[1]) * e.size[1] * n;
    for (const r of i.children ?? []) r.active && r.rt && fn(r.rt) && .5 === r.rt.amin[0] && .5 === r.rt.amin[1] && (o = ln(o, cn(r.rt, t, a, n)));
  }
  const r = -(o.x0 + o.x1) / 2,
    s = -(o.y0 + o.y1) / 2;
  if (!a && Math.abs(r) < .5 && Math.abs(s) < .5) return !1;
  for (const i of t) i.rt.pos = [i.rt.pos[0] + r, i.rt.pos[1] + s];
  return !0;
}
var pn = {
    flag: {
      sprite: "weapon-flag",
      w: 74,
      h: 68
    },
    ...Object.fromEntries(Object.entries({
      ak109: {
        sprite: "weapon-ak109",
        w: 340,
        h: 96
      },
      ak47: {
        sprite: "weapon-ak47",
        w: 340,
        h: 98
      },
      awp: {
        sprite: "weapon-awp",
        w: 340,
        h: 70
      },
      axe: {
        sprite: "weapon-axe",
        w: 340,
        h: 97
      },
      bayonet: {
        sprite: "weapon-bayonet",
        w: 340,
        h: 57
      },
      beretta: {
        sprite: "weapon-beretta",
        w: 147,
        h: 100
      },
      butterfly: {
        sprite: "weapon-butterfly",
        w: 340,
        h: 42
      },
      crossbow: {
        sprite: "weapon-crossbow",
        w: 150,
        h: 100
      },
      cz: {
        sprite: "weapon-cz",
        w: 143,
        h: 100
      },
      deagle: {
        sprite: "weapon-deagle",
        w: 177,
        h: 100
      },
      dualpistols: {
        sprite: "weapon-dualpistols",
        w: 302,
        h: 100
      },
      famas: {
        sprite: "weapon-famas",
        w: 286,
        h: 100
      },
      flamethrower: {
        sprite: "weapon-flamethrower",
        w: 340,
        h: 71
      },
      glizzy: {
        sprite: "weapon-glizzy",
        w: 344,
        h: 104
      },
      glock: {
        sprite: "weapon-glock",
        w: 146,
        h: 100
      },
      instagib: {
        sprite: "weapon-instagib",
        w: 340,
        h: 88
      },
      kar98: {
        sprite: "weapon-kar98",
        w: 340,
        h: 60
      },
      karambit: {
        sprite: "weapon-karambit",
        w: 283,
        h: 100
      },
      knife: {
        sprite: "weapon-knife",
        w: 340,
        h: 49
      },
      lasergun: {
        sprite: "weapon-lasergun",
        w: 204,
        h: 100
      },
      m14: {
        sprite: "weapon-m14",
        w: 340,
        h: 63
      },
      m4a1: {
        sprite: "weapon-m4a1",
        w: 322,
        h: 100
      },
      minigun: {
        sprite: "weapon-minigun",
        w: 296,
        h: 100
      },
      mp5: {
        sprite: "weapon-mp5",
        w: 280,
        h: 100
      },
      p90: {
        sprite: "weapon-p90",
        w: 265,
        h: 100
      },
      pkm: {
        sprite: "weapon-pkm",
        w: 340,
        h: 82
      },
      revolver: {
        sprite: "weapon-revolver",
        w: 186,
        h: 100
      },
      rpg: {
        sprite: "weapon-rpg",
        w: 340,
        h: 72
      },
      scar: {
        sprite: "weapon-scar",
        w: 341,
        h: 97
      },
      scythe: {
        sprite: "weapon-scythe",
        w: 298,
        h: 100
      },
      shotgun: {
        sprite: "weapon-shotgun",
        w: 340,
        h: 66
      },
      tec9: {
        sprite: "weapon-tec9",
        w: 154,
        h: 100
      },
      thompson: {
        sprite: "weapon-thompson",
        w: 329,
        h: 100
      },
      ump: {
        sprite: "weapon-ump",
        w: 205,
        h: 100
      },
      usps: {
        sprite: "weapon-usps",
        w: 220,
        h: 100
      },
      uzi: {
        sprite: "weapon-uzi",
        w: 228,
        h: 100
      },
      vector: {
        sprite: "weapon-vector",
        w: 197,
        h: 100
      },
      vss: {
        sprite: "weapon-vss",
        w: 340,
        h: 82
      },
      xm1014: {
        sprite: "weapon-xm1014",
        w: 340,
        h: 70
      }
    }).map(([e, n]) => [e, {
      ...n,
      ppu: 25
    }]))
  },
  dn = (e, n) => e[n] ?? e[t(n)] ?? null,
  mn = /^(?:New Text|Text\[\d+\])$/,
  hn = e => !!e && mn.test(e.trim()),
  wn = e => "TMP" === e.t;
function bn(e, n) {
  for (const t of e.c ?? []) wn(t) && n(t);
  for (const t of e.children ?? []) bn(t, n);
}
function kn(e) {
  for (const n of e.owners ?? []) for (const e of n.c ?? []) if ("Script" === e.t && "ChatManager" === e.cls) return e.data;
  return null;
}
function* gn(e) {
  yield e;
  for (const n of e.children ?? []) yield* gn(n);
}
function vn(e) {
  const lookupMap = new Map();
  for (const t of e.roots) for (const e of gn(t)) lookupMap.set(e.id, e);
  return lookupMap;
}
function yn(e, n) {
  if (!e || "object" != typeof e) return;
  if (Array.isArray(e)) {
    for (const t of e) yn(t, n);
    return;
  }
  const t = e;
  "string" == typeof t.node && n.has(t.node) && (t.node = n.get(t.node));
  for (const a of Object.values(t)) yn(a, n);
}
function _n(e, n) {
  const t = structuredClone(e);
  for (const a of gn(t)) {
    const e = n.get(a.id);
    e && (a.id = e);
    for (const t of a.c ?? []) yn(t, n);
  }
  return t;
}
var xn = class e {
  assets;
  options;
  handlers = new Map();
  layer;
  constructor(e, n) {
    this.assets = e, this.options = n, S(e => n.sound(e), () => n.uiAnimations()), this.layer = document.createElement("div"), this.layer.id = "ui-layer", p().append(this.layer);
  }
  static async create(n) {
    const t = await u.load(),
      s = e => t.index.tmpFonts[e]?.material;
    return h(e => function (e) {
      const n = kn(e);
      return n?.verticalLayoutGroup?.node && "8528bd4d35e50342" !== n.verticalLayoutGroup.node ? m("map-ui").then(n => {
        const t = function (e) {
          const n = kn(e),
            t = vn(e),
            a = n?.messageIF?.node ? t.get(n.messageIF.node) : void 0,
            o = n?.verticalLayoutGroup?.node ? t.get(n.verticalLayoutGroup.node) : void 0;
          return n && a && o ? {
            field: structuredClone(a),
            lines: structuredClone(o),
            slots: (n.chatSlots ?? []).map(e => e.node ?? "").filter(Boolean)
          } : null;
        }(n);
        return t ? function (e, n) {
          const t = kn(e);
          if (!t?.messageIF?.node || !t.verticalLayoutGroup?.node) return e;
          if (t.verticalLayoutGroup.node === n.lines.id) return e;
          const a = vn(e),
            o = a.get(t.messageIF.node),
            r = a.get(t.verticalLayoutGroup.node);
          if (!(o?.rt && r?.rt && n.field.rt && n.lines.rt)) return e;
          const lookupMap = new Map([[n.field.id, o.id], [n.lines.id, r.id]]),
            i = (t.chatSlots ?? []).map(e => e.node ?? "").filter(Boolean),
            c = n.slots.map((e, n) => i[n] ?? `${r.id}~slot${n}`);
          n.slots.forEach((e, n) => lookupMap.set(e, c[n]));
          const l = _n(n.field, lookupMap);
          o.c = l.c, o.children = (l.children ?? []).filter(e => e.id !== r.id);
          const f = _n(n.lines, lookupMap);
          r.c = f.c, r.children = f.children ?? [];
          const [u, p] = (e => {
              const n = e.rt;
              return [n.pos[0] - n.size[0] * n.pivot[0], n.pos[1] - n.size[1] * n.pivot[1]];
            })(o),
            d = n.lines.rt;
          return r.rt = {
            ...r.rt,
            amin: [0, 0],
            amax: [0, 0],
            pivot: [...d.pivot],
            size: [...d.size],
            pos: [u + d.pos[0], p + d.pos[1]]
          }, t.chatSlots = c.map(e => ({
            node: e,
            script: "ChatSlot"
          })), e;
        }(e, t) : e;
      }) : e;
    }(function (e, n) {
      for (const t of e.roots) bn(t, e => {
        e.font && !e.material && (e.material = n(e.font) ?? null);
      });
      return e;
    }(function (e) {
      const n = e => {
        for (const n of e.c ?? []) "TMP" !== n.t && "Text" !== n.t || !hn(n.text) || (n.text = "");
        for (const t of e.children ?? []) n(t);
      };
      for (const t of e.roots) n(t);
      return e;
    }(an(function (e) {
      for (const n of e.roots) "BuyMenuCanvas" === n.name && un(n);
      return e;
    }(function (e) {
      for (const n of e.roots) Ye(n);
      return function (e) {
        const n = (e, n) => (e.children ?? []).find(e => e.name === n),
          t = e => {
            if ("GamePausedPanel" === e.name) {
              const t = n(e, "TopNav"),
                a = t && n(t, "loggedin"),
                o = a && n(a, "firendsBtn"),
                r = t && n(t, "COINS");
              if (!(t?.children && a?.children && o?.rt && r?.rt)) return;
              a.children = a.children.filter(e => e !== o);
              const s = (o.rt.size[0] + r.rt.size[0]) / 2;
              return Object.assign(o.rt, {
                amin: [...r.rt.amin],
                amax: [...r.rt.amax],
                pivot: [.5, .5],
                pos: [r.rt.pos[0] - s - 14, r.rt.pos[1]]
              }), o.active = !1, void t.children.splice(t.children.indexOf(r) + 1, 0, o);
            }
            for (const n of e.children ?? []) t(n);
          };
        for (const a of e.roots) t(a);
      }(e), function (e) {
        let n = null,
          t = null;
        const a = e => {
          "90ca9e716af70753" === e.id && (n = e);
          for (const n of e.children ?? []) n.id === Ue && (t = e), a(n);
        };
        for (const c of e.roots) a(c);
        const o = n,
          r = t;
        if (!o || !r || r === o || !r.children) return;
        const s = r.children.findIndex(e => e.id === Ue),
          [i] = r.children.splice(s, 1);
        (o.children ??= []).push(i);
      }(e), function (e) {
        let n = null,
          t = null;
        const a = e => {
          "3df7ea8a54494db7" === e.id && (n = e), "b1ff89083fe7262e" === e.id && (t = e);
          for (const n of e.children ?? []) a(n);
        };
        for (const i of e.roots) a(i);
        const o = n,
          r = t;
        if (!o || !r || (r.children ?? []).some(e => "news-notification" === e.id)) return;
        const s = structuredClone(o);
        s.id = Oe, s.name = "newsNotification", s.active = !1, (s.children ?? []).forEach((e, n) => {
          e.id = `${Oe}-${n}`, We(e, "!");
        }), (r.children ??= []).push(s);
      }(e), function (e) {
        for (const n of e.roots) {
          const e = Be(n, "696f19a55f9df9b9"),
            t = e?.children?.findIndex(e => "2e3121979ab6c999" === e.id) ?? -1;
          if (!e || t < 0) continue;
          const a = e.children[t],
            o = a.children?.findIndex(e => "23639bccd721d117" === e.id) ?? -1;
          if (o >= 0) {
            const [n] = a.children.splice(o, 1);
            n.rt && (n.rt = {
              ...n.rt,
              amin: [.5, .5],
              amax: [.5, .5],
              pivot: [.5, .5],
              pos: [0, 0]
            });
            for (const e of n.c ?? []) "TMP" === e.t && (e.h = i.Center);
            e.children.splice(t, 0, n);
          }
          a.active = !1;
        }
      }(e), e;
    }(function (e) {
      for (const n of e.roots) we(n);
      return e;
    }(function (e) {
      for (const n of e.roots) fe(n);
      return e;
    }(e)))))), s))), function (e) {
      const n = e.rankSprites ??= {},
        t = (t, a) => {
          e.sprites[a] = {
            name: t,
            w: 256,
            h: 244,
            border: [0, 0, 0, 0],
            ppu: 40.66667,
            rect: [256, 244]
          }, n[t] = a;
        };
      o.forEach((e, n) => t(e.name, W[n].sprite)), t(r, Y.sprite), function (e) {
        const n = e.rankSprites ??= {};
        for (const t of a) {
          const a = X(t),
            o = n[t] === a ? null : e.sprites[n[t] ?? ""];
          o && (e.sprites[a] = {
            ...o,
            w: 2 * o.w,
            h: 2 * o.h,
            border: o.border.map(e => 2 * e),
            ppu: 2 * o.ppu,
            rect: [2 * o.rect[0], 2 * o.rect[1]],
            ...(o.pad ? {
              pad: o.pad.map(e => 2 * e)
            } : {})
          }, n[t] = a);
        }
      }(e);
    }(t.index), function (e) {
      for (const [n, t] of Object.entries(pn)) e.sprites[t.sprite] = {
        name: t.sprite,
        w: t.w,
        h: t.h,
        border: [0, 0, 0, 0],
        ppu: t.ppu ?? 12.5,
        rect: [t.w, t.h]
      }, e.weaponIcons[n] = t.sprite;
    }(t.index), d(t.index), function (e) {
      const n = e.profilePictures;
      n && (n.paths = [...n.paths.slice(0, M), ...P.map(e => e.path)]);
    }(t.index), function (e) {
      f(Ke, "/assets/extracted/ui/sprites/effects-tab.png"), e.sprites[Ke] ??= {
        name: Ke,
        w: Te,
        h: Te,
        border: [0, 0, 0, 0],
        ppu: 100,
        rect: [Te, Te]
      };
    }(t.index), function (e) {
      f(xe, be), e.sprites[xe] ??= {
        name: xe,
        w: Se[0],
        h: Se[1],
        border: [0, 0, 0, 0],
        ppu: 100,
        rect: [Se[0], Se[1]]
      };
    }(t.index), new e(t, n);
  }
  sound(e, n, t) {
    this.options.sound(e, n, t);
  }
  audioSource() {
    return this.options.audioSource();
  }
  group(e) {
    const element = document.createElement("div");
    return element.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:${e}`, this.layer.append(element), element;
  }
  on(e, n, t) {
    const a = (this.handlers.get(e) ?? []).filter(e => t || e.scope);
    a.push({
      handler: n,
      scope: t
    }), this.handlers.set(e, a);
  }
  dispatch = (e, n, t, a) => {
    const o = this.handlers.get(`${e.type}.${e.method}`);
    if (!o?.length) return !1;
    const r = b(e, a);
    for (const s of o) s.scope && s.scope() !== t || s.handler(e, n, t, r);
    return !0;
  };
  async open(e, n, t = {}) {
    const a = await m(e),
      o = k(a, n);
    if (!o) throw new Error(`UI node ${e}:${n} missing`);
    return this.canvas({
      ...o,
      active: !0
    }, t);
  }
  canvas(e, n = {}) {
    const t = new g(e, {
      assets: this.assets,
      dispatch: this.dispatch,
      sound: e => this.options.sound(e),
      uiAnimations: () => this.options.uiAnimations(),
      parent: n.parent ?? this.layer,
      zIndex: n.zIndex,
      scaler: n.scaler,
      fit: n.fit,
      world: n.world
    });
    return !1 === n.visible && (t.visible = !1), t;
  }
  async owner(e, n) {
    return w(await m(e), n);
  }
  async prefab(e, n) {
    const t = await m(e),
      a = k(t, n);
    if (!a) throw new Error(`UI prefab ${e}:${n} missing`);
    return a;
  }
};
export { z as A, M as C, U as D, A as E, E as M, $ as N, j as O, G as S, B as T, te as _, De as a, re as b, Ae as c, ve as d, _e as f, ne as g, oe as h, Ve as i, T as j, O as k, ke as l, Y as m, dn as n, Oe as o, ye as p, Ne as r, je as s, xn as t, ge as u, ee as v, I as w, H as x, ae as y };

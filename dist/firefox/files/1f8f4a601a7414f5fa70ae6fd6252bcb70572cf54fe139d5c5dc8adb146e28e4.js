import { a as n } from "./c-Caw4SzGP.js";
import { o as e, r as o } from "./c-B0EPN0fS.js";
var a = {
    characterSkin: "ownedCustomSkin",
    weaponSkin: "weaponSkin",
    hat: "hat",
    emote: "emote"
  },
  t = (n, e) => `${a[n]}${e}`,
  i = {
    skin: "skin",
    hat: "hat",
    emote: "emote",
    weaponSkin: n => `weapon${n}skin`
  },
  s = {
    overrideWeaponUnlock: n => `overrideWeaponUnlock${n}`,
    classKills: n => `class${n}kills`,
    dailyCase: n => `dailyCase_${n}`,
    everUnlocked: n => `everUnlocked_${n}`,
    missionProgress: (n, e) => `mission${n}${e}`,
    missionClaimed: n => `mission${n}claimed`
  },
  r = (n = new Date()) => n.toISOString().slice(0, 10).replace(/-/g, ""),
  l = "You are doing that too fast. Please wait a moment.",
  c = [5, 10, 50];
function m(n) {
  const e = n;
  return "PGRST202" === e?.code || "42883" === e?.code || /could not find the function|function .* does not exist/i.test(String(e?.message ?? ""));
}
function u(n) {
  return {
    name: n.animationClip,
    rarity: n.rarity,
    icon: n.iconPath,
    audio: n.audioFile ?? null,
    audioName: n.clip,
    pitch: n.audioPitch,
    volume: n.audioVolume,
    timeAdd: n.animationTimeAdd,
    clip: n.rigClip ?? null,
    length: n.clipSeconds ?? 0
  };
}
var d = null;
function k() {
  return d ??= o("emotes.json").then(result => ({
    ...result,
    emotes: [...result.emotes, ...n.filter(item => item.custom && !result.emotes.some(_item => _item.name === item.name)).map(u)]
  }));
}
function p(e) {
  return new Map(n.map(item => [item.index, e.emotes.find(_item2 => _item2.name === item.name) ?? null]));
}
async function f(n) {
  const o = await k();
  return {
    emote: o.emotes.find(item => item.name === n) ?? null,
    controller: await e(o.danceController)
  };
}
export { a, s as c, r as d, i, t as l, p as n, c as o, f as r, l as s, k as t, m as u };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-Cs0N7RUA.js","readableSha256":"64a2d8d4edce38fec033ba36154d1ac15635f18ccb55a9dba99f815c9aeccb0f"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

var e = [{
    kind: "characterSkin",
    index: 17,
    name: "Chickoletta",
    label: "Quest Item",
    how: "s.chickoletta",
    description: "Quest Item: kill Chickoletta, the pink chicken (Special Challenge)."
  }, {
    kind: "characterSkin",
    index: 18,
    name: "Kyle",
    label: "Quest Item",
    how: "s.kyle",
    description: "Quest Item: kill Kyle, the red chicken (Special Challenge)."
  }, {
    kind: "characterSkin",
    index: 1010,
    name: "Kebin",
    label: "Quest Item",
    how: "s.kebin",
    description: "Quest Item: kill Kebin, the green chicken (Special Challenge)."
  }, {
    kind: "characterSkin",
    index: 1036,
    name: "Golden Zombie",
    label: "Quest Item",
    how: "s.zombie100",
    description: "Quest Item: survive round 100 in Zombies (Special Challenge)."
  }, {
    kind: "characterSkin",
    index: 1011,
    name: "Celestorm",
    label: "Top 10 Elo Reward",
    how: "celestial",
    description: "Top 10 Elo Reward: reach Celestial, the highest rank and the top 10 of the Elo leaderboard."
  }, {
    kind: "weaponSkin",
    index: 1249,
    name: "AK-47 Golden",
    label: "Class Mastery",
    how: "class:0",
    description: "Class Mastery: finish all 10 Soldier mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1250,
    name: "AWP Golden",
    label: "Class Mastery",
    how: "class:1",
    description: "Class Mastery: finish all 10 Hitman mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1251,
    name: "P90 Golden",
    label: "Class Mastery",
    how: "class:2",
    description: "Class Mastery: finish all 10 Gunner mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1252,
    name: "PKM Golden",
    label: "Class Mastery",
    how: "class:3",
    description: "Class Mastery: finish all 10 Heavy mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1253,
    name: "RPG Golden",
    label: "Class Mastery",
    how: "class:4",
    description: "Class Mastery: finish all 10 Rocketeer mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1254,
    name: "MP5 Golden",
    label: "Class Mastery",
    how: "class:5",
    description: "Class Mastery: finish all 10 Agent mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1255,
    name: "Shotgun Golden",
    label: "Class Mastery",
    how: "class:6",
    description: "Class Mastery: finish all 10 Brawler mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1256,
    name: "Scar Golden",
    label: "Class Mastery",
    how: "class:7",
    description: "Class Mastery: finish all 10 Investor mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1257,
    name: "FAMAS Golden",
    label: "Class Mastery",
    how: "class:8",
    description: "Class Mastery: finish all 10 Assassin mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1258,
    name: "Minigun Golden",
    label: "Class Mastery",
    how: "class:9",
    description: "Class Mastery: finish all 10 Juggernaut mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1259,
    name: "Vector Golden",
    label: "Class Mastery",
    how: "class:10",
    description: "Class Mastery: finish all 10 Recon mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1260,
    name: "Flamethrower Golden",
    label: "Class Mastery",
    how: "class:11",
    description: "Class Mastery: finish all 10 Pyro mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1261,
    name: "LaserGun Golden",
    label: "Class Mastery",
    how: "class:12",
    description: "Class Mastery: finish all 10 Rayblader mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1262,
    name: "M14 Golden",
    label: "Class Mastery",
    how: "class:13",
    description: "Class Mastery: finish all 10 Vanguard mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1263,
    name: "Crossbow Golden",
    label: "Class Mastery",
    how: "class:14",
    description: "Class Mastery: finish all 10 Marksman mastery challenges."
  }, {
    kind: "weaponSkin",
    index: 1264,
    name: "Heavy Sniper Golden",
    label: "Class Mastery",
    how: "class:15",
    description: "Class Mastery: finish all 10 Sentinel mastery challenges."
  }],
  a = {
    characterSkin: "ownedCustomSkin",
    weaponSkin: "weaponSkin",
    hat: "hat",
    emote: "emote"
  },
  s = new Map(e.map(item => [`${item.kind}:${item.index}`, item]));
function n(e) {
  return e ? s.get(`${e.kind}:${e.index}`) ?? null : null;
}
new Map(e.map(item => [`${a[item.kind]}${item.index}`, item]));
var l = e => null !== n(e),
  i = e => n(e)?.label ?? "";
export { l as n, i as r, e as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-BHQ9wafF.js","readableSha256":"4c62e122a94564a71a3a48a19ff6d4d1a09a14264d1b3e1edf55628ca9335054"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

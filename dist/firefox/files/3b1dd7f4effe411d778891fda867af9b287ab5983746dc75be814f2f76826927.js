var e = "News",
  a = [{
    date: "2026-11-13",
    title: "Mobile Fixes & Faster Loading",
    items: ["**Mobile**: free joystick, much easier bunny hops", "Mobile: stuck buttons and tap zoom fixed", "The game starts on older phones and tablets", "**Team modes**: the whole winning team gets a win", "**Class Mastery**: your old class kills count", "First match after an update loads faster"]
  }, {
    date: "2026-11-13",
    title: "Zombie Mastery & Combat Surf",
    items: ["**Zombie Mastery**: levels, KP and profile stats", "Zombies: secret boss, $ cash, last zombie outline", "**Combat Surf**: pads keep your speed, tower lift", "**Flashbang**: full white, frozen frame, slow fade", "Smoke hides everything with High Graphics Shader", "Ping display no longer includes frame time"]
  }, {
    date: "2026-11-13",
    title: "Zombies: Perks & Upgrades",
    items: ["**Zombies**: four perks at new machines", "**Upgrade Bench**: double damage for your gun", "Keep two Mystery Box guns, no round weapon", "Stations are marked across the whole map", "**Self-Revive** shows next to your health"]
  }, {
    date: "2026-11-13",
    title: "Launch Pads & Smoother FPS",
    items: ["**Combat Surf**: smaller map and launch pads", "**Revolver Blaze**: living flames, orange tracers", "Fixed lag spikes at very high FPS", "**Low Effects** setting for weak devices and phones", "Profile shows **Win%** and **Inventory Value**", "Toon clouds and a sunnier **Skyline**"]
  }, {
    date: "2026-11-12",
    title: "Combat Surf & Reality Crate",
    items: ["**Combat Surf**: new mode and map Kitsune", "**Reality Crate**: Secret and Chroma shader skins", "Karambit **Antique**: trembling blade, rainbow trail", "Chicken kills give score; gold skins reflect", "Level 1111: new **MAX LVL** effect, default FOV 103", "New loading screens, banner for 200 chicken kills"]
  }, {
    date: "2026-11-12",
    title: "Mobile & Class Mastery",
    items: ["**Mobile version**: touch controls you can rearrange", "**Class Mastery**: 10 hard challenges per class", "Master a class for its **golden** main weapon", "Elo: your **kills and K/D** matter more than the win", "New pause menu, **Chats** button in the lobby", "CTF to 8 caps, 2,000 KP sign-up, Surf stutter fix"]
  }, {
    date: "2026-11-09",
    title: "Flow Haze & Sumo Combos",
    items: ["New **Flow Haze** and **Fiery** skins", "Sumo: air **combos** with counter and sparks", "KourStrike: press M to expand the minimap", "Party members: PLAY NOW is your Ready button", "/size now scales the player collision too", "LaserGun skins no longer block the scope"]
  }, {
    date: "2026-11-09",
    title: "Letter Merge & Laser Cannon",
    items: ["Craft **silver/gold letters**, chicken badge at 30k", "KourStrike recap, flashbang; M14/Vector nerf", "Laser Cannon: thicker beam, new sound, charge glow", "New **Diamonds**/**Ice** textures, glowing RAVE", "**Scythe** held like the Axe, bigger, tip forward", "Spectate course ghosts, freecam speed on wheel"]
  }, {
    date: "2026-11-09",
    title: "Golden Myrrr & Sumo Skins",
    items: ["Myrrr skin with a thin **gold outline**", "Sumo bar shows the players' skins", "New **chicken badges**, tidier Name Style menu", "Graphics lowered after a driver crash", "Clan and gift panels tidied up", "Sumo: **1000 health** per player", "Less A/D jitter: slower turnarounds", "Heavy Sniper scope: **see-through** glass", "Kourage: warmer **desert light**", "Myrrr outline shimmers, also in first person", "Havana graffiti no longer overlap"]
  }, {
    date: "2026-11-08",
    title: "Neon Purple & Bot Fixes",
    items: ["New: Butterfly **Neon Purple** by pear", "Surf_Shape bigger, Scythe at 1,000 melee kills", "Sumo: **first to 5**, faster platform, melee kills", "Surf/ParKour: respawn stops, finishes in chat", "Chat: **< > +** allowed, bots no longer stuck", "Fixed invites, invisible players, endless slide"]
  }, {
    date: "2026-11-08",
    title: "Bigger Arenas & Effects Tab",
    items: ["Sumo: **twice as big** platform, fairer bots", "Surf_Shape: another 30% bigger", "Removed map collision stays removed", "Name Styles scroll and show your name", "Trail previews on your own player"]
  }, {
    date: "2026-11-08",
    title: "Sumo, Surf_Shape & Kill Effects",
    items: ["Sumo: **500 HP**, normal movement, bigger arena", "Surf_Shape: twice the size, desert sunset sky", "Kill effects: real sprites, new **Paper** effect", "Smaller download: unused game files removed"]
  }, {
    date: "2026-11-08",
    title: "Weapon Skin Fix",
    items: ["Skinned guns show fully in the lobby again"]
  }, {
    date: "2026-11-08",
    title: "Team Elo & Loading Screens",
    items: ["Team modes: **same Elo**, small top fragger bonus", "Host **public FFA** matches up to 30 minutes", "Clan owners change the color for **1,000 KP**", "New **loading screens** with art and skins", "**Wall jumps** in Zombies and Gun Game", "Revolver is now a secondary only"]
  }, {
    date: "2026-11-07",
    title: "Sumo, Scythe & Instagib",
    items: ["New mode **Sumo**: 1v1 fist fights over lava", "**Scythe** melee and **Instagib** laser cannon", "New surf map **Surf_Shape**; Moon Snipe removed", "Every class slides; melee weapons give wall jumps", "**Friend chat**, Name Style Crate and new skins", "Sign up for 1,000 KP; guests only read chat"]
  }, {
    date: "2026-11-05",
    title: "Fray & Havana Tags",
    items: ["New skin **Fray**: a whole new player model", "M14 base damage raised to 33", "Flamethrower no longer sets players on fire", "Winners dance their equipped emote on the podium", "Havana graffiti now show community names"]
  }, {
    date: "2026-11-05",
    title: "True Skin Colours & Bot Names",
    items: ["Skin colours no longer wash out in bright light", "Bots now carry movement names like Bhopper", "Gun Game board lists every player", "Emotes keep playing in the pause menu", "**Famas** hits harder, slides keep speed holding W", "Quick Sell now 15%, Chicken Rain now 3x"]
  }, {
    date: "2026-11-04",
    title: "Clouds & Clean Boards",
    items: ["Ping now shown last on the scoreboard", "Spectators see each other's cameras", "Fancy Sky: visible clouds, deeper sky colours", "Effects tab and leaderboard tabs restyled", "Lobby: weapons no longer cut when rotating", "Less Tommy Gun recoil, nuke kills count in streaks", "Kill effect preview shows your own character", "Elo now rewards a positive **K/D**", "Barrels block players until they explode", "Steadier aiming on Uzi, Thompson, P90 and more", "Hardpoint outline no longer drawn over players"]
  }, {
    date: "2026-11-03",
    title: "Kill Effects & Chicken Rain",
    items: ["Kill effects and a new Effects tab in the shop", "Rare Chicken Rain event: 10x chickens everywhere", "Nuke and chicken badges unlock automatically", "New WorKour skin, more Chrome Hearts skins", "Quick Sell whole stacks, send KP in trades", "Fancy Sky, Inventory Value board, Brawler 100 HP"]
  }, {
    date: "2026-11-03",
    title: "Safer Trading",
    items: ["Trading unlocks at level 50, max 3 active trades", "Block players and choose who sends trade offers", "Items in an open trade are reserved", "Accepting a trade now needs a second confirm"]
  }, {
    date: "2026-11-03",
    title: "Chrome Skins & Speed",
    items: ["**Chrome Hearts**: calmer chrome, glowing colours", "**Crossed Out** goes chrome; both are crate jackpots", "Glock Moonrise is now Immortal", "Faster map rendering with fewer draw calls", "Smoother damage numbers and name tags", "New setting: Low Latency Canvas (Chrome)", "Chrome skins: colored crosses now glow in turn", "Error character skin now glitches", "Trade button with offer count in the lobby", "Cleaner trade window look", "Friends list now opens from the right", "Website icon now has a transparent background"]
  }, {
    date: "2026-11-02",
    title: "Trading & Quests",
    items: ["**Trading**: swap up to 6 items with players", "**Quick Sell** skins for KP", "Survive round 100 in Zombies for **Golden Zombie**", "Kill Kebin quest; Celestorm for the Elo top 10", "Double XP every weekend"]
  }, {
    date: "2026-11-02",
    title: "Skins, Party & Chat",
    items: ["Glitching **Error** skins, new **AK-47 Chrome Hearts**", "Parties of 6 that follow the leader's mode", "Chat emojis like :sob:, @name Tab, timestamps", "Pings with the mouse wheel button on every map", "Nuke kills count toward your killstreak", "Kourage: darker colours and smoother floors"]
  }, {
    date: "2026-11-01",
    title: "Fixes, Soda & Chickens",
    items: ["**KourStrike** buy wheel, key 4 and armor fixed", "Forearm hitboxes; hit markers only on real hits", "Less lag and fewer crashes in the browser", "3x more chickens, now on every map", "**Lemon Soda** skin and five **Soda Molotovs**", "Smooth **Surf** at top speed, orange sparks"]
  }, {
    date: "2026-11-01",
    title: "Hitreg & Smoother Play",
    items: ["Better **hitreg**: shots hit what you see", "Smoother play: no freezes, no drops on bad Wi-Fi", "Multi-open crates fixed, new **Unobtainable** reveal", "Smarter spawns away from enemy sight", "Smoke hides holo skins and enemy names", "Grenades roll out, fists push teammates"]
  }, {
    date: "2026-10-31",
    title: "New Lobby & Crates",
    items: ["Brand-new **lobby** design", "New **Error**, **Community**, **Halloween**, KP crates", "New community skins and **hats**", "**Punch boost**: punch walls or floor to fly", "Players collide, **speed kills** give +50", "Open crates 5x, 10x or 50x at once"]
  }, {
    date: "2026-10-27",
    title: "Knife Patterns",
    items: ["Pattern skins now on **knives**", "**Higher FPS** with shadows and many players", "New maps 1.7x with simpler textures", "Longer, fiery **surf sparks**", "No more ad buttons"]
  }, {
    date: "2026-10-26",
    title: "New Skins & Daily Case",
    items: ["New skins: **Mummy**, **Skateboarder**, **Butcher**.", "New AK-47 skin: **Toxic**.", "Husky wears an ammo sash, Burglar a mask.", "AK-47 Reve removed, owners refunded.", "**Daily case** opens without a video.", "Free crate popup removed from the lobby."]
  }, {
    date: "2026-10-26",
    title: "Bigger Maps & Party Hosting",
    items: ["**Bigger new maps**: Cargo Bay, Lighthouse & more.", "Rusty removed; shots pass through map barriers.", "Parties can **host private matches**.", "New skins: **Grassranger**, **Hollow**, **Vending Kour**.", "Pattern skins on fewer weapons, KP refunded.", "Heavy Sniper sound back, slim reload arc."]
  }, {
    date: "2026-10-25",
    title: "Celestial & Jump Pads",
    items: ["Top 10 Elo players earn the **Celestial** rank.", "**Jump pads** push you 8 m/s forward.", "Reworked **Husky** skin; Frame skins now 2,000 KP.", "**Kour Recruit** removed, owners refunded.", "Dark clan tags get a softer silver glow.", "Fixed maps not loading after updates."]
  }, {
    date: "2026-10-25",
    title: "New Maps & Heavy Sniper",
    items: ["Six new maps: **Rusty**, **Oasis**, **Canyon** & more.", "New **Heavy Sniper** model and pattern skins.", "Community skins and a new **Husky** character.", "Kill bonuses: slide, jump, collateral, 360 & more.", "Crossbow arrows, auto reload and less spread.", "KourStrike 4v4, clan captains, daily KP rewards."]
  }, {
    date: "2026-10-20",
    title: "Level 1111 & Bot Kills",
    items: ["Max level is now **1111**.", "Bot kills count in public matches.", "Click a name on leaderboards to see profiles.", "Wall jump runs share the normal leaderboards.", "Fixed false world record announcements.", "Fixed matches not loading with some skins."]
  }, {
    date: "2026-10-19",
    title: "Deagle Buff & Raw Mouse",
    items: ["**Deagle** buffed: 99 damage headshots.", "Fast low-sens flicks no longer cut short.", "Raw mouse input, no acceleration.", "New **cm/360°** and DPI settings.", "New settings: Hide Arms and Hide Weapons.", "Skins show who made them."]
  }, {
    date: "2026-10-19",
    title: "Sharper Aim & Chat Pings",
    items: ["Aiming down sights is twice as accurate.", "Slide boost and faster air strafing.", "Ping players with **@name** in chat.", "New **Nuke** leaderboard.", "Emotes now cost a tenth.", "New crosshair, tracer and mouse button settings."]
  }, {
    date: "2026-10-18",
    title: "Smoother Frames",
    items: ["Smoother frame rate in busy fights.", "New setting: **Dynamic Resolution**.", "Fast GPU used on dual-GPU laptops.", "**Heavy Sniper** and **Crossbow** textures fixed."]
  }, {
    date: "2026-10-18",
    title: "Unobtainable Skins",
    items: ["New rarity **Unobtainable**: black and animated.", "New skins: **Myrrr**, **Error**, **Ender**, **Inko**.", "New **Black** and **White Skeleton** skins.", "**Error** checker skin for every weapon.", "New AWP skin: **Into Space**.", "New **status page** with live player counts."]
  }, {
    date: "2026-10-18",
    title: "Crouch Jumps & MYTH Chicken",
    items: ["**Crouch jump** to reach higher ledges.", "New ultra-rare **MYTH Chicken**.", "New emotes: **Boxing**, **Floating**, **Swing Dance**.", "Chat and no damage in **ParKour** and **Surf**.", "Settings search, left-handed view, emote on **B**.", "Weaker bot aim, fewer freezes when players join."]
  }, {
    date: "2026-10-18",
    title: "Slow-Mo Finish & Spectating",
    items: ["**Slow motion** at the end of every match.", "**Spectator mode** in every match.", "New skin prices and **crates**, cheaper top crates.", "Crossbow faster; shotgun and flamethrower weaker.", "Zombies: more **bosses** and a cleaner HUD.", "Kour-style color picker; clan color locked."]
  }, {
    date: "2026-10-13",
    title: "Slides, Wallbangs & Gyro",
    items: ["Vanguard, Recon and Assassin can now **slide**.", "**Slidehop**: jump out of a slide.", "Every gun can **wallbang** through thin walls.", "Wallbang kills give **+50** score.", "**Gyro aiming** for PlayStation and Switch pads.", "Six new **Heavy Sniper** and six **M14** skins.", "Kourage: roofs over Mirage's indoor rooms.", "Sentinel wall jumps higher; AFK kick after 1:30.", "New About & Credits page.", "Fixed ghost shadows on shop item icons."]
  }, {
    date: "2026-10-12",
    title: "Real Snipers & Room Codes",
    items: ["**Heavy Sniper** and **Crossbow** got real 3D models.", "**M14**: new model, aim down sights, 16 rounds.", "Share hosted matches by **room code** or link.", "Join any match or party by code.", "A popup shows new inbox messages.", "**Footsteps**, jump and landing sounds.", "First shot after standing still is exact.", "Public matches only have Easy and Normal bots.", "Kourage: **Mirage** look and walkable stairs.", "16 new **profile pictures** and map banners.", "The flag is carried and swung with both hands.", "Fixed a crash after playing Crystal Kour."]
  }, {
    date: "2026-10-11",
    title: "Languages, Seasons & WebGPU",
    items: ["New languages: **German** and **Spanish**.", "**Zombies** on Legion HQ and Skyline.", "Zombies: buyable doors and a **Mystery Box**.", "**Elo seasons** with soft reset and rewards.", "PLAY prefers matches near your Elo.", "Party ready check, invite links and reconnect.", "Parties join public matches together.", "**Ghost runs**, split times and wall jump boards.", "**3D audio**: muffled behind walls, reverb per map.", "Experimental **WebGPU** renderer.", "Gamepad aim assist and vibration; keyboard menus.", "Report, ignore and click names to see profiles."]
  }, {
    date: "2026-10-10",
    title: "Regions, Trails & 3D Crates",
    items: ["Play on the nearest **server region**.", "**Movement trails** and Trail Crates.", "Real **3D crates** with drop and open animation.", "Faster shop lists with a collection filter.", "**Claim All** button for challenges.", "Guest progress carries over on first login.", "Gold and bronze letters for your name.", "Class level rewards: KP and banners.", "Zombies: revive teammates, a **Boss** zombie.", "Reconnect keeps your place after a drop.", "Lower input delay and smoother netcode.", "Faster physics; maps download much smaller."]
  }, {
    date: "2026-10-09",
    title: "Nukes, Wall Jumps & Reloads",
    items: ["**Nuke**: red countdown, new blast and flash.", "Nuke score: 300 plus 50 per killed enemy.", "Agent and Sentinel can **wall jump** once.", "Marksman and Sentinel swapped weapons.", "Heavy Sniper: 3 rounds, 6x headshot damage.", "Normal matches have 6 players.", "Zombies: own knife, coloured special zombies.", "Reload animations match the reload time.", "XM1014 shells slide in one by one.", "**Stretched res** adds view at top and bottom.", "Spawn protection ends when you attack.", "Grenade throws no longer sound like gunshots."]
  }, {
    date: "2026-10-04",
    title: "Rocket Jumps & Class Levels",
    items: ["**Rocket jumping**: your own blast launches you.", "The flamethrower pushes you back while firing.", "**Class levels** 1-30 for every class.", "Locked class weapons show your kill progress.", "KourStrike: **bunny hops** and chat.", "Kourage is a KourStrike map too.", "Revolver: hold right click to **fan** the hammer.", "The **flag** is a weapon: 100 damage.", "Shotguns can fire out of their reload.", "New zombies: Burrower, Charger, Splitter, Brute.", "Green Chickoletta is now **Kebin** (Immortal).", "Fixed lag when hitting players."]
  }, {
    date: "2026-10-03",
    title: "Kourage, Challenges & Emotes",
    items: ["New map: **Kourage**, with Hardpoint and CTF.", "New map: **ParKour 2** with its own leaderboard.", "**Emotes** with an emote wheel.", "Your party stands next to you in the lobby.", "**Challenges**: 25 per map, daily and weekly.", "Finish a map: 10,000 KP and 3 random skins.", "Profile backgrounds, banners and effects.", "Name Style editor and stacked badges.", "**Bots** in four difficulties fill small lobbies.", "Host Game: timer, max players and bots.", "ParKour and Surf leaderboards with best times.", "**Dual Pistols**; spectating with a free camera."]
  }, {
    date: "2026-10-02",
    title: "Zombies, Daily Rewards & Ranks",
    items: ["**Zombies**: co-op survival for up to 4 players.", "**Parties**: play any mode with friends.", "**Daily Rewards**: a 7-day streak, free crate.", "New Elo system with five ranks above Elite.", "New skins: Celestorm, Antique and Zombie.", "New classes: **Marksman** and **Sentinel**.", "Higher fps and no more stutter.", "Verified clans show their badge in the tag.", "Top Clans leaderboard.", "Escape closes the menu on top."]
  }, {
    date: "2026-10-01",
    title: "Capture The Flag & Clans",
    items: ["**Capture The Flag**: a new team mode.", "Select several modes for PLAY at once.", "**Crystal Kour**: a community map joins the pool.", "**Clans**: create, join and browse clans.", "**Gift Panel**: send KP to other players.", "Crosshair editor and Toggle HUD.", "Every shop item can be bought with KP.", "New skins: Hazard, Lunar Frame, Butterfly Zzz.", "Team score boxes, AFK kick, real-time shadows."]
  }, {
    date: "2026-09-30",
    title: "Accounts, Chat & Balance",
    items: ["**Accounts**: e-mail login, friends, leaderboards.", "Chat with a word filter and global chat.", "Balance pass with new weapons and classes.", "**Nuke** after 25 kills in one life.", "Smoother netcode with FPS and ping display.", "3D previews in the shop and skin selection."]
  }],
  s = /\*\*([^*\n]+?)\*\*/g,
  t = e => e.replace(s, "<b><color=#2198F1>$1</color></b>"),
  o = (e = a) => e[0] ?? null,
  r = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  n = () => "News & Changes\n<size=60%>What is new in the game, newest first.";
function i(e, a) {
  return `v4.${24 + Math.max(1, Math.trunc(a) - Math.max(0, Math.trunc(e)))}`;
}
function l(e = a, o = e.map((item, index) => i(index, e.length))) {
  return e.map((item, index) => {
    return `<color=#e6b029><b>${function (e) {
      const a = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e);
      if (!a) return e;
      const s = Number(a[3]),
        t = s % 100 >= 11 && s % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][s % 10] ?? "th";
      return `${r[Number(a[2]) - 1] ?? a[2]} ${s}${t}, ${a[1]}`;
    }(item.date)}: ${n = item.title, n.replace(s, "$1")}</b></color>` + (o[index] ? `  <alpha=#88>${o[index]}<alpha=#FF>` : "") + "\n" + item.items.map(_item => `- ${t(_item)}`).join("\n");
    var n;
  }).join("\n<size=50%> </size>\n");
}
export { t as a, i, e as n, o, l as r, n as s, a as t };

;(()=>{try{const proof={"file":"airstraf.ing/assets/c-CISf5kK1.js","readableSha256":"bea388a474745b09ce5c9954ad829b38f578d28822af52cb51ddf0a0eb45a1ef"};const key="__AIRSTRAF_REPLACEMENTS__";const list=Array.isArray(globalThis[key])?globalThis[key]:(globalThis[key]=[]);if(!list.some(x=>x.file===proof.file))list.push({...proof,executedAt:new Date().toISOString()});}catch{}})();

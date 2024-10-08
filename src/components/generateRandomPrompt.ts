const exampleSentences = [
  "Breath of the Wild, Genshin Impact, and Immortals Fenyx Rising.",
  "Hollow Knight, Ori and the Blind Forest, and Dead Cells.",
  "Hades, Rogue Legacy, and Spelunky.",
  "Among Us, Fall Guys, and Human: Fall Flat.",
  "Dark Souls, Sekiro, and Nioh.",
  "Stardew Valley, My Time at Portia, and Harvest Moon.",
  "Fortnite, Apex Legends, and Call of Duty: Warzone.",
  "Final Fantasy XV, Dragon Quest XI, and Persona 5.",
  "Resident Evil Village, The Evil Within, and Outlast.",
  "The Sims 4, Animal Crossing: New Horizons, and My Time at Sandrock.",
  "Red Dead Redemption 2, Ghost of Tsushima, and Assassin's Creed Valhalla.",
  "Portal 2, The Witness, and Baba Is You.",
  "Cyberpunk 2077, Deus Ex, and Watch Dogs Legion.",
  "Super Mario Odyssey, Banjo-Kazooie, and A Hat in Time.",
  "Doom Eternal, Wolfenstein II, and Metro Exodus.",
  "The Legend of Zelda: Link's Awakening, Blossom Tales, and Tunic.",
  "Monster Hunter World, Dauntless, and God Eater 3.",
  "Divinity: Original Sin 2, Baldur's Gate 3, and Pillars of Eternity.",
  "Subnautica, The Forest, and Raft.",
  "Horizon Zero Dawn, Far Cry 5, and The Outer Worlds.",
  "Cuphead, Hollow Knight, and Shovel Knight.",
  "The Elder Scrolls V: Skyrim, Fallout 4, and The Outer Worlds.",
  "Dead by Daylight, Friday the 13th, and Phasmophobia.",
  "Civilization VI, Stellaris, and Crusader Kings III.",
  "NieR: Automata, Bayonetta, and Devil May Cry 5.",
  "Splatoon 2, Overwatch, and Team Fortress 2.",
  "Uncharted 4, Tomb Raider, and Prince of Persia.",
  "Bioshock Infinite, Dishonored, and Prey.",
  "Celeste, Super Meat Boy, and Ori and the Will of the Wisps.",
  "Ghost of Tsushima, Sekiro: Shadows Die Twice, and Nioh 2.",
  "Hollow Knight, Blasphemous, and Bloodstained: Ritual of the Night.",
  "Control, Alan Wake, and Quantum Break.",
  "The Witcher 3: Wild Hunt, Dragon Age: Inquisition, and Kingdom Come: Deliverance.",
  "Yakuza 0, Shenmue III, and Sleeping Dogs.",
  "Fire Emblem: Three Houses, XCOM 2, and Advance Wars.",
  "RimWorld, Dwarf Fortress, and Oxygen Not Included.",
  "Hitman 3, Dishonored 2, and Thief.",
  "The Talos Principle, Antichamber, and The Stanley Parable.",
  "Spelunky 2, Dead Cells, and Enter the Gungeon.",
  "Journey, Abzu, and Gris.",
  "Doom (2016), Quake Champions, and Unreal Tournament.",
  "Hollow Knight, Axiom Verge, and Guacamelee!",
  "Borderlands 3, Destiny 2, and Warframe.",
  "Terraria, Don't Starve, and RimWorld.",
  "Dragon Age: Origins, The Witcher 2, and Mass Effect 2.",
  "Forza Horizon 4, Gran Turismo Sport, and Need for Speed Heat.",
  "Sekiro: Shadows Die Twice, Ghostrunner, and Katana Zero.",
  "Diablo III, Path of Exile, and Torchlight II.",
  "Metro Exodus, S.T.A.L.K.E.R., and Fallout: New Vegas.",
  "Little Nightmares, Limbo, and Inside.",
  "Bastion, Transistor, and Pyre.",
  "Slay the Spire, Monster Train, and Griftlands.",
  "Factorio, Satisfactory, and Dyson Sphere Program.",
  "Half-Life: Alyx, Boneworks, and The Walking Dead: Saints & Sinners.",
  "Persona 5 Royal, Catherine, and Tokyo Xanadu.",
  "Rocket League, Knockout City, and Mario Kart 8 Deluxe.",
  "Apex Legends, PUBG, and Battlefield V.",
  "Darkest Dungeon, Slay the Spire, and Hades.",
  "Wasteland 3, Fallout Tactics, and Mutant Year Zero.",
  "Gears 5, Halo Infinite, and Titanfall 2.",
  "RimWorld, Dwarf Fortress, and Banished.",
  "Civilization VI, Age of Wonders: Planetfall, and Total War: Three Kingdoms.",
  "Nier: Automata, Astral Chain, and Code Vein.",
  "Bloodborne, Demon’s Souls, and Ashen.",
  "Cyberpunk 2077, Deus Ex: Mankind Divided, and System Shock 2.",
  "Hollow Knight, Ender Lilies, and Salt and Sanctuary.",
  "Hotline Miami, Katana ZERO, and Ruiner.",
  "Ori and the Will of the Wisps, Child of Light, and Hollow Knight.",
  "Cities: Skylines, SimCity, and Tropico 6.",
  "Outlast, Amnesia: The Dark Descent, and Alien: Isolation.",
  "Games similar to Skyrim and The Witcher 3.",
  "Best co-op games for Xbox Series X.",
  "Top-rated indie platformers released in the last 5 years.",
  "Games with a storyline similar to The Last of Us.",
  "Best roguelike games of all time.",
  "Open-world games with the best graphics.",
  "Best multiplayer first-person shooters available on PC.",
  "Games with a similar vibe to Stardew Valley and Animal Crossing.",
  "Top horror games released in 2023.",
  "Best VR games for Oculus Quest 2.",
  "Fantasy RPGs with extensive character customization.",
  "Games like Dark Souls and Bloodborne.",
  "Top strategy games similar to Civilization and Age of Empires.",
  "Best puzzle games for mobile devices.",
  "Sci-fi games with immersive storytelling.",
  "Best racing games for PlayStation 5.",
  "Games similar to Resident Evil and Silent Hill.",
  "Top sandbox games with creative building mechanics.",
  "Best action-adventure games with female protagonists.",
  "Games like Red Dead Redemption 2 with rich narratives.",
  "Best sports simulation games available on current-gen consoles.",
  "Top-rated turn-based RPGs.",
  "Games with a cyberpunk aesthetic similar to Cyberpunk 2077.",
  "Best games with procedurally generated worlds.",
  "Games similar to Halo and Destiny.",
  "Top JRPGs with engaging combat systems.",
  "Games like Portal and The Talos Principle.",
  "Best survival games for solo players.",
  "Games with Norse mythology themes.",
  "Best games for a group of friends to play online.",
  "Top metroidvania games of the last decade.",
  "Games like Assassin’s Creed and Ghost of Tsushima.",
  "Best mobile games with no in-app purchases.",
  "Games similar to Bioshock and System Shock.",
  "Top stealth games for PC.",
  "Best educational games for kids.",
  "Games like Minecraft and Terraria.",
  "Top-rated visual novels with romance elements.",
  "Games with time travel mechanics.",
  "Best historical strategy games.",
  "Games similar to Mass Effect and Star Wars: Knights of the Old Republic.",
  "Top rhythm games available on consoles.",
  "Best hack and slash games of all time.",
  "Games like The Sims and SimCity.",
  "Top-rated card games like Hearthstone and Gwent.",
  "Games with cel-shaded graphics similar to Borderlands.",
  "Best mystery and detective games.",
  "Games with parkour mechanics like Mirror’s Edge.",
  "Top survival horror games for VR.",
  "Best superhero games available on any platform.",
];

export function generateRandomPrompt(): string {
  const randomIndex = Math.floor(Math.random() * exampleSentences.length);
  return exampleSentences[randomIndex] ?? "";
}

const pokemonList = [
    {
      name: "Bulbasaur",
      types: ["grass", "poison"],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        speed: 45,
        spAtk: 65,
        spDef: 65
      },
      description: "For some time after its birth, it grows by gaining nourishment from the seed on its back.",
      height: "0.7 m",
      weight: "6.9 kg",
      abilities: ["Chlorophyll", "Overgrow"],
      evolutions: [
        {
          to: "Ivysaur",
          method: "level_up",
          level: 16
        }
      ]
    },
    {
      name: "Charmander",
      types: ["fire"],
      stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        speed: 65,
        spAtk: 60,
        spDef: 50
      },
      description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
      height: "0.6 m",
      weight: "8.5 kg",
      abilities: ["Blaze", "Solar Power"],
      evolutions: [
        {
          to: "Charmeleon",
          method: "level_up",
          level: 16
        }
      ]
    },
    {
      name: "Squirtle",
      types: ["water"],
      stats: {
        hp: 44,
        attack: 48,
        defense: 65,
        speed: 43,
        spAtk: 50,
        spDef: 64
      },
      description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
      height: "0.5 m",
      weight: "9.0 kg",
      abilities: ["Torrent", "Rain Dish"],
      evolutions: [
        {
          to: "Wartortle",
          method: "level_up",
          level: 16
        }
      ]
    },
    {
      name: "Pikachu",
      types: ["electric"],
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90,
        spAtk: 50,
        spDef: 50
      },
      description: "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
      height: "0.4 m",
      weight: "6.0 kg",
      abilities: ["Static", "Lightning Rod"],
      evolutions: [
        {
          to: "Raichu",
          method: "use_item",
          item: "Thunder Stone"
        }
      ]
    },
    {
      name: "Jigglypuff",
      types: ["normal", "fairy"],
      stats: {
        hp: 115,
        attack: 45,
        defense: 20,
        speed: 20,
        spAtk: 45,
        spDef: 25
      },
      description: "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
      height: "0.5 m",
      weight: "5.5 kg",
      abilities: ["Cute Charm", "Competitive", "Friend Guard"],
      evolutions: [
        {
          to: "Wigglytuff",
          method: "use_item",
          item: "Moon Stone"
        }
      ]
    }
  ];
  
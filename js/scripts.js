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
    },
    {
      name: "Charizard",
      types: ["fire", "flying"],
      stats: {
        hp: 78,
        attack: 84,
        defense: 78,
        speed: 100,
        spAtk: 109,
        spDef: 85
      },
      description: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
      height: "1.7 m",
      weight: "90.5 kg",
      abilities: ["Blaze", "Solar Power"],
      evolutions: []
    },
    {
      name: "Blastoise",
      types: ["water"],
      stats: {
        hp: 79,
        attack: 83,
        defense: 100,
        speed: 78,
        spAtk: 85,
        spDef: 105
      },
      description: "It deliberately makes itself heavy to withstand the recoil of the water jets it fires.",
      height: "1.6 m",
      weight: "85.5 kg",
      abilities: ["Torrent", "Rain Dish"],
      evolutions: []
    },
    {
      name: "Snorlax",
      types: ["normal"],
      stats: {
        hp: 160,
        attack: 110,
        defense: 65,
        speed: 30,
        spAtk: 65,
        spDef: 110
      },
      description: "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.",
      height: "2.1 m",
      weight: "460 kg",
      abilities: ["Immunity", "Thick Fat", "Gluttony"],
      evolutions: []
    },
    {
      name: "Dragonite",
      types: ["dragon", "flying"],
      stats: {
        hp: 91,
        attack: 134,
        defense: 95,
        speed: 80,
        spAtk: 100,
        spDef: 100
      },
      description: "An extremely rare Pokémon that is said to fly faster than the speed of sound.",
      height: "2.2 m",
      weight: "210 kg",
      abilities: ["Inner Focus", "Multiscale"],
      evolutions: []
    },
    {
      name: "Tyranitar",
      types: ["rock", "dark"],
      stats: {
        hp: 100,
        attack: 134,
        defense: 110,
        speed: 61,
        spAtk: 95,
        spDef: 100
      },
      description: "If it rampages, it knocks down mountains and buries rivers. Maps must be redrawn afterward.",
      height: "2.0 m",
      weight: "202 kg",
      abilities: ["Sand Stream", "Unnerve"],
      evolutions: []
    },
    {
      name: "Gyarados",
      types: ["water", "flying"],
      stats: {
        hp: 95,
        attack: 125,
        defense: 79,
        speed: 81,
        spAtk: 60,
        spDef: 100
      },
      description: "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.",
      height: "6.5 m",
      weight: "235 kg",
      abilities: ["Intimidate", "Moxie"],
      evolutions: []
    },
    {
      name: "Metagross",
      types: ["steel", "psychic"],
      stats: {
        hp: 80,
        attack: 135,
        defense: 130,
        speed: 70,
        spAtk: 95,
        spDef: 90
      },
      description: "It uses its four brains to analyze complex calculations and defeat opponents in battle.",
      height: "1.6 m",
      weight: "550 kg",
      abilities: ["Clear Body", "Light Metal"],
      evolutions: []
    },
    {
      name: "Aggron",
      types: ["steel", "rock"],
      stats: {
        hp: 70,
        attack: 110,
        defense: 180,
        speed: 50,
        spAtk: 60,
        spDef: 60
      },
      description: "It claims an entire mountain as its own. The more wounds it has, the more battles it's won.",
      height: "2.1 m",
      weight: "360 kg",
      abilities: ["Sturdy", "Rock Head", "Heavy Metal"],
      evolutions: []
    },
    {
      name: "Haxorus",
      types: ["dragon"],
      stats: {
        hp: 76,
        attack: 147,
        defense: 90,
        speed: 97,
        spAtk: 60,
        spDef: 70
      },
      description: "Its resilient tusks are its pride and joy. It can cut through steel beams with them.",
      height: "1.8 m",
      weight: "105.5 kg",
      abilities: ["Rivalry", "Mold Breaker", "Unnerve"],
      evolutions: []
    },
    {
      name: "Salamence",
      types: ["dragon", "flying"],
      stats: {
        hp: 95,
        attack: 135,
        defense: 80,
        speed: 100,
        spAtk: 110,
        spDef: 80
      },
      description: "It becomes uncontrollable if enraged. It destroys everything with its overwhelming power.",
      height: "1.5 m",
      weight: "102.6 kg",
      abilities: ["Intimidate", "Moxie"],
      evolutions: []
    }
  ];
  


  for (let i = 0; i < pokemonList.length; i++) {
    document.write(`<p>${pokemonList[i].name} - Height: ${pokemonList[i].height}`);
    if (parseFloat(pokemonList[i].height) > 1) {
      document.write(` - Wow, That's Big!`);
    }
    document.write(`</p>`);
  }
const pokemonRepository = (function () {
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
        spDef: 65,
      },
      description:
        "For some time after its birth, it grows by gaining nourishment from the seed on its back.",
      height: "0.7 m",
      weight: "6.9 kg",
      abilities: ["Chlorophyll", "Overgrow"],
      evolutions: [{ to: "Ivysaur", method: "level_up", level: 16 }],
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
        spDef: 50,
      },
      description:
        "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
      height: "0.6 m",
      weight: "8.5 kg",
      abilities: ["Blaze", "Solar Power"],
      evolutions: [{ to: "Charmeleon", method: "level_up", level: 16 }],
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
        spDef: 64,
      },
      description:
        "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
      height: "0.5 m",
      weight: "9.0 kg",
      abilities: ["Torrent", "Rain Dish"],
      evolutions: [{ to: "Wartortle", method: "level_up", level: 16 }],
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
        spDef: 50,
      },
      description:
        "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
      height: "0.4 m",
      weight: "6.0 kg",
      abilities: ["Static", "Lightning Rod"],
      evolutions: [{ to: "Raichu", method: "use_item", item: "Thunder Stone" }],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    const modal = document.getElementById("pokemon-modal");
    const title = modal.querySelector(".modal-title");
    const description = modal.querySelector(".modal-description");
    const info = modal.querySelector(".modal-stats");

    title.textContent = pokemon.name;
    description.textContent = pokemon.description;
    info.textContent = `Height: ${pokemon.height}, Weight: ${pokemon.weight}, Types: ${pokemon.types.join(
      ", "
    )}, Abilities: ${pokemon.abilities.join(", ")}`;

    modal.classList.remove("hidden");
  }

  function getImageId(name) {
    const map = {
      Bulbasaur: "1",
      Charmander: "4",
      Squirtle: "7",
      Pikachu: "25",
    };
    return map[name];
  }

  function addCardItem(pokemon) {
    const grid = document.querySelector(".pokemon-grid");

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getImageId(
      pokemon.name
    )}.png`;
    img.alt = pokemon.name;

    const name = document.createElement("h4");
    name.textContent = pokemon.name;

    const id = document.createElement("p");
    id.textContent = `#${getImageId(pokemon.name).padStart(3, "0")}`;

    const type = document.createElement("span");
    type.classList.add("type");
    type.textContent = pokemon.types[0];
    type.classList.add(pokemon.types[0]);

    const button = document.createElement("button");
    button.classList.add("card-btn", "pokemon-button");
    button.textContent = "View Details";
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(type);
    card.appendChild(button);

    grid.appendChild(card);
  }

  return {
    getAll,
    addCardItem,
    showDetails,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
 
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addCardItem(pokemon);
  });

 
  const closeButton = document.querySelector(".close-button");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      document.getElementById("pokemon-modal").classList.add("hidden");
    });
  }
});

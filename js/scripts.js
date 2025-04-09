// === Pokémon Repository Module ===
// Stores, loads, and manages Pokémon data
const pokemonRepository = (function () {
  const allPokemonList = []; // All fetched Pokémon (names + URLs)
  let offset = 0;            // For future pagination (not used currently)
  const chunkSize = 150;     // Number of Pokémon to load per chunk
  const apiBase = 'https://pokeapi.co/api/v2/pokemon/';
  let detailLoaded = 0;      // Counter for how many details we've loaded

  // Add Pokémon to local array
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      allPokemonList.push(pokemon);
    }
  }

  // Return full Pokémon list
  function getAll() {
    return allPokemonList;
  }

  // Fetch all Pokémon basic data (name + detailsUrl)
  function loadList() {
    if (allPokemonList.length > 0) return Promise.resolve(); // Avoid re-fetching

    return fetch(`${apiBase}?limit=1500`)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(item => {
          add({ name: item.name, detailsUrl: item.url });
        });
      });
  }

  // Fetch full details for a specific Pokémon (height, types, etc.)
  function loadDetails(pokemon) {
    if (pokemon.types) return Promise.resolve(); // Already loaded

    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(details => {
        pokemon.height = `${details.height / 10} m`;
        pokemon.weight = `${details.weight / 10} kg`;
        pokemon.types = details.types.map(type => type.type.name);
        pokemon.abilities = details.abilities.map(a => a.ability.name);
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.description = `A wild ${pokemon.name} appeared!`;
      });
  }

  // Load the next chunk of Pokémon and return with full details
  function loadNextChunk() {
    const chunk = allPokemonList.slice(detailLoaded, detailLoaded + chunkSize);
    detailLoaded += chunk.length;
    const promises = chunk.map(pokemon => loadDetails(pokemon));
    return Promise.all(promises).then(() => chunk);
  }

  return {
    getAll,
    loadList,
    loadDetails,
    loadNextChunk
  };
})();

// === Display Pokémon Cards ===
// Dynamically creates cards in the grid
function displayPokemon(pokemonList, clear = false) {
  const grid = document.querySelector('.pokemon-grid');
  if (!grid) return; // Avoid crashing on pages without this element

  if (clear) grid.innerHTML = ''; // Clear grid if needed

  pokemonList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const title = document.createElement('h3');
    title.textContent = pokemon.name;

    const img = document.createElement('img');
    img.src = pokemon.imageUrl || '';
    img.alt = pokemon.name;

    card.appendChild(title);
    card.appendChild(img);
    card.addEventListener('click', () => showDetails(pokemon));

    grid.appendChild(card);
  });
}

// === Show Pokémon Details in Modal ===
function showDetails(pokemon) {
  const modal = document.getElementById('pokemon-modal');
  const title = modal.querySelector('.modal-title');
  const description = modal.querySelector('.modal-description');
  const stats = modal.querySelector('.modal-stats');
  const imageContainer = modal.querySelector('.modal-image');

  title.textContent = pokemon.name;
  description.textContent = pokemon.description;

  stats.innerHTML = '';
  imageContainer.innerHTML = '';

  const image = document.createElement('img');
  image.src = pokemon.imageUrl;
  image.alt = pokemon.name;
  image.classList.add('modal-pokemon-image');
  imageContainer.appendChild(image);

  const height = document.createElement('p');
  height.textContent = `Height: ${pokemon.height}`;

  const weight = document.createElement('p');
  weight.textContent = `Weight: ${pokemon.weight}`;

  const types = document.createElement('p');
  types.textContent = `Types: ${pokemon.types.join(', ')}`;

  const abilities = document.createElement('p');
  abilities.textContent = `Abilities: ${pokemon.abilities.join(', ')}`;

  stats.appendChild(height);
  stats.appendChild(weight);
  stats.appendChild(types);
  stats.appendChild(abilities);

  modal.classList.remove('hidden');
}

// === Filter Pokémon by Type ===
function filterPokemon(type) {
  const all = pokemonRepository.getAll();
  const filtered = type === 'all'
    ? all
    : all.filter(p => p.types && p.types.includes(type));
  displayPokemon(filtered, true);
}

// === Main App Initialization ===
document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      document.getElementById('pokemon-modal').classList.add('hidden');
    });
  }

  const typeButtons = document.querySelectorAll('.type-btn');
  let isLoading = false;

  const isDexPage = !document.body.classList.contains('types-page');

  // === If on the Types Page ===
  if (!isDexPage && typeof loadAndRenderTypes === 'function') {
    loadAndRenderTypes();
  }

  // === If on the Pokédex Page ===
  if (isDexPage) {
    if (typeof setupSearch === 'function') {
      setupSearch(); // optional search module
    }

    pokemonRepository.loadList().then(() => {
      loadNext(); // Load initial chunk

      // Lazy loading on scroll
      window.addEventListener('scroll', () => {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if (nearBottom) loadNext();
      });

      // Filter buttons (Fire, Water, etc.)
      typeButtons.forEach(button => {
        button.addEventListener('click', () => {
          const type = button.getAttribute('data-type');
          filterPokemon(type);
        });
      });
    });
  }

  // === Load Next Chunk of Pokémon ===
  function loadNext() {
    if (isLoading) return;
    isLoading = true;
    pokemonRepository.loadNextChunk().then(chunk => {
      displayPokemon(chunk);
      isLoading = false;
    });
  }
});

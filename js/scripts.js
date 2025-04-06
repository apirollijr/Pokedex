const pokemonRepository = (function () {
  const allPokemonList = [];
  let offset = 0;
  const chunkSize = 150;
  const apiBase = 'https://pokeapi.co/api/v2/pokemon/';
  let detailLoaded = 0;

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      allPokemonList.push(pokemon);
    }
  }

  function getAll() {
    return allPokemonList;
  }

  function loadList() {
    // Preload all Pokémon names/URLs only once
    if (allPokemonList.length > 0) return Promise.resolve();
    return fetch(`${apiBase}?limit=1500`)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(item => {
          add({ name: item.name, detailsUrl: item.url });
        });
      });
  }

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

function displayPokemon(pokemonList, clear = false) {
  const grid = document.querySelector('.pokemon-grid');
  if (clear) grid.innerHTML = '';

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

function filterPokemon(type) {
  const all = pokemonRepository.getAll();
  const filtered = type === 'all'
    ? all
    : all.filter(p => p.types && p.types.includes(type));
  displayPokemon(filtered, true);
}

document.querySelector('.close-button').addEventListener('click', () => {
  document.getElementById('pokemon-modal').classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const typeButtons = document.querySelectorAll('.type-btn');
  let isLoading = false;

  pokemonRepository.loadList().then(() => {
    // Load the first chunk of full Pokémon data
    loadNext();
    setupSearch();

    // Lazy loading
    window.addEventListener('scroll', () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom) loadNext();
    });

    // Filter buttons
    typeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        filterPokemon(type);
      });
    });
  });

  function loadNext() {
    if (isLoading) return;
    isLoading = true;
    pokemonRepository.loadNextChunk().then(chunk => {
      displayPokemon(chunk);
      isLoading = false;
    });
  }
});

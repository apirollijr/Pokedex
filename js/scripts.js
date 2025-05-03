// === Pokémon Repository Module ===
const pokemonRepository = (function () {
  const allPokemonList = [];
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

  function getPokemonId(detailsUrl) {
    const parts = detailsUrl.split('/');
    return parts[parts.length - 2];
  }

  function getOfficialArtworkUrl(detailsUrl) {
    const id = getPokemonId(detailsUrl);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  function loadList() {
    if (allPokemonList.length > 0) return Promise.resolve();
    return fetch(`${apiBase}?limit=1500`)
      .then((res) => res.json())
      .then((json) =>
        json.results.forEach((item) => add({ name: item.name, detailsUrl: item.url })),
      );
  }

  function loadDetails(pokemon) {
    if (pokemon.types) return Promise.resolve();

    return fetch(pokemon.detailsUrl)
      .then((res) => res.json())
      .then((details) => {
        pokemon.height = `${(details.height * 0.328084).toFixed(1)} ft`;
        pokemon.weight = `${(details.weight * 0.220462).toFixed(1)} lbs`;
        pokemon.types = details.types.map((t) => t.type.name);
        pokemon.abilities = details.abilities.map((a) => a.ability.name);
        pokemon.baseStats = details.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }));
        pokemon.id = details.id;
        return fetch(details.species.url);
      })
      .then((res) => res.json())
      .then((species) => {
        const flavor = species.flavor_text_entries.find((entry) => entry.language.name === 'en');
        const category = species.genera.find((g) => g.language.name === 'en');
        pokemon.description = flavor
          ? flavor.flavor_text.replace(/\f/g, ' ')
          : 'No description available.';
        pokemon.category = category ? category.genus : '';
        pokemon.genderRate = species.gender_rate;
        pokemon.evolutionChainUrl = species.evolution_chain.url;
      });
  }

  function loadNextChunk() {
    const chunk = allPokemonList.slice(detailLoaded, detailLoaded + chunkSize);
    detailLoaded += chunk.length;
    return Promise.all(chunk.map((pokemon) => loadDetails(pokemon))).then(() => chunk);
  }

  return { getAll, loadList, loadDetails, loadNextChunk, getOfficialArtworkUrl };
})();

// === Utilities ===
function createTextLine(label, value) {
  const p = document.createElement('p');
  p.innerHTML = `<strong>${label}:</strong> ${value}`;
  return p;
}

function createStatBars(stats) {
  const container = document.createElement('div');
  container.classList.add('stat-bars');
  stats.forEach((stat) => {
    const statBlock = document.createElement('div');
    statBlock.classList.add('stat');

    const label = document.createElement('div');
    label.classList.add('label');
    label.innerHTML = `<span>${stat.name.toUpperCase()}</span><span>${stat.value}</span>`;

    const barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.width = `${Math.min(stat.value, 100)}%`;

    barContainer.appendChild(bar);
    statBlock.appendChild(label);
    statBlock.appendChild(barContainer);
    container.appendChild(statBlock);
  });
  return container;
}

function getGenderIcons(rate) {
  if (rate === -1) return '⚪ Genderless';
  const female = rate * 12.5;
  const male = 100 - female;
  return `♂ ${male}% &nbsp;&nbsp; ♀ ${female}%`;
}

function loadEvolutionChain(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const chain = [];
      let evo = data.chain;
      while (evo) {
        chain.push({ name: evo.species.name });
        evo = evo.evolves_to[0];
      }
      return chain;
    });
}

// === Display Pokémon Cards ===
function displayPokemon(pokemonList, clear = false) {
  const grid = document.querySelector('.pokemon-grid');
  if (!grid) return;
  if (clear) grid.innerHTML = '';

  pokemonList.forEach((pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const title = document.createElement('h3');
    title.textContent = pokemon.name;

    const img = document.createElement('img');
    img.src = pokemonRepository.getOfficialArtworkUrl(pokemon.detailsUrl);
    img.alt = pokemon.name;
    img.classList.add('pokemon-image');

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
  const categoryBox = modal.querySelector('.modal-category');
  const genderBox = modal.querySelector('.modal-gender');
  const typesBox = modal.querySelector('.modal-types');
  const weaknessesBox = modal.querySelector('.modal-weaknesses');
  const weaknessLabel = document.createElement('h4');
  const evolutionBox = modal.querySelector('.modal-evolution');

  // Clear modal
  title.textContent = pokemon.name;
  description.textContent = pokemon.description;
  stats.innerHTML = '';
  imageContainer.innerHTML = '';
  categoryBox.innerHTML = '';
  genderBox.innerHTML = '';
  typesBox.innerHTML = '';
  weaknessesBox.innerHTML = '';
  evolutionBox.innerHTML = '';

  // Image
  const image = document.createElement('img');
  image.src = pokemonRepository.getOfficialArtworkUrl(pokemon.detailsUrl);
  image.alt = pokemon.name;
  image.classList.add('modal-pokemon-image');
  imageContainer.appendChild(image);

  // Basic info
  stats.appendChild(document.createElement('hr'));
  stats.appendChild(createTextLine('Height', pokemon.height));
  stats.appendChild(createTextLine('Weight', pokemon.weight));
  stats.appendChild(createTextLine('Abilities', pokemon.abilities.join(', ')));

  if (pokemon.category) {
    categoryBox.textContent = `Category: ${pokemon.category}`;
  }

  const genderIcons = document.createElement('p');
  genderIcons.innerHTML = getGenderIcons(pokemon.genderRate);
  genderBox.appendChild(genderIcons);

  // Types
  typesBox.innerHTML = '';
  pokemon.types.forEach((type) => {
    const badge = document.createElement('div');
    badge.classList.add('type-badge', `type-${type.toLowerCase()}`);
    badge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typesBox.appendChild(badge);
  });

  // Weaknesses
  weaknessesBox.innerHTML = '';
  fetch(`https://pokeapi.co/api/v2/type/${pokemon.types[0]}`)
    .then((res) => res.json())
    .then((data) => {
      const weakTo = data.damage_relations.double_damage_from;
      weakTo.forEach((type) => {
        const badge = document.createElement('div');
        badge.classList.add('type-badge', `type-${type.name}`);
        badge.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        weaknessesBox.appendChild(badge);
      });
    });

  // Stats chart
  stats.appendChild(document.createElement('hr'));
  stats.appendChild(createStatBars(pokemon.baseStats));

  // === Evolutions ===
  evolutionBox.innerHTML = '';

  loadEvolutionChain(pokemon.evolutionChainUrl).then((chain) => {
    chain.forEach((p) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
        .then((res) => res.json())
        .then((data) => {
          const evoBox = document.createElement('div');
          evoBox.classList.add('evolution-box');
          evoBox.style.cursor = 'pointer';

          const img = document.createElement('img');
          img.src = data.sprites.other['official-artwork'].front_default;
          img.alt = data.name;

          const label = document.createElement('span');
          label.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

          evoBox.appendChild(img);
          evoBox.appendChild(label);
          evolutionBox.appendChild(evoBox);

          // ✅ Clean single click handler with fade
          evoBox.addEventListener('click', () => {
            const modalContent = document.querySelector('.modal-content');

            // Fade out
            modalContent.classList.remove('fade-in');
            modalContent.classList.add('fade-out');

            setTimeout(() => {
              pokemonRepository
                .loadDetails({
                  name: data.name,
                  detailsUrl: `https://pokeapi.co/api/v2/pokemon/${data.name}/`,
                })
                .then(() => {
                  const selectedPokemon = pokemonRepository
                    .getAll()
                    .find((p) => p.name === data.name);
                  if (selectedPokemon) showDetails(selectedPokemon);

                  // Fade in
                  modalContent.classList.remove('fade-out');
                  modalContent.classList.add('fade-in');
                });
            }, 300); // Match CSS transition
          });
        });
    });
  });

  modal.classList.remove('hidden');
}

// === Filters & Init ===
function filterPokemon(type) {
  const all = pokemonRepository.getAll();
  const filtered = type === 'all' ? all : all.filter((p) => p.types && p.types.includes(type));
  displayPokemon(filtered, true);
}

document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.close-button');
  const modal = document.getElementById('pokemon-modal');
  const typeButtons = document.querySelectorAll('.type-btn');
  let isLoading = false;

  if (closeButton) {
    closeButton.addEventListener('click', () => modal.classList.add('hidden'));
  }

  document.addEventListener('keydown', (e) => {
    if (['Escape', 'Enter'].includes(e.key) && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  const isDexPage = !document.body.classList.contains('types-page');

  if (!isDexPage && typeof loadAndRenderTypes === 'function') {
    loadAndRenderTypes();
  }

  if (isDexPage) {
    if (typeof setupSearch === 'function') setupSearch();

    pokemonRepository.loadList().then(() => {
      loadNext();

      window.addEventListener('scroll', () => {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if (nearBottom) loadNext();
      });

      typeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const type = btn.getAttribute('data-type');
          filterPokemon(type);
        });
      });
    });
  }

  function loadNext() {
    if (isLoading) return;
    isLoading = true;
    pokemonRepository.loadNextChunk().then((chunk) => {
      displayPokemon(chunk);
      isLoading = false;
    });
  }
});

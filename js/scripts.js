const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error('Invalid Pokémon:', pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(item => {
          add({ name: item.name, detailsUrl: item.url });
        });
      })
      .catch(console.error);
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(details => {
        pokemon.height = `${details.height / 10} m`;
        pokemon.weight = `${details.weight / 10} kg`;
        pokemon.types = details.types.map(type => type.type.name);
        pokemon.abilities = details.abilities.map(a => a.ability.name);
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.description = `A wild ${pokemon.name} appeared!`;
      })
      .catch(console.error);
  }

  function addCardItem(pokemon) {
    const grid = document.querySelectorAll('.pokemon-grid')[1];
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
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(() => {
      console.log(pokemon);
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
    });
  }

  return {
    add,
    getAll,
    loadList,
    loadDetails,
    addCardItem,
  };
})();

document.querySelector('.close-button').addEventListener('click', () => {
  document.getElementById('pokemon-modal').classList.add('hidden');
});

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.loadDetails(pokemon).then(() => {
      pokemonRepository.addCardItem(pokemon);
    });
  });
});

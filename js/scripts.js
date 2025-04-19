window.pokemonLoaded = false;

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=400';
  const pokemonGrid = document.getElementById('pokemonGrid');

  function fetchPokemonList() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(pokemon => fetchPokemonDetails(pokemon));
        Promise.all(promises).then(() => {
          window.pokemonLoaded = true;
          console.log("✅ All Pokémon loaded");
        });
      });
  }
  

  function fetchPokemonDetails(pokemon) {
    return fetch(pokemon.url)
      .then(response => response.json())
      .then(details => {
        const card = createPokemonCard(details);
        pokemonGrid.appendChild(card);
      });
  }
  

  window.createPokemonCard = function (pokemon) {
    const col = document.createElement('div');
    col.className = 'col';
  
    const card = document.createElement('div');
    card.className = 'card text-center shadow-sm';
    card.setAttribute('data-name', pokemon.name.toLowerCase());
    card.setAttribute('data-id', pokemon.id.toString());
  
    // 🔥 Add data-types
    const types = pokemon.types.map(t => t.type.name.toLowerCase());
    card.setAttribute('data-types', types.join(' ')); // e.g., "fire flying"
  
    const image = document.createElement('img');
    image.src = pokemon.sprites.other['official-artwork'].front_default;
    image.className = 'card-img-top';
    image.alt = pokemon.name;
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
  
    const title = document.createElement('h5');
    title.className = 'card-title text-capitalize';
    title.textContent = pokemon.name;
  
    const height = document.createElement('p');
    height.className = 'card-text mb-1';
    height.textContent = `Height: ${pokemon.height / 10} m`;
  
    const weight = document.createElement('p');
    weight.className = 'card-text';
    weight.textContent = `Weight: ${pokemon.weight / 10} kg`;
  
    cardBody.appendChild(title);
    cardBody.appendChild(height);
    cardBody.appendChild(weight);
    card.appendChild(image);
    card.appendChild(cardBody);
    col.appendChild(card);
  
    return col;
  };
  
  fetchPokemonList();
});

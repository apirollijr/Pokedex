function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      const allPokemon = pokemonRepository.getAll();
  
      const filtered = allPokemon.filter((pokemon, index) => {
        const nameMatch = pokemon.name.toLowerCase().includes(query);
        const numberMatch = (index + 1).toString() === query;
        return nameMatch || numberMatch;
      });
  
      
      const detailPromises = filtered.map(pokemon =>
        pokemonRepository.loadDetails(pokemon)
      );
  
      Promise.all(detailPromises).then(() => {
        displayPokemon(filtered, true);
      });
    });
  }
  
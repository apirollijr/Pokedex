function setupSearch() {
  // Get the input element where the user will type their search query
  const searchInput = document.getElementById('searchInput');

  // Exit the function early if the input element is not found
  if (!searchInput) return;

  // Add an event listener that runs every time the user types in the input
  searchInput.addEventListener('input', () => {
    // Get the current input value, convert to lowercase, and remove whitespace
    const query = searchInput.value.toLowerCase().trim();

    // Retrieve the full list of Pokémon from the repository
    const allPokemon = pokemonRepository.getAll();

    // Filter the Pokémon list based on name match or exact number match
    const filtered = allPokemon.filter((pokemon, index) => {
      const nameMatch = pokemon.name.toLowerCase().includes(query);
      const numberMatch = (index + 1).toString() === query;
      return nameMatch || numberMatch;
    });

    // Load details for each filtered Pokémon (returns an array of Promises)
    const detailPromises = filtered.map((pokemon) => pokemonRepository.loadDetails(pokemon));

    // Wait until all detail data is loaded, then display the filtered Pokémon
    Promise.all(detailPromises).then(() => {
      displayPokemon(filtered, true); // true indicates that it's a filtered result
    });
  });
}

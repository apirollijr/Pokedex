// Main function to load Pokémon types from the API and render them as cards
function loadAndRenderTypes(containerSelector = '.type-grid') {
  console.log('✅ loadAndRenderTypes is running...');

  // Select the container element where the type cards will be displayed
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Fetch the list of all Pokémon types from the API
  fetch('https://pokeapi.co/api/v2/type')
    .then(response => response.json())
    .then(data => {
      // Filter out non-standard types like 'shadow' and 'unknown'
      const standardTypes = data.results.filter(t =>
        !['shadow', 'unknown'].includes(t.name)
      );

      // Fetch detailed type data (e.g., damage relations and example Pokémon)
      return Promise.all(
        standardTypes.map(type =>
          fetch(type.url)
            .then(res => res.json())
            .then(detail => ({
              name: type.name,
              // List of types this one is strong against
              damageTo: detail.damage_relations.double_damage_to.map(t => t.name),
              // List of types this one is weak against
              damageFrom: detail.damage_relations.double_damage_from.map(t => t.name),
              // Get up to 3 example Pokémon for this type
              examples: (detail.pokemon || []).slice(0, 3).map(p => capitalize(p.pokemon.name)),
              // Get the emoji icon associated with the type
              icon: getTypeIcon(type.name)
            }))
        )
      );
    })
    .then(types => {
      console.log('📦 Types received:', types);

      // Create and append a card for each type
      types.forEach(type => {
        const card = document.createElement('div');
        card.className = `type-card ${type.name}`;

        // Set the inner HTML content of the card
        card.innerHTML = `
          <span class="icon">${type.icon}</span>
          <h3>${capitalize(type.name)}</h3>
          <p><strong>Strong against:</strong> ${type.damageTo.join(', ') || '—'}</p>
          <p><strong>Weak against:</strong> ${type.damageFrom.join(', ') || '—'}</p>
          <p><strong>Examples:</strong> ${type.examples.join(', ')}</p>
        `;

        // Append the card to the container
        container.appendChild(card);
      });
    })
    // Handle and log any errors that occur during fetch or processing
    .catch(console.error);
}

// Utility function: Returns an emoji icon based on the Pokémon type
function getTypeIcon(type) {
  const icons = {
    normal: '⚪', fire: '🔥', water: '💧', grass: '🌿',
    electric: '⚡', ice: '❄️', fighting: '🥊', poison: '☠️',
    ground: '🌍', flying: '🕊️', psychic: '🔮', bug: '🐛',
    rock: '🪨', ghost: '👻', dragon: '🐉', dark: '🌑',
    steel: '⚙️', fairy: '✨'
  };

  // Return the corresponding emoji or a question mark if type is unknown
  return icons[type] || '❓';
}

// Utility function: Capitalizes the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

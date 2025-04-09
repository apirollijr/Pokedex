function loadAndRenderTypes(containerSelector = '.type-grid') {
    console.log('✅ loadAndRenderTypes is running...');

    const container = document.querySelector(containerSelector);
    if (!container) return;
  
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        const standardTypes = data.results.filter(t =>
          !['shadow', 'unknown'].includes(t.name)
        );
  
        // Load all type details (damage relations)
        return Promise.all(
          standardTypes.map(type =>
            fetch(type.url)
              .then(res => res.json())
              .then(detail => ({
                name: type.name,
                damageTo: detail.damage_relations.double_damage_to.map(t => t.name),
                damageFrom: detail.damage_relations.double_damage_from.map(t => t.name),
                examples: (detail.pokemon || []).slice(0, 3).map(p => capitalize(p.pokemon.name)),
                icon: getTypeIcon(type.name)
              }))
          )
        );
      })
      .then(types => {
        console.log('📦 Types received:', types);

        types.forEach(type => {
          const card = document.createElement('div');
          card.className = `type-card ${type.name}`;
  
          card.innerHTML = `
            <span class="icon">${type.icon}</span>
            <h3>${capitalize(type.name)}</h3>
            <p><strong>Strong against:</strong> ${type.damageTo.join(', ') || '—'}</p>
            <p><strong>Weak against:</strong> ${type.damageFrom.join(', ') || '—'}</p>
            <p><strong>Examples:</strong> ${type.examples.join(', ')}</p>
          `;
  
          container.appendChild(card);
        });
      })
      .catch(console.error);
  }
  

 
  
  // Utility: emoji icons per type
  function getTypeIcon(type) {
    const icons = {
      normal: '⚪', fire: '🔥', water: '💧', grass: '🌿',
      electric: '⚡', ice: '❄️', fighting: '🥊', poison: '☠️',
      ground: '🌍', flying: '🕊️', psychic: '🔮', bug: '🐛',
      rock: '🪨', ghost: '👻', dragon: '🐉', dark: '🌑',
      steel: '⚙️', fairy: '✨'
    };
  
    return icons[type] || '❓';
  }
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
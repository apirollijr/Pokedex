document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mechanicsGrid');
  
    const pokemonNames = ['charizard', 'pikachu', 'gardevoir', 'snorlax'];
  
    pokemonNames.forEach(name => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => {
          const card = document.createElement('div');
          card.classList.add('mechanic-card');
  
          card.innerHTML = `
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${name}" class="poke-art">
            <h3>${capitalize(data.name)}</h3>
            <div class="stat-list">
              ${data.stats.map(stat => {
                const label = formatStatName(stat.stat.name);
                const icon = getStatIcon(stat.stat.name);
                return `
                  <div class="stat-row">
                    <span class="stat-label">${icon} ${label}</span>
                    <div class="bar-container">
                      <div class="bar" style="width: ${Math.min(stat.base_stat, 150)}%">${stat.base_stat}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
  
          container.appendChild(card);
        });
    });
  
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    function formatStatName(name) {
      const map = {
        hp: 'HP',
        attack: 'Attack',
        defense: 'Defense',
        'special-attack': 'Sp. Atk',
        'special-defense': 'Sp. Def',
        speed: 'Speed'
      };
      return map[name] || name;
    }
  
    function getStatIcon(name) {
      const icons = {
        hp: '🧡',
        attack: '⚔️',
        defense: '🛡️',
        'special-attack': '💥',
        'special-defense': '✨',
        speed: '💨'
      };
      return icons[name] || '📊';
    }
  });

  // ============================
// Section: Type Damage Relations
// ============================
const damageGrid = document.getElementById('damageGrid');

fetch('https://pokeapi.co/api/v2/type')
  .then(res => res.json())
  .then(data => {
    const types = data.results.filter(t => !['shadow', 'unknown'].includes(t.name));

    return Promise.all(
      types.map(type =>
        fetch(type.url)
          .then(res => res.json())
          .then(details => ({
            name: type.name,
            doubleTo: details.damage_relations.double_damage_to.map(t => t.name),
            doubleFrom: details.damage_relations.double_damage_from.map(t => t.name),
            halfFrom: details.damage_relations.half_damage_from.map(t => t.name),
            noFrom: details.damage_relations.no_damage_from.map(t => t.name)
          }))
      )
    );
  })
  .then(typeRelations => {
    typeRelations.forEach(type => {
      const card = document.createElement('div');
      card.classList.add('type-relation-card');
      card.innerHTML = `
      <h3>${type.name}</h3>
    
      <p><strong>Deals double damage to:</strong></p>
      <div class="relation-row">
        ${type.doubleTo.map(t => `<span class="type-badge ${t}">${t}</span>`).join('')}
      </div>
    
      <p><strong>Weak to:</strong></p>
      <div class="relation-row">
        ${type.doubleFrom.map(t => `<span class="type-badge ${t}">${t}</span>`).join('')}
      </div>
    
      <p><strong>Resists:</strong></p>
      <div class="relation-row">
        ${type.halfFrom.map(t => `<span class="type-badge ${t}">${t}</span>`).join('')}
      </div>
    
      <p><strong>Immune to:</strong></p>
      <div class="relation-row">
        ${type.noFrom.map(t => `<span class="type-badge ${t}">${t}</span>`).join('')}
      </div>
    `;
    
      damageGrid.appendChild(card);
    });
  });

  
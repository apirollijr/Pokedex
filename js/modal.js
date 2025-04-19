document.addEventListener('DOMContentLoaded', () => {
    const pokemonGrid = document.getElementById('pokemonGrid');
    const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('pokemonModalLabel');
  
    pokemonGrid.addEventListener('click', event => {
      const card = event.target.closest('.card');
      if (!card) return;
  
      const name = card.getAttribute('data-name');
      const id = card.getAttribute('data-id');
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
          const types = data.types.map(t => `<span class="badge bg-secondary me-1">${t.type.name}</span>`).join('');
          const abilities = data.abilities.map(a => `<li>${a.ability.name}</li>`).join('');
          const image = data.sprites.other['official-artwork'].front_default;
  
          modalTitle.textContent = `${data.name} (#${data.id})`;
          modalContent.innerHTML = `
            <div class="text-center mb-3">
              <img src="${image}" alt="${data.name}" class="img-fluid" style="max-height: 200px;">
            </div>
            <p><strong>Height:</strong> ${data.height / 10} m</p>
            <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
            <p><strong>Type(s):</strong> ${types}</p>
            <p><strong>Abilities:</strong></p>
            <ul>${abilities}</ul>
          `;
  
          modal.show();
        });
    });
  });
  
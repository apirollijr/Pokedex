document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
  
    searchInput.addEventListener('input', function () {
      if (!window.pokemonLoaded) return; // Wait until cards are loaded
  
      const term = this.value.trim().toLowerCase();
      const cards = document.querySelectorAll('#pokemonGrid .card');
  
      cards.forEach(card => {
        const name = card.getAttribute('data-name');
        const id = card.getAttribute('data-id');
        const match = name.includes(term) || id === term;
        card.parentElement.style.display = match ? '' : 'none';
      });
    });
  });
  
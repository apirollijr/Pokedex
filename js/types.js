document.addEventListener('DOMContentLoaded', () => {
    const typeButtons = document.querySelectorAll('[data-type]');
    const pokemonGrid = document.getElementById('pokemonGrid');
  
    typeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedType = button.getAttribute('data-type');
  
        const cards = pokemonGrid.querySelectorAll('.card');
  
        cards.forEach(card => {
          const cardTypes = card.getAttribute('data-types');
          const match = selectedType === 'all' || cardTypes.includes(selectedType);
          card.parentElement.style.display = match ? '' : 'none';
        });
      });
    });
  });
  
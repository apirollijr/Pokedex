document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.main-scroll-area');
    const backToTopBtn = document.getElementById('backToTop');
  
    if (!scrollContainer || !backToTopBtn) {
      console.error('❌ Scroll container or Back to Top button not found');
      return;
    }
  
    // Show/hide button based on scroll position of the container
    scrollContainer.addEventListener('scroll', () => {
      if (scrollContainer.scrollTop > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
  
    // Scroll to top of the container
    backToTopBtn.addEventListener('click', () => {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  
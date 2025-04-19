document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const scrollContainer = document.querySelector('.main-scroll-area');
  
    if (!backToTopBtn || !scrollContainer) {
      console.error('❌ Missing #backToTop or .main-scroll-area');
      return;
    }
  
    backToTopBtn.classList.add('d-none');
  
    scrollContainer.addEventListener('scroll', () => {
      const scrollY = scrollContainer.scrollTop;
      console.log('📦 scrollY:', scrollY);
  
      if (scrollY > 400) {
        backToTopBtn.classList.remove('d-none');
        backToTopBtn.classList.add('d-block');
      } else {
        backToTopBtn.classList.remove('d-block');
        backToTopBtn.classList.add('d-none');
      }
    });
  
    backToTopBtn.addEventListener('click', () => {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
  
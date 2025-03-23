

blogPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
      post.style.transform = 'translateY(-10px)';
      post.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
  
    post.addEventListener('mouseleave', () => {
      post.style.transform = 'translateY(0)';
      post.style.boxShadow = 'none';
    });
  });
  // Animazione dei link di navigazione
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-5px)';
    });
  
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
  // Animazione delle cards
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
  
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
  });
  
  // Animazione del featured post
  const featuredPost = document.querySelector('.featured-post');
  
  featuredPost.addEventListener('mouseenter', () => {
    featuredPost.style.transform = 'translateY(-10px)';
    featuredPost.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
  });
  
  featuredPost.addEventListener('mouseleave', () => {
    featuredPost.style.transform = 'translateY(0)';
    featuredPost.style.boxShadow = 'none';
  });
  // Funzione per tornare in cima alla pagina
function scrollToTop() {
  const backToTopButton = document.querySelector('.back-to-top a');
  if (backToTopButton) {
      backToTopButton.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }
}

// Funzione per aggiungere effetti hover dinamici
function addHoverEffects() {
  const cards = document.querySelectorAll('.card');
  const navLinks = document.querySelectorAll('nav a');

  // Effetto hover per le card
  cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-10px)';
          card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
      });

      card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      });
  });

  // Effetto hover per i link di navigazione
  navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
          link.style.transform = 'translateY(-5px)';
      });

      link.addEventListener('mouseleave', () => {
          link.style.transform = 'translateY(0)';
      });
  });
}

// Funzione per gestire la paginazione
function handlePagination() {
  const paginationButtons = document.querySelectorAll('.pagination-btn');

  paginationButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          if (button.classList.contains('disabled')) {
              e.preventDefault();
          } else {
              // Simula il caricamento di una nuova pagina
              console.log(`Navigating to: ${button.getAttribute('href')}`);
              // Qui puoi aggiungere la logica per caricare dinamicamente i contenuti
          }
      });
  });
}

// Funzione per animare gli elementi al caricamento della pagina
function animateOnLoad() {
  const featuredPost = document.querySelector('.featured-post');
  const cards = document.querySelectorAll('.card');

  if (featuredPost) {
      featuredPost.style.opacity = '0';
      featuredPost.style.transform = 'translateY(20px)';
      setTimeout(() => {
          featuredPost.style.opacity = '1';
          featuredPost.style.transform = 'translateY(0)';
      }, 300);
  }

  cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
      }, 300 + index * 100);
  });
}

// Funzione principale per inizializzare tutto
function init() {
  scrollToTop();
  addHoverEffects();
  handlePagination();
  animateOnLoad();
}

// Esegui la funzione init quando la pagina è completamente caricata
document.addEventListener('DOMContentLoaded', init);


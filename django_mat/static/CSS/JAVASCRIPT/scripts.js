

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
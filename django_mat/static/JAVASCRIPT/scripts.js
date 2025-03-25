

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
  

  document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById("like-btn");
    const dislikeButton = document.getElementById("dislike-btn");
    const commentForm = document.getElementById("comment-form");

    if (likeButton) {
        likeButton.addEventListener("click", function() {
            fetch("{% url 'articles:article-like' article.slug %}", {
                method: "POST",
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("like-count").innerText = data.likes;
                document.getElementById("dislike-count").innerText = data.dislikes;
            });
        });
    }

    if (dislikeButton) {
        dislikeButton.addEventListener("click", function() {
            fetch("{% url 'articles:article-dislike' article.slug %}", {
                method: "POST",
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("like-count").innerText = data.likes;
                document.getElementById("dislike-count").innerText = data.dislikes;
            });
        });
    }

    if (commentForm) {
        commentForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            fetch("{% url 'articles:article-detail' article.slug %}", {
                method: "POST",
                body: new FormData(commentForm),
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => {
                let commentList = document.getElementById("comment-list");
                let newComment = document.createElement("li");
                newComment.innerHTML = `<strong>${data.user}</strong>: ${data.body} (${data.created})`;
                commentList.appendChild(newComment);
            });
        });
    }
});
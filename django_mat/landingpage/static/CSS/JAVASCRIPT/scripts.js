// Funzione per ottenere il token CSRF dal cookie
function getCsrfToken() {
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
  return cookieValue || '';
}

// Funzione per inviare richieste AJAX
function sendAjax(url, method, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('X-CSRFToken', getCsrfToken());
  xhr.onload = () => callback(xhr.status === 200 ? JSON.parse(xhr.responseText) : null);
  xhr.send(new URLSearchParams(data).toString());
}

// Funzione per effetti hover
function addHover(element, enterStyles, leaveStyles) {
  element.addEventListener('mouseenter', () => Object.assign(element.style, enterStyles));
  element.addEventListener('mouseleave', () => Object.assign(element.style, leaveStyles));
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script caricato!');

  // Hover per carte e featured post
  document.querySelectorAll('.card, .featured-post').forEach(el => {
      addHover(el, 
          { transform: 'translateY(-10px)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }, 
          { transform: 'translateY(0)', boxShadow: 'none' }
      );
  });

  // Hover per link di navigazione
  document.querySelectorAll('nav a').forEach(el => {
      addHover(el, { transform: 'translateY(-5px)' }, { transform: 'translateY(0)' });
  });

  // Scroll to top
  const backToTop = document.querySelector('.back-to-top a');
  if (backToTop) {
      backToTop.addEventListener('click', e => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  // Gestione Like
  document.querySelectorAll('.article-likes a').forEach(link => {
      link.addEventListener('click', e => {
          e.preventDefault();
          sendAjax(link.href, 'POST', {}, response => {
              if (response && response.total_likes !== undefined) {
                  link.parentElement.childNodes[0].textContent = `Likes: ${response.total_likes} `;
              }
          });
      });
  });

  // Gestione Dislike
  document.querySelectorAll('.article-dislikes a').forEach(link => {
      link.addEventListener('click', e => {
          e.preventDefault();
          sendAjax(link.href, 'POST', {}, response => {
              if (response && response.total_dislikes !== undefined) {
                  link.parentElement.childNodes[0].textContent = `Dislikes: ${response.total_dislikes} `;
              }
          });
      });
  });

  // Gestione Commenti
  const form = document.querySelector('form');
  if (form) {
      form.addEventListener('submit', e => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(form).entries());
          sendAjax(form.action, 'POST', data, response => {
              if (response && response.body) {
                  const comments = document.querySelector('h3').nextElementSibling;
                  const noComments = document.querySelector('h3 + p');
                  if (noComments && noComments.textContent === 'No comments yet.') noComments.remove();
                  const newComment = document.createElement('div');
                  newComment.className = 'comment';
                  newComment.innerHTML = `<p><span>${response.author}</span> (${response.created}): ${response.body}</p>`;
                  comments.insertBefore(newComment, comments.firstChild);
                  form.reset();
              }
          });
      });
  }
});
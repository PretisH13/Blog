// Funzione per ottenere il CSRF token
function getCSRFToken() {
    const tokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
    return tokenElement ? tokenElement.value : '';
}

// Funzione per gestire errori
function handleError(error, message = 'Errore nella richiesta') {
    console.error(message, error);
    alert(message);
}

// Funzione per aggiornare dinamicamente i conteggi di Like/Dislike
function updateLikeDislikeCount(slug, type, count) {
    const element = document.querySelector(`#${type}-count-${slug}`);
    if (element) {
        element.textContent = count;
    }
}

// Gestione dei pulsanti Like
function setupLikeButtons() {
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const slug = this.getAttribute('data-slug');
            const url = `/articles/${slug}/like/`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error('Errore nella richiesta di Like');
                    return response.json();
                })
                .then(data => {
                    updateLikeDislikeCount(slug, 'likes', data.total_likes);
                })
                .catch(error => handleError(error, 'Errore durante il Like'));
        });
    });
}

// Gestione dei pulsanti Dislike
function setupDislikeButtons() {
    document.querySelectorAll('.dislike-button').forEach(button => {
        button.addEventListener('click', function() {
            const slug = this.getAttribute('data-slug');
            const url = `/articles/${slug}/dislike/`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error('Errore nella richiesta di Dislike');
                    return response.json();
                })
                .then(data => {
                    updateLikeDislikeCount(slug, 'dislikes', data.total_dislikes);
                })
                .catch(error => handleError(error, 'Errore durante il Dislike'));
        });
    });
}

// Gestione dei form per aggiungere commenti
function setupCommentForms() {
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const url = this.getAttribute('action');
            const body = this.querySelector('textarea[name="body"]').value;
            const slug = this.closest('.blog-post')?.querySelector('.comments-section')?.getAttribute('data-article-slug') || 
                         this.closest('.article-detail-card')?.querySelector('.comments-section')?.getAttribute('data-article-slug');

            if (!body.trim()) {
                alert('Il commento non può essere vuoto');
                return;
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ body })
            })
                .then(response => {
                    if (!response.ok) throw new Error('Errore nella richiesta di aggiunta commento');
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        const commentsSection = document.querySelector(`.comments-section[data-article-slug="${slug}"]`) || 
                                               document.querySelector('.comments-section');
                        const noComments = commentsSection.querySelector('p:empty');
                        if (noComments) noComments.remove();

                        const newComment = document.createElement('div');
                        newComment.classList.add('comment');
                        newComment.innerHTML = `<p><span>${data.author}</span> (${data.created}): ${data.body}</p>`;
                        commentsSection.appendChild(newComment);

                        form.querySelector('textarea[name="body"]').value = '';
                    }
                })
                .catch(error => handleError(error, 'Errore durante l\'aggiunta del commento'));
        });
    });
}

// Inizializzazione delle funzionalità quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    setupLikeButtons();
    setupDislikeButtons();
    setupCommentForms();
});

document.addEventListener('DOMContentLoaded', function () {
    const select = document.querySelector('.language-form select');
    const toggle = document.querySelector('.language-toggle');
    const form = document.querySelector('.language-form');

    // Creare un selettore personalizzato
    const customSelect = document.createElement('div');
    customSelect.className = 'custom-select';
    form.appendChild(customSelect);

    // Nascondere il selettore nativo
    select.style.display = 'none';

    // Creare le opzioni personalizzate con bandiere
    Array.from(select.options).forEach(option => {
        const flagCode = option.getAttribute('data-flag');
        const customOption = document.createElement('div');
        customOption.className = 'custom-option';
        customOption.innerHTML = `<span class="fi fi-${flagCode}"></span> ${option.text}`;
        customOption.dataset.value = option.value;
        customSelect.appendChild(customOption);

        // Aggiungere evento click
        customOption.addEventListener('click', () => {
            select.value = option.value;
            select.dispatchEvent(new Event('change'));
        });
    });

    // Mostrare la bandiera della lingua selezionata nel pulsante
    const updateToggleFlag = () => {
        const selectedOption = select.options[select.selectedIndex];
        const flagCode = selectedOption.getAttribute('data-flag');
        toggle.innerHTML = `<span class="fi fi-${flagCode}"></span>`;
    };
    updateToggleFlag();
    select.addEventListener('change', updateToggleFlag);
});
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from .models import Articles, Comment
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils import timezone

class ArticleDetailView(DetailView):
    model = Articles

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comments'] = self.object.comments.all()  # Aggiungi i commenti al contesto
        return context

class ArticleListView(ListView):
    model = Articles
    paginate_by = 3

    def get_queryset(self):
        tag = self.kwargs.get('category_tag', None)
        queryset = Articles.objects.filter(status='PUBLISHED')
        if tag:
            queryset = Articles.objects.filter(status='PUBLISHED').filter(category__in=[tag])
        return queryset

@login_required
@require_POST
def like_article(request, slug):
    article = get_object_or_404(Articles, slug=slug)
    if request.user in article.likes.all():
        article.likes.remove(request.user)
    else:
        article.likes.add(request.user)
        article.dislikes.remove(request.user)  # Rimuove dislike se presente
    return JsonResponse({'total_likes': article.total_likes})

@login_required
@require_POST
def dislike_article(request, slug):
    article = get_object_or_404(Articles, slug=slug)
    if request.user in article.dislikes.all():
        article.dislikes.remove(request.user)
    else:
        article.dislikes.add(request.user)
        article.likes.remove(request.user)  # Rimuove like se presente
    return JsonResponse({'total_dislikes': article.total_dislikes})

@login_required
@require_POST
def add_comment(request, slug):
    article = get_object_or_404(Articles, slug=slug)
    body = request.POST.get('body')
    if body:
        comment = Comment.objects.create(article=article, author=request.user, body=body)
        return JsonResponse({
            'author': str(request.user),
            'created': timezone.localtime(comment.created).strftime('%Y-%m-%d %H:%M:%S'),
            'body': comment.body
        })
    return JsonResponse({'error': 'Comment cannot be empty'}, status=400)

def search_articles(request):
    query = request.GET.get('q', '')
    category = request.GET.get('category', '')
    status = request.GET.get('status', '')
    articles = Articles.search(query, category, status)
    context = {
        'articles': articles,
        'query': query,
        'CATEGORIES': Articles.CATEGORIES,
        'STATUS_CHOICES': Articles.STATUS_CHOICES,
        'no_results': not articles.exists()  # Aggiungi flag per indicare nessun risultato
    }
    return render(request, 'articles/article_search.html', context)
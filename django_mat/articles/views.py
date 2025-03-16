# from django.shortcuts import render
from django.views.generic.detail import DetailView
from .models import Articles
from django.views.generic.list import ListView

class ArticleDetailView(DetailView):
    model = Articles

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context

class ArticleListView(ListView):
    model = Articles
    paginate_by = 3

    def get_queryset(self):
        tag =self.kwargs.get('category_tag', None)
        queryset = Articles.objects.filter(status='PUBLISHED')
        if tag:
            queryset =Articles.objects.filter(status='PUBLISHED').filter(category__in=[tag])
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # articles = Articles.objects.filter(status='PUBLISHED')
        # context['articles_list'] = articles

        return context


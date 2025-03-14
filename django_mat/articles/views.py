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

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


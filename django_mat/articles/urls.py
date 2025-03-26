"""
URL configuration for django_mat project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from . import views
from django.urls import path

app_name = 'articles'

urlpatterns = [
    path('search/', views.search_articles, name='search'),
    path('list/<slug:category_tag>/', views.ArticleListView.as_view(), name='article-list'),
    path('<slug:slug>/', views.ArticleDetailView.as_view(), name='article-detail'),
    path('<slug:slug>/like/', views.like_article, name='like-article'),
    path('<slug:slug>/dislike/', views.dislike_article, name='dislike-article'),
    path('<slug:slug>/comment/', views.add_comment, name='add-comment'),

]

from django.db import models
from django.conf import settings
from django.utils import timezone
from django.db.models import CASCADE, Q
from django.urls import reverse


class Articles(models.Model):
    DRAFT= 'DRAFT'
    PUBLISHED = 'PUBLISHED'
    STATUS_CHOICES=(
        (DRAFT,'Draft'),
        (PUBLISHED, 'Published')
    )
    status= models.CharField(max_length=10,choices=STATUS_CHOICES, default=PUBLISHED)

    TECHNOLOGY ='TC'
    DESING = 'DS'
    SPORTS = 'SP'
    POLITICS = 'SC'
    CATEGORIES = [
        (TECHNOLOGY, 'Technology'),
        (DESING,'Design'),
        (SPORTS,'Sports'),
        (POLITICS,'Politics')
    ]
    category = models.CharField(max_length=2 ,choices=CATEGORIES, default='TL')
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250)
    img = models.ImageField(upload_to="upload", blank=True)
    body = models.TextField(max_length=5000)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=CASCADE)
    created = models.DateTimeField(default=timezone.now)
    published = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_articles', blank=True)
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='disliked_articles', blank=True)

    class Meta:
        ordering = ('-updated', '-published')

    def __str__(self):
        return self.title


    def get_absolute_url(self):
        return reverse('articles:article-detail',kwargs={'slug': self.slug})

    @property
    def total_likes(self):
        return self.likes.count()

    @property
    def total_dislikes(self):
        return self.dislikes.count()
    
    @classmethod
    def search(cls, query, category=None, status=None):
        queryset = cls.objects.all()
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) | Q(body__icontains=query))
        if category:
                queryset = queryset.filter(category=category)
        if status:
                queryset = queryset.filter(status=status)
        return queryset

class Comment(models.Model):
    article = models.ForeignKey(Articles, on_delete=CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=CASCADE)
    body = models.TextField(max_length=1000)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f"Comment by {self.author} on {self.article}"
    

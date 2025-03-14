from django.db import models
from django.conf import settings
from django.utils import timezone
from django.db.models import CASCADE
from django.urls import reverse


class Articles(models.Model):
    CATEGORIES = [
        ('TC','Technology'),
        ('DS','Design'),
        ('CL','Culture'),
        ('SC','Science'),
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

    class Meta:
        ordering = ('-updated', '-published')

    def __str__(self):
        return self.title


    def get_absolute_url(self):
        return reverse('articles:article-detail',kwargs={'slug': self.slug})
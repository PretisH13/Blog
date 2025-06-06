from django.db import models
from django.urls import reverse


class Landingpage(models.Model):
    message = models.CharField(max_length=250)
    img = models.ImageField(upload_to="upload", blank=True)


    def __str__(self):
        return self.message
    def get_absolute_url(self):
        return reverse("articles:article-detail", args=[self.slug])
        return reverse("articles:article-detail", *args[self.slug,])

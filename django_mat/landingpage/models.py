from django.db import models


class Landingpage(models.Model):
    message = models.CharField(max_length=250)

    def __str__(self):
        return self.message
    
    def get_absolute_url(self):
        return reverse("articles:article-detail", *args[self.slug,])

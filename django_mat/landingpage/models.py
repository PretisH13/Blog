from django.db import models


class Landingpage(models.Model):
    message = models.CharField(max_length=250)

    def __str__(self):
        return self.message
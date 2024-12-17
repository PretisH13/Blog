from django.db import models


class Landingpage(models.Model):
    message = models.CharField(max_length=250)
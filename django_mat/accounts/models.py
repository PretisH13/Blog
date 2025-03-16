from django.db import models
from django.db.models import CASCADE
from django.conf import settings

# Create your models here.
class Profile(models.Model):
   user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=CASCADE)
   birthday = models.DateField(blank= True, null=True)

   def __str__(self):
       return 'Profile user {}'.format(self.user.username)
   
from django.db import models
from django.db.models import CASCADE
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.
class Profile(models.Model):
   user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=CASCADE)
   birthday = models.DateField(blank= True, null=True)

   def __str__(self):
       return 'Profile user {}'.format(self.user.username)
   
@receiver(post_save,sender=settings.AUTH_USER_MODEL)

def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
# Generated by Django 5.1.4 on 2025-03-28 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profile_picture',
            field=models.ImageField(blank=True, default='profile_pics/default.jpg', null=True, upload_to='profile_pics/'),
        ),
    ]

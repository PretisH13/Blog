# Generated by Django 5.1.4 on 2025-03-24 23:32

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('PUBLISHED', 'Published')], default='PUBLISHED', max_length=10)),
                ('category', models.CharField(choices=[('TC', 'Technology'), ('DS', 'Design'), ('CL', 'Culture'), ('SC', 'Science')], default='TC', max_length=2)),
                ('title', models.CharField(max_length=250)),
                ('slug', models.SlugField(max_length=250, unique=True)),
                ('img', models.ImageField(blank=True, upload_to='upload')),
                ('body', models.TextField(max_length=5000)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('dislikes', models.ManyToManyField(blank=True, related_name='article_dislikes', to=settings.AUTH_USER_MODEL)),
                ('likes', models.ManyToManyField(blank=True, related_name='article_likes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-updated', '-published'),
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='articles.articles')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
    ]

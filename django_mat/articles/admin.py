from django.contrib import admin
from .models import Articles

@admin.register(Articles)

class ArticlesAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    list_display = ('title','author','created','published', 'updated')
    list_filter = ('created','author')
    search_fields = ('title','body')
    ordering = ('created','published')
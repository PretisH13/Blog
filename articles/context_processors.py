from .models import Articles

def categories(request):
    return {'categories': Articles.CATEGORIES}
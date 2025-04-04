from django.shortcuts import render
from django.views.generic.base import TemplateView

from articles.models import Articles

from .models import Landingpage
from django.core.paginator import Paginator



def index(request):

    obj_ls= Landingpage.objects.all()
    print(obj_ls[0].message)
    context={}
    context["message"] = obj_ls[0].message
    return render(request,'landingpage/base.html', context=context)

class LandingpageView(TemplateView):
    template_name = 'landingpage/base.html'

    def get_context_data(self,**kwargs):
        context = super().get_context_data(**kwargs)
        articles =Articles.objects.filter(status='PUBLISHED')
        context['banner'] = articles[0]
        context['highlights'] = articles[1:3]
        articles_list = articles[3:]
        context['articles_list'] = articles_list
        paginator = Paginator(articles_list, 3)
        page_number = self.request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context['page_obj'] = page_obj
        context['categories'] = Articles.CATEGORIES
        
        return context
    

    


 
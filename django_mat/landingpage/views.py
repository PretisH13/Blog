from django.shortcuts import render
from django.views.generic.base import TemplateView

from articles.models import Articles

from .models import Landingpage


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
        context['banner'] = Articles.objects.all()[1]
        context['highlights'] = Articles.objects.all()[2:3]
        return context
 
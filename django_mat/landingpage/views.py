from django.shortcuts import render
from .models import Landingpage
from django.views.generic.base import TemplateView


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
    context["message"] =Landingpage.objects.all()[0].message
    return context

from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm
from django.contrib.auth import login, authenticate


@login_required

def profile(request):
    return render(request, 'accounts/profile.html')


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            user.profile.birthday = form.cleaned_data.get('birthday')
            user.profile.save()
            username = form.cleaned_data.get('username')
            row_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=row_password)
            login(request, user)
            return redirect('accounts:profile')  
    else:
        form = RegistrationForm()

    return render(request, 'registration/registration.html', {'form': form}) 
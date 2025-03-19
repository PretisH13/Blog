from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm, UserEditForm, ProfileEditForm
from django.contrib.auth import login, authenticate
from django.contrib import messages


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

@login_required

def edit(request):
    if request.method == 'POST':
        user_form =UserEditForm(instance=request.user,data=request.POST)
        profile_form = ProfileEditForm(instance=request.user.profile,data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request,'Your profile has been successfully saved.')

            return render(request, 'accounts/profile.html')
        else:
            messages.error(request,'The data entered is not valid.')
    else:
        user_form = UserEditForm(instance=request.user, data=request.POST)
        profile_form = ProfileEditForm(instance=request.user.profile, data=request.POST)


        return render(request,'registration/edit.html',{'user_form':user_form, 'profile_form':profile_form})

        
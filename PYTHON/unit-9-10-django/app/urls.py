from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.signinaccount, name='signin'),
    path('signup/', views.signupaccount, name='signup'),
    path('home/', views.home, name="home"),
    path('logout/', views.signoutaccount, name='logout'),
    path('generate-recipe/', views.generate_recipe, name='generate_recipe'),
]

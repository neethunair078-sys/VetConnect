from django.urls import path

from .views import LogoutView, RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='pet-owner-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
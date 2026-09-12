from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LogoutView, PetOwnerRegisterView, DoctorRegisterView, LoginView, PendingDoctorsView, DoctorApprovalView

urlpatterns = [
    path('register/', PetOwnerRegisterView.as_view(), name='pet-owner-register'),
    path("doctor/register/", DoctorRegisterView.as_view(), name="doctor-register"),
    path("doctors/pending/", PendingDoctorsView.as_view(), name="pending-doctors"),
    path("doctors/<int:pk>/approval/", DoctorApprovalView.as_view(), name="doctor-approval"),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"), 
]
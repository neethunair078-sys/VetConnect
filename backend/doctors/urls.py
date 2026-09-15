from django.urls import path

from .views import DoctorRegisterView, PendingDoctorsView, DoctorApprovalView


urlpatterns = [
    path("register/", DoctorRegisterView.as_view(), name="doctor-register",),

    path("pending/", PendingDoctorsView.as_view(), name="pending-doctors",),

    path("<int:pk>/approval/", DoctorApprovalView.as_view(), name="doctor-approval",),
]
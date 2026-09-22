from django.urls import path

from .views import DoctorRegisterView, PendingDoctorsView, DoctorApprovalView, ApprovedDoctorsView, DoctorProfileView


urlpatterns = [
    path("register/", DoctorRegisterView.as_view(), name="doctor-register"),

    path("pending/", PendingDoctorsView.as_view(), name="pending-doctors"),

    path("profile/", DoctorProfileView.as_view(), name="doctor-profile"),

    path("<int:pk>/approval/", DoctorApprovalView.as_view(), name="doctor-approval"),

    path("approved/", ApprovedDoctorsView.as_view(), name="approved-doctors"),

]
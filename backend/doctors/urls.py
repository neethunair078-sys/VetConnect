from django.urls import path

from .views import (
    DoctorRegisterView, 
    PendingDoctorsView, 
    DoctorApprovalView, 
    ApprovedDoctorsView, 
    DoctorProfileView, 
    DoctorPatientsView,
    DoctorPatientDetailView
    )


urlpatterns = [
    path("register/", DoctorRegisterView.as_view(), name="doctor-register"),

    path("pending/", PendingDoctorsView.as_view(), name="pending-doctors"),

    path("profile/", DoctorProfileView.as_view(), name="doctor-profile"),
    
    path("approved/", ApprovedDoctorsView.as_view(), name="approved-doctors"),

    path("patients/", DoctorPatientsView.as_view(), name="doctor-patients"),

    path("patients/<int:pk>/", DoctorPatientDetailView.as_view(), name="doctor-patient-detail"),

    path("<int:pk>/approval/", DoctorApprovalView.as_view(), name="doctor-approval"),
]
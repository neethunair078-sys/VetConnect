from django.urls import path

from .views import DoctorPatientHealthRecordsView, DoctorHealthRecordsView


urlpatterns = [
    path("", DoctorHealthRecordsView.as_view(), name="doctor-health-records"),
    path("patient/<int:patient_id>/", DoctorPatientHealthRecordsView.as_view(), name="doctor-patient-health-records"),
]
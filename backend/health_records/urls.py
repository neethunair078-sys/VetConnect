from django.urls import path

from .views import DoctorPatientHealthRecordsView


urlpatterns = [
    path("patient/<int:patient_id>/", DoctorPatientHealthRecordsView.as_view(), name="doctor-patient-health-records"),
]
from django.urls import path

from .views import DoctorAvailabilityListCreateView, DoctorAvailabilityByDoctorView


urlpatterns = [

    path("", DoctorAvailabilityListCreateView.as_view(), name="availability-list-create"),

    path("doctor/<int:doctor_id>/", DoctorAvailabilityByDoctorView.as_view(), name="doctor-availability"),

]
from django.urls import path
from .views import AppointmentListCreateView, AppointmentDetailView, AppointmentStatusView

urlpatterns = [
    path("", AppointmentListCreateView.as_view(), name="appointment-list-create"),
    path("<int:pk>/status/", AppointmentStatusView.as_view(), name="appointment-status"),
    path("<int:pk>/", AppointmentDetailView.as_view(), name="appointment-detail"),
]
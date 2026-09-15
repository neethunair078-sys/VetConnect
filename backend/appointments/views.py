from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Appointment
from .serializers import AppointmentSerializer
from .permissions import IsPetOwnerOrDoctor


class AppointmentListCreateView(viewsets.ListCreateAPIView):

    serializer_class = AppointmentSerializer
    permission_classes = [
        IsAuthenticated,
        IsPetOwnerOrDoctor,
    ]

    def get_queryset(self):
        user = self.request.user

        if user.role == "PET_OWNER":
            return Appointment.objects.filter(
                pet__owner=user
            ).select_related(
                "pet",
                "doctor__user",
                "pet__owner",
            )

        if user.role == "DOCTOR":
            return Appointment.objects.filter(
                doctor__user=user
            ).select_related(
                "pet",
                "pet__owner",
                "doctor__user",
            )

        return Appointment.objects.none()

    def perform_create(self, serializer):
        # Only pet owners should create appointments.

        if self.request.user.role != "PET_OWNER":
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "Only pet owners can create appointments."
            )

        serializer.save()
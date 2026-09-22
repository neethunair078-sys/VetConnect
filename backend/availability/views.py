from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import DoctorAvailability
from .serializers import DoctorAvailabilitySerializer
from .permissions import IsDoctor


class DoctorAvailabilityListCreateView(generics.ListCreateAPIView):

    serializer_class = DoctorAvailabilitySerializer

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
    ]

    def get_queryset(self):

        return (
            DoctorAvailability.objects.filter(doctor__user=self.request.user).select_related("doctor__user")
        )

    def perform_create(self, serializer):

        doctor = self.request.user.doctor_profile

        if (
            doctor.approval_status
            != doctor.ApprovalStatus.APPROVED
        ):
            raise PermissionDenied(
                "Your doctor profile must be approved before managing availability."
            )

        serializer.save(doctor=doctor)



class DoctorAvailabilityByDoctorView(generics.ListAPIView):

    serializer_class = DoctorAvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        doctor_id = self.kwargs["doctor_id"]

        return (
            DoctorAvailability.objects.filter(doctor_id=doctor_id, doctor__approval_status=("APPROVED"), is_available=True).select_related("doctor__user")
        )
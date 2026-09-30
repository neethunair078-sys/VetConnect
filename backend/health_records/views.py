from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import HealthRecord
from .serializers import HealthRecordSerializer


class DoctorPatientHealthRecordsView(generics.ListCreateAPIView):
    serializer_class = HealthRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        patient_id = self.kwargs["patient_id"]

        if user.role != "DOCTOR":
            raise PermissionDenied(
                "Only doctors can access health records."
            )

        return (
            HealthRecord.objects
            .filter(
                pet_id=patient_id,
                doctor__user=user,
            )
            .select_related(
                "pet",
                "doctor",
                "doctor__user",
            )
            .order_by(
                "-record_date",
                "-created_at",
            )
        )

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "DOCTOR":
            raise PermissionDenied(
                "Only doctors can create health records."
            )

        serializer.save(
            doctor=user.doctor_profile
        )
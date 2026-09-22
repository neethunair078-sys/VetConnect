from rest_framework import serializers

from .models import DoctorAvailability
from doctors.models import DoctorProfile


class DoctorAvailabilitySerializer(serializers.ModelSerializer):

    doctor = serializers.PrimaryKeyRelatedField(
        read_only=True
    )

    doctor_name = serializers.CharField(
        source="doctor.user.get_full_name",
        read_only=True,
    )

    class Meta:
        model = DoctorAvailability

        fields = [
            "id",
            "doctor",
            "doctor_name",
            "date",
            "start_time",
            "end_time",
            "is_available",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "doctor_name",
            "created_at",
            "updated_at",
        ]

    # def validate_doctor(self, doctor):

    #     if doctor.approval_status != DoctorProfile.ApprovalStatus.APPROVED:
    #         raise serializers.ValidationError(
    #             "Only approved doctors can manage availability."
    #         )

    #     return doctor

    def validate(self, attrs):

        start_time = attrs.get("start_time")
        end_time = attrs.get("end_time")

        if start_time and end_time and start_time >= end_time:
            raise serializers.ValidationError({
                "end_time": "End time must be later than start time."
            })

        return attrs
from rest_framework import serializers

from .models import HealthRecord


class HealthRecordSerializer(serializers.ModelSerializer):
    pet_name = serializers.CharField(source="pet.name", read_only=True)

    doctor_name = serializers.CharField(source="doctor.user.get_full_name", read_only=True)

    class Meta:
        model = HealthRecord
        fields = [
            "id",
            "pet",
            "pet_name",
            "doctor",
            "doctor_name",
            "record_type",
            "diagnosis",
            "treatment",
            "prescription",
            "notes",
            "record_date",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "pet_name",
            "doctor_name",
            "doctor",
            "created_at",
            "updated_at",
        ]
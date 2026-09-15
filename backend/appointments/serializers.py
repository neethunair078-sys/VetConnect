from rest_framework import serializers
from datetime import datetime
from django.utils import timezone

from .models import Appointment
from pets.models import Pet
from doctors.models import DoctorProfile



class AppointmentSerializer(serializers.ModelSerializer):
    pet_name = serializers.CharField(
        source="pet.name",
        read_only=True,
    )

    doctor_name = serializers.CharField(
        source="doctor.user.get_full_name",
        read_only=True,
    )

    owner_name = serializers.CharField(
        source="pet.owner.get_full_name",
        read_only=True,
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "pet",
            "pet_name",
            "doctor",
            "doctor_name",
            "owner_name",
            "appointment_date",
            "appointment_time",
            "appointment_type",
            "status",
            "reason",
            "notes",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_at",
            "updated_at",
            "pet_name",
            "doctor_name",
            "owner_name",
        ]

    def validate_pet(self, pet):
        # checking selected pet belongs to the currently loggedin pet owner.

        request = self.context["request"]

        if pet.owner != request.user:
            raise serializers.ValidationError(
                "You can only book appointments for your own pets."
            )

        return pet

    def validate_doctor(self, doctor):
     # Only approved doctors can receive appointments.

        if doctor.approval_status != DoctorProfile.ApprovalStatus.APPROVED:
            raise serializers.ValidationError(
                "Appointments can only be booked with approved doctors."
            )

        return doctor

    def validate(self, attrs):
   
        # Prevent booking an appointment in the past.
  

        from django.utils import timezone

        appointment_date = attrs.get("appointment_date")
        appointment_time = attrs.get("appointment_time")

        if appointment_date and appointment_time:
            appointment_datetime = timezone.make_aware(
                datetime.combine(
                    appointment_date,
                    appointment_time,
                )
            )

            if appointment_datetime < timezone.now():
                raise serializers.ValidationError(
                    "You cannot book an appointment in the past."
                )

        return attrs
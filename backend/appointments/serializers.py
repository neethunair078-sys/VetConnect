from django.db.models import Q
from rest_framework import serializers
from datetime import datetime
from django.utils import timezone

from .models import Appointment
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
        # Use submitted values, falling back to existing values
        # when updating an appointment.
        appointment_date = attrs.get(
            "appointment_date",
            getattr(self.instance, "appointment_date", None),
        )
        appointment_time = attrs.get(
            "appointment_time",
            getattr(self.instance, "appointment_time", None),
        )
        doctor = attrs.get(
            "doctor",
            getattr(self.instance, "doctor", None),
        )

        if appointment_date and appointment_time:
            appointment_datetime = timezone.make_aware(
                datetime.combine(
                    appointment_date,
                    appointment_time,
                ),
                timezone.get_current_timezone(),
            )

            if appointment_datetime < timezone.now():
                raise serializers.ValidationError(
                    "You cannot book an appointment in the past."
                )

        # Prevent duplicate bookings with the same doctor,
        # date and start time.
        if appointment_date and appointment_time and doctor:
            conflicting_appointments = Appointment.objects.filter(
                doctor=doctor,
                appointment_date=appointment_date,
                appointment_time=appointment_time,
                status__in=[
                    Appointment.Status.PENDING,
                    Appointment.Status.CONFIRMED,
                ],
            )

            # Exclude the current appointment when updating it.
            if self.instance:
                conflicting_appointments = (
                    conflicting_appointments.exclude(
                        pk=self.instance.pk
                    )
                )

            if conflicting_appointments.exists():
                raise serializers.ValidationError({
                    "appointment_time": [
                        "This time slot is already booked. "
                        "Please select another time."
                    ]
                })

        return attrs




class AppointmentStatusSerializer(serializers.Serializer):
    action = serializers.ChoiceField(
        choices=[
            "confirm",
            "reject",
            "complete",
        ]
    )
    
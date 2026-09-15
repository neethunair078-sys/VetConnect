from django.conf import settings
from django.db import models


class Appointment(models.Model):

    class AppointmentType(models.TextChoices):
        GENERAL = "GENERAL", "General Consultation"
        FOLLOW_UP = "FOLLOW_UP", "Follow-up"

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"
        REJECTED = "REJECTED", "Rejected"

    pet = models.ForeignKey("pets.Pet", on_delete=models.CASCADE, related_name="appointments",)

    doctor = models.ForeignKey("doctors.DoctorProfile", on_delete=models.CASCADE, related_name="appointments",)

    appointment_date = models.DateField()

    appointment_time = models.TimeField()

    appointment_type = models.CharField(max_length=20, choices=AppointmentType.choices, default=AppointmentType.GENERAL, )

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING,)

    reason = models.TextField(blank=True)

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["appointment_date", "appointment_time"]

    def __str__(self):
        return (
            f"{self.pet.name} - "
            f"{self.doctor.user.get_full_name()} - "
            f"{self.appointment_date} {self.appointment_time}"
        )
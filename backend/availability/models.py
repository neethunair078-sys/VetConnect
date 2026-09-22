from django.conf import settings
from django.db import models


class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(
        "doctors.DoctorProfile",
        on_delete=models.CASCADE,
        related_name="availabilities",
    )

    date = models.DateField()

    start_time = models.TimeField()
    end_time = models.TimeField()

    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["date", "start_time"]
        constraints = [
            models.UniqueConstraint(
                fields=["doctor", "date", "start_time", "end_time"],
                name="unique_doctor_availability",
            )
        ]

    def __str__(self):
        return (
            f"{self.doctor.user.get_full_name()} - "
            f"{self.date} - "
            f"{self.start_time} to {self.end_time}"
        )
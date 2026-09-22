from django.conf import settings
from django.db import models


class DoctorProfile(models.Model):

    class ApprovalStatus(models.TextChoices):
        PENDING = "PENDING", "Pending"
        APPROVED = "APPROVED", "Approved"
        REJECTED = "REJECTED", "Rejected"

    class ConsultationMode(models.TextChoices):
        ONLINE = "ONLINE", "Online"
        IN_PERSON = "IN_PERSON", "In-person"
        BOTH = "BOTH", "Both"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="doctor_profile"
    )

    license_number = models.CharField(
        max_length=100,
        unique=True
    )

    specialization = models.CharField(
        max_length=150
    )

    qualification = models.CharField(
        max_length=200,
        blank=True
    )

    years_of_experience = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    # clinic_name = models.CharField(
    #     max_length=200,
    #     blank=True
    # )

    # clinic_address = models.TextField(
    #     blank=True
    # )

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    bio = models.TextField(
        blank=True
    )

    # consultation_mode = models.CharField(
    #     max_length=20,
    #     choices=ConsultationMode.choices,
    #     blank=True
    # )

    languages = models.JSONField(
        default=list,
        blank=True
    )

    approval_status = models.CharField(
        max_length=20,
        choices=ApprovalStatus.choices,
        default=ApprovalStatus.PENDING
    )

    is_profile_complete = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.specialization}"
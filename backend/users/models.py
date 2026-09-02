from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    class Role(models.TextChoices):
        PET_OWNER = "PET_OWNER", "Pet Owner"
        DOCTOR = "DOCTOR", "Doctor"

    username = None

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True)
    role = models.CharField(max_length=20, choices=Role.choices)
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
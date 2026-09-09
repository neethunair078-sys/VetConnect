from django.db import models

# Create your models here.
class Pet(models.Model):
    class Gender(models.TextChoices):
        MALE = 'MALE', 'Male'
        FEMALE = 'FEMALE', 'Female'

    class VaccinationStatus(models.TextChoices):
        VACCINATED = "VACCINATED", "Vaccinated"
        PARTIALLY_VACCINATED = "PARTIALLY_VACCINATED", "Partially vaccinated"
        NOT_VACCINATED = "NOT_VACCINATED", "Not vaccinated"

    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='pets')
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    breed = models.CharField(max_length=100, blank=True)
    age = models.DecimalField(help_text="Age in months", max_digits=10, decimal_places=2)
    weight = models.FloatField(help_text="Weight in kilograms")
    gender = models.CharField(max_length=10, choices=Gender.choices)
    microchip = models.CharField(max_length=100, blank=True)
    vaccination_status = models.CharField(max_length=20, choices=VaccinationStatus.choices)
    medical_notes = models.TextField(blank=True)
    image = models.ImageField(upload_to='pets/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

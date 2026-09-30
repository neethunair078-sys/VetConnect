from django.db import models


class HealthRecord(models.Model):
    pet = models.ForeignKey("pets.Pet", on_delete=models.CASCADE, related_name="health_records")
    doctor = models.ForeignKey("doctors.DoctorProfile", on_delete=models.CASCADE, related_name="health_records")
    record_type = models.CharField(max_length=100)
    diagnosis = models.TextField(blank=True)
    treatment = models.TextField(blank=True)
    prescription = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    record_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-record_date", "-created_at"]

    def __str__(self):
        return f"{self.pet.name} - {self.record_type}"
from rest_framework import serializers
from .models import Pet

class PetSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Pet
        fields = [
            "id",
            "name",
            "species",
            "breed",
            "age",
            "weight",
            "gender",
            "microchip",
            "vaccination_status",
            "medical_notes",
            "image",
            "created_at",
            "updated_at",
        ]

        read_only_fields = ["id", "created_at", "updated_at"]
        
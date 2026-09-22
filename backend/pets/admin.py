from django.contrib import admin
from .models import Pet


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "species",
        "breed",
        "owner",
        "age",
        "weight",
        "gender",
        "vaccination_status",
        "created_at",
    )

    list_filter = (
        "species",
        "gender",
        "vaccination_status",
    )

    search_fields = (
        "name",
        "breed",
        "owner__email",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )
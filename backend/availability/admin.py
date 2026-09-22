from django.contrib import admin
from .models import DoctorAvailability


@admin.register(DoctorAvailability)
class DoctorAvailabilityAdmin(admin.ModelAdmin):

    list_display = (
        "doctor",
        "date",
        "start_time",
        "end_time",
        "is_available",
        "created_at",
    )

    list_filter = (
        "is_available",
        "date",
    )

    search_fields = (
        "doctor__user__email",
        "doctor__user__first_name",
        "doctor__user__last_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "date",
        "start_time",
    )
from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "pet",
        "doctor",
        "appointment_date",
        "appointment_time",
        "appointment_type",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "appointment_type",
        "appointment_date",
    )

    search_fields = (
        "pet__name",
        "pet__owner__email",
        "doctor__user__email",
        "doctor__user__first_name",
        "doctor__user__last_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "appointment_date",
        "appointment_time",
    )
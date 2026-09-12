from django.contrib import admin, messages
from .models import User, DoctorProfile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "phone",
        "role",
        "is_active",
        "is_staff",
    )

    list_filter = (
        "role",
        "is_active",
        "is_staff",
    )

    search_fields = (
        "email",
        "first_name",
        "last_name",
        "phone",
    )


# Doctor approve/Reject action

@admin.action(description="Approve selected doctors")
def approve_doctors(modeladmin, request, queryset):

    pending = queryset.filter(
        approval_status=DoctorProfile.ApprovalStatus.PENDING
    )

    count = pending.update(
        approval_status=DoctorProfile.ApprovalStatus.APPROVED
    )

    modeladmin.message_user(
        request,
        f"{count} doctor(s) approved successfully.",
        messages.SUCCESS,
    )


@admin.action(description="Reject selected doctors")
def reject_doctors(modeladmin, request, queryset):

    pending = queryset.filter(
        approval_status=DoctorProfile.ApprovalStatus.PENDING
    )

    count = pending.update(
        approval_status=DoctorProfile.ApprovalStatus.REJECTED
    )

    modeladmin.message_user(
        request,
        f"{count} doctor(s) rejected.",
        messages.WARNING,
    )


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):

    list_display = (
        "get_full_name",
        "get_email",
        "get_phone",
        "license_number",
        "specialization",
        "approval_status",
        "is_profile_complete",
        "created_at",
    )

    list_filter = (
        "approval_status",
        "is_profile_complete",
        "specialization",
    )

    search_fields = (
        "user__first_name",
        "user__last_name",
        "user__email",
        "user__phone",
        "license_number",
        "specialization",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    actions = [
        approve_doctors,
        reject_doctors,
    ]

    def get_full_name(self, obj):
        return obj.user.get_full_name()

    get_full_name.short_description = "Doctor Name"

    def get_email(self, obj):
        return obj.user.email

    get_email.short_description = "Email"

    def get_phone(self, obj):
        return obj.user.phone

    get_phone.short_description = "Phone"
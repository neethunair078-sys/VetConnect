from rest_framework.permissions import BasePermission


class IsDoctor(BasePermission):

    message = "Only doctors can manage availability."

    def has_permission(self, request, view):

        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "DOCTOR"
        )
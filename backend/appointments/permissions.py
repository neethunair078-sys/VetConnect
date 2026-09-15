from rest_framework.permissions import BasePermission


class IsPetOwnerOrDoctor(BasePermission):
    # Allows authenticated pet owners and doctors to access appointment APIs.

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role
            in ["PET_OWNER", "DOCTOR"]
        )
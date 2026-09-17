from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from .models import DoctorProfile
from .serializers import (DoctorRegisterSerializer, DoctorApprovalSerializer, ApprovedDoctorSerializer)
from .permissions import IsAdminUser


class DoctorRegisterView(generics.GenericAPIView):

    serializer_class = DoctorRegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": (
                        "Your registration has been submitted "
                        "successfully. Please wait for admin approval."
                    ),

                    "user": {
                        "id": user.id,
                        "fullName": user.get_full_name(),
                        "email": user.email,
                        "phone": user.phone,
                        "role": user.role,
                        "approvalStatus": (user.doctor_profile.approval_status),
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class PendingDoctorsView(generics.ListAPIView):

    serializer_class = DoctorApprovalSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):

        return (
            DoctorProfile.objects
            .filter(
                approval_status=(
                    DoctorProfile.ApprovalStatus.PENDING
                )
            )
            .select_related("user")
            .order_by("-created_at")
        )


class DoctorApprovalView(APIView):

    permission_classes = [IsAdminUser]

    def patch(self, request, pk):

        try:

            doctor = (
                DoctorProfile.objects
                .select_related("user")
                .get(pk=pk)
            )

        except DoctorProfile.DoesNotExist:

            return Response(
                {
                    "error": "Doctor not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        action = request.data.get("action")

        if action not in ["approve", "reject"]:

            return Response(
                {
                    "error": (
                        "Invalid action. "
                        "Use 'approve' or 'reject'."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (
            doctor.approval_status
            != DoctorProfile.ApprovalStatus.PENDING
        ):

            return Response(
                {
                    "error": (
                        "This doctor's registration "
                        "has already been processed."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if action == "approve":

            doctor.approval_status = (
                DoctorProfile.ApprovalStatus.APPROVED
            )

            message = "Doctor approved successfully."

        else:

            doctor.approval_status = (
                DoctorProfile.ApprovalStatus.REJECTED
            )

            message = "Doctor rejected successfully."

        doctor.save()

        return Response(
            {
                "message": message,
                "doctor": DoctorApprovalSerializer(
                    doctor
                ).data,
            },
            status=status.HTTP_200_OK,
        )



class ApprovedDoctorsView(generics.ListAPIView):
    serializer_class = ApprovedDoctorSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return DoctorProfile.objects.filter(approval_status=DoctorProfile.ApprovalStatus.APPROVED).select_related("user")
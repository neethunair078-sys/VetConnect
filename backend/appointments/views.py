from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentStatusSerializer
from .permissions import IsPetOwnerOrDoctor


class AppointmentListCreateView(generics.ListCreateAPIView):

    serializer_class = AppointmentSerializer
    permission_classes = [
        IsAuthenticated,
        IsPetOwnerOrDoctor,
    ]

    def get_queryset(self):
        user = self.request.user

        if user.role == "PET_OWNER":
            return Appointment.objects.filter(
                pet__owner=user
            ).select_related(
                "pet",
                "doctor__user",
                "pet__owner",
            )

        if user.role == "DOCTOR":
            return Appointment.objects.filter(
                doctor__user=user
            ).select_related(
                "pet",
                "pet__owner",
                "doctor__user",
            )

        return Appointment.objects.none()

    def perform_create(self, serializer):
        # Only pet owners should create appointments.

        if self.request.user.role != "PET_OWNER":

            raise PermissionDenied(
                "Only pet owners can create appointments."
            )

        serializer.save()



class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer

    permission_classes = [
            IsAuthenticated,
            IsPetOwnerOrDoctor,
        ]
    
    def get_queryset(self):
        user = self.request.user

        if user.role == "PET_OWNER":
            return Appointment.objects.filter(
                pet__owner=user
            ).select_related(
                "pet",
                "doctor__user",
                "pet__owner",
            )

        if user.role == "DOCTOR":
            return Appointment.objects.filter(
                doctor__user=user
            ).select_related(
                "pet",
                "pet__owner",
                "doctor__user",
            )

        return Appointment.objects.none()



class AppointmentStatusView(generics.GenericAPIView):

    serializer_class = AppointmentStatusSerializer

    permission_classes = [
        IsAuthenticated,
        IsPetOwnerOrDoctor,
    ]

    def get_queryset(self):
        user = self.request.user

        if user.role == "DOCTOR":
            return Appointment.objects.filter(doctor__user=user).select_related("pet", "pet__owner", "doctor__user")

        return Appointment.objects.none()

    def patch(self, request, pk):
        if request.user.role != "DOCTOR":
            raise PermissionDenied(
                "Only doctors can update appointment status."
            )

        try:
            appointment = self.get_queryset().get(pk=pk)
        except Appointment.DoesNotExist:
            return Response(
                {"error": "Appointment not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        action = serializer.validated_data["action"]

        if action == "confirm":

            if appointment.status != Appointment.Status.PENDING:
                return Response(
                    {
                        "error": (
                            "Only pending appointments "
                            "can be confirmed."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            appointment.status = Appointment.Status.CONFIRMED

        elif action == "reject":

            if appointment.status != Appointment.Status.PENDING:
                return Response(
                    {
                        "error": (
                            "Only pending appointments "
                            "can be rejected."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            appointment.status = Appointment.Status.REJECTED

        elif action == "complete":

            if appointment.status != Appointment.Status.CONFIRMED:
                return Response(
                    {
                        "error": (
                            "Only confirmed appointments "
                            "can be completed."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            appointment.status = Appointment.Status.COMPLETED

        appointment.save()

        return Response(
            {
                "message": "Appointment status updated successfully.",
                "appointment": AppointmentSerializer(
                    appointment
                ).data,
            },
            status=status.HTTP_200_OK,
        )
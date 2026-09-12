from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import PetOwnerRegisterSerializer, DoctorRegisterSerializer, LoginSerializer, DoctorApprovalSerializer
from .models import DoctorProfile
from .permissions import IsAdminUser


# Create your views here.
class PetOwnerRegisterView(generics.GenericAPIView):
    serializer_class = PetOwnerRegisterSerializer
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to access this view

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User registered successfully.",
                "user": {
                    "id": user.id,
                    "fullname": user.get_full_name(),
                    "email": user.email,
                    "phone": user.phone,
                    "role": user.role,
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DoctorRegisterView(generics.GenericAPIView):
    serializer_class = DoctorRegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response({
                "message": "Doctor registration submitted successfully. Your account is pending admin approval.",
                "user": {
                    "id": user.id,
                    "fullName": user.get_full_name(),
                    "email": user.email,
                    "phone": user.phone,
                    "role": user.role,
                    "approvalStatus": user.doctor_profile.approval_status,
                }
            }, status=status.HTTP_201_CREATED)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )



class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to access this view

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)

            user_data = {
                "id": user.id,
                "fullName": user.get_full_name(),
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
            }

            if user.role == user.Role.DOCTOR:

                user_data["doctorProfile"] = {
                    "approvalStatus": (
                        user.doctor_profile.approval_status
                    ),
                    "isProfileComplete": (
                        user.doctor_profile.is_profile_complete
                    ),
                }


            return Response({
                "message": "Login successful.",
                "user": user_data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh") or request.data.get("refresh_token")

            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token
            return Response({"message": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)





class PendingDoctorsView(generics.ListAPIView):

    serializer_class = DoctorApprovalSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return DoctorProfile.objects.filter(approval_status=DoctorProfile.ApprovalStatus.PENDING).select_related("user").order_by("-created_at")



class DoctorApprovalView(APIView):

    permission_classes = [IsAdminUser]

    def patch(self, request, pk):

        try:
            doctor = DoctorProfile.objects.select_related(
                "user"
            ).get(pk=pk)

        except DoctorProfile.DoesNotExist:
            return Response(
                {"error": "Doctor not found."},
                status=status.HTTP_404_NOT_FOUND
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
                status=status.HTTP_400_BAD_REQUEST
            )

        if doctor.approval_status != DoctorProfile.ApprovalStatus.PENDING:
            return Response(
                {
                    "error": (
                        "This doctor's registration has "
                        "already been processed."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
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
            status=status.HTTP_200_OK
        )
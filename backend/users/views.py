from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (PetOwnerRegisterSerializer, LoginSerializer)


class RegisterView(generics.GenericAPIView):

    serializer_class = PetOwnerRegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "message": "User registered successfully.",

                    "user": {
                        "id": user.id,
                        "fullName": user.get_full_name(),
                        "email": user.email,
                        "phone": user.phone,
                        "role": user.role,
                    },

                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(generics.GenericAPIView):

    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)

            user_data = {
                "id": user.id,
                "fullName": user.get_full_name(),
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
            }

            # Add doctor information to login response
            if user.role == user.Role.DOCTOR:

                user_data["doctorProfile"] = {
                    "approvalStatus": (
                        user.doctor_profile.approval_status
                    ),
                    "isProfileComplete": (
                        user.doctor_profile.is_profile_complete
                    ),
                }

            return Response(
                {
                    "message": "Login successful.",
                    "user": user_data,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:

            refresh_token = (
                request.data.get("refresh")
                or request.data.get("refresh_token")
            )

            if not refresh_token:

                return Response(
                    {
                        "error": "Refresh token is required."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = RefreshToken(refresh_token)

            token.blacklist()

            return Response(
                {
                    "message": "Logout successful."
                },
                status=status.HTTP_205_RESET_CONTENT,
            )

        except Exception as e:

            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
from rest_framework import serializers

from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from doctors.models import DoctorProfile


User = get_user_model()


class PetOwnerRegisterSerializer(serializers.ModelSerializer):

    fullName = serializers.CharField(
        required=True,
        max_length=150
    )

    email = serializers.EmailField(
        required=True
    )

    phone = serializers.CharField(
        required=True,
        max_length=15,
        validators=[
            RegexValidator(
                r'^\+?1?\d{9,15}$',
                message="Enter a valid phone number."
            )
        ]
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        validators=[validate_password]
    )

    confirmPassword = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = [
            'fullName',
            'email',
            'phone',
            'password',
            'confirmPassword'
        ]

    def validate_email(self, value):
        value = value.lower().strip()

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with that email already exists."
            )

        return value

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirmPassword')

        if password != confirm_password:
            raise serializers.ValidationError({
                'confirmPassword': "Passwords didn't match."
            })

        return attrs

    def create(self, validated_data):

        validated_data.pop('confirmPassword')

        full_name = validated_data.pop('fullName')

        name_parts = full_name.strip().split(' ', 1)

        first_name = name_parts[0]

        last_name = (
            name_parts[1]
            if len(name_parts) > 1
            else ''
        )

        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            role=User.Role.PET_OWNER,
            **validated_data
        )

        return user


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField(
        required=True
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    role = serializers.ChoiceField(
        choices=User.Role.choices,
        required=True
    )

    def validate(self, attrs):

        email = attrs.get('email')
        password = attrs.get('password')
        requested_role = attrs.get('role')

        if not email or not password:
            raise serializers.ValidationError(
                "Both email and password are required."
            )

        user = authenticate(
            email=email,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "Your account is inactive."
            )

        # Check user role
        if user.role != requested_role:

            if user.role == User.Role.DOCTOR:
                raise serializers.ValidationError(
                    "This account is registered as a doctor. "
                    "Please use Doctor Sign In."
                )

            if user.role == User.Role.PET_OWNER:
                raise serializers.ValidationError(
                    "This account is registered as a pet owner. "
                    "Please use Pet Owner Sign In."
                )

            raise serializers.ValidationError(
                "Invalid account role."
            )

        # Check doctor approval
        if user.role == User.Role.DOCTOR:

            doctor_profile = getattr(
                user,
                "doctor_profile",
                None
            )

            if not doctor_profile:
                raise serializers.ValidationError(
                    "Doctor profile not found."
                )

            if (
                doctor_profile.approval_status
                == DoctorProfile.ApprovalStatus.PENDING
            ):
                raise serializers.ValidationError(
                    "Your doctor registration is awaiting "
                    "admin approval."
                )

            if (
                doctor_profile.approval_status
                == DoctorProfile.ApprovalStatus.REJECTED
            ):
                raise serializers.ValidationError(
                    "Your doctor registration has been rejected."
                )

            if (
                doctor_profile.approval_status
                != DoctorProfile.ApprovalStatus.APPROVED
            ):
                raise serializers.ValidationError(
                    "Your doctor account is not approved."
                )

        attrs['user'] = user

        return attrs
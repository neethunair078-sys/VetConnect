from rest_framework import serializers

from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from .models import DoctorProfile


User = get_user_model()


class DoctorRegisterSerializer(serializers.ModelSerializer):

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

    licenseNumber = serializers.CharField(
        required=True,
        max_length=100
    )

    specialization = serializers.CharField(
        required=True,
        max_length=150
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
            "fullName",
            "email",
            "phone",
            "licenseNumber",
            "specialization",
            "password",
            "confirmPassword",
        ]

    def validate_email(self, value):

        value = value.lower().strip()

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with that email already exists."
            )

        return value

    def validate_licenseNumber(self, value):

        value = value.strip()

        if DoctorProfile.objects.filter(
            license_number=value
        ).exists():

            raise serializers.ValidationError(
                "A doctor with this license number already exists."
            )

        return value

    def validate(self, attrs):

        if attrs["password"] != attrs["confirmPassword"]:

            raise serializers.ValidationError({
                "confirmPassword": "Passwords didn't match."
            })

        return attrs

    def create(self, validated_data):

        validated_data.pop("confirmPassword")

        full_name = validated_data.pop("fullName")
        license_number = validated_data.pop("licenseNumber")
        specialization = validated_data.pop("specialization")

        name_parts = full_name.strip().split(" ", 1)

        first_name = name_parts[0]

        last_name = (
            name_parts[1]
            if len(name_parts) > 1
            else ""
        )

        # Create User
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            role=User.Role.DOCTOR,
            **validated_data
        )

        # Create Doctor Profile
        DoctorProfile.objects.create(
            user=user,
            license_number=license_number,
            specialization=specialization,
        )

        return user


class DoctorApprovalSerializer(serializers.ModelSerializer):

    fullName = serializers.SerializerMethodField()

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    phone = serializers.CharField(
        source="user.phone",
        read_only=True
    )

    class Meta:
        model = DoctorProfile

        fields = [
            "id",
            "fullName",
            "email",
            "phone",
            "license_number",
            "specialization",
            "approval_status",
            "is_profile_complete",
            "created_at",
        ]

        read_only_fields = fields

    def get_fullName(self, obj):
        return obj.user.get_full_name()




class ApprovedDoctorSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    phone = serializers.CharField(
        source="user.phone",
        read_only=True,
    )

    class Meta:
        model = DoctorProfile
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "license_number",
            "specialization",
            "approval_status",
        ]

        read_only_fields = fields

    def get_name(self, obj):
        return obj.user.get_full_name()




class DoctorProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        source="user.first_name",
        required=True
    )
    last_name = serializers.CharField(
        source="user.last_name",
        required=True
    )
    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )
    phone = serializers.CharField(
        source="user.phone",
        required=True
    )
    profile_image = serializers.ImageField(
        source="user.profile_image",
        required=False,
        allow_null=True
    )

    class Meta:
        model = DoctorProfile

        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "profile_image",
            "license_number",
            "specialization",
            "qualification",
            "years_of_experience",
            # "clinic_name",
            # "clinic_address",
            "consultation_fee",
            "bio",
            # "consultation_mode",
            "languages",
            "approval_status",
            "is_profile_complete",
        ]

        read_only_fields = [
            "id",
            "email",
            "license_number",
            "specialization",
            "approval_status",
            "is_profile_complete",
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop("user", {})

        user = instance.user

        user.first_name = user_data.get(
            "first_name",
            user.first_name
        )

        user.last_name = user_data.get(
            "last_name",
            user.last_name
        )

        user.phone = user_data.get(
            "phone",
            user.phone
        )

        if "profile_image" in user_data:
            user.profile_image = user_data["profile_image"]

        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.is_profile_complete = True
        instance.save()

        return instance
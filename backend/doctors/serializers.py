from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import User, Doctor
from django.contrib.auth.password_validation import validate_password

class DoctorRegisterSerializer(serializers.ModelSerializer):

    fullname = serializers.CharField(required=True, max_length=150)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(required=True, max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$', message="Enter a valid 10-digit phone number.")])
    license_number = serializers.CharField(required=True, max_length=100)
    specialization = serializers.CharField(required=True, max_length=150)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}, validators=[validate_password])
    confirmpassword = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = (
            'fullname',
            'email',
            'phone',
            'license_number',
            'specialization',
            'password',
            'confirmpassword'
        )

        def validate_email(self, value):
            value = value.lower().strip()

            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("A user with that email already exists.")
            return value

        def validate_license_number(self, value):
            if User.objects.filter(license_number=value).exists():
                raise serializers.ValidationError("A user with that license number already exists.")
            return value

        def validate(self, attrs):
            password = attrs.get('password')
            confirmpassword = attrs.get('confirmpassword')

            if password != confirmpassword:
                raise serializers.ValidationError({"confirmPassword": "Password fields didn't match."})
            return attrs


        def create(self, validated_data):
            validated_data.pop('confirmpassword')
            full_name = validated_data.pop('fullname')
            license_number = validated_data.pop('license_number')
            specialization = validated_data.pop('specialization')
            name_parts = full_name.split(' ', 1)
            first_name = name_parts[0]
            last_name = name_parts[1] if len(name_parts) > 1 else ''


            #create user

            user = User.objects.create_user(
                first_name = first_name,
                last_name = last_name,
                license_number = license_number,
                specialization = specialization,
                **validated_data,
                role = User.Role.DOCTOR
            )

            #create doctor profile
            Doctor.objects.create(
                user=user,
                license_number=license_number,
                specialization=specialization,
                qualification = '',
                experience = 0,
                approved_status = Doctor.ApprovedStatus.PENDING,
            )

            return user

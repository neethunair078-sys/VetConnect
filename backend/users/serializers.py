from rest_framework import serializers
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
# from .models import User



User = get_user_model()

class PetOwnerRegisterSerializer(serializers.ModelSerializer):
    fullName  = serializers.CharField(required=True, max_length=150)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(required=True, max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$', message="Enter a valid 10-digit phone number.")])
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}, validators=[validate_password])
    confirmPassword = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})


    class Meta:
        model = User
        fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword']

        # extra_kwargs = {
        #     "password": {"write_only": True},
        # }

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
            **validated_data,
            role=User.Role.PET_OWNER
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(email=email, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError(
                        "Your account is inactive."
                    )
                attrs['user'] = user
            else:
                raise serializers.ValidationError("Invalid email or password.")
        else:
            raise serializers.ValidationError("Both email and password are required.")

        return attrs
from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class PetOwnerRegisterSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(required=True, max_length=150)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(required=True, max_length=15, validators=[serializers.RegexValidator(r'^\+?1?\d{9,15}$', message="Enter a valid 10-digit phone number.")])
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}, validators=[validate_password])
    confirmpassword = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})


    class Meta:
        model = User
        fields = ['fullname', 'email', 'phone', 'password', 'confirmpassword']

        extra_kwargs = {
            "password": {"write_only": True},
        }

        def validate_email(self,value):
            value = value.lower().strip()

            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("A user with that email already exists.")
            return value


        def  validate(self, attrs):
            password = attrs.get('password')
            confirmpassword = attrs.get('confirmpassword')

            if password != confirmpassword:
                raise serializers.ValidationError({"confirmPassword": "Password fields didn't match."})
            
            return attrs

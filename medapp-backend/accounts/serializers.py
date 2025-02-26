from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'phone_number', 'is_doctor', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            phone_number=validated_data.get('phone_number', ''),
            is_doctor=validated_data.get('is_doctor', False),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

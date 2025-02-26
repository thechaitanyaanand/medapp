# access/serializers.py

from rest_framework import serializers
from .models import AccessRequest

class AccessRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessRequest
        fields = ['id', 'doctor', 'patient', 'access_start', 'access_end', 'code', 'status', 'created_at']
        read_only_fields = ['id', 'doctor', 'patient', 'code', 'status', 'created_at']

class AccessRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessRequest
        fields = ['status']

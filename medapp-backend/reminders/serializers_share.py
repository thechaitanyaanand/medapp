from rest_framework import serializers
from .models import ReminderShare

class ReminderShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReminderShare
        fields = ['id', 'reminder', 'shared_with', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']

class ReminderShareUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReminderShare
        fields = ['status']

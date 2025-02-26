from rest_framework import serializers
from .models import MedicalDocument

class MedicalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalDocument
        fields = ['id', 'user', 'title', 'file', 'uploaded_at']
        read_only_fields = ['id', 'user', 'uploaded_at']

from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import MedicalDocument
from .serializers import MedicalDocumentSerializer

class MedicalDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only the documents belonging to the authenticated user
        return MedicalDocument.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the document to the authenticated user
        serializer.save(user=self.request.user)

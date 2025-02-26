# access/views.py

import random
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import AccessRequest
from .serializers import AccessRequestSerializer, AccessRequestUpdateSerializer

User = get_user_model()

class CreateAccessRequestView(generics.CreateAPIView):
    """
    Endpoint for doctors to request access to a patient's data.
    Expected input:
      {
         "patient_username": "patient_username",
         "access_start": "YYYY-MM-DDTHH:MM:SSZ",   # ISO 8601 format
         "access_end": "YYYY-MM-DDTHH:MM:SSZ"
      }
    """
    serializer_class = AccessRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        doctor = request.user
        patient_username = request.data.get('patient_username')
        access_start = request.data.get('access_start')
        access_end = request.data.get('access_end')
        
        if not patient_username or not access_start or not access_end:
            return Response(
                {"error": "Missing required fields: patient_username, access_start, access_end."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            patient = User.objects.get(username=patient_username)
        except User.DoesNotExist:
            return Response(
                {"error": "Patient not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Generate a random 6-digit code for confirmation
        code = str(random.randint(100000, 999999))
        
        access_request = AccessRequest.objects.create(
            doctor=doctor,
            patient=patient,
            access_start=access_start,
            access_end=access_end,
            code=code,
            status='pending'
        )
        serializer = AccessRequestSerializer(access_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ConfirmAccessRequestView(generics.UpdateAPIView):
    """
    Endpoint for patients to confirm or reject an access request.
    Expected input:
      {
         "code": "123456",
         "status": "accepted"   # or "declined"
      }
    The URL should include the access request ID (pk).
    """
    serializer_class = AccessRequestUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = AccessRequest.objects.all()

    def update(self, request, *args, **kwargs):
        try:
            access_request = AccessRequest.objects.get(id=kwargs.get('pk'), patient=request.user)
        except AccessRequest.DoesNotExist:
            return Response(
                {"error": "Access request not found or you are not authorized."},
                status=status.HTTP_404_NOT_FOUND
            )
        code = request.data.get('code')
        new_status = request.data.get('status')
        if not code or new_status not in ['accepted', 'declined']:
            return Response(
                {"error": "Missing or invalid code/status. Status must be 'accepted' or 'declined'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if access_request.code != code:
            return Response(
                {"error": "Invalid code."},
                status=status.HTTP_400_BAD_REQUEST
            )
        access_request.status = new_status
        access_request.save()
        serializer = self.get_serializer(access_request)
        return Response(serializer.data)

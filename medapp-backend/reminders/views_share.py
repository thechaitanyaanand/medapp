import random
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Reminder, ReminderShare
from .serializers_share import ReminderShareSerializer, ReminderShareUpdateSerializer

User = get_user_model()

class CreateReminderShareView(generics.CreateAPIView):
    """
    Endpoint for a user to share a reminder with a friend/family member.
    """
    serializer_class = ReminderShareSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        reminder_id = request.data.get('reminder_id')
        shared_with_username = request.data.get('shared_with_username')

        # Ensure the reminder exists and belongs to the requesting user.
        try:
            reminder = Reminder.objects.get(id=reminder_id, user=request.user)
        except Reminder.DoesNotExist:
            return Response({"error": "Reminder not found or not owned by you."}, status=status.HTTP_404_NOT_FOUND)

        # Ensure the user to share with exists.
        try:
            shared_with = User.objects.get(username=shared_with_username)
        except User.DoesNotExist:
            return Response({"error": "User to share with not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create the ReminderShare object.
        share = ReminderShare.objects.create(
            reminder=reminder,
            shared_with=shared_with,
            status='pending'
        )
        serializer = ReminderShareSerializer(share)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UpdateReminderShareStatusView(generics.UpdateAPIView):
    """
    Endpoint for the recipient to update the share status (accept or decline).
    """
    serializer_class = ReminderShareUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ReminderShare.objects.all()

    def update(self, request, *args, **kwargs):
        share_id = kwargs.get('pk')
        try:
            share = ReminderShare.objects.get(id=share_id, shared_with=request.user)
        except ReminderShare.DoesNotExist:
            return Response({"error": "Share not found or not authorized."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(share, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

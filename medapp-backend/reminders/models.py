from django.db import models
from django.conf import settings

class Reminder(models.Model):
    REMINDER_TYPE_CHOICES = (
        ('medicine', 'Medicine'),
        ('appointment', 'Appointment'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    reminder_type = models.CharField(max_length=20, choices=REMINDER_TYPE_CHOICES)
    description = models.CharField(max_length=255)
    time = models.DateTimeField()
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.reminder_type} - {self.description}"

class ReminderShare(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    )
    reminder = models.ForeignKey(Reminder, on_delete=models.CASCADE, related_name='shares')
    shared_with = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='shared_reminders')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Share: {self.reminder} to {self.shared_with.username} [{self.status}]"

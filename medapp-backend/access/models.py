# access/models.py

from django.db import models
from django.conf import settings

class AccessRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    )
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_access_requests'
    )
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='patient_access_requests'
    )
    access_start = models.DateTimeField()
    access_end = models.DateTimeField()
    code = models.CharField(max_length=6, blank=True, null=True)  # Generated code for confirmation
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"AccessRequest: Dr. {self.doctor.username} -> {self.patient.username} ({self.status})"

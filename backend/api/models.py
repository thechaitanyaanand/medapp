from django.db import models
from django.contrib.auth.models import AbstractUser

# Extend the default user model
class User(AbstractUser):
    is_medical_professional = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, unique=True)
    otp_verified = models.BooleanField(default=False)
    # any additional fields (profile pic, etc.)

class MedicalDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document_type = models.CharField(max_length=50)  # e.g., 'Scan' or 'Document'
    text_content = models.TextField(blank=True)  # filled after OCR
    file_link = models.URLField()  # location in S3 or similar
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.document_type}"

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Connection(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_connections')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_connections')
    connected_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

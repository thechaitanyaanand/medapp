from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    is_doctor = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=6, blank=True, null=True)  # Field to store OTP for verification

    def __str__(self):
        return self.username

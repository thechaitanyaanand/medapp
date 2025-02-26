from django.db import models

# Create your models here.

# analytics/models.py
from django.db import models
from django.conf import settings

class HealthTip(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tip = models.TextField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"HealthTip for {self.user.username} on {self.generated_at}"

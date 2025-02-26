# analytics/tasks.py
from celery import shared_task
from django.utils import timezone
from .models import HealthTip
from accounts.models import User  # assuming you have user data here
import random

@shared_task
def generate_health_tips():
    # For demonstration, we loop over all users and create a random tip
    tips = [
        "Remember to drink water regularly.",
        "Consider a 30-minute walk every day.",
        "Include more fruits and vegetables in your diet."
    ]
    for user in User.objects.all():
        HealthTip.objects.create(
            user=user,
            tip=random.choice(tips),
        )
    return f"Generated health tips at {timezone.now()}"

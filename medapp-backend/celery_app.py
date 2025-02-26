# celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'medapp.settings')

app = Celery('medapp')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

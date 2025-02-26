# chatbot/urls.py

from django.urls import path
from .views import ChatbotView

urlpatterns = [
    # This endpoint will be accessible at e.g. /api/chatbot/
    path('', ChatbotView.as_view(), name='chatbot'),
]

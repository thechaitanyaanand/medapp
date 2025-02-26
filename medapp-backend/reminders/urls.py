from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ReminderViewSet
from .views_share import CreateReminderShareView, UpdateReminderShareStatusView

router = DefaultRouter()
router.register(r'', ReminderViewSet, basename='reminder')

urlpatterns = [
    # Reminder share endpoints
    path('share/', CreateReminderShareView.as_view(), name='create_reminder_share'),
    path('share/<int:pk>/', UpdateReminderShareStatusView.as_view(), name='update_reminder_share'),
]

urlpatterns += router.urls

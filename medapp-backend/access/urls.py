# access/urls.py

from django.urls import path
from .views import CreateAccessRequestView, ConfirmAccessRequestView

urlpatterns = [
    path('create/', CreateAccessRequestView.as_view(), name='create_access_request'),
    path('confirm/<int:pk>/', ConfirmAccessRequestView.as_view(), name='confirm_access_request'),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RequestOTP, VerifyOTP  # plus other viewsets

router = DefaultRouter()
# Register your viewsets for documents, appointments, etc.
# router.register(r'documents', MedicalDocumentViewSet)
# router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('request-otp/', RequestOTP.as_view(), name='request-otp'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify-otp'),
    path('', include(router.urls)),
]

from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
import random

# A simple in-memory store for OTPs (for demonstration only)
OTP_STORE = {}

class RequestOTP(APIView):
    def post(self, request):
        phone = request.data.get('phone_number')
        try:
            user = get_user_model().objects.get(phone_number=phone)
        except User.DoesNotExist:
            # Create user if doesn't exist, or you might want a registration flow.
            user = get_user_model().objects.create(username=phone, phone_number=phone)
        otp = random.randint(100000, 999999)
        OTP_STORE[phone] = otp
        # Send OTP via SMS in production (use AWS SNS or similar)
        print(f"DEBUG: OTP for {phone} is {otp}")
        return Response({"message": "OTP sent"}, status=status.HTTP_200_OK)

class VerifyOTP(APIView):
    def post(self, request):
        phone = request.data.get('phone_number')
        otp = request.data.get('otp')
        if OTP_STORE.get(phone) and str(OTP_STORE.get(phone)) == str(otp):
            user = get_user_model().objects.get(phone_number=phone)
            user.otp_verified = True
            user.save()
            # Return JWT token (using SimpleJWT)
            from rest_framework_simplejwt.tokens import RefreshToken
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data
            })
        return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

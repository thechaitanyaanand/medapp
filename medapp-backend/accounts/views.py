import random
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Simulate OTP generation for demonstration purposes
            otp_code = str(random.randint(100000, 999999))
            user.otp_code = otp_code
            user.save()
            return Response({
                "message": "User created. Please verify OTP.",
                "otp_demo": otp_code  # For demo/testing; remove in production
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    def post(self, request):
        username = request.data.get('username')
        otp_input = request.data.get('otp_code')
        try:
            user = User.objects.get(username=username)
            if user.otp_code == otp_input:
                # OTP is valid; clear it after verification
                user.otp_code = ""
                user.save()
                return Response({"message": "OTP verified."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

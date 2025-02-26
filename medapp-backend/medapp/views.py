# medapp/views.py
from django.shortcuts import render

def home_view(request):
    print("home_view loaded")  # Debug: Check if this prints when you run the server
    return render(request, 'home.html')


from django.contrib import admin
from django.urls import path, include
from medapp.views import home_view

urlpatterns = [
    path('', home_view, name='home'), 
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),      # Accounts app endpoints
    path('api/reminders/', include('reminders.urls')),  # Reminders app endpoints
    path('api/chatbot/', include('chatbot.urls')),      # Chatbot app endpoints
    # Add other app endpoints as needed
    path('api/documents/', include('documents.urls')),
    path('api/access/', include('access.urls')),  
]

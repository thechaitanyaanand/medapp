# chatbot/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import analyze_question

class ChatbotView(APIView):
    """
    ChatbotView processes a POST request containing a 'question' field.
    It uses the analyze_question function to generate a simulated answer
    and a list of document links, then returns this data as JSON.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        question = request.data.get('question', '')
        # You could also use request.user to personalize responses.
        user_id = request.user.id
        answer, doc_links = analyze_question(question, user_id)
        return Response({
            'answer': answer,
            'links': doc_links,
        })

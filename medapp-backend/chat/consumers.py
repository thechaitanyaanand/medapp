# chat/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extract the room name from the URL route (e.g., ws/chat/room1/)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Add the current connection to the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        # Accept the connection
        await self.accept()

    async def disconnect(self, close_code):
        # Remove the current connection from the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive a message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message', '')

        # Broadcast the message to the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',  # calls the method chat_message below
                'message': message,
            }
        )

    # Handler method for messages sent to the room group
    async def chat_message(self, event):
        message = event.get('message', '')

        # Send the message to the WebSocket client
        await self.send(text_data=json.dumps({
            'message': message
        }))

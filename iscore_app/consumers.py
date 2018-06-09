# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer,SyncConsumer
import json
from channels.db import database_sync_to_async
from iscore_app.models import Matches,Score
from django.core import serializers
from iscore_app.serializers import ScoresSerializer


class MatchConsumer(WebsocketConsumer):

    def connect(self):
        self.match_id  = self.scope['url_route']['kwargs']['match_id']
        self.room_group_name = 'match_%s' % self.match_id
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        data = text_data_json
        data.pop('serving', None)
        info = Score.objects.get(match_id=self.match_id)
        new_score = ScoresSerializer(info, data=data)
        new_score.is_valid()
        new_score.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': "score.info",
                'message': text_data_json
            },
        )


    # Receive message from room group
    def score_info(self, event):
        score = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': score
        }))




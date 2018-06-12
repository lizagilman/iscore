# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from iscore_app.models import Matches,Score
from django.core import serializers
from iscore_app.serializers import ScoresSerializer
from django.db import close_old_connections

class MatchConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.match_id  = self.scope['url_route']['kwargs']['match_id']
        self.match_group_name = 'match_%s' % self.match_id
        # Join match group
        await self.channel_layer.group_add(
            self.match_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.match_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        info=await database_sync_to_async(self.get_score)()
        data = {"current_set": text_data_json["current_set"],
                "current_game": text_data_json["current_game"],
                "p1_set1": text_data_json["p1_set1"],
                "p2_set1": text_data_json["p2_set1"],
                "p1_set2": text_data_json["p1_set2"],
                "p2_set2": text_data_json["p2_set2"],
                "p1_set3": text_data_json["p1_set3"],
                "p2_set3": text_data_json["p2_set3"],
                "p1_set4": text_data_json["p1_set4"],
                "p1_set5": text_data_json["p1_set5"],
                "p2_set5": text_data_json["p2_set5"],
                "p1_sets": text_data_json["p1_sets"],
                "p2_sets": text_data_json["p2_sets"],
                "p1_games": text_data_json["p1_games"],
                "p2_games": text_data_json["p2_games"],
                "p1_points": text_data_json["p1_points"],
                "p2_points": text_data_json["p2_points"],
                "match_id": self.match_id,
                 }

        await self.save_to_db(data,info)
        close_old_connections()
        await self.channel_layer.group_send(
            self.match_group_name,
            {
                'type': "score.info",
                'message': text_data_json
            },
        )


    # Receive message from match group
    async def score_info(self, event):
        score = event['message']

        # Send message to WebSocket
        await   self.send(text_data=json.dumps({
            'message': score
        }))

    def get_score(self):
        return Score.objects.get(match_id=self.match_id)
    
    @database_sync_to_async
    def save_to_db(self,data,instance):

        new_score=ScoresSerializer(instance,data=data)
        new_score.is_valid()
        new_score.save()
      



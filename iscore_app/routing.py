# chat/routing.py
from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [
    url(r'^ws/iscore/match/(?P<match_id>[^/]+)/$', consumers.MatchConsumer),
]

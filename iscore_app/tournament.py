from rest_framework.response import Response
import json
from iscore_app.models import Organizations, Tournament_Managers, Grades, Ranking_Lists, TournamentCategories, Entries, Tournaments
from django.core import serializers
from rest_framework.decorators import api_view
from iscore_app.serializers import TournamentsSerializer


@api_view(['GET', 'POST'])
def create_Tournament(request):

    data = request.data

    tournament_serializer = TournamentsSerializer(data=data)
    tournament_serializer.is_valid()
    if tournament_serializer.is_valid():
        tournament_serializer.save()

    categories = data.getlist('categories')
    for category in categories:
        new_category = TournamentCategories(
            category=str(category), tournamet=tournament_serializer.instance)
        new_category.save()

    return Response(tournament_serializer.data)

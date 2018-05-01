from rest_framework.response import Response
<<<<<<< origin/master
from iscore_app.models import TournamentCategories
=======
import json
from iscore_app.models import Organizations, Tournament_Managers, Grades, Ranking_Lists, TournamentCategories, Entries, Tournaments
from django.core import serializers
>>>>>>> HEAD~1
from rest_framework.decorators import api_view
from iscore_app.serializers import TournamentsSerializer


@api_view(['GET', 'POST'])
def create_tournament(request):
    data = request.data
    tournament_serializer = TournamentsSerializer(data=data)
    tournament_serializer.is_valid()
    if tournament_serializer.is_valid():
        tournament_serializer.save()

    try:
        categories = data.getlist('categories')
        for category in categories:
            new_category = TournamentCategories(
                category=str(category), tournamet=tournament_serializer.instance)
            new_category.save()
    except:
        pass

        return Response(tournament_serializer.data)

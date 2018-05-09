from rest_framework.response import Response
from iscore_app.models import TournamentCategories
from rest_framework.decorators import api_view
from iscore_app.serializers import TournamentsSerializer
import datetime


@api_view(['GET', 'POST'])
def create_tournament(request):
    data = request.data
    tournament_serializer = TournamentsSerializer(data=data)
    if tournament_serializer.is_valid():
        tournament_serializer.validated_data[
            'start_date'] += datetime.timedelta(hours=3)
        tournament_serializer.validated_data['end_date'] += datetime.timedelta(
            hours=3)
        tournament_serializer.save()

    try:
        categories = data['categories']
        for category in categories:
            new_category = TournamentCategories(
                category=str(category),
                tournamet=tournament_serializer.instance)
            new_category.save()
    except:
        pass

    return Response(tournament_serializer.data)

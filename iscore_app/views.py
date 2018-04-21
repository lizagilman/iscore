from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.http import HttpResponse
from django.views import View

from .models import Catagories, Players, Money_Distribution_Methods, Points_Distribution_Methods, Grades, Ranking_Lists, Rankings_list_catagories, Organizations, Tournaments, Matches, Draws, Tournament_Managers, Coach, Games, Sets, Entries
from iscore_app import serializers


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class CatagoriesViewSet(viewsets.ModelViewSet):

    queryset = Catagories.objects.all().distinct()
    serializer_class = serializers.CatagoriesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = (
        'rankings_list_catagories__list',
        'name',
    )


class PlayersViewSet(viewsets.ModelViewSet):

    queryset = Players.objects.all()
    serializer_class = serializers.PlayersSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'age', 'nationality', 'gender']


class MoneyDistributionMethodsViewSet(viewsets.ModelViewSet):

    queryset = Money_Distribution_Methods.objects.all()
    serializer_class = serializers.MoneyDistributionMethodsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class PointsDistributionMethodsViewSet(viewsets.ModelViewSet):

    queryset = Points_Distribution_Methods.objects.all()
    serializer_class = serializers.PointsDistributionMethodsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class GradesViewSet(viewsets.ModelViewSet):

    queryset = Grades.objects.all()
    serializer_class = serializers.GradesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class GradesReaderViewSet(viewsets.ModelViewSet):

    queryset = Grades.objects.all()
    serializer_class = serializers.GradesReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class RankingListsViewSet(viewsets.ModelViewSet):

    queryset = Ranking_Lists.objects.all()
    serializer_class = serializers.RankingListsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('organization', 'name', 'grades')


class RankingslistcatagoriesViewSet(viewsets.ModelViewSet):

    queryset = Rankings_list_catagories.objects.all()
    serializer_class = serializers.RankingslistcatagoriesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'list__name', 'catagory__name', 'player__name', 'points__name'
    ]


class OrganizationsViewSet(viewsets.ModelViewSet):

    queryset = Organizations.objects.all()
    serializer_class = serializers.OrganizationsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('field_of_sports', 'name')


class TournamentsViewSet(viewsets.ModelViewSet):

    queryset = Tournaments.objects.all()
    serializer_class = serializers.TournamentsSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('name', 'manager')


class MatchesViewSet(viewsets.ModelViewSet):

    queryset = Matches.objects.all()
    serializer_class = serializers.MatchesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['match_num', 'player1__name', 'player2__name']


class MatchesReaderViewSet(viewsets.ModelViewSet):

    queryset = Matches.objects.all()
    serializer_class = serializers.MatchesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['match_num', 'player1__name', 'player2__name']


class DrawsViewSet(viewsets.ModelViewSet):

    queryset = Draws.objects.all()
    serializer_class = serializers.DrawsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'tournament__name', 'player1__name', 'player2__name', 'catagory'
    ]


class TournamentManagersViewSet(viewsets.ModelViewSet):

    queryset = Tournament_Managers.objects.all()
    serializer_class = serializers.TournamentManagersSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'tournaments__name']


class TournamentManagersReaderViewSet(viewsets.ModelViewSet):

    queryset = Tournament_Managers.objects.all()
    serializer_class = serializers.TournamentManagersReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'tournaments__name']


class CoachsViewSet(viewsets.ModelViewSet):

    queryset = Coach.objects.all()
    serializer_class = serializers.CoachSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'player_list__name']


class GamesViewSet(viewsets.ModelViewSet):

    queryset = Games.objects.all()
    serializer_class = serializers.GamesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)


class SetsViewSet(viewsets.ModelViewSet):

    queryset = Sets.objects.all()
    serializer_class = serializers.SetSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)


class EntriesReaderViewSet(viewsets.ModelViewSet):

    queryset = Entries.objects.all()
    serializer_class = serializers.EntriesReaderSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ('player', 'draw_list')


class EntriesViewSet(viewsets.ModelViewSet):

    queryset = Entries.objects.all()
    serializer_class = serializers.EntriesSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]


class MatchesReaderViewSet(viewsets.ModelViewSet):

    queryset = Matches.objects.all()
    serializer_class = serializers.MatchesReaderSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ('player1', 'player2', 'winner', 'draws', 'stage')

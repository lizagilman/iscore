from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.http import HttpResponse
from django.views import View

from .models import Catagories, Players, Money_Distribution_Methods, Points_Distribution_Methods, Grades, Ranking_Lists, Rankings_list_catagories, Organizations, Tournaments, Matches, Draws, Tournament_Managers, Coach
from .serializers import CatagoriesSerializer, PlayersSerializer, MoneyDistributionMethodsSerializer, PointsDistributionMethodsSerializer, GradesSerializer, RankingListsSerializer, RankingslistcatagoriesSerializer, OrganizationsSerializer, TournamentsSerializer, MatchesSerializer, DrawsSerializer, TournamentManagersSerializer, CoachSerializer, GradesReaderSerializer, TournamentManagersReaderSerializer


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class CatagoriesViewSet(viewsets.ModelViewSet):

    queryset = Catagories.objects.all()
    serializer_class = CatagoriesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name']


class PlayersViewSet(viewsets.ModelViewSet):

    queryset = Players.objects.all()
    serializer_class = PlayersSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'age', 'nationality', 'gender']


class MoneyDistributionMethodsViewSet(viewsets.ModelViewSet):

    queryset = Money_Distribution_Methods.objects.all()
    serializer_class = MoneyDistributionMethodsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class PointsDistributionMethodsViewSet(viewsets.ModelViewSet):

    queryset = Points_Distribution_Methods.objects.all()
    serializer_class = PointsDistributionMethodsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class GradesViewSet(viewsets.ModelViewSet):

    queryset = Grades.objects.all()
    serializer_class = GradesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class GradesReaderViewSet(viewsets.ModelViewSet):

    queryset = Grades.objects.all()
    serializer_class = GradesReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class RankingListsViewSet(viewsets.ModelViewSet):

    queryset = Ranking_Lists.objects.all()
    serializer_class = RankingListsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
    ]


class RankingslistcatagoriesViewSet(viewsets.ModelViewSet):

    queryset = Rankings_list_catagories.objects.all()
    serializer_class = RankingslistcatagoriesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'list__name', 'catagory__name', 'player__name', 'points__name'
    ]


class OrganizationsViewSet(viewsets.ModelViewSet):

    queryset = Organizations.objects.all()
    serializer_class = OrganizationsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'name',
        'ranking_lists__name',
    ]


class TournamentsViewSet(viewsets.ModelViewSet):

    queryset = Tournaments.objects.all()
    serializer_class = TournamentsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'organization__name', 'status', 'field_of_sport']


class MatchesViewSet(viewsets.ModelViewSet):

    queryset = Matches.objects.all()
    serializer_class = MatchesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['match_num', 'player1__name', 'player2__name']


class DrawsViewSet(viewsets.ModelViewSet):

    queryset = Draws.objects.all()
    serializer_class = DrawsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'tournament__name', 'player1__name', 'player2__name', 'catagory'
    ]


class TournamentManagersViewSet(viewsets.ModelViewSet):

    queryset = Tournament_Managers.objects.all()
    serializer_class = TournamentManagersSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'tournaments__name']


class TournamentManagersReaderViewSet(viewsets.ModelViewSet):

    queryset = Tournament_Managers.objects.all()
    serializer_class = TournamentManagersReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'tournaments__name']


class CoachsViewSet(viewsets.ModelViewSet):

    queryset = Coach.objects.all()
    serializer_class = CoachSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'player_list__name']


def someFunction(a):
    print("a:", a)


def test1(request):
    print("hi")
    someFunction("arg")
    return HttpResponse("ok")


def generate_schedule(match_list, start_time, end_time, game_time, court_num):

    day = start_time.strftime("%d")

    print(day)

    return
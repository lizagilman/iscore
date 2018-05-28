from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import RankingListCategories, Players, Money_Distribution_Methods, Points_Distribution_Methods, Grades, Ranking_Lists, RankedPlayers, Organizations, Tournaments, Matches, TournamentCategories, Tournament_Managers, Coach, Games, Sets, Entries
from iscore_app import serializers


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class CatagoriesViewSet(viewsets.ModelViewSet):

    queryset = RankingListCategories.objects.all().distinct()
    serializer_class = serializers.CatagoriesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = (
        'rankedplayers__list',
        'name',
    )


class PlayersViewSet(viewsets.ModelViewSet):

    queryset = Players.objects.all()
    serializer_class = serializers.PlayersSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'age', 'nationality', 'gender']


class MoneyDistributionMethodsViewSet(viewsets.ModelViewSet):

    queryset = Money_Distribution_Methods.objects.all().distinct()
    serializer_class = serializers.MoneyDistributionMethodsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('name', 'grades__ranking_lists__organization')


class PointsDistributionMethodsViewSet(viewsets.ModelViewSet):

    queryset = Points_Distribution_Methods.objects.all().distinct()
    serializer_class = serializers.PointsDistributionMethodsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('name', 'grades__ranking_lists__organization')


class GradesViewSet(viewsets.ModelViewSet):

    queryset = Grades.objects.all()
    serializer_class = serializers.GradesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)


class GradesReaderViewSet(viewsets.ModelViewSet):

    queryset = Grades.objects.all().distinct()
    serializer_class = serializers.GradesReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('name', 'ranking_lists', 'ranking_lists__organization')


class RankingListsViewSet(viewsets.ModelViewSet):

    queryset = Ranking_Lists.objects.all()
    serializer_class = serializers.RankingListsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('organization', 'name', 'grades')


class RankingListsReaderViewSet(viewsets.ModelViewSet):

    queryset = Ranking_Lists.objects.all()
    serializer_class = serializers.RankingListsReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('organization', 'name', 'grades', 'organization__name',
                     'grades__name')


class RankedPlayersViewSet(viewsets.ModelViewSet):

    queryset = RankedPlayers.objects.all()
    serializer_class = serializers.RankedPlayersSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['list', 'catagory', 'player__name', 'points__name']


class RankedPlayersReaderViewSet(viewsets.ModelViewSet):

    queryset = RankedPlayers.objects.all()
    serializer_class = serializers.RankedPlayersReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_fields = ('player__name', 'category__name', 'list__name', 'player',
                     'category', 'list')
    ordering_fields = ('category', 'rank', 'points')


class OrganizationsViewSet(viewsets.ModelViewSet):

    queryset = Organizations.objects.all()
    serializer_class = serializers.OrganizationsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('field_of_sports', 'name')


class OrganizationsReaderViewSet(viewsets.ModelViewSet):

    queryset = Organizations.objects.all()
    serializer_class = serializers.OrganizationsReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('field_of_sports', 'name')


class TournamentsViewSet(viewsets.ModelViewSet):

    queryset = Tournaments.objects.all()
    serializer_class = serializers.TournamentsSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('name', 'manager')


class TournamentsReaderViewSet(viewsets.ModelViewSet):

    queryset = Tournaments.objects.all()
    serializer_class = serializers.TournamentsReaderSerializer
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
    filter_fields = ('category', 'category__tournamet')


class TournamentCategoriesViewSet(viewsets.ModelViewSet):

    queryset = TournamentCategories.objects.all()
    serializer_class = serializers.TournamentCategoriesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('tournamet', 'category', 'player_list__name')


class TournamentCategoriesReaderViewSet(viewsets.ModelViewSet):

    queryset = TournamentCategories.objects.all()
    serializer_class = serializers.TournamentCategoriesReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('tournamet', 'category', 'player_list__name')


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


class CoachsReaderViewSet(viewsets.ModelViewSet):

    queryset = Coach.objects.all()
    serializer_class = serializers.CoachReaderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('name', )


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
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filter_fields = ('player', 'tournament_category',
                     'tournament_category__tournamet',
                     'tournament_category__category')

    ordering_fields = ('tournament_category', 'rank', 'is_seeded', 'player')


class EntriesViewSet(viewsets.ModelViewSet):

    queryset = Entries.objects.all()
    serializer_class = serializers.EntriesSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]


class MatchesReaderViewSet(viewsets.ModelViewSet):

    queryset = Matches.objects.all()
    serializer_class = serializers.MatchesReaderSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ('category__tournamet', 'category', 'stage')

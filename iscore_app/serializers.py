from iscore_app.models import Catagories, Players, Money_Distribution_Methods, Points_Distribution_Methods, Grades, Ranking_Lists, Rankings_list_catagories, Organizations, Tournaments, Matches, Draws, Tournament_Managers, Coach
from rest_framework import serializers


class CatagoriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Catagories
        fields = ['id', 'name']


class PlayersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Players
        fields = ('name', 'age', 'gender', 'nationality')


class MoneyDistributionMethodsSerializer(
        serializers.HyperlinkedModelSerializer):

    distribution = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Money_Distribution_Methods
        fields = ('name', 'distribution')


class PointsDistributionMethodsSerializer(
        serializers.HyperlinkedModelSerializer):
    distribution = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Points_Distribution_Methods
        fields = ('name', 'distribution')


class GradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = ('name', 'points', 'money')


class GradesReaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = ('name', 'points', 'money')
        depth = 1


class RankingListsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking_Lists
        fields = ('name', 'grades')


class RankingslistcatagoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rankings_list_catagories
        fields = ('list', 'catagory', 'player', 'points')


class OrganizationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizations
        fields = ('name', 'ranking_lists', 'points_list', 'money_list')


class TournamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournaments
        fields = ('id', 'name', 'field_of_sport', 'is_ranked', 'start_date',
                  'end_date', 'registration_start_date',
                  'registration_end_date', 'address', 'status', 'is_published')


class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = ('match_num', 'set_num', 'game_num', 'player1',
                  'player1_score', 'player2', 'player2_score')


class DrawsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draws
        fields = ('tournament', 'match', 'player1', 'player2', 'winner',
                  'catagory', 'stage', 'court', 'time', 'system_of_play')


class TournamentManagersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament_Managers
        fields = '__all__'


class TournamentManagersReaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament_Managers
        fields = '__all__'
        depth = 1


class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = ('name', 'player_list')

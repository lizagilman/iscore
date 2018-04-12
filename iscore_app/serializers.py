from iscore_app.models import Catagories, Players, Money_Distribution_Methods, Points_Distribution_Methods, Grades, Ranking_Lists, Rankings_list_catagories, Organizations, Tournaments, Matches, Draws, Tournament_Managers, Coach
from rest_framework import serializers


class CatagoriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Catagories
        fields = '__all__'


class PlayersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'


class MoneyDistributionMethodsSerializer(
        serializers.HyperlinkedModelSerializer):

    distribution = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Money_Distribution_Methods
        fields = '__all__'


class PointsDistributionMethodsSerializer(
        serializers.HyperlinkedModelSerializer):
    distribution = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Points_Distribution_Methods
        fields = '__all__'


class GradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = '__all__'


class GradesReaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = '__all__'
        depth = 1


class RankingListsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking_Lists
        fields = '__all__'


class RankingslistcatagoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rankings_list_catagories
        fields = '__all__'


class OrganizationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizations
        fields = '__all__'


class TournamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournaments
        fields = '__all__'


class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = '__all__'


class DrawsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draws
        fields = '__all__'


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
        fields = '__all__'

from iscore_app.models import RankingListCategories, Players, Money_Distribution_Methods, Points_Distribution_Methods, Grades, Ranking_Lists, RankedPlayers, Organizations, Tournaments, Matches, TournamentCategories, Tournament_Managers, Coach, Games, Sets, Entries,Umpires,User,Score
from rest_framework import serializers


class CatagoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RankingListCategories
        fields = '__all__'


class PlayersSerializer(serializers.ModelSerializer):
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
        fields = ['name', 'points', 'money','id']
        depth = 1


class RankingListsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking_Lists
        fields = '__all__'


class RankingListsReaderSerializer(serializers.ModelSerializer):
    organization = serializers.SlugRelatedField(
        read_only=True, slug_field='name')
    grades = serializers.SlugRelatedField(
        read_only=True, slug_field='name', many=True)
    field_of_sport = serializers.CharField(
        source='organization.field_of_sports')
    categories = serializers.SlugRelatedField(
        read_only=True, slug_field='name', many=True)

    class Meta:
        model = Ranking_Lists
        fields = ('organization', 'name', 'field_of_sport', 'updated_at',
                  'grades', 'categories','id')


class RankedPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RankedPlayers
        fields = '__all__'


class RankedPlayersReaderSerializer(serializers.ModelSerializer):
    list = serializers.SlugRelatedField(read_only=True, slug_field='name')
    category = serializers.SlugRelatedField(read_only=True, slug_field='name')
    player = serializers.SlugRelatedField(read_only=True, slug_field='name')
    nationality = serializers.CharField(source='player.nationality')

    class Meta:
        model = RankedPlayers
        fields = ('player', 'nationality', 'category', 'list', 'rank',
                  'points','tournaments_played')



class OrganizationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizations
        fields = '__all__'


class OrganizationsReaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizations
        fields = '__all__'
        depth = 1


class TournamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournaments
        fields = '__all__'


class TournamentsReaderSerializer(serializers.ModelSerializer):
    organization = serializers.SlugRelatedField(
        read_only=True, slug_field='name')
    ranking_list = serializers.SlugRelatedField(
        read_only=True, slug_field='name')
    grade = serializers.SlugRelatedField(read_only=True, slug_field='name')
    manager = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = Tournaments
        fields = '__all__'


class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = '__all__'

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MatchesReaderSerializer(serializers.ModelSerializer):

    player1 = serializers.SlugRelatedField(read_only=True, slug_field='name')
    player2 = serializers.SlugRelatedField(read_only=True, slug_field='name')
    winner = serializers.SlugRelatedField(read_only=True, slug_field='name')
    category = serializers.SlugRelatedField(
        read_only=True, slug_field='category')

    class Meta:
        model = Matches
        fields = '__all__'


class TournamentCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentCategories
        fields = '__all__'


class TournamentCategoriesReaderSerializer(serializers.ModelSerializer):
    player_list = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='name')

    class Meta:
        model = TournamentCategories
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


class CoachReaderSerializer(serializers.ModelSerializer):
    #    player_list = serializers.SlugRelatedField(
    #        many=True, read_only=True, slug_field='name')

    class Meta:
        model = Coach
        fields = '__all__'
        depth = 1


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = '__all__'


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sets
        fields = '__all__'

class UmpireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Umpires
        fields = '__all__'


class EntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entries
        fields = '__all__'

class ScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields =[ 'match_id','current_set','current_game','p1_set1','p2_set1',
                  'p1_set2','p2_set2','p1_set3','p2_set3','p1_set4','p1_set4','p1_set5','p2_set5','p1_sets','p2_sets','p1_games'
                  ,'p2_games','p1_points','p2_points']


class EntriesReaderSerializer(serializers.ModelSerializer):
    tournament_category = serializers.SlugRelatedField(
        read_only=True, slug_field='category')
    player = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = Entries
        fields = ['tournament_category', 'player', 'is_seeded', 'rank']

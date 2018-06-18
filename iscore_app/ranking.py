from django.http import HttpResponse
from iscore_app.models import Matches, RankedPlayers, Coach, Ranking_Lists, TournamentCategories, Entries, Tournaments, Players, RankingListCategories
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from iscore_app.serializers import RankedPlayersReaderSerializer
import pandas as pd


@api_view(['GET'])
def handle_ranking(request):

    tournament_info = Tournaments.objects.get(pk=26)
    update_ranking_according_to_tournament_records(tournament_info)
    return Response("ok")


#return the registered player position in the tournament category
def find_player_position(player, category):

    query = Q(player1=player) | Q(player2=player)
    player_matches = Matches.objects.filter(
        category=category).filter(query).order_by('-match_index')
    if(player_matches[0].stage=='F' and player_matches[0].winner==player):
        return 'W'

    return player_matches[0].stage


#return the player's ranking of the category in the ranking list
def get_player_ranking(player, category, ranking_list):

    player_ranking = RankedPlayers.objects.filter(list=ranking_list).filter(
        category__name=category.category).filter(player=player)
    if(player_ranking.exists()==False):
        return None
    return player_ranking[0]


#add the points according to the grade
def update_player_score(player_ranking, grade, stage):

    points_distribution = grade.points.distribution
    index = find_stage_index(stage)
    player_ranking.points += points_distribution[index]
    player_ranking.tournaments_played+=1
    player_ranking.save()


#updates the scores of registered players in a tournament category
def update_ranking_of_registered_players(tournament_category, ranking_list,
                                         grade):

    player_list = tournament_category.player_list.all()
    for player in player_list:
        stage = find_player_position(player, tournament_category)
        ranking = get_player_ranking(player, tournament_category, ranking_list)
        #if player isnt ranked,add him to the list
        if ranking == None:
            rank_category = RankingListCategories.objects.get(
                name=tournament_category.category)
            ranking = RankedPlayers(
                list=ranking_list, category=rank_category, player=player)
            ranking.save()

        update_player_score(ranking, grade, stage)



#goes through all the categories and update the scores of the registered players
def update_ranking_according_to_tournament_records(tournament):

    grade = tournament.grade
    tournament_categories = TournamentCategories.objects.filter(
        tournamet=tournament)
    ranking_list = tournament.ranking_list

    for category in tournament_categories:
        update_ranking_of_registered_players(category, ranking_list, grade)

    update_ranking_list(ranking_list)


# update the ranking of the players of that category in the ranking list
def update_players_ranking(ranking_list, category):

    players_list = RankedPlayers.objects.filter(list=ranking_list).filter(
        category=category).order_by('-points')
    rank = 1
    for player in players_list:
        player.rank = rank
        player.save()
        rank += 1


# update the entire ranking list
def update_ranking_list(ranking_list):
    categories = ranking_list.categories.all()
    for category in categories:
        update_players_ranking(ranking_list, category)


def find_stage_index(match_len):

    return {
        'W':0,
        'F': 1,
        'SF': 2,
        'QF': 3,
        'R16': 4,
        'R32': 5,
        'R64': 6,
    }[match_len]


def obj_dict(obj):
    return obj.__dict__


@api_view(['GET'])
def retrieve_ranking_list(request):
    ranking_list = Ranking_Lists.objects.get(pk=request.GET['list_id'])
    categories = ranking_list.categories.all()
    data = {}
    data["name"]=ranking_list.name
    data["list"]={}
    for category in categories:
        ranked_players = RankedPlayers.objects.filter(
            list=ranking_list).filter(category=category).order_by('rank')
        list = RankedPlayersReaderSerializer(data=ranked_players, many=True)
        list.is_valid()
        data["list"][category.name] = list.data

    return Response(data)


@api_view(['POST'])
def import_ranking_list_from_file(request):

    req_file = request.FILES["ranking_list"]
    list=Ranking_Lists.objects.get(pk=request.data['id'])
    categories=list.categories.all()

    ranked_players=RankedPlayers.objects.filter(list=list)

    if(ranked_players!=None):
        ranked_players.delete()

    for category in categories:
        wb = pd.read_excel(req_file,sheet_name=category.name)
        for i in range (len(wb['rank'])):
            player_name=wb['name'][i]
            if(Players.objects.filter(name=player_name).exists()):
                player=Players.objects.filter(name=player_name)[0]
            else:
                nationality = wb['nationality'][i]
                gender=wb['gender'][i]
                player=Players(name=player_name,nationality=nationality,gender=gender)
                player.save()

            if(pd.isnull(wb['coach_id'][i])==False):
                coach=Coach.objects.get(pk=int(wb['coach_id'][i]))
                coach.player_list.add(player)
                coach.save()

            rank=wb['rank'][i]
            points=wb['points'][i]
            tournaments_played=wb['tournament_played'][i]
            new_ranked_player=RankedPlayers(list=list,player=player,category=category,points=points,rank=rank,tournaments_played=tournaments_played)
            new_ranked_player.save()


    data=RankedPlayers.objects.filter(list=list).order_by('category','rank')
    send_data=RankedPlayersReaderSerializer(data=data,many=True)
    send_data.is_valid()
    return Response(send_data.data)


class List_Category():
    def __init__(self, name, player_list):
        self.name = name
        self.player_list = player_list

    def __str__(self):
        return self.name, self.player_list

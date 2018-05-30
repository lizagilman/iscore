import random

from django.http import HttpResponse
from iscore_app.serializers import MatchesReaderSerializer
from iscore_app.models import Matches, RankedPlayers, RankingListCategories, Ranking_Lists, TournamentCategories, Entries, Tournaments, Players,Score
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def handle_generate_draws(request):

    category_id = request.GET['category_id']
    Generate_Draws(category_id)
    draws = Matches.objects.filter(category=int(category_id)).order_by(
        'match_index')

    serializer = MatchesReaderSerializer(data=draws, many=True)

    serializer.is_valid()

    return Response(serializer.data)


class Player():
    def __init__(self, name, rank, age, gender, nationality):

        self.rank = rank
        self.name = name
        self.age = age
        self.gender = gender
        self.nationality = nationality

    def __str__(self):
        return self.name, self.rank


class Match():
    def __init__(self, player1, player2):

        self.playerA = player1
        self.playerB = player2

    def __str__(self):
        return self.playerA, self.playerB


def match_generate(tournament, category_draw):
    rankedPlayers = RankedPlayers.objects.filter(
        list__organization=tournament.organization).filter(
            list__name=tournament.ranking_list).filter(
                category__name=category_draw.category).order_by('points')

    registered_players = Entries.objects.filter(
        tournament_category=category_draw)

    ranked_registered_players = Entries.objects.filter(
        tournament_category=category_draw).order_by('rank')

    player_list = []
    for player_in_list in ranked_registered_players:
        player_list.append(player_in_list.player)
    tournament = Tournament(player_list)

    tournament.make_draws(category_draw)
    tournament.Orginaize_matches(category_draw)
    return tournament


class Tournament():
    def __init__(self, playerList):
        self.playerList = playerList
        self.placesList = [None] * len(self.playerList)
        self.matchList = []


    def seedPlayer(self, rank, part_size):

        if rank <= 1:
            return 0

        if rank % 2 == 0:
            return part_size // 2 + self.seedPlayer(rank // 2, part_size // 2)

        return self.seedPlayer(rank // 2 + 1, part_size // 2)


    def make_draws(self, draw_table):
        part_size = len(self.playerList)

        num_seeded=int(Entries.objects.filter(tournament_category=draw_table).filter(is_seeded=True).count())

        for i in range(1,num_seeded+1):
            place_index = self.seedPlayer(i, part_size)
            self.placesList[place_index] = self.playerList[i-1]

        for i in range(0,part_size):
            if(self.placesList[i]==None):
                rand=random.randint(num_seeded,len(self.playerList)-1)
                self.placesList[i] = self.playerList[rand]
                del(self.playerList[rand])
        # for i in range(1, part_size + 1):
        #     place_index = self.seedPlayer(i, part_size)
        #     self.placesList[i - 1] = self.playerList[place_index]

        for i in range(0, len(self.placesList), 2):
                match = Match(self.placesList[i], self.placesList[i + 1])
                self.matchList.append(match)
                stage = self.find_stage(len(self.placesList) / 2)
                new_match = Matches(
                    match_index=i,
                    player1=match.playerA,
                    player2=match.playerB,
                    winner=None,
                    stage=stage,
                    time=None,
                    category=draw_table)
                new_match.save()

        counter = len(self.placesList)
        matches_len = len(self.matchList)
        if matches_len % 4 == 0:
                arrayM = []
                self.addEmptyMatches(matches_len // 2, arrayM)
                for k in arrayM:
                    stage = self.find_stage(k)
                    for j in range(int(k)):
                        match = Match(None, None)
                        self.matchList.append(match)
                        new_match = Matches(
                            match_index=counter,
                            player1=match.playerA,
                            player2=match.playerB,
                            winner=None,
                            stage=stage,
                            time=None,
                            category=draw_table)
                        new_match.save()
                        counter += 2
        else:
            print('wrong input')

    def addEmptyMatches(self, matches_len, arrayM):

        if matches_len == 1:
            arrayM.append(matches_len)
            return 0

        arrayM.append(matches_len)
        return self.addEmptyMatches(matches_len / 2, arrayM)

    def find_stage(self, match_len):

        return {
            1: "F",
            2: "SF",
            4: "QF",
            8: "R16",
            16: "R32",
            32: "R64",
        }[match_len]

    def Orginaize_matches(self, category):

        num_players = category.player_list.count() / 2
        while (num_players > 1):
            stage = self.find_stage(num_players)
            current_match_list = Matches.objects.filter(stage=stage).filter(
                category=category.id).order_by('matches__time').distinct()
            num_players = num_players / 2
            next_stage = self.find_stage(num_players)
            next_match_list = Matches.objects.filter(category=category).filter(
                stage=next_stage).order_by('matches__time').distinct()
            index = 0
            index_next = 0
            num_players
            for index in range(0, len(current_match_list), 2):
                current_match_list[index].next_match = next_match_list[
                    index_next]
                current_match_list[index].save()
                current_match_list[index + 1].next_match = next_match_list[
                    index_next]
                current_match_list[index + 1].save()
                index_next += 1


def Generate_Draws(category):
    category = TournamentCategories.objects.get(pk=category)
    tournament_id = category.tournamet.id
    tournamnt_info = Tournaments.objects.get(pk=tournament_id)

    match_generate(tournamnt_info, category)


def Delete_Draws(request):

    tournamnet = request.GET['category_id']
    draw = Matches.objects.filter(category=tournamnet).order_by('-pk')
    for match in draw:
        match.delete()

    return HttpResponse("draws were deleted")


def update_winner(match_id, winner_id):

    ended_match = Matches.objects.get(pk=match_id)
    winner = Players.objects.get(pk=winner_id)
    ended_match.winner = winner

    if (ended_match.next_match == None):
        ended_match.save()
        return
    if ((ended_match.match_index / 2) % 2 == 0):
        ended_match.next_match.player1 = winner
        ended_match.next_match.save()
    else:
        ended_match.next_match.player2 = winner
        ended_match.next_match.save()

    ended_match.save()


def handle_update_winner(request):

    winner_id = request.GET['winner_id']
    if (winner_id == None):
        return HttpResponse("missing winner id")
    match_id = request.GET['match_id']
    if (match_id == None):
        return HttpResponse("missing winner id")
    update_winner(match_id, winner_id)
    return HttpResponse("match: " + match_id + " has updated his winner")

def set_seeded_in_tournament(tournament):

    categories=TournamentCategories.objects.filter(tournamet=tournament)
    for category in categories:
        rankedPlayers = RankedPlayers.objects.filter(list__organization=tournament.organization).filter(
            list__name=tournament.ranking_list).filter(
            category__name=category.category).order_by('points')

        registered_players = Entries.objects.filter(
            tournament_category=category)

        for player in rankedPlayers:
            for registered in registered_players:
                if registered.player.name == player.player.name:
                    registered.rank = player.rank
                    registered.save()

        ranked_registered_players = Entries.objects.filter(
            tournament_category=category).order_by('rank')


        if(ranked_registered_players.count()>category.max_players):
            size=registered_players.count()
            for i in range(size, category.max_players,-1):
                player = ranked_registered_players[i-1]
                player.delete()


            ranked_registered_players = Entries.objects.filter(
                tournament_category=category).order_by('rank')

        if (ranked_registered_players.count() <= 4):
            count_seeded = 1
        else:
            count_seeded = int(ranked_registered_players.count() / 4)

        for i in range(0, count_seeded):
            player=ranked_registered_players[i]
            if (player.rank!=None):
                player.is_seeded=True
                player.save()


def create_score_table(tournament):
    matches=Matches.objects.filter(category__tournamet=tournament)
    for match in matches:
        score=Score(match_id=match)
        score.save()



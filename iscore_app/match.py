from django.http import HttpResponse
import json
from iscore_app.models import Matches, RankedPlayers, RankingListCategories, Ranking_Lists, TournamentCategories, Entries, Tournaments
from django.core import serializers


def handle_generate_draws(request):
    tournament_id = request.GET['tournament_id']
    Generate_Draws(tournament_id)
    draws = Matches.objects.filter(
        draws__tournamet=int(tournament_id)).order_by('-stage',
                                                      'draws__category')
    send_data = serializers.serialize('json', draws)
    return HttpResponse(send_data)


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
    registered_players = Entries.objects.filter(draw_list=category_draw)
    for player in rankedPlayers:
        for registered in registered_players:
            if registered.player.name == player.player.name:
                registered.rank = player.rank
                registered.save()

    ranked_registered_players = Entries.objects.filter(
        draw_list=category_draw).order_by('rank')

    player_list = []
    for player_in_list in ranked_registered_players:
        player_list.append(player_in_list.player)
    tournament = Tournament(player_list)

    tournament.make_draws(category_draw)
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
        if part_size % 8 == 0:

            for i in range(1, part_size + 1):
                place_index = self.seedPlayer(i, part_size)
                self.placesList[i - 1] = self.playerList[place_index]

            for i in range(0, len(self.placesList), 2):
                match = Match(self.placesList[i], self.placesList[i + 1])
                self.matchList.append(match)
                stage = self.find_stage(len(self.placesList) / 2)
                new_match = Matches(
                    index=i,
                    player1=match.playerA,
                    player2=match.playerB,
                    winner=None,
                    stage=stage,
                    time=None,
                    draws=draw_table)
                new_match.save()

            matches_len = len(self.matchList)
            if matches_len % 4 == 0:
                arrayM = []

                self.addEmptyMatches(matches_len // 2, arrayM)
                fill = 0
                for k in arrayM:
                    stage = self.find_stage(k)
                    for j in range(int(k)):
                        match = Match(None, None)
                        self.matchList.append(match)
                        new_match = Matches(
                            index=matches_len + fill,
                            player1=match.playerA,
                            player2=match.playerB,
                            winner=None,
                            stage=stage,
                            time=None,
                            draws=draw_table)
                        new_match.save()
                        fill += 1
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


def Generate_Draws(tournamnet):

    tournamnt_info = Tournaments.objects.get(pk=tournamnet)
    draw_list = TournamentCategories.objects.filter(tournamet=tournamnt_info)
    for category in draw_list:
        match_generate(tournamnt_info, category)

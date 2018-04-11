from django.http import HttpResponse
import json
from iscore_app.models import Matches,Rankings_list_catagories,Catagories,Ranking_Lists

def test1(request):
    tournament = match_generate()
    return HttpResponse(json.dumps(tournament.matchList,default=lambda o: o.__dict__))


class Player():

    def __init__(self, name, rank, age, gender, nationality):
        """Return a Player object whose name is *name* and rank
         is *rank*."""
        self.rank = rank
        self.name = name
        self.age= age
        self.gender=gender
        self.nationality=nationality

    def __str__(self):
        return self.name, self.rank

class Match():

    def __init__(self, player1, player2 ):
        """Return a Player object whose name is *name* and rank
         is *rank*."""
        self.playerA = player1
        self.playerB = player2
    def __str__(self):
        return self.playerA, self.playerB

def match_generate():


    playerList = []
    playerList = Rankings_list_catagories.objects.order_by('points')
    tournament=Tournament(playerList)
    tournament.make_draws()
    return tournament

class Tournament():

    playerList = []
    matchList = []
    placesList = []
    def __init__(self , playerList):
        print('Tournament::__init__')
        self.playerList = playerList
        self.placesList=[None] * len(self.playerList)

    def seedPlayer(self,rank, part_size):

        if rank <= 1:
            return 0

        if rank % 2 == 0:
            return part_size // 2 + self.seedPlayer(rank // 2, part_size // 2)

        return self.seedPlayer(rank // 2 + 1, part_size // 2);

    def make_draws(self):
        print('kuki',len(self.placesList))
        part_size = len(self.playerList)
        if part_size % 8 == 0:

            for i in range(1, part_size+1):
                place_index=self.seedPlayer(i, part_size)
                print('place_index = '+str(place_index))
                self.placesList[i-1]=self.playerList[place_index]
                print(i,place_index )
               # print(json.dumps(self.placesList[i-1],default=lambda o: o.__dict__))

            for i in range(0, len(self.placesList),2):
                match = Match(self.placesList[i], self.placesList[i + 1])
                self.matchList.append(match)

                matches_len = len(self.matchList)
                if matches_len % 8 == 0:
                    matches_to_add=self.addEmptyMatches(matches_len)

                    for j in range(matches_to_add):
                        match = Match('','')
                        self.matchList.append(match)

              #  print ('created match '+json.dumps(match, default=lambda o: o.__dict__))
        else:
            print('wrong input')

    def addEmptyMatches(self,matches_len):

        if matches_len == 1:
            return 0

        return matches_len/2 + self.addEmptyMatches(matches_len/2)

 





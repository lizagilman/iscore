from django.http import HttpResponse
import json

def test1(request):
    tournament = match_generate()
    return HttpResponse(json.dumps(tournament.matchList,default=lambda o: o.__dict__))


class Player():
    """A class that represents a player and have the
    following properties:

    Attributes:
        name: Player's name.
        rank: Player's rank.
    """

    def __init__(self, name, rank):
        """Return a Player object whose name is *name* and rank
         is *rank*."""
        self.name = name
        self.rank = rank
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
    playerList.append(Player('alisa', 1))
    playerList.append(Player('liza', 2))
    playerList.append(Player('michael', 3))
    playerList.append(Player('alon', 4))
    playerList.append(Player('yosi', 5))
    playerList.append(Player('miri', 6))
    playerList.append(Player('moshe', 7))
    playerList.append(Player('ana', 8))

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
                print(json.dumps(self.placesList[i-1],default=lambda o: o.__dict__))
            for i in range(0, len(self.placesList),2):
                match = Match(self.placesList[i], self.placesList[i + 1])
                self.matchList.append(match  )
                print ('created match '+json.dumps(match, default=lambda o: o.__dict__))
        else:
            print('wrong input')

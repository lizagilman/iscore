from django.http import HttpResponse
import datetime
from iscore_app.models import Matches
from django.http import HttpResponse
import json
from iscore_app.models import Matches,Rankings_list_catagories,Catagories,Ranking_Lists

def someFunction(a):
    print("a:", a)


def test1(request):

    s_time = datetime.datetime(2018, 4, 10, 14)
    e_time = datetime.datetime(2018, 4, 15, 20)
    p_list = [["liza", "daniel"], ["mike", "alisa"], ["moti", "nehama"],
              ["avi", "kobi"], ["david", "shlomi"], ["natan", "dana"],
              ["chen", "eli"], ["hadar", "ron"]]
    m_list = schedule_generate(p_list, s_time, 8, 8)
    for match in m_list:
        print(str(match.match) + " time:" + str(match.time))

    return HttpResponse("ok")


class Player():

    def __init__(self, name, rank, age, gender, nationality):
        """Return a Player object whose name is *name* and rank
         is *rank*."""
        self.rank = rank
        self.name = name
        self.age = age
        self.gender = gender
        self.nationality = nationality

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


#"2018","4","10","17",
#match_list,start_date,end_date,num_of_courts
def schedule_generate(match_list, start_date,start_hour,finish_hour, num_of_courts, games_per_day):

    index = 0
    game_duration = 2
    schedule = []
    match_date = start_date
    beginning_hour=9
    finish_hour=finish_hour

    while (index < len(match_list)):
        limit = 0
        while (limit < games_per_day and match_date.hour < finish_hour):
            for i in range(0, num_of_courts):
                if (index + i < len(match_list) and limit < games_per_day):
                    schedule.append(
                        match_time(match_date, match_list[index + i]))
                    limit += 1
            index += min(limit, num_of_courts)
            print(index)
            match_date += datetime.timedelta(hours=game_duration)
        match_date += datetime.timedelta(days=1)
        match_date = match_date.replace(hour=beginning_hour)

    return schedule


class match_time:
    time = datetime.datetime.now()
    match = []

    def __init__(self, time, match):
        self.match = match
        self.time = time


def make_day(match_list):

    print("test")
from django.http import HttpResponse
import datetime
from iscore_app.models import Matches, Draws, Entries
from django.core import serializers



def handle_generate_schedule(request):

    tournament =int(request.GET['tournament_id'])
    t=request.GET['start_date']
    start_date = datetime.datetime.strptime(t,"%d/%m/%Y %H:%M")
    t=request.GET['end_date']
    end_date = datetime.datetime.strptime(t,"%d/%m/%Y %H:%M")
    num_of_courts = int(request.GET['num_of_courts'])
    start_hour = int(request.GET['start_hour'])
    finish_hour = int(request.GET['finish_hour'])
    game_duration = int(request.GET['game_duration'])
    data = generate_schedule(tournament, start_date, end_date, num_of_courts,
                             start_hour, finish_hour, game_duration)

    if (data=="could not compute, too few matches per day"):return HttpResponse(data)
    send_data = serializers.serialize('json', data)
    return HttpResponse(send_data)


def generate_category_schedule(match_list, start_date, start_hour, finish_hour,
                               num_of_courts, games_per_day, game_duration):


    game_duration = game_duration
    match_date = start_date
    beginning_hour = start_hour
    finish_hour = finish_hour
    stage = match_list[0].stage
    limit = 0
    court = 1
    for match in match_list:

        if (limit >= games_per_day or match_date.hour > finish_hour
                or match.stage != stage):  #starting new day
            limit = 0
            court = 1
            match_date += datetime.timedelta(days=1)
            match_date = match_date.replace(hour=beginning_hour)
            if (match.stage != stage):  #case new stage in tournament
                stage = match.stage
        if (court > num_of_courts):  #case all courts are taken for that time
            court = 1
            match_date += datetime.timedelta(hours=game_duration)
        match.time = match_date
        match.court = court
        match.save()
        court += 1

    return match_date


class match_time:
    time = datetime.datetime.now()
    match = []

    def __init__(self, time, match):
        self.match = match
        self.time = time


def generate_schedule(tournament, start_date, end_date, num_of_courts,
                      start_hour, finish_hour, game_duration):

    categories = Draws.objects.filter(pk=tournament)
    tournament_duration = end_date - start_date
    tournament_duration = tournament_duration.total_seconds() / 86400

    #calculate if time needed doesnt excel tournament duration
    number_of_all_matches = len(
        Matches.objects.filter(draws__tournamet=tournament))
    avg_games_per_day = ((
        finish_hour - start_hour) / game_duration) * num_of_courts
    max_players_in_category = 0
    for category in categories:
        max_players_in_category = max(
            max_players_in_category,
            len(Entries.objects.filter(draw_list=category)))

    if ((number_of_all_matches / avg_games_per_day) *
            find_num_stages(max_players_in_category) > tournament_duration):
        return "could not compute, too few matches per day"

    days_for_category = tournament_duration / len(categories)
    time = start_date
    for category in categories:

        matches = Matches.objects.filter(draws__tournamet=tournament).filter(
            draws=category).order_by('pk')
        games_per_day = days_for_category / len(matches)
        time = generate_category_schedule(matches, time, start_hour,
                                          finish_hour, num_of_courts,
                                          games_per_day, game_duration)

    return Matches.objects.filter(draws__tournamet=tournament).order_by(
        'draws__category', 'stage')


def find_num_stages(match_len):

    return {
        1: 1,
        2: 2,
        4: 3,
        8: 4,
        16: 5,
        32: 6,
    }[match_len]
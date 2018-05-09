from django.http import HttpResponse
import datetime
from iscore_app.models import Matches, TournamentCategories, Entries, Tournaments
from django.core import serializers


def handle_generate_schedule(request):

    tournament = int(request.GET['tournament_id'])
    info = Tournaments.objects.get(pk=tournament)
    start_date = info.start_date
    end_date = info.end_date
    num_of_courts = int(request.GET['num_of_courts'])
    start_hour = int(request.GET['start_hour'])
    finish_hour = int(request.GET['finish_hour'])
    game_duration = int(request.GET['game_duration'])
    start_date += datetime.timedelta(hours=start_hour)
    end_date += datetime.timedelta(hours=finish_hour)
    data = generate_schedule_by_stage(tournament, start_date, end_date,
                                      num_of_courts, start_hour, finish_hour,
                                      game_duration)
    #  data = generate_schedule(tournament, start_date, end_date, num_of_courts,
    #                           start_hour, finish_hour, game_duration)

    if (data == "could not compute, too few matches per day"
            or data == "could not compute,draws for a category is missing"):
        return HttpResponse(data, status=400)
    send_data = serializers.serialize('json', data)
    return HttpResponse(send_data)


def create_schedule_for_matches(match_list, start_date, start_hour,
                                finish_hour, num_of_courts, games_per_day,
                                game_duration):

    game_duration = game_duration
    match_date = start_date
    beginning_hour = start_hour
    finish_hour = finish_hour
    stage = match_list[0].stage
    limit = 0
    court = 1
    for match in match_list:
        if (court > num_of_courts):  #case all courts are taken for that time
            court = 1
            match_date += datetime.timedelta(hours=game_duration)
        if ((limit >= games_per_day) or (match_date.hour > finish_hour)
                or (match.stage != stage)):  #starting new day
            limit = 0
            court = 1
            match_date += datetime.timedelta(days=1)
            match_date = match_date.replace(hour=beginning_hour)
            if (match.stage != stage):  #case new stage in tournament
                stage = match.stage
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


def generate_schedule_by_category(tournament, start_date, end_date,
                                  num_of_courts, start_hour, finish_hour,
                                  game_duration):

    categories = TournamentCategories.objects.filter(tournamet=tournament)
    tournament_duration = end_date - start_date
    tournament_duration = tournament_duration.total_seconds() / 86400

    #calculate if time needed doesnt excel tournament duration
    number_of_all_matches = len(
        Matches.objects.filter(category__tournamet=tournament))
    avg_games_per_day = ((
        finish_hour - start_hour) / game_duration) * num_of_courts
    max_players_in_category = 0
    for category in categories:
        max_players_in_category = max(max_players_in_category,
                                      category.player_list.count())
        if (category.player_list.count() == 0):
            return "could not compute,draws for a category is missing"

    if ((number_of_all_matches / avg_games_per_day) *
            find_num_stages(max_players_in_category) > tournament_duration):
        return "could not compute, too few matches per day"

    days_for_category = tournament_duration / len(categories)
    time = start_date
    for category in categories:
        matches = Matches.objects.filter(category=category).order_by('pk')
        games_per_day = days_for_category / len(matches)
        time = create_schedule_for_matches(matches, time, start_hour,
                                           finish_hour, num_of_courts,
                                           games_per_day, game_duration)

    return Matches.objects.filter(category__tournamet=tournament).order_by(
        'category__category', 'stage')


def find_num_stages(match_len):

    return {
        1: 1,
        2: 2,
        4: 3,
        8: 4,
        16: 5,
        32: 6,
    }[match_len]


def delete_schedule(request):
    tournament_id = request.GET['tournament_id']
    draw = Matches.objects.filter(category__tournamet=tournament_id)
    for match in draw:
        match.time = None
        match.save()

    return HttpResponse(status=200)


def generate_schedule_by_stage(tournament, start_date, end_date, num_of_courts,
                               start_hour, finish_hour, game_duration):

    categories = TournamentCategories.objects.filter(tournamet=tournament)
    tournament_duration = end_date - start_date
    tournament_duration = tournament_duration.total_seconds() / 86400
    matches = Matches.objects.filter(category__tournamet=tournament).order_by(
        'match_index', 'stage')
    number_of_all_matches = len(matches)
    games_per_day = ((
        finish_hour - start_hour) / game_duration) * num_of_courts

    #calculate if time needed doesnt excel tournament duration
    max_players_in_category = 0
    for category in categories:
        max_players_in_category = max(max_players_in_category,
                                      category.player_list.count())
        if (category.player_list.count() == 0):
            return "could not compute,draws for a category is missing"

    if (number_of_all_matches / games_per_day > tournament_duration):
        return "could not compute, too few matches per day"

    time = create_schedule_for_matches(matches, start_date, start_hour,
                                       finish_hour, num_of_courts,
                                       games_per_day, game_duration)

    return Matches.objects.filter(category__tournamet=tournament).order_by(
        'category__category', 'stage')

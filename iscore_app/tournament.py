from django.http import HttpResponse
import json
from iscore_app.models import Organizations, Tournament_Managers, Grades, Ranking_Lists, TournamentCategories, Entries, Tournaments
from django.core import serializers
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def create_Tournament(request):

    start_date = end_date = registration_start_date = registration_end_date = organization = ranking_list = grade = None
    is_ranked = False

    name = request.POST.get('name')
    field_of_sport = request.POST.get('field_of_sport')
    if (request.POST.get('is_ranked') == "true"): is_ranked = True
    if (request.POST.get('start_date') != ''):
        start_date = request.POST.get('start_date')
    if (request.POST.get('end_date') != ''):
        end_date = request.POST.get('end_date')
    if (request.POST.get('registration_start_date') != ''):
        registration_start_date = request.POST.get('registration_start_date')
    if (request.POST.get('registration_end_date') != ''):
        registration_end_date = request.POST.get('registration_end_date')
    address = request.POST.get('address')
    if (request.POST.get('organization') != ''):
        organization = Organizations.objects.get(
            pk=request.POST.get('organization'))
    if (request.POST.get('ranking_list') != ''):
        ranking_list = Ranking_Lists.objects.get(
            pk=request.POST.get('ranking_list'))
    if (request.POST.get('grade') != ''):
        grade = Grades.objects.get(pk=request.POST.get('grade'))
    manager = Tournament_Managers.objects.get(pk=request.POST.get('manager'))

    new_tournament = Tournaments(
        name=name,
        field_of_sport=field_of_sport,
        is_ranked=is_ranked,
        start_date=start_date,
        end_date=end_date,
        registration_start_date=registration_start_date,
        registration_end_date=registration_end_date,
        address=address,
        organization=organization,
        ranking_list=ranking_list,
        grade=grade,
        manager=manager,
        status='created')
    new_tournament.save()
    categories = request.POST.getlist('categories')
    for category in categories:
        new_category = TournamentCategories(
            category=str(category), tournamet=new_tournament)
        new_category.save()

    send_data = serializers.serialize('json', [new_tournament])
    return HttpResponse(send_data)

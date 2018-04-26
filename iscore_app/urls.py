from django.conf.urls import url, include
from rest_framework import routers
from iscore_app.views import IndexView
from iscore_app import views, draws, schedule

router = routers.DefaultRouter()
router.register(r'RankingListCategories', views.CatagoriesViewSet)
router.register(r'Players', views.PlayersViewSet)
router.register(r'MoneyDistributionMethods',
                views.MoneyDistributionMethodsViewSet)
router.register(r'PointsDistributionMethods',
                views.PointsDistributionMethodsViewSet)
router.register(
    r'ModifyGrades', views.GradesViewSet, base_name='Modify Grades')
router.register(r'Grades', views.GradesReaderViewSet)

router.register(
    r'ModifyRankingLists',
    views.RankingListsViewSet,
    base_name='Modify Ranking Lists')
router.register(r'RankingLists', views.RankingListsReaderViewSet)

router.register(
    r'ModifyRankedPlayers',
    views.RankedPlayersViewSet,
    base_name='Modify Ranked Players')
router.register(r'RankedPlayers', views.RankedPlayersReaderViewSet)

router.register(
    r'ModifyOrganizations',
    views.OrganizationsViewSet,
    base_name='Modify Organization')
router.register(r'Organizations', views.OrganizationsReaderViewSet)

router.register(
    r'ModifyTournaments',
    views.TournamentsViewSet,
    base_name='Modify Tournaments')
router.register(r'Tournaments', views.TournamentsReaderViewSet)

router.register(
    r'ModifyMatches', views.MatchesViewSet, base_name='Modify Matches')

router.register(r'Matches', views.MatchesReaderViewSet)

router.register(r'TournamentCategories',
                views.TournamentCategoriesReaderViewSet)
router.register(
    r'ModifyTournamentCategories',
    views.TournamentCategoriesViewSet,
    base_name='Modify Tournament Categories')

router.register(r'Sets', views.SetsViewSet)

router.register(r'Games', views.GamesViewSet)

router.register(r'Entries', views.EntriesReaderViewSet)

router.register(
    r'ModifyEntries', views.EntriesViewSet, base_name='Modify entries')
router.register(r'TournamentManagers', views.TournamentManagersReaderViewSet)
router.register(
    r'ModifyTournamentManagers',
    views.TournamentManagersViewSet,
    base_name='Modify Tournament Managers')

router.register(r'Coachs', views.CoachsReaderViewSet)
router.register(
    r'ModifyCoachs', views.CoachsViewSet, base_name='Modify Coachs')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(r'^generate_draws/',
        draws.handle_generate_draws,
        name='generate_draws'),
    url(r'^generate_schedule/',
        schedule.handle_generate_schedule,
        name='generate_schedule'),
    url(r'', IndexView.as_view(), name='index'),
]

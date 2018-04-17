from django.conf.urls import url, include
from rest_framework import routers
from iscore_app.views import IndexView
from iscore_app import views,match,utils


router = routers.DefaultRouter()
router.register(r'catagories', views.CatagoriesViewSet)
router.register(r'players', views.PlayersViewSet)
router.register(r'MoneyDistributionMethods',
                views.MoneyDistributionMethodsViewSet)
router.register(r'PointsDistributionMethods',
                views.PointsDistributionMethodsViewSet)
router.register(
    r'ModifyGrades', views.GradesViewSet, base_name='Modify grades')
router.register(r'Grades', views.GradesReaderViewSet)
router.register(r'RankingLists', views.RankingListsViewSet)
router.register(r'Rankingslistcatagories', views.RankingslistcatagoriesViewSet)
router.register(r'Organizations', views.OrganizationsViewSet)
router.register(r'Tournaments', views.TournamentsViewSet)
router.register(r'ModifyMatches', views.MatchesViewSet)
router.register(r'Matches', views.MatchesReaderViewSet)
router.register(r'Draws', views.DrawsViewSet)
router.register(r'Sets', views.SetsViewSet)
router.register(r'Games', views.GamesViewSet)
router.register(r'Entries', views.EntriesViewSet)
router.register(r'TournamentManagers', views.TournamentManagersReaderViewSet)
router.register(
    r'ModifyTournamentManagers',
    views.TournamentManagersViewSet,
    base_name='Modify Tournament Managers')
router.register(r'Coachs', views.CoachsViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(r'^generate_draws/',
        match.handle_generate_draws,
        name='generate_draws'),
    url(r'', IndexView.as_view(), name='index'),
]


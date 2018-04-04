from django.conf.urls import url, include
from rest_framework import routers
from iscore_app.views import IndexView
from iscore_app import views

router = routers.DefaultRouter()
router.register(r'catagories', views.CatagoriesViewSet)
router.register(r'players', views.PlayersViewSet)
router.register(r'MoneyDistributionMethods',
                views.MoneyDistributionMethodsViewSet)
router.register(r'PointsDistributionMethods',
                views.PointsDistributionMethodsViewSet)
router.register(r'ModifyGrades', views.GradesViewSet,base_name='Modify grades')
router.register(r'Grades', views.GradesReaderViewSet)
router.register(r'RankingLists', views.RankingListsViewSet)
router.register(r'Rankingslistcatagories', views.RankingslistcatagoriesViewSet)
router.register(r'Organizations', views.OrganizationsViewSet)
router.register(r'Tournaments', views.TournamentsViewSet)
router.register(r'Matches', views.MatchesViewSet)
router.register(r'Draws', views.DrawsViewSet)
router.register(r'TournamentManagers', views.TournamentManagersViewSet)
router.register(r'Coachs', views.CoachsViewSet)
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(r'', IndexView.as_view(), name='index'),
]

from django.conf.urls import url,include
from rest_framework import routers
from iscore_app.views import IndexView
from iscore_app import views
from iscore_app import utils
from iscore_app import match

router = routers.DefaultRouter()
router.register(r'catagories', views.CatagoriesViewSet)
router.register(r'players', views.PlayersViewSet)
urlpatterns = [
    url(r'^api', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
   # url(r'', IndexView.as_view(), name='index'),
    url(r'', match.test1, name='test'),
]
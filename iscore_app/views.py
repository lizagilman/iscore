from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Catagories, Players
from .serializers import CatagoriesSerializer, PlayersSerializer


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class CatagoriesViewSet(viewsets.ModelViewSet):

    queryset = Catagories.objects.all()
    serializer_class = CatagoriesSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name']


class PlayersViewSet(viewsets.ModelViewSet):

    queryset = Players.objects.all()
    serializer_class = PlayersSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['name', 'age', 'nationality', 'gender']


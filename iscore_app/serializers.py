from iscore_app.models import Catagories,Players,Money_Distribution_Methods,Points_Distribution_Methods
from rest_framework import serializers

class CatagoriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model= Catagories
        fields=['id','name']

class PlayersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model= Players
        fields=('name','age','gender','nationality')

class MoneyDistributionMethodsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model= Money_Distribution_Methods
        fields=('name','distribution')


class PointsDistributionMethodsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Points_Distribution_Methods
        fields = ('name', 'distribution')

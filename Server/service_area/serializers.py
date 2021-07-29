from rest_framework import serializers
from .models import ServiceArea

class ServiceAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceArea
        fields = '__all__'

    def to_representation(self, instance):
        representation = super(ServiceAreaSerializer, self).to_representation(instance)
        representation['provider'] = instance.provider.last_name.upper() + ', ' + instance.provider.first_name.upper()
        return representation
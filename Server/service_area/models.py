from django.db import models
from provider.models import Provider
# Create your models here.

class ServiceArea(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    polygon = models.CharField(max_length=100, default='Polygon Mozio')
    longitude = models.CharField(max_length=250, default=0)
    latitude = models.CharField(max_length=250, default=0)
    price = models.IntegerField(default=0)
    currency = models.CharField(max_length=10, default='Php')

    def __str__(self):
        return self.provider.last_name + ', ' + self.provider.first_name
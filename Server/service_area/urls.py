from django.urls import path
from . import views

app_name = 'service_area'

urlpatterns = [
    path('create/', views.create_service_area, name='create_service_area'),
    path('delete/', views.delete_service_area, name='delete_service_area'),
    path('update/', views.update_service_area, name='update_service_area')
]

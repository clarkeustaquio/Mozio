from . import views
from django.urls import path
from .authentication import CustomAuthToken

app_name = 'provider'

urlpatterns = [
    path('create-provider/', views.create_provider, name='create_provider'),
    path('login-provider/', CustomAuthToken.as_view(), name='login_provider'),
    path('authorize-provider/', views.authorize_provider, name='authorize_provider'),
    path('logout-provider/', views.logout_provider, name='logout_provider'),
    path('get-providers/', views.get_providers, name='get_providers'),
    path('delete-provider/', views.delete_provider, name='delete_provider'),
    path('update-provider/', views.update_provider, name='update_provider')
]

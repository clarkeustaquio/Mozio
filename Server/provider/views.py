# DRF
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

# Model
from .models import Provider
from .serializers import ProviderSerializer

from service_area.models import ServiceArea
from service_area.serializers import ServiceAreaSerializer

@api_view(['POST'])
def create_provider(request):   
    serializer = ProviderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def authorize_provider(request):
    services = ServiceArea.objects.all()
    serializer = ServiceAreaSerializer(services, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_provider(request):
    Token.objects.get(user=request.user).delete()
    return Response({ 'status': 'OK' }, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_providers(request):
    username = request.user.username
    providers = Provider.objects.filter(is_staff=False).exclude(username=username)
    serializer = ProviderSerializer(providers, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_provider(request):
    username = request.user.username

    Provider.objects.get(id=request.data['id']).delete()
    providers = Provider.objects.filter(is_staff=False).exclude(username=username)
    serializer = ProviderSerializer(providers, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_provider(request):
    username = request.user.username

    provider = Provider.objects.filter(id=request.data['id'])

    last_name = request.data['last_name']
    first_name = request.data['first_name']
    username = request.data['username']
    phone_number = request.data['phone_number']
    language = request.data['language']
    currency = request.data['currency']

    provider.update(
        last_name=last_name,
        first_name=first_name,
        username=username,
        email=username,
        phone_number=phone_number,
        language=language,
        currency=currency
    )

    providers = Provider.objects.filter(is_staff=False).exclude(username=username)
    serializer = ProviderSerializer(providers, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
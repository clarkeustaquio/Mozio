
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from provider.models import Provider
from .models import ServiceArea
from .serializers import ServiceAreaSerializer

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_service_area(request):
    username = request.user.username

    try:
        user = Provider.objects.get(username=username)
    except Provider.DoesNotExist:
        return Response({
            'status': 'Provide Does Not Exist.'
        })
    try:
        datas = request.data['data']
    except KeyError:
        return Response({
            'data': 'This field is required.'
        })

    try:
        polygon = request.data['polygon']
    except KeyError:
        return Response({
            'polygon': 'This field is required.'
        })

    try:
        price = request.data['price']
    except KeyError:
        return Response({
            'price': 'This field is required.'
        })

    for data in datas:
        ServiceArea.objects.create(
            provider=user,
            polygon=polygon,
            price=price,
            longitude=data['lng'],
            latitude=data['lat']
        )

    services = ServiceArea.objects.all()
    serializer = ServiceAreaSerializer(services, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_service_area(request):
    ServiceArea.objects.get(id=request.data['id']).delete()
    service_areas = ServiceArea.objects.all()
    serializer = ServiceAreaSerializer(service_areas, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_service_area(request):
    username = request.user.id
    service_area = ServiceArea.objects.get(id=request.data['id'])
    request.data['provider'] = username
    serializer = ServiceAreaSerializer(service_area, data=request.data)

    if serializer.is_valid():
        serializer.save()

        service_areas = ServiceArea.objects.all()
        service_serializer = ServiceAreaSerializer(service_areas, many=True)

        return Response(service_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from rest_framework import viewsets
from .serializers import ProductSerializer
from core.models import Products

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()

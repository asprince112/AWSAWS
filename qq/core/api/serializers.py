from rest_framework import serializers
from core.models import Products, UserProfile, ItemOrdered
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOrdered
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
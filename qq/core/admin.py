from django.contrib import admin
from .models import Products, UserProfile, ItemOrdered

admin.site.register(Products)
admin.site.register(UserProfile)
admin.site.register(ItemOrdered)
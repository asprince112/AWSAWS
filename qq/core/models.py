from django.db import models

STATUS_CHOICES = (
    ('available', 'A'),
    ('unavailable', 'U')
)

USER_TYPES = (
    ('user', 'User'),
    ('manager', 'Manager')
)

class Products(models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    tags = models.CharField(max_length=200)
    price = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    username = models.CharField(max_length=120)
    nickname = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    usertype = models.CharField(max_length=20, choices=USER_TYPES, default="User")

    def __str__(self):
        return self.username


class ItemOrdered(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    item = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.name}"

    def get_total_item_price(self):
        return self.quantity * self.item.price
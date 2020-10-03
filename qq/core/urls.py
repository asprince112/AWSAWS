from django.urls import path, include
from .views import UserInfoView, CartUpdateView, GetCartInfo, CreateUserView, GetCartNum

app_name = 'core'

urlpatterns = [
    path('user-info/', UserInfoView.as_view()),
    path('cart-info-update/', CartUpdateView.as_view()),
    path('get-cart-info/', GetCartInfo.as_view()), 
    path('create-user/', CreateUserView.as_view()),
    path('get-car-num/', GetCartNum.as_view())
]
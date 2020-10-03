from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.authtoken.models import Token
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from .api.serializers import UserProfileSerializer, OrderSerializer
from .models import Products, UserProfile, ItemOrdered

def get_user(token):
    find_user = Token.objects.get(key=token).user
    find_user_id = User.objects.get(username=find_user)
    get_user_info = UserProfile.objects.get(username=find_user_id)
    return get_user_info

class UserInfoView(APIView):
    def post(self, request, *args, **kwargs):
        if request.data.get('actionType') == 'getUser':
            if request.data.get('token'):
                token = request.data.get('token')
                data = get_user(token)
                serializer = UserProfileSerializer(data)
                return JsonResponse(serializer.data, status=HTTP_200_OK)
            else:
                # Not logged in
                return Response({"content": "please log in"}, status=200)
        else:
            return JsonResponse({'err': "Something wrong, please try again"}, status=400)

class CreateUserView(APIView):
    def post(self, request, *args, **kwargs):
        if request.data.get('username') and request.data.get('nickname') and request.data.get('email'):
            username = request.data.get('username')
            nickname = request.data.get('nickname')
            email = request.data.get('email')
            
            new_user = UserProfile(
                username = username,
                nickname = nickname,
                email = email
            )
            new_user.save()
            return HttpResponse(status=201)

        else:
            return JsonResponse({'err': "Something wrong, please try again"}, status=400)


class CartUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        if request.data.get('actionType') == 'addToCart':
            token = request.data.get('token')
            item_id = request.data.get('id')
            user = get_user(token)
            item_qs = ItemOrdered.objects.filter(user=user, item=int(item_id))
            
            if item_qs.exists():
                add_item = item_qs[0]
                add_item.quantity += 1
                add_item.save()
            else:
                ItemOrdered.objects.create(
                    user = user,
                    item = Products.objects.get(id=item_id)
                )
            return HttpResponse(status=HTTP_200_OK)
        
        elif request.data.get('actionType') == 'deleteFromCart':
            token = request.data.get('token')
            item_id = request.data.get('id')
            user = get_user(token)
            item_qs = ItemOrdered.objects.filter(user=user, item=int(item_id))

            if item_qs.exists():
                add_item = item_qs[0]
                add_item.delete()
                return HttpResponse(status=HTTP_200_OK)
            
            else:
                return JsonResponse({'err': "You do not have this item in cart"}, status=200)
        
        elif request.data.get('actionType') == 'updateQuantity':
            token = request.data.get('token')
            item_id = request.data.get('id')
            item_quantity = request.data.get('quantity')
            user = get_user(token)
            item_qs = ItemOrdered.objects.filter(user=user, item=int(item_id))

            if item_qs.exists():
                add_item = item_qs[0]
                add_item.quantity = item_quantity
                add_item.save()
                return HttpResponse(status=HTTP_200_OK)
            
            else:
                return JsonResponse({'err': "You do not have this item in cart"}, status=200)



class GetCartInfo(APIView):
    def post(self, request, *args, **kwargs):
        if request.data.get('actionType') == 'getCartInfo':
            token = request.data.get('token')
            user = get_user(token)
            cart = ItemOrdered.objects.filter(user=user)
            serializer = OrderSerializer(cart, many=True)

            for item in serializer.data:
                item.pop("user")
                product = Products.objects.get(id=int(item["item"]))
                item["id"] = product.id
                item["name"] = product.name
                item["image"] = product.image
                item["price"] = product.price

            return Response(serializer.data, status=HTTP_200_OK)
        else:
            return JsonResponse({'err': "Something wrong, please try again"}, status=400)

class GetCartNum(APIView):
    def post(self, request, *args, **kwargs):
        if request.data.get('actionType') == 'getCartNum':
            if request.data.get('token'):
                token = request.data.get('token')
                user = get_user(token)
                cart = ItemOrdered.objects.filter(user=user)
                serializer = OrderSerializer(cart, many=True)

                cart_amount = 0
                for item in serializer.data:
                    cart_amount += int(item['quantity'])
                
                return Response({"amount": cart_amount}, status=HTTP_200_OK)
            else:
                return Response({'amount': 0}, status=HTTP_200_OK)
from django.db import IntegrityError
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Student


class Detail(APIView):
    '''
    get user infomation
    '''
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        user = User.objects.get(username=request.user)

        return Response({
            "username": user.username,
            "faculty": user.student.faculty,
        })


class SignUp(APIView):
    permission_classes = [BasePermission]

    def post(self, request: Request):

        # {"username": "", "password": "123", "faculty": "IT"}

        try:
            user = User.objects.create_user(
                username=request.data["username"], password=request.data["password"])
            student = Student(user=user, faculty=request.data["faculty"])
            student.save()
            return Response(status=201)  # created

        except (ValueError, KeyError):
            return Response(status=400)  # bad request

        except IntegrityError:  # username already exists
            return Response(status=409)  # conflict


class ChangeInfo(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request: Request):

        user = User.objects.get(username=request.user)

        # {"password":"333"}
        # {"faculty":"CS"}

        # only modified allowed attribute
        if "password" in request.data:
            user.set_password(request.data["password"])

        if "faculty" in request.data:
            print("aa")
            user.student.faculty = request.data["faculty"]

        user.save()
        user.student.save()

        return Response(status=204)  # no content


class LogIn(APIView):
    permission_classes = [BasePermission]

    def post(self, request: Request):

        # {"username":"saw", "password":"456"}

        try:
            user = authenticate(
                request, username=request.data["username"], password=request.data["password"])

            if user is not None:
                login(request, user)
                return Response("OK", 200)
            else:
                return Response(status=401)  # denied

        except KeyError:
            return Response(status=400)  # bad request


class LogOut(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        logout(request)

        return Response(status=204)  # no content

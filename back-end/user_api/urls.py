from django.urls import path
from . import views

app_name = "user-api"
urlpatterns = [
    path("detail", views.Detail.as_view(), name="detail"),
    path("signup", views.SignUp.as_view(), name="signup"),
    path("login", views.LogIn.as_view(), name="login"),
    path("logout", views.LogOut.as_view(), name="logout"),
    path("changeinfo", views.ChangeInfo.as_view(), name="changeinfo"),
]

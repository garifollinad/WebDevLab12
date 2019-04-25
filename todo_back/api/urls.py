from django.urls import path
from api import views

urlpatterns = [
    path('tasklists', views.TaskListCBV.as_view()),
    path('tasklists/<int:pk>', views.TaskListDetailCBV.as_view()),
    path('tasklists/<int:pk>/tasks', views.TaskListIdTasksCBV.as_view()),
    path('tasks/<int:pk>', views.TaskCBV.as_view())
]
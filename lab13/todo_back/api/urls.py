from django.urls import path
from .views import show_current_taskList, show_taskLists, show_tasks, login, logout, TaskCBV, TaskListIdTasksCBV, Tasks

urlpatterns = [
    path('task_lists/', show_taskLists),
    path('task_lists/<int:pk>/', show_current_taskList),
    path('task_lists/<int:pk>/tasks/', TaskListIdTasksCBV.as_view()),
    path('tasks/', Tasks.as_view()),
    path('tasks/<int:pk>/', TaskCBV.as_view()),
    path('login/', login),
    path('logout/', logout),
]
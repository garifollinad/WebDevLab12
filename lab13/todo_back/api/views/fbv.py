from ..models import TaskList, Task
from ..serializer import TaskListSerializer, TaskSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status



# Create your views here.
@api_view(['GET', 'POST'])
def show_taskLists(request):
    if request.method == 'GET':
        taskLists = TaskList.objects.all()
        serializer = TaskListSerializer(taskLists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = TaskListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST'])
def show_tasks(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
def show_current_taskList(request, pk):
    try:
        taskList = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TaskListSerializer(taskList)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TaskListSerializer(instance=taskList, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        taskList.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

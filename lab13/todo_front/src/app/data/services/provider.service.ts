import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {ITaskList, ITaskShort, ITask, IAuthResponse} from '../model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }
  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {
    });
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get('http://localhost:8000/api/task_lists/', {});
  }

  createTaskList(name: String): Promise<ITaskList> {
    return this.post('http://localhost:8000/api/task_lists/', {
      name: name
    });
  }

  ///////////////////////////////////////////////////////////////////////////

  getTaskListDetail(id: number): Promise<ITaskList> {
    return this.get(`http://localhost:8000/api/task_lists/${id}/`, {});
  }

  updateTaskListDetail(tasklist: ITaskList) {
    return this.put(`http://localhost:8000/api/task_lists/${tasklist.id}/`, {
      name: tasklist.name
    });
  }

  removeTaskListDetail(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/task_lists/${id}/`, {});
  }

  ///////////////////////////////////////////////////////////////////////////

  getTaskListTasks(id: number): Promise<ITaskShort[]> {
    return this.get(`http://localhost:8000/api/task_lists/${id}/tasks/`, {});
  }

  createTaskListTask(taskListId: number, name: string, due_on: string, status: string): Promise<ITask> {
    return this.post(`http://127.0.0.1:8000/api/task_lists/${taskListId}/tasks/`, {
      name: name,
      due_on: due_on,
      status: status
    });
  }

  ///////////////////////////////////////////////////////////////////////////

  getTaskDetail(id: number): Promise<ITask> {
    return this.get(`http://localhost:8000/api/tasks/${id}/`, {});
  }

  updateTask(task: ITask): Promise<ITask> {
    return this.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      name: task.name,
      due_on: task.due_on,
      status: task.status
    });
  }

  deleteTask(id: number): Promise<any> {
    return this.delet(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }
}

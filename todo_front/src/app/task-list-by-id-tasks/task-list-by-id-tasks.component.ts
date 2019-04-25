import {Component, OnInit} from '@angular/core';
import {ProviderService} from '../data/services/provider.service';
import {ITask, ITaskShort, ITaskList} from '../data/model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-task-list-by-id-tasks',
  templateUrl: './task-list-by-id-tasks.component.html',
  styleUrls: ['./task-list-by-id-tasks.component.css']
})
export class TaskListByIdTasksComponent implements OnInit {

  public tasks: ITaskShort[] = [];
  public taskList: any = {};
  public taskName: string = '';
  public taskDueOn: any = new Date().toISOString();
  public taskStatus: string = '';
  public id: number;

  constructor(
    private provider: ProviderService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('pk'));
    if (this.id) {
      this.provider.getTaskListTasks(this.id).then(res => {
        this.tasks = res;
      });
      this.provider.getTaskListDetail(this.id).then(res => {
        this.taskList = res;
      });
    }
  }

  navigateBack() {
    this.location.back();
  }

  createTask() {
    if (this.taskName != '' && this.taskDueOn != '' && this.taskStatus != '') {
      this.provider.createTaskListTask(this.taskList.id, this.taskName, this.taskDueOn, this.taskStatus).then(res => {
        this.tasks.push(res);
        this.taskDueOn = '';
        this.taskName = '';
        this.taskStatus = '';
      });
    }
  }

}

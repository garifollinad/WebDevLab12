import {Component, OnInit} from '@angular/core';
import {ProviderService} from '../data/services/provider.service';
import {ITaskList} from '../data/model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskLists: ITaskList[] = [];
  public taskListName: string = "";

  constructor(
    private provider: ProviderService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.taskLists = res;
    });
  }

  navigateBack() {
    this.location.back();
  }

  createTaskList() {
    if (this.taskListName != '') {
      this.provider.createTaskList(this.taskListName).then(res => {
        this.taskLists.push(res);
        this.taskListName = "";
      })
    }
  }

}

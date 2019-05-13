import {Component, OnInit} from '@angular/core';
import {ProviderService} from '../data/services/provider.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tasks-by-id',
  templateUrl: './tasks-by-id.component.html',
  styleUrls: ['./tasks-by-id.component.css']
})
export class TasksByIdComponent implements OnInit {

  public id = 0;

  public task: any = {};
  public logged = true;

  constructor(
    private provider: ProviderService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('pk'), null);

    if (this.id) {
      this.provider.getTaskDetail(this.id).then(res => {
        this.task = res;
        this.logged = true;
      });
    }
  }

  navigateBack() {
    this.location.back();
    this.logged = true;
  }

  updateTask() {
    this.provider.updateTask(this.task).then(res => {
      this.task = res;
      this.logged = true;
    });
  }

  deleteTask() {
    this.provider.deleteTask(this.task.id).then(() => {
      this.location.back();
      this.logged = true;
    });
  }

}

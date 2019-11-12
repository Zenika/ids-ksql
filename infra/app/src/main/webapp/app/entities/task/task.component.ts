import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'jhi-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks: ITask[];
  eventSubscriber: Subscription;

  constructor(protected taskService: TaskService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.taskService.query().subscribe((res: HttpResponse<ITask[]>) => {
      this.tasks = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTasks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITask) {
    return item.id;
  }

  registerChangeInTasks() {
    this.eventSubscriber = this.eventManager.subscribe('taskListModification', () => this.loadAll());
  }
}

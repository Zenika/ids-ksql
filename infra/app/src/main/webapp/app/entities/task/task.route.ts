import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './task-detail.component';
import { TaskUpdateComponent } from './task-update.component';
import { TaskDeletePopupComponent } from './task-delete-dialog.component';
import { ITask } from 'app/shared/model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskResolve implements Resolve<ITask> {
  constructor(private service: TaskService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITask> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((task: HttpResponse<Task>) => task.body));
    }
    return of(new Task());
  }
}

export const taskRoute: Routes = [
  {
    path: '',
    component: TaskComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tasks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TaskDetailComponent,
    resolve: {
      task: TaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tasks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TaskUpdateComponent,
    resolve: {
      task: TaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tasks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TaskUpdateComponent,
    resolve: {
      task: TaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tasks'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const taskPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TaskDeletePopupComponent,
    resolve: {
      task: TaskResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tasks'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

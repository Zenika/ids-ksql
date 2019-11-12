import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobHistory } from 'app/shared/model/job-history.model';
import { JobHistoryService } from './job-history.service';
import { JobHistoryComponent } from './job-history.component';
import { JobHistoryDetailComponent } from './job-history-detail.component';
import { JobHistoryUpdateComponent } from './job-history-update.component';
import { JobHistoryDeletePopupComponent } from './job-history-delete-dialog.component';
import { IJobHistory } from 'app/shared/model/job-history.model';

@Injectable({ providedIn: 'root' })
export class JobHistoryResolve implements Resolve<IJobHistory> {
  constructor(private service: JobHistoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobHistory> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((jobHistory: HttpResponse<JobHistory>) => jobHistory.body));
    }
    return of(new JobHistory());
  }
}

export const jobHistoryRoute: Routes = [
  {
    path: '',
    component: JobHistoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobHistoryDetailComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobHistoryUpdateComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobHistoryUpdateComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const jobHistoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: JobHistoryDeletePopupComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

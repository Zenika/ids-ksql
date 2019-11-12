import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';
import { DepartmentComponent } from './department.component';
import { DepartmentDetailComponent } from './department-detail.component';
import { DepartmentUpdateComponent } from './department-update.component';
import { DepartmentDeletePopupComponent } from './department-delete-dialog.component';
import { IDepartment } from 'app/shared/model/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentResolve implements Resolve<IDepartment> {
  constructor(private service: DepartmentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartment> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((department: HttpResponse<Department>) => department.body));
    }
    return of(new Department());
  }
}

export const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Departments'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DepartmentDetailComponent,
    resolve: {
      department: DepartmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Departments'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepartmentUpdateComponent,
    resolve: {
      department: DepartmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Departments'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepartmentUpdateComponent,
    resolve: {
      department: DepartmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Departments'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const departmentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DepartmentDeletePopupComponent,
    resolve: {
      department: DepartmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Departments'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

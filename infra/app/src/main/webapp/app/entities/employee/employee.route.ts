import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'app/shared/model/employee.model';
import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeUpdateComponent } from './employee-update.component';
import { EmployeeDeletePopupComponent } from './employee-delete-dialog.component';
import { IEmployee } from 'app/shared/model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeResolve implements Resolve<IEmployee> {
  constructor(private service: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployee> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((employee: HttpResponse<Employee>) => employee.body));
    }
    return of(new Employee());
  }
}

export const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Employees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeeDetailComponent,
    resolve: {
      employee: EmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Employees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeUpdateComponent,
    resolve: {
      employee: EmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Employees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeeUpdateComponent,
    resolve: {
      employee: EmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Employees'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const employeePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EmployeeDeletePopupComponent,
    resolve: {
      employee: EmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Employees'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

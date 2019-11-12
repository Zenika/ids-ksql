import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared/shared.module';
import { DepartmentComponent } from './department.component';
import { DepartmentDetailComponent } from './department-detail.component';
import { DepartmentUpdateComponent } from './department-update.component';
import { DepartmentDeletePopupComponent, DepartmentDeleteDialogComponent } from './department-delete-dialog.component';
import { departmentRoute, departmentPopupRoute } from './department.route';

const ENTITY_STATES = [...departmentRoute, ...departmentPopupRoute];

@NgModule({
  imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DepartmentComponent,
    DepartmentDetailComponent,
    DepartmentUpdateComponent,
    DepartmentDeleteDialogComponent,
    DepartmentDeletePopupComponent
  ],
  entryComponents: [DepartmentDeleteDialogComponent]
})
export class AppDepartmentModule {}

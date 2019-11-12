import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared/shared.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeUpdateComponent } from './employee-update.component';
import { EmployeeDeletePopupComponent, EmployeeDeleteDialogComponent } from './employee-delete-dialog.component';
import { employeeRoute, employeePopupRoute } from './employee.route';

const ENTITY_STATES = [...employeeRoute, ...employeePopupRoute];

@NgModule({
  imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeUpdateComponent,
    EmployeeDeleteDialogComponent,
    EmployeeDeletePopupComponent
  ],
  entryComponents: [EmployeeDeleteDialogComponent]
})
export class AppEmployeeModule {}

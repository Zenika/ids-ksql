import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared/shared.module';
import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './task-detail.component';
import { TaskUpdateComponent } from './task-update.component';
import { TaskDeletePopupComponent, TaskDeleteDialogComponent } from './task-delete-dialog.component';
import { taskRoute, taskPopupRoute } from './task.route';

const ENTITY_STATES = [...taskRoute, ...taskPopupRoute];

@NgModule({
  imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TaskComponent, TaskDetailComponent, TaskUpdateComponent, TaskDeleteDialogComponent, TaskDeletePopupComponent],
  entryComponents: [TaskDeleteDialogComponent]
})
export class AppTaskModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared/shared.module';
import { LocationComponent } from './location.component';
import { LocationDetailComponent } from './location-detail.component';
import { LocationUpdateComponent } from './location-update.component';
import { LocationDeletePopupComponent, LocationDeleteDialogComponent } from './location-delete-dialog.component';
import { locationRoute, locationPopupRoute } from './location.route';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
  imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LocationComponent,
    LocationDetailComponent,
    LocationUpdateComponent,
    LocationDeleteDialogComponent,
    LocationDeletePopupComponent
  ],
  entryComponents: [LocationDeleteDialogComponent]
})
export class AppLocationModule {}

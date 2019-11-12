import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from 'app/shared/model/location.model';
import { LocationService } from './location.service';
import { LocationComponent } from './location.component';
import { LocationDetailComponent } from './location-detail.component';
import { LocationUpdateComponent } from './location-update.component';
import { LocationDeletePopupComponent } from './location-delete-dialog.component';
import { ILocation } from 'app/shared/model/location.model';

@Injectable({ providedIn: 'root' })
export class LocationResolve implements Resolve<ILocation> {
  constructor(private service: LocationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((location: HttpResponse<Location>) => location.body));
    }
    return of(new Location());
  }
}

export const locationRoute: Routes = [
  {
    path: '',
    component: LocationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Locations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LocationDetailComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Locations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LocationUpdateComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Locations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LocationUpdateComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Locations'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const locationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LocationDeletePopupComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Locations'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

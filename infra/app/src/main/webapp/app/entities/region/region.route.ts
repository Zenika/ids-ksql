import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Region } from 'app/shared/model/region.model';
import { RegionService } from './region.service';
import { RegionComponent } from './region.component';
import { RegionDetailComponent } from './region-detail.component';
import { RegionUpdateComponent } from './region-update.component';
import { RegionDeletePopupComponent } from './region-delete-dialog.component';
import { IRegion } from 'app/shared/model/region.model';

@Injectable({ providedIn: 'root' })
export class RegionResolve implements Resolve<IRegion> {
  constructor(private service: RegionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((region: HttpResponse<Region>) => region.body));
    }
    return of(new Region());
  }
}

export const regionRoute: Routes = [
  {
    path: '',
    component: RegionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RegionDetailComponent,
    resolve: {
      region: RegionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RegionUpdateComponent,
    resolve: {
      region: RegionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RegionUpdateComponent,
    resolve: {
      region: RegionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const regionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RegionDeletePopupComponent,
    resolve: {
      region: RegionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

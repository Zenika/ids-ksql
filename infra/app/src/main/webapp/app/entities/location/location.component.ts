import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from './location.service';

@Component({
  selector: 'jhi-location',
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit, OnDestroy {
  locations: ILocation[];
  eventSubscriber: Subscription;

  constructor(protected locationService: LocationService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.locationService.query().subscribe((res: HttpResponse<ILocation[]>) => {
      this.locations = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILocation) {
    return item.id;
  }

  registerChangeInLocations() {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.loadAll());
  }
}

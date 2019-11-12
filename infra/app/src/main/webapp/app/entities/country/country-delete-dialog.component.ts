import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from './country.service';

@Component({
  selector: 'jhi-country-delete-dialog',
  templateUrl: './country-delete-dialog.component.html'
})
export class CountryDeleteDialogComponent {
  country: ICountry;

  constructor(protected countryService: CountryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.countryService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'countryListModification',
        content: 'Deleted an country'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-country-delete-popup',
  template: ''
})
export class CountryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ country }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CountryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.country = country;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/country', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/country', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

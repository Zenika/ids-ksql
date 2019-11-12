import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICountry, Country } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { IRegion } from 'app/shared/model/region.model';
import { RegionService } from 'app/entities/region/region.service';

@Component({
  selector: 'jhi-country-update',
  templateUrl: './country-update.component.html'
})
export class CountryUpdateComponent implements OnInit {
  isSaving: boolean;

  regions: IRegion[];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    region: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected countryService: CountryService,
    protected regionService: RegionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);
    });
    this.regionService.query({ filter: 'country-is-null' }).subscribe(
      (res: HttpResponse<IRegion[]>) => {
        if (!this.editForm.get('region').value || !this.editForm.get('region').value.id) {
          this.regions = res.body;
        } else {
          this.regionService
            .find(this.editForm.get('region').value.id)
            .subscribe(
              (subRes: HttpResponse<IRegion>) => (this.regions = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(country: ICountry) {
    this.editForm.patchValue({
      id: country.id,
      countryName: country.countryName,
      region: country.region
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountry {
    return {
      ...new Country(),
      id: this.editForm.get(['id']).value,
      countryName: this.editForm.get(['countryName']).value,
      region: this.editForm.get(['region']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountry>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRegionById(index: number, item: IRegion) {
    return item.id;
  }
}

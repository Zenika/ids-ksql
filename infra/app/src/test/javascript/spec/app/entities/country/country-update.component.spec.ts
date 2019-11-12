import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { CountryUpdateComponent } from 'app/entities/country/country-update.component';
import { CountryService } from 'app/entities/country/country.service';
import { Country } from 'app/shared/model/country.model';

describe('Component Tests', () => {
  describe('Country Management Update Component', () => {
    let comp: CountryUpdateComponent;
    let fixture: ComponentFixture<CountryUpdateComponent>;
    let service: CountryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppTestModule],
        declarations: [CountryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CountryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Country(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Country();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

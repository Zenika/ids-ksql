import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { EmployeeDetailComponent } from 'app/entities/employee/employee-detail.component';
import { Employee } from 'app/shared/model/employee.model';

describe('Component Tests', () => {
  describe('Employee Management Detail Component', () => {
    let comp: EmployeeDetailComponent;
    let fixture: ComponentFixture<EmployeeDetailComponent>;
    const route = ({ data: of({ employee: new Employee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppTestModule],
        declarations: [EmployeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

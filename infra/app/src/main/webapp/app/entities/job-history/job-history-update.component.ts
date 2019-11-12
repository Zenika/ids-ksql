import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IJobHistory, JobHistory } from 'app/shared/model/job-history.model';
import { JobHistoryService } from './job-history.service';
import { IJob } from 'app/shared/model/job.model';
import { JobService } from 'app/entities/job/job.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-job-history-update',
  templateUrl: './job-history-update.component.html'
})
export class JobHistoryUpdateComponent implements OnInit {
  isSaving: boolean;

  jobs: IJob[];

  departments: IDepartment[];

  employees: IEmployee[];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
    job: [],
    department: [],
    employee: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jobHistoryService: JobHistoryService,
    protected jobService: JobService,
    protected departmentService: DepartmentService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.updateForm(jobHistory);
    });
    this.jobService.query({ filter: 'jobhistory-is-null' }).subscribe(
      (res: HttpResponse<IJob[]>) => {
        if (!this.editForm.get('job').value || !this.editForm.get('job').value.id) {
          this.jobs = res.body;
        } else {
          this.jobService
            .find(this.editForm.get('job').value.id)
            .subscribe(
              (subRes: HttpResponse<IJob>) => (this.jobs = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.departmentService.query({ filter: 'jobhistory-is-null' }).subscribe(
      (res: HttpResponse<IDepartment[]>) => {
        if (!this.editForm.get('department').value || !this.editForm.get('department').value.id) {
          this.departments = res.body;
        } else {
          this.departmentService
            .find(this.editForm.get('department').value.id)
            .subscribe(
              (subRes: HttpResponse<IDepartment>) => (this.departments = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.employeeService.query({ filter: 'jobhistory-is-null' }).subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        if (!this.editForm.get('employee').value || !this.editForm.get('employee').value.id) {
          this.employees = res.body;
        } else {
          this.employeeService
            .find(this.editForm.get('employee').value.id)
            .subscribe(
              (subRes: HttpResponse<IEmployee>) => (this.employees = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(jobHistory: IJobHistory) {
    this.editForm.patchValue({
      id: jobHistory.id,
      startDate: jobHistory.startDate != null ? jobHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: jobHistory.endDate != null ? jobHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: jobHistory.language,
      job: jobHistory.job,
      department: jobHistory.department,
      employee: jobHistory.employee
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  private createFromForm(): IJobHistory {
    return {
      ...new JobHistory(),
      id: this.editForm.get(['id']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language']).value,
      job: this.editForm.get(['job']).value,
      department: this.editForm.get(['department']).value,
      employee: this.editForm.get(['employee']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistory>>) {
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

  trackJobById(index: number, item: IJob) {
    return item.id;
  }

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }
}

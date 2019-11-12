import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IJob, Job } from 'app/shared/model/job.model';
import { JobService } from './job.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task/task.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-job-update',
  templateUrl: './job-update.component.html'
})
export class JobUpdateComponent implements OnInit {
  isSaving: boolean;

  tasks: ITask[];

  employees: IEmployee[];

  editForm = this.fb.group({
    id: [],
    jobTitle: [],
    minSalary: [],
    maxSalary: [],
    tasks: [],
    employee: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jobService: JobService,
    protected taskService: TaskService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);
    });
    this.taskService
      .query()
      .subscribe((res: HttpResponse<ITask[]>) => (this.tasks = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.employeeService
      .query()
      .subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(job: IJob) {
    this.editForm.patchValue({
      id: job.id,
      jobTitle: job.jobTitle,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      tasks: job.tasks,
      employee: job.employee
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJob {
    return {
      ...new Job(),
      id: this.editForm.get(['id']).value,
      jobTitle: this.editForm.get(['jobTitle']).value,
      minSalary: this.editForm.get(['minSalary']).value,
      maxSalary: this.editForm.get(['maxSalary']).value,
      tasks: this.editForm.get(['tasks']).value,
      employee: this.editForm.get(['employee']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJob>>) {
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

  trackTaskById(index: number, item: ITask) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}

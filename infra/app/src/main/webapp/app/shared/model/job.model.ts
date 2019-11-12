import { ITask } from 'app/shared/model/task.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  tasks?: ITask[];
  employee?: IEmployee;
}

export class Job implements IJob {
  constructor(
    public id?: number,
    public jobTitle?: string,
    public minSalary?: number,
    public maxSalary?: number,
    public tasks?: ITask[],
    public employee?: IEmployee
  ) {}
}

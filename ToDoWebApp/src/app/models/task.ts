import { TaskStatus } from "./taskStatus";

export class Task {
  id?: number;
  name!: string;
  description?: string;
  status: TaskStatus = TaskStatus.Pending;
  dueDate?: Date;
  projectId?: number;
}


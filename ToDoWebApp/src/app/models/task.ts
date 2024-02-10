import { TaskStatus } from "./taskStatus";

export class Task {
  id?: number;
  name!: string;
  description?: string;
  status!: TaskStatus;
  dueDate?: Date;
  projectId?: number;
}


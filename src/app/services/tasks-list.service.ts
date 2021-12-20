export interface Task {
  task: string;
  isBeingEdited: boolean;
}

export class TasksListService {
  list: Task[] = [];

  constructor() { }

  getTasksList() {
    return this.list;
  }
}

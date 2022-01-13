import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: any;
  newTitle!: string;

  constructor(private service: TasksService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (tasks) => (this.tasks = tasks),
    });
  }

  createTask(input: HTMLInputElement) {
    let task: any = {
      title: input.value,
      creationData: Date.now(),
    };
    this.tasks.splice(0, 0, task);
    input.value = '';

    this.service.create(task).subscribe({
      error: () => {
        this.tasks.splice(0, 1);
      },
    });
  }

  editTask(task: any): void {
    task.isBeingEdited = true;
    this.newTitle = task.title;
    console.log(task);
  }

  saveTask(task: any): void {
    const oldTitle = task.title;

    delete task.isBeingEdited;
    task.title = this.newTitle;

    this.service.update(task).subscribe({
      error: () => {
        task.title = oldTitle;
      },
    });
  }

  cancelEditingTask(task: any): void {
    task.isBeingEdited = false;
  }

  deleteTask(task: any): void {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    this.service.delete(task.id).subscribe({
      error: () => {
        this.tasks.splice(index, 0, task);
      },
    });
  }

  setContent(event: any, task: any): void {
    event.target.setAttribute('data-after', task.title);
  }
}

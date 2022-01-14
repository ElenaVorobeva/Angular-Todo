import { MyTask } from './../../common/task-type';
import { NotFoundError } from './../../common/not-found-error';
import { throwError } from 'rxjs';
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

  createTask(input: HTMLInputElement): void {
    let task: any = {
      title: input.value,
      creationData: Date.now(),
    };
    this.tasks.splice(0, 0, task);
    input.value = '';

    this.service.create(task).subscribe({
      next: (newTask) => {
        task.id = JSON.parse(JSON.stringify(newTask)).id;
      },
      error: (error) => {
        this.tasks.splice(0, 1);
        throwError(() => error);
      },
    });
  }

  editTask(task: MyTask): void {
    task.isBeingEdited = true;
    this.newTitle = task.title;
    console.log(task);
  }

  saveTask(task: MyTask): void {
    const oldTitle = task.title;

    delete task.isBeingEdited;
    task.title = this.newTitle;

    if (task.title !== oldTitle) {
      this.service.update(task).subscribe({
        error: (error) => {
          task.title = oldTitle;
          throwError(() => error);
        },
      });
    }
  }

  cancelEditingTask(task: MyTask): void {
    task.isBeingEdited = false;
  }

  deleteTask(task: MyTask): void {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);

    this.service.delete(task.id).subscribe({
      error: (error) => {
        this.tasks.splice(index, 0, task);
        if (error instanceof NotFoundError)
          alert('This post has already been deleted.');
        else throwError(() => error);
      },
    });
  }

  setContent(event: any, task: MyTask): void {
    event.target.setAttribute('data-after', task.title);
  }
}

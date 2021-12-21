import { Component, NgModule, Pipe } from '@angular/core';
import { TasksListService } from 'src/app/services/tasks-list.service';
import type { Task } from 'src/app/services/tasks-list.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'my-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent {
  newTask: string = "";
  editedTask!: string;
  tasks!: Task[];
  i!: number;

  constructor(service: TasksListService) {
    this.tasks = service.getTasksList();
  }

  addATask(task: string): void {
    if (task) {
      this.tasks.push({task, isBeingEdited: false})
      this.newTask = "";
    }
  }

  deleteATask(i: number): void {
    this.tasks = this.tasks.filter((_, index) => index !== i)
  }

  editATask(i: number, editedTask: string): void {
    this.editedTask = editedTask;
    this.tasks = this.tasks.map((task, index) => (
      index === i ? {...task, isBeingEdited: true} : {...task, isBeingEdited: false}
    ))
  }

  saveATask(i: number): void {
    this.tasks = this.tasks.map((task, index) => (
      index === i ? {task: this.editedTask, isBeingEdited: false} : task
    ))
  }

  cancelEditingATask(i: number): void {
    this.tasks = this.tasks.map((task, index) => (
      index === i ? {...task, isBeingEdited: false} : task
    ))
  }

  setContent(event: any, i: number): void {
    event.target.setAttribute('data-after', this.tasks[i].task)
  }

  showInfo(event: any): void {
    console.log('test: ', event.target.dataset.index)
  }

  drop(event: CdkDragDrop<{task: string; isBeingEdited: boolean}[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}

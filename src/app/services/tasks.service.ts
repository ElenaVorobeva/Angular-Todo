import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class TasksService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/tasks', http);
  }
}

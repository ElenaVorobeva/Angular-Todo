import { TestBed } from '@angular/core/testing';

import { TasksListService } from './tasks-list.service';

describe('TasksListService', () => {
  let service: TasksListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

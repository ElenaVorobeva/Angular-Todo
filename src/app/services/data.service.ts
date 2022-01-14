import { MyTask } from './../common/task-type';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll(): Observable<Object> {
    return this.http
      .get(this.url + '?_sort=creationData&_order=desc')
      .pipe(catchError(this.errorHandler));
  }

  create(resource: { title: string }): Observable<Object> {
    return this.http
      .post('this.url', resource)
      .pipe(catchError(this.errorHandler));
  }

  update(resource: MyTask): Observable<Object> {
    return this.http
      .patch(this.url + '/' + resource.id, { title: resource.title })
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.url + '/' + id).pipe(
      map((response) => JSON.parse(JSON.stringify(response))),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) return throwError(() => new NotFoundError());

    return throwError(() => new AppError(error));
  }
}

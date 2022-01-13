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
      .post(this.url, resource)
      .pipe(catchError(this.errorHandler));
  }

  update(resource: any): Observable<Object> {
    return this.http
      .patch(this.url + '/' + resource.id, { title: resource.title })
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<Object> {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => alert('An error occured. ' + error.message));
  }
}

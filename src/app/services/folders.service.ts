import { Injectable } from '@angular/core';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MyFolder } from '../common/types';

@Injectable({
  providedIn: 'root',
})
export class FoldersService {
  url: string = 'http://localhost:3000/folders/';

  constructor(private http: HttpClient) {}

  getFolders(): Observable<Object> {
    return this.http.get(this.url + `?_sort=creationData&_order=desc`).pipe(
      map((response) => JSON.parse(JSON.stringify(response))),
      catchError(this.errorHandler)
    );
  }

  create(resource: {
    title: string;
    folder: string;
    creationDate: Date;
  }): Observable<Object> {
    return this.http.post(this.url, resource).pipe(
      map((response) => JSON.parse(JSON.stringify(response))),
      catchError(this.errorHandler)
    );
  }

  update(resource: MyFolder): Observable<Object> {
    return this.http
      .patch(this.url + resource.id, {
        title: resource.title,
      })
      .pipe(
        map((response) => JSON.parse(JSON.stringify(response))),
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.url + id).pipe(
      map((response) => JSON.parse(JSON.stringify(response))),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) return throwError(() => new NotFoundError());

    return throwError(() => new AppError(error));
  }
}

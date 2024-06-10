import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ParishI } from '../interfaces/parish.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpApiRestService {

  private readonly api = `${environment.apiRest}/features`;
  private readonly apiDocker = `${environment.apiRestDocker}/features`;

  constructor(private readonly http: HttpClient) { }

  listParishedHttp(): Observable<unknown> {
    return this.http.get<ParishI>(this.api + '/list-parishes')
      .pipe(
        map(res => res),
        catchError(err => err)
      );
  }

  createParishedHttp(newParish: ParishI): Observable<unknown> {
    return this.http.post<any>(this.api + '/add-parishes', newParish)
      .pipe(
        map(res => res),
        catchError(err => err)
      );
  }

  updateParishedHttp(newParish: ParishI): Observable<unknown> {
    return this.http.patch<any>(this.api + '/update-parishes', newParish)
      .pipe(
        map(res => res),
        catchError(err => err)
      );
  }

  deleteParishedHttp(id: string): Observable<unknown> {
    return this.http.delete<any>(this.api + '/delete-parishes/' + id)
      .pipe(
        map(res => res),
        catchError(err => err)
      );
  }

}

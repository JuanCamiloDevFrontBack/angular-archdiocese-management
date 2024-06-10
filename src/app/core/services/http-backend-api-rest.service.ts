import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { PriestI } from '../interfaces/priest.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpBackendApiRestService {

  private readonly api = `${environment.apiRest}/features`;
  private readonly apiDocker = `${environment.apiRestDocker}/features`;
  private readonly httpB: HttpClient;

  constructor(private readonly httpBackend: HttpBackend) {
    this.httpB = new HttpClient(this.httpBackend);// TODO: evita pasar por un interceptor, si existe alguno.
  }

  listPriestsHttp(): Observable<unknown> {
    return this.httpB.get<PriestI>(this.api + '/list-priests')
      .pipe(
        map(res => res),
        catchError(err => {
          console.error('Error in listParishedHttp:', err);
          throw err;
        })
      );
  }

  createPriestHttp(newParish: PriestI): Observable<unknown> {
    return this.httpB.post<any>(this.api + '/add-priests', newParish)
      .pipe(
        map(res => res),
        catchError(err => {
          console.error('Error in createParishedHttp:', err);
          throw err;
        })
      );
  }

  updatePriestHttp(newParish: PriestI): Observable<unknown> {
    return this.httpB.patch<any>(this.api + '/update-priests', newParish)
      .pipe(
        map(res => res),
        catchError(err => {
          console.error('Error in updateParishedHttp:', err);
          throw err;
        })
      );
  }

  deletePriestHttp(id: string): Observable<unknown> {
    return this.httpB.delete<any>(this.api + '/delete-priests/' + id)
      .pipe(
        map(res => res),
        catchError(err => {
          console.error('Error in deleteParishedHttp:', err);
          throw err;
        })
      );
  }

}

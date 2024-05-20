import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Sugerencia } from '../models/sugerencias';


@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {
  private urlSuggest='http://localhost:3000/api/sugerencias';

  constructor(private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.urlSuggest).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }

  getSug(id:number): Observable<any>{
    return this.http.get<any>(this.urlSuggest+`/${id}`);
  }

 createSug(sug: any): Observable<Sugerencia> {
  console.log('La sugerencia es : ' + sug.peleas2);
    return this.http.post<Sugerencia>(this.urlSuggest, sug, this.httpOptions)
    .pipe( catchError((error: any) => {

      console.error('Error occurred:', error);
      throw error;
    })
    )
  }

  deleteSug(id: number): Observable<any> {

    return this.http.delete<any>(this.urlSuggest+`/${id}`);
  }

  actualizarSug(id: number, sugActualizada: any): Observable<any> {
    return this.http.put<any>(this.urlSuggest+`/${id}`, sugActualizada);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombatesService {

  private urlVista='http://localhost:3000/api/vista/';

  constructor(private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUltimosCombates(): Observable<any[]> {
    return this.http.get<any[]>(this.urlVista+'ultimosCombates').pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
}

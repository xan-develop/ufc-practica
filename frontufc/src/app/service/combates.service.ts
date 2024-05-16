import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { listacombates } from '../luchador/unico/luchador-inter';

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

  getAllCombates(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.urlVista+'allcombates/'+id).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
  getPorPeso(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.urlVista+'luchadoresPeso/'+id).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
  getCampeones(): Observable<any[]> {
    return this.http.get<any[]>(this.urlVista+'campeones').pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
  getRanking(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.urlVista+'ranking/'+id).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
  getCombatesPeleador(id: number): Observable<listacombates[]> {
    return this.http.get<any[]>(this.urlVista+'combatesluchador/'+id).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
}

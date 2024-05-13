import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LuchadorInter, Pelea } from '../luchador/unico/luchador-inter';

@Injectable({
  providedIn: 'root'
})
export class LuchadorService {
  private urlVista='http://localhost:3000/api/luchadores/';
  private urlId= 'http://localhost:3000/api/vista/idpelea/';
  private lastfight= 'http://localhost:3000/api/vista/lastfight/';
  constructor(private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getLuchadores(): Observable<any[]> {
    return this.http.get<any[]>(this.urlVista).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
  getLuchador(id: number): Observable<LuchadorInter> {
    return this.http.get<LuchadorInter>(this.urlVista + id).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
  getidPelea(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.urlId + id).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
  getLast(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.lastfight + id).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }
}

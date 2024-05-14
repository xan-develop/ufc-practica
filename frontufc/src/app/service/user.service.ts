import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlSuggest='http://localhost:3000/api/users';

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

  getUser(id:number): Observable<any>{
    return this.http.get<any>(this.urlSuggest+`/${id}`);
  }

 createUser(socio: any): Observable<User> {
    return this.http.post<User>(this.urlSuggest, socio, this.httpOptions)
    .pipe( catchError((error: any) => {

      console.error('Error occurred:', error);
      throw error;
    })
    )
  }

  deleteUser(id: number): Observable<any> {

    return this.http.delete<any>(this.urlSuggest+`/${id}`);
  }

  actualizarUser(id: number, userActualizado: any): Observable<any> {
    return this.http.put<any>(this.urlSuggest+`/${id}`, userActualizado);
  }
}

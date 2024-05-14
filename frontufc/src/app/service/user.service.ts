import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUser='http://localhost:3000/api/users';
  private urlLogin='http://localhost:3000/api/login';

  constructor(private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  isLoggedIn(): boolean{
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
  logout() {

    localStorage.removeItem('token');
  }
  login(usuario: string, clave: string): Observable<any> {
    const body = { usuario, clave };
    return this.http.post<any>(this.urlLogin, body, this.httpOptions).pipe( catchError((error: any) => {

      console.error('Fallo al autenticar:', error);
      throw error;
    })
  )
  }
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.urlUser).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return throwError(error);
      })
    );
  }

  getUser(id:number): Observable<any>{
    return this.http.get<any>(this.urlUser+`/${id}`);
  }

 createUser(socio: any): Observable<User> {
    return this.http.post<User>(this.urlUser, socio, this.httpOptions)
    .pipe( catchError((error: any) => {

      console.error('Error occurred:', error);
      throw error;
    })
    )
  }

  deleteUser(id: number): Observable<any> {

    return this.http.delete<any>(this.urlUser+`/${id}`);
  }

  actualizarUser(id: number, userActualizado: any): Observable<any> {
    return this.http.put<any>(this.urlUser+`/${id}`, userActualizado);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User, UserRole } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUser='http://localhost:3000/api/users';
  private urlLogin='http://localhost:3000/api/login';
  private urlRole= 'http://localhost:3000/api/userRole';
  isadmin: boolean = false;
  constructor(private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  setAdmin(){
    this.isadmin = true;
    localStorage.setItem('isadmin', 'true');
    console.log('Se ha puestro true la variable admin  ' + this.isadmin)
  }
  isAdmin(){
    return this.isadmin || localStorage.getItem('isadmin') === 'true';
  }
  isLoggedIn(): boolean{
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('isadmin');
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

 createUser(user: any): Observable<User> {
  console.log('Creando usuario ...')
    return this.http.post<User>(this.urlUser, user, this.httpOptions)
    .pipe( catchError((error: any) => {

      console.error('Error occurred:', error);
      throw error;
    })
    )
  }
  setRole(rol: any): Observable<UserRole> {
    console.log('Creando usuario ...')
      return this.http.post<UserRole>(this.urlRole , rol, this.httpOptions)
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

import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserRole } from '../models/users';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private apiService: UserService,  private route: Router) {}
user: string = '';
password: string = '';
confirmacion: boolean = false;
isadmin: boolean = false;
rol: UserRole = { usuario: '' , role: ''}
register(){
this.route.navigate(['/registro']);
}
log() {
  this.apiService.login(this.user, this.password).subscribe(
    data => {
      console.log(data);
      this.rol = data.user;
      console.log('Este es el ROL : ' + this.rol.role)
      localStorage.setItem('token', data.token);
      this.confirmacion = true;
      if (this.rol.role === 'admin'){
        this.isadmin = true;
        this.apiService.setAdmin();
      }
      console.log('Es admin? : ' + this.isadmin)
    },
    error => {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  );
}

}

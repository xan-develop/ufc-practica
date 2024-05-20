import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserRole, UserRoleArray } from '../models/users';
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
rol: UserRole = { userId: 0 , roleId: 3}
roles: UserRoleArray = { usuario: '' , roleId: [] }
register(){
this.route.navigate(['/registro']);
}
log() {
  this.apiService.login(this.user, this.password).subscribe(
    data => {
      console.log(data);
      this.roles.roleId = data.rolesid;
      this.roles.usuario = data.username.usuario;
      console.log('Esta es la info : ' + this.roles.usuario)
      console.log('Este es el ROL : ' + this.roles.roleId)
      localStorage.setItem('token', data.token);
      this.confirmacion = true;
      if (this.roles.roleId.includes(1)){
        this.isadmin = true;
        console.log('Eres admin')
      }
    },
    error => {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  );
}

}

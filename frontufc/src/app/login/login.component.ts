import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserRole, UserRoleArray } from '../models/users';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
      if (this.roles.roleId.includes(1)){
        this.isadmin = true;
        this.apiService.setAdmin();
        console.log('Eres admin')
      }
    },
    error => {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fallo al logearte!",
      });
    }
  );
}

}

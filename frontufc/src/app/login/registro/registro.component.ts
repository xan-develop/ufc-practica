import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User, UserRole } from '../../models/users';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  user: string = '';
  password: string = '';
  passwordConfirm: string = '';
  role: string = 'normal';
  confirmacion: boolean = false;
  newUser: User = { usuario: '' , correo: '' , clave: '' }
  newUserRole: UserRole = { userId: 0 , roleId: 3}
  errorPass: boolean = false;
  errorCreate: boolean = false;
  errorEmpty: boolean = false;

constructor( private service: UserService , private route: Router){}

sing() {
  try {

    if (this.password == this.passwordConfirm) {
      this.newUser.clave = this.password;

      this.service.createUser(this.newUser).subscribe(
        (response) => {
          console.log(response);
          console.log(response.id);
          this.newUserRole.userId = response.id;
          this.service.setRole(this.newUserRole).subscribe(
            (roleResponse) => {
              console.log('Rol asignado:', roleResponse);
              this.confirmacion = true;
            }),
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Te has registrado con exito " + this.newUser.usuario,
              showConfirmButton: false,
              timer: 1500
            });
          this.confirmacion = true;
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
          this.errorCreate = true;
        }
      );
    } else {
      this.errorPass = true;
    }
  } catch (error) {
    this.errorCreate = true;
  }
}

}

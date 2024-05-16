import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/users';
import { Router } from '@angular/router';

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
  newUser: User = { usuario: '' , correo: '' , clave: '' , role: 'normal'}
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
          alert('Todo correcto');
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

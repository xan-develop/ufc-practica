import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private apiService: UserService) {}
user: string = '';
password: string = '';
confirmacion: boolean = false;
log() {
  this.apiService.login(this.user, this.password).subscribe(
    data => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.confirmacion = true;
    },
    error => {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  );
}

}

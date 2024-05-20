import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UFC';
  constructor(private logService: UserService , private router: Router){}
  isLogged(): boolean {
    return this.logService.isLoggedIn();
  }
  isAdmin(){
    return this.logService.isAdmin();
  }
logOut(){
  this.logService.logout();
  this.router.navigate(['/']);
  Swal.fire({
    icon: "info",
    title: "Logout",
    text: "Has cerrado sesion!",
  });
}
}

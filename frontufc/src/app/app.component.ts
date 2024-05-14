import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

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
logOut(){
  this.logService.logout();
  this.router.navigate(['/']);
  alert('Sesión cerrada correctamente');
}
}

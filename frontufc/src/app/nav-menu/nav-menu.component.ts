import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Offcanvas,
  Ripple,
  Dropdown,
  initTWE,
} from "tw-elements";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class NavMenuComponent implements OnInit {
  showDropdown: boolean = false;
  showDropdownSug: boolean = false;
  ngOnInit(): void {
    initTWE({ Offcanvas, Ripple, Dropdown });
  }
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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Offcanvas,
  Ripple,
  Dropdown,
  initTWE,
} from "tw-elements";
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class NavMenuComponent implements OnInit {
  ngOnInit(): void {
    initTWE({ Offcanvas, Ripple, Dropdown });
  }

}

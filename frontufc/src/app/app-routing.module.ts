import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { CombatesComponent } from './combates/combates.component';
import { LuchadoresComponent } from './luchadores/luchadores.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { LuchadorComponent } from './luchador/luchador.component';
import { UnicoComponent } from './luchador/unico/unico.component';
import { LoginComponent } from './login/login.component';
import { VerComponent } from './sugerencias/ver/ver.component';
import { RegistroComponent } from './login/registro/registro.component';
import {authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home' , component: HomeComponent},
  {path: 'eventos' , component: EventosComponent},
  {path: 'luchadores' , component: LuchadoresComponent},
  {path: 'combates/:id' , component: CombatesComponent},
  {path: 'sugerencias' , component: SugerenciasComponent , canActivate: [authGuard]},
  {path: 'todos' , component: LuchadorComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'versugerencias' , component: VerComponent , canActivate: [adminGuard] },
  {path: 'luchador/:id' , component: UnicoComponent},
  {path: 'nav' , component: NavMenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

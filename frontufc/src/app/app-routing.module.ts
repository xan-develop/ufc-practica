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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home' , component: HomeComponent},
  {path: 'eventos' , component: EventosComponent},
  {path: 'luchadores' , component: LuchadoresComponent},
  {path: 'combates/:id' , component: CombatesComponent},
  {path: 'sugerencias' , component: SugerenciasComponent},
  {path: 'todos' , component: LuchadorComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'versugerencias' , component: VerComponent},
  {path: 'luchador/:id' , component: UnicoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

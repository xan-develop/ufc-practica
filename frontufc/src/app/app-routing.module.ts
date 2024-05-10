import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { CombatesComponent } from './combates/combates.component';
import { LuchadoresComponent } from './luchadores/luchadores.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home' , component: HomeComponent},
  {path: 'eventos' , component: EventosComponent},
  {path: 'luchadores' , component: LuchadoresComponent},
  {path: 'combates/:id' , component: CombatesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { EventosComponent } from './eventos/eventos.component';
import { CombatesComponent } from './combates/combates.component';
import { LuchadoresComponent } from './luchadores/luchadores.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { LuchadorComponent } from './luchador/luchador.component';
import { UnicoComponent } from './luchador/unico/unico.component';
import { LoginComponent } from './login/login.component';
import { VerComponent } from './sugerencias/ver/ver.component';
import { RegistroComponent } from './login/registro/registro.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventosComponent,
    CombatesComponent,
    LuchadoresComponent,
    SugerenciasComponent,
    LuchadorComponent,
    UnicoComponent,
    LoginComponent,
    VerComponent,
    RegistroComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

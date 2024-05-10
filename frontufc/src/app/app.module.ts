import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { EventosComponent } from './eventos/eventos.component';
import { CombatesComponent } from './combates/combates.component';
import { LuchadoresComponent } from './luchadores/luchadores.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventosComponent,
    CombatesComponent,
    LuchadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

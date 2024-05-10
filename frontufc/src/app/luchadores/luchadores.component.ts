import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CombatesService } from '../service/combates.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-luchadores',
  templateUrl: './luchadores.component.html',
  styleUrl: './luchadores.component.css',
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class LuchadoresComponent implements OnInit {
  mosca: any[] = [];
  gallo: any[] = [];
  pluma: any[] = [];
  ligero: any[] = [];
  welter: any[] = [];
  medio: any[] = [];
  pesado: any[] = [];
  semipesado: any[] = [];
  campeones: any[] = [];

  urlImg: string = "http://localhost:3000/imagen/";
  constructor(private apiService: CombatesService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) { }

  verCartelera(id: number) {
    this.router.navigateByUrl(`/combates/${id}`);
  }

  ngOnInit(): void {

    this.llenarData();
  }

  obtenerPeso(pesoCampeon: number): any[] {
    switch (pesoCampeon) {
      case 1:
        return this.mosca;
      case 8:
        return this.gallo;
      case 2:
        return this.pluma;
      case 3:
          return this.ligero;
      case 4:
          return this.welter;
      case 5:
        return this.medio;
      case 6:
        return this.semipesado;
      case 7:
        return this.pesado

      default:
        return [];
    }
  }

  llenarData() {
    this.apiService.getCampeones().subscribe(data => {
      this.campeones = data;
      console.log(this.campeones);
    });
    this.apiService.getRanking(1).subscribe(data => {
      this.mosca = data;
      console.log(this.mosca);
    });

    this.apiService.getRanking(8).subscribe(data => {
      this.gallo = data;
      console.log(this.gallo);
    });

    this.apiService.getRanking(2).subscribe(data => {
      this.pluma = data;
      console.log(this.pluma);
    });

    this.apiService.getRanking(3).subscribe(data => {
      this.ligero = data;
      console.log(this.ligero);
    });

    this.apiService.getRanking(4).subscribe(data => {
      this.welter = data;
      console.log(this.welter);
    });

    this.apiService.getRanking(5).subscribe(data => {
      this.medio = data;
      console.log(this.medio);
    });

    this.apiService.getRanking(6).subscribe(data => {
      this.semipesado = data;
      console.log(this.semipesado);
    });

    this.apiService.getRanking(7).subscribe(data => {
      this.pesado = data;
      console.log(this.pesado);
    });
  }


  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

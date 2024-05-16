import { Component } from '@angular/core';
import { LuchadorService } from '../../service/luchador.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { listacombates, LuchadorInter, Pelea } from './luchador-inter';
import { CombatesService } from '../../service/combates.service';

@Component({
  selector: 'app-unico',
  templateUrl: './unico.component.html',
  styleUrl: './unico.component.css'
})
export class UnicoComponent {
  constructor(private apiService: LuchadorService , private apiCombates: CombatesService, private sanitizer: DomSanitizer , private router: Router , private route: ActivatedRoute ){}
  data: any[] = [];
  datos: any[] = [];
  dataArray: any[] = [];
  urlImg: string = "http://localhost:3000/imagen/";
  luchador: LuchadorInter | undefined;
  pesoNombre: string = "";
  idluchador: number = 0;
  pelea:any[] = [];
  idpelea: number = 0;
  lastFight1: Pelea = {} as Pelea;
  lastFight2: Pelea = {} as Pelea;
  listacombates: listacombates[] = [];

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.idluchador = id;
        return forkJoin([
          this.apiService.getLuchador(id),
          this.apiService.getidPelea(id),
          this.apiCombates.getCombatesPeleador(id)
        ]);
      })
    ).subscribe(([luchador, pelea , combates]) => {
      this.luchador = luchador;
      this.getPesoNombre(this.luchador.pesoId);
      console.log(this.luchador);
      this.listacombates = combates;
      console.log('Ultimos combates')
      console.log(this.listacombates)
      this.pelea = pelea[0].pelea;
      this.idpelea = Number(this.pelea)
      console.log('Esto hay en pelea : ' + this.idpelea);

      this.llenarPelea(this.idpelea).subscribe(data => {
        this.lastFight1 = data[0];
        this.lastFight2 = data[1];
        console.log('Esto hay en last 1 : ', this.lastFight1);
        console.log('Esto hay en last 2 : ', this.lastFight2);

      });
    });
 ;
  }

  llenarPelea(id: number): Observable<any[]> {
    return this.apiService.getLast(id);
  }

  getPesoNombre(numero: number){
    let nombre: string;
    switch (numero) {
      case 1:
        nombre = "Peso Mosca";
        break;
      case 2:
        nombre = "Peso Pluma";
        break;
      case 3:
        nombre = "Peso Ligero";
        break;
      case 4:
        nombre = "Peso Wélter";
        break;
      case 5:
        nombre = "Peso Medio";
        break;
      case 6:
        nombre = "Peso Semipesado";
        break;
      case 7:
        nombre = "Peso Pesado";
        break;
      case 8:
        nombre = "Peso Gallo";
        break;
      default:
        nombre = "Peso Desconocido";
        break;
    }
    this.pesoNombre = nombre;
  }
}

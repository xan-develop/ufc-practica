import { Component } from '@angular/core';
import { LuchadorService } from '../service/luchador.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Luchador } from './modelo';
@Component({
  selector: 'app-luchador',
  templateUrl: './luchador.component.html',
  styleUrl: './luchador.component.css'
})
export class LuchadorComponent {
  data: any = { luchadores: [] }; // Tipo definido como LuchadoresData
  url: string = '/luchador/';
  luchadoresFiltrados: any[] = []; // Array para almacenar los luchadores filtrados
  searchTerm: string = '';
  peso: string = '0' ; // Define peso como un número opcional
  constructor(private apiService: LuchadorService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) { }
  urlImg: string = "http://localhost:3000/imagen/";

  ngOnInit(): void {

    this.llenarData(this.searchTerm , Number(this.peso));
  }

  llenarData(search: string, peso: number) {
    console.log('El id peso es : ' + peso + ' El string es : ' + search);
    this.apiService.getLuchadores().subscribe((response: any) => {
      this.data = response;
      this.luchadoresFiltrados = this.data.luchadores.filter((luchador: { nombre: string; pesoId: number; }) => {
        const nombreIncluido = luchador.nombre.toLowerCase().includes(search.toLowerCase());
        if (peso === 0){
          return nombreIncluido
        } else{
          const pesoCoincide = luchador.pesoId === peso;
          return nombreIncluido && pesoCoincide;
        }

      });

      console.log(this.luchadoresFiltrados);
    });

  }
  toNum(texto: string): number {
    return Number(texto);
  }
}

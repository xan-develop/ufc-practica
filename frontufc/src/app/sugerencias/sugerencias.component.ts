import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Sugerencia } from '../models/sugerencias';
import { SugerenciasService } from '../service/sugerencias.service';
import { LuchadorService } from '../service/luchador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrl: './sugerencias.component.css',
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class SugerenciasComponent {
  nuevaSugerencia: Sugerencia = { usuario: '', correo: '' , peleas: [] , peleas2: [] , evento: 0 , descripcion: '' }; // Inicialización con valores predeterminados
  data: any = { luchadores: [] }; // Tipo definido como LuchadoresData
  url: string = '/luchador/';
  luchadoresFiltrados: any[] = []; // Array para almacenar los luchadores filtrados
  searchTerm: string = '';
  peso: string = '0' ; // Define peso como un número opcional
mostrarerror: boolean = false;

  constructor(private apiService: SugerenciasService , private luchService: LuchadorService , private sanitizer: DomSanitizer ){}

  ngOnInit(): void {
    this.llenarData(this.toNum(this.peso));
    console.log(this.peso)
  }
  LuchadorChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement.value;

    if (!this.nuevaSugerencia.peleas.includes(valor)) {
      this.nuevaSugerencia.peleas.push(valor);
    }
    console.log(this.nuevaSugerencia.peleas)
  }
  LuchadorChange2(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement.value;

    if (!this.nuevaSugerencia.peleas2.includes(valor)) {
      this.nuevaSugerencia.peleas2.push(valor);
    }
    console.log(this.nuevaSugerencia.peleas2)
  }
  crearSugerencia() {
    if (this.nuevaSugerencia.evento.toString().length < 3) {

      this.mostrarerror = true;
      return;
    }
    console.log('Has llamado a crear sugerencia en el formulario')
    this.apiService.createSug(this.nuevaSugerencia)
      .subscribe(
        response => {
          console.log('Sugerencia creado exitosamente:', response);
          Swal.fire({
            icon: "success",
            title: "Sugerencia creada",
          });

        },
        error => {
          console.error('Error al crear socio:', error);
        }
      );
  }
  llenarData(peso: number) {
    console.log(peso)
    console.log('El id peso es : ' + peso);
    this.luchService.getLuchadores().subscribe((response: any) => {
      this.data = response;
      this.luchadoresFiltrados = this.data.luchadores.filter((luchador: { nombre: string; pesoId: number; }) => {
        const nombreIncluido = luchador.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
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
  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

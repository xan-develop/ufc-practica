import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Sugerencia } from '../models/sugerencias';
import { SugerenciasService } from '../service/sugerencias.service';
import { LuchadorService } from '../service/luchador.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrl: './sugerencias.component.css',
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class SugerenciasComponent {
  nuevaSugerencia: Sugerencia = { usuario: '', correo: '' , luchador1: '' , luchador2: '' , descripcion: '' }; // Inicialización con valores predeterminados
  data: any = { luchadores: [] }; // Tipo definido como LuchadoresData
  url: string = '/luchador/';
  luchadoresFiltrados: any[] = []; // Array para almacenar los luchadores filtrados
  searchTerm: string = '';
  peso: string = '0' ; // Define peso como un número opcional
  constructor(private apiService: SugerenciasService , private luchService: LuchadorService , private sanitizer: DomSanitizer ){}
  ngOnInit(): void {
    this.llenarData(this.toNum(this.peso));
    console.log(this.peso)
  }

  crearSugerencia() {
    console.log('Has llamado a crear sugerencia en el formulario')
    this.apiService.createSug(this.nuevaSugerencia)
      .subscribe(
        response => {
          console.log('Sugerencia creado exitosamente:', response);
          window.alert('¡La sugerencia se ha creado exitosamente!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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

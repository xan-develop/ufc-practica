import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EventosService } from '../service/eventos.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class EventosComponent implements OnInit {
  data: any[] = [];
  datos: any[] = [];
  mostrarInfoEvento: { [key: number]: boolean } = {}; // Usamos un objeto para mantener el estado de visibilidad de cada evento
  @ViewChild('cartel') cartelElemento!: ElementRef;

  constructor(private apiService: EventosService , private sanitizer: DomSanitizer , private router: Router , private route: ActivatedRoute ){}

verCartelera(id:number){
  this.router.navigateByUrl(`/combates/${id}`);
}
 /* mostrarInfo(eventoId: number) {
    this.mostrarInfoEvento[eventoId] = true;
    if (this.cartelElemento) {
      this.cartelElemento.nativeElement.style.height = '85%';
    }

  }

  ocultarInfo(eventoId: number) {
    this.mostrarInfoEvento[eventoId] = false;
    if (this.cartelElemento) {
      this.cartelElemento.nativeElement.style.height = '140%';
    }
  }*/

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(){
    this.apiService.getEventos().subscribe(data => {


      this.data = data;
      console.log(this.data)
      // Inicializar el estado de visibilidad de cada evento en falso
      this.data.forEach(evento => {
        this.mostrarInfoEvento[evento.id] = true;
      });

  });
  }
sanitize(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}


}

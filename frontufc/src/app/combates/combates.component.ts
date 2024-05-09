import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CombatesService } from '../service/combates.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-combates',
  templateUrl: './combates.component.html',
  styleUrl: './combates.component.css',
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class CombatesComponent implements OnInit
{
  constructor(private apiService: CombatesService , private sanitizer: DomSanitizer , private router: Router , private route: ActivatedRoute ){}
  data: any[] = [];
  datos: any[] = [];
  urlImg: string = "http://localhost:3000/imagen/";
  idevento: number = 0;
  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.idevento = id;
        return this.apiService.getAllCombates(id);
      })
    ).subscribe(data => {
      this.data = data;
      this.estructura(this.data);
    });

  }

estructura(data: any[]){

for (let i = 0; i < data.length; i += 2) {

  const luchador1 = data[i];
  const luchador2 = data[i + 1];

  const combateEstructurado = [luchador1, luchador2];

  this.datos.push(combateEstructurado);
}
console.log(this.datos);
}

sanitize(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
}

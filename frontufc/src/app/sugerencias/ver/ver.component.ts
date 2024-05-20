import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SugerenciasService } from '../../service/sugerencias.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css',

})
export class VerComponent implements OnInit{
  data: any[] = [];


constructor(private service: SugerenciasService){}
  ngOnInit(): void {
   this.llenarData();
  }


llenarData() {
  this.service.getData().subscribe(data => {
    this.data = data;
    console.log(this.data);
  });}
}

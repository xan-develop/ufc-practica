import { Component, OnInit } from '@angular/core';
import { CombatesService } from '../service/combates.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  data: any[] = [];
  datos: any[] = [];
  urlImg: string = "http://localhost:3000/imagen/";

  constructor(private apiService: CombatesService , private sanitizer: DomSanitizer , private router: Router ){}

  ngOnInit(): void {
    this.llenarData();

  }

  llenarData(){
    this.apiService.getUltimosCombates().subscribe(data => {


      this.data = data;
      console.log(this.data)

  });
  }
sanitize(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}


}


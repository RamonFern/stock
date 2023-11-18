import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  // agora: Date;
  // private datePipe: DatePipe
  constructor() {
    // this.agora = new Date();
  }

  ngOnInit() {
  }

  // formatarDataHora(data: Date){
  //   this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss');
  // }

}

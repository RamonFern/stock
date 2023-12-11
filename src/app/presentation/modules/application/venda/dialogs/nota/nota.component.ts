import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateVendaRequest } from 'src/app/domain/api/application/venda/request/venda-request';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {
  clickedRows!: CreateVendaRequest[];
  total!: number;
  valorRecebido!: number;
  troco!: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.clickedRows = this.data.clickedRows
    this.total = this.somarTotais(this.clickedRows);
    this.valorRecebido = this.data.valorRecebido;
    this.troco = this.data.troco;

  }

  somarTotais(lista: CreateVendaRequest[]): number {
    return lista.reduce((total, venda) => total + venda.total, 0);
  }
}

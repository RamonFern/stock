import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateVendaRequest } from 'src/app/domain/api/application/venda/request/venda-request';
import { DialogReturn } from 'src/app/shared/models/dialog-return';
// import jsPDF from "jspdf";

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {
  @ViewChild('nota', {static: false}) el!: ElementRef;
  clickedRows!: CreateVendaRequest[];
  total!: number;
  valorRecebido!: number;
  troco!: number;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialogRef<NotaComponent>,) { }

  ngOnInit() {
    this.clickedRows = this.data.clickedRows
    this.total = this.somarTotais(this.clickedRows);
    this.valorRecebido = this.data.valorRecebido;
    this.troco = this.data.troco;

  }

  fechar() {
    const retorno: DialogReturn = {hasDataChanged: true};
    this.dialog.close(retorno);
  }

  // gerarPDF() {
  //   const pdf = new jsPDF('p','pt','a4');
  //   pdf.html(this.el.nativeElement, {
  //     callback: (pdf: any) => {
  //       pdf.save('documento.pdf');
  //     }
  //   })
  //   //doc.text('Hello world! ramon  ', 10, 10);
  // }

  somarTotais(lista: CreateVendaRequest[]): number {
    return lista.reduce((total, venda) => total + venda.total, 0);
  }
}

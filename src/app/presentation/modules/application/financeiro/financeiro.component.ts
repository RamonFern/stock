import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { VendaResponse } from 'src/app/domain/api/application/venda/response/venda-response';
import { VendaService } from 'src/app/domain/api/application/venda/service/venda.service';
// import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css'],

})
export class FinanceiroComponent implements OnInit {
  vendas: VendaResponse[] = [];
  vendasUnificadas: VendaResponse[] = [];
  vendasDia = true;
  formData = new FormControl(moment().locale('pt'), Validators.required);

  constructor(private vendasService: VendaService, private notification: MatSnackBar,) { }

  ngOnInit() {
    this.buscarVendasDoDia();
  }

  buscarPorData() {
    if(this.formData.valid){
    const dataSelecionada: Date = this.formData.value;
    const dataFormatada: string = this.formatarData(dataSelecionada);

    this.vendasService.listarPorData(dataFormatada)
        .pipe(take(1))
        .subscribe((vendas) => {
          this.vendas = vendas;
          this.unificarVendas(this.vendas);
          this.formData.reset();
        })
    } else {
      this.notification.open('Informe uma data!', 'ERRO', { duration: 3000 });
    }
  }

  formatarData(data: Date): string {
    // Formata a data para o formato 'YYYY-MM-DD'
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);

    return `${ano}-${mes}-${dia}`;
  }

  buscarVendasDoDia() {
    this.vendasDia = true;
    this.vendasService.listAllToDay()
        .pipe(take(1))
        .subscribe((vendas) => {
          this.vendas = vendas;
          this.unificarVendas(this.vendas);
        })
  }

  buscarTodas() {
    this.vendasDia = false;
    this.vendasService.listAll()
        .pipe(take(1))
        .subscribe((vendas) => {
          this.vendas = vendas;
          this.unificarVendas(this.vendas);
        })
  }

  unificarVendas(vendas: VendaResponse[]) {
    this.vendasUnificadas = [];
    vendas.forEach((venda) => {
      const vendaExistente = this.vendasUnificadas.find(v => v.idproduto === venda.idproduto);

      if (vendaExistente) {
        // Se o produto já existe, apenas atualize as quantidades e totais
        vendaExistente.quantidade += venda.quantidade;
        vendaExistente.total += venda.total;
      } else {
        // Se o produto não existe, adicione-o ao array
        this.vendasUnificadas.push({...venda});
      }
    });
  }

  calcularSomaTotal(): number {
    return this.vendas.reduce((total, venda) => total + venda.total, 0);
  }

  // downloadPDF() {
  //   // Extraemos el
  //   const DATA = document.getElementById('htmlData');
  //   // const doc = new jsPDF('p', 'pt', 'a4');
  //   const options = {
  //     background: 'white',
  //     scale: 3
  //   };

  //   html2canvas(DATA, options).then((canvas) => {

  //     const img = canvas.toDataURL('image/PNG');

  //     // Add image Canvas to PDF
  //     const bufferX = 15;
  //     const bufferY = 15;
  //     const imgProps = (doc as any).getImageProperties(img);
  //     const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  //     return doc;
  //   }).then((docResult) => {
  //     docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
  //   });
  // }

}

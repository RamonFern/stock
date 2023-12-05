import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { VendaFiltradas, VendaResponse } from 'src/app/domain/api/application/venda/response/venda-response';
import { VendaService } from 'src/app/domain/api/application/venda/service/venda.service';

@Component({
  selector: 'app-tab-vendas',
  templateUrl: './tab-vendas.component.html',
  styleUrls: ['./tab-vendas.component.css']
})
export class TabVendasComponent implements OnInit {

  vendas: VendaResponse[] = []
  // vendasFiltradas: VendaFiltradas[] = []
  @Input() vendasFiltradas!: VendaFiltradas[];

  constructor(private vendaService: VendaService) { }

  ngOnInit() {
    //console.log(this.vendasFiltradas);
    //this.buscarVendas();
  }

  buscarVendas() {
    this.vendaService.listAllToDay()
        .pipe(take(1))
        .subscribe((v) => {
          this.vendas = v;
          this.filtrarVendasPeloNumeroNota(this.vendas);
          // console.log(v);
        })
  }

  filtrarVendasPeloNumeroNota(vendas: VendaResponse[]) {
    this.vendasFiltradas = [];
    vendas.forEach(venda => {
      const vendaFiltradaExistente = this.vendasFiltradas.find(vf => vf.numeronota === venda.numeronota);
      if (!vendaFiltradaExistente) {
        const novaVendaFiltrada: VendaFiltradas = {
          id: venda.id,
          numeronota: venda.numeronota,
          datavenda: venda.datavenda,
          produtos: [{
            id: venda.idproduto,
            nome: venda.nomeproduto,
            qntd: venda.quantidade,
            valorUnidade: venda.valorunidade,
            total: venda.total
          }],
          totalGeral: venda.total
        };
        this.vendasFiltradas.push(novaVendaFiltrada);
      } else {
        vendaFiltradaExistente.produtos.push({
          id: venda.idproduto,
          nome: venda.nomeproduto,
          qntd: venda.quantidade,
          valorUnidade: venda.valorunidade,
          total: venda.total
        });
        vendaFiltradaExistente.totalGeral += venda.total;
      }
    });
    // console.log(this.vendasFiltradas);
    return this.vendasFiltradas;
  }

}

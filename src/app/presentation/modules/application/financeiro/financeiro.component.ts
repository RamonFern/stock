import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { VendaResponse } from 'src/app/domain/api/application/venda/response/venda-response';
import { VendaService } from 'src/app/domain/api/application/venda/service/venda.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {
  vendas: VendaResponse[] = [];
  vendasUnificadas: VendaResponse[] = [];
  constructor(private vendasService: VendaService) { }

  ngOnInit() {
    this.buscarVendas();
  }

  buscarVendas() {
    this.vendasService.listAllToDay()
        .pipe(take(1))
        .subscribe((vendas) => {
          this.vendas = vendas;
          this.unificarVendas(this.vendas);
        })
  }

  unificarVendas(vendas: VendaResponse[]) {
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

}

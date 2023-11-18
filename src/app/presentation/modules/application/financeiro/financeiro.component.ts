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
  longText = `The Shiba Inu is the smallest of the six`;
  vendas: VendaResponse[] = [];
  total!: number;
  constructor(private vendasService: VendaService) { }

  ngOnInit() {
    this.buscarVendas();
    // this.total = this.calcularSomaTotal();
  }

  buscarVendas() {
    this.vendasService.listAll()
        .pipe(take(1))
        .subscribe((vendas) => {
          this.vendas = vendas;
        })
  }

  calcularSomaTotal(): number {
    return this.vendas.reduce((total, venda) => total + venda.total, 0);
  }

}

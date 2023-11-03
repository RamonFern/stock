import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ProdutoResponse } from 'src/app/domain/api/application/produto/response/produto-response';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-criar-venda',
  templateUrl: './criar-venda.component.html',
  styleUrls: ['./criar-venda.component.css']
})
export class CriarVendaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'marca', 'qntdEstoque', 'valor'];
  dataSource = new MatTableDataSource();
  clickedRows = new Set<ProdutoResponse>();

  produtos: ProdutoResponse[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.buscarProdutos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  buscarProdutos() {
    this.produtoService
        .listAll()
        .pipe(take(1))
        .subscribe((p) => {
          this.produtos = p;
          this.dataSource.data = p
        })
  }

}

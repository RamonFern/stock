import { Component, OnInit } from '@angular/core';
import { DialogReturn } from 'src/app/shared/models/dialog-return';
import { CadastroProdutosComponent } from './dialogs/cadastro-produtos/cadastro-produtos.component';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.css']
})
export class GerenciarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'marca', 'qntdEstoque', 'valorEntrada' , 'valor'];
  dataSource = new MatTableDataSource();

  constructor(public dialog: MatDialog, private produtoService: ProdutoService) {
  }

  ngOnInit() {
    this.listarProdutos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarProdutos() {
    this.produtoService.listAll()
        .pipe(take(1))
        .subscribe((list) => {
          this.dataSource.data = list;
        })
  }

  cadastroProduto(): void {
    const dialogRef = this.dialog.open(CadastroProdutosComponent, {
        width: '1250px',
    });

    dialogRef.afterClosed().subscribe((dialogReturn: DialogReturn) => {
        if (dialogReturn?.hasDataChanged) {
          this.listarProdutos();
        }
    });
  }

}

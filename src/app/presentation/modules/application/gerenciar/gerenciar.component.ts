import { Component, OnInit } from '@angular/core';
import { DialogReturn } from 'src/app/shared/models/dialog-return';
import { CadastroProdutosComponent } from './dialogs/cadastro-produtos/cadastro-produtos.component';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { take } from 'rxjs';
import { ProdutoResponse } from 'src/app/domain/api/application/produto/response/produto-response';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }



// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.css']
})
export class GerenciarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'marca', 'qntdEstoque', 'valor'];
  table = false;
  dataSource!: ProdutoResponse[];

  constructor(public dialog: MatDialog, private produtoService: ProdutoService) {
  }

  ngOnInit() {
    this.listarProdutos();
    // const ELEMENT_DATA: ProdutoResponse[] = [];
  }

  listarProdutos() {
    this.produtoService.listAll()
        .pipe(take(1))
        .subscribe((list) => {
          this.dataSource = list;
          this.table = true;
          console.log(list);
        })
  }

  cadastroProduto(): void {
    const dialogRef = this.dialog.open(CadastroProdutosComponent, {
        width: '950px',

    });

    dialogRef.afterClosed().subscribe((dialogReturn: DialogReturn) => {
        if (dialogReturn?.hasDataChanged) {
          this.listarProdutos();
        }

    });
}

}

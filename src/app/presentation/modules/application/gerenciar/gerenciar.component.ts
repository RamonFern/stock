import { Component, OnInit } from '@angular/core';
import { DialogReturn } from 'src/app/shared/models/dialog-return';
import { CadastroProdutosComponent } from './dialogs/cadastro-produtos/cadastro-produtos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.css']
})
export class GerenciarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  cadastroProduto(): void {
    const dialogRef = this.dialog.open(CadastroProdutosComponent, {
        width: '550px',

    });

    dialogRef.afterClosed().subscribe((dialogReturn: DialogReturn) => {
        if (dialogReturn?.hasDataChanged) {
        }

    });
}

}

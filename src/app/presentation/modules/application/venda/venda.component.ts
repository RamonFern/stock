import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogReturn } from 'src/app/shared/models/dialog-return';
import { CriarVendaComponent } from './dialogs/criar-venda/criar-venda.component';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  criarVenda(): void {
    const dialogRef = this.dialog.open(CriarVendaComponent, {
        width: '100%',

    });

    dialogRef.afterClosed().subscribe((dialogReturn: DialogReturn) => {
        if (dialogReturn?.hasDataChanged) {
          //this.listarProdutos();
        }
    });
  }
}

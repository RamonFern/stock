import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { CreateProdutoRequest } from 'src/app/domain/api/application/produto/request/create-produto-request';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { DialogReturn } from 'src/app/shared/models/dialog-return';


@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    qntdEstoque : new FormControl(0, Validators.required),
    valorUnidade: new FormControl(0, Validators.required),
  })

  constructor(private produtoService: ProdutoService,
              private notification: MatSnackBar,
              public dialogRef: MatDialogRef<CadastroProdutosComponent>,) { }

  ngOnInit() {
  }

  create() {
    if(this.form.valid) {
      const request: CreateProdutoRequest = {
        nome: this.form.controls['nome'].value,
        marca: this.form.controls['marca'].value,
        qntdEstoque: this.form.controls['qntdEstoque'].value,
        valor: this.form.controls['valorUnidade'].value
      };
      this.produtoService
          .salvarProduto(request)
          .pipe(take(1))
          .subscribe((produto) => {
            const dialogReturn: DialogReturn = { hasDataChanged: true };
            this.dialogRef.close(dialogReturn);
            this.notification.open('Salvo com sucesso!', 'Sucesso', { duration: 3000 });
          })
    } else {
      this.notification.open('Informe todos os campos!', 'Erro', { duration: 3000 });
    }
  }

}

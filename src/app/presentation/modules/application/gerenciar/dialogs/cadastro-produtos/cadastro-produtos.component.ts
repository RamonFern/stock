import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;
  porcento = 25;
  porc = false;

  constructor(private produtoService: ProdutoService,
              private notification: MatSnackBar,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<CadastroProdutosComponent>,) {
                this.form = this.fb.group({
                  nome: new FormControl(null, Validators.required),
                  marca: new FormControl(null, Validators.required),
                  qntdEstoque : new FormControl(null, Validators.required),
                  valorEntrada: new FormControl(null, Validators.required),
                  valorUnidade: new FormControl(null, Validators.required),
                });

                this.form.get('valorEntrada')?.valueChanges.subscribe(() => {
                  this.atualizarValorUnidade();
                })
              }

  ngOnInit() {
  }

  valorDaPorcentagem() {
    this.porc = true;
    console.log(this.porcento);
  }

  atualizarValorUnidade() {
    const valorEntrada = this.form.get('valorEntrada')?.value;
    const porcento = this.porcentagemParaDecimal(this.porcento);  //0.25; // 25%, ajuste conforme necessário
    const novoValorUnidade = valorEntrada * (1 + porcento);

    // Atualize o valor do campo "valorUnidade"
    this.form.get('valorUnidade')?.patchValue(novoValorUnidade.toFixed(2), { emitEvent: false });
  }

  porcentagemParaDecimal(porcentagem: number) {
    if (porcentagem < 0 ) {
        throw new Error('Porcentagem inválida.');
    }
    // Converte a porcentagem para um número decimal dividindo por 100
    const decimal = porcentagem / 100;
    return decimal;
  }

  create() {
    if(this.form.valid) {
      const request: CreateProdutoRequest = {
        nome: this.form.controls['nome'].value,
        marca: this.form.controls['marca'].value,
        qntdestoque: this.form.controls['qntdEstoque'].value,
        valorentrada: this.form.controls['valorEntrada'].value,
        valor: this.form.controls['valorUnidade'].value,
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

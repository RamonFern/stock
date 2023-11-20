import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ProdutoResponse } from 'src/app/domain/api/application/produto/response/produto-response';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { DialogReturn } from 'src/app/shared/models/dialog-return';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  form: FormGroup;
  produtoRecebido!: ProdutoResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProdutoResponse,
              private produtoService: ProdutoService,
              private notification: MatSnackBar,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditarProdutoComponent>,) {
                this.form = this.fb.group({
                  id: new FormControl(data.id),
                  nome: new FormControl(data.nome, Validators.required),
                  marca: new FormControl(data.marca, Validators.required),
                  qntdEstoque : new FormControl(data.qntdEstoque, Validators.required),
                  valorEntrada: new FormControl(data.valorEntrada, Validators.required),
                  valorUnidade: new FormControl(data.valor, Validators.required),
                });

                this.form.get('valorEntrada')?.valueChanges.subscribe(() => {
                  this.atualizarValorUnidade();
                }) }

  ngOnInit() {
    this.produtoRecebido = this.data;
  }

  atualizarValorUnidade() {
    const valorEntrada = this.form.get('valorEntrada')?.value;
    const porcento = 0.25; // 25%, ajuste conforme necessário
    const novoValorUnidade = valorEntrada * (1 + porcento);

    this.form.get('valorUnidade')?.patchValue(novoValorUnidade.toFixed(2), { emitEvent: false });
  }

  atualizar() {
    if(this.form.valid) {
      const request: ProdutoResponse = {
        id: this.form.controls['id'].value,
        nome: this.form.controls['nome'].value,
        marca: this.form.controls['marca'].value,
        qntdEstoque: this.form.controls['qntdEstoque'].value,
        valorEntrada: this.form.controls['valorEntrada'].value,
        valor: this.form.controls['valorUnidade'].value,
      };
      console.log(request);
      const id = this.produtoRecebido.id;
      this.produtoService.update(request, id)
          .pipe(take(1))
          .subscribe(() => {
            const dialogReturn: DialogReturn = { hasDataChanged: true };
            this.dialogRef.close(dialogReturn);
            this.notification.open('Atualizado com sucesso!', 'Sucesso', { duration: 3000 });

          })
    } else {
      this.notification.open('Informe todos os campos!', 'Erro', { duration: 3000 });
    }
  }

}

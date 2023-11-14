import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs';
import { VendaResponse } from 'src/app/domain/api/application/venda/response/venda-response';
import { DialogReturn } from 'src/app/shared/models/dialog-return';

@Component({
  selector: 'app-aumentar-quantidade',
  templateUrl: './aumentar-quantidade.component.html',
  styleUrls: ['./aumentar-quantidade.component.css']
})
export class AumentarQuantidadeComponent implements OnInit {
  venda!: VendaResponse;
  respostaSim = false;

  formQuantidade: FormGroup;
  // formQuantidade = new FormGroup({
  //   quantidade: new FormControl(null, Validators.required),
  //   total: new FormControl(null, Validators.required),
  // })
  constructor(private notification: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: VendaResponse,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AumentarQuantidadeComponent>) {
                this.formQuantidade = this.fb.group({
                  quantidade: new FormControl(this.data.quantidade),
                  total: new FormControl(null, Validators.required),
                })

                this.formQuantidade.valueChanges
                  .pipe(
                    debounceTime(800))
                  .subscribe((values) => {
                    const qtd = values.quantidade;
                    const valorUnidade: number = this.data.valorunidade;
                    const total = qtd * valorUnidade;
                    this.formQuantidade.get('total')?.setValue(total);
                    //this.form.get('total')?.setValue(quantidade * preco);
                  })
              }

  ngOnInit() {
    this.venda = this.data;
    this.formQuantidade.controls['quantidade'].setValue(this.venda.quantidade);
    this.formQuantidade.controls['total'].setValue(this.venda.total);

    console.log(this.data);
  }

  enviar() {
    // console.log(this.data);
    this.venda.quantidade = this.formQuantidade.controls['quantidade'].value;
    this.venda.total = this.formQuantidade.controls['total'].value;
    const dialogReturn: DialogReturn = { hasDataChanged: true, dataChanged: this.venda };
    this.dialogRef.close(dialogReturn);
  }

  sim() {
    this.respostaSim = !this.respostaSim;
    // const dialogReturn: DialogReturn = { hasDataChanged: true };
    // this.dialogRef.close(dialogReturn);
    // this.notification.open('Salvo com sucesso!', 'Sucesso', { duration: 3000 });
  }

}

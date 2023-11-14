import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogReturn } from 'src/app/shared/models/dialog-return';

@Component({
  selector: 'app-aumentar-quantidade',
  templateUrl: './aumentar-quantidade.component.html',
  styleUrls: ['./aumentar-quantidade.component.css']
})
export class AumentarQuantidadeComponent implements OnInit {
  // vendas: VendaResponse[] = [];
  respostaSim = false;

  formQuantidade: FormGroup;
  constructor(private notification: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AumentarQuantidadeComponent>) {
                this.formQuantidade = this.fb.group({
                  quantidade: new FormControl(0),
                })
              }

  ngOnInit() {
    console.log(this.data);
  }

  enviar() {
    // console.log(this.data);
    const dialogReturn: DialogReturn = { hasDataChanged: true };
    this.dialogRef.close(dialogReturn);
  }

  sim() {
    this.respostaSim = !this.respostaSim;
    // const dialogReturn: DialogReturn = { hasDataChanged: true };
    // this.dialogRef.close(dialogReturn);
    // this.notification.open('Salvo com sucesso!', 'Sucesso', { duration: 3000 });
  }

}

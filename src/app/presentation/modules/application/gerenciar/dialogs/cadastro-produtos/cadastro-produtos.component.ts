import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  form = new FormGroup({
    nomeDoProduto: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    quantidade : new FormControl(0, Validators.required),
    valorUnidade: new FormControl(0, Validators.required),
  })

  constructor() { }

  ngOnInit() {
  }

  create() {
    console.log(this.form);
  }

}

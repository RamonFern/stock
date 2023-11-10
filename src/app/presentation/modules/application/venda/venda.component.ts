import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoResponse } from 'src/app/domain/api/application/produto/response/produto-response';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { debounceTime, take } from 'rxjs';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateVendaRequest } from 'src/app/domain/api/application/venda/request/venda-request';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'marca', 'qntdEstoque', 'valor'];
  dataSource = new MatTableDataSource();

  clickedRows: CreateVendaRequest[] = [];

  produtos: ProdutoResponse[] = [];
  produto!: ProdutoResponse;

  @ViewChild('input') input!: ElementRef;

  botoes = true;
  finalizar = true;
  formPesquisa: FormGroup;
  form: FormGroup;
  formTotais: FormGroup;
  total!: number;

  // dataHora: moment()

  constructor(private produtoService: ProdutoService,
              public dialog: MatDialog, private fb: FormBuilder) {
                this.formPesquisa = this.fb.group({
                  pesquisa: new FormControl(''),
                })

                this.formTotais = this.fb.group({
                  totalGeral: new FormControl(0),
                  desconto: new FormControl(0),
                  subtotal: new FormControl(0),
                  valorRecebido: new FormControl(0),
                  troco: new FormControl(0)
                })

                this.form = this.fb.group({
                  id: new FormControl(0, Validators.required),
                  numeronota: new FormControl(0, Validators.required),
                  descricao: new FormControl('', Validators.required),
                  quantidade : new FormControl(0, Validators.required),
                  preco: new FormControl(0, Validators.required),
                  total: new FormControl(0, Validators.required),
                })

                this.form.valueChanges
                  .pipe(
                    debounceTime(800))
                  .subscribe((values) => {
                  const quantidade = values.quantidade;
                  const preco = values.preco;

                  this.form.get('total')?.setValue(quantidade * preco);
                  this.total = this.somarTotais(this.clickedRows);
                  this.formTotais.get('totalGeral')?.setValue(this.total);

                })
              }

  ngOnInit() {
    this.buscarProdutos();
  }

  somarTotais(lista: CreateVendaRequest[]): number {
    return lista.reduce((total, venda) => total + venda.total, 0);
  }

  finalizarCancelarVenda() {
    this.finalizar = !this.finalizar;
  }

  criarVenda() {
    this.botoes = !this.botoes;
  }

  addProdutoNaNota(prod: ProdutoResponse) {
    this.produto = prod;
    // console.log(prod);
    const desc = this.produto.nome +', '+ this.produto.marca;
    this.form.controls['id'].setValue(this.produto.id);
    this.form.controls['numeronota'].setValue(1111);
    this.form.controls['descricao'].setValue(desc);
    this.form.controls['quantidade'].setValue(1);
    this.form.controls['preco'].setValue(this.produto.valor);
    // const total = prod.qntdEstoque * prod.valor;
    this.form.controls['total'].setValue(this.produto.valor);
    // console.log(this.form);
    this.removerObjeto(prod, this.produtos);
    this.dataSource.data = this.produtos;
    // this.produto
    // console.log(event);
  }

  enviarParaNota() {
    // console.log(this.form);
    const vendaRequest: CreateVendaRequest = {
      numeronota: this.form.controls['numeronota'].value,
      idProduto: this.form.controls['id'].value,
      nomeproduto: this.form.controls['descricao'].value,
      valorunidade: this.form.controls['preco'].value,
      quantidade: this.form.controls['quantidade'].value,
      desconto: 0,
      total: this.form.controls['total'].value,
      status: 'PENDENTE',
      dataVenda: moment().locale('pt').toLocaleString(),
    }
    console.log(vendaRequest);
    this.clickedRows.push(vendaRequest);
    this.zerarProduto();
    this.clearInput();
  }

  clearInput() {
    this.formPesquisa.reset();
    // this.input.nativeElement.value = ''; // Define o valor do input como vazio
    // this.buscarProdutos();
  }

  zerarProduto() {
    const valorPadraoProduto: ProdutoResponse = {
      id: 0,
      nome: '',
      marca: '',
      qntdEstoque: 0,
      valor: 0
    }
    this.produto = valorPadraoProduto;
    this.form.reset();
  }

  removerObjeto(produto: ProdutoResponse, produtos: ProdutoResponse[]) {
    const index = produtos.indexOf(produto);
    if (index !== -1) {
      produtos.splice(index, 1);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  buscarProdutos() {
    this.produtoService
        .listAll()
        .pipe(take(1))
        .subscribe((p) => {
          this.produtos = p;
          this.dataSource.data = p
        })
  }

}

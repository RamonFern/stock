import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoResponse } from 'src/app/domain/api/application/produto/response/produto-response';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { take } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'marca', 'qntdEstoque', 'valor'];
  dataSource = new MatTableDataSource();

  clickedRows: ProdutoResponse[] = [];

  produtos: ProdutoResponse[] = [];
  produto!: ProdutoResponse;

  @ViewChild('input') input!: ElementRef;

  botoes = true;
  formPesquisa: FormGroup;
  form: FormGroup;

  constructor(private produtoService: ProdutoService,
              public dialog: MatDialog, private fb: FormBuilder) {
                this.formPesquisa = this.fb.group({
                  pesquisa: new FormControl(''),
                })
                this.form = this.fb.group({
                  descricao: new FormControl('', Validators.required),
                  quantidade : new FormControl(0, Validators.required),
                  preco: new FormControl(0, Validators.required),
                  total: new FormControl(0, Validators.required),
                })

                this.form.valueChanges.subscribe((values) => {
                  const quantidade = values.quantidade;
                  const preco = values.preco;

                  this.form.get('total')?.setValue(quantidade * preco);
                })
              }



  ngOnInit() {
    this.buscarProdutos();
  }

  criarVenda() {
    this.botoes = !this.botoes;
  }

  addProdutoNaNota(prod: ProdutoResponse) {
    this.produto = prod;
    console.log(prod);
    const desc = this.produto.nome +', '+ this.produto.marca;
    this.form.controls['descricao'].setValue(desc);
    this.form.controls['quantidade'].setValue(1);
    this.form.controls['preco'].setValue(this.produto.valor);
    // const total = prod.qntdEstoque * prod.valor;
    this.form.controls['total'].setValue(this.produto.valor);
    this.removerObjeto(prod, this.produtos);
    this.dataSource.data = this.produtos;
    // console.log(event);
  }

  enviarParaNota() {
    this.clickedRows.push(this.produto);
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

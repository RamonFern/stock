import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoResponse } from 'src/app/domain/api/application/produto/response/produto-response';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { debounceTime, take } from 'rxjs';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateVendaRequest } from 'src/app/domain/api/application/venda/request/venda-request';
import { DialogReturn } from 'src/app/shared/models/dialog-return';
import { AumentarQuantidadeComponent } from './dialogs/aumentar-quantidade/aumentar-quantidade.component';

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
  @ViewChild('qtd') qtd!: ElementRef;

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

                this.formTotais.get('desconto')?.disable();
                this.formTotais.get('subtotal')?.disable();
                this.formTotais.get('troco')?.disable();

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

                  this.form.get('id')?.disable();
                  // this.form.get('preco')?.disable();
                  // this.form.get('total')?.disable();
                  this.form.get('descricao')?.disable();
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
        var vendas = this.clickedRows.filter((v) => v.idProduto === this.produto.id)
        if(vendas.length) {
          const dialogRef = this.dialog.open(AumentarQuantidadeComponent, {
            width: '450px',
            data: vendas[0],//CONTINUAR RESOLVENDO AQUI ENVIA OU NÃO A VENDA PARA O DIALOG
          });

          dialogRef.afterClosed().subscribe((dialogReturn: DialogReturn) => {
            if (dialogReturn?.hasDataChanged) {
              this.qtd.nativeElement.focus();
            }
          });
        }

        console.log(vendas);
        const desc = this.produto.nome +', '+ this.produto.marca;
        this.form.controls['id'].setValue(this.produto.id);
        this.form.controls['numeronota'].setValue(1111);
        this.form.controls['descricao'].setValue(desc);
        this.form.controls['quantidade'].setValue(1);
        this.form.controls['preco'].setValue(this.produto.valor);
        this.form.controls['total'].setValue(this.produto.valor);
        this.removerObjeto(prod, this.produtos);
        this.dataSource.data = this.produtos;
      //}
   // })
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
      formaPag: 'DINHEIRO',
      dataVenda: moment().locale('pt').toLocaleString(),
    }
    console.log(vendaRequest);
    this.clickedRows.push(vendaRequest);
    this.zerarProduto();
    // this.clearInput();
  }

  zerarProduto() {
    // this.formPesquisa.controls['pesquisa'].setValue('');
    const valorPadraoProduto: ProdutoResponse = {
      id: 0,
      nome: '',
      marca: '',
      qntdEstoque: 0,
      valor: 0
    }
    this.produto = valorPadraoProduto;
    this.form.reset();
    this.buscarProdutos();
    this.filtrarProdutosExistentesNaNota();
  }

  filtrarProdutosExistentesNaNota() {
    this.clickedRows.forEach((prod) => {
      this.produtos.forEach((p) => {
        const index = this.produtos.indexOf(p);
        prod.idProduto === p.id ? this.produtos.splice(index, 1) : null ;
      })
    })
    this.dataSource.data = this.produtos;
    console.log(this.clickedRows);
    console.log(this.produtos);
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

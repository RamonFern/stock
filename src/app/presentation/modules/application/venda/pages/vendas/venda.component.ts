import { VendaFiltradas, VendaResponse } from 'src/app/domain/api/application/venda/response/venda-response';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoResponse } from 'src/app/domain/api/application/produto/response/produto-response';
import { ProdutoService } from 'src/app/domain/api/application/produto/service/produto.service';
import { debounceTime, take } from 'rxjs';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateVendaRequest } from 'src/app/domain/api/application/venda/request/venda-request';
import { DialogReturn } from 'src/app/shared/models/dialog-return';
import { VendaService } from 'src/app/domain/api/application/venda/service/venda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AumentarQuantidadeComponent } from '../../dialogs/aumentar-quantidade/aumentar-quantidade.component';


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
  vendas: VendaResponse[] = []
  vendasFiltradas: VendaFiltradas[] = []
  numeroNota!: number;

  @ViewChild('input') input!: ElementRef;
  @ViewChild('qtd') qtd!: ElementRef;
  @ViewChild('valorRecebido') valorRecebido!: ElementRef;

  botoes = true;
  finalizar = true;
  formPesquisa: FormGroup;
  form: FormGroup;
  formTotais: FormGroup;
  total!: number;
  panelOpenState = false;
  todasVendas: VendaFiltradas[] = [];


  // dataHora: moment()

  constructor(private produtoService: ProdutoService,
              private notification: MatSnackBar,
              private vendaService: VendaService,
              public dialog: MatDialog, private fb: FormBuilder) {
                this.formPesquisa = this.fb.group({
                  pesquisa: new FormControl(''),
                })

                this.formTotais = this.fb.group({
                  totalGeral: new FormControl(null),
                  desconto: new FormControl(0),
                  subtotal: new FormControl(0),
                  valorRecebido: new FormControl(null),
                  troco: new FormControl(null)
                })

                this.formTotais.get('desconto')?.disable();
                this.formTotais.get('subtotal')?.disable();
                this.formTotais.get('troco')?.disable();

                this.formTotais.valueChanges
                  .pipe(
                    debounceTime(500))
                  .subscribe((values) => {
                    const valorRecebido = values.valorRecebido;
                    const total = values.totalGeral;
                    const troco = valorRecebido - total;
                    this.formTotais.get('troco')?.setValue(troco.toFixed(2));
                    //this.form.get('total')?.setValue(quantidade * preco);
                  })

                this.form = this.fb.group({
                  id: new FormControl(null, Validators.required),
                  numeronota: new FormControl(null, Validators.required),
                  descricao: new FormControl(null, Validators.required),
                  quantidade : new FormControl(null, Validators.required),
                  preco: new FormControl(null, Validators.required),
                  total: new FormControl(null, Validators.required),
                })

                this.form.valueChanges
                  .pipe(
                    debounceTime(800))
                  .subscribe((values) => {
                  const quantidade = values.quantidade;
                  const preco = values.preco;
                  const total = quantidade * preco
                  // this.form.get('preco')?.setValue(preco.toFixed(2));
                  this.form.get('total')?.setValue(total);
                  this.total = this.somarTotais(this.clickedRows);
                  // const totalGeral = this.total
                  this.formTotais.get('totalGeral')?.setValue(this.total);
                  this.form.get('id')?.disable();
                  this.form.get('descricao')?.disable();
                })
              }

  ngOnInit() {
    this.buscarProdutos();
    this.buscarVendas();

  }

  salvarVenda() {
    this.clickedRows.forEach((venda) => {
      this.vendaService.createVenda(venda)
          .pipe(take(1))
          .subscribe((v) => {
            // console.log(v);
            this.buscarProdutoPorId(v)
          })
    })
    this.notification.open('Venda realizada com sucesso!', 'Sucesso', { duration: 3000 });
  }

  buscarProdutoPorId(venda: VendaResponse) {
    this.produtoService.buscarPorId(venda.idproduto)
        .pipe(take(1))
        .subscribe((v) => {
          v.qntdestoque = v.qntdestoque - venda.quantidade;
          this.atualizarQntdStock(v, v.id);
        })
  }

  atualizarQntdStock(vendido: ProdutoResponse, id: number) {
    this.produtoService.update(vendido, id)
        .pipe(take(1))
        .subscribe(() => {})

  }

  somarTotais(lista: CreateVendaRequest[]): number {
    return lista.reduce((total, venda) => total + venda.total, 0);
  }

  finalizarCancelarVenda() {
    this.finalizar = !this.finalizar;
  }

  proximo() {
    this.finalizar = !this.finalizar;
    this.valorRecebido.nativeElement.focus();
  }

  criarVenda() {
    this.botoes = !this.botoes;
    this.buscarProdutos();
    this.buscarTodasVendas();
  }

  buscarTodasVendas() {
    this.vendaService.listAll()
        .pipe(take(1))
        .subscribe((v) => {
          this.todasVendas = this.filtrarVendasPeloNumeroNota(v);
          this.numeroNota = this.todasVendas[this.todasVendas.length - 1].numeronota;
        })
  }

  buscarVendas() {
    this.vendaService.listAllToDay()
        .pipe(take(1))
        .subscribe((v) => {
          this.vendas = v;
          this.filtrarVendasPeloNumeroNota(this.vendas);
          // console.log(v);
        })
  }

  filtrarVendasPeloNumeroNota(vendas: VendaResponse[]) {
    this.vendasFiltradas = [];
    vendas.forEach(venda => {
      const vendaFiltradaExistente = this.vendasFiltradas.find(vf => vf.numeronota === venda.numeronota);
      if (!vendaFiltradaExistente) {
        const novaVendaFiltrada: VendaFiltradas = {
          id: venda.id,
          numeronota: venda.numeronota,
          datavenda: venda.datavenda,
          produtos: [{
            id: venda.idproduto,
            nome: venda.nomeproduto,
            qntd: venda.quantidade,
            valorUnidade: venda.valorunidade,
            total: venda.total
          }],
          totalGeral: venda.total
        };
        this.vendasFiltradas.push(novaVendaFiltrada);
      } else {
        vendaFiltradaExistente.produtos.push({
          id: venda.idproduto,
          nome: venda.nomeproduto,
          qntd: venda.quantidade,
          valorUnidade: venda.valorunidade,
          total: venda.total
        });
        vendaFiltradaExistente.totalGeral += venda.total;
      }
    });
    // console.log(this.vendasFiltradas);
    return this.vendasFiltradas;
  }

  addProdutoNaNota(prod: ProdutoResponse) {
    this.produto = prod;
    var vendas = this.clickedRows.filter((v) => v.idproduto === this.produto.id)
    if(vendas.length) {
      const dialogRef = this.dialog.open(AumentarQuantidadeComponent, {
        width: '450px',
        data: vendas[0],
      });

      dialogRef.afterClosed().subscribe((dialogReturn: DialogReturn) => {
        if (dialogReturn?.hasDataChanged) {
          this.qtd.nativeElement.focus();
          this.form.controls['quantidade'].setValue(dialogReturn.dataChanged.quantidade)
          this.zerarProduto();
        }
      });
    }
    if(this.vendas.length > 0) {
      // const ultimaVenda = this.vendas[this.vendas.length -1];
      // const numNota = ultimaVenda.numeronota + 1;
      this.form.controls['numeronota'].setValue(this.numeroNota + 1);///AQUI TEM SOLUÇÃO
    } else {
      this.form.controls['numeronota'].setValue(1);
    }
    console.log(this.numeroNota);

    const desc = this.produto.nome +', '+ this.produto.marca;
    this.form.controls['id'].setValue(this.produto.id);
    this.form.controls['descricao'].setValue(desc);
    this.form.controls['quantidade'].setValue(1);
    // this.qtd.nativeElement.focus();
    this.form.controls['preco'].setValue(this.produto.valor);
    this.form.controls['total'].setValue(this.produto.valor);
    this.removerObjeto(prod, this.produtos);
    this.dataSource.data = this.produtos;
    // this.form.get('quantidade')?.markAsTouched(); //.markAsTouched();
  }

  enviarParaNota() {
    if(this.form.valid) {
      const vendaRequest: CreateVendaRequest = {
        numeronota: this.form.controls['numeronota'].value,
        idproduto: this.form.controls['id'].value,
        nomeproduto: this.form.controls['descricao'].value,
        valorunidade: this.form.controls['preco'].value,
        quantidade: this.form.controls['quantidade'].value,
        desconto: 0,
        total: this.form.controls['total'].value,
        status: 'PENDENTE',
        formapag: 'DINHEIRO',
        // dataVenda: '2023-10-27T10:15:30+01:00',
        // dataVenda: moment().locale('pt').toLocaleString(),
      }
      this.clickedRows.push(vendaRequest);
      this.zerarProduto();
    } else {
      this.notification.open('Existe(m) campo(s) inválido(s)!', 'Erro', { duration: 3000 });
    }
    // PENSAR EM LÓGICA PARA DIMINUIR QUANT DE PRODUTOS COMFORME VENDA MANUTENÇÃO NO ESTOQUE
  }

  fecharVenda() {
    const valorRecebido = this.formTotais.controls['valorRecebido'].value;
    const total = this.formTotais.controls['totalGeral'].value;
    if(valorRecebido < total) {
      this.notification.open('O valor recebido não pode ser menor do que o valor total', 'Erro', { duration: 3000 });
    } else {
      this.salvarVenda();
      this.cancelarVenda();
      this.buscarVendas();
    }
    // console.log(this.clickedRows);
  }

  cancelarVenda() {
    this.form.reset();
    this.formTotais.reset();
    this.formPesquisa.reset();
    this.clickedRows = [];
    this.produtos = [];
    this.vendas = [];
    this.dataSource.data = [];
    // this.vendasFiltradas = [];
    this.finalizar = !this.finalizar;
    this.botoes = true;
    this.buscarVendas();
    // this.zerarProduto();//CONTINUAR AQUI RESOLVENDO CANCELAR VENDA PARA RETORNAR TODOS INPUTS PARA INICIAR NOVA VENDA
    this.buscarProdutos();
  }

  zerarProduto() {
    const valorPadraoProduto: ProdutoResponse = {
      id: 0,
      nome: '',
      marca: '',
      qntdestoque: 0,
      valor: 0,
      valorentrada: 0
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
        prod.idproduto === p.id ? this.produtos.splice(index, 1) : null ;
      })
    })
    this.dataSource.data = this.produtos;
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

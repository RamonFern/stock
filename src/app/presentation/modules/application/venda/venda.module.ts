import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaComponent } from './pages/vendas/venda.component';
import { AumentarQuantidadeComponent } from './dialogs/aumentar-quantidade/aumentar-quantidade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { VendaRoutingModule } from './venda-routing.module';
import { TabVendasComponent } from './pages/vendas/tab-vendas/tab-vendas.component';
import { NotaComponent } from './dialogs/nota/nota.component';



@NgModule({
  declarations: [
    AumentarQuantidadeComponent,
    VendaComponent,
    TabVendasComponent,
    NotaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    VendaRoutingModule
  ]
})
export class VendaModule { }

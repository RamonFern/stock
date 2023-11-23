import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MenuComponent } from './layout/components/menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CadastroProdutosComponent } from './gerenciar/dialogs/cadastro-produtos/cadastro-produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendaComponent } from './venda/venda.component';
import { AumentarQuantidadeComponent } from './venda/dialogs/aumentar-quantidade/aumentar-quantidade.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { EditarProdutoComponent } from './gerenciar/dialogs/editar-produto/editar-produto.component';


@NgModule({
    declarations: [
      MenuComponent,
      LayoutComponent,
      DashboardComponent,
      GerenciarComponent,
      CadastroProdutosComponent,
      VendaComponent,
      AumentarQuantidadeComponent,
      FinanceiroComponent,
      EditarProdutoComponent
    ],
    imports: [
      CommonModule,
      ApplicationRoutingModule,
      MatCardModule,
      MatOptionModule,
      MatDatepickerModule,
      MatDividerModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      MatTableModule,
      MatExpansionModule,
      MatButtonModule,
      MatFormFieldModule,
      MatOptionModule,
      MatInputModule,
      MatSnackBarModule,
      MatOptionModule,
      MatSelectModule,
      MatIconModule
    ],
})
export class ApplicationModule {}

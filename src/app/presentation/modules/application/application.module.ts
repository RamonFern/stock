import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { MatOptionModule } from '@angular/material/core';
import { MenuComponent } from './layout/components/menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CadastroProdutosComponent } from './gerenciar/dialogs/cadastro-produtos/cadastro-produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendaComponent } from './venda/venda.component';
import { CriarVendaComponent } from './venda/dialogs/criar-venda/criar-venda.component';


@NgModule({
    declarations: [
      MenuComponent,
      LayoutComponent,
      DashboardComponent,
      GerenciarComponent,
      CadastroProdutosComponent,
      VendaComponent,
      CriarVendaComponent
    ],
    imports: [
      CommonModule,
      ApplicationRoutingModule,
      MatOptionModule,
      FormsModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatTableModule,
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

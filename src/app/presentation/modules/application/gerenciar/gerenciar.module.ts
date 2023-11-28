import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarRoutingModule } from './gerenciar-routing.module';
import { GerenciarComponent } from './pages/gerenciar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroProdutosComponent } from './dialogs/cadastro-produtos/cadastro-produtos.component';
import { EditarProdutoComponent } from './dialogs/editar-produto/editar-produto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
      GerenciarComponent,
      CadastroProdutosComponent,
      EditarProdutoComponent

    ],
    imports: [
      CommonModule,
      GerenciarRoutingModule,
      MatTableModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
    ],

})
export class GerenciarModule {}

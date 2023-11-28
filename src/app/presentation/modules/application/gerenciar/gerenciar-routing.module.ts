import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciarComponent } from './pages/gerenciar.component';


const routes: Routes = [
    {
        path: 'estoque',
        component: GerenciarComponent,
        // canActivate: [AuthGuard],
        // data: {
        //     permissao: PermissaoType.ACESSO_PAGINA_CONFIG_ESPECIALIZACOES,
        // },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GerenciarRoutingModule {}

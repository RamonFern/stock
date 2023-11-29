import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendaComponent } from './pages/vendas/venda.component';


const routes: Routes = [
    {
        path: 'vender',
        component: VendaComponent,
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
export class VendaRoutingModule {}

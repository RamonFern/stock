
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { VendaComponent } from './venda/venda.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,

        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                // canActivate: [AuthGuard],
                // canLoad: [AuthGuard],
                // data: {
                //     permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
                // },
            },
            {
              path: 'gerenciar',
              component: GerenciarComponent,
              // canActivate: [AuthGuard],
              // canLoad: [AuthGuard],
              // data: {
              //     permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
              // },
          },
          {
            path: 'vender',
            component: VendaComponent,
            // canActivate: [AuthGuard],
            // canLoad: [AuthGuard],
            // data: {
            //     permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
            // },
          },
          {
            path: 'financeiro',
            component: FinanceiroComponent,
            // canActivate: [AuthGuard],
            // canLoad: [AuthGuard],
            // data: {
            //     permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
            // },
          }
            // { path: 'gerenciar', loadChildren: () => import('./gerenciar/gerenciar.module').then((m) => m.GerenciarModule) },
            // { path: 'atendimento', loadChildren: () => import('./atendimento/atendimento.module').then((m) => m.AtendimentoModule) },
            // { path: 'fechamento', loadChildren: () => import('./fechamento/fechamento.module').then((m) => m.FechamentoModule) },
            // { path: 'financeiro', loadChildren: () => import('./financeiro/financeiro.module').then((m) => m.FinanceiroModule) },
            // { path: 'indicadores', loadChildren: () => import('./indicadores/indicadores.module').then((m) => m.IndicadoresModule) },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    // providers: [AuthGuard],
})
export class ApplicationRoutingModule {}

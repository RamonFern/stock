
import { MenuItem } from './menu-item';

export class AppMenuConfig {
    readonly MENU: MenuItem[] = [
        new MenuItem({
            label: 'Dashboard',
            icon: 'dashboard',
            link: 'dashboard',
            // permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
            // authService: this.authService,
        }),
        new MenuItem({
            label: 'Gerenciar',
            icon: 'settings',
            link: 'gerenciar',
            // authService: this.authService,
        }),
        new MenuItem({
            label: 'Vender',
            icon: 'storefront',
            link: 'vender',
            // authService: this.authService,
        }),
        new MenuItem({
          label: 'Financeiro',
          icon: 'monetization_on',
          link: 'financeiro',
          // authService: this.authService,
          // submenus: [
          //     new MenuItem({
          //         label: 'Bancos',
          //         icon: 'account_balance',
          //         link: 'app/financeiro/banco',
          //         // permissao: PermissaoType.ACESSO_PAGINA_BANCOS,
          //         // authService: this.authService,
          //     }),
          //     new MenuItem({
          //         label: 'Condomínio',
          //         icon: 'currency_exchange',
          //         link: 'app/financeiro/condominio',
          //         // permissao: PermissaoType.ACESSO_PAGINA_CONDOMINIO,
          //         // authService: this.authService,
          //     }),
          //     new MenuItem({
          //         label: 'Contas financeiras',
          //         icon: 'point_of_sale',
          //         link: 'app/financeiro/conta-financeira',
          //         // permissao: PermissaoType.ACESSO_PAGINA_CONTA_FINANCEIRA,
          //         // authService: this.authService,
          //     }),
          // ],
      }),

        new MenuItem({
            label: 'Pessoas',
            icon: 'peoples',
            link: 'pessoas',
            // authService: this.authService,
            submenus: [
                new MenuItem({
                    label: 'Especializações',
                    icon: 'splitscreen',
                    link: 'app/gerenciar/selecionar-config-especializacao',
                    // permissao: PermissaoType.ACESSO_PAGINA_ESPECIALIZACOES,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Tabela de Valores',
                    icon: 'price_check',
                    link: 'app/gerenciar/tabela-de-valores',
                    // permissao: PermissaoType.ACESSO_PAGINA_TABELA_VALORES,
                    // authService: this.authService,
                }),


            ],
        }),
        new MenuItem({
            label: 'Admin',
            icon: 'admin_panel_settings',
            link: '',
            // authService: this.authService,
            // submenus: [],
        }),
    ];

    // constructor(private authService: AuthService) {}
}

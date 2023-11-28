
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
            submenus: [
              new MenuItem({
                  label: 'Estoque',
                  icon: 'splitscreen',
                  link: 'app/gerenciar/estoque',
                  // permissao: PermissaoType.ACESSO_PAGINA_ESPECIALIZACOES,
                  // authService: this.authService,
              }),
              // new MenuItem({
              //     label: 'Tabela de Valores',
              //     icon: 'price_check',
              //     link: 'app/gerenciar/tabela-de-valores',
              //     // permissao: PermissaoType.ACESSO_PAGINA_TABELA_VALORES,
              //     // authService: this.authService,
              // }),


          ],
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

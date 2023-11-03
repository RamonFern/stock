
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

                new MenuItem({
                    label: 'Salas',
                    icon: 'group_work',
                    link: 'app/gerenciar/config-salas',
                    // permissao: PermissaoType.ACESSO_PAGINA_SALAS,
                    // authService: this.authService,
                }),

                new MenuItem({
                    label: 'Ambientes terapêuticos',
                    icon: 'extension',
                    link: 'app/gerenciar/ambientes-terapeuticos',
                    // // permissao: PermissaoType.ACESSO_PAGINA_AMBIENTES_LUDICOS,
                    // authService: this.authService,
                }),

                new MenuItem({
                    label: 'Unidades Clínicas',
                    icon: 'business',
                    link: 'app/gerenciar/unidades-clinicas',
                    // // // permissao: PermissaoType.ACESSO_PAGINA_UNIDADES_CLINICAS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Perfis de acesso',
                    icon: 'portrait',
                    link: 'app/gerenciar/perfil',
                    // // // permissao: PermissaoType.ACESSO_PAGINA_PERFIS_USUARIOS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Empresas',
                    icon: 'business',
                    link: 'app/gerenciar/empresas',
                    // permissao: PermissaoType.ACESSO_PAGINA_EMPRESAS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Responsável paciente',
                    icon: 'person',
                    link: 'app/gerenciar/responsavel',
                    // permissao: PermissaoType.ACESSO_PAGINA_RESPONSAVEIS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Parceiros',
                    icon: 'people',
                    link: 'app/gerenciar/parceiro',
                    // permissao: PermissaoType.ACESSO_PAGINA_PARCEIROS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Colaboradores',
                    icon: 'people',
                    link: 'app/gerenciar/colaboradores',
                    // permissao: PermissaoType.ACESSO_PAGINA_COLABORADORES,
                    // authService: this.authService,
                }),
            ],
        }),
        new MenuItem({
            label: 'Financeiro',
            icon: 'monetization_on',
            link: '',
            // authService: this.authService,
            submenus: [
                new MenuItem({
                    label: 'Bancos',
                    icon: 'account_balance',
                    link: 'app/financeiro/banco',
                    // permissao: PermissaoType.ACESSO_PAGINA_BANCOS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Condomínio',
                    icon: 'currency_exchange',
                    link: 'app/financeiro/condominio',
                    // permissao: PermissaoType.ACESSO_PAGINA_CONDOMINIO,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Contas financeiras',
                    icon: 'point_of_sale',
                    link: 'app/financeiro/conta-financeira',
                    // permissao: PermissaoType.ACESSO_PAGINA_CONTA_FINANCEIRA,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Contas a pagar',
                    icon: 'vertical_align_top',
                    link: 'app/financeiro/contas-a-pagar',
                    // permissao: PermissaoType.ACESSO_PAGINA_CONTAS_A_PAGAR,
                    // authService: this.authService,
                }),

                new MenuItem({
                    label: 'Contas a receber',
                    icon: 'vertical_align_bottom',
                    link: 'app/financeiro/contas-a-receber',
                    // permissao: PermissaoType.ACESSO_PAGINA_CONTAS_A_RECEBER,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'DRE',
                    icon: 'analytics',
                    link: 'app/financeiro/demonstrativo-resultados',
                    // permissao: PermissaoType.ACESSO_PAGINA_DEMONSTRATIVO_RESULTADOS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Fluxo de caixa',
                    icon: 'query_stats',
                    link: 'app/financeiro/fluxo-de-caixa',
                    // permissao: PermissaoType.ACESSO_PAGINA_FLUXO_DE_CAIXA,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Minhas caixinhas',
                    icon: 'savings',
                    link: 'app/financeiro/minhas-caixinhas',
                    // permissao: PermissaoType.ACESSO_PAGINA_MINHAS_CAIXINHAS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Títulos a pagar',
                    // icon: 'comment_bank',
                    icon: 'outbox',
                    link: 'app/financeiro/titulos-pagar',
                    // permissao: PermissaoType.ACESSO_PAGINA_TITULOS_A_PAGAR,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Títulos a receber',
                    icon: 'move_to_inbox',
                    link: 'app/financeiro/titulos-receber',
                    // permissao: PermissaoType.ACESSO_PAGINA_TITULOS_A_RECEBER,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Plano de contas',
                    icon: 'account_balance_wallet',
                    link: 'app/financeiro/plano-de-contas',
                    // permissao: PermissaoType.ACESSO_PAGINA_PLANO_DE_CONTAS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Saldo geral',
                    icon: 'calculate',
                    link: 'app/financeiro/saldo-geral-pacientes',
                    // permissao: PermissaoType.ACESSO_SALDO_GERAL_PACIENTES,
                    // authService: this.authService,
                }),
            ],
        }),
        new MenuItem({
            label: 'Indicadores',
            icon: 'trending_up',
            link: '',
            // authService: this.authService,
            submenus: [
                new MenuItem({
                    label: 'Indicadores Terapeutas',
                    icon: 'person_search',
                    link: 'app/indicadores/indicadores-terapeutas',
                    // permissao: PermissaoType.ACESSO_PAGINA_INDICADORES_TERAPEUTAS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Indicadores Pacientes',
                    icon: 'person_search',
                    link: 'app/indicadores/indicadores-pacientes-por-terapeutas',
                    // permissao: PermissaoType.ACESSO_PAGINA_INDICADORES_PACIENTES_POR_TERAPEUTAS,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Controle de horas',
                    icon: 'alarm',
                    link: 'app/indicadores/controle-de-horas',
                    // permissao: PermissaoType.ACESSO_PAGINA_CONTROLE_DE_HORAS,
                    // authService: this.authService,
                }),
            ],
        }),
        new MenuItem({
            label: 'Calendário',
            icon: 'calendar_today',
            link: '',
            // permissao: PermissaoType.CALENDARIO,
            // authService: this.authService,
            submenus: [],
        }),
        new MenuItem({
            label: 'Mídia',
            icon: 'perm_media',
            link: '',
            // authService: this.authService,
            // submenus: [],
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

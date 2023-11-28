

export class MenuItem {
    label!: string;
    icon!: string;
    link?: string;
    submenus?: MenuItem[];
   // permissao?: PermissaoType;
    permitido: boolean = true;
    //authService!: AuthService;

    public constructor(init?: Partial<MenuItem>) {
        Object.assign(this, init);
    }

    get mostrar() {
        if (this.submenus?.some((s) => s.permitido && this.getPermitidoAcessar(s.permitido))) {
            return true;
        }
        if (this.permitido) {
            return this.getPermitidoAcessar(this.permitido);
        }
        return false;
    }

    private getPermitidoAcessar(permissao: boolean) {
        return true;
    }
}

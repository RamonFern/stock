import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    // dashboardEnum: Record<string, any> = Dashboard;
    formLogin = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    loading = true;

    constructor(
        // private loginService: LoginService,
        // private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        // private pacienteService: PacienteService
    ) {}

    ngOnInit(): void {
        // if (this.authService.isRefreshTokenValid()) {
        //     setTimeout(() => {
        //         const usuarioLogado = JSON.parse(localStorage.getItem('currentUser')!);
        //         this.router.navigate([this.dashboardEnum[usuarioLogado.dashboardPadrao]]);
        //     }, 1000);
        // } else {
        //     this.loading = false;
        // }
    }

    login() {
        const loginResquest = {
            login: this.formLogin.controls['login'].value,
            password: this.formLogin.controls['password'].value,
        };
        if (!this.formLogin.invalid) {
          this.router.navigate(['app']);
        } else {
          this.snackBar.open('Erro', 'Login e/ou senha incorretos', { duration: 5000 });
        }
        // if (!this.formLogin.invalid) {
        //     this.loginService.realizarLogin(loginResquest).subscribe(
        //         (response) => {
        //             const dashboardUsuario = response?.body?.user?.dashboardPadrao;

        //             if (!dashboardUsuario) {
        //                 this.snackBar.open('Erro', 'Seu usuário está com dados inconsistentes.');
        //                 return;
        //             }
        //             this.router.navigate([this.dashboardEnum[dashboardUsuario]]);
        //         },
        //         (responseError: HttpErrorResponse) => {
        //             this.snackBar.open('Erro', 'Login e/ou senha incorretos', { duration: 5000 });
        //         }
        //     );
        // }
    }
}

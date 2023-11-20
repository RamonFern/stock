import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./presentation/modules/application/application.module').then((m) => m.ApplicationModule),
    // canLoad: [AuthGuard],
    // data: {
    //     persona: 'Colaborador'
    // }
  },
  {
    path: 'login',
    loadChildren: () => import('./presentation/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/main/pages/home/home.component';
import { LoginComponent } from './modules/main/pages/login/login.component';
import { RegisterComponent } from './modules/main/pages/register/register.component';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['customer/home']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/deposits/deposits.module').then(
        (m) => m.DepositsModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/transfers/transfers.module').then(
        (m) => m.TransfersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

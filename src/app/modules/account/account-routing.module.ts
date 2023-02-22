import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { InfoAccountComponent } from './pages/info-account/info-account.component';
import { AccountUserComponent } from './pages/account-user/account-user.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['customer/home']);

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'account/:id', component: InfoAccountComponent },
      { path: 'customer/account', component: AccountUserComponent },
      {
        path: 'customer/create-account/:id',
        component: CreateAccountComponent,
      },
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

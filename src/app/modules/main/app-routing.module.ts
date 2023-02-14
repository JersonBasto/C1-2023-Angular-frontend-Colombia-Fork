import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoAccountComponent } from '../account/pages/info-account/info-account.component';
import { InfoCostumerComponent } from '../user/pages/info-costumer/info-costumer.component';
import { InfoDepositComponent } from './pages/info-deposit/info-deposit.component';
import { InfoTransferComponent } from './pages/info-transfer/info-transfer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdateCostumerComponent } from '../user/pages/update-costumer/update-costumer.component';
import { HomeCustomerComponent } from '../user/pages/home-customer/home-customer.component';
import { AccountUserComponent } from '../account/pages/account-user/account-user.component';

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
    path: 'customer',
    component: InfoCostumerComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'transfer',
    component: InfoTransferComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'deposit',
    component: InfoDepositComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'customer/updateCustomer', component: UpdateCostumerComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'account/:id',
    component: InfoAccountComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/home',
    component: HomeCustomerComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/update/:id',
    component: UpdateCostumerComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/account',
    component: AccountUserComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

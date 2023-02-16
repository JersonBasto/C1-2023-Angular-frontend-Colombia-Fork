import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoAccountComponent } from '../account/pages/info-account/info-account.component';
import { InfoCostumerComponent } from '../user/pages/info-costumer/info-costumer.component';
import { InfoDepositComponent } from '../deposits/pages/info-deposit/info-deposit.component';
import { InfoTransferComponent } from '../transfers/pages/info-transfer/info-transfer.component';
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
import { CreateAccountComponent } from '../account/pages/create-account/create-account.component';
import { CreateDepositComponent } from '../deposits/pages/create-deposit/create-deposit.component';
import { CreateTransferComponent } from '../transfers/pages/create-transfer/create-transfer.component';
import { AllInfoTransferComponent } from '../transfers/pages/all-info-transfer/all-info-transfer.component';
import { TransferHistoryOutcomeComponent } from '../transfers/pages/transfer-history-outcome/transfer-history-outcome.component';
import { TransferHistoryIncomeComponent } from '../transfers/pages/transfer-history-income/transfer-history-income.component';

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
  {
    path: 'customer/create-account/:id',
    component: CreateAccountComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/create-deposit/:id',
    component: CreateDepositComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/create-transfer/:id',
    component: CreateTransferComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/transfer-history/:id',
    component: InfoTransferComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/transfer-info/:id',
    component: AllInfoTransferComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/transfer-history/outcome/:id',
    component: TransferHistoryOutcomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/transfer-history/income/:id',
    component: TransferHistoryIncomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

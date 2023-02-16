import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositsComponent } from './deposits.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { CreateDepositComponent } from './pages/create-deposit/create-deposit.component';
import { DepositHistoryComponent } from './pages/deposit-history/deposit-history.component';
import { DepositAllHistoryComponent } from './pages/deposit-all-history/deposit-all-history.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['customer/home']);
const routes: Routes = [
  { path: '', component: DepositsComponent },

  {
    path: 'customer/create-deposit/:id',
    component: CreateDepositComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customer/deposit-history/:id',
    component: DepositHistoryComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'customer/deposit-all',
    component: DepositAllHistoryComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositsRoutingModule {}

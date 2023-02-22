import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersComponent } from './transfers.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { CreateTransferComponent } from './pages/create-transfer/create-transfer.component';
import { InfoTransferComponent } from './pages/info-transfer/info-transfer.component';
import { AllInfoTransferComponent } from './pages/all-info-transfer/all-info-transfer.component';
import { TransferHistoryOutcomeComponent } from './pages/transfer-history-outcome/transfer-history-outcome.component';
import { TransferHistoryIncomeComponent } from './pages/transfer-history-income/transfer-history-income.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['customer/home']);

const routes: Routes = [
  {
    path: '',
    component: TransfersComponent,
    children: [
      {
        path: 'customer/create-transfer/:id',
        component: CreateTransferComponent,
      },
      {
        path: 'customer/transfer-history/:id',
        component: InfoTransferComponent,
      },
      {
        path: 'customer/transfer-info/:id',
        component: AllInfoTransferComponent,
      },
      {
        path: 'customer/transfer-history/outcome/:id',
        component: TransferHistoryOutcomeComponent,
      },
      {
        path: 'customer/transfer-history/income/:id',
        component: TransferHistoryIncomeComponent,
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
export class TransfersRoutingModule {}

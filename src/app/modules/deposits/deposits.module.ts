import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { AppModule } from '../../app.module';
import { DepositAllHistoryComponent } from './pages/deposit-all-history/deposit-all-history.component';

@NgModule({
  declarations: [DepositsComponent],
  imports: [CommonModule, DepositsRoutingModule],
})
export class DepositsModule {}

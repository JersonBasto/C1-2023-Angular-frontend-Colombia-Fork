import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { CustomPipeDataPipe } from '../main/pipes/custom-pipe-data/custom-pipe-data.pipe';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}

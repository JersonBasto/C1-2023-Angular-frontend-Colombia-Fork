import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { CustomPipeDataPipe } from '../main/pipes/custom-pipe-data/custom-pipe-data.pipe';

@NgModule({
  declarations: [UserComponent, HomeComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}

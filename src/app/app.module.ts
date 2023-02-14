import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/main/app-routing.module';
import { AppComponent } from './modules/main/app.component';
import {
  HeroesComponent,
  DashboardComponent,
  MessagesComponent,
  HeroDetailComponent,
} from './modules/main/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PruebaPipeComponent } from './modules/main/components/prueba-pipe/prueba-pipe.component';
import { CustomPipeMomentjsPipe } from './modules/main/pipes/custom-pipe-momentjs/custom-pipe-momentjs.pipe';
import { CustomPipePhonePipe } from './modules/main/pipes/custom-pipe-phone/custom-pipe-phone.pipe';
import { CustomPipeDataPipe } from './modules/main/pipes/custom-pipe-data/custom-pipe-data.pipe';
import { HomeComponent } from './modules/main/pages/home/home.component';
import { LoginComponent } from './modules/main/pages/login/login.component';
import { RegisterComponent } from './modules/main/pages/register/register.component';
import { AccountComponent } from './modules/account/pages/account/account.component';
import { CreateAccountComponent } from './modules/account/pages/create-account/create-account.component';
import { UpdateAccountComponent } from './modules/account/pages/update-account/update-account.component';
import { UpdateCostumerComponent } from './modules/user/pages/update-costumer/update-costumer.component';
import { CreateDepositComponent } from './modules/main/pages/create-deposit/create-deposit.component';
import { CreateTransferComponent } from './modules/main/pages/create-transfer/create-transfer.component';
import { InfoCostumerComponent } from './modules/user/pages/info-costumer/info-costumer.component';
import { InfoDepositComponent } from './modules/main/pages/info-deposit/info-deposit.component';
import { InfoTransferComponent } from './modules/main/pages/info-transfer/info-transfer.component';
import { HeaderComponent } from './modules/main/components/header/header.component';
import { HeaderAfterLoginComponent } from './modules/main/components/header-after-login/header-after-login.component';
import { FooterComponent } from './modules/main/components/footer/footer.component';
import { NavInfoCustomerComponent } from './modules/main/components/nav-info-customer/nav-info-customer.component';
import { ServiceUserService } from './modules/user/services/user-service/service-user.service';
import { ServiceAccountService } from './modules/account/services/account-service/service-account.service';
import { InfoAccountComponent } from './modules/account/pages/info-account/info-account.component';
import { HomeCustomerComponent } from './modules/user/pages/home-customer/home-customer.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AccountUserComponent } from './modules/account/pages/account-user/account-user.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthService } from './modules/main/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PruebaPipeComponent,
    CustomPipeMomentjsPipe,
    CustomPipePhonePipe,
    CustomPipeDataPipe,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    InfoCostumerComponent,
    InfoDepositComponent,
    InfoTransferComponent,
    CreateAccountComponent,
    CreateDepositComponent,
    CreateTransferComponent,
    UpdateAccountComponent,
    UpdateCostumerComponent,
    HeaderComponent,
    HeaderAfterLoginComponent,
    FooterComponent,
    NavInfoCustomerComponent,
    InfoAccountComponent,
    HomeCustomerComponent,
    AccountUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      },
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [ServiceUserService, ServiceAccountService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
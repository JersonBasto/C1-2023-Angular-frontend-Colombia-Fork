import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCustomerComponent } from './pages/home-customer/home-customer.component';
import { UserComponent } from './user.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { UpdateCostumerComponent } from './pages/update-costumer/update-costumer.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['customer/home']);

const routes: Routes = [
  { path: '', component: UserComponent },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

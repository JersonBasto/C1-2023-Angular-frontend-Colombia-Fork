import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IResCreateAccount } from '../../account/models/account-res.model';
import { IAccountRes } from '../../account/models/account.model';
import { ServiceAccountService } from '../../account/services/account-service/service-account.service';
import { AuthService } from '../../main/services/auth-service/auth.service';
import { IGetUser } from '../models/get-user.model';
import { ServiceUserService } from '../services/user-service/service-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  accounts: IAccountRes[];
  customer: IGetUser | null;
  id: string;

  constructor(
    private readonly accountService: ServiceAccountService,
    private readonly customerService: ServiceUserService,
    private readonly authService: AuthService
  ) {
    this.accounts = [];
    this.id = '';
    this.customer = null;
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') ?? '';
    this.getAccounts();
    this.getInfoCustomer();
  }

  getAccounts() {
    this.accountService.getAccountByCustomerId(this.id).subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  getInfoCustomer() {
    this.customerService.getUserById(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.customer = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  unsubscribeUser() {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Esta seguro que quiere darse de baja?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.unsubscribeUser(this.id).subscribe({
          next: (data) => {
            this.authService.SignOut();
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error?.message,
              icon: 'error',
            });
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });

    //
  }
}

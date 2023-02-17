import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IInfoModel } from '../../models/info.model';
import { UserModel } from '../../models/user.model';
import { ServiceUserService } from '../../services/user-service/service-user.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss'],
})
export class HomeCustomerComponent implements OnInit {
  id: string | null;
  document: string;
  documentType: string;
  fullName: string;
  email: string;
  phone: string;
  getUser?: Observable<UserModel>;
  image: string;

  constructor(
    private readonly router: Router,
    private readonly customerService: ServiceUserService
  ) {
    this.id = '';
    this.document = '';
    this.fullName = '';
    this.email = '';
    this.phone = '';
    this.documentType = '';
    this.image = '';
  }

  ngOnInit(): void {
    let user = JSON.stringify(localStorage.getItem('user') ?? '');
    console.log(user)
    const idLocal = localStorage.getItem('id');
    this.id = idLocal !== null ? idLocal : '';
    this.customerService.getUserById(this.id).subscribe({
      next: (data) => {
        this.document = data.document;
        this.fullName = data.fullName;
        this.email = data.email;
        this.phone = data.phone;
        this.documentType = data.documentType.name;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        'complete';
      },
    });
  }

  goToAccount() {
    this.router.navigate(['./customer/account']);
  }
  goToDeposits() {
    this.router.navigate(['/customer/deposit-all']);
  }
  goToTransfer() {
    this.router.navigate(['customer/transfer-history/' + this.id]);
  }
  goToUpdateCustomer() {
    this.router.navigate(['./customer/update/' + this.id]);
  }
}

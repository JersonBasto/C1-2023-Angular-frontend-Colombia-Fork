import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/modules/user/services/user-service/service-user.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoginStateService } from '../../services/login-state/login-state.service';

@Component({
  selector: 'app-header-after-login',
  templateUrl: './header-after-login.component.html',
  styleUrls: ['./header-after-login.component.scss'],
})
export class HeaderAfterLoginComponent implements OnInit {
  routeInfoCustomer: string[];
  routeAccount: string[];
  routeInfoDeposit: string[];
  routeInfoTransfer: string[];
  id: string | null;
  document: string;
  documentType: string;
  fullName: string;
  email: string;
  phone: string;
  @Output()
  setData: EventEmitter<{}>;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: ServiceUserService
  ) {
    this.routeInfoCustomer = ['customer'];
    this.routeAccount = ['account'];
    this.routeInfoDeposit = ['deposit'];
    this.routeInfoTransfer = ['transfer'];
    this.setData = new EventEmitter<{}>();
    this.id = '';
    this.document = '';
    this.fullName = '';
    this.email = '';
    this.phone = '';
    this.documentType = '';
  }

  ngOnInit(): void {}

  goToHomeuser() {
    this.router.navigate(['./customer/home/']);
  }

  getDataUser() {
    const idLocal = localStorage.getItem('id');
    this.id = idLocal !== null ? idLocal : '';
    this.userService.getUserById(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.setData.emit(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  goToTransferInfo() {
    const idLocal = localStorage.getItem('id');
    this.id = idLocal !== null ? idLocal : '';
    this.router.navigate(['customer/transfer-history/' + this.id]);
  }

  goToAccountInfo() {
    this.router.navigate(['customer/account']);
  }

  goToHome(){
    this.router.navigate(["/home/customer"])
  }

  goToCustomerHome() {
    this.router.navigate(['/customer/home']);
  }

  goToDeposits() {
    this.router.navigate(['customer/deposit-all']);
  }

  SignOut() {
    return this.authService.SignOut();
  }
}

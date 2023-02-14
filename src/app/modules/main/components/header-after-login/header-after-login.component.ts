import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.routeInfoCustomer = ['customer'];
    this.routeAccount = ['account'];
    this.routeInfoDeposit = ['deposit'];
    this.routeInfoTransfer = ['transfer'];
  }

  ngOnInit(): void {}

  goToHomeuser() {
    this.router.navigate(['./customer/home/']);
  }
  SignOut() {
    return this.authService.SignOut();
  }
}

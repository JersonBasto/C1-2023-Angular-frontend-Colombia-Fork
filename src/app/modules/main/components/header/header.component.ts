import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceUserService } from 'src/app/modules/user/services/user-service/service-user.service';
import { LoginStateService } from '../../services/login-state/login-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  login: boolean;
  routeLogin: string[];
  routeHome: string[];
  routeRegister: string[];
  nameUserC1: string;
  constructor(
    private readonly loginStateService: LoginStateService,
    private readonly userService: ServiceUserService
  ) {
    this.login = this.loginStateService.state;
    this.routeLogin = ['login'];
    this.routeHome = [''];
    this.routeRegister = ['register'];
    this.nameUserC1 = '';
  }

  ngOnInit(): void {
    this.loginStateService.changeState.subscribe({
      next: (data: boolean) => {
        this.login = data;
        if (data) {
          this.userService
            .getUserById(localStorage.getItem('id') ?? '')
            .subscribe({
              next: (data) => {
                this.nameUserC1 = data.fullName;
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {
                console.log('complete');
              },
            });
        }
      },
    });
  }
}

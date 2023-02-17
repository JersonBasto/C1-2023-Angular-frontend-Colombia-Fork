import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { ServiceUserService } from '../../../user/services/user-service/service-user.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  frmFormulario: FormGroup;

  constructor(
    private readonly userService: ServiceUserService,
    private readonly route: Router,
    private readonly authService: AuthService
  ) {
    this.frmFormulario = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp(environment.regexEmail)),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp(environment.regexPassword)),
      ]),
    });
  }

  ngOnInit(): void {}

  login() {
    this.authService.SignIn(
      String(this.frmFormulario.get('email')?.value),
      String(this.frmFormulario.get('password')?.value)
    );
  }
  loginGoogle() {
    return this.authService.GoogleAuthLogin();
  }

  goToHomeUser() {
    this.route.navigate(['./customer/home']);
  }
}

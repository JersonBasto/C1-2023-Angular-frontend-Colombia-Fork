import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { ServiceUserService } from '../../../user/services/user-service/service-user.service';
import { NewUserModel } from '../../models/new-user.model';
import { UseGoogle } from '../../models/user-google.model';
import { LoginStateService } from '../login-state/login-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly userService: ServiceUserService,
    private readonly loginStateService: LoginStateService
  ) {
    this.login = this.loginStateService.state;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['customer/home']);
    });
  }

  GoogleAuthLogin() {
    return this.AuthLoginGoogle(new auth.GoogleAuthProvider()).then(
      (res: any) => {
        this.router.navigate(['customer/home']);
      }
    );
  }

  AuthLoginGoogle(provider: any) {
    return this.afAuth.signInWithPopup(provider).then((result) => {
      this.userService.loginGoogle({ id: result.user?.uid ?? '' }).subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('access_Token', data.access_token);
        },
      });
      this.changeStateLogin();
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('uid', result.user?.uid ?? '');
      result.user
        ?.getIdToken()
        .then((token) => localStorage.setItem('token', token));
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        let NewUser = {
          idFireBase: String(result.user?.uid ?? ''),
          fullName: String(result.user?.displayName),
          email: String(result.user?.email),
          phone: String(result.user?.phoneNumber ?? ''),
        };
        this.userService.createUserGoogle(NewUser as UseGoogle).subscribe({
          next: (data) => {
            localStorage.setItem('id', data.id);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            'Complete';
          },
        });
        this.router.navigate(['customer/home']);
        this.changeStateLogin();
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('uid', result.user?.uid ?? '');
        result.user
          ?.getIdToken()
          .then((token) => localStorage.setItem('token', token));
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.changeStateLogin();
      localStorage.removeItem('user');
      localStorage.removeItem('uid');
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    });
  }
  changeStateLogin() {
    this.loginStateService.state = !this.login;
    this.login = this.loginStateService.state;
  }
}

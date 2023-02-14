import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { ServiceUserService } from '../../user/services/user-service/service-user.service';
import { NewUserModel } from '../models/new-user.model';
import { UseGoogle } from '../models/user-google.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly userService: ServiceUserService
  ) {}

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['customer/home']);
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
            console.log(data)
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
      localStorage.removeItem('user');
      localStorage.removeItem('uid');
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    });
  }
}

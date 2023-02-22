import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { ServiceUserService } from '../../../user/services/user-service/service-user.service';
import { NewUserModel } from '../../models/new-user.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { UseGoogle } from '../../models/user-google.model';
import { LoginStateService } from '../login-state/login-state.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly userService: ServiceUserService,
    private readonly loginStateService: LoginStateService,
    public afs: AngularFirestore
  ) {
    this.login = this.loginStateService.state;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['customer/home']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  GoogleAuthLogin() {
    return this.AuthLoginGoogle(new auth.GoogleAuthProvider()).then(
      (res: any) => {
        console.log(res);
        if (res) {
          this.router.navigate(['customer/home']);
        } else {
          this.router.navigate(['login']);
        }
      }
    );
  }

  AuthLoginGoogle(provider: any) {
    return this.afAuth.signInWithPopup(provider).then((result) => {
      this.userService.loginGoogle({ id: result.user?.uid ?? '' }).subscribe({
        next: (data) => {
          localStorage.setItem('access_Token', data.access_token);
          localStorage.setItem('id', data.id);
          this.changeStateLogin();
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('uid', result.user?.uid ?? '');
          result.user
            ?.getIdToken()
            .then((token) => localStorage.setItem('token', token));
          this.router.navigate(['customer/home']);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
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
            localStorage.setItem('access_Token', data.access_token);
            localStorage.setItem('id', data.id);
            this.changeStateLogin();
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('uid', result.user?.uid ?? '');
            result.user
              ?.getIdToken()
              .then((token) => localStorage.setItem('token', token));
            this.router.navigate(['customer/home']);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            'Complete';
          },
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            let loginModel = {
              email: email,
              password: password,
            };
            this.userService.login(loginModel).subscribe({
              next: (data) => {
                localStorage.setItem('access_Token', data.access_token);
                localStorage.setItem('id', data.id);
                this.changeStateLogin();
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('uid', result.user?.uid ?? '');
                result.user
                  ?.getIdToken()
                  .then((token) => localStorage.setItem('token', token));
                this.router.navigate(['customer/home']);
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {
                console.log('complete');
              },
            });
            this.router.navigate(['customer/home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignUpEmailPassword(email: string, password: string, user: NewUserModel) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.userService.createNewUser(user).subscribe({
          next: (data) => {
            localStorage.setItem('access_Token', data.access_token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('uid', result.user?.uid ?? '');
            result.user
              ?.getIdToken()
              .then((token) => localStorage.setItem('token', token));
            this.changeStateLogin();
            this.router.navigate(['customer/home']);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      });
  }
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.changeStateLogin();
      localStorage.removeItem('user');
      localStorage.removeItem('uid');
      localStorage.removeItem('token');
      localStorage.removeItem('access_Token');
      localStorage.removeItem('id');
      localStorage.removeItem('login');
      this.router.navigate(['login']);
    });
  }
  changeStateLogin() {
    this.loginStateService.state = !this.login;
    this.login = this.loginStateService.state;
  }
}

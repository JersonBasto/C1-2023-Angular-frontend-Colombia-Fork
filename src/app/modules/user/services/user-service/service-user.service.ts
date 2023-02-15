import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIdFireBase } from 'src/app/modules/main/models/id-firebase.model';
import { ILoginGoogle } from 'src/app/modules/main/models/login-google.model';
import { IResLogin } from 'src/app/modules/main/models/res-login.model';
import { UseGoogle } from 'src/app/modules/main/models/user-google.model';
import { IGetUser } from '../../../main/interfaces/user-get/user-get.interface';
import { LoginModel } from '../../../main/models/login.model';
import { NewUserModel } from '../../../main/models/new-user.model';
import { IUpdateUser } from '../../models/update-user.model';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceUserService {
  constructor(private readonly httpClient: HttpClient) {}

  createNewUser(newUser: NewUserModel): Observable<IResLogin> {
    return this.httpClient.post<IResLogin>(
      'http://localhost:3000/security/register',
      newUser
    );
  }
  createUserGoogle(newUser: UseGoogle): Observable<IResLogin> {
    return this.httpClient.post<IResLogin>(
      'http://localhost:3000/security/user-google',
      newUser
    );
  }

  getAllUser() {
    return this.httpClient.get('http://localhost:3000/user');
  }

  login(loginuser: LoginModel): Observable<IResLogin> {
    return this.httpClient.post<IResLogin>(
      'http://localhost:3000/security/login',
      loginuser
    );
  }

  loginGoogle(idFireBase: IIdFireBase): Observable<IResLogin> {
    return this.httpClient.post<IResLogin>(
      'http://localhost:3000/security/login/google',
      idFireBase
    );
  }

  getUserById(id: string): Observable<IGetUser> {
    return this.httpClient.get<IGetUser>('http://localhost:3000/user/' + id);
  }

  updateUser(id: string, user: IUpdateUser): Observable<IUpdateUser> {
    return this.httpClient.put<IUpdateUser>(
      'http://localhost:3000/user/' + id,
      user
    );
  }
}

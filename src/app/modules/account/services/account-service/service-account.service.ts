import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResCreateAccount } from '../../models/account-res.model';
import { IAccountRes } from '../../models/account.model';
import { ICreateAccount } from '../../models/create-account.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceAccountService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllAccount() {
    return this.httpClient.get('http://localhost:3000/account/');
  }

  getAccountById(id: string | undefined | null) {
    return this.httpClient.get('http://localhost:3000/account/' + id);
  }

  getAccountByCustomerId(id: String): Observable<IAccountRes[]> {
    return this.httpClient.get<IAccountRes[]>(
      'http://localhost:3000/user/allAccounts/' + id
    );
  }

  createAccount(account: ICreateAccount): Observable<IResCreateAccount> {
    return this.httpClient.post<IResCreateAccount>(
      'http://localhost:3000/account',
      account
    );
  }
}

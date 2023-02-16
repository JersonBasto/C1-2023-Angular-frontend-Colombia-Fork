import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateDeposit } from '../models/create-deposit.model';
import { IResDeposit } from '../models/res-create-deposit.model';

@Injectable({
  providedIn: 'root',
})
export class DepositServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  createDeposit(deposit: ICreateDeposit): Observable<IResDeposit> {
    return this.httpClient.post<IResDeposit>(
      'http://localhost:3000/deposit',
      deposit
    );
  }

  getDepositsById(id: string): Observable<IResDeposit> {
    return this.httpClient.get<IResDeposit>(
      'http://localhost:3000/deposit/' + id
    );
  }

  //getHistoryDeposit(id:string,): Observable<IResDeposit>{
  //  return this.httpClient.post<IResDeposit>("http://localhost:3000/deposit//getHistory/"+id,)
  //}
}

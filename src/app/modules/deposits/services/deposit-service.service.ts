import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetHistory } from '../../transfers/models/get-history.model';
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

  getDepositsById(id: string, data: any): Observable<IResDeposit> {
    return this.httpClient.post<IResDeposit>(
      'http://localhost:3000/deposit/get/' + id,
      data
    );
  }

  getHistoryDeposit(id: string, data: IGetHistory): Observable<IResDeposit[]> {
    return this.httpClient.post<IResDeposit[]>(
      'http://localhost:3000/deposit/getHistory/' + id,
      data
    );
  }

  findByCustomerId(id: string, data: any): Observable<IResDeposit[]> {
    return this.httpClient.post<IResDeposit[]>(
      'http://localhost:3000/deposit/all-deposits/' + id,
      data
    );
  }
}

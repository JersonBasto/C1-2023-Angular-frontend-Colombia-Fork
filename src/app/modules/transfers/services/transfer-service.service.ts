import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateTransfer } from '../models/create-transfer.model';
import { IGetHistory } from '../models/get-history.model';
import { IResTransfer } from '../models/get-transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  createTransfer(transfer: ICreateTransfer): Observable<IResTransfer> {
    return this.httpClient.post<IResTransfer>(
      'http://localhost:3000/transfer',
      transfer
    );
  }

  getHistory(id: string, data: IGetHistory): Observable<IResTransfer[]> {
    return this.httpClient.post<IResTransfer[]>(
      'http://localhost:3000/transfer/history/' + id,
      data
    );
  }

  getTransferById(id: string): Observable<IResTransfer> {
    return this.httpClient.get<IResTransfer>(
      'http://localhost:3000/transfer/' + id
    );
  }

  getHistoryOutcome(
    idAccount: string,
    data: IGetHistory
  ): Observable<IResTransfer[]> {
    return this.httpClient.post<IResTransfer[]>(
      'http://localhost:3000/transfer/historyOut/' + idAccount,
      data
    );
  }
  getHistoryIncome(
    idAccount: string,
    data: IGetHistory
  ): Observable<IResTransfer[]> {
    return this.httpClient.post<IResTransfer[]>(
      'http://localhost:3000/transfer/historyIncome/' + idAccount,
      data
    );
  }
}

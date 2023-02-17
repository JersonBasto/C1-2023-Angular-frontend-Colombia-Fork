import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResTransfer } from '../../models/get-transfer.model';
import { TransferServiceService } from '../../services/transfer-service.service';

@Component({
  selector: 'app-transfer-history-income',
  templateUrl: './transfer-history-income.component.html',
  styleUrls: ['./transfer-history-income.component.scss'],
})
export class TransferHistoryIncomeComponent implements OnInit {
  idOutcome: string;
  pageActual: number;
  transfers: IResTransfer[];

  constructor(
    private readonly transferService: TransferServiceService,
    private readonly route: ActivatedRoute
  ) {
    this.idOutcome = '';
    this.pageActual = 1;
    this.transfers = [];
  }

  ngOnInit(): void {
    this.idOutcome = this.route.snapshot.paramMap.get('id') ?? '';
    this.getDataTransfers();
  }

  getDataTransfers() {
    let data = {
      actualPage: this.pageActual,
      range: 10,
      token: localStorage.getItem('access_Token'),
    };
    this.transferService.getHistoryIncome(this.idOutcome, data).subscribe({
      next: (data) => {
        this.transfers = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  getPageHistory(page: number): void {
    this.pageActual = page;
    this.getDataTransfers();
    console.log('llega :' + page);
  }
}

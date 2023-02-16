import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResTransfer } from '../../models/get-transfer.model';
import { TransferServiceService } from '../../services/transfer-service.service';

@Component({
  selector: 'app-transfer-history-outcome',
  templateUrl: './transfer-history-outcome.component.html',
  styleUrls: ['./transfer-history-outcome.component.scss'],
})
export class TransferHistoryOutcomeComponent implements OnInit {
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
    };
    this.transferService.getHistoryOutcome(this.idOutcome, data).subscribe({
      next: (data) => {
        console.log(data);
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

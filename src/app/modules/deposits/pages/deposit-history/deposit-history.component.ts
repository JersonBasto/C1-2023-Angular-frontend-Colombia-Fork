import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResDeposit } from '../../models/res-create-deposit.model';
import { DepositServiceService } from '../../services/deposit-service.service';

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.component.html',
  styleUrls: ['./deposit-history.component.scss'],
})
export class DepositHistoryComponent implements OnInit {
  idAccount: string;
  pageActual: number;
  deposits: IResDeposit[];
  constructor(
    private readonly depositService: DepositServiceService,
    private readonly route: ActivatedRoute
  ) {
    this.idAccount = '';
    this.pageActual = 1;
    this.deposits = [];
  }

  ngOnInit(): void {
    this.idAccount = this.route.snapshot.paramMap.get('id') ?? '';
    this.getHistory();
  }

  getHistory() {
    let data = {
      actualPage: this.pageActual,
      range: 10,
    };
    this.depositService.getHistoryDeposit(this.idAccount, data).subscribe({
      next: (data) => {
        console.log(data);
        this.deposits = data;
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  getPageHistory(page: number): void {
    this.pageActual = page;
    this.getHistory();
    console.log('llega :' + page);
  }
}

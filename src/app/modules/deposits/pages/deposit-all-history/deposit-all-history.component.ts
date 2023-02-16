import { Component, OnInit } from '@angular/core';
import { IResDeposit } from '../../models/res-create-deposit.model';
import { DepositServiceService } from '../../services/deposit-service.service';

@Component({
  selector: 'app-deposit-all-history',
  templateUrl: './deposit-all-history.component.html',
  styleUrls: ['./deposit-all-history.component.scss'],
})
export class DepositAllHistoryComponent implements OnInit {
  id: string;
  deposits: IResDeposit[];
  constructor(private readonly depositService: DepositServiceService) {
    this.id = '';
    this.deposits = [];
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') ?? '';
    this.getDataDeposit();
  }

  getDataDeposit() {
    this.depositService.findByCustomerId(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.deposits = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}

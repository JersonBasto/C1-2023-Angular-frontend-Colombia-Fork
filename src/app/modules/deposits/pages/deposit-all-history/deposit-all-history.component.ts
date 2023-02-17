import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private readonly depositService: DepositServiceService,
    private readonly router: Router
  ) {
    this.id = '';
    this.deposits = [];
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') ?? '';
    this.getDataDeposit();
  }

  getDataDeposit() {
    let data = {
      token: localStorage.getItem('access_Token'),
    };
    this.depositService.findByCustomerId(this.id, data).subscribe({
      next: (data) => {
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

  goToDepositInfo(id: string) {
    console.log(id);
    this.router.navigate(['customer/deposit-info/' + id]);
  }
}

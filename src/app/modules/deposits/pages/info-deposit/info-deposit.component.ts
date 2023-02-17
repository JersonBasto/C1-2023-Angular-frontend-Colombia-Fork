import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IResDeposit } from '../../models/res-create-deposit.model';
import { DepositServiceService } from '../../services/deposit-service.service';

@Component({
  selector: 'app-info-deposit',
  templateUrl: './info-deposit.component.html',
  styleUrls: ['./info-deposit.component.scss'],
})
export class InfoDepositComponent implements OnInit {
  id: string;
  idDeposit: string;
  deposit: IResDeposit | null;

  constructor(
    private readonly depositService: DepositServiceService,
    private readonly route: ActivatedRoute
  ) {
    this.id = '';
    this.idDeposit = '';
    this.deposit = null;
  }

  ngOnInit(): void {
    const idLocal = localStorage.getItem('id');
    this.id = idLocal !== null ? idLocal : '';
    this.idDeposit = this.route.snapshot.paramMap.get('id') ?? '';
    let data = {
      token: localStorage.getItem('access_Token'),
    };
    this.depositService.getDepositsById(this.idDeposit, data).subscribe({
      next: (data) => {
        console.log(data);
        this.deposit = data;
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

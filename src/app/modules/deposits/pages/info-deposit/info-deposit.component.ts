import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepositServiceService } from '../../services/deposit-service.service';

@Component({
  selector: 'app-info-deposit',
  templateUrl: './info-deposit.component.html',
  styleUrls: ['./info-deposit.component.scss'],
})
export class InfoDepositComponent implements OnInit {
  id: string;

  constructor(private readonly depositService: DepositServiceService) {
    this.id = '';
  }

  ngOnInit(): void {
    const idLocal = localStorage.getItem('id');
    this.id = idLocal !== null ? idLocal : '';
    this.depositService.getDepositsById(this.id).subscribe({
      next: (data) => {
        console.log(data);
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

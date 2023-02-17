import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransferServiceService } from '../../services/transfer-service.service';

@Component({
  selector: 'app-all-info-transfer',
  templateUrl: './all-info-transfer.component.html',
  styleUrls: ['./all-info-transfer.component.scss'],
})
export class AllInfoTransferComponent implements OnInit {
  idTransfer: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  reason: string;

  constructor(
    private readonly transferService: TransferServiceService,
    private readonly route: ActivatedRoute
  ) {
    this.idTransfer = '';
    this.customerEmail = '';
    this.customerName = '';
    this.amount = 0;
    this.reason = '';
  }

  ngOnInit(): void {
    this.idTransfer = this.route.snapshot.paramMap.get('id') ?? '';
    this.getDataTransfer();
  }

  getDataTransfer() {
    let data = {
      token: localStorage.getItem('access_Token'),
    };
    this.transferService.getTransferById(this.idTransfer, data).subscribe({
      next: (data) => {
        console.log(data);
        this.customerEmail = data.income.customer.email;
        this.customerName = data.income.customer.fullName;
        this.reason = data.reason;
        this.amount = data.amount;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}

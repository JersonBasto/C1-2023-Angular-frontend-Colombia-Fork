import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IResTransfer } from '../../models/get-transfer.model';
import { TransferServiceService } from '../../services/transfer-service.service';

@Component({
  selector: 'app-info-transfer',
  templateUrl: './info-transfer.component.html',
  styleUrls: ['./info-transfer.component.scss'],
})
export class InfoTransferComponent implements OnInit {
  outcome: string;
  id: string;
  transfers: IResTransfer[];

  constructor(
    private readonly transferService: TransferServiceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.outcome = '';
    this.id = '';
    this.transfers = [];
  }

  ngOnInit(): void {
    this.outcome = this.route.snapshot.paramMap.get('id') ?? '';
    const idLocal = localStorage.getItem('id');
    this.id = idLocal !== null ? idLocal : '';
    this.getHistory();
  }

  getHistory() {
    let data = {
      actualPage: 1,
      range: 10,
      token: localStorage.getItem('access_Token'),
    };
    console.log(this.id);
    this.transferService.getHistory(this.id, data).subscribe({
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

  goToInfoTransfer(id: string) {
    this.router.navigate(['customer/transfer-info/' + id]);
  }
}

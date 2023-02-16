import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferServiceService } from '../../services/transfer-service.service';

@Component({
  selector: 'app-info-transfer',
  templateUrl: './info-transfer.component.html',
  styleUrls: ['./info-transfer.component.scss'],
})
export class InfoTransferComponent implements OnInit {
  outcome: string;
  id: string;
  constructor(
    private readonly transferService: TransferServiceService,
    private readonly route: ActivatedRoute
  ) {
    this.outcome = '';
    this.id = '';
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
    };
    console.log(this.id)
    this.transferService.getHistory(this.id, data).subscribe({
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceAccountService } from '../../services/account-service/service-account.service';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss'],
})
export class InfoAccountComponent implements OnInit {
  id: string | undefined | null;
  account: any;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly accountService: ServiceAccountService
  ) {
    this.id = '';
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAccount();
  }

  getAccount() {
    this.accountService.getAccountById(this.id).subscribe({
      next: (data) => {
        this.account = data;
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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepositServiceService } from '../../services/deposit-service.service';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrls: ['./create-deposit.component.scss'],
})
export class CreateDepositComponent implements OnInit {
  frmFormulario: FormGroup;
  idDeposit: string;

  constructor(
    private readonly depositServie: DepositServiceService,
    private readonly route: ActivatedRoute
  ) {
    this.frmFormulario = new FormGroup({
      amount: new FormControl([Validators.required]),
    });
    this.idDeposit = '';
  }

  ngOnInit(): void {
    this.idDeposit = this.route.snapshot.paramMap.get('id') ?? '';
  }

  createDeposit() {
    let newDeposit = {
      account: String(this.idDeposit),
      amount: this.frmFormulario.get('amount')?.value,
    };
    this.depositServie.createDeposit(newDeposit).subscribe({
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

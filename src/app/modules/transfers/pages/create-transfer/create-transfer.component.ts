import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransferServiceService } from '../../services/transfer-service.service';

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.scss'],
})
export class CreateTransferComponent implements OnInit {
  frmFormulario: FormGroup;
  outcome: string;

  constructor(
    private readonly transferService: TransferServiceService,
    private readonly route: ActivatedRoute
  ) {
    this.frmFormulario = new FormGroup({
      income: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
    });
    this.outcome = '';
  }

  ngOnInit(): void {
    this.outcome = this.route.snapshot.paramMap.get('id') ?? '';
  }

  createTransfer() {
    let newTransfer = {
      outcome: this.outcome,
      income: this.frmFormulario.get('income')?.value,
      amount: Number(this.frmFormulario.get('amount')?.value),
      reason: this.frmFormulario.get('reason')?.value,
    };
    this.transferService.createTransfer(newTransfer).subscribe({
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

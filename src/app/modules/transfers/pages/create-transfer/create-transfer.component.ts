import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    private readonly route: ActivatedRoute,
    private readonly router: Router
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
      token: localStorage.getItem('access_Token'),
    };
    Swal.fire({
      title: 'Va a realizar una transferencia de ' + newTransfer.amount,
      text: '¿Esta seguro?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.transferService.createTransfer(newTransfer).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Transferencia Exitosa',
              text: 'Se ha realizado la transferencia a ' + data.income.id,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['customer/account']);
              }
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error, se ha bloqueado la transferencia',
              icon: 'error',
            });
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }
}

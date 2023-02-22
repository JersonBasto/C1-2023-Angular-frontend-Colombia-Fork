import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepositServiceService } from '../../services/deposit-service.service';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrls: ['./create-deposit.component.scss'],
})
export class CreateDepositComponent implements OnInit {
  idDeposit: string;
  amount: string;

  constructor(
    private readonly depositServie: DepositServiceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.amount = '';
    this.idDeposit = '';
  }

  ngOnInit(): void {
    this.idDeposit = this.route.snapshot.paramMap.get('id') ?? '';
  }

  createDeposit() {
    let newDeposit = {
      account: String(this.idDeposit),
      amount: Number(this.amount),
      token: localStorage.getItem('access_Token'),
    };
    Swal.fire({
      title: '¿Esta seguro de realizar este deposito?',
      text: 'Realizara un deposito por ' + newDeposit.amount,
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.depositServie.createDeposit(newDeposit).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Deposito creado',
              text:
                'El deposito para la cuenta ' +
                data.account.id +
                ' se ha realizado con exito',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['customer/account']);
              }
            });
          },
          error: (err) => {
            if (err.message) {
              Swal.fire({
                title: 'Deposito bloqueado',
                text: err.message,
                icon: 'error',
              });
            } else {
              Swal.fire({
                title: 'Deposito bloqueado',
                text: 'Ha ocurrido un error ',
                icon: 'error',
              });
            }
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }
}

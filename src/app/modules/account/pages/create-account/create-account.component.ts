import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ICreateAccount } from '../../models/create-account.model';
import { ServiceAccountService } from '../../services/account-service/service-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  public items: { field: string }[] = [
    { field: 'CC' },
    { field: 'TI' },
    { field: 'Pasaporte' },
  ];

  frmFormulario: FormGroup;
  id: string;

  constructor(
    private readonly accountService: ServiceAccountService,
    private readonly router: Router
  ) {
    this.frmFormulario = new FormGroup({
      accountType: new FormControl('', Validators.required),
    });
    this.id = '';
  }

  ngOnInit(): void {
    const idLocal = localStorage.getItem('id');
    this.id = idLocal !== null ? idLocal : '';
  }

  createAccount() {
    let newAccount = {
      customer: this.id,
      accountType: {
        name: String(this.frmFormulario.get('accountType')?.value),
      },
      balance: 0,
    };
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Creera una cuenta de tipo ' + newAccount.accountType.name,
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService
          .createAccount(newAccount as ICreateAccount)
          .subscribe({
            next: (data) => {
              Swal.fire({
                title: 'Cuenta creada',
                text:
                  'La cuenta de tipo ' +
                  data.accountType.name +
                  ' ha sido creada',
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
                text: 'Ha ocurrido un error',
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

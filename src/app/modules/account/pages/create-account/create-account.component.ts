import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private readonly accountService: ServiceAccountService) {
    this.frmFormulario = new FormGroup({
      accountType: new FormControl(Validators.required),
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
        name: String(this.frmFormulario.get('accountType')),
      },
      balance: 0,
    };
    return this.accountService
      .createAccount(newAccount as ICreateAccount)
      .subscribe({
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

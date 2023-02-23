import { NotExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { IDocumenType } from '../../models/document-type.model';
import { IUpdateUser } from '../../models/update-user.model';
import { UserModel } from '../../models/user.model';
import { ServiceUserService } from '../../services/user-service/service-user.service';

@Component({
  selector: 'app-update-costumer',
  templateUrl: './update-costumer.component.html',
  styleUrls: ['./update-costumer.component.scss'],
})
export class UpdateCostumerComponent implements OnInit {
  id: string | null;
  frmFormulario: FormGroup;
  public items: { field: string }[] = [
    { field: 'CC' },
    { field: 'TI' },
    { field: 'Pasaporte' },
  ];

  constructor(
    private readonly userService: ServiceUserService,
    private readonly route: ActivatedRoute
  ) {
    this.frmFormulario = new FormGroup({
      document: new FormControl(null, [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(3),
      ]),
      fullName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp(environment.regexEmail)),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      documentType: new FormControl(null, [Validators.required]),
    });
    this.id = '';
  }

  ngOnInit(): void {
    const idNew = this.route.snapshot.paramMap.get('id');
    this.id = idNew !== null ? idNew : '';
    this.userService.getUserById(this.id).subscribe({
      next: (data) => {
        this.frmFormulario.setValue({
          document: data.document,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          documentType: data.documentType.name,
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  updateUser() {
    const idNew = this.route.snapshot.paramMap.get('id');
    console.log(this.frmFormulario);
    this.id = idNew !== null ? idNew : '';
    const updateUser = {
      idFireBase: localStorage.getItem('uid') ?? '',
      fullName: this.frmFormulario.get('fullName')?.value,
      email: this.frmFormulario.get('email')?.value,
      documentType: this.frmFormulario.get('documentType')?.value,
      document: this.frmFormulario.get('document')?.value,
      phone: this.frmFormulario.get('phone')?.value,
    };
    if (localStorage.getItem('uid')) {
      this.userService.updateUserGoogle(this.id, updateUser).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Hecho',
            text: 'Actualizacion Exitosa',
            icon: 'success',
          });
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    } else {
      this.userService
        .updateUser(this.id, this.frmFormulario.getRawValue())
        .subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Hecho',
              text: 'Actualizacion Exitosa',
              icon: 'success',
            });
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

  obserForm() {
    console.log(this.frmFormulario);
  }
}

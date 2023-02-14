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
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp(environment.regexPassword)),
      ]),
      documentTypeId: new FormControl(),
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
          password: data.password ?? '',
          documentTypeId: data.documentType.id,
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

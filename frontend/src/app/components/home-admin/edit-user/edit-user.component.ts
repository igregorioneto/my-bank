import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  validationMessages = {
    name: [
      {
        type: 'required',
        message: 'Insira um valor'
      },
      {
        type: 'minlength',
        message: 'Valor mínimo para depósito de R$5,00.'
      },
      {
        type: 'maxlength',
        message: 'Valor máximo para depósito de R$1.000,00.'
      }
    ]
  }

  editForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group(
      {
        name: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        ),
        roles: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        ),
        actived: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        ),
      }
    ); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editValue(edit: any) {
    console.log(edit);
  }

}

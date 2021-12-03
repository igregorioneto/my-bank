import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: any = {}

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
    private readonly adminService: AdminService,
    private readonly dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group(
      {
        name: new FormControl(
          this.data.name,
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        ),
        email: new FormControl(
          this.data.email,
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        ),
        actived: new FormControl(
          this.data.actived,
        ),
      }
    ); 
  }

  changeTransfer(event: any) {
    this.editForm.get('actived')?.setValue(event.target.value, {
      onlySelf: true
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editValue(edit: any) {
    console.log(edit);
    this.adminService.updateUser(this.data.id, edit).subscribe(() => {});
  }

}

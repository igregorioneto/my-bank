import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.scss']
})
export class WithdrawDialogComponent implements OnInit {
  validationMessages = {
    value: [
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

  withdrawForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly transactionsService: TransactionsService,
    private readonly dialogRef: MatDialogRef<WithdrawDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.withdrawForm = this.formBuilder.group(
      {
        value: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        )
      }
    ); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  withdrawValue(withdraw: any) {
    const { value } = withdraw;
    const type_transaction = 1;
    this.transactionsService.withdraw({
      type_transaction,
      value
    }).subscribe(
      () => { 
        this.dialogRef.close();
        window.location.reload();
      }
    );
  }


}

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
  selector: 'app-deposit-dialog',
  templateUrl: './deposit-dialog.component.html',
  styleUrls: ['./deposit-dialog.component.scss']
})
export class DepositDialogComponent implements OnInit {

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

  depositForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly transactionsService: TransactionsService,
    private readonly dialogRef: MatDialogRef<DepositDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.depositForm = this.formBuilder.group(
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

  depositValue(deposit: any) {
    const { value } = deposit;
    const type_transaction = 0;
    this.transactionsService.deposit({
      type_transaction,
      value
    }).subscribe(
      (data) => { 
        console.log(data)
        this.dialogRef.close();
      }
    );
    console.log(deposit);
  }

}

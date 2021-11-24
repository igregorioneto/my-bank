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
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.scss']
})
export class TransferDialogComponent implements OnInit {
  selectTransfer: any[] = [];

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

  transferForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly transactionsService: TransactionsService,
    private readonly dialogRef: MatDialogRef<TransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.transactionsService.getUsersTransfer()
      .subscribe((data) => {
        this.selectTransfer = data;
      });
    
    this.transferForm = this.formBuilder.group(
      {
        value: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)
          ])
        ),
        transferUser: new FormControl(
          '',
          Validators.compose([
            Validators.required
          ])
        )
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeTransfer(event: any) {
    this.transferForm.get('transferUser')?.setValue(event.target.value, {
      onlySelf: true
    })
  }

  transferValue(transfer: any) {
    const { value, transferUser } = transfer;
    const type_transaction = 2;
    const transfer_id = transferUser;
    this.transactionsService.transfer({
      type_transaction,
      value,
      transfer_id
    }).subscribe(
      (data) => { 
        console.log(data)
        this.dialogRef.close();
      }
    );
    console.log(transfer);
  }

}

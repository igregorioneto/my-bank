import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ServicesService } from 'src/app/services/services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepositDialogComponent } from './deposit-dialog/deposit-dialog.component';
import { WithdrawDialogComponent } from './withdraw-dialog/withdraw-dialog.component';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = '';
  balance = 0;
  transactions: any[] = [];
  status = '';

  constructor(
    private readonly homeService: HomeService,
    private readonly servicesService: ServicesService,
    private readonly transactionService: TransactionsService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.homeService.userLogged()
      .subscribe(
        async data => {
          this.name = data.name;
          this.balance = data.balance;
          this.status = data.actived;
        });

    this.transactionService.getTransactions()
        .subscribe(
          data => {
            this.transactions = data;
          });
  }

  depositDialog(): void {
    const dialogRef = this.dialog.open(DepositDialogComponent, {
      width: '35rem'
    });
  }

  withdrawDialog(): void {
    const dialogRef = this.dialog.open(WithdrawDialogComponent, {
      width: '35rem'
    });
  }

  transferDialog(): void {
    const dialogRef = this.dialog.open(TransferDialogComponent, {
      width: '35rem'
    });
  }

  close(): void {
    this.servicesService.remove();
    this.router.navigate(['/login']);
  }

}

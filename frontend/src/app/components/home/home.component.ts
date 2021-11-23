import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ServicesService } from 'src/app/services/services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepositDialogComponent } from './deposit-dialog/deposit-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = '';
  balance = 0;
  constructor(
    private readonly homeService: HomeService,
    private readonly servicesService: ServicesService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.homeService.userLogged()
      .subscribe(
        (data) => {
          this.name = data.name;
          this.balance = data.balance;
          console.log(data);
        }
      )
  }

  depositDialog(): void {
    const dialogRef = this.dialog.open(DepositDialogComponent, {
      width: '35rem'
    });
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { WithdrawDialogComponent } from './withdraw-dialog/withdraw-dialog.component';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';
import { DepositDialogComponent } from './deposit-dialog/deposit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule } from 'ngx-loading-x';
import { HomeRoutingModule } from './home.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { GraficoComponent } from './grafico/grafico.component';

const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 2,
  bgColor: 'rgba(40, 40, 40, 0.5)',
  bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.wanderingCubes,
  spinnerSize: 120,
  spinnerColor: 'rgb(46, 158, 31)',
  spinnerPosition: POSITION.centerCenter,
}

@NgModule({
  declarations: [
    HomeComponent,
    WithdrawDialogComponent,
    TransferDialogComponent,
    DepositDialogComponent,
    GraficoComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    TableModule,
    ButtonModule,
    FormsModule,
    HomeRoutingModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
  ],
  exports: []
})
export class HomeModule { }

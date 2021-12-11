import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
// import { HomeComponent } from './components/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Interceptor } from './interceptor/token.interceptor.module';
import { MatDialogModule } from '@angular/material/dialog';
// import { DepositDialogComponent } from './components/home/deposit-dialog/deposit-dialog.component';
// import { WithdrawDialogComponent } from './components/home/withdraw-dialog/withdraw-dialog.component';
// import { TransferDialogComponent } from './components/home/transfer-dialog/transfer-dialog.component';
// import { HomeAdminComponent } from './components/home-admin/home-admin.component';
// import { EditUserComponent } from './components/home-admin/edit-user/edit-user.component';
// import { UploadArquivoComponent } from './components/home-admin/upload-arquivo/upload-arquivo.component';

import { MatPaginatorModule } from '@angular/material/paginator';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// import { HomeModule } from './components/home/home.module';

import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule } from 'ngx-loading-x';
import { CommonModule } from '@angular/common';
import { Error404Component } from './components/error404/error404.component';

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
    AppComponent,
    LoginComponent,
    CadastroComponent,
    Error404Component,
    // HomeComponent,
    // DepositDialogComponent,
    // WithdrawDialogComponent,
    // TransferDialogComponent,
    // HomeAdminComponent,
    // EditUserComponent,
    // UploadArquivoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    TableModule,
    ButtonModule,
    // HomeModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    Interceptor
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

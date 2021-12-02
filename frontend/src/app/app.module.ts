import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Interceptor } from './interceptor/token.interceptor.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DepositDialogComponent } from './components/home/deposit-dialog/deposit-dialog.component';
import { WithdrawDialogComponent } from './components/home/withdraw-dialog/withdraw-dialog.component';
import { TransferDialogComponent } from './components/home/transfer-dialog/transfer-dialog.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { EditUserComponent } from './components/home-admin/edit-user/edit-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    DepositDialogComponent,
    WithdrawDialogComponent,
    TransferDialogComponent,
    HomeAdminComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    Interceptor
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

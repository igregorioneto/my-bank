import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LoginRoutingModule } from '../login/login.routing.module';
import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule } from 'ngx-loading-x';
import { CadastroRoutingModule } from './cadastro.routing.module';

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
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    TableModule,
    ButtonModule,
    FormsModule,
    CadastroRoutingModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
  ]
})
export class CadastroModule { }

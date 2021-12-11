import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from '../login/login.routing.module';
import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule } from 'ngx-loading-x';
import { Error404RoutingModule } from './error404.routing.module';

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
    HttpClientModule,
    LoginRoutingModule,
    Error404RoutingModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
  ]
})
export class Error404Module { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptor/token.interceptor';
import { HomeComponent } from './home.component';
import { GuardGuard } from 'src/app/guard/guard.guard';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    GuardGuard,
  ]
})
export class HomeModule { }

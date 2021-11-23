import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly servicesService: ServicesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.servicesService.retrive();
    console.log(token);
    const authReq = request.clone({
      headers: new HttpHeaders().set('x-access-token', token)
    });
    
    return next.handle(authReq);
  }
}

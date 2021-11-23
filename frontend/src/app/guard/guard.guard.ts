import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private readonly servicesService: ServicesService) {}

  canActivate() {
    let token = this.servicesService.retrive();
    if (token === '' || token === null || token === undefined) return false;
    
    return true;
  }
  
}

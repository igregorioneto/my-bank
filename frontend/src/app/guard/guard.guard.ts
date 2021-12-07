import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly homeService: HomeService,
    private readonly router: Router
    ) {}

  canActivate() {
    let token = this.servicesService.retrive();
    if (token === '' || token === null || token === undefined) {
      return false;
    } else {
      this.homeService.userLogged()
      .subscribe(
        async data => {
          if (data.roles === 'admin') {
            this.router.navigateByUrl('admin', { replaceUrl: true });
          } else {
            this.router.navigateByUrl('home', { replaceUrl: true })
          }
        });
      
      return true;
    }
    
  }
  
}

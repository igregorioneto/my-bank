import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = environment.url;

  constructor(
    private readonly http: HttpClient,
    private readonly servicesService: ServicesService
  ) {}

  public userLogged(): Observable<any> {
    let token = this.servicesService.retrive();
    let headers = new HttpHeaders().set('x-access-token', token);
    console.log(headers.get('x-access-token'));
    return this.http.get<any>(`${this.url}/user/logged`, {headers: headers});
  }
}

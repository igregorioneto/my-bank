import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicesService } from './services.service';
import { map, tap, delay } from 'rxjs/operators';

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
    return this.http.get<any>(`${this.url}/user/logged`);
  }

  public usersCreateJob(file: Set<File>): Observable<any> {
    const formData = new FormData();
    file.forEach(file => formData.append('file', file, file.name));
    const request = new HttpRequest('POST', `${this.url}/user/admin/create`, formData);
    return this.http.request(request);
  }

  public countAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.url}/transaction/count`);
  }
}

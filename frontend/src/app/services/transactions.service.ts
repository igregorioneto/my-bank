import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private url = environment.url;

  constructor(private readonly http: HttpClient) { }

  deposit(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/transaction/deposit`, data);
  }
}

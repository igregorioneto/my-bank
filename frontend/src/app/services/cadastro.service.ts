import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  public create(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user`, user);
  }
}

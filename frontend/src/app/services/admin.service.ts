import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = environment.url;

  constructor(private readonly http: HttpClient,) { }

  public getUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.url}/user`);
  }

  public updateUser(data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/user`, data);
  }

  public deleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.url}/user`);
  }
}

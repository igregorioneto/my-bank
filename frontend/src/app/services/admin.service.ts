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

  public countAllUsersRoles(): Observable<any> {
    return this.http.get<any>(`${this.url}/user/count`);
  }

  public updateUser(id: any,data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/user/${id}`, data);
  }

  public deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/user/${id}`);
  }
}

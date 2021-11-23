import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private tokenKey: string = 'x-access-token';

  constructor() { }
  // TOKEN
  store(content: any) {
    localStorage.setItem(this.tokenKey, JSON.stringify(content));
  }

  remove() {
    localStorage.removeItem(this.tokenKey);
  }

  retrive() {
    let stroredToken = localStorage.getItem(this.tokenKey);
    if (!stroredToken) throw 'nenhum token encontrado';
    return stroredToken;
  }
}

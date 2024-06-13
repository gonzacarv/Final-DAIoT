import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:8000'

  constructor(private _http: HttpClient, private _router: Router) { }

  async login(username: string, password: string) {
    let response = await firstValueFrom(this._http.post<any>(
      `${this.uri}/login`, {username: username, password: password}
    ));
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.signed_user.nombre);  
      console.log(localStorage.getItem('username')); 
      this._router.navigate(['/selection']);
    }
  }
  
  

  logout() {
    localStorage.clear();
  }

  public isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}

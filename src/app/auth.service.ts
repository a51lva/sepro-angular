import { Injectable} from '@angular/core';
import { Observable } from  "rxjs";
import { HttpClient } from  "@angular/common/http";
import {environment} from  "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL:string;

  constructor(protected http: HttpClient) { this.apiURL = environment.apiURL}

  authenticate(username, password):Observable<Object>{
    return this.http.post<Object>('http://127.0.0.1:5000/api/users/login',JSON.stringify(username,password));
  }

  isAuthenticaded(){
    const token = this.getToken();
    return token;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token){
    localStorage.setItem('token',token);
  }  
}

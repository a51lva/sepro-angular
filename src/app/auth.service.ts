import { Injectable} from '@angular/core';
import { Observable } from  "rxjs";
import { HttpClient, HttpHeaders } from  "@angular/common/http";
import {environment} from  "../environments/environment";
import base64 from 'base-64';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL:string = environment.apiURL;;
  
  constructor(private http: HttpClient) { 
  }

  authenticate(username, password){
    let httpHeaders = {
      'Content-Type':  'application/json'
    };
    

    const httpOptions = {
      headers: new HttpHeaders(httpHeaders)
    };
    
    return this.http.post(`${this.apiURL}/users/login`, JSON.stringify({username: username,password: password}), httpOptions);
  }

  userProfileRequest(userid){    
    return this.http.get(`${this.apiURL}/users/${userid}`,this.httpRequestOptions());
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }

  isAuthenticaded(){
    const token = this.getToken();
    return !!token;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token){
    localStorage.setItem('token',token);
  }

  getUserid(){
    let user_id:any = 0;
    let token = this.getToken();

    if (token != null){
      let res = token.split('.',token.length);
      user_id = JSON.parse(
        base64.decode(res[1])
      );
      user_id = user_id['sub'];
    }

    return user_id;
  }


  getUserProfile(){
    const userProfile = localStorage.getItem('userprofile');
    return userProfile? JSON.parse(localStorage.profile): null;
  }

  setUserProfile(userProfile){
    localStorage.setItem('userprofile',userProfile)
  }

  httpRequestOptions(){
    let httpHeaders = {
      'Content-Type':  'application/json'
    };
    
    if(this.isAuthenticaded){
      httpHeaders['Authorization'] = this.getToken();
    }

    const httpOptions = {
      headers: new HttpHeaders(httpHeaders)
    };
    
    return httpOptions;
  }
}

import { Injectable} from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import {environment} from  "../environments/environment";
import base64 from 'base-64';
import { RequestOption } from './request-option';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL:string = environment.apiURL;;
  private requestOptions: RequestOption;

  constructor(private http: HttpClient) { 
    this.requestOptions = new RequestOption();
  }

  authenticate(username, password){
    return this.http.post(`${this.apiURL}/users/login`, JSON.stringify({username: username,password: password}), this.requestOptions.httpRequestOptions(false,''));
  }

  userProfileRequest(userid){
    let token = this.getToken();
    return this.http.get(`${this.apiURL}/users/${userid}`, this.requestOptions.httpRequestOptions(true,token));
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userprofile');
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
      let res = token.split('.');
      user_id = JSON.parse(
        base64.decode(res[1])
      );
      user_id = user_id['sub'];
    }

    return user_id;
  }


  getUserProfile(){
    const userProfile = localStorage.getItem('userprofile');
    return userProfile? JSON.parse(userProfile): null;
  }

  setUserProfile(userProfile){
    localStorage.setItem('userprofile',JSON.stringify(userProfile))
  }
}

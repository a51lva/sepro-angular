import { Injectable} from '@angular/core';
import { Observable } from  "rxjs";
import { HttpClient, HttpHeaders } from  "@angular/common/http";
import {environment} from  "../environments/environment";
import {base64} from 'base-64';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL:string = environment.apiURL;;
  private requestHeader = new HttpHeaders(
    {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Cache-Control': 'no-cache'
    }
    
  );
  private requestOptions = {};
  constructor(protected http: HttpClient) { 
  }

  authenticate(username, password){
    this.authorizationHeaderAppend();     
    this.requestOptions = {headers: this.requestHeader};
    return this.http.post(`${this.apiURL}/users/login`, JSON.stringify(username,password), this.requestOptions);
  }

  userProfileRequest(userid){
    this.authorizationHeaderAppend();  
    this.requestOptions = {headers: this.requestHeader};
    return this.http.get(`${this.apiURL}/users/${userid}`,this.requestOptions);
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
    let user_id:any;
    let token = this.getToken();
    if (token != null){
      let res = token.split(".");
      user_id = JSON.parse(base64.decode(res[1]));
      user_id = user_id['sub'];
    }
    return user_id['sub']
  }


  getUserProfile(){
    const userProfile = localStorage.getItem('userprofile');
    return userProfile? JSON.parse(localStorage.profile): null;
  }

  setUserProfile(userProfile){
    localStorage.setItem('userprofile',userProfile)
  }

  authorizationHeaderAppend(){
    if(this.isAuthenticaded){
      this.requestHeader.append('Authorization',this.getToken());
    }
  }
}

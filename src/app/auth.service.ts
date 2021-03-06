import { Injectable} from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import {environment} from  "../environments/environment";
import base64 from 'base-64';
import { RequestOption } from './request-option';
import { shareReplay } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL:string = environment.apiURL;;
  helper = new JwtHelperService();

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'WcFixLzzuCfHl6PclUFieK3fFeahpjEH',
    domain: 'dev-pd0bnyfm.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid'
  });

  constructor(private http: HttpClient, public router: Router) { 
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  authenticate(username, password){
    return this.http.post(
      `${this.apiURL}/users/login`, 
      JSON.stringify({username: username,password: password})
    ).pipe(shareReplay());
  }

  userProfileRequest(userid){
    return this.http.get(
      `${this.apiURL}/users/${userid}`
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userprofile');
  }

  isAuthenticaded(){
    const token = this.getToken();
    if(!token){
      return false;
    }
    
    const isTokenExpired = this.helper.isTokenExpired(token)
    
    return !isTokenExpired;
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


  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
      } else if (err) {
        //this.router.navigate(['/home']);
        console.log(err);
      }

      this.isAuthenticated();
    });
  }

  private localLogin(authResult): void {
    localStorage.setItem('isLoggedIn', 'true');
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    this.router.navigateByUrl('/');
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logoutAuth0(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('/');
  }

  public isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

}

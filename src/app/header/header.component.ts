import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, Validators } from '@angular/forms';
import { map,debounceTime,distinctUntilChanged, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links= [
    {
      name:'Home',
      path:'/',
      authentication:null
    },
    {
      name:'Create Offer',
      path:'create-offer',
      authentication: true
    },
    {
      name:'Faq',
      path:'faq',
      authentication:null
    },
    {
      name:'Sign In',
      path:'sign-in',
      authentication:false
    },
    {
      name:'Sign out',
      path:'sign-out',
      authentication:true
    }
  ];
  logoImage = "../../assets/logo.png";

  private isAuthenticated: boolean = false;
  private userProfile:any = null;
  searchField: FormControl;

  constructor(public authService: AuthService, private router: Router) {
    
   }

  ngOnInit() { 
    this.authService.handleAuthentication();   
    this.userProfileAuthentication();
    this.searchPerform();
    this.auth0AuthenticationHandle();        
  }

  userProfileAuthentication(){
    this.isAuthenticated = this.authService.isAuthenticaded();
    this.userProfile = this.authService.getUserProfile();

    if( this.userProfile == null && this.isAuthenticated){
      this.authService.userProfileRequest(this.authService.getUserid())
      .subscribe(
        (result) => {
          this.userProfile = result;
          this.authService.setUserProfile(this.userProfile);
        },
        (error) => {
          console.log(error);
          this.authService.logout();
        }
      );
    }else{
      if(!this.isAuthenticated){
        this.authService.logout(); 
      }           
    }
  }

  searchPerform(){
    this.searchField = new FormControl('', Validators.required);
    this.searchField.valueChanges.pipe(
      debounceTime(400), 
      distinctUntilChanged(),
      filter(term => {return this.searchField.valid}), 
      map(term =>{
      return term.replace(/<(?:.|\n)*?</gm,'');
    }))
    .subscribe((value) => {
      this.router.navigateByUrl(`/search/${value}`);
    });
  }
  
  login(){
    this.authService.login();
  }

  public auth0AuthenticationHandle():void{
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.authService.renewTokens();
    }
  }

  public auth0Logout():void{
    this.authService.logoutAuth0(); 
    window.location.replace('https://dev-pd0bnyfm.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A4200&client_id=WcFixLzzuCfHl6PclUFieK3fFeahpjEH');   
  }

}

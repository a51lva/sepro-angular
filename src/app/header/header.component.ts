import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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
      name:'became a provider',
      path:'became-provider',
      authentication: null
    },
    {
      name:'Faq',
      path:'faq',
      authentication:null
    },
    {
      name:'Sign Up',
      path:'sign-up',
      authentication:false
    },
    {
      name:'Sign In',
      path:'sign-in',
      authentication:false
    },
    {
      name:'Profile',
      path:'profile',
      authentication:true
    }
  ];

  private isAuthenticated = false;
  private userProfile = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
     this.isAuthenticated = this.authService.isAuthenticaded();
     this.userProfile = this.authService.getUserProfile();

     if( this.userProfile === null && this.isAuthenticated){
       this.authService.userProfileRequest(this.authService.getUserid()).subscribe(result =>{
         this.userProfile = result;
         this.authService.setUserProfile(this.userProfile);
       });
     }else{
         this.authService.logout();            
     }
  }

}

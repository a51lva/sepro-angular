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
      name:'Sign out',
      path:'sign-out',
      authentication:true
    }
  ];

  private isAuthenticated = false;
  private userProfile = null;
  searchField: FormControl;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.searchField = new FormControl('', Validators.required);
      this.isAuthenticated = this.authService.isAuthenticaded();
      this.userProfile = this.authService.getUserProfile();

      if( this.userProfile == null && this.isAuthenticated){
        this.authService.userProfileRequest(this.authService.getUserid()).pipe(
          filter(profile => {return profile != null})
        )
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

}

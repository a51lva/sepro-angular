import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  formValidation:boolean = false;
  formValidationMessage:string = "Please validate your form and try again!";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.router.url == 'sign-out'){
      this.authService.logout();
      this.router.navigateByUrl('/home');
    }
    else{
      if(this.authService.isAuthenticaded()){
        this.router.navigateByUrl('/home');
      }

      this.createFormControls();
      this.createForm();
    } 
  }

  onSubmit(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.formValidation = this.loginForm.invalid;

    if(this.loginForm.valid){
      this.authService.authenticate(username,password).subscribe(
        (res) => { 
          let token = res['authorization'];
          this.authService.setToken(token)
          let userId = this.authService.getUserid();
          this.authService.userProfileRequest(userId).subscribe(
            (profile) => {
              this.authService.setUserProfile(profile);
              this.formValidation = false;
              this.router.navigateByUrl('/home');
            },
            (error) => {
              this.password.setValue('');
              this.authService.logout();
              this.formValidation = true;
              this.formValidationMessage = "Error getting user Profile, please authenticate again!";
            },
            () => {console.log("Request Complete")}
          );
        },
        (error) => {
          this.password.setValue('');
          this.formValidation = true;
          this.formValidationMessage = error['message'];
        }
      )
    }
  }

  createFormControls(){
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createForm(){
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

}

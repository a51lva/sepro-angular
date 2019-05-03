import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  return: string;
  formValidation:boolean = false;
  formValidationMessage:string = "Please validate your form and try again!";

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/home');    
    if(this.authService.isAuthenticaded()){      
      window.location.replace(this.return);
    }

    this.createFormControls();
    this.createForm();
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
              window.location.replace(this.return)
            },
            (error) => {
              this.password.setValue('');
              this.authService.logout();
              this.formValidation = true;
              this.formValidationMessage = "Error getting user Profile, please authenticate again!";
            },
            () => {console.log("Request Complete")}
          );

          window.location.replace(this.return)
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

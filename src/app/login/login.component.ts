import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    if(this.authService.isAuthenticaded()){
      this.router.navigateByUrl('/home');
    }

    this.createFormControls();
    this.createForm();
  }

  onSubmit(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.formValidation = this.loginForm.invalid;

    if(this.loginForm.valid){
      this.authService.authenticate(username,password).subscribe((res) => {
        let token = res['authorization'];
        if(token){
          this.authService.setToken(token)
          this.router.navigateByUrl('/home');
        }else{
          this.password.setValue('');
          this.formValidation = true;
          this.formValidationMessage = res['message'];
        }
      })
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

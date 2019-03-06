import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isAuthenticaded()){
      this.router.navigateByUrl('/home');
    }
    
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    
    this.authService.authenticate(username,password).subscribe((res) => {
      let token = res['authorization']
      this.authService.setToken(token)
      this.router.navigateByUrl('/home');
    })
  }

}

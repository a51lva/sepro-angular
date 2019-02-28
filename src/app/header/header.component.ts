import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links= ['home','became a provider','faq','sign up','sign in'];
  constructor() { }

  ngOnInit() {
  }

}

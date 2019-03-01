import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  links = [
    {
      name:'About us',
      path:'about',
      type:'sepro'
    },
    {
      name:'Help',
      path:'help',
      type:'sepro'
    },
    {
      name:'Privacy Ppolicy',
      path:'privacy',
      type:'sepro'
    },
    {
      name:'Terms of Use',
      path:'terms',
      type:'sepro'
    },
    {
      name:'Profile',
      path:'profile',
      type:'account'
    },
    {
      name:'Services',
      path:'services',
      type:'account'
    },
    {
      name:'Tickets',
      path:'tickets',
      type:'account'
    },
    {
      name:'Favorite',
      path:'favorite',
      type:'account'
    }
  ];
  year = new Date().getFullYear();
  
  constructor() { }

  ngOnInit() {
  }

}

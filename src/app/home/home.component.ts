import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredCards = [1,2,3,4];
  services = [1,2,3,4];
  image = "../../assets/picture.jpg";
  constructor() { }

  ngOnInit() {
  }

}

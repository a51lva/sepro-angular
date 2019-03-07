import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  featuredCards = [1,2,3,4];
  services = [1,2,3,4];
  image = "../../assets/picture.jpg";
  
  constructor() { }

  ngOnInit() {
  }

}

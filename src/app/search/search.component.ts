import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, retry } from 'rxjs/operators';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  featuredCards = [1,2,3,4];
  services = [1,2,3,4];
  image = "../../assets/picture.jpg";
  searches =  [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        {return of(params.get('searchQuery'))}
      )
    ).subscribe(value => {
      this.searches = [value]
    });
  }

}

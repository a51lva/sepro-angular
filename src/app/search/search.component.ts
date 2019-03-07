import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, retry } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { SearchService } from '../search.service';
import { Offer } from '../offer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  featuredCards = [1,2,3,4];
  image = "../../assets/picture.jpg";
  searcheItems:Observable<Offer[]>;

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        {return of(params.get('searchQuery'))}
      )
    )
    .subscribe(value => {
      this.searcheItems = this.searchService.offers(value);
    });
  }

}

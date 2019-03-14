import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/offer.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { of} from 'rxjs';
import { Offer } from 'src/app/offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;

  constructor(private offerService: OfferService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        {return of(params.get('id'))}
      )
    )
    .subscribe(value => {
      const offer$ = this.offerService.load(Number(value));
      offer$.pipe(
        filter((value) => {
          return value != null
      }))
      .subscribe(
        (value) => {
          this.offer = value[0];
        },
        (error)=>{
          this.router.navigateByUrl('/404');
        }
      )
    });
  }

}

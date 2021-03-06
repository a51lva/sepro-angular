import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { Observable, Subject, merge, of, timer} from 'rxjs';
import { take,  switchMap, skip, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredCards = [1,2,3,4];
  services = [1,2,3,4];
  image = "../../assets/picture.jpg";
  
  offers$: Observable<Offer[]>;
  showNotification$: Observable<boolean>;
  forceReload$ = new Subject<void>();

  filterargs = {location: 'Lisbon'};
  
  constructor(private offerService: OfferService, private router: Router) { }

  ngOnInit() {
    const initialOffers$ = this.getDataOnce();
    const updates$ = this.forceReload$.pipe(
      mergeMap(() => this.getDataOnce())
    );
    
    this.offers$ = merge(initialOffers$, updates$);

    setTimeout(()=>{
      this.forceReload();
    },2000)
  }

  getDataOnce() {
    return this.offerService.loadAllOffers.pipe(take(1));
  }

  forceReload() {
    this.offerService.setNotification = false;
    this.offerService.forceReload();
    
    const timer$ = timer(0, environment.REFRESH_INTERVAL);
    this.showNotification$ = timer$.pipe(
      switchMap(() => of(
          this.offerService.showNotification
        )
      )
    )
    this.forceReload$.next();
  }

  offerClick(id:any){
    this.router.navigateByUrl(`offer/${id}`);
  }

  trackByFn(index, item) {    
    return item.id * Math.random();
  }

}
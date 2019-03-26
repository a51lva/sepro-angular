import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer, of } from 'rxjs';
import { Offer } from './offer';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiURL:string = environment.apiURL;  

  private cache$: Observable<Array<Offer>>;
  private reload$ = new Subject<void>();
  private notification: boolean;
  
  constructor(private http: HttpClient, private authService: AuthService) {
    const cachedOffers = localStorage.getItem('offers');

    if(cachedOffers != null){
      this.cache$ = of(JSON.parse(cachedOffers));
    }

  }
  
  create(item:Offer): Observable<Offer>{
    item.provider = this.authService.getUserid();
    return this.http.post<Offer>(
      `${this.apiURL}/offer`, JSON.stringify(item)
    ).pipe(shareReplay());
  }

  load(offerId:number):Observable<Offer[]>{
    return this.http.get<Offer[]>(
      `${this.apiURL}/offer/${offerId}`
    ).pipe(shareReplay());
  }

  loadFromCache(offerId:number):Offer{
    let offer:Offer = null;
    const offers:Offer[] = JSON.parse(localStorage.getItem('offers'));
    if(offers){
      offer = offers.find(offer => offer.id == offerId)
    }
    return offer;
  }
  
  loadByProviderID(providerId:number):Observable<Offer[]>{
    return this.http.get<Offer[]>(
      `${this.apiURL}/offers/${providerId}`
    );
  }
  
  get loadAllOffers(){
    if(!this.cache$){
      const localOffers = JSON.parse(localStorage.getItem('offers'));
      const timer$ = timer(0, environment.REFRESH_INTERVAL);      
        this.cache$ = timer$.pipe(
          switchMap(() => this.loadByProviderID(0)
            .pipe(
              tap(result => {
                if(localOffers){
                  if(result.length >localOffers.length){
                    this.setNotification = true;
                    localStorage.setItem('offers', JSON.stringify(result))
                    return result
                  }else{
                    this.setNotification = false;
                    return localOffers
                  }
                }else{
                  this.setNotification = false;
                  localStorage.setItem('offers', JSON.stringify(result))
                  return result
                }
              })
            )
          ),
          takeUntil(this.reload$),
          shareReplay(environment.CACHE_SIZE)
        )
    }

    return this.cache$
  }

  forceReload(){
    this.cache$ = null;
    this.reload$.next();    
  }

  get showNotification(){
    return this.notification;
  }

  set setNotification(value:boolean){
    this.notification = value
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from './offer';
import { RequestOption } from './request-option';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiURL:string = environment.apiURL;  
  private requestOptions: RequestOption;
  
  constructor(private http: HttpClient, private authService: AuthService) {
      this.requestOptions = new RequestOption();
   }
  
  create(item:Offer): Observable<Offer>{
    const token = this.authService.getToken();
    item.provider = this.authService.getUserid();

    return this.http.post<Offer>(`${this.apiURL}/offer`, JSON.stringify(item), this.requestOptions.httpRequestOptions(true, token)).pipe(shareReplay());
  }

  load(offerId:number):Observable<Offer>{
    return this.http.get<Offer>(`${this.apiURL}/offer/${offerId}`, this.requestOptions.httpRequestOptions(false,'')).pipe(shareReplay());
  }
  
  loadByProviderID(providerId:number):Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.apiURL}/offers/${providerId}`, this.requestOptions.httpRequestOptions(false,'')).pipe(shareReplay());
  }  

}

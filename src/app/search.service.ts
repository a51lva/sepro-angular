import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestOption } from './request-option';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Offer } from './offer';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiURL:string = environment.apiURL;  
  private requestOptions: RequestOption;
  
  constructor(private http: HttpClient, private authService: AuthService) { 
    this.requestOptions = new RequestOption();
  }
  
  offers(queryText:string):Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.apiURL}/search?type=offer&title=${queryText}`, this.requestOptions.httpRequestOptions(false,''));
  }
}

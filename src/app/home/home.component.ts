import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredCards = [1,2,3,4];
  services = [1,2,3,4];
  image = "../../assets/picture.jpg";
  allOffers: Observable<Offer[]>;

  constructor(private offerService: OfferService, private router: Router) { }

  ngOnInit() {
    this.allOffers = this.offerService.loadByProviderID(0);
  }

  offerClick(id:any){
    this.router.navigateByUrl(`offer/${id}`);
  }

}

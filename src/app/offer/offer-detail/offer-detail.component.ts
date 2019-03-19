import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/offer.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Offer } from 'src/app/offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;

  constructor() {
    this.offer = new Offer();
    this.offer.title = 'Some title';
    this.offer.description = 'description';
    this.offer.provider = 3;
    this.offer.serviceCategory = 1;
    this.offer.startDate = '2019-03-18 00:00:00.000000';
    this.offer.endDate = '2019-03-18 00:00:00.000000';
    this.offer.location = 'Lisbon';
    this.offer.reward = 123;
    this.offer.priority = 1;
   }

  ngOnInit() {
  }
}

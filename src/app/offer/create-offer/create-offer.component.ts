import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/offer.service';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/offer';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  createOfferForm: FormGroup;
  title:FormControl;
  description: FormControl;
  location: FormControl;
  reward: FormControl;
  category: FormControl;
  priority: FormControl;
  startDate: FormControl;
  endDate: FormControl;


  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit(offer:Offer):Observable<Offer>{
    return this.offerService.create(offer);
  }

  createFormControls(){
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.reward = new FormControl('', Validators.required);
    this.category = new FormControl('', Validators.required);
    this.priority = new FormControl('', Validators.required);
    this.startDate = new FormControl('', Validators.required);
    this.endDate = new FormControl('', Validators.required);
  }

  createForm(){
    this.createOfferForm = new FormGroup({
      title: this.title,
      description: this.description,
      location: this.location,
      reward: this.reward,
      category: this.category,
      priority: this.priority,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

}

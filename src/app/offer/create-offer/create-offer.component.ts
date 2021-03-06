import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/offer.service';
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
  service_category: FormControl;
  priority: FormControl;
  start_date: FormControl;
  end_date: FormControl;
  formValidation:boolean = false;
  formValidationMessage:string = "Please validate your form and try again!";

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit(){
    this.formValidation = !this.createOfferForm.valid;
    const item = this.createOfferForm.value;
    
    if(this.createOfferForm.valid){
      this.offerService.create(item).subscribe(
        (result) => {
          console.log(JSON.stringify(result))
        },
        (error) => {
          this.formValidation = true;
          this.formValidationMessage = "Error on creating the offer, please validate your form and submit again!";
        },
        () => {
          this.createOfferForm.reset();
          alert("Request complete sucessfully!");
          console.log("Request Complete")}
      )
    }else{
      if(this.createOfferForm.errors !== null){
        this.formValidationMessage = this.createOfferForm.errors.dates;
      }else{
        this.formValidationMessage = "Please validate your form and submit again!";
      }
      
    }
  }

  createFormControls(){
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.reward = new FormControl('', Validators.required);
    this.service_category = new FormControl('', Validators.required);
    this.priority = new FormControl('', Validators.required);
    this.start_date = new FormControl('', Validators.required);
    this.end_date = new FormControl('', Validators.required);
  }

  createForm(){
    this.createOfferForm = new FormGroup({
      title: this.title,
      description: this.description,
      location: this.location,
      reward: this.reward,
      service_category: this.service_category,
      priority: this.priority,
      start_date: this.start_date,
      end_date: this.end_date
    }, {validators: this.dateLessThan('start_date', 'end_date')});
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Start Date should be less than End Date"
        };
      }
      return {};
    }
  }

}

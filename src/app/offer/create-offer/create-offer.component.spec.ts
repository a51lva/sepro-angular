import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CreateOfferComponent } from './create-offer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OfferService } from 'src/app/offer.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

describe('CreateOfferComponent', () => {
  let component: CreateOfferComponent;
  let fixture: ComponentFixture<CreateOfferComponent>;

  beforeEach(async(() => {
    class RouterStub {
      navigateByUrl(url: string) { return url; }
    
    }
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ CreateOfferComponent ],
      providers:[OfferService, AuthService, { provide: Router, useClass: RouterStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([Router], (router: Router) => {
    expect(component).toBeTruthy();
  }));
});

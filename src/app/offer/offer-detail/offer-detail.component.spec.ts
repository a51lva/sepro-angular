import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { OfferDetailComponent } from './offer-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OfferService } from 'src/app/offer.service';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

describe('OfferDetailComponent', () => {
  let component: OfferDetailComponent;
  let fixture: ComponentFixture<OfferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [ OfferDetailComponent ],
      providers:[OfferService, AuthService]
    }).compileComponents();   
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create', inject([Router], (router: Router) => {
    expect(component).toBeTruthy();
  }));
});

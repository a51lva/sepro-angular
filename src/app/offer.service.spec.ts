import { TestBed, getTestBed } from '@angular/core/testing';
import { OfferService } from './offer.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Offer } from './offer';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

describe('OffersService', () => {
  let injector;
  let offerService: OfferService;
  let httpMock: HttpTestingController;
  let offer: Offer;

  offer = new Offer();
  offer.title = 'Some title';
  offer.description = 'description';
  offer.provider = 3;
  offer.serviceCategory = 1;
  offer.startDate = '2019-03-18 00:00:00.000000';
  offer.endDate = '2019-03-18 00:00:00.000000';
  offer.location = 'Lisbon';
  offer.reward = 123;
  offer.priority = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OfferService, AuthService]
    })

    injector = getTestBed();
    offerService = injector.get(OfferService);
    httpMock = injector.get(HttpTestingController);
    
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(offerService).toBeTruthy();
  });

  it('Should load the offer with Id: 1', () => {
    offerService.load(1).subscribe(result => {
      expect(result).toBeTruthy();
    })

    const req = httpMock.expectOne( environment.apiURL+'/offer/1');
    expect(req.request.method).toBe('GET');
  })

  it('should load all offers', () => {
    const length = 0;
    offerService.loadByProviderID(0).subscribe((result)=>{
      expect(result.length).toBeGreaterThan(length);
    })

    const req = httpMock.expectOne(environment.apiURL+'/offers/0');
    expect(req.request.method).toBe('GET');
  })

  it('Should load all offers from providerId: 5', () => {
    const values = []
    offerService.loadByProviderID(5).subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    })

    const req = httpMock.expectOne(environment.apiURL+'/offers/5');
    expect(req.request.method).toBe('GET');

  })

  it('Should create a new offer on the database', () => {
    offerService.create(offer).subscribe(result => {
      expect(result.title).toBe(offer.title);
    })

    const req = httpMock.expectOne(environment.apiURL+'/offer');
    expect(req.request.method).toBe('POST');
  })
  
});

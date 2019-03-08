import { TestBed, getTestBed } from '@angular/core/testing';

import { OfferService } from './offer.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('OffersService', () => {
  let injector;
  let offerService: OfferService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OfferService]
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

  fit('Should load the offer with Id: 1', () => {
    offerService.load(1).subscribe(result => {
      expect(result.length).toBe(1);
    })

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/offer/1');
    expect(req.request.method).toBe('GET');
  })

  fit('should load all offers', () => {
    const length = 0;
    offerService.loadByProviderID(0).subscribe((result)=>{
      expect(result.length).toBeGreaterThan(length);
    })

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/offers/0');
    expect(req.request.method).toBe('GET');
  })

  fit('Should load all offers from providerId: 5', () => {
    offerService.loadByProviderID(5).subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    })

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/offers/5');
    expect(req.request.method).toBe('GET');
  })
  
  fit('should not load an offer', () => {
    const length = 0;
    offerService.loadByProviderID(null).subscribe((result)=>{
      expect(result.length).toBe(length);
    })

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/offers/null');
    expect(req.request.method).toBe('GET');
  })
  
});

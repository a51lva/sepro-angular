import { TestBed, getTestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchService', () => {
  let injector;
  let searchService: SearchService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[SearchService]
    });

    injector = getTestBed();
    searchService = injector.get(SearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(searchService).toBeTruthy();
  });

  it('Should get Search Result', ()  => {
    const searchResult = [{"id": 1, "description": "Nine years on the market. Specialists from the \"124 Service Hypermarket\" will help you solve a lot of urgent problems that previously took a lot of time and effort: \nCleaning of various degrees of complexit\nAny household repair\nBuilding repair\nPlumbing and electrical work\nWhat is especially important - all work is done qualitatively", "status": 1, "reward": 42, "service_category": 1, "created_at": "2019-03-04T14:44:14.299770", "provider": 5, "priority": 1, "location": "Porto", "title": "Cargo Traffic", "end_date": "2018-01-24T00:00:00", "start_date": "2018-01-01T00:00:00"}]
    searchService.offers('cargo').subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    })
    
    const req = httpMock.expectOne('http://127.0.0.1:5000/api/search?type=offer&title=cargo');
    expect(req.request.method).toBe("GET");
    req.flush(searchResult);
  })

  it('Shouldn\'t get an Search Result for empty search query', ()  => {
    const searchResult = []
    searchService.offers('').subscribe(result => {
      expect(result.length).toBe(0);
    })
    
    const req = httpMock.expectOne('http://127.0.0.1:5000/api/search?type=offer&title=');
    expect(req.request.method).toBe("GET");
    req.flush(searchResult);
  })

  it('Shouldn\'t get an Search Result for search query Silva', ()  => {
    const searchResult = []
    searchService.offers('silva').subscribe(result => {
      expect(result.length).toBe(0);
    })
    
    const req = httpMock.expectOne('http://127.0.0.1:5000/api/search?type=offer&title=silva');
    expect(req.request.method).toBe("GET");
    req.flush(searchResult);
  })
});

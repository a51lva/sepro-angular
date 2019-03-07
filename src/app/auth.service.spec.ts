import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let injector;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthService]
    });

    injector = getTestBed();
    authService = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });
  
  afterEach(()=>{
    httpMock.verify();
    localStorage.removeItem('token');
  })

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should retun true from isAuthenticated when there is a token', () =>{
    localStorage.setItem('token','silva');
    expect(authService.isAuthenticaded()).toBeTruthy();
  });

  it('Should return false from isAuthenticated when there is no token', () => {
    expect(authService.isAuthenticaded()).toBeFalsy();
  })

  it('should perfom authentication correctly',() => {
    const authorizadummution = [{"authorization": 'c421361e-7d45-493a-a827-93b36017b48b'}];
    authService.authenticate('admin', 'abc123').subscribe(res =>{
      expect(res).toEqual(authorizadummution);
    });

    const req = httpMock.expectOne('http://127.0.0.1:5000/api/users/login');
    expect(req.request.method).toBe("POST");
    req.flush(authorizadummution);
  });

});

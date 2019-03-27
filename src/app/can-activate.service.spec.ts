import { TestBed } from '@angular/core/testing';

import { CanActivateService } from './can-activate.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CanActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[AuthService]
  }));

  it('should be created', () => {
    const service: CanActivateService = TestBed.get(CanActivateService);
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    class RouterStub {
        navigateByUrl(url: string) { return url; }
    }
    
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      declarations: [ LogoutComponent ],
      providers: [
       { provide: Router, useClass: RouterStub }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([Router], (router: Router) => {
    expect(component).toBeTruthy();
  }));
});

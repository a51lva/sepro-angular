import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FilterComponent } from './filter/filter.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { LogoutComponent } from './logout/logout.component';
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';
import { Page404Component } from './page404/page404.component';
import { ReversePipe } from './reverse.pipe';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { FilterPipe } from './filter.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    FilterComponent,
    LoginComponent,
    SearchComponent,
    LogoutComponent,
    CreateOfferComponent,
    Page404Component,
    ReversePipe,
    OfferDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[FilterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

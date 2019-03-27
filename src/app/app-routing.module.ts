import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './search/search.component';
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';
import { Page404Component } from './page404/page404.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { CanActivateService } from './can-activate.service';
import { AuthService } from './auth.service';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component:LoginComponent},
  { 
    path: 'sign-out', 
    component:LogoutComponent,
    canActivate: [
      CanActivateService
    ]},
  { path: 'search', component: SearchComponent},
  { path: 'search/:searchQuery', component: SearchComponent},  
  { 
    path: 'create-offer', 
    component: CreateOfferComponent,
    canActivate: [
      CanActivateService
    ]
  },
  { path: 'offer/:id', component: OfferDetailComponent}, 
  { path: '404', component: Page404Component},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    CanActivateService
  ],
})
export class AppRoutingModule { }

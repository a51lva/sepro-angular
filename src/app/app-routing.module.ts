import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './search/search.component';
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component:LoginComponent},
  { path: 'sign-out', component:LogoutComponent},
  { path: 'search', component: SearchComponent},
  { path: 'search/:searchQuery', component: SearchComponent},  
  { path: 'create-offer', component: CreateOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

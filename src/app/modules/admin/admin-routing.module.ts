import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import {
  DriverComponent,
  FareComponent,
  IncomeComponent,
  NotificationComponent,
  PassengerComponent,
  ProfileComponent,
  ReportsComponent,
  TimeAndDistanceComponent,
  TripComponent,
  WalletComponent,
  TripPaidComponent,
  TripActiveComponent,
  TripCompleteComponent,
  CommentsComponent,
  PaymentComponent,
  PlacesComponent,
  PartnersComponent
} from './index';


const routes: Routes = [
  { path: '', redirectTo: 'summary', pathMatch: "full" },
  { path: 'summary', component: AdminComponent, runGuardsAndResolvers: 'always' },  
  { path: 'drivers', component: DriverComponent, runGuardsAndResolvers: 'always' },
  { path: 'drivers/:action', component: DriverComponent, runGuardsAndResolvers: 'always' },
  { path: 'partners', component: PartnersComponent, runGuardsAndResolvers: 'always' },
  { path: 'partners/:partner', component: PartnersComponent, runGuardsAndResolvers: 'always' },
  { path: 'fare', component: FareComponent, runGuardsAndResolvers: 'always' },
  { path: 'income', component: IncomeComponent, runGuardsAndResolvers: 'always' },
  { path: 'notification', component: NotificationComponent, runGuardsAndResolvers: 'always' },
  { path: 'passengers', component: PassengerComponent, runGuardsAndResolvers: 'always' },
  { path: 'payment', component: PaymentComponent, runGuardsAndResolvers: 'always' },
  { path: 'profile', component: ProfileComponent, runGuardsAndResolvers: 'always' },
  { path: 'reports', component: ReportsComponent, runGuardsAndResolvers: 'always' },
  { path: 'time-and-distance', component: TimeAndDistanceComponent, runGuardsAndResolvers: 'always' },
  { path: 'trips', component: TripComponent, runGuardsAndResolvers: 'always' },
  { path: 'comments', component: CommentsComponent, runGuardsAndResolvers: 'always' },
  { path: 'trips/active', component: TripActiveComponent, runGuardsAndResolvers: 'always' },
  { path: 'trips/complete', component: TripCompleteComponent, runGuardsAndResolvers: 'always' },
  { path: 'trips/paid', component: TripPaidComponent, runGuardsAndResolvers: 'always' },
  { path: 'wallet', component: WalletComponent, runGuardsAndResolvers: 'always' },
  { path: 'places',  component: PlacesComponent, runGuardsAndResolvers: 'always'},
  { path: 'places/add',  component: PlacesComponent, runGuardsAndResolvers: 'always'}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

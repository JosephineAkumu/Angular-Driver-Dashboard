import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NbListModule, NbMenuModule, NbCardModule, NbDialogModule, NbButtonModule, NbInputModule, NbSelectModule, NbToastrModule, NbTreeGridModule, NbSidebarModule, NbSpinnerModule, NbProgressBarModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniquePipe } from '../../pipes/unique.pipe';
import { AngularFireStorageModule, } from '@angular/fire/storage';
import { AgGridModule } from 'ag-grid-angular';
import { PlacePickerModule } from 'ngx-place-picker';

import {
  TripComponent,
  DriverComponent,
  PassengerComponent,
  WalletComponent,
  TimeAndDistanceComponent,
  FareComponent,
  NotificationComponent,
  ReportsComponent,
  IncomeComponent,
  ProfileComponent,
  TripPaidComponent,
  TripActiveComponent,
  TripCompleteComponent,
  CommentsComponent,
  PaymentComponent,
  PlacesComponent,
  PartnersComponent
} from './index';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { AutocompleteComponent } from 'src/app/components/autocomplete/autocomplete.component';


@NgModule({
  declarations: [AdminComponent,
    UniquePipe,
    SidenavComponent,
    TripComponent,
    DriverComponent,
    PassengerComponent,
    WalletComponent,
    TimeAndDistanceComponent,
    FareComponent,
    NotificationComponent,
    ReportsComponent,
    IncomeComponent,
    ProfileComponent,
    CommentsComponent,
    PaymentComponent,
    TripPaidComponent,
    TripActiveComponent,
    PlacesComponent,
    PartnersComponent,
    AutocompleteComponent,
    TripCompleteComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forRoot(),
    AngularFireStorageModule,
    NbInputModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    AgGridModule.withComponents([]),
    NgxDatatableModule,
    DataTablesModule,    
    NbTreeGridModule,
    PlacePickerModule,
    NbProgressBarModule
  ],
  exports: [AutocompleteComponent]
})
export class AdminModule { }

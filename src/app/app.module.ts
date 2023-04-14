import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbIconModule, NbCheckboxModule, NbAlertModule, NbMenuModule, } from '@nebular/theme';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SuccessComponent } from './components/success/success.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from "./services/auth/auth.service";
import { UserService } from "./services/user/user.service";
import { AuthGuard } from "./services/auth/auth.guard";
import { StorageBucket, AngularFireStorageModule } from '@angular/fire/storage';

// Import all services 
import { DriverService, PassengerService, TripService, CommentsService } from './services/admin/index';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MenuService } from './services/menu.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SuccessComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {}
    }),
    NbMenuModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbCheckboxModule,
    NbAlertModule,
    FormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    { provide: StorageBucket, useValue: 'streamr-1568535537968.appspot.com' },
    DriverService,
    PassengerService,
    TripService,
    AngularFirestore,
    CommentsService,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, TemplateRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { TripService, DriverService } from 'src/app/services/admin';
import { Observable } from 'rxjs';
// import {} from 'googlemaps';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loading: boolean = true;
  categories: any[];
  count: any;
  businesses: any[];
  categoryForm: any;
  tripCountToday: any = 0;
  tripsCount: any = 0;
  cancelledTripsToday: any = 0;
  cancelledTripsCount: any = 0;
  cancelledTripsTodayCount: any = 0;
  trips: any[];
  cancelledTrips: any[];

  moneyTendered: number = 0;
  commission: number = 0;

  driverPositions: any[];


  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 0.5737984;
  lng = 34.5638191;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 14
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: 'Hello World!'
  });


  constructor(
    private tripService: TripService,
    private angularFireStorage: AngularFireStorage,
    private driverService: DriverService,
  ) {

  }

  ngOnInit() {
    this.loadMoneyToday();
    this.loadTripCount();
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }


  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.driverService.loadDriverPositions().subscribe((positions) => {
      this.driverPositions = positions;      
      this.driverPositions.forEach(position => {
        this.marker.setPosition(new google.maps.LatLng(position.l));
        this.marker.setMap(this.map);        
      });
    });
  }

  loadTripCount() {
    const tripsObservable = this.tripService.listAllTrips();

    tripsObservable.subscribe((trips) => {
      this.cancelledTrips = trips.filter(trip => {
        return trip.TripStatus = "Cancelled"
      });

      this.cancelledTripsCount = this.cancelledTrips.length;

      this.trips = trips.filter(trip => {
        return trip.TripValue > 0;
      });

      this.tripsCount = this.trips.length;

    }, (error) => {
      
    });
  }

  loadMoneyToday() {
    const tripsTodayObservable = this.tripService.loadTripsToday();
    tripsTodayObservable.subscribe((trips) => {

      this.cancelledTripsToday = trips.filter(trip => {
        return trip.TripStatus = "Cancelled"
      });

      this.cancelledTripsTodayCount = this.cancelledTripsToday.length;


      this.trips = trips.filter(trip => {
        return trip.TripValue > 0;
      });


      // this.tripCountToday = this.trips.length;
      this.tripCountToday = 5;
      for (let index = 0; index < this.trips.length; index++) {
        const trip = this.trips[index];
        this.moneyTendered += trip.TripValue
      }
      for (let index = 0; index < this.trips.length; index++) {
        const trip = this.trips[index];
        this.commission += trip.Commission;
      }

    }, (error) => {
      
    });
  }
}

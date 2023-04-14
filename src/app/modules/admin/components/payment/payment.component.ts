import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/admin';

@Component({
  selector: 'app-wallet',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  clicked: boolean = false;
  currentDriver: any;
  loading: boolean = false;
  balance: any;
  drivers: any[];

  driverId: string;

  constructor(
    private driverService: DriverService

  ) { }

  ngOnInit() {
    this.loading = true;
    const driversObservable = this.driverService.listAllDrivers();
    driversObservable.subscribe((drivers) => {
      this.drivers = drivers
    })
    this.loading = false;
  }

  loadDriverBalance(driverId: string, driverName: string) {
    this.clicked = true;
    this.loading = true;
    const balanceObservable = this.driverService.loadDriverBalance(driverId);

    balanceObservable.subscribe(balance => {
      this.balance = balance;
      this.currentDriver = driverName;
      this.driverId = driverId;
      window.scrollTo(0, 0);
      this.loading = false;

    }, (error) => {
      // console.log("An error occured");
    });
  }

}

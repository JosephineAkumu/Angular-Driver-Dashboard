import { Component, OnInit } from '@angular/core';
import { CommentsService, DriverService } from 'src/app/services/admin';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  templateUrl: './comments.component.html',
  styles: [`img{
    width:200px !important;
  }`]
})
export class CommentsComponent implements OnInit {
  comments: any[];
  drivers: any[];
  clicked: boolean = false;
  currentDriver: any;
  loading: boolean = false;

  constructor(
    private commentsService: CommentsService,
    private driverService: DriverService
    ) { }

  ngOnInit() {
    //load data from local storage
    const driversObservable = this.driverService.listAllDrivers();
    driversObservable.subscribe((drivers) => {
      this.drivers = drivers
    })
  }

  loadDriverComments(driverId: string, driverName: string) {
    
    this.clicked = true;
    this.loading = true;
    const commentsObservable = this.commentsService.listDriverComments(driverId);

    commentsObservable.subscribe(comments => {
      this.comments = comments ;
      this.currentDriver = driverName;
      window.scrollTo(0,0);
      this.loading = false;

    }, (error) => {
      // console.log("An error occured");
    });

  }

}

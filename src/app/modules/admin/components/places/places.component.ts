import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/services/admin/places.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'

@Component({
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  placesData: any[];

  placeForm: FormGroup;

  columnDefs = [
    { headerName: 'Name', field: 'Name', sortable: true, filter: true, },
    { headerName: 'PlaceName', field: 'PlaceName', sortable: true, filter: true }, //From Maps
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Area', field: 'Area', sortable: true, filter: true },
    { headerName: 'Entrance Fee', field: 'entranceFee', sortable: true, filter: true },
  ];
  public location: Location;

  constructor(
    private placesService: PlacesService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
  ) {
    this.placeForm = this.formBuilder.group({
      Name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      entranceFee: new FormControl(),
      ticketUrl: new FormControl(),
      rating: new FormControl(),
      Area: new FormControl(),
    });
  }

  options = {
    types: [],
    componentRestrictions: { country: 'KE' }
  }

  query = "";

  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  pictureUrl: string;
  uploaded: boolean = false;

  areas: any;

  ngOnInit() {
    this.loadPlaces();
    this.areas = this.placesService.listCounties();
  }

  loadPlaces() {
    const placesObservable = this.placesService.listPopularPlaces();

    placesObservable.subscribe((partners) => {
      // // console.log(partners)
      this.placesData = partners
      localStorage.setItem("places", JSON.stringify(partners));
    }, (error) => {
      // console.log("error")
    })
  }

  upload(event) {
    const file = event.target.files[0];
    const filePath = "places/" + this.randomString() + ".jpg";
    this.ref = this.afStorage.ref(filePath);
    this.task = this.ref.put(file);

    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe((data) => {
          this.pictureUrl = data;
        });
      })
    ).subscribe();

    this.uploaded = true;
  }

  addPlace(placeData) {
    if (placeData.entranceFee == 0) {
      placeData.entranceFee = "free"
    }
    if (placeData.ticketUrl == null) {
      placeData.ticketUrl = "";

    }
    placeData.PlaceName = this.location.name;
    placeData.locationName = this.location.name;
    placeData.PlaceLocation = new firebase.firestore.GeoPoint(this.location.lat, this.location.lng);

    placeData.PicturePath = this.pictureUrl;
    placeData.placeUrl = placeData.ticketUrl;

    console.log("Place Data", placeData)

    // this.placesService.addPopularPlaces(placeData);
  }

  logLocationChange(location) {
    console.log(location);
    this.location = location;
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  displayAlert(dialog: TemplateRef<any>, event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.dialogService.open(dialog, { context: selectedRows[0] });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  randomString() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = 10; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

}


export class Location {
  lat: number;
  lng: number;
  name?: string;
  zoom?: number;
  icon?: string;
}
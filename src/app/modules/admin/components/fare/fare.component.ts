import { Component, OnInit } from '@angular/core';
import { FareService } from 'src/app/services/admin/fare.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss']
})
export class FareComponent implements OnInit {
  fareTypes: any[];
  individualFares: any;
  title: string;

  constructor(
    private fareService: FareService,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    this.loadFares();

  }

  loadFares() {
    const fareObservable = this.fareService.listAllFares();
    fareObservable.subscribe((fares) => {
      this.fareTypes = fares;
      // console.log(fares);
    }, error => {
      // console.log("error");
      location.reload();
    })
  }

  listFareType(name: string, dialog: any){    
    this.title = name;
      this.individualFares = this.fareTypes.filter(fare => {
        return fare.id = name;
      });
      this.dialogService.open(dialog, { context: this.individualFares });
  }

  modify(name: string, objectKey: string, objectValue: string){
    const fareObservable = this.fareService.updateFare(name, objectKey, objectValue);
    fareObservable.subscribe(success => {
      this.toastService.success("Fare updated successfully", "success");
    }, error => {
      this.toastService.danger("Fare failed to updated successfully", "Error");
    }) 
  }

}

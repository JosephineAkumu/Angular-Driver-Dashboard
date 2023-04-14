import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from 'src/app/services/admin';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  columnDefs = [
    { headerName: 'Email', field: 'Email', sortable: true, filter: true, },
    { headerName: 'NickName', field: 'NickName', sortable: true, filter: true },
    { headerName: 'Phone', field: 'Phone', sortable: true, filter: true }
  ];

  passengersData: any[];

  constructor(
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private passengerService: PassengerService
  ) { }

  ngOnInit() {
    this.loadDataFromService();
  }

  displayAlert(dialog: TemplateRef<any>, event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.dialogService.open(dialog, { context: selectedRows[0] });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  loadDataFromService() {
    const passengerObservable = this.passengerService.listAllPassengers();

    passengerObservable.subscribe((passengers) => {
      this.passengersData = passengers
    }, (error) => {
      // console.log("error")
    })
  }

  processData(userId: string, status: string) {
    // console.log(userId, status);
  }

}

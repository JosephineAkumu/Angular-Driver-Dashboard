import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from 'src/app/services/admin/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
})
export class DriverComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  pageContent: string;
  content = {
    confirm: false,
    display: false,
  };

  columnDefs = [
    { headerName: 'First Name', field: 'FirstName', sortable: true, filter: true, },
    { headerName: 'Second Name', field: 'SecondName', sortable: true, filter: true },
    { headerName: 'Phone', field: 'Phone', sortable: true, filter: true },
    { headerName: 'Email', field: 'Email', sortable: true, filter: true },
    { headerName: 'CarRegNo', field: 'CarRegNo', sortable: true, filter: true },
    { headerName: 'Region', field: 'Region', sortable: true, filter: true },
    { headerName: 'Status', field: 'UserStatus', sortable: true, filter: true }
  ];

  driversData: any[];

  constructor(
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private driverService: DriverService
  ) { }

  ngOnInit() {
    this.pageContent = this.route.snapshot.paramMap.get('action');
    if (this.pageContent == '' || this.pageContent == null) {
      this.content.display = true;
      this.loadDataFromService();
    }
    if (this.pageContent == 'verify') {
      this.content.confirm = true;
      this.loadDataFromService();
    }
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
    const driversObservable = this.driverService.listAllDrivers();

    driversObservable.subscribe((drivers) => {
      // // console.log(drivers)
      this.driversData = drivers
      localStorage.setItem("drivers", JSON.stringify(drivers));
    }, (error) => {
      // console.log("error")
    })
  }

  processData(userId: string, status: string) {
    // console.log(userId, status);
  }

}

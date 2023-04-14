import { Component, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { TripService, PassengerService } from 'src/app/services/admin';
import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Trip } from 'src/app/interfaces/trip';

@Component({
    template: `
    <div class="row">
    <div class="col-md-2">
        <app-sidenav></app-sidenav>
    </div>
    <div class="col-md-10">
  <div class="container">
    <nb-card class="">
        <h6 class="display-4 p-3">Paid Trips</h6>
    </nb-card>
    <div>
        <ag-grid-angular style="width: 100%; height: 500px;" class="ag-theme-balham shadow" [rowData]="tripsData"
            [columnDefs]="columnDefs" (gridReady)="onGridReady($event)">
        </ag-grid-angular>
    </div>
</div>
</div>
</div>
  
  `,
})

export class TripPaidComponent implements OnInit {
    private gridApi;
    private gridColumnApi;

    pageContent: string;
    content = {
        confirm: false,
        display: false,
        active: false
    };

    columnDefs = [
        { headerName: 'NickName', field: 'NickName', sortable: true, filter: true },
        { headerName: 'PickUp', field: 'PickupName', sortable: true, filter: true },
        { headerName: 'Destination', field: 'Destination', sortable: true, filter: true },
        { headerName: 'Date', field: 'AcceptDate', sortable: false, filter: true, },
        { headerName: 'Status', field: 'PayStatus', sortable: true, filter: true },
        { headerName: 'Amount', field: 'AmountTendered', sortable: true, filter: true },
        { headerName: 'Commission', field: 'Commission', sortable: true, filter: true },
    ];

    tripsData: Trip[];
    customerData: any[];

    constructor(
        private tripService: TripService,
        private passengerService: PassengerService,
        private toastr: NbToastrService,
        @Inject(LOCALE_ID) private locale: string,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.loadDataFromService();
    }

    displayAlert(dialog: TemplateRef<any>, event: any) {
        var selectedRows = this.gridApi.getSelectedRows();
        // this.dialogService.open(dialog, { context: selectedRows[0] });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    loadDataFromService() {
        const customerObservable = this.passengerService.listAllPassengers();
        customerObservable.subscribe((customers) => {
            sessionStorage.setItem("customers", JSON.stringify(customers));
        }, (error) => {
            this.toastr.danger("Unable to load passengers", "Error");
        });


        const tripsObservable = this.tripService.listAllTrips();

        tripsObservable.subscribe((trips) => {
            this.tripsData = trips.filter(trip => {
                return (trip.AmountTendered > 0 && trip.PayStatus == 'Paid');
            });
            this.customerData = JSON.parse(sessionStorage.getItem("customers"));

            this.tripsData.forEach(trip => {
                //@ts-ignore
                trip.AcceptDate = new Date(trip.AcceptDate.seconds * 1000).toLocaleString();
                this.customerData.filter(customer => {
                    if (customer.id == trip.Customer) {
                        trip.NickName = customer.NickName;
                        trip.Phone = customer.Phone;
                    };
                });
            });

        }, (error) => {
            // console.log("error")
        })
    }

    processData(userId: string, status: string) {
        // console.log(userId, status);
    }
}

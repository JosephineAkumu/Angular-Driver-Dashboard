import { Component, OnInit, TemplateRef, SimpleChanges } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { PartnersService } from 'src/app/services/admin/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  
  pageContent: string;
  content = {
    confirm: false,
    display: false,
  };
  
  columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true }
  ];

  partnersData: any[];

  constructor(
    private partnersService: PartnersService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.pageContent = this.route.snapshot.paramMap.get('partner');
    if (this.pageContent == '' || this.pageContent == null || this.pageContent == 'corporate') {
      this.pageContent = 'Corporate';
      this.loadPartners(this.pageContent);
    }
    if (this.pageContent == 'driving') {
      this.pageContent = 'Driver';
      this.loadPartners(this.pageContent);
    }
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.pageContent = this.route.snapshot.paramMap.get('partner');
    if (this.pageContent == '' || this.pageContent == null || this.pageContent == 'corporate') {
      this.pageContent = 'Corporate';
      this.loadPartners(this.pageContent);
    }
    if (this.pageContent == 'driving') {
      this.pageContent = 'driving';
      this.loadPartners("Driver");
    } 
  }

  loadPartners(partner: string) {
    const partnersObservable = this.partnersService.listAllPartners(partner);
    // console.log("Doc: ", partner);

    partnersObservable.subscribe((partners) => {
      // // console.log(partners)
      this.partnersData = partners
      localStorage.setItem(this.pageContent, JSON.stringify(partners));
    }, (error) => {
      // console.log("error")
    })
  }

  displayAlert(dialog: TemplateRef<any>, event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.dialogService.open(dialog, { context: selectedRows[0] });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  processData(userId: string, status: string) {
    // console.log(userId, status);
  }

}

/*
                     ,//@@@.
                .///////@@@@@@@&.
           ,////////////@@@@@@@@@@@@@/
      ./////////////////#@@@@@@@@@@@@@@@@@,
 ,/////////////////.         ,&@@@@@@@@@@@@@@@@#
/////////////.                     %@@@@@@@@@@@@@
/////////.                             .%@@@@@@@@
//////.                                   /@@@@@@
///////     @@%     .@@/    .@@@@@@/      %@@@@@@
.//////     @@@@(   .@@/   @@@%. ,@@@#    @@@@@@&
.//////     @@%@@@  .@@/  &@@             @@@@@@(
 //////     @@# ,@@@.@@/  @@@   &@@@@@.   @@@@@@.
 //////,    @@#   %@@@@/  ,@@@    *@@#   ,@@@@@@
 //////.    @@#     @@@/    @@@@@@@@,    #@@@@@@
 ,//////                                 @@@@@@&
 .//////                                 @@@@@@/
  //////.      @@@  @@@  @@  @ @@@@     .@@@@@@.
  //////,     @    @   @ @ @ @ @==      (@@@@@@
  .//////      @@@  @@@  @  @@ @        &@@@@@@
  .///////.                           %@@@@@@@&
   ///////////                    ,@@@@@@@@@@@(
     ,///////////,             #@@@@@@@@@@@&
        .///////////.       &@@@@@@@@@@@%
           ./////////////@@@@@@@@@@@@*
              ./////////@@@@@@@@@@,
                  ./////@@@@@@%
                     .//@@@#

     The World's Original Angular Conference
      May 1st–3rd 2019 Salt Lake City, Utah

      */
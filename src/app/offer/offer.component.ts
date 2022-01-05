import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { CompanyapiService } from '../utils/services/companyapi.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as XLSX from 'xlsx'; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offerLetterObj:any={};
  selectedCity :any={};
  offerTableRows: any[]= [];
  isHidden!: boolean;
  public buttonName:any = 'Create New Offer';
  addNewOffer: any = {};
  cityDDList :any = [];
  incomingApi:any;
  totalCount;
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 

  offerTableHeaders = [
    { headerName: 'Date', field: 'date',width: 80, },
    { headerName: 'Name', field: 'emp_name', width: 150},
    { headerName: 'Ref No', field: 'ref_no', width: 180},
    { headerName: 'Profile', field: 'job_profile',  width: 150},
    { headerName: 'DOJ', field: 'exp_joining_date',  width: 80},
    { headerName: 'Contact', field: 'mobile_no', width: 65,  },
    { headerName: 'Company', field: 'comapany',  width: 65},
    { headerName: 'Status', field: 'status',  width: 65},
    { headerName: 'Document', field: 'occupation',  width: 65},
  ];
  constructor( public utilsService: UtilsService, private companyService: CompanyapiService,private importsService: ImportsService,
    private toaster: ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.getCities();
    this.getallOffer();
  }

  onTableRowClicked(e){
    this.router.navigate([`./offer-letter-pdf/${e.id}`])
  }
  public getCities() {
    this.companyService.AllCities()
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.cityDDList = res.data.output;
    
      } else {
        this.cityDDList = [];
      }
    }),
      () => {
        this.cityDDList = [];
      };
   
  }

  submit(){
    const formdata = new FormData();
    formdata.append('date', this.offerLetterObj.date);
    formdata.append('ref_no', this.offerLetterObj.ref_no);
    formdata.append('emp_name', this.offerLetterObj.emp_name);
    formdata.append('job_profile', this.offerLetterObj.job_profile);
    formdata.append('exp_joining_date', this.offerLetterObj.expected_date);
    formdata.append('mobile_no', this.offerLetterObj.mobile_no);
    formdata.append('address', this.offerLetterObj.address);
    formdata.append('city', this.selectedCity.id);
    formdata.append('pincode', this.offerLetterObj.pincode);
    formdata.append('subject', this.offerLetterObj.subject);
    formdata.append('comapany', this.offerLetterObj.company);
    formdata.append('status', 'Prepared');

    this.importsService.postOfferLetter(formdata)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.toaster.success("Offer Successfully Added");
       
      }
    }, () => {})
  }

  public getallOffer() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getOfferData({end_limit: 25,  })
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.offerTableRows = res.data.output;
        this.totalCount = res.data.total_count;
        // this.employeeId = this.offerTableRows[this.totalCount-1]['id'];
        // console.log(this.employeeId)
        // for(let i =0 ; i < this.offerTableRows.length; i++){
        //   this.offerTableRows[i]['fullName'] = this.offerTableRows[i]['first_name']+" "+ this.offerTableRows[i]['last_name'];
        // }
      } else {this.offerTableRows = [];}
    }),
      () => {this.offerTableRows = [];};
  }

  addOffer(){
    if(!this.isHidden)
    {
      this.buttonName = 'Close';
    }else{
      this.buttonName = 'Create New Offer'
    }
    this.isHidden = !this.isHidden;
  }

    onDateRangeSelection(event: { startDate: string | number | Date; }) {
      this.offerLetterObj.date = this.utilsService.formatDate(event.startDate)
  }
  onDateRangeSelection1(event: { startDate: string | number | Date; }) {
    this.offerLetterObj.expected_date = this.utilsService.formatDate(event.startDate)
}
  }
    

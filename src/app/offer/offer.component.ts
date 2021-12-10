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
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 

  offerTableHeaders = [
    { headerName: 'Employee Id', field: 'id',width: 60, },
    { headerName: 'Name', field: 'fullName', width: 180},
    { headerName: 'Email Id', field: 'organisation_email', width: 180},
    { headerName: 'Contact No', field: 'phone',  width: 180},
    { headerName: 'Company', field: 'organisation',  width: 180},
    { headerName: 'Designation', field: 'designation', width: 180,  },
    { headerName: 'Details', field: 'occupation',  width: 65},
  ];
  constructor( public utilsService: UtilsService, private companyService: CompanyapiService,private importsService: ImportsService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getCities();
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
    

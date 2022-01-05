import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as XLSX from 'xlsx'; 
import { ToastrService } from 'ngx-toastr'; 
import * as moment from 'moment';

@Component({
  selector: 'app-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrls: ['./offer-letter.component.css']
})
export class OfferLetterComponent implements OnInit {

  incomingApi:any;
  totalCount;
  offerObj:any={};
  employeeId:any;
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 

  constructor(private importsService: ImportsService,private router: Router) { }

  ngOnInit(): void {
    const path = window.location.pathname.split('/');
    this.employeeId = path[path.length - 1];
    this.getallOffer()

    setTimeout(() => {
      let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
      element.click();
    }, 1000);
  }

  goBack(){
    this.router.navigate(['./offer-letter'])
  }

  public getallOffer() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getOfferData({id:this.employeeId  })
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.offerObj = {
          emp_name: res.data.output[0].emp_name,
          mobile_no: res.data.output[0].mobile_no,
          address: res.data.output[0].address,
          pincode: res.data.output[0].pincode,
          job_profile: res.data.output[0].job_profile,
          exp_joining_date: moment(res.data.output[0]['exp_joining_date']).format('Do MMMM YYYY'),
          subject: res.data.output[0].subject,
          ref_no: res.data.output[0].ref_no,
          date:res.data.output[0].date,
        };
        this.totalCount = res.data.total_count;
       console.log(moment(res.data.output[0]['exp_joining_date']).format('Do MMMM YYYY'))
       
      } else {this.offerObj = [];}
    }),
      () => {this.offerObj = [];};
  }
}

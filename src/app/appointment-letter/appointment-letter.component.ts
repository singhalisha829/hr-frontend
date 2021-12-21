import { CompanyapiService } from './../utils/services/companyapi.service';
import { Component, OnInit } from '@angular/core';
import { ImportsService } from '../utils/services/imports.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-letter',
  templateUrl: './appointment-letter.component.html',
  styleUrls: ['./appointment-letter.component.css']
})
export class AppointmentLetterComponent implements OnInit {

  employeeId:any;
  appointmentObj:any={};
  offerObj:any={};
  cityDDList:any=[];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  constructor(private importsService: ImportsService,private companyService: CompanyapiService) { }

  ngOnInit(): void {
    const path = window.location.pathname.split('/');
    this.employeeId = path[path.length - 1];
    this.getAppointmentDetail();

    setTimeout(() => {
      let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
      element.click();
    }, 1000);
  }

 
  public getAppointmentDetail() {
    this.companyService.AllCities()
  .pipe(takeUntil(this.unsubsribeNotifier))
  .subscribe((res: any) => {
    if (res.status.code === 200) {
      this.cityDDList = res.data.output;
      console.log(this.cityDDList)
   
     this.importsService.getAppointment({id:this.employeeId  })
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.appointmentObj = {
          name: res.data.output[0].name,
          company: res.data.output[0].company,
          basic_salary: res.data.output[0].basic_salary,
          hra: res.data.output[0].hra,
          conveyance: res.data.output[0].conveyance,
          exp_joining_date: moment(res.data.output[0]['exp_joining_date']).format('Do MMMM YYYY'),
          other_allowance: res.data.output[0].other_allowance,
          ref_no: res.data.output[0].ref_no,
          gross_salary:res.data.output[0].basic_salary+ res.data.output[0].hra +res.data.output[0].conveyance+ res.data.output[0].other_allowance,
          epf: res.data.output[0].epf,
          job_profile:res.data.output[0].job_profile,
          date:moment(res.data.output[0]['date']).format('Do MMMM YYYY'),
          offer_id:res.data.output[0].offer_id,
        };
       
        this.importsService.getOfferData({id:this.appointmentObj.offer_id })
        .pipe(takeUntil(this.unsubsribeNotifier))
        .subscribe((res: any) => {
          if (res.status.code === 200) {
            this.offerObj = {
              address: res.data.output[0].address,
              pincode: res.data.output[0].pincode,
              city: res.data.output[0].city,
              state:"",
          };
           
            this.cityDDList.forEach(e => {
              
              if(this.offerObj['city']==e.id){
               
                  this.offerObj['city'] = e.name;
                  this.offerObj['state'] =e.state;
              }});
           
          } else {this.offerObj = [];}
        }),
          () => {this.offerObj = [];};

      } else {this.appointmentObj = [];}
    }),
      () => {this.appointmentObj = [];};

    } else {
      this.cityDDList = [];
    }
  }),
    () => {
      this.cityDDList = [];
    };
  }

}

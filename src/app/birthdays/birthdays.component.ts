import { CompanyapiService } from './../utils/services/companyapi.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as moment from 'moment';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  empTableRows: any[]= [];
  birthdayTableRows: any= [];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  incomingApi:any;
  totalCount:any;
  future_date:any;
  today_date:any;
  deptDDList=[];
  
  today = new Date()
  future = new Date()
  constructor(private importsService: ImportsService,private companyService: CompanyapiService) { }

  ngOnInit(): void {
    this.getallEmployee();
    this.future.setMonth(this.today.getMonth() + 3);
    
    this.future_date = moment(this.future.toLocaleDateString()).format('YYYY-MM-DD')
    this.today_date= moment(this.today.toLocaleDateString()).format('YYYY-MM-DD');
  }

  public getallEmployee() {
    this.companyService.AllDept()
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.deptDDList = res.data.output;
        console.log(this.deptDDList)
      } else {
        this.deptDDList = [];
      }
    }),
      () => {
        this.deptDDList = [];
      };

    this.importsService.getEmployeeData({end_limit: 25})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.empTableRows = res.data.output;
        this.totalCount = res.data.total_count;
        for(let i =0 ; i < this.empTableRows.length; i++){
          if(this.empTableRows[i]['date_of_birth']>= this.today_date && this.empTableRows[i]['date_of_birth']<=this.future_date){
            this.deptDDList.forEach(e => {
              if(this.empTableRows[i]['department']== e.id){
                  this.empTableRows[i]['department'] = e.department;
              }});
            this.birthdayTableRows.push(this.empTableRows[i]);
            }
        }
        console.log(this.birthdayTableRows)
      } else {this.empTableRows = [];}
    }),
      () => {this.empTableRows = [];};
  }

}

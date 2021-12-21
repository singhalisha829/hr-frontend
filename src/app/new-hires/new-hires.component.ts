import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import { CompanyapiService } from './../utils/services/companyapi.service';
import * as moment from 'moment';
@Component({
  selector: 'app-new-hires',
  templateUrl: './new-hires.component.html',
  styleUrls: ['./new-hires.component.css']
})
export class NewHiresComponent implements OnInit {

  empTableRows: any[]= [];
  newTableRows:any=[];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  incomingApi:any;
  totalCount:any;
  past_date:any;
  today_date:any;
  deptDDList=[];
  today = new Date()
  past = new Date()

  constructor(private importsService: ImportsService,private companyService: CompanyapiService) { }

  ngOnInit(): void {
    this.getallEmployee();
    this.past.setMonth(this.today.getMonth() - 3);
    
    this.past_date = moment(this.past.toLocaleDateString()).format('YYYY-MM-DD')
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
          if(this.empTableRows[i]['date_of_joining']<= this.today_date && this.empTableRows[i]['date_of_joining']>=this.past_date){
            this.deptDDList.forEach(e => {
              if(this.empTableRows[i]['department']== e.id){
                  this.empTableRows[i]['department'] = e.department;
              }});
            this.newTableRows.push(this.empTableRows[i]);
            }
        }
        console.log(this.newTableRows)
      } else {this.empTableRows = [];}
    }),
      () => {this.empTableRows = [];};
  }
}

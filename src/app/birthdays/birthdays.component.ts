import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as moment from 'moment';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  empTableRows: any[]= [];
  birthdayTableRows: any[]= [];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  incomingApi:any;
  totalCount:any;
  today = new Date().toLocaleDateString()
  today_date= moment(this.today).format('YYYY-MM-DD');
  birthdayTableHeaders = [
    { headerName: 'Employee Id', field: 'id',width: 60, },
    { headerName: 'Name', field: 'fullName', width: 180},
    { headerName: 'DOB', field: 'date_of_birth', width: 180},
    { headerName: 'Email Id', field: 'organisation_email', width: 180},
    { headerName: 'Contact No', field: 'phone',  width: 180},
    { headerName: 'Company', field: 'organisation',  width: 180},
    { headerName: 'Department', field: 'department', width: 180,  },
    { headerName: 'Details', field: 'occupation',  width: 65},
  ];
  constructor(private importsService: ImportsService,) { }

  ngOnInit(): void {
    this.getallEmployee();
  }

  public getallEmployee() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getEmployeeData({end_limit: 25})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.empTableRows = res.data.output;
        this.totalCount = res.data.total_count;
        for(let i =0 ; i < this.empTableRows.length; i++){
          this.empTableRows[i]['fullName'] = this.empTableRows[i]['first_name']+" "+ this.empTableRows[i]['last_name'];
          if(this.empTableRows[i]['date_of_birth']){
            
          }
        }
      } else {this.empTableRows = [];}
    }),
      () => {this.empTableRows = [];};
  }
}

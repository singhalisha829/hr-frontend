import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  birthdayTableRows: any[]= [];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  incomingApi:any;
  totalCount:any;
  birthdayTableHeaders = [
    { headerName: 'Employee Id', field: 'id',width: 60, },
    { headerName: 'Name', field: 'fullName', width: 180},
    { headerName: 'DOB', field: 'dob', width: 180},
    { headerName: 'Email Id', field: 'organisation_email', width: 180},
    { headerName: 'Contact No', field: 'phone',  width: 180},
    { headerName: 'Company', field: 'organisation',  width: 180},
    { headerName: 'Designation', field: 'designation', width: 180,  },
    { headerName: 'Details', field: 'occupation',  width: 65},
  ];
  constructor(private importsService: ImportsService,) { }

  ngOnInit(): void {
  }

  public getallEmployee() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getEmployeeData({end_limit: 25})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.birthdayTableRows = res.data.output;
        this.totalCount = res.data.total_count;
        for(let i =0 ; i < this.birthdayTableRows.length; i++){
          this.birthdayTableRows[i]['fullName'] = this.birthdayTableRows[i]['first_name']+" "+ this.birthdayTableRows[i]['last_name'];
        }
      } else {this.birthdayTableRows = [];}
    }),
      () => {this.birthdayTableRows = [];};
  }
}

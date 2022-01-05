import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as moment from 'moment';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  Employee = [];
  attendance_status=[];
  today = new Date().toLocaleDateString()
  now: number= Date.now();
  incomingApi:any;
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  employeeTableRows: any=[];
  totalCount: any;
  employeeId: any;

  attendance:any={};
  constructor(private importsService: ImportsService,) { }

  ngOnInit(): void {
    this.getallEmployee()
   
  }


  submit(){
    this.importsService.getEmployeeData({})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.employeeTableRows = res.data.output;
       
      } else {this.employeeTableRows = [];}
    }),
      () => {this.employeeTableRows = [];};

      
    for(let k = 0; k < this.totalCount; k++ ){
    const formdata = new FormData()
    formdata.append('date',moment(this.today).format('YYYY-MM-DD'));
    formdata.append('status', this.attendance_status[k]);
    formdata.append('UserDetails', this.employeeTableRows[k]['id']);
    
     this.importsService.postAttendance(formdata)
     .pipe(takeUntil(this.unsubsribeNotifier))
     .subscribe((res: any) => {
      if(res.status.code == 200){
       
      }
     }, () => {})
    }
  }

  public getallEmployee() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getEmployeeData({})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.employeeTableRows = res.data.output;
        this.totalCount = res.data.total_count;
        this.employeeId = this.employeeTableRows[this.totalCount-1]['id'];
        
        for(let i =0 ; i < this.employeeTableRows.length; i++){
          this.Employee[i] = this.employeeTableRows[i]['first_name']+" "+ this.employeeTableRows[i]['last_name'];
          this.attendance_status[i] = 'Present';
        }
       
      } else {this.employeeTableRows = [];}
    }),
      () => {this.employeeTableRows = [];};
  }
  changeGender(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    this.attendance_status[e.target.name]= e.target.value;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  Employee = ['alisha','arjun','abhishek'];
  currentDate = new Date();
  now: number= Date.now();
  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    
  }
 

}

import { Component, OnInit } from '@angular/core';
import { ImportsService } from '../utils/services/imports.service';

@Component({
  selector: 'app-appointment-letter',
  templateUrl: './appointment-letter.component.html',
  styleUrls: ['./appointment-letter.component.css']
})
export class AppointmentLetterComponent implements OnInit {

  constructor(private importsService: ImportsService,) { }

  ngOnInit(): void {
  }

  // public getAppointmentDetails() {
  //   this.importsService.getAppointment()
  //   .pipe(takeUntil(this.unsubsribeNotifier))
  //   .subscribe((res: any) => {
  //     if (res.status.code === 200) {
  //       this.cityDDList = res.data.output;
  //       console.log(this.cityDDList)
  //     } else {
  //       this.cityDDList = [];
  //     }
  //   }),
  //     () => {
  //       this.cityDDList = [];
  //     };
   
  // }

}

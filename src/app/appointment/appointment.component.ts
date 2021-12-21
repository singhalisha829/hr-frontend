import { Router } from '@angular/router';
import { DateAdapter } from 'angular-calendar';
import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit } from '@angular/core';
import { ImportsService } from '../utils/services/imports.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentObj: any={};
  isHidden!: boolean;
  selectedOffer :any={};
  offerIdList :any = [];
  appointmentTableRows: any= {};

  offerDetails:any={};
  public buttonName:any = 'Create New Appointment Letter';
  addNewAppoint: any = {};
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets destroyed
  incomingApi:any;

  appointmentTableHeaders = [
    { headerName: 'Date', field: 'date',width: 80, },
    { headerName: 'Name', field: 'name', width: 150},
    { headerName: 'Profile', field: 'job_profile',  width: 150},
    // { headerName: 'DOJ', field: 'exp_joining_date',  width: 80},
    // { headerName: 'Contact', field: 'mobile_no', width: 65,  },
    { headerName: 'Company', field: 'company',  width: 65},
    { headerName: 'Status', field: 'status',  width: 65},
    { headerName: 'Document', field: 'occupation',  width: 65},
  ];
  constructor(private utilsService: UtilsService ,private importsService: ImportsService,private toaster: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getallOffer();
    this.getallAppointment();
  }

  onTableRowClicked(e){
    this.router.navigate([`./appointment-letter/${e.id}`])
  }
  addAppointment(){
    if(!this.isHidden)
    {
      this.buttonName = 'Close';
    }else{
      this.buttonName = 'Create New Appointment Letter'
    }
    this.isHidden = !this.isHidden;
  }

  onDateRangeSelection(event: { startDate: string | number | Date; }) {
    this.appointmentObj.date = this.utilsService.formatDate(event.startDate)
}
onDateRangeSelection1(event: { startDate: string | number | Date; }) {
  this.appointmentObj.expected_date = this.utilsService.formatDate(event.startDate)
}

  submit(){
    const formdata = new FormData()
    formdata.append('offer_id', this.selectedOffer.id);
    formdata.append('date', this.appointmentObj.date);
    formdata.append('date_of_comencement', this.appointmentObj.expected_date);
    formdata.append('basic_salary', this.appointmentObj.basic_salary);
    formdata.append('hra', this.appointmentObj.hra);
    formdata.append('conveyance', this.appointmentObj.conveyance);
    formdata.append('other_allowance', this.appointmentObj.other_allowance);
    formdata.append('epf', this.appointmentObj.epf);
    formdata.append('status', 'Prepared');
    
    this.importsService.postAppointmentDetails(formdata)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        let last_inserted_id = res.last_inserted_id;
        this.toaster.success("User Successfully Added");
        //this.postPayment(last_inserted_id)
      }
    }, () => {})
  }

  public getallOffer() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getOfferData({end_limit: 25,  })
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.offerDetails = res.data.output;
      } else {this.offerDetails = [];}
    }),
      () => {this.offerDetails = [];};
  }

  public getallAppointment() {   
   this.importsService.getAppointment({end_limit: 25,  })
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.appointmentTableRows = res.data.output;
      } else {this.appointmentTableRows = [];}
    }),
      () => {this.appointmentTableRows = [];};
  }
}

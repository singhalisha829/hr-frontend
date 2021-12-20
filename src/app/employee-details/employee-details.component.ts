import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeId:any;
  unsubsribeNotifier = new Subject(); 
  employeeObj:any={};
  employeeFamilyObj:any={};
  employeeEduObj:any={};
  employeeWorkObj:any={};
  employeeTrainingObj:any={};
  employeeRefObj:any={};
  employeeContactObj:any={};
  employeeBankObj:any={};
  constructor(private importsService: ImportsService,) { }

  ngOnInit(): void {
    const path = window.location.pathname.split('/');
    this.employeeId = path[path.length - 1];
    this.getEmployeeDetails();
    this.getFamilyDetails();
    this.getEmployeeEduaction();
    this.getEmployeeWork();
    this.getEmployeeTraining();
    this.getEmployeeRef();
    this.getEmployeeContact();
    this.getEmployeeBank();
  }

  public getEmployeeDetails() {
    this.importsService.getEmployeeData({id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeObj = {
          first_name: res.data.output[0].first_name,
          last_name: res.data.output[0].last_name,
          phone: res.data.output[0].phone,
          phone2: res.data.output[0].phone2,
          personal_email: res.data.output[0].personal_email,
          email_secondary: res.data.output[0].organisational_email,
          gender: res.data.output[0].gender,
          dob: res.data.output[0].date_of_birth,
          doj: res.data.output[0].date_of_joining,
          aadhar_card: res.data.output[0].aadhar_card,
          pancard: res.data.output[0].pancard,
          fathers_name: res.data.output[0].fathers_name,
          organisation:res.data.output[0].organisation,
          application_date: res.data.output[0].application_date,
          designation:res.data.output[0].designation,
          reference_by:res.data.output[0].reference_by,
          is_active:res.data.output[0].is_active,
          // dob: res.data.output[0].date_of_birth,
          // doj: res.data.output[0].date_of_joining,
          // aadhar_card: res.data.output[0].aadhar_card,
          fathers_pancard: res.data.output[0].fathers_pancard,
          fathers_occupation: res.data.output[0].fathers_occupation,
        };
        if(this.employeeObj.is_active ==="True")
        {
          this.employeeObj.is_active ="Working";
        }else{
          this.employeeObj.is_active = "Not-Working";
        }
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

  obj:any={};
  public getFamilyDetails() {
    this.importsService.getFamilyDetails({UserDetails_id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeFamilyObj =res.data.output;
        
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

  public getEmployeeEduaction() {
    this.importsService.getEmployeeEducation({UserDetails_id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeEduObj =res.data.output;
        
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

  public getEmployeeWork() {
    this.importsService.getEmployeeWork({UserDetails_id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeWorkObj =res.data.output;
        
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

  public getEmployeeTraining() {
    this.importsService.getEmployeeTraining({UserDetails_id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeTrainingObj =res.data.output;
        
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

  public getEmployeeRef() {
    this.importsService.getEmployeeReference({UserDetails_id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeRefObj =res.data.output;
        
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

  public getEmployeeContact() {
    this.importsService.getEmployeeContact({UserDetails_id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeContactObj =res.data.output;
        
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

  public getEmployeeBank() {
    this.importsService.getEmployeeBankDetails({UserDetails_id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeBankObj ={
        account_holder_name: res.data.output[0].account_holder_name,
        bank_name: res.data.output[0].bank_name,
        bank_account: res.data.output[0].bank_account,
        bank_branch: res.data.output[0].bank_branch,
        ifsc_code: res.data.output[0].ifsc_code,
       
        }
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }
  
}

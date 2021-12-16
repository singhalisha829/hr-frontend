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
  constructor(private importsService: ImportsService,) { }

  ngOnInit(): void {
    const path = window.location.pathname.split('/');
    this.employeeId = path[path.length - 1];
    this.getEmployeeDetails();
    this.getFamilyDetails();
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
          // dob: res.data.output[0].date_of_birth,
          // doj: res.data.output[0].date_of_joining,
          // aadhar_card: res.data.output[0].aadhar_card,
          fathers_pancard: res.data.output[0].fathers_pancard,
          fathers_occupation: res.data.output[0].fathers_occupation,
        };
        // this.selectedCity = this.cityDDList && this.cityDDList
        // .filter(city => city.name === res.data.output[0].city)[0];
        // this.selectedSource = this.sourceDDList && this.sourceDDList
        // .filter(source => source.source === res.data.output[0].lead_source)[0];
        // this.selectedOwner = this.ownerDDList && this.ownerDDList
        // .filter(owner => owner.fullName === res.data.output[0].owner)[0];
        // this.existingDetails = Object.assign({},this.editCompanyObj);
        // this.existingDetails.city = this.selectedCity;
        // this.existingDetails.source = this.selectedSource;
        // this.existingDetails.owner = this.selectedOwner;
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
        // for(let i=0; i<this.obj.length; i++){
        // this.employeeFamilyObj = {
        //   name: res.data.output[i].name,
        //   age: res.data.output[i].age,
        //   occupation: res.data.output[0].occupation,
      
        // this.selectedCity = this.cityDDList && this.cityDDList
        // .filter(city => city.name === res.data.output[0].city)[0];
        // this.selectedSource = this.sourceDDList && this.sourceDDList
        // .filter(source => source.source === res.data.output[0].lead_source)[0];
        // this.selectedOwner = this.ownerDDList && this.ownerDDList
        // .filter(owner => owner.fullName === res.data.output[0].owner)[0];
        // this.existingDetails = Object.assign({},this.editCompanyObj);
        // this.existingDetails.city = this.selectedCity;
        // this.existingDetails.source = this.selectedSource;
        // this.existingDetails.owner = this.selectedOwner;
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }
  
}

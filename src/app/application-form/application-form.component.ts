import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { CompanyapiService } from '../utils/services/companyapi.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

 employeeObj :any ={};
 selectedCity :any={};
 selectedDept :any={};
 selectedCity2 :any={};
 cityDDList :any = [];
 deptDDList :any = [];
  isHidden!: boolean;
  public buttonName:any = 'Add Employee';
  addNewEmployee: any = {};
  cityHeaders = [
    { headerName: 'ID', field: 'id', width: '100' },
    { headerName: 'City Name', field: 'name', width: 120 },
    { headerName: 'State', field: 'state', width:120 },
  ];
  cityArr: any = [];
  filterObj!: {};
  formSteps = ['Personal Details', 'Education Details & Work Ex','Bank Details', 'Upload Documents'];
  divNumber!: number;
  familyTableRows: any[]= [];
  educationTableRows: any[]= [];
  trainingTableRows: any[]= [];
  workTableRows: any[]= [];
  referenceTableRows: any[]= [];
  contactTableRows: any[]= [];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets destroyed

  newProductArray: any[] = [];
  familyTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Age', field: 'age', type: 'text', value: 'age', isEditable: true, width: 180},
    { headerName: 'Occupation', field: 'occupation', type: 'text', value: 'occupation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  educationTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Institute Name', field: 'inst_name', type: 'text', value: 'inst_name', isEditable: true, width: 180},
    { headerName: 'Institue Address', field: 'inst_address', type: 'text', value: 'inst_address', isEditable: true, width: 180},
    { headerName: 'Institute City', field: 'inst_city', type: 'text', value: 'inst_city', isEditable: true,  width: 180},
    { headerName: 'Start Date', field: 'start_date', type: 'date', value: 'start_date', isEditable: true,  width: 180},
    { headerName: 'End Date', field: 'end_date', type: 'date', value: 'end_date', isEditable: true,  width: 180},
    { headerName: 'Course Name', field: 'course_name', type: 'text', value: 'course_name', isEditable: true,  width: 180},
    { headerName: 'Overall Percentage', field: 'overall_percentage', type: 'text', value: 'overall_percentage', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  workTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Company Name', field: 'company_name', type: 'text', value: 'company_name', isEditable: true, width: 180},
    { headerName: 'Company Address', field: 'company_address', type: 'text', value: 'company_address', isEditable: true, width: 180},
    { headerName: 'Company City', field: 'company_city', type: 'text', value: 'company_city', isEditable: true,  width: 180},
    { headerName: 'Company Pincode', field: 'company_pincode', type: 'number', value: 'company_pincode', isEditable: true,  width: 180},
    { headerName: 'Start Date', field: 'start_date', type: 'date', value: 'start_date', isEditable: true,  width: 180},
    { headerName: 'End Date', field: 'end_date', type: 'date', value: 'end_date', isEditable: true,  width: 180},
    { headerName: 'Job Profile', field: 'job_profile', type: 'text', value: 'job_profile', isEditable: true,  width: 180},
    { headerName: 'Employer Name', field: 'employer_name', type: 'text', value: 'employer_name', isEditable: true,  width: 180},
    { headerName: 'Contact No.', field: 'contact_no', type: 'number', value: 'contact_no', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  
  trainingTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Institute Name', field: 'inst_name', type: 'text', value: 'inst_name', isEditable: true, width: 180},
    { headerName: 'Institute Address', field: 'inst_address', type: 'text', value: 'inst_address', isEditable: true, width: 180},
    { headerName: 'Institute City', field: 'inst_city', type: 'text', value: 'inst_city', isEditable: true,  width: 180},
    { headerName: 'Institute Pincode', field: 'inst_pincode', type: 'number', value: 'inst_pincode', isEditable: true,  width: 180},
    { headerName: 'Start Date', field: 'start_date', type: 'date', value: 'start_date', isEditable: true,  width: 180},
    { headerName: 'End Date', field: 'end_date', type: 'date', value: 'end_date', isEditable: true,  width: 180},
    { headerName: 'Name of the Training', field: 'name-training_attended', type: 'text', value: 'name_training_attended', isEditable: true,  width: 180},
    { headerName: 'Take Away', field: 'take_away', type: 'text', value: 'take_away', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];
  referenceTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Address', field: 'address', type: 'text', value: 'address', isEditable: true, width: 180},
    { headerName: 'Contact', field: 'phone', type: 'text', value: 'phone', isEditable: true,  width: 180},
    { headerName: 'Relation', field: 'relation', type: 'text', value: 'relation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  contactTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Address', field: 'address', type: 'text', value: 'address', isEditable: true, width: 180},
    { headerName: 'Contact', field: 'phone', type: 'text', value: 'phone', isEditable: true,  width: 180},
    { headerName: 'Relation', field: 'relation', type: 'text', value: 'relation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  constructor( private utilsService: UtilsService, private companyService: CompanyapiService,private importsService: ImportsService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.initProductTable();
    this.getCities();
    this.getDept();
  }

  dept:number=1;
  submit(){
    const formdata = new FormData()
    formdata.append('first_name', this.employeeObj.firstName);
    formdata.append('last_name', this.employeeObj.lastName);
    formdata.append('present_address', this.employeeObj.presentAddress);
    formdata.append('present_pincode', this.employeeObj.pincode);
    formdata.append('permanent_address', this.employeeObj.permanentAddress);
    formdata.append('present_city', this.selectedCity.id);
    formdata.append('permanent_city', this.selectedCity2.id);
    formdata.append('permanent_pincode', this.employeeObj.pincode1);
    formdata.append('phone', this.employeeObj.contact);
    formdata.append('phone2', this.employeeObj.alternateContact);
    formdata.append('personal_email', this.employeeObj.email);
    formdata.append('organisation_email', this.employeeObj.orgEmail);
    formdata.append('date_of_birth', this.employeeObj.date);
    formdata.append('gender', this.employeeObj.gender);
    formdata.append('aadhar_card', this.employeeObj.aadhar);
    formdata.append('pancard', this.employeeObj.pancard);
    formdata.append('fathers_name', this.employeeObj.fatherName);
    formdata.append('fathers_pancard', this.employeeObj.fatherPancard);
    formdata.append('fathers_occupation', this.employeeObj.fatherOccupation);
    formdata.append('organisation', this.employeeObj.organisation);
    formdata.append('department' , this.selectedDept.id);
    
    this.importsService.postEmployeeDetails(formdata)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        let last_inserted_id = res.last_inserted_id;
        this.toaster.success("User Successfully Added");
        //this.postPayment(last_inserted_id)
      }
    }, () => {})
    }
  
    selectGender(e:any){
         this.employeeObj.gender = e.target.value;
    }

  initProductTable() {
    this.familyTableRows = [{name:'', age:'', occupation: '', deleteBTN: ''}]
    this.referenceTableRows = [{name:'',address:'', phone: '',relation:'', deleteBTN: ''}]
    this.contactTableRows = [{name:'',address:'', phone: '',relation:'', deleteBTN: ''}]
    this.workTableRows= [{company_name:'',company_address:'', company_city:'', company_pincode:'',start_date:'',end_date:'',job_profile:'',
  employer_name:'',contact_no:'',deleteBTN:''}]
  this.trainingTableRows= [{inst_name:'',inst_address:'', inst_city:'', inst_pincode:'',start_date:'',end_date:'',name_training_attended:'',
  take_away:'',deleteBTN:''}]
    this.educationTableRows=[{inst_name:'',inst_address:'',inst_city:'',start_date:'',end_date:'',course_name:'',overall_percentage:'',deleteBTN:''}]
  }
  addEmployee(){
    if(!this.isHidden)
    {
      this.buttonName = 'Close';
    }else{
      this.buttonName = 'Add Employee'
    }
    this.isHidden = !this.isHidden;
  }

  onDateRangeSelection(event: { startDate: string | number | Date; }) {
    this.employeeObj.date = this.utilsService.formatDate(event.startDate)
}

onSortHeaderClicked(e: { ascending: any; headerField: string; }) {
  if (!e.ascending) e.headerField  = `-${e.headerField}`
  const pathName = window.location.pathname.slice(1);
  if (localStorage.getItem('filterObj' + pathName )) {
    const DDObj = JSON.parse(localStorage.getItem('filterObj' + pathName ) || '{}')
    DDObj[pathName]['sortBy'] = e.headerField;
    localStorage.setItem(('filterObj' + pathName), JSON.stringify({...DDObj}) )
  } else {
    const DDObj: any =  {};
    DDObj[pathName] = {sortBy: e.headerField};
    localStorage.setItem(('filterObj' + pathName), JSON.stringify({...DDObj}) )
  }
  this.filterObj = {...this.filterObj, sort_by: e.headerField}
  //this.getAllCiies();
}

public getCities() {
  this.companyService.AllCities()
  .pipe(takeUntil(this.unsubsribeNotifier))
  .subscribe((res: any) => {
    if (res.status.code === 200) {
      this.cityDDList = res.data.output;
      console.log(this.cityDDList)
    } else {
      this.cityDDList = [];
    }
  }),
    () => {
      this.cityDDList = [];
    };
 
}

public getDept() {
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
 
}

jumpToSection(sectionNumber: number) {
  if(this.divNumber !== sectionNumber)
  this.divNumber = sectionNumber;
}

addRow() {
  this.familyTableRows.push({description:'',specification:'',power_rating:'', etd:'', qty: '', total_mwp:'', total: '', deleteBTN: ''});
}
addRow1() {
  this.educationTableRows.push({inst_name:'',inst_address:'',inst_city:'',start_date:'',end_date:'',course_name:'',overall_percentage:'',deleteBTN:''});
}
addRow2() {
  this.workTableRows.push({company_name:'',company_address:'', company_city:'', company_pincode:'',start_date:'',end_date:'',job_profile:'',
  employer_name:'',contact_no:''});
}
addRow3() {
  this.trainingTableRows.push({inst_name:'',inst_address:'', inst_city:'', inst_pincode:'',start_date:'',end_date:'',name_training_attended:'',
  take_away:'',deleteBTN:''});
}
addRow4() {
  this.referenceTableRows.push({name:'',address:'', phone:'', relation:'',deleteBTN:''});
}
addRow5() {
  this.contactTableRows.push({name:'',address:'', phone:'', relation:'',deleteBTN:''});
}

  
   }


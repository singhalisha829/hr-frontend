import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as XLSX from 'xlsx';
import { CompanyapiService } from '../utils/services/companyapi.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../services/utils.service';
import * as moment from 'moment';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  selectedCity :any={};
 selectedDept :any={};
 selectedGender:any={};
 selectedDOB:any;
 selectedAppDate:any;
 selectedJoiningDate:any;
 selectedMaritalStatus :any={};
 selectedDesignation :any={};
 selectedCity2 :any={};
  employeeObj :any ={};
  employeeDetailObj :any ={};
  employeeFamilyObj :any ={};
  employeeEduObj :any ={};
  bankDetailObj:any={};
  docsTableRows: any = {};
  familyTableRows: any[]= [];
  educationTableRows: any[]= [];
  trainingTableRows: any[]= [];
  workTableRows: any[]= [];
  referenceTableRows: any[]= [];
  contactTableRows: any[]= [];
  newProductArray: any[] = [];
  incomingApi:any;
  totalCount:any;
  isEditMode:boolean = false;
  cityDDList:any =[];
  deptDDList:any =[];
  designationList:any=[];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  documentDDList = [
    {name: 'Secondary School Certificate', id: 'Secondary School Certificate'},
    {name: 'Higher Secondary School Certificate', id: 'Higher Secondary School Certificate'},
    {name: 'Graduation Certificate', id: 'Graduation Certificate'},
    {name: 'Resume', id: 'Resume'},
    {name: 'Aadhar Card', id: 'Aadhar Card'},
    {name: 'PAN Card', id: 'PAN Card'},
    {name: 'Joining Form', id: 'Joining Form'},
    {name: 'Salary Certificate/Salary Slip', id: 'Salary Certificate/Salary Slip'},
    {name: 'Proof of Address(Permanent)', id: 'Proof of Address(Permanent)'},
    {name: 'Proof of Address(Correspondence)', id: 'Proof of Address(Correspondence)'},
    {name: 'Job Acceptance Letter', id: 'cfs charges'},
    {name: 'Relieving Letter', id: 'dpd charges'},
    {name: 'Bank Details', id: 'clearance charge(CHA)'},
    {name: "Master's Degree", id: 'stamp duty'},
    {name: 'Diploma Certificate', id: 'FREIGHT'},
    {name: 'Previous Job Offer Letter', id: 'inland freight'},
    {name: 'Previous Job Acceptance Letter', id: 'cfs charges'},
    {name: 'Experience Letter', id: 'dpd charges'},
    {name: 'Letter of Recommendation', id: 'clearance charge(CHA)'},
  ]

  familyTableHeaders = [
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Age', field: 'age', type: 'number', value: 'age', isEditable: true, width: 180},
    { headerName: 'Occupation', field: 'occupation', type: 'text', value: 'occupation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  docsTableHeaders = [
    { headerName: 'Name', field: 'file_name',type:'text',value:'file_name', width: 180},
    { headerName: 'Document', field: 'file',type:'file',value:'file', width: 180},
  ];
 
  educationTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Institute Name', field: 'inst_name', type: 'text', value: 'inst_name', isEditable: true, width: 180},
    { headerName: 'Institue Address', field: 'inst_address', type: 'text', value: 'inst_address', isEditable: true, width: 180},
    { headerName: 'Institute City', field: 'inst_city', showDropdown: true, key: 'id', value: 'name', ddList:[],  dropDownInRow: false, width: 250},
    { headerName: 'Start Date', field: 'start_date', type: 'date', value: 'start_date', isEditable: true,  width: 180},
    { headerName: 'End Date', field: 'end_date', type: 'date', value: 'end_date', isEditable: true,  width: 180},
    { headerName: 'Course Name', field: 'course_name', type: 'text', value: 'course_name', isEditable: true,  width: 180},
    { headerName: 'Overall Percentage', field: 'overall_percentage', type: 'number', value: 'overall_percentage', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  workTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Company Name', field: 'company_name', type: 'text', value: 'company_name', isEditable: true, width: 180},
    { headerName: 'Company Address', field: 'company_address', type: 'text', value: 'company_address', isEditable: true, width: 180},
    { headerName: 'Company City', field: 'company_city', showDropdown: true, key: 'id', value: 'name', ddList:[],  dropDownInRow: false, width: 250},
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
    { headerName: 'Institute City', field: 'inst_city', showDropdown: true, key: 'id', value: 'name', ddList:[],  dropDownInRow: false, width: 250},
    { headerName: 'Institute Pincode', field: 'inst_pincode', type: 'number', value: 'inst_pincode', isEditable: true,  width: 180},
    { headerName: 'Start Date', field: 'start_date', type: 'date', value: 'start_date', isEditable: true,  width: 180},
    { headerName: 'End Date', field: 'end_date', type: 'date', value: 'end_date', isEditable: true,  width: 180},
    { headerName: 'Name of the Training', field: 'name_training_attended', type: 'text', value: 'name_training_attended', isEditable: true,  width: 180},
    { headerName: 'Take Away', field: 'take_away', type: 'text', value: 'take_away', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];
  referenceTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Address', field: 'address', type: 'text', value: 'address', isEditable: true, width: 180},
    { headerName: 'Contact', field: 'phone', type: 'number', value: 'phone', isEditable: true,  width: 180},
    { headerName: 'Relation', field: 'relation', type: 'text', value: 'relation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];

  MaritalStatusList = [
    {name: 'Single', id: 'Single'},
    {name: 'Married', id: 'Married'},
    {name: 'Divorced', id: 'Divorced'},
    {name: 'Widowed', id: 'Widowed'},
  ];

  GenderList = [
    {name: 'Male', id: 'Male'},
    {name: 'Female', id: 'Female'},
  ];
  contactTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Address', field: 'address', type: 'text', value: 'address', isEditable: true, width: 180},
    { headerName: 'Contact', field: 'phone', type: 'number', value: 'phone', isEditable: true,  width: 180},
    { headerName: 'Relation', field: 'relation', type: 'text', value: 'relation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];
  empDocs: any;
  employeeId:any;

  constructor(private utilsService: UtilsService,private companyService: CompanyapiService,private importsService: ImportsService,
    private router: Router) { }

  ngOnInit(): void {
    const path = window.location.pathname.split('/');
    this.employeeId = path[path.length - 1];
    this.initProductTable();
    this.getCities();
    this.getDept();
    this.getDesignation();
    this.getEmployeeDetails();
    this.getFamilyDetails();
    this.getEmployeeEduaction();
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

  initProductTable() {
    this.familyTableRows = [{name:'', age:'', occupation: '', deleteBTN: ''}]
    this.referenceTableRows = [{name:'',address:'', phone: '',relation:'', deleteBTN: ''}]
    this.contactTableRows = [{name:'',address:'', phone: '',relation:'', deleteBTN: ''}]
    this.workTableRows= [{company_name:'',company_address:'', company_city:'', company_pincode:'',start_date:'',end_date:'',job_profile:'',
  employer_name:'',contact_no:'',deleteBTN:''}]
  this.trainingTableRows= [{inst_name:'',inst_address:'', inst_city:'', inst_pincode:'',start_date:'',end_date:'',name_training_attended:'',
  take_away:'',deleteBTN:''}]
    this.educationTableRows=[{inst_name:'',inst_address:'',inst_city:'',start_date:'',end_date:'',course_name:'',overall_percentage:'',deleteBTN:''}]
    this.docsTableRows=[{row_id1:0,file_name:'',file:'',deleteBTN:''}]
  }

  editEmpDetail(){
    this.isEditMode = !this.isEditMode;
    console.log(this.isEditMode)
  }
  public getEmployeeDetails() {
    this.importsService.getEmployeeData({id: this.employeeId})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.employeeDetailObj = {
          first_name: res.data.output[0].first_name,
          last_name: res.data.output[0].last_name,
          phone: res.data.output[0].phone,
          phone2: res.data.output[0].phone2,
          personal_email: res.data.output[0].personal_email,
          email_secondary: res.data.output[0].organisational_email,
          aadhar_card: res.data.output[0].aadhar_card,
          pancard: res.data.output[0].pancard,
          fathers_name: res.data.output[0].fathers_name,
          organisation:res.data.output[0].organisation,
          relavant_work_ex_months: res.data.output[0].relavant_work_ex_months,
          relavant_work_ex_year: res.data.output[0].relavant_work_ex_year,
          total_work_ex_months: res.data.output[0].total_work_ex_months,
          total_work_ex_year: res.data.output[0].total_work_ex_year,
          
          reference_by:res.data.output[0].reference_by,
          is_active:res.data.output[0].is_active,
    
          fathers_pancard: res.data.output[0].fathers_pancard,
          fathers_occupation: res.data.output[0].fathers_occupation,
          photo:res.data.output[0].photo,
         
        };
        this.selectedDOB = { start_date: moment(res.data.output[0]['date_of_birth']).format('YYYY-MM-DD') };
        this.selectedAppDate = { start_date: moment(res.data.output[0]['application_date']).format('YYYY-MM-DD') };
        this.selectedJoiningDate = { start_date: moment(res.data.output[0]['joining_date']).format('YYYY-MM-DD') };

        this.selectedMaritalStatus = this.MaritalStatusList && this.MaritalStatusList 
        .filter(el => el.name == res.data.output[0].marital_status)[0];
        this.selectedGender = this.GenderList && this.GenderList 
        .filter(el => el.name == res.data.output[0].gender)[0];
        this.selectedDept = this.deptDDList && this.deptDDList 
        .filter(el => el.department == res.data.output[0].department)[0];
        this.selectedDesignation = this.designationList && this.designationList 
        .filter(el => el.designation == res.data.output[0].designation)[0];
      } else {
        // console.log('Error fetching company details')
      }
    }),
    () => {
      // console.log('Error fetching company details')
    }
  }

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

  public getCities() {
    this.companyService.AllCities()
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.cityDDList = res.data.output;
        // this.educationTableHeaders[2]['ddList'] = [...this.cityDDList]
        // this.workTableHeaders[2]['ddList'] = [...this.cityDDList]
        // this.trainingTableHeaders[2]['ddList'] = [...this.cityDDList]
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

  public getDesignation() {
    this.importsService.getDesignation()
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.designationList = res.data.output;
      } else {
        this.designationList = [];
      }
    }),
      () => {
        this.designationList = [];
      };
   
  }

  assignPhoto(e){
    this.employeeObj.photo=e.target.files[0];
  }
  onEduCitySelected(e){
    this.educationTableRows[e.index]['inst_city'] = e.rowObj.inst_city.selectedDDList.id;
    
  }

  onDateRangeSelection(event: { startDate: string | number | Date; }) {
    this.employeeObj.date = this.utilsService.formatDate(event.startDate)
  }

  onDateRangeSelection1(event: { startDate: string | number | Date; }) {
    this.employeeObj.app_date = this.utilsService.formatDate(event.startDate)
  }

  onDateRangeSelection2(event: { startDate: string | number | Date; }) {
    this.employeeObj.dateOfJoining = this.utilsService.formatDate(event.startDate)
  }

  onWorkCitySelected(e){
    this.workTableRows[e.index]['company_city'] = e.rowObj.company_city.selectedDDList.id;
    
  }

  onTrainingCitySelected(e){
    this.trainingTableRows[e.index]['inst_city'] = e.rowObj.inst_city.selectedDDList.id;
    
  }

  submitUserDetails(){
    this.isEditMode = !this.isEditMode;
  }

  submitFamilyDetails(){

  }

  onStep2(){

  }

  submitContact(){

  }

  submitBankDetails(){

  }

  submit(){

  }

  assignfile(e, data){

  }

  onRowDelete(data){

  }

  addDocuments(){

  }

  addRow() {
    this.familyTableRows.push({name:'', age:'', occupation: '', deleteBTN: ''});
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
  
  addDocRow() {
    this.docsTableRows.push({file_name:'',file:''});
  }

  checkDuplicate(data){

  }

  selectGender(e:any){
    this.employeeObj.gender = e.target.value;
}

selectMaritalStatus(e:any){
  this.employeeObj.marital_status = e.target.value;
}

goBack(){
  this.router.navigate(['/employee'])
}

onGenderSelect(event){
  this.selectedGender = event;
    this.employeeDetailObj['gender'] = event;
}

editEmpEdu(){
  
}
}

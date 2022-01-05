import { Router } from '@angular/router';
import { UtilsService } from './../services/utils.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as XLSX from 'xlsx';
import { CompanyapiService } from '../utils/services/companyapi.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeObj :any ={};
 selectedCity :any={};
 selectedDept :any={};
 selectedDesignation :any={};
 selectedCity2 :any={};
 cityDDList :any = [];
 deptDDList :any = [];
  isHidden!: boolean;
  public buttonName:any = 'Add Employee';
  addNewEmployee: any = {};
  currentPage = 1;
  cityHeaders = [
    { headerName: 'ID', field: 'id', width: '100' },
    { headerName: 'City Name', field: 'name', width: 120 },
    { headerName: 'State', field: 'state', width:120 },
  ];
  cityArr: any = [];
  filterObj!: {};
  divNumber!: number;
  employeeTableRows: any[]=[];
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
  designationList:any=[];
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

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
  employeeTableHeaders = [
    { headerName: 'Employee Id', field: 'id',width: 60, },
    { headerName: 'Name', field: 'fullName', width: 180},
    { headerName: 'Email Id', field: 'organisation_email', width: 180},
    { headerName: 'Contact No', field: 'phone',  width: 180},
    { headerName: 'Company', field: 'organisation',  width: 180},
    { headerName: 'Designation', field: 'designation', width: 180,  },
    { headerName: 'Details', field: 'occupation',  width: 65},
  ];
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

  contactTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Address', field: 'address', type: 'text', value: 'address', isEditable: true, width: 180},
    { headerName: 'Contact', field: 'phone', type: 'number', value: 'phone', isEditable: true,  width: 180},
    { headerName: 'Relation', field: 'relation', type: 'text', value: 'relation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];
  empDocs: any;

  constructor( private utilsService: UtilsService, private companyService: CompanyapiService,private importsService: ImportsService,
    private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initProductTable();
    this.getallEmployee();
    this.getCities();
    this.getDept();
    this.getDesignation();
  }


  onEduCitySelected(e){
    this.educationTableRows[e.index]['inst_city'] = e.rowObj.inst_city.selectedDDList.id;
    
  }

  onWorkCitySelected(e){
    this.workTableRows[e.index]['company_city'] = e.rowObj.company_city.selectedDDList.id;
    
  }

  onTrainingCitySelected(e){
    this.trainingTableRows[e.index]['inst_city'] = e.rowObj.inst_city.selectedDDList.id;
    
  }
  
  isActive:any=1;
  submit(){
    for(let i=0;i<this.docsTableRows.length;i++){
    const formdata = new FormData();
    formdata.append('file_name',this.docsTableRows[i].file_name)
    formdata.append('file',this.docsTableRows[i].file);
    formdata.append('UserDetails',this.employeeId)
    formdata.append('is_active',this.isActive)

    this.importsService.postDocuments(formdata)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        // this.toaster.success("User Address Successfully Added");
      }
    }, () => {})
  }
  }

  submitAddress(){
    const formdata1= new FormData();
    const formdata2= new FormData();

     //user_present_address
     formdata1.append('present_address', this.employeeObj.presentAddress);
     formdata1.append('present_pincode', this.employeeObj.pincode);
     formdata1.append('present_city', this.selectedCity.id);
     formdata1.append('type','Present')
     formdata1.append('UserDetails', this.employeeId)
 
 
     //user_permanent_address
     formdata2.append('present_address', this.employeeObj.permanentAddress);
     formdata2.append('present_city', this.selectedCity2.id);
     formdata2.append('present_pincode', this.employeeObj.pincode1);
     formdata2.append('type','Permanent')
     formdata2.append('UserDetails', this.employeeId)
 
     this.importsService.postUserAddress(formdata1)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        // this.toaster.success("User Address Successfully Added");
      }
    }, () => {})

    this.importsService.postUserAddress(formdata2)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        // this.toaster.success("User Address Successfully Added");
        
      }
    }, () => {})
    
  }

  submitUserDetails(){
    const formdata = new FormData();
   
    formdata.append('first_name', this.employeeObj.firstName);
    formdata.append('last_name', this.employeeObj.lastName);
    formdata.append('phone', this.employeeObj.contact);
    formdata.append('phone2', this.employeeObj.alternateContact);
    formdata.append('personal_email', this.employeeObj.email);
    formdata.append('organisation_email', this.employeeObj.orgEmail);
    formdata.append('date_of_joining', this.employeeObj.dateOfJoining);
    formdata.append('photo', this.employeeObj.photo);
    formdata.append('total_work_ex_year', this.employeeObj.totalWorkYear);
    formdata.append('total_work_ex_months', this.employeeObj.totalWorkMon);
    formdata.append('relevant_work_ex_year', this.employeeObj.relWorkYear);
    formdata.append('relevant_work_ex_months', this.employeeObj.relWorkMon);
    formdata.append('date_of_birth', this.employeeObj.date);
    formdata.append('gender', this.employeeObj.gender);
    formdata.append('aadhar_card', this.employeeObj.aadhar);
    formdata.append('pancard', this.employeeObj.pancard);
    formdata.append('fathers_name', this.employeeObj.fatherName);
    formdata.append('fathers_pancard', this.employeeObj.fatherPancard);
    formdata.append('fathers_occupation', this.employeeObj.fatherOccupation);
    formdata.append('organisation', this.employeeObj.organisation);
    formdata.append('department' , this.selectedDept.id);
    formdata.append('designation', this.selectedDesignation.id);
    formdata.append('application_date', this.employeeObj.app_date);
    formdata.append('reference_by', this.employeeObj.app_by);
    formdata.append('marital_status', this.employeeObj.marital_status)

   

    this.importsService.postEmployeeDetails(formdata)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.toaster.success("User Successfully Added");
        this.getallEmployee1();
        
      }
    }, () => {})

  
    
  }

  
 

  submitFamilyDetails(){
    for( let i=0; i< this.familyTableRows.length; i++){
      this.familyTableRows[i]['name']= this.familyTableRows[i]['name'];
      this.familyTableRows[i]['age'] = this.familyTableRows[i]['age'];
      this.familyTableRows[i]['occupation']= this.familyTableRows[i]['occupation'];
      this.familyTableRows[i]['UserDetails']=this.employeeId;
    }
    for(let k = 0; k < this.familyTableRows.length; k++ ){
     this.importsService.postFamilyDetails(this.familyTableRows[k])
     .pipe(takeUntil(this.unsubsribeNotifier))
     .subscribe((res: any) => {
      if(res.status.code == 200){
       
      }
     }, () => {})
    }
    
  }

  onStep2(){
    for( let i=0; i< this.educationTableRows.length; i++){
      this.educationTableRows[i]['inst_name']= this.educationTableRows[i]['inst_name'];
      this.educationTableRows[i]['inst_address'] = this.educationTableRows[i]['inst_address'];
      this.educationTableRows[i]['start_date']= this.educationTableRows[i]['start_date'];
      this.educationTableRows[i]['end_date']= this.educationTableRows[i]['end_date'];
      this.educationTableRows[i]['course_name']= this.educationTableRows[i]['course_name'];
      this.educationTableRows[i]['overall_percentage']= this.educationTableRows[i]['overall_percentage'];
      this.educationTableRows[i]['inst_city']= this.educationTableRows[i]['inst_city'];
      this.educationTableRows[i]['UserDetails']= this.employeeId;
    }
    for(let k = 0; k < this.educationTableRows.length; k++ ){
     this.importsService.postEducationDetails(this.educationTableRows[k])
     .pipe(takeUntil(this.unsubsribeNotifier))
     .subscribe((res: any) => {
      if(res.status.code == 200){
         this.toaster.success('Education Updated Successfully');
      }
     }, () => {})
    }

    for( let i=0; i< this.workTableRows.length; i++){
      this.workTableRows[i]['company_name']= this.workTableRows[i]['company_name'];
      this.workTableRows[i]['company_address'] = this.workTableRows[i]['company_address'];
      this.workTableRows[i]['company_pincode']= this.workTableRows[i]['company_pincode'];
      this.workTableRows[i]['start_date']= this.workTableRows[i]['start_date'];
      this.workTableRows[i]['end_date']= this.workTableRows[i]['end_date'];
      this.workTableRows[i]['job_profile']= this.workTableRows[i]['job_profile'];
      this.workTableRows[i]['employer_name']= this.workTableRows[i]['employer_name'];
      this.workTableRows[i]['contact_no']= this.workTableRows[i]['contact_no'];
      this.workTableRows[i]['company_city']= this.workTableRows[i]['company_city'];
      this.workTableRows[i]['UserDetails']= this.employeeId;
    }
    for(let k = 0; k < this.workTableRows.length; k++ ){
     this.importsService.postWorkDetails(this.workTableRows[k])
     .pipe(takeUntil(this.unsubsribeNotifier))
     .subscribe((res: any) => {
      if(res.status.code == 200){
         this.toaster.success('Work/Internship Updated Successfully');
      }
     }, () => {})
    }

    for( let i=0; i< this.trainingTableRows.length; i++){
      this.trainingTableRows[i]['inst_name']= this.trainingTableRows[i]['inst_name'];
      this.trainingTableRows[i]['inst_address'] = this.trainingTableRows[i]['inst_address'];
      this.trainingTableRows[i]['inst_pincode']= this.trainingTableRows[i]['inst_pincode'];
      this.trainingTableRows[i]['start_date']= this.trainingTableRows[i]['start_date'];
      this.trainingTableRows[i]['end_date']= this.trainingTableRows[i]['end_date'];
      this.trainingTableRows[i]['name_training_attended']= this.trainingTableRows[i]['name_training_attended'];
      this.trainingTableRows[i]['take_away']= this.trainingTableRows[i]['take_away'];
      this.trainingTableRows[i]['inst_city']= this.trainingTableRows[i]['inst_city'];
      this.trainingTableRows[i]['UserDetails']= this.employeeId;
    }
    for(let k = 0; k < this.trainingTableRows.length; k++ ){
     this.importsService.postTrainingDetails(this.trainingTableRows[k])
     .pipe(takeUntil(this.unsubsribeNotifier))
     .subscribe((res: any) => {
      if(res.status.code == 200){
         this.toaster.success('Work/Internship Updated Successfully');
      }
     }, () => {})
    }
  }


  //bank_details
  bankDetailObj:any={};
  submitBankDetails(){
    const formdata = new FormData()
    formdata.append('account_holder_name', this.bankDetailObj.name);
    formdata.append('bank_name', this.bankDetailObj.bankName);
    formdata.append('bank_account', this.bankDetailObj.bankAccount);
    formdata.append('bank_branch', this.bankDetailObj.bankBranch);
    formdata.append('ifsc_code', this.bankDetailObj.ifsc_code);
    formdata.append('UserDetails', this.employeeId);
    
    this.importsService.postBankDetails(formdata)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.toaster.success("Bank Details Successfully Added");
      }
    }, () => {})

  }


  submitContact(){
    for( let i=0; i< this.referenceTableRows.length; i++){
      this.referenceTableRows[i]['name']= this.referenceTableRows[i]['name'];
      this.referenceTableRows[i]['address'] = this.referenceTableRows[i]['address'];
      this.referenceTableRows[i]['phone']= this.referenceTableRows[i]['phone'];
      this.referenceTableRows[i]['relation']= this.referenceTableRows[i]['relation'];
      this.referenceTableRows[i]['UserDetails']= this.employeeId;
    }
    for(let k = 0; k < this.referenceTableRows.length; k++ ){
     this.importsService.postReference(this.referenceTableRows[k])
     .pipe(takeUntil(this.unsubsribeNotifier))
     .subscribe((res: any) => {
      if(res.status.code == 200){
         this.toaster.success('Reference Updated Successfully');
      }
     }, () => {})
    }

    for( let i=0; i< this.contactTableRows.length; i++){
      this.contactTableRows[i]['name']= this.contactTableRows[i]['name'];
      this.contactTableRows[i]['address'] = this.contactTableRows[i]['address'];
      this.contactTableRows[i]['phone']= this.contactTableRows[i]['phone'];
      this.contactTableRows[i]['relation']= this.contactTableRows[i]['relation'];
      this.contactTableRows[i]['UserDetails']= this.employeeId;
    }
    for(let k = 0; k < this.contactTableRows.length; k++ ){
     this.importsService.postEmergencyContact(this.contactTableRows[k])
     .pipe(takeUntil(this.unsubsribeNotifier))
     .subscribe((res: any) => {
      if(res.status.code == 200){
         this.toaster.success('Emergency Contact Updated Successfully');
      }
     }, () => {})
    }
  }
  selectGender(e:any){
    this.employeeObj.gender = e.target.value;
}

selectMaritalStatus(e:any){
  this.employeeObj.marital_status = e.target.value;
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

  checkDuplicate(field){

  }

  totalCountAddress:any;
  totalCountFamily:any;
  totalCountEducation:any;
  totalCountWork:any;
  totalCountTraining:any;
  totalCountReference:any;
  totalCountContact:any;
  totalCountBank:any;
  totalCountDocs:any;
  onTableRowClicked (e) {
    this.importsService.getEmployeeAddress({UserDetails_id: e.id})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.totalCountAddress = res.data.total_count;

    this.importsService.getEmployeeFamily({UserDetails_id: e.id})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.totalCountFamily = res.data.total_count;
    
    this.importsService.getEmployeeEducation({UserDetails_id: e.id})
      .pipe(takeUntil(this.unsubsribeNotifier))
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.totalCountEducation = res.data.total_count;
        
    this.importsService.getEmployeeWork({UserDetails_id: e.id})
      .pipe(takeUntil(this.unsubsribeNotifier))
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.totalCountWork = res.data.total_count;
            
    this.importsService.getEmployeeTraining({UserDetails_id: e.id})
      .pipe(takeUntil(this.unsubsribeNotifier))
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.totalCountTraining = res.data.total_count;
                
    this.importsService.getEmployeeReference({UserDetails_id: e.id})
      .pipe(takeUntil(this.unsubsribeNotifier))
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.totalCountReference = res.data.total_count;
                    
    this.importsService.getEmployeeContact({UserDetails_id: e.id})
      .pipe(takeUntil(this.unsubsribeNotifier))
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.totalCountContact = res.data.total_count;
                        
    this.importsService.getEmployeeBankDetails({UserDetails_id: e.id})
      .pipe(takeUntil(this.unsubsribeNotifier))
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.totalCountBank = res.data.total_count;
                            
    this.importsService.getEmployeeDocs({UserDetails_id: e.id})
      .pipe(takeUntil(this.unsubsribeNotifier))
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.totalCountDocs = res.data.total_count;              
        if(this.totalCountAddress>0 && this.totalCountFamily>0 && this.totalCountEducation>0 &&
          this.totalCountWork>0 && this.totalCountTraining>0 && this.totalCountReference>0 &&
          this.totalCountContact>0 && this.totalCountBank && this.totalCountDocs>0){
            this.router.navigate([`./employeeDetails/${e.id}`])
        }else{
          this.router.navigate([`./employeeForm/${e.id}`])
        }                        
      }}),() => {};
      }}),() => {};
      }}),() => {};
      }}),() => {};       
      }}),() => {};
      }}),() => {};
      }}),() => {};
      }}),() => {};
      }}),() => {};
    
  }

  assignfile(e, data) {
    this.docsTableRows[data.row_id1].file =  e.target.files[0];
  }

  pageChanged(e:any) {
    if(this.currentPage === e.page) {
      return;
    }
    this.currentPage = e.page;
    this.persistPage(e.page);
    this.getallEmployee();
  }

  persistPage(page?:any) {
    const pathName  = window.location.pathname.slice(1);
    this.currentPage = page ? page : 1;
    if (localStorage.getItem('filterObj' + pathName )) {
      const DDObj = JSON.parse(localStorage.getItem('filterObj' + pathName ))
      if(page) {
        DDObj[pathName]['page'] = this.currentPage;
      } else {
        this.currentPage = DDObj[pathName]['page'];
      }
      localStorage.setItem(('filterObj' + pathName), JSON.stringify({...DDObj}) )
    } else {
      const DDObj :any=  {};
      DDObj[pathName] = {page: this.currentPage};
      localStorage.setItem(('filterObj' + pathName), JSON.stringify({...DDObj}) )
    }
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

  employeeId:any;
  public getallEmployee() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getEmployeeData({end_limit: 25, page: this.currentPage, ...this.filterObj})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.employeeTableRows = res.data.output;
        this.totalCount = res.data.total_count;
        // this.employeeId = this.employeeTableRows[this.totalCount-1]['id'];
        console.log(this.employeeId)
        for(let i =0 ; i < this.employeeTableRows.length; i++){
          this.employeeTableRows[i]['fullName'] = this.employeeTableRows[i]['first_name']+" "+ this.employeeTableRows[i]['last_name'];
        }
      } else {this.employeeTableRows = [];}
    }),
      () => {this.employeeTableRows = [];};
  }

  public getallEmployee1() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getEmployeeData({end_limit: 25, page: this.currentPage, ...this.filterObj})
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.employeeTableRows = res.data.output;
        this.totalCount = res.data.total_count;
        this.employeeId = this.employeeTableRows[this.totalCount-1]['id'];
        console.log(this.employeeId)
        for(let i =0 ; i < this.employeeTableRows.length; i++){
          this.employeeTableRows[i]['fullName'] = this.employeeTableRows[i]['first_name']+" "+ this.employeeTableRows[i]['last_name'];
        }
        this.submitAddress();
      } else {this.employeeTableRows = [];}
    }),
      () => {this.employeeTableRows = [];};
  }

  onRowDelete (data) {
    if(this.docsTableRows.length != 0) {
     this.docsTableRows.splice(data.row_id, 1);
      }
    
}

addDocuments(){
  var rowCount = this.docsTableRows.length;
  console.log(rowCount)
  this.docsTableRows['row_id1'] = rowCount;
  this.docsTableRows.push({
    row_id1: this.docsTableRows['row_id1'],
    file_name: '',
    file:'  ',
    deleteBTN: '',
  });
  
}

assignPhoto(e){
  this.employeeObj.photo=e.target.files[0];
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
      this.educationTableHeaders[2]['ddList'] = [...this.cityDDList]
      this.workTableHeaders[2]['ddList'] = [...this.cityDDList]
      this.trainingTableHeaders[2]['ddList'] = [...this.cityDDList]
      console.log(this.cityDDList)
    } else {
      this.cityDDList = [];
    }
  }),
    () => {
      this.cityDDList = [];
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

employeeList:any[]=[];
getallEmployeeExport(){
  if (this.incomingApi) this.incomingApi.unsubscribe();
  this.incomingApi = this.importsService.getEmployeeData({end_limit: this.totalCount, ...this.filterObj})
  .pipe(takeUntil(this.unsubsribeNotifier))
  .subscribe((res: any) => {
    if (res.status.code === 200) {
      this.employeeList = res.data.output;
      setTimeout(() => {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
        const wb: XLSX.WorkBook = XLSX.utils.book_new();  
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
        XLSX.writeFile(wb, 'Pi_list.xlsx');
      }, 1000);
    } else {
      this.employeeList = [];
    }
  }),
    () => {
      this.employeeList = [];
    };
}
}

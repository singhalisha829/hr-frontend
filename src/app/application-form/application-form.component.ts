import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

 
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

  constructor( private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.initProductTable();
    
  }

  submit(){

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
    this.addNewEmployee.date = this.utilsService.formatDate(event.startDate)
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


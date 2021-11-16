import { UtilsService } from './../services/utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  isHidden!: boolean;
  public buttonName:any = 'Add Employee';
  addNewEmployee: any = {};
  cityHeaders = [
    { headerName: 'ID', field: 'id', width: '100' },
    { headerName: 'City Name', field: 'name', width: 120 },
    { headerName: 'State', field: 'state', width:120 },
  ];
  cityArr = [];
  filterObj!: {};
  formSteps = ['Personal Details', 'Education Details & Work Ex','Bank Details', 'Upload Documents'];
  divNumber!: number;
  productTableRows: any[]= [];
  
  newProductArray: any[] = [];
  productTableHeaders = [
    // { headerName: 'Sr No.', field: 'sr_no',  type: 'text', value: 'sr_no',width: 60, },
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: false,  width: 180},
    { headerName: 'Age', field: 'age', type: 'text', value: 'age', isEditable: false,  width: 180},
    { headerName: 'Occupation', field: 'occupation', type: 'text', value: 'occupation', isEditable: true,  width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];
 

  constructor( private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.initProductTable();
    
  }

  submit(){

  }

  initProductTable() {
    this.productTableRows = [{name:'', age:'', occupation: '', deleteBTN: ''}]
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
  this.productTableRows.push({description:'',specification:'',power_rating:'', etd:'', qty: '', total_mwp:'', total: '', deleteBTN: ''});
}
}

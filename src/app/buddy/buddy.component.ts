import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.css']
})
export class BuddyComponent implements OnInit {

  docTableRows:any;
  buddyObj:{
    new_joinee:any;
    buddy_name:any;
  };
  docTableHeaders = [
    { headerName: 'Name', field: 'name', type: 'text', value: 'name', isEditable: true, width: 180},
    { headerName: 'Doc', field: 'doc', type: 'file', value: 'doc', isEditable: true, width: 180},
    { headerName: 'Action', field: 'deleteBTN', width: 65,  },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.docTableRows = [{name:'', doc:'', deleteBTN: ''}]
  }

  preview(){
    localStorage.setItem('new_joinee',this.buddyObj.new_joinee);
    localStorage.setItem('buddy_name', this.buddyObj.buddy_name)
    this.router.navigate(['buddy-banner'])
  }

  addRow(){
    this.docTableRows.push({name:'',doc:'', deleteBTN:''});
  }
}

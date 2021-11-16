import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sick-leave',
  templateUrl: './sick-leave.component.html',
  styleUrls: ['./sick-leave.component.css']
})
export class SickLeaveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activeTab = 'Pending';

  next(activeTab: string){
    if(activeTab=='Pending')
    this.activeTab = 'Approved';
  }


  
}

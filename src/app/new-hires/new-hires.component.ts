import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-hires',
  templateUrl: './new-hires.component.html',
  styleUrls: ['./new-hires.component.css']
})
export class NewHiresComponent implements OnInit {

  newTableRows:any=[];
  constructor() { }

  ngOnInit(): void {
  }

}

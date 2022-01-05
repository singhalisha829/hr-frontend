import { UtilsService } from './../services/utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  logout(){
    this.utilsService.logoutUser();
  }
}

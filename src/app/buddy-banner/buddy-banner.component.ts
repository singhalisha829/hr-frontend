import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buddy-banner',
  templateUrl: './buddy-banner.component.html',
  styleUrls: ['./buddy-banner.component.css']
})
export class BuddyBannerComponent implements OnInit {

  content: string="Hii...";
  url="../../../assets/images/background.jpg";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  goBack(){
    this.router.navigate(['buddy']);
  }

}

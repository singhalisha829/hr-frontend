import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) {
    if(localStorage.length ==0){
        this.router.navigate(['login'])
       }
   }

  ngOnInit(): void {
  }

  // ngAfterViewInit(){
  //   setTimeout( ()=>{
  //   localStorage.clear();
  //   this.router.navigate(['login'])
  //   console.log(localStorage)
  //   }, 5000)
    
  // }
}

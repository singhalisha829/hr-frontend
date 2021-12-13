import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policyservice/policy.service';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policyservices :any[];
  constructor(private policyservice: policyservice) { }

  ngOnInit(): void {
    this.policyservice.policyservices().subscribe((data: any)=>{
      this.policyservices=data;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImportsService } from '../utils/services/imports.service';
import * as XLSX from 'xlsx'; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrls: ['./offer-letter.component.css']
})
export class OfferLetterComponent implements OnInit {

  incomingApi:any;
  totalCount;
  offerObj:any={};
  unsubsribeNotifier = new Subject(); // to notify to cancel api when component gets 

  constructor(private importsService: ImportsService,) { }

  ngOnInit(): void {
    this.getallOffer()
  }


  public getallOffer() {
    if (this.incomingApi) this.incomingApi.unsubscribe();
    this.incomingApi = this.importsService.getOfferData({id:1  })
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.offerObj = res.data.output;
        this.totalCount = res.data.total_count;
       
      } else {this.offerObj = [];}
    }),
      () => {this.offerObj = [];};
  }
}

import { CONSTANTS } from './../constants/index';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment1 } from 'src/environments/environment';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ImportsService {

  constructor(private httpService: HttpService,) { }
  
 
  public postEmployeeDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_DETAILS, data)
   }
  public getEmployeeData(data:any) {
    return this.httpService.get(CONSTANTS.MAIN.APP.URLS.USER_DETAILS, data);
  }

  public getAppointment(data:any) {
    return this.httpService.get(CONSTANTS.MAIN.APP.URLS.APPOINTMENT, data);
  }

  public postAppointmentDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.APPOINTMENT, data);
  } 


  public postFamilyDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_FAMILY, data);
  }
  public postEducationDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_EDUCATION, data);
  }

  public postWorkDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_WORK, data);
  }
  public postTrainingDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_TRAINING, data);
  }
  public postBankDetails(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_BANK, data);
  }
  public postUserAddress(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USER_ADDRESS, data);
  }

  public postOfferLetter(data:any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.OFFER_LETTER, data);
  }

  public getOfferData(data:any) {
    return this.httpService.get(CONSTANTS.MAIN.APP.URLS.OFFER_LETTER, data);
  }
  
  
//   public getPODetailsById(data) {
//     return this.httpService.get(CONSTANTS.MAIN.APP.URLS.PURCHASE_ORDER, data);
//   }
//   public putPODetailsById(data) {
//     return this.httpService.put(CONSTANTS.MAIN.APP.URLS.PURCHASE_ORDER, data);
//   }
//   
}

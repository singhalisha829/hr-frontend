import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpService: HttpService) { }

  public checkLogin(data: any) {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.API_AUTH_TOKEN, data)

  }
}
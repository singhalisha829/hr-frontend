import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, UrlSerializer } from '@angular/router';
import { CONSTANTS } from '../utils/constants';


@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  constructor(
    private toaster: ToastrService,
    private router: Router,
    private serializer: UrlSerializer) {}


  errorAPIMsgAlertHandler(resObj: { code: { toString: () => any; }; description: any; }, showAlert = false) {
    const statusCode = resObj.code.toString();
    const statusDescription = resObj.description;
    this.toaster.toastrConfig.timeOut = 5000;
    this.toaster.toastrConfig.disableTimeOut = false;
    if (statusCode.indexOf('2') === 0 && showAlert) {
      this.toaster.success(statusDescription);
    } else if (statusCode.indexOf('4') === 0) {
      if (statusCode === '401') {
        this.toaster.toastrConfig.disableTimeOut = true;
        this.toaster.error('User UnAuthorised, Kindly Login.');
        this.logoutUser();
      } else {
        this.toaster.warning(statusDescription);
      }
    } else if (statusCode.indexOf('6') === 0) {
      // this.toaster.toastrConfig.timeOut = 0;
      this.toaster.toastrConfig.disableTimeOut = true;
      this.toaster.error(statusDescription);
    } else {
      // this.toaster.toastrConfig.timeOut = 0;
      this.toaster.toastrConfig.disableTimeOut = true;
      this.toaster.error(statusDescription);
    }
  }
  decodeStringFromBase64(param: string) {
    param = param.toString();
    const raw = window.atob(param);
    let _HEX = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      _HEX += (hex.length === 2 ? hex : '0' + hex);
    }
    return _HEX.toUpperCase();
  }

  // encodeStringToBase64(param: { toString: () => any; match: (arg0: RegExp) => string[]; }) {
  //   param = param.toString();
  //   if (param.match(/\w{2}/g)) {
  //     return btoa(param.match(/\w{2}/g).map((a: string) => {
  //       return String.fromCharCode(parseInt(a, 16));
  //     }).join(''));
  //   }
  // }

  decimalToHex(param: any) {
    param = parseInt(param, 10);
    let res = param.toString(16);
    if (res.toString().length <= 8) {
      const repeatFactor = 8 - res.toString().length;
      res = '0'.repeat(repeatFactor) + res.toString();
    }
    return res.toString();
  }

  hexToDecimal(param: string) {
    const res = parseInt(param, 16);
    return res;
  }

  isValidHexPattern(param: { toString: () => string; }) {
    const reg = new RegExp(/^[0-9A-Fa-f]+$/);
    return reg.test(param.toString());
  }
  escapeHtml(unsafe: string) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  logoutUser() {
    window.localStorage.clear();
    setTimeout(() => {
    this.toaster.clear();
    },4000)
    this.router.navigate(['/login'])
  }

  mergeKeys(arr: string | any[], key1: string | number, key2: string | number, newKey: string | number) {
    for (let i = 0; i< arr.length; i++) {
      arr[i][newKey] = arr[i][key1] + ' ' + arr[i][key2]
    }
    return [...arr];
  }
  /***
  * name: errorServiceHandler
  * desc: handling service error status codes
  ***/
  errorServiceHandler(error: { status: string | number; statusText: string; error: string; }) {
    this.toaster.toastrConfig.timeOut = 5000;
    this.toaster.toastrConfig.disableTimeOut = false;
    // set error msg when service fails
    let errMsg = '' ;
    errMsg = error.status + ' ' + error.statusText + ' ' + error.error;
    if (error.status === 0) {
      // if service could not be connected
      errMsg = CONSTANTS.MAIN.APP.MESSAGES.SERVICE_ERR;
    } else if (error.status === 401) {
      // if unauthorized request
      setTimeout(() => {
        this.logoutUser();
      }, 2000)
    } else if (error.status === 404) {
      errMsg = '404 ' + CONSTANTS.MAIN.APP.MESSAGES.NOT_FOUND_ERR;
    }
    else if (error.status === 500) {
      errMsg = CONSTANTS.MAIN.APP.MESSAGES.ERR_CODE_500;
    } else {
      // other error codes
      errMsg = error.statusText + ' ' + error.status;
      if (error.status === 400 && error.error) {
        //errMsg = error.error.message;
      }
    }
    this.toaster.toastrConfig.disableTimeOut = true;
    this.toaster.error(errMsg);
  }
  formatDate(date: string | number | Date) {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  formatDateForTable(date: string | number | Date) {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [day, month, year].join('-');
  }

  checkUserPermissions() {
    const disabledUserPermissions =
      localStorage.getItem('disabledPermissions') || [] as any;
    if(disabledUserPermissions.includes('clear_region-filter')
    && disabledUserPermissions.includes('clear_salesperson-filter')) {
      return {
        disableRegion: true,
        disableSalesPerson: true
      };
    }
    if(disabledUserPermissions.includes('clear_region-filter')) {
      return {
        disableRegion: true,
        disableSalesPerson: false
      };
    } else if(disabledUserPermissions.includes('clear_salesperson-filter')) {
      return {
        disableRegion: false,
        disableSalesPerson: true
      };
    }
    return {
      disableRegion: false,
      disableSalesPerson: false
    };
  }

  checkEdgeCase(permissions: { disableSalesPerson: boolean},
     salespersonDDList: any[]) {
    // Check for edgecase where region or salesperson does not exist for restricted permissions
    const DDPermissions = permissions;
    if((DDPermissions.disableSalesPerson) &&
    (!salespersonDDList[0])) {
      return true;
    }  else if (DDPermissions.disableSalesPerson && !salespersonDDList[0]) {
      return true;
    }
    return false;
  }

  searializeUrl(routePath: any, params: any) {
    const Urltree = this.router.createUrlTree([routePath], { queryParams: params });
    return this.serializer.serialize(Urltree);
  }
}


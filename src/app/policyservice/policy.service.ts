import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  policyservices() {
    throw new Error('Method not implemented.');
  }
  url = "http://3.6.118.235/api/hrm/companypolicy-title/"
  constructor(private http:HttpClient) { }
policy()
{
  return this.http.get(this.url);
}
}

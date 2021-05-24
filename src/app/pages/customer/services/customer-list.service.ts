import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

//model
import { CustomerListModel } from '../models/customer-list.model';
//base service
import { BaseApiService } from '../../../shared/services/base.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class CustomerListService extends BaseApiService<CustomerListModel> {
  
  constructor(public http: HttpClient) {
    super(http, 'api/customer?pageNumber=1')
  }

}
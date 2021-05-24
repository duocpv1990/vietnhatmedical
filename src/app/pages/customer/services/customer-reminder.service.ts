import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//models
import { CustomerRemindersModel } from '../models/customer-reminder.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerReminderService extends BaseApiService<CustomerRemindersModel>{
  constructor(public http: HttpClient) { 
    super(http, 'api/customerReminder')
  }  
  getCustomerReminderById(customerId) {
    return this.http.get(`api/customerReminder/customer/${customerId}`).pipe(map((res: any) => res.Payload));
  }
}

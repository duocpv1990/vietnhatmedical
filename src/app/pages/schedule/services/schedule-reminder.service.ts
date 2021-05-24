import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BaseApiService } from '../../../shared/services/base.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ScheduleReminderService extends BaseApiService<any> {
  constructor(public http: HttpClient) {
    super(http, 'api/CustomerReminder')
  }
  getCustomerReminderByEmployeeId(employeeId) {
    return this.http.get(`api/customerReminder/employee/${employeeId}`).pipe(map((res: any) => res.Payload));
  }

  getReminderByDate(fromDate, toDate) {
    return this.http.get(`api/customerReminder/datetime?fromdate=${fromDate}&todate=${toDate}`).pipe(map((res: any) => res.Payload));
  }

}
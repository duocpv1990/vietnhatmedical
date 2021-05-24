import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {ScheduleModel} from '../models/schedule.model'
import { BaseApiService } from '../../../shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService extends BaseApiService<ScheduleModel>{
    constructor(public http: HttpClient){
        super(http, 'api/schedule')
    }
    searchSchedule(FromDate, ToDate, MemberID, page) {
        return this.http.get(`api/schedule/search?fromDate=${FromDate}&toDate=${ToDate}&providerId=${MemberID}&page=${page}`).pipe(map((res: any) => res.Payload));
    }
    getScheduleProviderList(id) {
        return this.http.get(`api/ScheduleProvider/schedule/${id}`).pipe(map((res: any) => res.Payload));
    }
    getScheduleByToken(fromDate: string, toDate: string) {
        return this.http.get(`api/schedule/username?fromDate=${fromDate}&toDate=${toDate}`).pipe(map((res: any) => res.Payload));
    }

    getReminderByToken(fromdate: string, todate: string) {
        return this.http.get(`api/customerreminder/username?fromdate=${fromdate}&todate=${todate}`).pipe(map((res: any) => res.Payload));
    }
}
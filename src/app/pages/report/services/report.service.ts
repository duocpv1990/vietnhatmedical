import { Injectable } from '@angular/core';

//base 
import { BaseApiService } from 'src/app/shared/services/base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ReportService  {
    constructor(
        public http: HttpClient
    ) {}                            
     

    getReport(employeeId, fromDate, toDate, provinceId, source, branchId) {
        return this.http.get(`api/DailyRevenue?employeeId=${employeeId}&fromDate=${fromDate}&toDate=${toDate}&provinceId=${provinceId}&source=${source}&branchId=${branchId}`).pipe(map((res : any) => res.Payload));
    }
    listReportArea(fromTime, toTime, branchName?) {
        return this.http.get(`api/Report/GeneralRevenue?fromTime=${fromTime}&toTime=${toTime}&branchName=${branchName}`).pipe(map((res : any) => res.Payload));
    }
    listReportSale(fromTime, toTime, branchName?){
        return this.http.get(`api/Report/RevenueBySales?fromTime=${fromTime}&toTime=${toTime}&branchName=${branchName}`).pipe(map((res : any) => res.Payload));
    }
    listReportRevenueBySources(fromTime, toTime, branchName?){
        return this.http.get(`api/Report/RevenueBySources?fromTime=${fromTime}&toTime=${toTime}&branchName=${branchName}`).pipe(map((res : any) => res.Payload));
    }
    listReportAccumulationRevenues(fromTime, toTime, branchName?){
        return this.http.get(`api/Report/AccumulationRevenues?fromTime=${fromTime}&toTime=${toTime}&branchName=${branchName}`).pipe(map((res : any) => res.Payload));
    }
    listReportAverageCustomerCycle(fromTime, toTime, branchName?){
        return this.http.get(`api/Report/AverageCustomerCycle?fromTime=${fromTime}&toTime=${toTime}&branchName=${branchName}`).pipe(map((res : any) => res.Payload));
    }
}
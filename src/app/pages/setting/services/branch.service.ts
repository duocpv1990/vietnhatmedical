import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BranchModel } from '../models/branch.model';
import { BaseApiService } from '../../../shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class BranchService extends BaseApiService<BranchModel>{
    constructor(public http: HttpClient) {
        super(http, 'api/branch')
    }
    getEmployeeByBranchId(branchId: number) {
        return this.http.get(`api/employee/branch/${branchId}`).pipe(map((res: any) => res.Payload));
    }
    getAllEmployee(){
        return this.http.get(`api/employee`).pipe(map((res: any) => res.Payload));

    }
}
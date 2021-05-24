import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { map } from 'rxjs/operators';
import { CustomerOperationResultModel } from "../models/customer-operation-result.model";

@Injectable({
    providedIn: 'root'
})
export class CustomerOperationResultService extends BaseApiService<CustomerOperationResultModel>{

    constructor(
        public http: HttpClient
    ) {
        super(http, 'api/OperationResult')
    }

    getOperationResultByServiceId(serviceId: number): Observable<CustomerOperationResultModel> {
        return this.http.get<CustomerOperationResultModel>(`api/OperationResult/operation/${serviceId}`).pipe(map( (res: any) => res.Payload));
    }

}
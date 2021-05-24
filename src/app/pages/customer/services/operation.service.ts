import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OperationModel } from '../models/operation.model';

//base
import { BaseApiService } from '../../../shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class OperationService extends BaseApiService<OperationModel> {
    
    constructor(public http: HttpClient) { 
        super(http, 'api/Operation')
     }

     getOperationInfoByCustomerId(customerId : number){
        return this.http.get(`api/operation/customer/${customerId}`).pipe(map((res: any) => res.Payload));
    }

    getProviderByOperationId(operationId: number) {
        return this.http.get(`api/operationProvider/operation/${operationId}`).pipe(map((res: any) => res.Payload));
    }
}
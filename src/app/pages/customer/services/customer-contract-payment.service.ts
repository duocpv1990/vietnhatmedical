import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { CustomerContractPaymentModel } from "../models/customer-contract-payment.model";

@Injectable({
    providedIn: 'root'
})
export class CustomerContractPaymentService extends BaseApiService<CustomerContractPaymentModel>{

    constructor(
        public http: HttpClient
    ) {
        super(http, 'api/ContractPayment')
    }

    getPaymentByContractId(contractId: number): Observable<CustomerContractPaymentModel> {
        return this.http.get<CustomerContractPaymentModel>(`api/ContractPayment/contract/${contractId}`);
    }

}

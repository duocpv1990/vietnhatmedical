import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { map } from 'rxjs/operators';
import { CustomerContractModel } from "../models/customer-contract.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerContractService extends BaseApiService<CustomerContractModel>{

  constructor(
    public http: HttpClient
  ) {
    super(http, 'api/Contract')
  }

  getContractByCustomerId(customerId: number): Observable<CustomerContractModel> {
    return this.http.get<CustomerContractModel>(`api/Contract/CustomerId/${customerId}`)
      .pipe(map((res: any) => res.Payload));
  }

  getContractByEmployeeId(employeeId: number): Observable<CustomerContractModel> {
    return this.http.get<CustomerContractModel>(`api/Contract/EmployeeId/${employeeId}`);
  }

  getContractNotConnectToOperation(customerId) {
    return this.http.get(`api/contract/operation/${customerId}`).pipe(map((res: any) => res.Payload));
  }

  getServiceByContractId(contractId: number){
    return this.http.get(`api/ContractSurgeryService/contract/${contractId}`).pipe(map((res: any) => res.Payload));
  }
  
}

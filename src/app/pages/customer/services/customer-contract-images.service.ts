import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { map } from 'rxjs/operators';
import { ContractImagesModel } from "../models/customer-contract-images.model";

@Injectable({
  providedIn: 'root'
})
export class ContractImagesService extends BaseApiService<ContractImagesModel>{

  constructor(
    public http: HttpClient
  ) {
    super(http, 'api/ContractImage') 
  }

  getContractImageByContractId(contractId: number): Observable<ContractImagesModel> {
    return this.http.get<ContractImagesModel>(`api/ContractImage/contract/${contractId}`).pipe(map((res: any) => res.Payload));
  }
  createImgContract(data: any): Observable<ContractImagesModel>{
    return this.http.post<ContractImagesModel>('api/ContractImage', data).pipe(map((res: any) => res));
  }
  getContractImageByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`api/ContractImage/customer/${customerId}`).pipe(map((res: any) => res.Payload));
  }

}

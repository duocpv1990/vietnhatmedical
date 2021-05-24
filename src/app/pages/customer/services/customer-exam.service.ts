import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { map, mergeMap } from 'rxjs/operators';
import { CustomerExamModel } from "../models/customer-exam.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerExamService extends BaseApiService<CustomerExamModel>{

  constructor(
    public http: HttpClient
  ) {
    super(http, 'api/CustomerExam')
  }

  getExamByCustomerId(customerId: number): Observable<CustomerExamModel> {
    return this.http.get<CustomerExamModel>(`api/CustomerExam/customer/${customerId}`);
  }
  createCustomerExam(data): Observable<CustomerExamModel> {
    console.log(data)
    return this.http.post<CustomerExamModel>(`api/CustomerExam/`, data);
  }

  // createCustomerExam(exam: CustomerExamModel, imgList): Observable<any> {
  //   return this.create(exam).pipe(
  //     mergeMap((res: any) => {
  //       console.log(res);
  //       return res;
  //     }));
  // }

  updateExam(data, customerExamId): Observable<any> {
    return this.update(data, customerExamId).pipe(
      mergeMap((res: any) => {
        console.log(data.ImageStringList);
        return this.http.post('/api/CustomerExamResultImage/BulkPost', {
          CustomerExamId: customerExamId,
          ImageStringList: data.ImageStringList
        });
      }));
    // return 
  }

  // getListImageExam(examId): Observable<any> {
  //   return this.http.get(`api/CustomerExamResultImage/customerExam/${examId}`);
  // }

}

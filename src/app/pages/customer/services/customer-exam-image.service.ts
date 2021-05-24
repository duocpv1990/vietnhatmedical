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
export class CustomerExamImageService extends BaseApiService<CustomerExamModel>{

    constructor(
        public http: HttpClient
    ) {
        super(http, 'api/CustomerExamResultImage');
    }

    createCustomerExam(exam: CustomerExamModel, imgList): Observable<any> {
        return this.create(exam).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return res;
            }));
    }

    updateNewImage(data, customerExamId, imageId): Observable<any> {
        return this.http.delete(`/api/CustomerExamResultImage/${imageId}`).pipe(
            mergeMap((res: any) => {
                return this.http.post('/api/CustomerExamResultImage/BulkPost', {
                    CustomerExamId: customerExamId,
                    ImageStringList: data
                });
            })
        );
    }

    getListImageExam(examId): Observable<any> {
        return this.http.get(`api/CustomerExamResultImage/customerExam/${examId}`);
    }
}

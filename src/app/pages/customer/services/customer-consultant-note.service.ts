import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { map, mergeMap } from 'rxjs/operators';
import { CustomerConsultantNoteModel } from "../models/customer-consultant-note.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerConsultantNoteService extends BaseApiService<CustomerConsultantNoteModel>{

  constructor(
    public http: HttpClient
  ) {
    super(http, 'api/CustomerConsultation')
  }

  getConsultantNote(id: number): Observable<CustomerConsultantNoteModel> {
    return this.http.get<CustomerConsultantNoteModel>(`api/CustomerConsultation/customer/${id}`);
  }

  updateConsultantNote(data, customerConsultationId): Observable<any> {
    return this.update(data, customerConsultationId).pipe(
      mergeMap((res: any) => {
        console.log(data.ImageStringList);
        return this.http.post('api/CustomerConsultationImage', {
          CustomerConsultationId: customerConsultationId,
          ImageUrl: data.ImageUrl
        });
      }));
    // return 
  }

  addImage(data): Observable<any> {
    return this.http.post<any>('api/CustomerConsultationImage', data);
  }

}

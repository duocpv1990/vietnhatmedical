import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

//api back end viet k dung dinh dang => khong extend base api

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http: HttpClient) { }

  uploadForm(data: any): Observable<any> {
    return this.http.post<any>('api/MarketingFileLoad', data, this.httpOptions);
  }

  getListFileUpload(): Observable<any> {
    return this.http.get('api/MarketingFileLoad').pipe(map((res: any) => res.Payload));
  }

  getFileUploadDetail(fileId: number): Observable<any> {
    return this.http.get<any>(`api/MarketingFileUploadCustomer/file/${fileId}`).pipe(map((res: any) => res.Payload));
  }

}

import { Injectable } from '@angular/core';

//base 
import { BaseApiService } from 'src/app/shared/services/base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class EmployeeNoteService extends BaseApiService<any> {
    constructor(
        public http: HttpClient
    ) { super(http, 'api/EmployeeNote') }


    listByToken(): Observable<any> {
        return this.http.get<any>('api/EmployeeNote/username').pipe(map((res : any) => res.Payload));
    }
}
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseApiService } from '../../../shared/services/base.service';
import { DocumentModel } from '../models/document.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentService extends BaseApiService<DocumentModel> {
    constructor(public http: HttpClient) {
        super(http, 'api/DepartmentfolderImage')
    }

    // getDocumentFromId(departmentfolderId: number): Observable<DocumentModel[]> {
    //     return this.http.get<DocumentModel[]>(`api/DepartmentfolderImage/Departmentfolder/${departmentfolderId}`).pipe(map((result: any) => result.Payload));
    // }
    getDocumentFromId(departmentId): Observable<DocumentModel[]> {
        return this.http.get<DocumentModel[]>(`api/DepartmentfolderImage/Departmentfolder/${departmentId}`).pipe(map((result: any) => result.Payload));
    }
    
    
}
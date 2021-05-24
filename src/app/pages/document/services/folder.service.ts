import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseApiService } from '../../../shared/services/base.service';
import { FolderModel } from '../models/folder.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FolderService extends BaseApiService<FolderModel> {
    constructor(public http: HttpClient) {
        super(http, 'api/Departmentfolder')
    }

    getDepartment() {
        return this.http.get('api/CompanyDepartment').pipe(map((res: any) => res.Payload));
    }

    getFolderFromDepartmentId(departmentId): Observable<FolderModel[]> {
        return this.http.get<FolderModel[]>(`api/Departmentfolder/Department/${departmentId}`).pipe(map((res: any) => res.Payload));
    }
    addFolderFromDepartmentId(data) :Observable<FolderModel> {
        return this.http.post<FolderModel>(`/api/Departmentfolder`,data);
    }
    getListFileFromDeparmentfolder(DepartmentfolderId){
        return this.http.get<FolderModel>(`api/DepartmentfolderImage/Departmentfolder/${DepartmentfolderId}`).pipe(map((res:any) => res.Payload));
    }
    delFileFromDeparmentfolder(DepartmentfolderImageId) {
        return this.http.delete<FolderModel>(`/api/DepartmentfolderImage/${DepartmentfolderImageId}`)
    }
    addDocumentFromDepartmentfolder(data):Observable <FolderModel> {
        return this.http.post<FolderModel>(`/api/DepartmentfolderImage`,data);
    }
    // del edit folder
    delFolderFormDepartment(DepartmentfolderId):Observable<FolderModel> {
        return this.http.delete<FolderModel>(`/api/Departmentfolder/${DepartmentfolderId}`);
    }
    //Xem danh sách thư mục trong phòng ban của tôi 
    getFolderMyDepartment(): Observable<FolderModel> {
        return this.http.get<FolderModel>(`/api/Departmentfolder/username`).pipe(map((res:any) => res.Payload));
    }
}
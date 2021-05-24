import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//model
import { PrivilegeModel } from '../models/privilege.model';

//base
import {BaseApiService} from '../../../shared/services/base.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrivilegeService extends BaseApiService<PrivilegeModel>{

  constructor(public http: HttpClient) 
    {super(http, 'api/Privilege') }

    getPrivilegeByRoleId(roleId: number): Observable<PrivilegeModel> {
      return this.http.get<PrivilegeModel>(`api/Privilege/role/${roleId}`).pipe(map((res: any) => res.Payload));
    }
    getUserPrivilege() {
      return this.http.get(`/api/privilege/username`).pipe(map((res: any) => res.Payload));
    }
}


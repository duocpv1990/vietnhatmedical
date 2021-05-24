import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RoleModel } from '../models/role.model';
import { BaseApiService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleService extends BaseApiService<RoleModel>{
    constructor(public http: HttpClient){
        super(http, 'api/role')
    }

    getRoleListByPositionId(positionId: number): Observable<RoleModel> {
        return this.http.get<RoleModel>(`api/role/position/${positionId}`).pipe(map((res: any) => res.Payload));
    }
   
}
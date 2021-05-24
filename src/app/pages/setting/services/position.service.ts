import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PositionModel } from '../models/position.model';
import { BaseApiService } from '../../../shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class PositionService extends BaseApiService<PositionModel>{
    constructor(public http: HttpClient){
        super(http, 'api/position')
    }
   getRoleByPosId(posId) {
       return this.http.get(`api/role/position/${posId}`).pipe(map((res: any) => res.Payload))
   }
}
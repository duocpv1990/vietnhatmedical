import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { map } from 'rxjs/operators';
import { SurgeryServiceModel } from "../models/surgery-service.model";

@Injectable({
    providedIn: 'root'
})

export class SurgeryService extends BaseApiService<SurgeryServiceModel>{

    constructor(
        public http: HttpClient
    ) {
        super(http, 'api/SurgeryService')
    }

    getChildService(parentServiceId: number) {
        return this.http.get(`api/SurgerySubService/service/${parentServiceId}`).pipe(map((res: any) => res.Payload));
    }

    getAllChildService() {
        return this.http.get(`api/SurgerySubService`).pipe(map((res: any) => res.Payload));
    }

}

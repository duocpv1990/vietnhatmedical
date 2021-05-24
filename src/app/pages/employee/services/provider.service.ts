import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//models
import { ProviderModel } from "../models/provider.model";

@Injectable({
    providedIn: 'root'
})
export class ProviderService extends BaseApiService<ProviderModel>{
    constructor(public http: HttpClient) {
        super(http, 'api/provider')
    }

}
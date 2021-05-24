import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ProviderModel } from '../models/provider.model';

import { BaseApiService } from "../../../shared/services/base.service";
import { map } from 'rxjs/internal/operators/map';


@Injectable({
    providedIn: 'root'
})

export class ProviderService extends BaseApiService<ProviderModel> {
    constructor(public http: HttpClient) {
        super(http, 'api/provider')
    }
    getAllProvider() {
        return this.http.get('api/provider').pipe(map( (res: any) => res.Payload))
    }
}
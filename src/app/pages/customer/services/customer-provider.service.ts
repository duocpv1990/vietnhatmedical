import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CustomerProviderModel } from '../models/customer-provider.model';


import { BaseApiService } from '../../../shared/services/base.service';


@Injectable({
    providedIn: 'root'
})

export class ProviderService extends BaseApiService<CustomerProviderModel> {
    constructor(public http: HttpClient) {
        super(http, 'api/provider')
    }
}
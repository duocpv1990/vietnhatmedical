import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseApiService } from "../../../shared/services/base.service";

//model
import { SocialNetworkModel } from "../models/social-network.model";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class SocialNetworkSerivce extends BaseApiService<SocialNetworkModel>{
    constructor(public http: HttpClient
    ) {
        super(http, 'api/CustomerNetwork')
    }


}

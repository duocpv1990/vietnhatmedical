import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseApiService } from "../../../shared/services/base.service";

//model
import { StorageModel } from "../models/storage.model";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class L8StorageService extends BaseApiService<StorageModel>{
    constructor(public http: HttpClient
    ) {
        super(http, 'api/CustomerStorage/L8')
    }


}

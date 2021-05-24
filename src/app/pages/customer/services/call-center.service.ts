import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';

//model
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CallCenterService {

    constructor(
        public http: HttpClient,
        public handle: HttpBackend,
    ) {
        this.http = new HttpClient(handle); //Bỏ qua interceptor
    }

    getCallLogList(rest_token) {
        return this.http.get(`https://api.stringee.com/v1/call/log`, {
            headers: new HttpHeaders({
                'X-STRINGEE-AUTH': rest_token,
                'Content-Type': 'application/json'
            })
        }).pipe(map((res: any) => res.data.calls));
    }

    getStringeeToken(IPPhoneId) {
        return this.http.get(`https://xirvkpffef.execute-api.ap-southeast-1.amazonaws.com/prod/generate-token?userId=${IPPhoneId}`).pipe(map((res: any) => res.body));
    }

    getStringeeRestfulApi() {
        return this.http.get("https://xirvkpffef.execute-api.ap-southeast-1.amazonaws.com/prod/generate-restful-token").pipe(map((res: any) => res.body));
    }

}

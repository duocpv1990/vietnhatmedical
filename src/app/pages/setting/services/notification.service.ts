import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseApiService } from "../../../shared/services/base.service";
import { map } from "rxjs/operators";
import { NotificationModel } from '../models/notification.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class NoticationService extends BaseApiService<NotificationModel> {
    constructor(public http: HttpClient) {
        super(http, 'api/notification');
    }

    getNotiList(): Observable<any> {
        return this.http.get('api/notification?category=null&type=null').pipe(map((ressult: any) => ressult.Payload));
    }

    getNotiDetail(notificationId: number): Observable<any> {
        return this.http.get(`api/notification/detail/${notificationId}`).pipe(map((ressult: any) => ressult.Payload));
    }

}

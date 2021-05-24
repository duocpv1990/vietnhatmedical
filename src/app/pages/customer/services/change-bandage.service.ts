import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseApiService } from "../../../shared/services/base.service";

//model
import { ChangeBandageModel} from "../models/change-bandage.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ChangeBandageService extends BaseApiService<ChangeBandageModel>{
  constructor( public http: HttpClient
    ) {
      super(http, 'api/OperationSchedule')
     }

  getListChangeBandage(id) {
    return this.http.get(`api/OperationSchedule/operation/${id}`).pipe(map((res: any) => res.Payload));
  }
  editChangeBandageSchedule(id, data):Observable<ChangeBandageModel> {
    return this.http.put<ChangeBandageModel>(`api/schedule/${id}`, data);
}
}

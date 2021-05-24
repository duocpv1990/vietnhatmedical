import { BaseApiService } from "src/app/shared/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";

//Model
import { AdvisoryScheduleModel } from "./../models/advisory-schedule.model";

@Injectable({
  providedIn: "root",
})
export class AdvisoryScheduleService {
  constructor(private http: HttpClient) {}

  getOperationSchedule(operationId): Observable<AdvisoryScheduleModel> {
    return this.http.get<AdvisoryScheduleModel>(
      `api/OperationSchedule/operation/${operationId}`
    );
  }

  createAdvisorySchedule(data): Observable<AdvisoryScheduleModel> {
    return this.http.post<AdvisoryScheduleModel>(
      "api/OperationSchedule/",
      data
    );
  }

  editOperationSchedule(id, data): Observable<AdvisoryScheduleModel> {
    return this.http.put<AdvisoryScheduleModel>(`api/schedule/${id}`, data);
  }

  deleteOperationSchedule(id) {
    return this.http.delete(`api/OperationSchedule/${id}`);
  }
}

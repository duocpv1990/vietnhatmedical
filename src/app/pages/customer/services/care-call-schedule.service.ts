import { BaseApiService } from "src/app/shared/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";

//Model
import { CareCallScheduleModel } from '../models/care-call-schedule.model';

@Injectable({
  providedIn: "root",
})
export class CareCallScheduleService {
  constructor(private http: HttpClient) {}

  getOperationSchedule(operationId): Observable<CareCallScheduleModel> {
    return this.http.get<CareCallScheduleModel>(
      `api/OperationSchedule/operation/${operationId}`
    );
  }

  createCareCallSchedule(data): Observable<CareCallScheduleModel> {
    return this.http.post<CareCallScheduleModel>(
      "api/OperationSchedule/",
      data
    );
  }

  editOperationSchedule(id, data): Observable<CareCallScheduleModel> {
    return this.http.put<CareCallScheduleModel>(`api/schedule/${id}`, data);
  }

  deleteOperationSchedule(id) {
    return this.http.delete(`api/OperationSchedule/${id}`);
  }
}

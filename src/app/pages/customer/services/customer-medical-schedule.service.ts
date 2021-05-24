import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

//model
import {MedicalScheduleModel} from '../models/customer-medical-schedule.model';


@Injectable({
    providedIn: 'root'
})

export class MedicalScheduleService {

    constructor(private http: HttpClient) {
    }

    getOperationSchedule(operationId): Observable<MedicalScheduleModel> {
        return this.http.get<MedicalScheduleModel>(`api/OperationSchedule/operation/${operationId}`);
    }

    createMedicalSchedule(data): Observable<MedicalScheduleModel> {
        return this.http.post<MedicalScheduleModel>('api/OperationSchedule/', data);
    }

    editOperationSchedule(id, data):Observable<MedicalScheduleModel> {
        return this.http.put<MedicalScheduleModel>(`api/schedule/${id}`, data);
    }

    deleteOperationSchedule(id) {
        return this.http.delete(`api/OperationSchedule/${id}`);
    }

}
 
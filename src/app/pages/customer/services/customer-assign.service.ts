import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AssignCustomerService {
    constructor(private http: HttpClient){}
   assignCustomerToSale(id, data) {
    return this.http.post(`api/Employee/AssignCustomers/EmployeeId/${id}`, data)
   }
}
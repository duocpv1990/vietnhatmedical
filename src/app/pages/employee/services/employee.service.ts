import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//models
import { EmployeeModel } from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseApiService<EmployeeModel>{
  constructor(public http: HttpClient) {
    super(http, 'api/employee')
  }

  getAllEmployee(page: number) {
    return this.http.get(`api/employee?pageNumber=${page}`).pipe(map((res: any) => res.Payload));
  }

  getLocalEmployee() {
    return this.http.get(`api/employee/username`).pipe(map((res: any) => res.Payload));
  }

  getEmployeeByPage(page: number) {
    return this.http.get(`api/employee?pageNumber=${page}`);
  }

  createEmployee(data: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>('api/account/register', data);
  }

  getPosition() {
    return this.http.get('api/position').pipe(map((res: any) => res.Payload));
  }

  getDepartment() {
    return this.http.get('api/CompanyDepartment').pipe(map((res: any) => res.Payload));
  }
  getCalenderEmployee(employeeId: number) {
    return this.http.get(`api/customerReminder/employee/${employeeId}`).pipe(map((res: any) => res.Payload));
  }

  getAssignedCustomerByEmployeeID(employeeId: number) {
    return this.http.get(`api/customer/employee/${employeeId}`);
  }

  assignCustomerToSale(id, data) {
    return this.http.post(`api/Employee/AssignCustomers/EmployeeId/${id}`, data);
  }
  getAllProvider() {
    return this.http.get('api/provider').pipe(map((res: any) => res.Payload));
  }

  searchByText(keyword: string, page: number) {
    return this.http.get(`api/employee/search?keyword=${keyword}&pageNumber=${page}`).pipe(map((res: any) => res.Payload));
  }

  getScheduleForDoctor(employeeId: number, pageNumber: number) { //3 lich cua kh dang cham soc
    return this.http.get(`api/schedule/employee?employeeid=${employeeId}&page=${pageNumber}`).pipe(map((res: any) => res.Payload));
  }

  // Danh sách 3 lịch của user đang đăng nhập
  getScheduleByToken(fromDate: string, toDate: string) {
    return this.http.get(`api/schedule/username?fromDate=${fromDate}&toDate=${toDate}`).pipe(map((res: any) => res.Payload));
  }
  addEmployeeToBranch(data): Observable<any> {
    return this.http.post<any>('api/CompanyDepartment/BranchAssignment', data);
  }

  getEmployees(pageNumber, pageSize, companyDepartmentId, positionId, gender, status, fullname, phoneNumber, email, city, state, ipPhoneId) {
    return this.http.get(`api/employee?companyDepartmentId=${companyDepartmentId}&positionId=${positionId}&gender=${gender}&status=${status}&fullname=${fullname}&phoneNumber=${phoneNumber}&email=${email}&city=${city}&state=${state}&ipPhoneId=${ipPhoneId}&pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      map((res: any) => res)
    );
  }

}

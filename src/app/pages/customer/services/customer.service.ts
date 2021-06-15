import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { CustomerModel } from "../models/customer.model";
import { CustomerCallLogModel } from "../models/call-log.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseApiService<CustomerModel>{

  constructor(
    public http: HttpClient
  ) {
    super(http, 'api/Customer')
  }

  addCustomer(data): Observable<CustomerModel> {
    return this.http.post<CustomerModel>('api/Account/registerCustomer', data);
  }

  getAllCustomer(pageNumber: number) {
    return this.http.get(`api/customer?pageNumber=${pageNumber}`).pipe(map((res: any) => res));
  }
  getCustomerById(id) {
    return this.http.get(`api/customer/detail/${id}`).pipe(map((res: any) => res.Payload));
  }
  getPotentialLevels() {
    return this.http.get('api/PotentialLevel').pipe(map((res: any) => res.Payload));
  }

  getMyCustomer(fromDate: string, toDate: string, pageIndex, pageSize, potentialLevelId) {
    return this.http.get(`api/customer/username?FromDate=${fromDate}&ToDate=${toDate}&PageNumber=${pageIndex}&PageSize=${pageSize}&PotentialLevelId=${potentialLevelId}`).pipe(map((res: any) => res));
  }

  getPersonInCharge(customerId: number) {
    return this.http.get(`api/Employee/customer/${customerId}`)
  }

  searchByText(keyword, page) { //search theo id, họ tên, email, sđt
    return this.http.get(`api/customer/search?keyword=${keyword}&pageNumber=${page}`).pipe(map((res: any) => res.Payload));
  }

  getAllCountry() { //all quốc gia
    return this.http.get('api/country').pipe(map((res: any) => res.Payload));
  }

  getAllProvinceByCountryId(countryId: number) { //get list tỉnh/thành phố của 1 quốc gia
    return this.http.get(`api/province/country/${countryId}`).pipe(map((res: any) => res.Payload));
  }

  getAllDistrictByProvinceId(provinceId: number) { //Lấy danh sách quận huyện của một tỉnh
    return this.http.get(`api/District/Province/${provinceId}`).pipe(map((res: any) => res.Payload));
  }

  createCallLog(data): Observable<CustomerCallLogModel> {
    return this.http.post<CustomerCallLogModel>('api/call', data);
  }

  getCallLogByCustomerId(customerId: number) {
    return this.http.get(`api/call/customer/${customerId}`).pipe(map((res: any) => res.Payload));
  }
  getCustomerForPotentialLevel(potentialLevel: number, pageNumber: number) {
    return this.http.get(`api/customer/potentialLevel?potentialLevelId=${potentialLevel}&pageNumber=${pageNumber}`);
  }

  getCustomers(
    pageNumber,
    pageSize,
    countryId,
    provinceId,
    districtId,
    surgeryServiceId,
    type,
    genderType,
    lastname,
    phone,
    geographicregionId,
    idCardNumber,
    address,
    email): Observable<any> {
    return this.http.get<any>(`api/customer/search?countryId=${countryId}&provinceId=${provinceId}&districtId=${districtId}&type=${type}&pageNumber=${pageNumber}&pageSize=${pageSize}&genderType=${genderType}&lastname=${lastname}&phone=${phone}&geographicregionId=${geographicregionId}&idCardNumber=${idCardNumber}&address=${address}&email=${email}`).pipe(map((res: any) => res));
  }

}

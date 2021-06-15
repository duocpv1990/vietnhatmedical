
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
//service
import { CustomerService } from '../../services/customer.service';
import { PrivilegeService } from "../../../setting/services/privilege.service";

import { BaseComponent } from "../../../../shared/components/base.component";
import { AssignCustomerComponent } from './dialog/assign-customer/assign-customer.component';
import { UploadCustomerComponent } from "./dialog/upload-customer/upload-customer.component";
import { CallCustomerComponent } from '../customer-detail/dialog/call-customer/call-customer.component';
import { CallCenterService } from '../../services/call-center.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ExportService } from '../../services/export.service';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginatorFiltered: MatPaginator;


  isAccess: any;
  isAccessAdd: any;
  routeIndex = 0;
  unDisplayButtonAssign: Boolean = true;
  assignedCustomerList: any[] = [];
  assignedCustomerIdList: any[] = [];
  isSelectAll: boolean = false;
  count: number;
  accessUser: any;
  position: string;
  pageIndex: number;
  filtedCustomer = [];
  IPPhoneId: string;
  customers = [];
  userCurrentPage = 1;
  countryId = null;
  provinceId = null;
  districtId = null;
  surgeryServiceId = null;
  type = '';
  pageNumber = 1;
  pageSize = 10;
  genderType = '';
  lastname = '';
  phone = '';
  geographicregionId = null;
  idCardNumber = '';
  address = '';
  email = '';
  countries = [];
  queryField: FormControl = new FormControl('');
  fieldType = 1;
  searchString = '';
  potentialLevels = [];
  isShowMyCustomer = false;
  potentialLevelId = null;
  fromDate: string;
  toDate: string;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    public router: Router,
    public privilegeService: PrivilegeService,
    private callCenterService: CallCenterService,
    private jwtHelper: JwtHelperService,
    private exportService: ExportService,
    private activatedRoute: ActivatedRoute
  ) {
    super(router); this.checkToken();

    this.isAccess = this.checkAccess('api/customer,GET');
    this.isAccessAdd = this.checkAccess('api/customer,POST');
  }

  ngOnInit() {
    this.accessUser = JSON.parse(localStorage.getItem('access_user'));
    this.position = this.accessUser.PositionName;
    this.IPPhoneId = this.accessUser.IPPhoneId;
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['pageNumber'] == undefined) {
        this.pageNumber = 1
      } else this.pageNumber = params['pageNumber'];
    });
    this.checkPosition();
    // this.getCustomers();
    this.checkStringeeToken();
    this.getCountries();
    this.getPotentialLevels();
  }

  checkPosition() {
    if (this.position.toLocaleLowerCase() === 'admin') {
      this.isShowMyCustomer = false;
      this.getCustomers();
    } else {
      this.isShowMyCustomer = true;
      this.getMyCustomer();
    }
  }

  getCustomers() {
    this.customerService.getCustomers(this.pageNumber, this.pageSize, this.countryId, this.provinceId, this.districtId, this.surgeryServiceId, this.type, this.genderType, this.lastname, this.phone, this.geographicregionId, this.idCardNumber, this.address, this.email,).subscribe(res => {
      this.customers = res.Payload;
      this.count = res.Count;
    });
  }

  getMyCustomer() {
    this.customerService.getMyCustomer(this.fromDate, this.toDate, this.pageNumber, this.pageSize, this.potentialLevelId).subscribe(res => {
      this.customers = res.Payload;
      this.count = res.Count;
    });
  }

  chooseFieldType(event) {
    this.fieldType = +event.target.value;
  }

  searchByFields() {
    switch (this.fieldType) {
      case 1:
        this.lastname = this.searchString.trim();
        if (this.isShowMyCustomer) {
          this.getMyCustomer()
        } else this.getCustomers();
        break;
      case 2:
        this.phone = this.searchString.trim();
        if (this.isShowMyCustomer) {
          this.getMyCustomer()
        } else this.getCustomers();
        break;
    }

  }

  clearSearchString() {
    this.searchString = '';
    this.lastname = '';
    this.phone = '';
    this.getCustomers();
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    if (this.customers.length !== this.assignedCustomerList.length) {
      this.assignedCustomerList.length = 0;
      for (var i = 0; i < this.customers.length; i++) {
        this.assignedCustomerList.push(this.customers[i]);
      }
      this.unDisplayButtonAssign = false;
    }
    else {
      this.unDisplayButtonAssign = true;
      this.assignedCustomerList.length = 0;
    }
  }


  chooseCustomerAssignToSale(customer: object) {
    if (this.assignedCustomerList.length == 0) {
      this.unDisplayButtonAssign = false;
      this.assignedCustomerList.push(customer);
    }
    else {
      let index = this.assignedCustomerList.findIndex(i => JSON.stringify(i) == JSON.stringify(customer));
      if (this.assignedCustomerList.includes(this.assignedCustomerList[index]) == true) {
        this.assignedCustomerList.splice(index, 1);
        if (this.assignedCustomerList.length == 0) {
          this.unDisplayButtonAssign = true;
        }
      }
      else {
        this.assignedCustomerList.push(customer);
      }
      this.unDisplayButtonAssign = false;
    }
  }

  chooseCustomer(customerId: number) {
    if (this.assignedCustomerIdList.includes(customerId)) {
      let index = this.assignedCustomerIdList.findIndex(i => i == customerId);
      this.assignedCustomerIdList.splice(index, 1);
    }
    else {
      this.assignedCustomerIdList.push(customerId);
    }

  }

  getPotentialLevels() {
    this.customerService.getPotentialLevels().subscribe(res => {
      res.unshift({ "PotentialLevelId": 0, "Name": "Tất cả L" });
      this.potentialLevels = res;
    });
  }

  openEmployeeListDialog() {
    this.dialog.open(AssignCustomerComponent, {
      data: {
        assignedCustomerIdList: this.assignedCustomerIdList,
      }
    }).afterClosed().subscribe(() => {
      this.assignedCustomerList = [];
      this.getCustomers();
    });
  }

  redirectBookingTab(customerId: number) {
    this.router.navigate([`/pages/customer/${customerId}`], { queryParams: { tab: 1 } });
  }

  openUploadFileForm() {
    this.dialog.open(UploadCustomerComponent).afterClosed().subscribe(() => {

    });
  }

  callCustomer(customerId, phone) {
    localStorage.setItem('customer-phone-number', phone);
    setTimeout(() => this.dialog.open(CallCustomerComponent, {
      disableClose: true,
      data: {
        customerId: customerId,
      }
    }).afterClosed().subscribe(() => {
      if (this.isShowMyCustomer) {
        this.getMyCustomer();
      } else this.getCustomers();

    }), 100);
  }

  getStringeeToken() {
    this.callCenterService.getStringeeToken(this.IPPhoneId).subscribe(res => {
      let strigeeToken = res;
      localStorage.setItem("stringee_token", strigeeToken);
    })
  }

  getStringeeRestfulToken() {
    this.callCenterService.getStringeeRestfulApi().subscribe(res => {
      let stringeeRestfulToken = res;
      localStorage.setItem("stringee_restful_token", stringeeRestfulToken);
    });
  }

  checkStringeeToken() {
    let stringee_token = localStorage.getItem("stringee_token");
    let stringee_restful_token = localStorage.getItem("stringee_restful_token");
    if (!stringee_token || this.jwtHelper.isTokenExpired(stringee_token)) {
      this.getStringeeToken();
    }
    if (!stringee_restful_token || this.jwtHelper.isTokenExpired(stringee_restful_token)) {
      this.getStringeeRestfulToken();
    }
  }

  exportExcel() {
    let customerExcel = this.assignedCustomerList.map((item) => {
      return {
        'Họ và tên': item.FullNameAndID,
        'Ngày sinh': item.BirthDay,
        'Giới tính': item.GenderType === 1 ? 'Nam' : 'Nữ',
        'Điện thoại': item.Phone,
        'Level': item.PotentialLevelName
      }
    })
    this.exportService.exportExcel(customerExcel, 'customers');
  }

  pageChange(e: PageEvent): void {
    const paginationQueryParams = {
      page_size: e.pageSize,
      page_index: e.pageIndex,
    };
    this.router.navigate([], { queryParams: paginationQueryParams, queryParamsHandling: 'merge' });
  }

  viewCustomerDetail(id) {
    this.router.navigate([`/pages/customer/${id}`])
  }

  handlePageChange(e) {
    const paginationQueryParams = {
      pageNumber: e
    };
    this.router.navigate([], { queryParams: paginationQueryParams, queryParamsHandling: 'merge' });
    this.pageNumber = e;
    this.pageSize = 10;
    this.getCustomers();
  }

  getCountries() {
    this.customerService.getAllCountry().subscribe(data => {
      this.countries = data;
    });
  }

  filterByCountry(event) {
    this.countryId = event.target.value;
    if (this.isShowMyCustomer) {
      this.getMyCustomer()
    } else this.getCustomers();

  }

  filterByType(event) {
    this.type = event.target.value;
    if (this.isShowMyCustomer) {
      this.getMyCustomer()
    } else this.getCustomers();
  }

  filterByGender(event) {
    this.genderType = event.target.value;
    if (this.isShowMyCustomer) {
      this.getMyCustomer()
    } else this.getCustomers();
  }

}





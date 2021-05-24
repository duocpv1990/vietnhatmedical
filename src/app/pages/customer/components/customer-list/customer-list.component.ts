
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginatorFiltered: MatPaginator;
  isAccess: any;
  isAccessAdd: any;
  routeIndex = 0;
  tab = undefined;
  isFilter: number = 0;
  unDisplayButtonAssign: Boolean = true;
  assignedCustomerList: any[] = [];
  assignedCustomerIdList: any[] = [];
  isSelectAll: boolean = false;
  customerList: any;
  myCustomerList = [];
  dataSource: any;
  isShowMyCustomer = false;
  searchString: string;
  pageNumber: string;
  count: number;
  pageCount: number;
  pageArray = [];
  recordRespond: number = 50;
  extraSpare: number;
  selected = 1;
  isLast: false;
  lastVar: number;
  potentialLevelId = 0;
  level = [];
  userCurrentPage: number;
  historyPage: number;

  fromDate: string;
  toDate: string;
  customerListPotential: any;
  levelFilter: number;
  displayedColumns = [
    'choose',
    'Ngày chia contact',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Nguồn',
    'Level',
    'Sale phụ trách',
    'Dịch vụ',
    'Ngày gọi',
    'Ghi chú',
    'Lịch hẹn',
    'Gọi điện'
  ];

  userPrivilegeList: any;
  privilegeList = [];
  accessUser: any;
  position: string;
  pageIndex: number;
  filtedCustomer = [];
  IPPhoneId: string;

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
      this.fromDate = params['fromDate'];
      this.toDate = params['toDate'];
      this.pageIndex = params['page_index'];
      if (params['page_index'] == undefined || params['page_index'] == 0) {
        this.userCurrentPage = 1
      } else this.userCurrentPage = params['page_index'];

    });
    this.checkPosition();
    this.getPrivilegeList();
    this.getLevelValue();
    this.viewCustomer();
    this.checkStringeeToken();
  }

  checkPosition() {

    if (this.position.toLocaleLowerCase() === 'cskh') {
      this.potentialLevelId = 17;
      setTimeout(() => {
        this.getCustomerForLevel(17, 1);
      }, 500)
    }
    if (this.position.toLocaleLowerCase() === 'admin') {
      this.isShowMyCustomer = false;
    } else this.isShowMyCustomer = true;
  }

  getPrivilegeList() {
    this.privilegeService.getUserPrivilege().subscribe(data => {
      this.userPrivilegeList = data;
      this.userPrivilegeList.forEach(e => {
        this.privilegeList.push(e.APIURL + ',' + e.Method);
      });
      localStorage.setItem('access_privilegeList', JSON.stringify(this.privilegeList));
    });
  }

  ngOnDestroy() {
    this.isShowMyCustomer = true;
  }


  viewCustomer() {
    if (this.isShowMyCustomer === true) {
      this.potentialLevelId = +localStorage.getItem("Level");
      if (this.potentialLevelId == null) {
        this.potentialLevelId = 0;
        this.getMyCustomer(null);
      } else this.getMyCustomer(this.potentialLevelId);

    } else {
      this.historyPage = +localStorage.getItem('currentPage');
      if (this.historyPage) {
        let level = +localStorage.getItem("Level");
        this.getCustomerForLevel(level, this.historyPage);
      } else this.getCustomerForLevel(0, 1)

    }
  }


  getMyCustomer(event) {
    localStorage.setItem('Level', event);
    if (event == 0) {
      this.potentialLevelId = event;
      this.customerService.getMyCustomer(this.fromDate, this.toDate, this.userCurrentPage, 10, null).subscribe(res => {
        this.filtedCustomer = res.Payload;
        this.count = res.Count;
        this.customerList = this.filtedCustomer;
      });
    } else {
      this.potentialLevelId = event;
      this.customerService.getMyCustomer(this.fromDate, this.toDate, this.userCurrentPage, 10, this.potentialLevelId).subscribe(res => {
        this.filtedCustomer = res.Payload;
        this.count = res.Count;
        this.customerList = this.filtedCustomer;
      });
    }
    const paginationQueryParams = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      page_index: this.userCurrentPage
    };
    this.router.navigate([], { queryParams: paginationQueryParams, queryParamsHandling: 'merge' });

  }


  getCustomerForLevel(event: any, pageNumber: number) {
    this.potentialLevelId = +event;
    localStorage.setItem('Level', event);
    this.historyPage = +JSON.parse(localStorage.getItem('currentPage'));
    this.customerService.getCustomerForPotentialLevel(event, pageNumber).subscribe(res => {
      this.customerListPotential = JSON.parse(JSON.stringify(res)).Payload;
      this.pageArray = [];
      this.count = JSON.parse(JSON.stringify(res)).Count;
      if (event != 0) {
        this.levelFilter = +JSON.parse(localStorage.getItem('Level'));
        this.pageCount = Math.ceil(this.count / this.recordRespond);
        for (let i = 0; i < this.pageCount; i++) {
          this.pageArray.push(i + 1);
        }

        this.lastVar = this.recordRespond * (this.pageArray.length - 1) + 1;
        this.dataSource = new MatTableDataSource(this.customerListPotential);
        this.dataSource.paginator = this.paginator;
      } else {
        this.getListCustomer(pageNumber);
      }
    });
  }

  getListCustomer(page) {
    this.selected = page;
    localStorage.setItem('currentPage', page);
    this.customerService.getAllCustomer(page).subscribe(data => {
      console.log('DS khach hang: ', data);
      this.pageArray = [];
      this.customerList = data.Payload;
      this.dataSource = new MatTableDataSource(this.customerList);
      this.dataSource.paginator = this.paginator;
      // console.log('DS khach hang: ', this.customerList);
      this.count = data.Count;
      this.pageCount = Math.ceil(this.count / this.recordRespond);
      for (let i = 0; i < this.pageCount; i++) {
        this.pageArray.push(i + 1);
      }
      this.lastVar = this.recordRespond * (this.pageArray.length - 1) + 1;


    });
  }

  searchByText() {
    this.searchString = this.searchString.trim();
    this.customerService.searchByText(this.searchString, this.selected).subscribe(res => {
      this.isShowMyCustomer = false;
      this.dataSource = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    if (this.customerList.length !== this.assignedCustomerList.length) {
      this.assignedCustomerList.length = 0;
      for (var i = 0; i < this.customerList.length; i++) {
        this.assignedCustomerList.push(this.customerList[i]);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEmployeeListDialog() {
    this.dialog.open(AssignCustomerComponent, {
      data: {
        assignedCustomerIdList: this.assignedCustomerIdList,
      }
    }).afterClosed().subscribe(() => {
      this.assignedCustomerList = [];
      if (this.isAccess) {
        this.getListCustomer(1);
      } else {
        this.getMyCustomer(null);
      }
    });
  }

  redirectBookingTab(customerId: number) {
    this.router.navigate([`/pages/customer/${customerId}`], { queryParams: { tab: 1 } });
  }

  getLevelValue() {
    this.customerService.getLevelValue().subscribe(res => {
      res.unshift({ "PotentialLevelId": 0, "Name": "Tất cả L" });
      this.level = res;
    });
  }




  openUploadFileForm() {
    this.dialog.open(UploadCustomerComponent).afterClosed().subscribe(() => {
      this.isShowMyCustomer = true;
      this.viewCustomer();
    });
  }

  callCustomer(customerId, phone) {
    localStorage.setItem('customer-phone-number', phone);
    setTimeout(() => this.dialog.open(CallCustomerComponent, {
      disableClose: true,
      data: {
        customerId: customerId,
      }
    }).afterClosed().subscribe(() => this.getMyCustomer(this.potentialLevelId)), 100);
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
    this.userCurrentPage = e;
    this.getMyCustomer(this.potentialLevelId);
  }
}





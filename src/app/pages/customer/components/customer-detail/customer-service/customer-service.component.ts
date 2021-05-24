import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";

//module
import { ActivatedRoute } from '@angular/router';

//service
import { OperationService } from "../../../services/operation.service";
import { CustomerService } from "../../../services/customer.service";
import { CustomerContractService } from "../../../services/customer-contract.service";
import { AlertService } from 'src/app/shared/services/alert.service';

//model
import { OperationModel } from 'src/app/pages/customer/models/operation.model';

import { BaseComponent } from "../../../../../shared/components/base.component";

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent extends BaseComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    public customerService: CustomerService,
    public customerContract: CustomerContractService,
    public ActivatedRoute: ActivatedRoute,
    public operationSvc: OperationService,
    private alertService: AlertService,
    public router: Router
  ) {
    super(router); this.checkToken();
    this.isAccess = this.checkAccess('api/customer,GET');
  }
  isAccess: any;
  customer: object;
  customerId: number;
  sergeryCaculation: any;
  parentServices: any;
  operations: any;
  listContract: any;
  dataSource: any;
  service: any
  isShow: boolean = true;
  isShowCreate: boolean = false;

  displayedColumns = [
    'Tên đơn hàng',
    'Giá trị',
    'Đã thu',
    'Ngày thực hiện',
    'Dịch vụ',
    'Đánh giá'
  ];

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getOperation();
    this.getCustomerProfile();
    this.getContract();
  }

  getCustomerProfile() {
    this.customerService.get(this.customerId).subscribe(data => {
      this.customer = data;
      localStorage.setItem('currentCustomer', JSON.stringify(this.customer));
    });
  }

  getOperation() {
    this.operationSvc.getOperationInfoByCustomerId(this.customerId).subscribe(data => {
      this.operations = data.reverse();

      this.dataSource = new MatTableDataSource(this.operations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getContract() {
    this.customerContract.getContractByCustomerId(this.customerId).subscribe(data => {
      this.listContract = data;
    });
  }

  updateStatus(operationId: number, status: number) {
    let newStatus: number;
    status == 1 ? newStatus = 2 : newStatus = 1;
    let operation = new OperationModel();
    operation.Status = newStatus;
    this.operationSvc.update(operation, operationId).subscribe(res => {
      this.getOperation();
    }, null, () => {
      this.alertService.changeMessage({
        color: 'green',
        text: 'Cập nhật trạng thái thành công'
      });
    });
  }

  showServiceDetail(service: any) {
    this.service = service;
    this.isShow = !this.isShow;
  }

  showCreatePage() {
    this.isShowCreate = !this.isShowCreate;
  }

  receiveMessage(event: boolean) {
    // console.log(event); //event false được gửi từ component confirm, có thể gửi hàm, hay bất cứ data nào khác
    this.isShowCreate = event;  //nhận message, gọi lại hàm getHistory để reload trang
    this.getOperation();
  }

}

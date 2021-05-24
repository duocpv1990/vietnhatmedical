import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

//service
import { CustomerReminderService } from '../../../services/customer-reminder.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../../../shared/services/alert.service';

//model
import { CustomerRemindersModel } from '../../../models/customer-reminder.model';

import { BaseComponent } from "../../../../../shared/components/base.component";

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.scss']
})

export class CustomerHistoryComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private customerReminderService: CustomerReminderService,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService,
    public router: Router
  ) {
    super(router); this.checkToken();
    this.isAccess = this.checkAccess('api/customerreminder,GET');
  }

  isAccess: any;

  displayedColumns = [
    'Ngày',
    'Giờ',
    'Loại lịch',
    'Liên hệ',
    'Sale phụ trách',
    'Ghi chú',
    'Trạng thái'
  ];

  customerId: number;
  historyList: any;
  dataSource: any;
  status: number;
  isShow: boolean = false;

  ngOnInit(): void {
    this.getHistory();
  }

  setDataForDetail(element) {
    localStorage.setItem('customer-history', JSON.stringify(element));
    this.isShow = !this.isShow;
  }

  updateStatus(status: number, customerHistoryId) {
    this.status = status;
    let model = new CustomerRemindersModel();
    model.Status = this.status;
    this.customerReminderService.update(model, customerHistoryId).subscribe(res => {
      this.getHistory();
    }, null, () => {
      this.alertService.changeMessage({
        color: 'green',
        text: 'Cập nhật trạng thái thành công'
      });
    });
  }

  getHistory() {
    this.activeRoute.paramMap.subscribe(param => this.customerId = +param.get('customerId'));
    this.customerReminderService.getCustomerReminderById(this.customerId).subscribe(res => {
      this.historyList = res;
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.historyList)));
      this.dataSource.paginator = this.paginator;
    });
  }

  receiveMessage(event: boolean) {
    // console.log(event); //event false được gửi từ component confirm, có thể gửi hàm, hay bất cứ data nào khác
    this.isShow = event;  //nhận message, gọi lại hàm getHistory để reload trang
    this.getHistory();
  }
}

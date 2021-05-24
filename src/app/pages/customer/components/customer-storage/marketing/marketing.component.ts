import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MarketingStorageService } from '../../../services/storage-marketing.service';
import { SalesStorageService } from '../../../services/storage-sales.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { StorageModel } from '../../../models/storage.model';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  customers: any;
  dataSource: any;
  unDisplayButtonAssign: Boolean = true;
  selectedCustomers: any[] = [];
  assignedCustomerIdList: any[] = [];
  isSelectAll: boolean = false;
  amountCustomer: any;
  customerIdArr: any;
  displayedColumns = [
    'choose',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Nguồn',
    'Sale phụ trách',
    'Tỉnh thành',
    'Ghi chú'
  ];

  constructor(
    private marketingStorageService: MarketingStorageService,
    private salesStorageService: SalesStorageService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCustomerInMarketingStorage();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCustomerInMarketingStorage() {
    this.marketingStorageService.list().subscribe(res => {
      this.customers = res;
      this.customerIdArr = res.map(customer => customer.CustomerID);
      console.log('DS KH trong kho marketing', this.customers);
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
    });
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    if (this.customers.length !== this.assignedCustomerIdList.length) {
      this.selectedCustomers.length = 0;
      for (var i = 0; i < this.customers.length; i++) {
        this.assignedCustomerIdList.push(this.customers[i].CustomerID);
      }
      this.unDisplayButtonAssign = false;
      console.log(this.assignedCustomerIdList);

    }
    else {
      this.unDisplayButtonAssign = true;
      this.assignedCustomerIdList.length = 0;
      console.log(this.assignedCustomerIdList);
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
    console.log(this.assignedCustomerIdList);
  }

  storageUpdate() {
    let storage = new StorageModel();
    storage.CustomerIdList = this.assignedCustomerIdList;
    storage.StorageId = 2; //StorageId của sales
    this.salesStorageService.storageUpdate(storage).subscribe(res => {
      this.assignedCustomerIdList.length = 0;
      this.getCustomerInMarketingStorage();
      this.alertService.changeMessage({
        color: 'green',
        text: `Đã chuyển thành công`
      });
    })
  }

  moveToSale() {
    if (!isNaN(this.amountCustomer) && this.amountCustomer > 0 && this.amountCustomer <= 50) {
      let newCustomerIdList = this.customerIdArr.slice(0, this.amountCustomer);
      let storage = new StorageModel();
      storage.CustomerIdList = newCustomerIdList;
      storage.StorageId = 2; //StorageId của marketing
      this.salesStorageService.storageUpdate(storage).subscribe(res => {
        newCustomerIdList = [];
        this.assignedCustomerIdList = [];
        this.getCustomerInMarketingStorage();
        this.alertService.changeMessage({
          color: 'green',
          text: `Đã chuyển thành công`
        });
      });
    }
    if (isNaN(this.amountCustomer) || this.amountCustomer > 50) this.amountCustomer = 0;
  }
}

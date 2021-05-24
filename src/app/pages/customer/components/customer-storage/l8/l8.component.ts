import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


import { L8StorageService } from '../../../services/storage-l8.service';

@Component({
  selector: 'app-l8',
  templateUrl: './l8.component.html',
  styleUrls: ['./l8.component.scss']
})
export class L8Component implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  customers: any;
  dataSource: any;
  unDisplayButtonAssign: Boolean = true;
  assignedCustomerList: any[] = [];
  assignedCustomerIdList: any[] = [];
  isSelectAll: boolean = false;
  displayedColumns = [
    // 'choose',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Nguồn',
    'Sale phụ trách',
    'Tỉnh thành',
    'Ghi chú'
  ];


  constructor(
    private l8StorageService: L8StorageService
  ) { }

  ngOnInit(): void {
    this.getCustomerInL8Storage();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getCustomerInL8Storage() {
    this.l8StorageService.list().subscribe(res => {
      this.customers = res;
      console.log('DS KH trong kho marketing', this.customers);
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
    });
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


}

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { EmployeeService } from '../../../../services/employee.service';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { CustomerService } from '../../../../../customer/services/customer.service';

@Component({
  selector: 'app-assign-customer',
  templateUrl: './assign-customer.component.html',
  styleUrls: ['./assign-customer.component.scss']
})
export class AssignCustomerComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService,
    public alertService: AlertService,
    public router: Router,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<AssignCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  unDisplayButtonAssign: Boolean = true;
  assignedCustomerList: any[] = [];
  isSelectAll: boolean = false;
  assignedCustomerIdList: any[] = [];
  customerList: any;
  dataSource: any;
  resultsLength: any;

  displayedColumns: string[] = [
    'choose',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Nguồn',
    'Level',
    'Sale phụ trách',
    'Dịch vụ',
    'Hợp đồng',
    'Ghi chú',
  ];

  ngOnInit(): void {
    setTimeout(() => this.getCustomerList(), 100);
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    if (this.assignedCustomerIdList.length !== this.customerList.length) {
      this.assignedCustomerIdList.length = 0;
      for (let i = 0; i < this.customerList.length; i++) {
        this.assignedCustomerIdList.push(this.customerList[i].CustomerID);
      }
    }

    else {
      this.assignedCustomerIdList.length = 0;
    }

    console.log(this.assignedCustomerIdList);
  }

  chooseCustomer(customerID) {
    if (this.assignedCustomerIdList.includes(customerID)) {
      let index = this.assignedCustomerIdList.findIndex(i => i == customerID);
      this.assignedCustomerIdList.splice(index, 1);
    }
    else {
      this.assignedCustomerIdList.push(customerID);
    }
    console.log(this.assignedCustomerIdList);
  }

  assignCustomerToSale() {
    localStorage.setItem('assignedCustomerList', JSON.stringify(this.assignedCustomerList));
  }

  assignCustomer() {
    this.employeeService.assignCustomerToSale(this.data.employeeId, this.assignedCustomerIdList).subscribe(res => {
      localStorage.removeItem('assignedCustomerList');
      setTimeout(() => {
        this.alertService.changeMessage({
          color: 'green',
          text: `Giao KH thành công!`
        });
      }, 700);
      this.dialogRef.close();
    })
    
  }

  getCustomerList() {
    this.customerService.getAllCustomer(1).subscribe(data => {
      this.customerList = JSON.parse(JSON.stringify(data)).Payload;
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.customerList)));
      this.dataSource.paginator = this.paginator;
      
      console.log('DS KH', this.customerList);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

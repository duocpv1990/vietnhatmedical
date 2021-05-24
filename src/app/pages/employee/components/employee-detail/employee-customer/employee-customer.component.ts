import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { EmployeeService } from '../../../services/employee.service';

import { AssignCustomerComponent } from '../dialog/assign-customer/assign-customer.component';

@Component({
  selector: 'app-employee-customer',
  templateUrl: './employee-customer.component.html',
  styleUrls: ['./employee-customer.component.scss']
})
export class EmployeeCustomerComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) { }

  employeeId: number;
  customersOfSale: any;
  customerList: any;
  dataSource: any;
  displayedColumns: string[] = [
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Nguồn',
    'Level',
    'Ghi chú',
    'Lịch hẹn'
  ];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.employeeId = +params.get('employeeId'));
    this.getCustomerByEmployeeId();
  }

  getCustomerByEmployeeId() {
    this.employeeService.getAssignedCustomerByEmployeeID(this.employeeId).subscribe(data => {
      this.customersOfSale = JSON.parse(JSON.stringify(data)).Payload.reverse();
      console.log('KH cua NV',this.customersOfSale);
      this.dataSource = new MatTableDataSource(this.customersOfSale);
      this.dataSource.paginator = this.paginator;
    });
  }

  redirectHistoryTab(customerId: number){
    this.router.navigate([`/pages/customer/${customerId}`], { queryParams: { tab: 3}});
  }

  openAssignCustomer() {
    this.dialog.open(AssignCustomerComponent, {
      data: {
        employeeId: this.employeeId
      }
    }).afterClosed().subscribe(() => {
      this.getCustomerByEmployeeId();
    });
  }

}

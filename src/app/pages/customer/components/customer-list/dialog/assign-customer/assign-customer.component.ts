import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//service
import { EmployeeService } from '../../../../../employee/services/employee.service';
import { AssignCustomerService } from '../../../../services/customer-assign.service';
import { AlertService } from '../../../../../../shared/services/alert.service';

@Component({
  selector: 'app-assign-customer',
  templateUrl: './assign-customer.component.html',
  styleUrls: ['./assign-customer.component.scss']
})
export class AssignCustomerComponent implements OnInit, AfterViewInit {

  employees = [];
  pageNumber = 1;
  pageSize = 10;
  companyDepartmentId = null;
  positionId = null;
  gender = null;
  status = null;
  fullname = '';
  phoneNumber = '';
  email = '';
  city = '';
  state = ''
  ipPhoneId = '';
  employeeId: number;
  employeeList = [];
  selectedEmployeeId = [];
  customerIdList = [];
  count: number;


  constructor(
    private employeeService: EmployeeService,
    private assignCustomerSvc: AssignCustomerService,
    public alertService: AlertService,
    public router: Router,
    public dialogRef: MatDialogRef<AssignCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  ngOnInit(): void {
    setTimeout(() => {
      this.getEmployees();
    }, 0)

  }

  ngAfterViewInit() {

    setTimeout(() => this.customerIdList = this.data.assignedCustomerIdList, 0);
  }

  getEmployees() {
    this.employeeService.getEmployees(
      this.pageNumber,
      this.pageSize,
      this.companyDepartmentId,
      this.positionId,
      this.gender,
      this.status,
      this.fullname,
      this.phoneNumber,
      this.email,
      this.city,
      this.state,
      this.ipPhoneId
    ).subscribe(res => {
      this.employees = res.Payload;
      this.count = res.Count;
    });
  }


  selectedEmployee(employeeId: number) {
    this.selectedEmployeeId.length = 0;
    this.selectedEmployeeId.push(employeeId);
    console.log('NV duoc chon', this.selectedEmployeeId);
  }

  assignCustomerToSale() {
    this.assignCustomerSvc.assignCustomerToSale(this.selectedEmployeeId[0], this.customerIdList).subscribe(res => {
      this.dialogRef.close();
      setTimeout(() => {
        this.alertService.changeMessage({
          color: 'green',
          text: `Giao KH thành công!`
        });
      }, 300);
    });
  }

  handlePageChange(e) {
    this.pageNumber = e;
    this.pageSize = 10;
    this.getEmployees();
  }

}

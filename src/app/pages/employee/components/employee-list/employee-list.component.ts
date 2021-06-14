import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

//service
import { EmployeeService } from '../../services/employee.service';

import { BaseComponent } from "../../../../shared/components/base.component";


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends BaseComponent implements OnInit {
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
  departments = [];
  fieldType: number;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    public router: Router
  ) {
    super(router);
    this.checkToken();
    this.isAccess = this.checkAccess('api/employee,GET');
  }
  isAccess: any;
  employeeList: any;
  displayedData: any;
  filterResult: any;
  positions: any;
  searchString: string;
  count: number;
  pageCount: number;
  pageArray = [];
  recordRespond: number = 50;
  selected: number = 1;
  lastVar: number;
  dataSource: any;

  displayedColumns = [
    'Mã NV',
    'Họ tên',
    'Điện thoại',
    'Email',
    'Chức vụ',
    'Phòng ban'
  ];

  ngOnInit(): void {
    this.getEmployees();
    this.getAllPosition();
    this.getDeparment();
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
      this.ipPhoneId).subscribe(
        (res) => {
          this.employees = res.Payload;
          console.log('employee', this.employees);
        }
      )
  }

  chooseFieldType(event) {
    this.fieldType = +event.target.value;
  }

  searchByFields() {
    switch (this.fieldType) {
      case 1:
        this.fullname = this.searchString.trim();
        this.getEmployees();
        break;
      case 2:
        this.phoneNumber = this.searchString.trim();
        this.getEmployees();
        break;
      case 3:
        this.email = this.searchString.trim();
        this.getEmployees();
    }

  }

  viewEmployeeDetail(item) {
    this.router.navigate([`pages/employee/${item}`])
  }

  getAllPosition() {
    this.employeeService.getPosition().subscribe(data => {
      this.positions = data;
    });
  }

  getDeparment() {
    this.employeeService.getDepartment().subscribe(res => {
      this.departments = res;
    });
  }

  filterByPosition(event) {
    this.positionId = event.target.value;
    this.getEmployees();
  }

  filterByGender(event) {
    this.gender = event.target.value;
    this.getEmployees();
  }

  filterByDepartment(event) {
    this.companyDepartmentId = event.target.value;
    this.getEmployees();
  }

  searchEmployee() {
    this.employeeService.searchByText(this.searchString, 1).subscribe(data => {
      this.dataSource = data;
    });
  }

  handlePageChange(e) {
    this.pageNumber = e;
    this.pageSize = 10;
    this.getEmployees();
  }

}

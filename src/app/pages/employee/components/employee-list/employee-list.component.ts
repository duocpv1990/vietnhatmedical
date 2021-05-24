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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    public router: Router
  ) { super(router); 
    this.checkToken();
    this.isAccess = this.checkAccess('api/employee,GET');
  }
  isAccess: any;
  employeeList: any;
  displayedData: any;
  filterResult: any;
  positionId: number = 0;
  positions: any;
  searchString: string;
  pageNumber: string;
  count: number;
  pageCount : number;
  pageArray = [];
  recordRespond: number = 50;
  selected: number = 1;
  lastVar: number;
  dataSource: any;

  displayedColumns =[
    'Mã NV',
    'Họ tên',
    'Điện thoại',
    'Email',
    'Chức vụ',
    'Phòng ban'
  ];

  ngOnInit(): void {
    this.getEmployeeList(1);
    this.getAllPosition();
    console.log(this.isAccess);
  }

  // getEmployeeList() {
  //   this.employeeService.getAllEmployee(1).subscribe(data => {
  //     this.employeeList = data;
  //     this.displayedData = this.employeeList;
  //     this.dataSource = new MatTableDataSource(this.employeeList);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  getEmployeeList(page: number) {
    // this.searchString = '';
    this.employeeService.getEmployeeByPage(page).subscribe(data => {
      console.log('DS nhan vien', data);
      this.pageArray = [];
      this.employeeList = JSON.parse(JSON.stringify(data)).Payload;
      this.count = JSON.parse(JSON.stringify(data)).Count;
      this.pageCount = Math.ceil(this.count/this.recordRespond);  
      for(let i = 0; i<this.pageCount; i++) {
        this.pageArray.push(i+1);
      }
      this.lastVar = this.recordRespond * (this.pageArray.length -1) + 1;
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.employeeList)));
      this.dataSource.paginator = this.paginator;
    });
  }

  filterByPosition(positionId: number) {
    if (positionId != 0) {
      this.filterResult = this.employeeList.filter(i => +i.ListPositionId[0] == positionId);
      this.dataSource = this.filterResult;
    } else {
      this.dataSource = this.employeeList;
    }
  }

  getAllPosition() {
    this.employeeService.getPosition().subscribe(data => {
      this.positions = data;
      console.log('DS chức vụ',data);
    });
  }

  searchEmployee(){
    this.employeeService.searchByText(this.searchString, 1).subscribe(data =>{
      console.log(data);
      this.dataSource = data;
    });
  }

}

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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService,
    private assignCustomerSvc: AssignCustomerService,
    public alertService: AlertService,
    public router: Router,
    public dialogRef: MatDialogRef<AssignCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  employeeId: number;
  employeeList: any;
  dataSource: any;
  selectedEmployeeId: any[] = [];
  customerIdList: any;

  displayedColumns = [
    'Mã NV',
    'Họ tên',
    'Điện thoại',
    'Phòng ban'
  ];

  ngOnInit(): void {
    setTimeout(() => this.getEmployeeList(), 30);
  }

  ngAfterViewInit() {
    setTimeout(() => this.customerIdList = this.data.assignedCustomerIdList, 0);
  }

  getEmployeeList() {
    this.employeeService.getAllEmployee(1).subscribe(data => {
      this.employeeList = data;
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.employeeList)));
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      // this.router.navigate([`/pages/employee/${this.selectedEmployeeId[0]}`], { queryParams: { tab: 1} });
      
    });
  }

}

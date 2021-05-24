import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//service
import { CustomerService } from "../../../services/customer.service";

//component

@Component({
  selector: 'app-person-in-charge',
  templateUrl: './person-in-charge.component.html',
  styleUrls: ['./person-in-charge.component.scss']
})
export class PersonInChargeComponent implements OnInit {

  constructor(
    public customerService: CustomerService,
    public activatedRoute: ActivatedRoute
  ) { }

  customerId: number;
  dataSource: any;
  isShowMyCustomer: boolean = false;

  displayedColumns = [
    'Mã NV',
    'Họ và tên',
    'Điện thoại',
    'Chức vụ',
    'Phòng ban'
  ];

  backendDisplayColumns = [
    'EmployeeId',
    'FullName',
    'Phone',
    'TypeDescription',
    'DepartmentName',
  ];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getPersonInCharge();
  }

  getPersonInCharge() {
    this.customerService.getPersonInCharge(this.customerId).subscribe(data => {
      this.dataSource = JSON.parse(JSON.stringify(data)).Payload;
      console.log('phu trach list', this.dataSource)
    })
  }

}

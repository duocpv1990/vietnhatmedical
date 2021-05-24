import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


import { CustomerService } from 'src/app/pages/customer/services/customer.service';

@Component({
  selector: 'app-call-log-customer-care',
  templateUrl: './call-log-customer-care.component.html',
  styleUrls: ['./call-log-customer-care.component.scss']
})
export class CallLogCustomerCareComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  customerId: number;
  callLogList: any;
  rating = 5;

  dataSource: any;
  displayedColumns = [
    'Ngày',
    'Giờ',
    'Đơn hàng',
    // 'Thời lượng',
    'File ghi âm',
    'Sale phụ trách',
    'Ghi chú',
    'Level'
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getCallLogByCustomerId();
  }

  getCallLogByCustomerId() {
    this.customerService.getCallLogByCustomerId(this.customerId).subscribe(data => {

      this.callLogList = data.reverse();
      this.dataSource = new MatTableDataSource(this.callLogList);
      this.dataSource.paginator = this.paginator;
    });
  }





}

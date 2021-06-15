import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from 'src/app/pages/customer/services/customer.service';

@Component({
  selector: 'app-call-log-sale',
  templateUrl: './call-log-sale.component.html',
  styleUrls: ['./call-log-sale.component.scss']
})
export class CallLogSaleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  customerId: number;
  callLogList: any;
  selectedIndex: number;

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
  pageNumber = 1;
  pageSize = 10;

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

  handlePageChange(e) {
    this.pageNumber = e;
    this.pageSize = 10;
    this.getCallLogByCustomerId();
  }

}

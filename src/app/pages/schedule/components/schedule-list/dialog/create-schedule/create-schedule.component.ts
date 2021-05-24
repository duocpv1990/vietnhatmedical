import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerService } from 'src/app/pages/customer/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  customerList: any;
  searchString: string;
  dataSource: any;
  displayedColumns: string[] = [
    'Mã KH',
    'Họ tên',
    'Điện thoại'
  ];

  ngOnInit(): void {    
    setTimeout(() => this.getAllCustomer());
  }

  getAllCustomer() {
    this.customerService.getAllCustomer(1).subscribe(data => {
      this.customerList = JSON.parse(JSON.stringify(data)).Payload;
      this.dataSource = new MatTableDataSource(this.customerList);
      this.dataSource.paginator = this.paginator;
      console.log('DS khach hang',this.customerList);
    });
  }
  
  searchCustomer(){
    this.customerService.searchByText(this.searchString, 1).subscribe(res => {
      console.log(res);
      this.dataSource = res;
    });
  }

  redirectCustomerDetail(customerId: number){
    if (this.data.type == 0) {
       this.router.navigate([`/pages/customer/${customerId}`], { queryParams: { tab: 1}});
    } else {
      this.router.navigate([`/pages/customer/${customerId}`], { queryParams: { tab: 2}});
    }
    this.dialogRef.close();
  }

}

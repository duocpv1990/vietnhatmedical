import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

//service
import { CustomerService } from "../../../../services/customer.service";
import { AlertService } from "../../../../../../shared/services/alert.service";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss']
})
export class DeleteCustomerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteCustomer() {
    this.customerService.delete(this.data.customerId).subscribe(() => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Xóa khách hàng thành công`
      });
      this.closeDialog();
      this.router.navigateByUrl('/pages/customer');
    });

  }

  closeDialog() {
    this.dialogRef.close();
  }

}

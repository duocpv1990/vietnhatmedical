import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

//service
import { CustomerContractService } from "../../../../services/customer-contract.service";
import { AlertService } from "../../../../../../shared/services/alert.service";

@Component({
  selector: 'app-delete-customer-contract',
  templateUrl: './delete-customer-contract.component.html',
  styleUrls: ['./delete-customer-contract.component.scss']
})
export class DeleteCustomerContractComponent implements OnInit {

  constructor(
    private customerContractService: CustomerContractService,
    public dialogRef: MatDialogRef<DeleteCustomerContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteCustomerContract(){
    this.customerContractService.delete(this.data.contractId).subscribe(() => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Xóa đơn hàng thành công`
      });
    });
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}

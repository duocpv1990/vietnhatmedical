import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { CustomerContractPaymentModel } from "../../../../models/customer-contract-payment.model";

//service
import { CustomerContractPaymentService } from "../../../../services/customer-contract-payment.service";
import { AlertService } from "../../../../../../shared/services/alert.service";

@Component({
  selector: 'app-create-contract-payment',
  templateUrl: './create-contract-payment.component.html',
  styleUrls: ['./create-contract-payment.component.scss']
})
export class CreateContractPaymentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateContractPaymentComponent>,
    private customerContractPaymentService: CustomerContractPaymentService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  amount: any;
  paymentDate: any = Date.now() + 86400 * 1000;
  contractPaymentImageString: any;
  title: string;

  ngOnInit(): void {
    this.getDate();
  }
  getDate() {
    let date = new Date(this.paymentDate),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.paymentDate = [year, month, day].join('-');
  }
  processFileContractPaymentImage(files: File) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.contractPaymentImageString = reader.result;
    };
  }

  createContractPayment() {
    let contractPayment = new CustomerContractPaymentModel();
    contractPayment.ContractId = this.data.contractId;
    contractPayment.Amount = this.amount
    contractPayment.PaymentDate = this.paymentDate;
    contractPayment.Title = this.title;
    if (this.contractPaymentImageString) contractPayment.ImageURL = this.contractPaymentImageString.split(',')[1];
    console.log('payment', contractPayment);

    this.customerContractPaymentService.create(contractPayment).subscribe(() => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Thêm thông tin thanh toán thành công`
      });
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  currencyInputChanged(value) {
    var num = value.replace(/[VND,]/g, "");
    return Number(num);
  }

}

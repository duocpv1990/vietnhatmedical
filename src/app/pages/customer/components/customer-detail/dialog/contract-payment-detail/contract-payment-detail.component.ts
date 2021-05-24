import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//service
import { CustomerContractPaymentService } from "../../../../services/customer-contract-payment.service";
import { AlertService } from "../../../../../../shared/services/alert.service";

//model
import { CustomerContractPaymentModel } from "../../../../models/customer-contract-payment.model";

@Component({
  selector: 'app-contract-payment-detail',
  templateUrl: './contract-payment-detail.component.html',
  styleUrls: ['./contract-payment-detail.component.scss']
})
export class ContractPaymentDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContractPaymentDetailComponent>,
    private contractPaymentService: CustomerContractPaymentService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  amount: any;
  paymentDate: string;
  contractPaymentImageString: any;
  title: string;

  ngOnInit(): void {
    this.data = this.data.contractPayment;
    this.getCurrentPayment();
  }

  getCurrentPayment() {
    this.amount = new Intl.NumberFormat().format(this.data.Amount);
    if (this.data.PaymentDate !== null) {
      this.paymentDate = this.data.PaymentDate.split('T')[0];
    } else {
      this.paymentDate = '';
    }
    this.contractPaymentImageString = this.data.ImageURL;
    this.title = this.data.Title;
  }

  processFileContractPaymentImage(files: File) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.contractPaymentImageString = reader.result;
    };
  }

  updateContractPayment() {
    let payment = new CustomerContractPaymentModel();
    payment.PaymentDate = this.paymentDate;
    payment.Title = this.title;
    if (this.amount.includes(',')) {
      payment.Amount = +this.amount.split(',').join('');
    }
    else if (this.amount.includes('.')) {
      payment.Amount = +this.amount.split('.').join('');
    }
    if (this.contractPaymentImageString == this.data.ImageURL) {
      payment.ImageURL = null;
    } else payment.ImageURL = this.contractPaymentImageString.split(',')[1];
    this.contractPaymentService.update(payment, this.data.ContractPaymentId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Cập nhật Thông tin thanh toán thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  deleteContractPayment() {
    this.contractPaymentService.delete(this.data.ContractPaymentId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Xóa Thông tin thanh toán thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  formatAmount() {
    if (this.amount.includes(',')) {
      this.amount = +this.amount.split(',').join('');
      this.amount = new Intl.NumberFormat().format(this.amount);
    }
    else if (this.amount.includes(',')) {
      this.amount = +this.amount.split(',').join('');
      this.amount = new Intl.NumberFormat().format(this.amount);
    }
    else if (this.amount == 0) {
      this.amount = "";
    }
    else if (isNaN(this.amount)) {
      this.amount = "";
    }
    else {
      this.amount = new Intl.NumberFormat().format(this.amount);
    }
  }

  currencyInputChanged(value) {
    var num = value.replace(/[VND,]/g, "");
    return Number(num);
  }

}

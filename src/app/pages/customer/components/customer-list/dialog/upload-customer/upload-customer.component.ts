import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertService } from "../../../../../../shared/services/alert.service";
import { Router } from '@angular/router';

import { MarketingService } from "../../../../services/marketing.service";
@Component({
  selector: 'app-upload-customer',
  templateUrl: './upload-customer.component.html',
  styleUrls: ['./upload-customer.component.scss']
})
export class UploadCustomerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadCustomerComponent>,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MarketingService: MarketingService,
    private router : Router
  ) { }

  name: string = '';
  price: any;
  selectedFileString: any;

  ngOnInit(): void {
  }

  processFile(files: File) {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.selectedFileString = reader.result;
    };
  }

  
  sendForm() {
    // console.log(this.selectedFileString);
    this.MarketingService.uploadForm({
      Name: this.name,
      Price: this.price,
      Files: this.selectedFileString.split(',')[1],
    }).subscribe(data => {
      // console.log('upload ',data);
      this.alerService.changeMessage({
        text: 'Tải file thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ContractImagesModel } from '../../../../models/customer-contract-images.model';

import { ContractImagesService } from '../../../../services/customer-contract-images.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CustomerExamImageService } from 'src/app/pages/customer/services/customer-exam-image.service';

@Component({
  selector: 'app-contract-images-detail',
  templateUrl: './contract-images-detail.component.html',
  styleUrls: ['./contract-images-detail.component.scss']
})
export class ContractImagesDetailComponent implements OnInit {

  constructor(
    private customerExamImageService: CustomerExamImageService,
    private contractImagesService: ContractImagesService,
    public dialogRef: MatDialogRef<ContractImagesDetailComponent>,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  contractImageId: number;
  imageUrl: any;
  contractCode: string;
  createdOn: string;
  examImageId: any;
  isExamImageUrl = false;

  ngOnInit(): void {
    console.log(this.data);
    this.contractCode = this.data.ContractCode;
    this.examImageId = this.data.examImageId;
    this.contractImageId = this.data.ContractImageId;
    this.imageUrl = this.data.ImageUrl;
    this.createdOn = this.data.CreatedOn;
  }

  processFileContractImg(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
      if (this.examImageId) {
        this.isExamImageUrl = true;
      }
    }
  }

  updateContractImg() {
    let contractImg = new ContractImagesModel();
    if (this.imageUrl == this.data.ImageUrl) {
      contractImg.ImageUrl = null;
    } else {
      contractImg.ImageUrl = this.imageUrl.split(',')[1];
    }
    this.contractImagesService.update(contractImg, this.contractImageId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Cập nhật ảnh thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  updateNewExamImage() {
    if (this.isExamImageUrl === true) {
      const dataArr = [];
      dataArr.push(this.imageUrl.split(',')[1].toString());
      this.customerExamImageService.updateNewImage(dataArr, this.data.examId, this.examImageId).subscribe(res => {
        console.log(res);
        this.alerService.changeMessage({
          text: 'Cập nhật phiếu xét nghiệm thành công',
          color: 'green'
        });
        this.closeDialog();
      });
    }
  }

  deleteContractImg() {
    if (this.contractImageId) {
      this.contractImagesService.delete(this.contractImageId).subscribe(() => {
        this.alerService.changeMessage({
          text: 'Xóa ảnh thành công',
          color: 'green'
        });
        this.closeDialog();
      });
    }

    if (this.examImageId) {
      this.customerExamImageService.delete(this.examImageId).subscribe(res => {
        console.log(res);
        this.alerService.changeMessage({
          text: 'Xóa ảnh thành công',
          color: 'green'
        });
        this.closeDialog();
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

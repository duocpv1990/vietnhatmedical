import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ContractImagesModel } from "../../../../models/customer-contract-images.model";

import { ContractImagesService } from "../../../../services/customer-contract-images.service";
import { AlertService } from 'src/app/shared/services/alert.service';
import { CustomerContractService } from 'src/app/pages/customer/services/customer-contract.service';

@Component({
  selector: 'app-create-contract-images',
  templateUrl: './create-contract-images.component.html',
  styleUrls: ['./create-contract-images.component.scss']
})
export class CreateContractImagesComponent implements OnInit {

  constructor(
    private customerContractService: CustomerContractService,
    private contractImagesService: ContractImagesService,
    public dialogRef: MatDialogRef<CreateContractImagesComponent>,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  beforeImageString: any;
  afterImageString: any;
  bandageImageString: any;
  visitImageString; any;
  contractId: number;
  customerId: number;
  contractList: any;
  BeforeImageStringLst = [];
  BeforeImageNameList = [];
  BandageImageStringLst = [];
  BandageImageNameList = [];
  VisitImageStringLst = [];
  VisitImageNameLst = [];
  AfterImageStringLst = [];
  AfterImageNameLst = [];
  BeforeFiles = [];
  BandageFiles = [];
  VisitFiles = [];
  AfterFiles = []
  ngOnInit(): void {
    setTimeout(() => this.getContractByCustomerId(), 30);
  }

  getContractByCustomerId() {
    this.customerContractService.getContractByCustomerId(this.data.customerId).subscribe(data => {
      // console.log('DS hop dong', data);
      this.contractList = data;
    });
  }

  processFileBeforeSurgeryImg(files) {
    this.BeforeFiles = Object.values(files)
    this.BeforeFiles.forEach(file => {
      this.BeforeImageNameList.push(file.name);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.beforeImageString = reader.result;
        this.BeforeImageStringLst.push(this.beforeImageString.split(",")[1]);
      }
    })
  }

  processFileAfterSurgeryImg(files) {
    // console.log(files.length);
    // console.log(files[0]);
    // console.log(this.test[0]);
    this.AfterFiles = Object.values(files)
    this.AfterFiles.forEach(file => {
      this.AfterImageNameLst.push(file.name);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.afterImageString = reader.result;
        this.AfterImageStringLst.push(this.afterImageString.split(",")[1]);
      }
    })
  }

  processFileBandageImg(files) {
    this.BandageFiles = Object.values(files)
    this.BandageFiles.forEach(file => {
      this.BandageImageNameList.push(file.name);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.bandageImageString = reader.result;
        this.BandageImageStringLst.push(this.bandageImageString.split(",")[1]);
      }
    })
  }
  processFileVisitImg(files) {
    this.VisitFiles = Object.values(files)
    this.VisitFiles.forEach(file => {
      this.VisitImageNameLst.push(file.name);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.visitImageString = reader.result;
        this.VisitImageStringLst.push(this.visitImageString.split(",")[1]);
      }
    })
  }

  createContractImage() {
    let contractImg = new ContractImagesModel();
    contractImg.ContractId = this.contractId;
    contractImg.BeforeImageStringLst = this.beforeImageString ? this.BeforeImageStringLst : [];
    // contractImg.BeforeImageStringLst = [`${this.beforeImageString.split(",")[1]}`];
    contractImg.AfterImageStringLst = this.afterImageString ? this.AfterImageStringLst : [];
    contractImg.BandageImageStringLst = this.bandageImageString ? this.BandageImageStringLst : [];
    contractImg.VisitImageStringLst = this.visitImageString ? this.VisitImageStringLst : [];

    console.log('form gui di', contractImg);
  
    this.contractImagesService.createImgContract(contractImg).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Thêm ảnh thành công',
        color: 'green'
      });
      this.closeDialog();
    });
   
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
